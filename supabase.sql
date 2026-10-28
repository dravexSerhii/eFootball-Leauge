create table public.league_settings (
  id boolean primary key default true check (id = true),
  teams jsonb not null default '[{"name":"FC Promashkov"},{"name":"FC Lionslav"}]'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.league_settings (id)
values (true)
on conflict (id) do nothing;

create table public.league_matches (
  id uuid primary key default gen_random_uuid(),
  home_team smallint not null check (home_team in (0, 1)),
  away_team smallint not null check (away_team in (0, 1) and away_team <> home_team),
  home_goals smallint not null check (home_goals between 0 and 99),
  away_goals smallint not null check (away_goals between 0 and 99),
  played_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid()
);

alter table public.league_settings enable row level security;
alter table public.league_matches enable row level security;

grant select, update on public.league_settings to authenticated;
grant select, insert on public.league_matches to authenticated;

create policy "League members can read settings"
  on public.league_settings for select to authenticated using (true);

create policy "League members can update settings"
  on public.league_settings for update to authenticated using (true) with check (true);

create policy "League members can read matches"
  on public.league_matches for select to authenticated using (true);

create policy "League members can add matches"
  on public.league_matches for insert to authenticated with check (true);

alter publication supabase_realtime add table public.league_settings;
alter publication supabase_realtime add table public.league_matches;
