-- Run after supabase-migration-trophy-shelf.sql. The first tournament is for the next season.
begin;

create table if not exists public.world_cup_config (
  id boolean primary key default true check (id),
  first_season integer not null check (first_season > 0)
);
insert into public.world_cup_config (id, first_season)
  select true, season + 1 from public.league_settings where id = true
  on conflict (id) do nothing;
do $$ begin
  if not exists (select 1 from public.world_cup_config) then
    raise exception 'League settings were not found';
  end if;
end $$;

create table if not exists public.world_cup_matches (
  id uuid primary key default gen_random_uuid(),
  season integer not null check (season > 0),
  round integer not null check (round > 0),
  home_team smallint not null check (home_team in (0, 1)),
  away_team smallint not null check (away_team in (0, 1) and away_team <> home_team),
  home_goals smallint not null check (home_goals between 0 and 99),
  away_goals smallint not null check (away_goals between 0 and 99),
  stats jsonb not null default '{}'::jsonb,
  played_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) default auth.uid(),
  unique (season, round)
);
alter table public.world_cup_matches enable row level security;
alter table public.world_cup_config enable row level security;
grant select on public.world_cup_matches, public.world_cup_config to anon, authenticated;
revoke insert, update, delete on public.world_cup_matches, public.world_cup_config from anon, authenticated;
drop policy if exists "World Cup matches are public" on public.world_cup_matches;
create policy "World Cup matches are public" on public.world_cup_matches for select to anon, authenticated using (true);
drop policy if exists "World Cup configuration is public" on public.world_cup_config;
create policy "World Cup configuration is public" on public.world_cup_config for select to anon, authenticated using (true);
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
    and not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime'
      and schemaname = 'public' and tablename = 'world_cup_matches') then
    alter publication supabase_realtime add table public.world_cup_matches;
  end if;
end;
$$;

alter table public.league_club_trophies drop constraint if exists league_club_trophies_competition_check;
alter table public.league_club_trophies add constraint league_club_trophies_competition_check
  check (competition in ('participation', 'champions_league', 'league', 'world_cup'));
create unique index if not exists league_club_world_cup_per_season
  on public.league_club_trophies (season) where competition = 'world_cup';

create or replace function public.world_cup_winner(p_season integer)
returns smallint language plpgsql security definer set search_path = public as $$
declare
  v_count integer;
  v_points0 integer; v_points1 integer; v_goals0 integer; v_goals1 integer;
  v_decider public.world_cup_matches;
begin
  select count(*) into v_count from public.world_cup_matches where season = p_season and round <= 6;
  if v_count < 6 then return null; end if;
  select sum(case when home_team = 0 then case when home_goals > away_goals then 3 when home_goals = away_goals then 1 else 0 end
                  else case when away_goals > home_goals then 3 when home_goals = away_goals then 1 else 0 end end),
         sum(case when home_team = 1 then case when home_goals > away_goals then 3 when home_goals = away_goals then 1 else 0 end
                  else case when away_goals > home_goals then 3 when home_goals = away_goals then 1 else 0 end end),
         sum(case when home_team = 0 then home_goals else away_goals end),
         sum(case when home_team = 1 then home_goals else away_goals end)
    into v_points0, v_points1, v_goals0, v_goals1
    from public.world_cup_matches where season = p_season and round <= 6;
  if v_points0 > v_points1 then return 0; elsif v_points1 > v_points0 then return 1; end if;
  if v_goals0 > v_goals1 then return 0; elsif v_goals1 > v_goals0 then return 1; end if;
  select * into v_decider from public.world_cup_matches
    where season = p_season and round > 6 and home_goals <> away_goals order by round limit 1;
  if v_decider.id is null then return null; end if;
  if v_decider.home_goals > v_decider.away_goals then return v_decider.home_team; end if;
  return v_decider.away_team;
end;
$$;

