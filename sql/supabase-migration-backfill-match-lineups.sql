-- Saves the current team lineups into every match that has no lineup yet.
-- Matches that already have a confirmed lineup are left untouched.
update public.league_matches as m
set stats = coalesce(m.stats, '{}'::jsonb) || jsonb_build_object('lineups', s.lineups)
from public.league_settings as s
where s.id = true
  and s.lineups <> '{}'::jsonb
  and (m.stats is null or m.stats -> 'lineups' is null);
