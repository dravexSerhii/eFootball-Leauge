-- Run after supabase-migration-champions-league.sql.
-- Pending proposals are cancelled, not published. Their records remain available for reference.

create or replace function public.league_champions_due_leg(p_season integer)
returns smallint
language plpgsql security definer set search_path = public
as $$
declare
  v_league_match_count integer;
  v_leg_one uuid;
  v_leg_two uuid;
  v_leg_three uuid;
  v_team_zero_total integer;
  v_team_one_total integer;
begin
  perform 1 from public.league_settings where id = true for update;
  if not found then raise exception 'League settings were not found'; end if;
  select count(*) into v_league_match_count from public.league_matches where season = p_season;
  select id into v_leg_one from public.league_champions_matches where season = p_season and leg = 1;
  select id into v_leg_two from public.league_champions_matches where season = p_season and leg = 2;
  select id into v_leg_three from public.league_champions_matches where season = p_season and leg = 3;
  if v_leg_one is null then
    if v_league_match_count >= 18 then return 1; end if;
  elsif v_leg_two is null then
    if v_league_match_count >= 36 then return 2; end if;
  elsif v_leg_three is null then
    select sum(case when home_team = 0 then home_goals else away_goals end),
           sum(case when home_team = 1 then home_goals else away_goals end)
      into v_team_zero_total, v_team_one_total
      from public.league_champions_matches where season = p_season and leg in (1, 2);
    if v_team_zero_total = v_team_one_total then return 3; end if;
  end if;
  return null;
end;
$$;

