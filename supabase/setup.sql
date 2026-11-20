-- Best Motors Bay: run this once in Supabase > SQL Editor.
-- 1) The Mix Man password is set to 'choose' at the bottom of this file (also in .env as MIXMAN_PASSWORD).
create extension if not exists pgcrypto;

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  sale_price numeric not null,
  colors text[] not null default '{}',
  stock int not null default 1,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);
grant select on public.cars to anon, authenticated;
grant all on public.cars to service_role;
alter table public.cars enable row level security;
drop policy if exists "Anyone can view cars" on public.cars;
create policy "Anyone can view cars" on public.cars for select using (true);

create table if not exists public.mixman_secret (id int primary key default 1, pass_hash text not null);
alter table public.mixman_secret enable row level security; -- no policies: nobody can read it

create or replace function public.mixman_ok(p_pass text) returns boolean
language sql security definer set search_path = public, extensions as $$
  select exists(select 1 from mixman_secret where pass_hash = crypt(p_pass, pass_hash));
$$;

create or replace function public.mixman_add_car(p_pass text, p_name text, p_price numeric, p_sale_price numeric, p_colors text[], p_stock int, p_images text[])
returns uuid language plpgsql security definer set search_path = public, extensions as $$
declare new_id uuid;
begin
  if not mixman_ok(p_pass) then raise exception 'Wrong password'; end if;
  insert into cars(name, price, sale_price, colors, stock, images)
  values (p_name, p_price, p_sale_price, p_colors, p_stock, p_images) returning id into new_id;
  return new_id;
end $$;

create or replace function public.mixman_delete_car(p_pass text, p_id uuid)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  if not mixman_ok(p_pass) then raise exception 'Wrong password'; end if;
  delete from cars where id = p_id;
end $$;

grant execute on function public.mixman_ok(text) to anon, authenticated;
grant execute on function public.mixman_add_car(text, text, numeric, numeric, text[], int, text[]) to anon, authenticated;
grant execute on function public.mixman_delete_car(text, uuid) to anon, authenticated;

-- Image storage (public bucket for car photos)
insert into storage.buckets (id, name, public) values ('car-images', 'car-images', true)
on conflict (id) do nothing;
drop policy if exists "Public read car images" on storage.objects;
create policy "Public read car images" on storage.objects for select using (bucket_id = 'car-images');
drop policy if exists "Upload car images" on storage.objects;
create policy "Upload car images" on storage.objects for insert to anon, authenticated with check (bucket_id = 'car-images');

-- MIX MAN PASSWORD (also stored in .env as MIXMAN_PASSWORD):
insert into public.mixman_secret (id, pass_hash) values (1, crypt('choose', gen_salt('bf')))
on conflict (id) do update set pass_hash = excluded.pass_hash;
