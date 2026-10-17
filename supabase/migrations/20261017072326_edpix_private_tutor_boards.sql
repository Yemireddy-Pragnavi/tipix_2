create table public.edpix_tutor_boards (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 title text not null check(length(title) between 1 and 120),
 board jsonb not null check(jsonb_typeof(board)='object' and octet_length(board::text)<=100000),
 updated_at timestamptz not null default now()
);
create index edpix_tutor_boards_owner on public.edpix_tutor_boards(user_id,updated_at desc);
alter table public.edpix_tutor_boards enable row level security;
revoke all on public.edpix_tutor_boards from anon,authenticated;
grant select,insert,update,delete on public.edpix_tutor_boards to authenticated;
create policy own_boards on public.edpix_tutor_boards for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create table public.edpix_tutor_usage(user_id uuid not null references auth.users(id) on delete cascade,day date not null default current_date,requests integer not null default 0,primary key(user_id,day));
alter table public.edpix_tutor_usage enable row level security;
revoke all on public.edpix_tutor_usage from anon,authenticated;
grant all on public.edpix_tutor_usage to service_role;
create function public.edpix_take_tutor_request(p_user uuid) returns boolean language plpgsql security invoker set search_path='' as $$
declare total integer; begin
 insert into public.edpix_tutor_usage(user_id,day,requests) values(p_user,current_date,1)
 on conflict(user_id,day) do update set requests=public.edpix_tutor_usage.requests+1 where public.edpix_tutor_usage.requests<30 returning requests into total;
 return total is not null;
end $$;
revoke all on function public.edpix_take_tutor_request(uuid) from public,anon,authenticated;
grant execute on function public.edpix_take_tutor_request(uuid) to service_role;
