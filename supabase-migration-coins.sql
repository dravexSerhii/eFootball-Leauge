-- League coins: win = 200, draw = 50, loss = 20.
-- Each account is linked to a team by e-mail; coins are calculated on the server from league_matches,
-- and every account can only collect the part it has not collected yet.

create table if not exists public.team_owners (
  email text primary key,
  team_index smallint not null check (team_index >= 0)
);

create table if not exists public.league_reward_claims (
  user_id uuid primary key references auth.users (id) on delete cascade,
  claimed integer not null default 0
);

alter table public.team_owners enable row level security;
alter table public.league_reward_claims enable row level security;

-- Team 0 = FC Barcelona, team 1 = FC Shakhtar (order of league_settings.teams)
insert into public.team_owners (email, team_index) values
  ('promashkovsergey363@gmail.com', 0),
  ('vladlionslav@gmail.com', 1)
on conflict (email) do update set team_index = excluded.team_index;

create or replace function public.claim_league_coins()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
  v_team smallint;
  v_earned integer;
  v_claimed integer;
  v_granted integer;
begin
  if v_uid is null then
    return jsonb_build_object('team', null, 'earned', 0, 'granted', 0);
  end if;

  select team_index into v_team from team_owners where email = v_email;
  if v_team is null then
    return jsonb_build_object('team', null, 'earned', 0, 'granted', 0);
  end if;

  select coalesce(sum(
    case
      when home_goals = away_goals then 50
      when (home_team = v_team and home_goals > away_goals)
        or (away_team = v_team and away_goals > home_goals) then 200
      else 20
    end), 0)::integer
  into v_earned
  from league_matches
  where home_team = v_team or away_team = v_team;

  insert into league_reward_claims (user_id, claimed) values (v_uid, 0)
  on conflict (user_id) do nothing;

  select claimed into v_claimed from league_reward_claims where user_id = v_uid for update;

  v_granted := greatest(0, v_earned - v_claimed);
  update league_reward_claims set claimed = v_claimed + v_granted where user_id = v_uid;

  return jsonb_build_object('team', v_team, 'earned', v_earned, 'granted', v_granted);
end;
$$;

revoke all on function public.claim_league_coins() from public, anon;
grant execute on function public.claim_league_coins() to authenticated;
