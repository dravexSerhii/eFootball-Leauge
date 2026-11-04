-- Team ownership rules, two-sided match confirmation, player profiles and friends.
-- Run once in Supabase -> SQL Editor, AFTER supabase-migration-profiles.sql.

-- 1) Each account may only edit its own team --------------------------------------------------
create or replace function public.enforce_league_settings_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint;
begin
  -- Dashboard / SQL editor / service role have no end-user id and stay unrestricted.
  if auth.uid() is null then
    return new;
  end if;
  v_team := public.get_my_team();
  if v_team is null then
    raise exception 'This account is not linked to a team';
  end if;
  if (new.lineups - v_team::text) is distinct from (old.lineups - v_team::text) then
    raise exception 'You can only edit your own team lineup';
  end if;
  if jsonb_array_length(new.teams) <> jsonb_array_length(old.teams)
     or exists (
       select 1
       from generate_series(0, jsonb_array_length(old.teams) - 1) as i
       where i <> v_team and (old.teams -> i) is distinct from (new.teams -> i)
     ) then
    raise exception 'You can only edit your own team';
  end if;
  return new;
end;
$$;

drop trigger if exists league_settings_owner_guard on public.league_settings;
create trigger league_settings_owner_guard
  before update on public.league_settings
  for each row execute function public.enforce_league_settings_owner();

-- Matches are no longer inserted directly: they go through the proposal + confirmation flow.
drop policy if exists "League members can add matches" on public.league_matches;
revoke insert on public.league_matches from authenticated;

drop policy if exists "Users can delete their own matches" on public.league_matches;
create policy "Team owners can delete their matches"
  on public.league_matches for delete to authenticated
  using (public.get_my_team() in (home_team, away_team));

