-- Champions League fixtures, two-sided score confirmation, and club trophies.
-- Run once in Supabase -> SQL Editor after supabase-migration-teams-friends.sql.

create table if not exists public.league_champions_matches (
  id uuid primary key default gen_random_uuid(),
  home_team smallint not null check (home_team >= 0),
  away_team smallint not null check (away_team >= 0 and away_team <> home_team),
  home_goals smallint not null check (home_goals between 0 and 99),
  away_goals smallint not null check (away_goals between 0 and 99),
  home_penalties smallint,
  away_penalties smallint,
  stats jsonb not null default '{}'::jsonb,
  season integer not null check (season > 0),
  leg smallint not null check (leg between 1 and 3),
  played_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid(),
  unique (season, leg),
  check (
    (leg < 3 and home_penalties is null and away_penalties is null)
    or (leg = 3 and (
      (home_goals <> away_goals and home_penalties is null and away_penalties is null)
      or (home_goals = away_goals and home_penalties is not null
          and away_penalties is not null and home_penalties between 0 and 99
          and away_penalties between 0 and 99 and home_penalties <> away_penalties)
    ))
  )
);

create table if not exists public.league_champions_proposals (
  id uuid primary key default gen_random_uuid(),
  home_team smallint not null check (home_team >= 0),
  away_team smallint not null check (away_team >= 0 and away_team <> home_team),
  home_goals smallint not null check (home_goals between 0 and 99),
  away_goals smallint not null check (away_goals between 0 and 99),
  home_penalties smallint,
  away_penalties smallint,
  stats jsonb not null default '{}'::jsonb,
  season integer not null check (season > 0),
  leg smallint not null check (leg between 1 and 3),
  proposer_team smallint not null,
  proposed_by uuid not null default auth.uid(),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  check (
    (leg < 3 and home_penalties is null and away_penalties is null)
    or (leg = 3 and (
      (home_goals <> away_goals and home_penalties is null and away_penalties is null)
      or (home_goals = away_goals and home_penalties is not null
          and away_penalties is not null and home_penalties between 0 and 99
          and away_penalties between 0 and 99 and home_penalties <> away_penalties)
    ))
  )
);

create unique index if not exists league_champions_one_pending_leg
  on public.league_champions_proposals (season, leg) where status = 'pending';

create table if not exists public.league_club_trophies (
  id uuid primary key default gen_random_uuid(),
  team_index smallint not null check (team_index >= 0),
  competition text not null check (competition in ('participation', 'champions_league')),
  season integer not null check (season > 0),
  awarded_at timestamptz not null default now()
);

create unique index if not exists league_club_participation_medal_once
  on public.league_club_trophies (team_index) where competition = 'participation';
create unique index if not exists league_club_champions_trophy_per_season
  on public.league_club_trophies (team_index, season) where competition = 'champions_league';

alter table public.league_champions_matches enable row level security;
alter table public.league_champions_proposals enable row level security;
alter table public.league_club_trophies enable row level security;

grant select on public.league_champions_matches, public.league_club_trophies to anon, authenticated;
grant select on public.league_champions_proposals to authenticated;
revoke insert, update, delete on public.league_champions_matches from anon, authenticated;
revoke insert, update, delete on public.league_champions_proposals from anon, authenticated;
revoke insert, update, delete on public.league_club_trophies from anon, authenticated;

drop policy if exists "Anyone can read Champions League matches" on public.league_champions_matches;
create policy "Anyone can read Champions League matches"
  on public.league_champions_matches for select to anon, authenticated using (true);

drop policy if exists "Players can read Champions League proposals" on public.league_champions_proposals;
create policy "Players can read Champions League proposals"
  on public.league_champions_proposals for select to authenticated using (true);

drop policy if exists "Anyone can read club trophies" on public.league_club_trophies;
create policy "Anyone can read club trophies"
  on public.league_club_trophies for select to anon, authenticated using (true);