create or replace function public.save_world_cup_match(
  p_season integer, p_home_goals integer, p_away_goals integer, p_stats jsonb
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_team smallint := public.get_my_team(); v_current integer; v_first integer;
  v_round integer; v_home smallint; v_id uuid; v_winner smallint;
  v_side text; v_key text; v_value text; v_home_pos integer; v_away_pos integer;
begin
  if v_team is null or v_team not in (0,1) then raise exception 'Only a team owner can save a World Cup match'; end if;
  select season into v_current from public.league_settings where id = true for update;
  if not found or p_season is distinct from v_current then raise exception 'This is not the current season'; end if;
  select first_season into v_first from public.world_cup_config where id = true;
  if v_first is null or p_season < v_first then raise exception 'World Cup is not scheduled for this season'; end if;
  if exists (select 1 from public.league_matches where season = p_season) then raise exception 'The league season has already started'; end if;
  if public.world_cup_winner(p_season) is not null then raise exception 'The World Cup is complete'; end if;
  if p_home_goals is null or p_away_goals is null or p_home_goals not between 0 and 99 or p_away_goals not between 0 and 99 then
    raise exception 'Invalid score';
  end if;
  if jsonb_typeof(coalesce(p_stats, '{}'::jsonb)) <> 'object' then raise exception 'Invalid statistics'; end if;
  foreach v_side in array array['home','away'] loop
    if p_stats ? v_side and jsonb_typeof(p_stats->v_side) <> 'object' then raise exception 'Invalid statistics'; end if;
    foreach v_key in array array['shots','shotsOnTarget','possession','passes'] loop
      if p_stats->v_side ? v_key and jsonb_typeof(p_stats->v_side->v_key) <> 'null' then
        if jsonb_typeof(p_stats->v_side->v_key) <> 'number' then raise exception 'Statistics must be whole numbers'; end if;
        v_value := p_stats->v_side->>v_key;
        if v_value !~ '^[0-9]+$' then raise exception 'Statistics must be whole numbers'; end if;
        if v_value::numeric > (case when v_key = 'possession' then 100 when v_key = 'passes' then 9999 else 999 end) then
          raise exception 'Statistic is out of range';
        end if;
      end if;
    end loop;
    if (p_stats->v_side->>'shots')::integer < (p_stats->v_side->>'shotsOnTarget')::integer then
      raise exception 'Shots on target cannot exceed shots';
    end if;
  end loop;
  v_home_pos := (p_stats->'home'->>'possession')::integer;
  v_away_pos := (p_stats->'away'->>'possession')::integer;
  if (v_home_pos is null) <> (v_away_pos is null) or (v_home_pos is not null and v_home_pos + v_away_pos <> 100) then
    raise exception 'Possession values must both be provided and total 100';
  end if;
  select coalesce(max(round), 0) + 1 into v_round from public.world_cup_matches where season = p_season;
  v_home := case when v_round % 2 = 1 then 0 else 1 end;
  insert into public.world_cup_matches (season, round, home_team, away_team, home_goals, away_goals, stats, created_by)
    values (p_season, v_round, v_home, 1-v_home, p_home_goals, p_away_goals, coalesce(p_stats, '{}'::jsonb), auth.uid())
    returning id into v_id;
  v_winner := public.world_cup_winner(p_season);
  if v_winner is not null then
    insert into public.league_club_trophies (team_index, competition, season, awarded_at)
      select v_winner, 'world_cup', p_season, played_at from public.world_cup_matches where id = v_id;
  end if;
  return v_id;
end;
$$;

create or replace function public.delete_world_cup_match(p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_team smallint := public.get_my_team(); v_match public.world_cup_matches; v_season integer;
begin
  if v_team is null or v_team not in (0,1) then raise exception 'Only a team owner can delete a World Cup match'; end if;
  select season into v_season from public.league_settings where id = true for update;
  select * into v_match from public.world_cup_matches where id = p_id for update;
  if not found then raise exception 'Match not found'; end if;
  if v_match.season <> v_season then raise exception 'Only current season matches can be deleted'; end if;
  if exists (select 1 from public.league_matches where season = v_season) then raise exception 'The league season has already started'; end if;
  if exists (select 1 from public.world_cup_matches where season = v_season and round > v_match.round) then
    raise exception 'Delete the latest World Cup match first';
  end if;
  delete from public.world_cup_matches where id = p_id;
  delete from public.league_club_trophies where competition = 'world_cup' and season = v_season;
end;
$$;

create or replace function public.block_league_during_world_cup()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_first integer;
begin
  perform 1 from public.league_settings where id = true for update;
  select first_season into v_first from public.world_cup_config where id = true;
  if v_first is null then raise exception 'World Cup configuration not found'; end if;
  if new.season >= v_first and public.world_cup_winner(new.season) is null then
    raise exception 'Finish the World Cup before adding a league match';
  end if;
  return new;
end;
$$;
drop trigger if exists league_match_world_cup_pause on public.league_matches;
create trigger league_match_world_cup_pause before insert on public.league_matches
  for each row execute function public.block_league_during_world_cup();

revoke all on function public.world_cup_winner(integer) from public, anon, authenticated;
revoke all on function public.block_league_during_world_cup() from public, anon, authenticated;
revoke all on function public.save_world_cup_match(integer, integer, integer, jsonb) from public, anon;
revoke all on function public.delete_world_cup_match(uuid) from public, anon;
grant execute on function public.save_world_cup_match(integer, integer, integer, jsonb) to authenticated;
grant execute on function public.delete_world_cup_match(uuid) to authenticated;
commit;