-- 2) Match proposals confirmed by the other side ----------------------------------------------
create table if not exists public.league_match_proposals (
  id uuid primary key default gen_random_uuid(),
  home_team smallint not null check (home_team >= 0),
  away_team smallint not null check (away_team >= 0 and away_team <> home_team),
  home_goals smallint not null check (home_goals between 0 and 99),
  away_goals smallint not null check (away_goals between 0 and 99),
  stats jsonb not null default '{}'::jsonb,
  season integer not null default 1,
  proposer_team smallint not null,
  proposed_by uuid not null default auth.uid(),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
alter table public.league_match_proposals enable row level security;
grant select on public.league_match_proposals to authenticated;
drop policy if exists "Players can read proposals" on public.league_match_proposals;
create policy "Players can read proposals"
  on public.league_match_proposals for select to authenticated using (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'league_match_proposals'
  ) then
    alter publication supabase_realtime add table public.league_match_proposals;
  end if;
end
$$;

create or replace function public.propose_league_match(
  p_home smallint, p_away smallint, p_home_goals integer, p_away_goals integer,
  p_stats jsonb, p_season integer
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_id uuid;
begin
  if v_team is null then raise exception 'This account is not linked to a team'; end if;
  if v_team not in (p_home, p_away) then raise exception 'You can only report matches of your own team'; end if;
  if p_home = p_away then raise exception 'Teams must be different'; end if;
  if p_home_goals not between 0 and 99 or p_away_goals not between 0 and 99 then
    raise exception 'Invalid score';
  end if;
  update public.league_match_proposals set status = 'cancelled', resolved_at = now()
    where status = 'pending' and proposer_team = v_team;
  insert into public.league_match_proposals
    (home_team, away_team, home_goals, away_goals, stats, season, proposer_team, proposed_by)
  values (p_home, p_away, p_home_goals, p_away_goals, coalesce(p_stats, '{}'::jsonb),
          coalesce(p_season, 1), v_team, auth.uid())
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.confirm_league_match(p_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_p public.league_match_proposals;
  v_match uuid;
begin
  select * into v_p from public.league_match_proposals where id = p_id for update;
  if not found or v_p.status <> 'pending' then raise exception 'Proposal is no longer pending'; end if;
  if v_team is null or v_team = v_p.proposer_team or v_team not in (v_p.home_team, v_p.away_team) then
    raise exception 'Only the other team can confirm this result';
  end if;
  if (select count(*) from public.league_matches where season = v_p.season) >= 36 then
    raise exception 'The season already has 36 matches';
  end if;
  insert into public.league_matches (home_team, away_team, home_goals, away_goals, stats, season, created_by)
  values (v_p.home_team, v_p.away_team, v_p.home_goals, v_p.away_goals, v_p.stats, v_p.season, v_p.proposed_by)
  returning id into v_match;
  update public.league_match_proposals set status = 'confirmed', resolved_at = now() where id = p_id;
  return v_match;
end;
$$;

-- The proposer cancels; the other team rejects.
create or replace function public.decline_league_match(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_p public.league_match_proposals;
begin
  select * into v_p from public.league_match_proposals where id = p_id for update;
  if not found or v_p.status <> 'pending' then return; end if;
  if v_team is null or v_team not in (v_p.home_team, v_p.away_team) then
    raise exception 'Not your match';
  end if;
  update public.league_match_proposals
    set status = case when v_team = v_p.proposer_team then 'cancelled' else 'rejected' end,
        resolved_at = now()
    where id = p_id;
end;
$$;

-- 3) Player profiles and friends --------------------------------------------------------------
create table if not exists public.league_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null check (char_length(nickname) between 3 and 24),
  team_index smallint,
  created_at timestamptz not null default now()
);
create unique index if not exists league_profiles_nickname_key on public.league_profiles (lower(nickname));
alter table public.league_profiles enable row level security;

create table if not exists public.league_friendships (
  requester uuid not null references auth.users (id) on delete cascade,
  addressee uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  primary key (requester, addressee),
  check (requester <> addressee)
);
alter table public.league_friendships enable row level security;

-- Create profiles for the two owners that already have accounts.
insert into public.league_profiles (user_id, nickname, team_index)
select u.id,
       coalesce(nullif(btrim(s.teams -> o.team_index::int ->> 'name'), ''), 'Player ' || o.team_index),
       o.team_index
from public.team_owners o
join auth.users u on lower(u.email) = lower(btrim(o.email))
cross join public.league_settings s
on conflict (user_id) do nothing;

create or replace function public.ensure_my_profile()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_team smallint := public.get_my_team();
  v_name text;
  v_row public.league_profiles;
begin
  if v_uid is null then raise exception 'Not signed in'; end if;
  select * into v_row from public.league_profiles where user_id = v_uid;
  if not found then
    select nullif(btrim(teams -> v_team::int ->> 'name'), '') into v_name from public.league_settings limit 1;
    v_name := coalesce(v_name, 'Player ' || substr(v_uid::text, 1, 4));
    if exists (select 1 from public.league_profiles where lower(nickname) = lower(v_name)) then
      v_name := left(v_name, 18) || ' ' || substr(v_uid::text, 1, 4);
    end if;
    insert into public.league_profiles (user_id, nickname, team_index)
    values (v_uid, v_name, v_team) returning * into v_row;
  elsif v_row.team_index is distinct from v_team then
    update public.league_profiles set team_index = v_team where user_id = v_uid returning * into v_row;
  end if;
  return jsonb_build_object('user_id', v_row.user_id, 'nickname', v_row.nickname, 'team_index', v_row.team_index);
end;
$$;

create or replace function public.set_my_nickname(p_nickname text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := btrim(p_nickname);
begin
  if char_length(v_name) not between 3 and 24 then raise exception 'Nickname must be 3-24 characters'; end if;
  if exists (select 1 from public.league_profiles where lower(nickname) = lower(v_name) and user_id <> auth.uid()) then
    raise exception 'This nickname is taken';
  end if;
  update public.league_profiles set nickname = v_name where user_id = auth.uid();
end;
$$;

create or replace function public.search_league_profiles(p_query text)
returns table (user_id uuid, nickname text, relation text)
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id, p.nickname,
    case
      when f.status = 'accepted' then 'friend'
      when f.requester = auth.uid() then 'outgoing'
      when f.addressee = auth.uid() then 'incoming'
      else 'none'
    end
  from public.league_profiles p
  left join public.league_friendships f
    on (f.requester = auth.uid() and f.addressee = p.user_id)
    or (f.addressee = auth.uid() and f.requester = p.user_id)
  where auth.uid() is not null
    and p.user_id <> auth.uid()
    and char_length(btrim(p_query)) >= 2
    and p.nickname ilike '%' || replace(replace(btrim(p_query), '%', ''), '_', '') || '%'
  order by p.nickname
  limit 20;
$$;

create or replace function public.send_friend_request(p_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or p_user = auth.uid() then raise exception 'Invalid request'; end if;
  if not exists (select 1 from public.league_profiles where user_id = p_user) then
    raise exception 'Player not found';
  end if;
  if exists (select 1 from public.league_friendships where requester = p_user and addressee = auth.uid()) then
    update public.league_friendships set status = 'accepted'
      where requester = p_user and addressee = auth.uid();
  else
    insert into public.league_friendships (requester, addressee) values (auth.uid(), p_user)
    on conflict do nothing;
  end if;
end;
$$;

create or replace function public.respond_friend_request(p_user uuid, p_accept boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_accept then
    update public.league_friendships set status = 'accepted'
      where requester = p_user and addressee = auth.uid() and status = 'pending';
  else
    delete from public.league_friendships
      where requester = p_user and addressee = auth.uid() and status = 'pending';
  end if;
end;
$$;

-- Removes a friend, cancels an outgoing request.
create or replace function public.remove_friend(p_user uuid)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.league_friendships
  where (requester = auth.uid() and addressee = p_user)
     or (addressee = auth.uid() and requester = p_user and status = 'accepted');
$$;

create or replace function public.list_friends()
returns table (user_id uuid, nickname text, relation text)
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id, p.nickname,
    case
      when f.status = 'accepted' then 'friend'
      when f.requester = auth.uid() then 'outgoing'
      else 'incoming'
    end
  from public.league_friendships f
  join public.league_profiles p
    on p.user_id = case when f.requester = auth.uid() then f.addressee else f.requester end
  where auth.uid() in (f.requester, f.addressee)
  order by p.nickname;
$$;

-- A player's team (and therefore achievements) is revealed only to the owner and to friends.
create or replace function public.get_league_profile(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_row public.league_profiles;
  v_self boolean := p_user = auth.uid();
  v_friend boolean;
begin
  select * into v_row from public.league_profiles where user_id = p_user;
  if not found then return null; end if;
  v_friend := exists (
    select 1 from public.league_friendships
    where status = 'accepted'
      and ((requester = auth.uid() and addressee = p_user) or (addressee = auth.uid() and requester = p_user))
  );
  return jsonb_build_object(
    'user_id', v_row.user_id,
    'nickname', v_row.nickname,
    'is_self', v_self,
    'is_friend', v_friend,
    'team_index', case when v_self or v_friend then v_row.team_index else null end
  );
end;
$$;

do $$
declare
  fn text;
begin
  foreach fn in array array[
    'propose_league_match(smallint, smallint, integer, integer, jsonb, integer)',
    'confirm_league_match(uuid)', 'decline_league_match(uuid)',
    'ensure_my_profile()', 'set_my_nickname(text)', 'search_league_profiles(text)',
    'send_friend_request(uuid)', 'respond_friend_request(uuid, boolean)', 'remove_friend(uuid)',
    'list_friends()', 'get_league_profile(uuid)'
  ] loop
    execute format('revoke all on function public.%s from public, anon', fn);
    execute format('grant execute on function public.%s to authenticated', fn);
  end loop;
end
$$;
