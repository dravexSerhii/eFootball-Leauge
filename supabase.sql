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
  stats jsonb not null default '{}'::jsonb,
  played_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid()
);

create table public.league_news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text not null check (char_length(description) between 1 and 3000),
  image_path text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid()
);

alter table public.league_settings enable row level security;
alter table public.league_matches enable row level security;
alter table public.league_news enable row level security;

grant select, update on public.league_settings to authenticated;
grant select, insert on public.league_matches to authenticated;
grant select on public.league_news to anon, authenticated;
grant insert on public.league_news to authenticated;

create policy "League members can read settings"
  on public.league_settings for select to authenticated using (true);

create policy "League members can update settings"
  on public.league_settings for update to authenticated using (true) with check (true);

create policy "League members can read matches"
  on public.league_matches for select to authenticated using (true);

create policy "League members can add matches"
  on public.league_matches for insert to authenticated with check (true);

create policy "Anyone can read league news"
  on public.league_news for select to anon, authenticated using (true);

create policy "League members can publish news"
  on public.league_news for insert to authenticated with check (auth.uid() = created_by);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "Anyone can view league news photos"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'news-images');

create policy "League members can upload news photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'news-images');

create policy "Users can remove their own news photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'news-images' and owner_id = (select auth.uid()::text));

alter publication supabase_realtime add table public.league_settings;
alter publication supabase_realtime add table public.league_matches;
alter publication supabase_realtime add table public.league_news;
