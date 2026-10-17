begin;
insert into auth.users(id) values ('e0000000-0000-4000-8000-000000000001'),('e0000000-0000-4000-8000-000000000002');
set local role authenticated;
select set_config('request.jwt.claim.sub','e0000000-0000-4000-8000-000000000001',true);
insert into public.edpix_tutor_boards(id,user_id,title,board) values ('b0000000-0000-4000-8000-000000000001','e0000000-0000-4000-8000-000000000001','RLS test','{"nodes":[],"notes":"","language":"English"}');
update public.edpix_tutor_boards set title='Saved and resumed' where id='b0000000-0000-4000-8000-000000000001';
do $$ begin
 if not exists(select 1 from public.edpix_tutor_boards where title='Saved and resumed' and id='b0000000-0000-4000-8000-000000000001') then raise exception 'Own save/resume failed';end if;
 begin
 update public.edpix_tutor_boards set user_id='e0000000-0000-4000-8000-000000000002' where id='b0000000-0000-4000-8000-000000000001';
 raise exception 'Owner reassignment allowed';
 exception when insufficient_privilege then null;end;
end $$;
select set_config('request.jwt.claim.sub','e0000000-0000-4000-8000-000000000002',true);
do $$ declare n integer;begin
 if exists(select 1 from public.edpix_tutor_boards where id='b0000000-0000-4000-8000-000000000001') then raise exception 'Cross-owner read allowed';end if;
 update public.edpix_tutor_boards set title='Unauthorized' where id='b0000000-0000-4000-8000-000000000001';get diagnostics n=row_count;if n<>0 then raise exception 'Cross-owner update allowed';end if;
 delete from public.edpix_tutor_boards where id='b0000000-0000-4000-8000-000000000001';get diagnostics n=row_count;if n<>0 then raise exception 'Cross-owner delete allowed';end if;
 begin
 insert into public.edpix_tutor_boards(user_id,title,board) values('e0000000-0000-4000-8000-000000000001','Unauthorized','{}');raise exception 'Cross-owner insert allowed';
 exception when insufficient_privilege then null;end;
 if has_function_privilege('authenticated','public.edpix_take_tutor_request(uuid)','execute') then raise exception 'Client quota access';end if;
end $$;
reset role;
set local role anon;
do $$ begin
 begin perform 1 from public.edpix_tutor_boards;raise exception 'Anonymous read allowed';exception when insufficient_privilege then null;end;
end $$;
reset role;
set local role service_role;
do $$ begin
 for i in 1..30 loop if not public.edpix_take_tutor_request('e0000000-0000-4000-8000-000000000001') then raise exception 'Quota rejected early';end if;end loop;
 if public.edpix_take_tutor_request('e0000000-0000-4000-8000-000000000001') then raise exception 'Quota not enforced';end if;
end $$;
reset role;
select 'PASS: owner save/resume, cross-user read/write/delete denial, owner reassignment denial, anonymous denial, client quota denial, daily quota boundary' as result;
rollback;