create or replace function public.save_league_match(
  p_home smallint, p_away smallint, p_home_goals integer, p_away_goals integer,
  p_stats jsonb, p_season integer
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_season integer;
  v_teams jsonb;
  v_match uuid;
  v_side text;
  v_key text;
  v_value text;
  v_home_possession integer;
  v_away_possession integer;
begin
  if v_team is null or v_team not in (p_home, p_away) then
    raise exception 'You can only report matches of your own team';
  end if;
  select season, teams into v_season, v_teams from public.league_settings where id = true for update;
  if not found or p_season is distinct from v_season then raise exception 'This is not the current league season'; end if;
  if p_home is null or p_away is null or p_home = p_away or p_home < 0 or p_away < 0
    or p_home >= jsonb_array_length(v_teams) or p_away >= jsonb_array_length(v_teams) then
    raise exception 'Invalid teams';
  end if;
  if p_home_goals is null or p_away_goals is null or p_home_goals not between 0 and 99 or p_away_goals not between 0 and 99 then
    raise exception 'Invalid score';
  end if;
  if (select count(*) from public.league_matches where season = p_season) >= 36 then
    raise exception 'The season already has 36 matches';
  end if;
  if jsonb_typeof(coalesce(p_stats, '{}'::jsonb)) <> 'object' then raise exception 'Invalid statistics'; end if;
  foreach v_side in array array['home', 'away'] loop
    if p_stats ? v_side and jsonb_typeof(p_stats->v_side) <> 'object' then
      raise exception 'Invalid match statistics';
    end if;
    foreach v_key in array array['shots', 'shotsOnTarget', 'possession', 'passes'] loop
      if p_stats->v_side ? v_key and jsonb_typeof(p_stats->v_side->v_key) <> 'null' then
        if jsonb_typeof(p_stats->v_side->v_key) <> 'number' then
          raise exception 'Match statistics must be whole numbers';
        end if;
        v_value := p_stats->v_side->>v_key;
        if v_value !~ '^[0-9]+$' then raise exception 'Match statistics must be whole numbers'; end if;
        if v_value::numeric > (case when v_key = 'possession' then 100 when v_key = 'passes' then 9999 else 999 end) then
          raise exception 'Match statistic is out of range';
        end if;
      end if;
    end loop;
    if (p_stats->v_side->>'shots')::integer < (p_stats->v_side->>'shotsOnTarget')::integer then
      raise exception 'Shots on target cannot exceed total shots';
    end if;
  end loop;
  v_home_possession := (p_stats->'home'->>'possession')::integer;
  v_away_possession := (p_stats->'away'->>'possession')::integer;
  if (v_home_possession is null) <> (v_away_possession is null)
    or (v_home_possession is not null and v_home_possession + v_away_possession <> 100) then
    raise exception 'Possession values must both be provided and total 100';
  end if;
  insert into public.league_matches (home_team, away_team, home_goals, away_goals, stats, season, created_by)
  values (p_home, p_away, p_home_goals, p_away_goals, coalesce(p_stats, '{}'::jsonb), p_season, auth.uid())
  returning id into v_match;
  return v_match;
end;
$$;

create or replace function public.recalculate_champions_trophy(p_season integer)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_one public.league_champions_matches;
  v_two public.league_champions_matches;
  v_three public.league_champions_matches;
  v_zero integer;
  v_one_total integer;
  v_winner smallint;
begin
  delete from public.league_club_trophies where season = p_season and competition = 'champions_league';
  select * into v_one from public.league_champions_matches where season = p_season and leg = 1;
  select * into v_two from public.league_champions_matches where season = p_season and leg = 2;
  select * into v_three from public.league_champions_matches where season = p_season and leg = 3;
  if v_one.id is null or v_two.id is null then return; end if;
  select sum(case when home_team = 0 then home_goals else away_goals end),
         sum(case when home_team = 1 then home_goals else away_goals end)
    into v_zero, v_one_total from public.league_champions_matches where season = p_season and leg in (1, 2);
  if v_zero > v_one_total then v_winner := 0;
  elsif v_zero < v_one_total then v_winner := 1;
  elsif v_three.id is not null then
    if v_three.home_goals > v_three.away_goals or
       (v_three.home_goals = v_three.away_goals and v_three.home_penalties > v_three.away_penalties)
      then v_winner := v_three.home_team;
    else v_winner := v_three.away_team;
    end if;
  end if;
  if v_winner is not null then
    insert into public.league_club_trophies (team_index, competition, season)
    values (v_winner, 'champions_league', p_season);
  end if;
end;
$$;

create or replace function public.save_champions_match(
  p_home smallint, p_away smallint, p_home_goals integer, p_away_goals integer,
  p_season integer, p_leg smallint, p_stats jsonb default '{}'::jsonb,
  p_home_penalties integer default null, p_away_penalties integer default null
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  v_proposal uuid;
  v_match uuid;
begin
  -- The existing validator checks ownership, fixture order, statistics and season under a lock.
  v_proposal := public.propose_league_champions_match(
    p_home, p_away, p_home_goals, p_away_goals, p_season, p_leg, p_stats, p_home_penalties, p_away_penalties);
  insert into public.league_champions_matches
    (home_team, away_team, home_goals, away_goals, home_penalties, away_penalties, stats, season, leg, created_by)
  values (p_home, p_away, p_home_goals, p_away_goals, p_home_penalties, p_away_penalties,
    coalesce(p_stats, '{}'::jsonb), p_season, p_leg, auth.uid())
  returning id into v_match;
  update public.league_champions_proposals set status = 'confirmed', resolved_at = now() where id = v_proposal;
  insert into public.league_club_trophies (team_index, competition, season)
  values (0, 'participation', p_season), (1, 'participation', p_season) on conflict do nothing;
  perform public.recalculate_champions_trophy(p_season);
  return v_match;
end;
$$;

create or replace function public.delete_champions_match(p_id uuid)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_team smallint := public.get_my_team();
  v_match public.league_champions_matches;
begin
  if v_team is null then raise exception 'This account is not linked to a team'; end if;
  perform 1 from public.league_settings where id = true for update;
  select * into v_match from public.league_champions_matches where id = p_id for update;
  if not found then raise exception 'Champions League match not found'; end if;
  if v_team not in (v_match.home_team, v_match.away_team) then raise exception 'Not your Champions League match'; end if;
  delete from public.league_champions_matches where id = p_id;
  perform public.recalculate_champions_trophy(v_match.season);
end;
$$;

revoke all on function public.recalculate_champions_trophy(integer) from public, anon, authenticated;
revoke all on function public.save_league_match(smallint, smallint, integer, integer, jsonb, integer) from public, anon;
revoke all on function public.save_champions_match(smallint, smallint, integer, integer, integer, smallint, jsonb, integer, integer) from public, anon;
revoke all on function public.delete_champions_match(uuid) from public, anon;
grant execute on function public.save_league_match(smallint, smallint, integer, integer, jsonb, integer) to authenticated;
grant execute on function public.save_champions_match(smallint, smallint, integer, integer, integer, smallint, jsonb, integer, integer) to authenticated;
grant execute on function public.delete_champions_match(uuid) to authenticated;

update public.league_match_proposals set status = 'cancelled', resolved_at = now() where status = 'pending';
update public.league_champions_proposals set status = 'cancelled', resolved_at = now() where status = 'pending';
revoke execute on function public.propose_league_match(smallint, smallint, integer, integer, jsonb, integer) from public, anon, authenticated;
revoke execute on function public.confirm_league_match(uuid) from public, anon, authenticated;
revoke execute on function public.decline_league_match(uuid) from public, anon, authenticated;
revoke execute on function public.propose_league_champions_match(smallint, smallint, integer, integer, integer, smallint, jsonb, integer, integer) from public, anon, authenticated;
revoke execute on function public.confirm_league_champions_match(uuid) from public, anon, authenticated;
revoke execute on function public.decline_league_champions_match(uuid) from public, anon, authenticated;
