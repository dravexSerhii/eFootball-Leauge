-- Private 1:1 messages between accepted league friends.
-- Run once in Supabase -> SQL Editor, after teams-friends and profile-extras migrations.

create table if not exists public.league_messages (
  id uuid primary key default gen_random_uuid(),
  sender uuid not null references auth.users (id) on delete cascade,
  recipient uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  sent_at timestamptz not null default now(),
  read_at timestamptz,
  check (sender <> recipient)
);

create index if not exists league_messages_conversation_idx
  on public.league_messages (sender, recipient, sent_at desc);
create index if not exists league_messages_recipient_idx
  on public.league_messages (recipient, read_at, sent_at desc);

alter table public.league_messages enable row level security;
grant select on public.league_messages to authenticated;

create or replace function public.are_league_friends(p_left uuid, p_right uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.league_friendships f
    where f.status = 'accepted'
      and ((f.requester = p_left and f.addressee = p_right)
        or (f.requester = p_right and f.addressee = p_left))
  );
$$;
revoke all on function public.are_league_friends(uuid, uuid) from public, anon;
grant execute on function public.are_league_friends(uuid, uuid) to authenticated;

drop policy if exists "Friends can read their messages" on public.league_messages;
create policy "Friends can read their messages"
  on public.league_messages for select to authenticated
  using (
    auth.uid() in (sender, recipient)
    and public.are_league_friends(sender, recipient)
  );

create or replace function public.send_league_message(p_recipient uuid, p_body text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_body text := btrim(coalesce(p_body, ''));
begin
  if auth.uid() is null or p_recipient = auth.uid() then raise exception 'Invalid recipient'; end if;
  if char_length(v_body) not between 1 and 2000 then raise exception 'Message must be 1-2000 characters'; end if;
  if not exists (
    select 1 from public.league_friendships f
    where f.status = 'accepted'
      and ((f.requester = auth.uid() and f.addressee = p_recipient)
        or (f.addressee = auth.uid() and f.requester = p_recipient))
  ) then raise exception 'You can message accepted friends only'; end if;

  insert into public.league_messages (sender, recipient, body)
  values (auth.uid(), p_recipient, v_body)
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.mark_league_messages_read(p_sender uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  update public.league_messages
  set read_at = now()
  where sender = p_sender and recipient = auth.uid() and read_at is null
    and exists (
      select 1 from public.league_friendships f
      where f.status = 'accepted'
        and ((f.requester = auth.uid() and f.addressee = p_sender)
          or (f.addressee = auth.uid() and f.requester = p_sender))
    );
end;
$$;

revoke all on function public.send_league_message(uuid, text) from public, anon;
revoke all on function public.mark_league_messages_read(uuid) from public, anon;
grant execute on function public.send_league_message(uuid, text) to authenticated;
grant execute on function public.mark_league_messages_read(uuid) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'league_messages'
  ) then
    alter publication supabase_realtime add table public.league_messages;
  end if;
end
$$;
