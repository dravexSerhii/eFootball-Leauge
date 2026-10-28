create table if not exists public.league_news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text not null check (char_length(description) between 1 and 3000),
  image_path text not null,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid()
);

alter table public.league_news enable row level security;

grant select on public.league_news to anon, authenticated;
grant insert on public.league_news to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'league_news'
      and policyname = 'Anyone can read league news'
  ) then
    create policy "Anyone can read league news"
      on public.league_news for select to anon, authenticated using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'league_news'
      and policyname = 'League members can publish news'
  ) then
  create policy "League members can publish news"
    on public.league_news for insert to authenticated with check (auth.uid() = created_by);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'league_news'
      and policyname = 'Users can delete their own league news'
  ) then
    create policy "Users can delete their own league news"
      on public.league_news for delete to authenticated
      using (auth.uid() = created_by);
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Anyone can view league news photos'
  ) then
    create policy "Anyone can view league news photos"
      on storage.objects for select to anon, authenticated
      using (bucket_id = 'news-images');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'League members can upload news photos'
  ) then
    create policy "League members can upload news photos"
      on storage.objects for insert to authenticated
      with check (bucket_id = 'news-images');
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Users can remove their own news photos'
  ) then
    create policy "Users can remove their own news photos"
      on storage.objects for delete to authenticated
      using (bucket_id = 'news-images' and owner_id = (select auth.uid()::text));
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'league_news'
  ) then
    alter publication supabase_realtime add table public.league_news;
  end if;
end
$$;
