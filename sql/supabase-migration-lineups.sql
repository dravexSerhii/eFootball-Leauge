alter table public.league_settings add column if not exists lineups jsonb not null default '{}'::jsonb;

grant select, update on public.league_settings to authenticated;
