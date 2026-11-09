-- Run after supabase-migration-direct-results.sql.
begin;

alter table public.league_club_trophies
  drop constraint if exists league_club_trophies_competition_check;
alter table public.league_club_trophies
  add constraint league_club_trophies_competition_check
  check (competition in ('participation', 'champions_league', 'league'));
create unique index if not exists league_club_league_trophy_per_season
  on public.league_club_trophies (season) where competition = 'league';

create or replace function public.recalculate_league_trophy(p_season integer)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_count integer;
  v_date timestamptz;
  v_winner smallint;
begin
  perform 1 from public.league_settings where id = true for update;
  if not found then raise exception 'League settings were not found'; end if;
  select count(*), max(played_at) into v_count, v_date
    from public.league_matches where season = p_season;
  if v_count < 36 then
    delete from public.league_club_trophies where competition = 'league' and season = p_season;
    return;
  end if;
  with scores as (
    select home_team as team, home_goals as goals_for, away_goals as goals_against
      from public.league_matches where season = p_season
    union all
    select away_team, away_goals, home_goals from public.league_matches where season = p_season
  )
  select team into v_winner from scores group by team
    order by sum(case when goals_for > goals_against then 3 when goals_for = goals_against then 1 else 0 end) desc,
      sum(goals_for - goals_against) desc, sum(goals_for) desc, team asc limit 1;
  delete from public.league_club_trophies
    where competition = 'league' and season = p_season and team_index <> v_winner;
  insert into public.league_club_trophies (team_index, competition, season, awarded_at)
    values (v_winner, 'league', p_season, v_date)
    on conflict (season) where competition = 'league'
    do update set team_index = excluded.team_index, awarded_at = excluded.awarded_at;
end;
$$;

create or replace function public.update_league_trophies()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if tg_op <> 'DELETE' then
    insert into public.league_club_trophies (team_index, competition, season, awarded_at)
      values (new.home_team, 'participation', new.season, new.played_at),
             (new.away_team, 'participation', new.season, new.played_at)
      on conflict do nothing;
    perform public.recalculate_league_trophy(new.season);
  end if;
  if tg_op = 'DELETE' then
    perform public.recalculate_league_trophy(old.season);
  elsif tg_op = 'UPDATE' and old.season is distinct from new.season then
    perform public.recalculate_league_trophy(old.season);
  end if;
  return null;
end;
$$;

drop trigger if exists league_match_trophies on public.league_matches;
create trigger league_match_trophies after insert or update or delete on public.league_matches
  for each row execute function public.update_league_trophies();

-- Earlier versions awarded these medals for Champions League participation.
create table if not exists public.league_trophy_migrations (name text primary key);
revoke all on public.league_trophy_migrations from public, anon, authenticated;
do $$
begin
  insert into public.league_trophy_migrations (name) values ('league-participation-v1')
    on conflict do nothing;
  if found then
    delete from public.league_club_trophies where competition = 'participation';
    insert into public.league_club_trophies (team_index, competition, season, awarded_at)
    select distinct on (team_index) team_index, 'participation', season, played_at
    from (
      select home_team as team_index, season, played_at, id from public.league_matches
      union all
      select away_team, season, played_at, id from public.league_matches
    ) matches
    order by team_index, played_at, id;
  end if;
end;
$$;

do $$
declare v_season integer;
begin
  for v_season in select distinct season from public.league_matches loop
    perform public.recalculate_league_trophy(v_season);
  end loop;
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
  v_date timestamptz;
begin
  select * into v_one from public.league_champions_matches where season = p_season and leg = 1;
  select * into v_two from public.league_champions_matches where season = p_season and leg = 2;
  select * into v_three from public.league_champions_matches where season = p_season and leg = 3;
  if v_one.id is not null and v_two.id is not null then
    select sum(case when home_team = 0 then home_goals else away_goals end),
           sum(case when home_team = 1 then home_goals else away_goals end)
      into v_zero, v_one_total from public.league_champions_matches where season = p_season and leg in (1, 2);
    v_date := greatest(v_one.played_at, v_two.played_at);
    if v_zero > v_one_total then v_winner := 0;
    elsif v_zero < v_one_total then v_winner := 1;
    elsif v_three.id is not null then
      v_date := greatest(v_date, v_three.played_at);
      if v_three.home_goals > v_three.away_goals or
        (v_three.home_goals = v_three.away_goals and v_three.home_penalties > v_three.away_penalties)
        then v_winner := v_three.home_team;
      else v_winner := v_three.away_team; end if;
    end if;
  end if;
  delete from public.league_club_trophies
    where season = p_season and competition = 'champions_league'
      and (v_winner is null or team_index <> v_winner);
  if v_winner is not null then
    insert into public.league_club_trophies (team_index, competition, season, awarded_at)
      values (v_winner, 'champions_league', p_season, v_date)
      on conflict (team_index, season) where competition = 'champions_league'
      do update set awarded_at = excluded.awarded_at;
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
declare v_proposal uuid; v_match uuid;
begin
  v_proposal := public.propose_league_champions_match(
    p_home, p_away, p_home_goals, p_away_goals, p_season, p_leg, p_stats, p_home_penalties, p_away_penalties);
  insert into public.league_champions_matches
    (home_team, away_team, home_goals, away_goals, home_penalties, away_penalties, stats, season, leg, created_by)
  values (p_home, p_away, p_home_goals, p_away_goals, p_home_penalties, p_away_penalties,
    coalesce(p_stats, '{}'::jsonb), p_season, p_leg, auth.uid())
  returning id into v_match;
  update public.league_champions_proposals set status = 'confirmed', resolved_at = now() where id = v_proposal;
  perform public.recalculate_champions_trophy(p_season);
  return v_match;
end;
$$;

do $$
declare v_season integer;
begin
  for v_season in
    select season from public.league_champions_matches
    union select season from public.league_club_trophies where competition = 'champions_league'
  loop
    perform public.recalculate_champions_trophy(v_season);
  end loop;
end;
$$;

revoke all on function public.recalculate_league_trophy(integer) from public, anon, authenticated;
revoke all on function public.update_league_trophies() from public, anon, authenticated;
commit;