create or replace function public.propose_league_champions_match(
  p_home smallint,
  p_away smallint,
  p_home_goals integer,
  p_away_goals integer,
  p_season integer,
  p_leg smallint,
  p_stats jsonb default '{}'::jsonb,
  p_home_penalties integer default null,
  p_away_penalties integer default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_current_season integer;
  v_league_match_count integer;
  v_expected_leg smallint;
  v_expected_home smallint;
  v_leg_one public.league_champions_matches;
  v_leg_two public.league_champions_matches;
  v_team_zero_total integer;
  v_team_one_total integer;
  v_id uuid;
  v_side text;
  v_stat_key text;
  v_stat_text text;
  v_stat_value numeric;
  v_home_possession integer;
  v_away_possession integer;
  v_home_shots integer;
  v_away_shots integer;
  v_home_shots_on_target integer;
  v_away_shots_on_target integer;
begin
  if v_team is null then raise exception 'This account is not linked to a team'; end if;
  if v_team not in (p_home, p_away) then raise exception 'You can only report your own club match'; end if;
  if p_home_goals not between 0 and 99 or p_away_goals not between 0 and 99 then
    raise exception 'Invalid score';
  end if;
  p_stats := coalesce(p_stats, '{}'::jsonb);
  if jsonb_typeof(p_stats) <> 'object' then raise exception 'Invalid match statistics'; end if;
  foreach v_side in array array['home', 'away'] loop
    if p_stats ? v_side and jsonb_typeof(p_stats->v_side) <> 'object' then
      raise exception 'Invalid match statistics';
    end if;
    foreach v_stat_key in array array['shots', 'shotsOnTarget', 'possession', 'passes'] loop
      if p_stats->v_side ? v_stat_key and jsonb_typeof(p_stats->v_side->v_stat_key) <> 'null' then
        if jsonb_typeof(p_stats->v_side->v_stat_key) <> 'number' then
          raise exception 'Match statistics must be whole numbers';
        end if;
        v_stat_text := p_stats->v_side->>v_stat_key;
        if v_stat_text !~ '^[0-9]+$' then raise exception 'Match statistics must be whole numbers'; end if;
        v_stat_value := v_stat_text::numeric;
        if (v_stat_key in ('shots', 'shotsOnTarget') and v_stat_value > 999)
          or (v_stat_key = 'possession' and v_stat_value > 100)
          or (v_stat_key = 'passes' and v_stat_value > 9999) then
          raise exception 'Match statistic is out of range';
        end if;
      end if;
    end loop;
  end loop;

  v_home_possession := nullif(p_stats->'home'->>'possession', '')::integer;
  v_away_possession := nullif(p_stats->'away'->>'possession', '')::integer;
  if (v_home_possession is null) <> (v_away_possession is null)
    or (v_home_possession is not null and v_home_possession + v_away_possession <> 100) then
    raise exception 'Possession values must both be provided and total 100';
  end if;
  v_home_shots := nullif(p_stats->'home'->>'shots', '')::integer;
  v_away_shots := nullif(p_stats->'away'->>'shots', '')::integer;
  v_home_shots_on_target := nullif(p_stats->'home'->>'shotsOnTarget', '')::integer;
  v_away_shots_on_target := nullif(p_stats->'away'->>'shotsOnTarget', '')::integer;
  if (v_home_shots is not null and v_home_shots_on_target > v_home_shots)
    or (v_away_shots is not null and v_away_shots_on_target > v_away_shots) then
    raise exception 'Shots on target cannot exceed total shots';
  end if;

  select season into v_current_season from public.league_settings where id = true;
  if p_season is distinct from v_current_season then raise exception 'This is not the current league season'; end if;
  select count(*) into v_league_match_count
    from public.league_matches where season = p_season;
  select * into v_leg_one from public.league_champions_matches where season = p_season and leg = 1;
  select * into v_leg_two from public.league_champions_matches where season = p_season and leg = 2;

  if v_leg_one.id is null then
    v_expected_leg := 1;
    v_expected_home := 0;
    if v_league_match_count < 18 then raise exception 'The first Champions League match unlocks after 18 league matches'; end if;
  elsif v_leg_two.id is null then
    v_expected_leg := 2;
    v_expected_home := 1;
    if v_league_match_count < 36 then raise exception 'The second Champions League match unlocks after 36 league matches'; end if;
  else
    select
      coalesce(sum(case when home_team = 0 then home_goals else away_goals end), 0),
      coalesce(sum(case when home_team = 1 then home_goals else away_goals end), 0)
    into v_team_zero_total, v_team_one_total
    from public.league_champions_matches
    where season = p_season and leg in (1, 2);
    if v_team_zero_total <> v_team_one_total then
      raise exception 'The Champions League tie already has a winner';
    end if;
    v_expected_leg := 3;
    v_expected_home := 0;
  end if;

  if p_home <> v_expected_home or p_away <> 1 - v_expected_home then
    raise exception 'Invalid Champions League fixture';
  end if;
  if p_leg <> v_expected_leg then raise exception 'This Champions League matchday is not available'; end if;
  if p_leg < 3 and (p_home_penalties is not null or p_away_penalties is not null) then
    raise exception 'Penalty scores are only allowed in the deciding match';
  end if;
  if p_leg = 3 and (
    (p_home_goals = p_away_goals and (
      p_home_penalties is null or p_away_penalties is null or
      p_home_penalties not between 0 and 99 or p_away_penalties not between 0 and 99 or
      p_home_penalties = p_away_penalties
    ))
    or (p_home_goals <> p_away_goals and (p_home_penalties is not null or p_away_penalties is not null))
  ) then
    raise exception 'The deciding match needs a winner, using penalties if the score is level';
  end if;

  insert into public.league_champions_proposals
    (home_team, away_team, home_goals, away_goals, home_penalties, away_penalties,
     season, leg, stats, proposer_team, proposed_by)
  values
    (p_home, p_away, p_home_goals, p_away_goals, p_home_penalties, p_away_penalties,
     p_season, p_leg, coalesce(p_stats, '{}'::jsonb), v_team, auth.uid())
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.confirm_league_champions_match(p_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_proposal public.league_champions_proposals;
  v_match uuid;
  v_season_matches integer;
  v_total_zero integer;
  v_total_one integer;
  v_winner smallint;
  v_current_season integer;
  v_leg_one public.league_champions_matches;
  v_leg_two public.league_champions_matches;
begin
  select * into v_proposal
    from public.league_champions_proposals where id = p_id for update;
  if not found or v_proposal.status <> 'pending' then raise exception 'Proposal is no longer pending'; end if;
  if v_team is null or v_team = v_proposal.proposer_team or v_team not in (0, 1) then
    raise exception 'Only the other club can confirm this result';
  end if;

  select season into v_current_season from public.league_settings where id = true;
  if v_proposal.season is distinct from v_current_season then
    raise exception 'This is not the current league season';
  end if;
  select count(*) into v_season_matches
    from public.league_matches where season = v_proposal.season;
  if (v_proposal.leg = 1 and v_season_matches < 18)
    or (v_proposal.leg in (2, 3) and v_season_matches < 36) then
    raise exception 'The league matchday requirement is not met';
  end if;
  select * into v_leg_one from public.league_champions_matches
    where season = v_proposal.season and leg = 1;
  select * into v_leg_two from public.league_champions_matches
    where season = v_proposal.season and leg = 2;
  if (v_proposal.leg = 1 and v_leg_one.id is not null)
    or (v_proposal.leg = 2 and (v_leg_one.id is null or v_leg_two.id is not null))
    or (v_proposal.leg = 3 and (v_leg_one.id is null or v_leg_two.id is null)) then
    raise exception 'This Champions League matchday is no longer available';
  end if;
  if v_proposal.leg = 3 then
    select
      coalesce(sum(case when home_team = 0 then home_goals else away_goals end), 0),
      coalesce(sum(case when home_team = 1 then home_goals else away_goals end), 0)
    into v_total_zero, v_total_one
    from public.league_champions_matches
    where season = v_proposal.season and leg in (1, 2);
    if v_total_zero <> v_total_one then raise exception 'The Champions League tie already has a winner'; end if;
  end if;

  insert into public.league_champions_matches
    (home_team, away_team, home_goals, away_goals, home_penalties, away_penalties,
     stats, season, leg, created_by)
  values
    (v_proposal.home_team, v_proposal.away_team, v_proposal.home_goals, v_proposal.away_goals,
     v_proposal.home_penalties, v_proposal.away_penalties, v_proposal.stats,
     v_proposal.season, v_proposal.leg, v_proposal.proposed_by)
  returning id into v_match;

  update public.league_champions_proposals
    set status = 'confirmed', resolved_at = now() where id = p_id;

  insert into public.league_club_trophies (team_index, competition, season)
    values (0, 'participation', v_proposal.season), (1, 'participation', v_proposal.season)
    on conflict do nothing;

  if v_proposal.leg = 2 then
    select
      coalesce(sum(case when home_team = 0 then home_goals else away_goals end), 0),
      coalesce(sum(case when home_team = 1 then home_goals else away_goals end), 0)
    into v_total_zero, v_total_one
    from public.league_champions_matches where season = v_proposal.season and leg in (1, 2);
    if v_total_zero > v_total_one then v_winner := 0;
    elsif v_total_one > v_total_zero then v_winner := 1;
    end if;
  elsif v_proposal.leg = 3 then
    if v_proposal.home_goals > v_proposal.away_goals then v_winner := v_proposal.home_team;
    elsif v_proposal.away_goals > v_proposal.home_goals then v_winner := v_proposal.away_team;
    elsif v_proposal.home_penalties > v_proposal.away_penalties then v_winner := v_proposal.home_team;
    else v_winner := v_proposal.away_team;
    end if;
  end if;

  if v_winner is not null then
    insert into public.league_club_trophies (team_index, competition, season)
      values (v_winner, 'champions_league', v_proposal.season)
      on conflict do nothing;
  end if;
  return v_match;
end;
$$;

create or replace function public.decline_league_champions_match(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_proposal public.league_champions_proposals;
begin
  select * into v_proposal
    from public.league_champions_proposals where id = p_id for update;
  if not found or v_proposal.status <> 'pending' then return; end if;
  if v_team is null or v_team not in (v_proposal.home_team, v_proposal.away_team) then
    raise exception 'Not your Champions League match';
  end if;
  update public.league_champions_proposals
    set status = case when v_team = proposer_team then 'cancelled' else 'rejected' end,
        resolved_at = now()
    where id = p_id;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'league_champions_matches'
  ) then
    alter publication supabase_realtime add table public.league_champions_matches;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'league_champions_proposals'
  ) then
    alter publication supabase_realtime add table public.league_champions_proposals;
  end if;
end
$$;

revoke all on function public.propose_league_champions_match(smallint, smallint, integer, integer, integer, smallint, jsonb, integer, integer) from public, anon;
revoke all on function public.confirm_league_champions_match(uuid) from public, anon;
revoke all on function public.decline_league_champions_match(uuid) from public, anon;
grant execute on function public.propose_league_champions_match(smallint, smallint, integer, integer, integer, smallint, jsonb, integer, integer) to authenticated;
grant execute on function public.confirm_league_champions_match(uuid) to authenticated;
grant execute on function public.decline_league_champions_match(uuid) to authenticated;
