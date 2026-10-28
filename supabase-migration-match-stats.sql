alter table public.league_matches
  add column if not exists stats jsonb not null default '{}'::jsonb;
