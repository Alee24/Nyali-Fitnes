-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('member', 'coach', 'admin')) default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. COACHES
create table public.coaches (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  specialty text,
  bio text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CLASSES (Class Types/Templates)
create table public.classes (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  duration_minutes integer default 60,
  default_capacity integer default 20,
  intensity text check (intensity in ('Low', 'Medium', 'High', 'Variable')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SCHEDULE (Actual Class Instances)
create table public.schedule (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  coach_id uuid references public.coaches(id) on delete set null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  capacity integer default 20,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. BOOKINGS
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  schedule_id uuid references public.schedule(id) on delete cascade not null,
  status text check (status in ('confirmed', 'cancelled', 'waitlist')) default 'confirmed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, schedule_id) -- Prevent double booking
);

-- RLS POLICIES ------------------------------------------------

-- Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Coaches & Classes (Public Read, Admin Write)
alter table public.coaches enable row level security;
create policy "Coaches viewable by everyone" on coaches for select using (true);

alter table public.classes enable row level security;
create policy "Classes viewable by everyone" on classes for select using (true);

alter table public.schedule enable row level security;
create policy "Schedule viewable by everyone" on schedule for select using (true);

-- Bookings (User Manage Own, Admin Manage All)
alter table public.bookings enable row level security;
create policy "Users view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users create own bookings" on bookings for insert with check (auth.uid() = user_id);
create policy "Users update own bookings" on bookings for update using (auth.uid() = user_id);
create policy "Admins view all bookings" on bookings for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- FUNCTIONS ------------------------------------------------

-- Function to handle booking with capacity check
create or replace function public.book_class(
  p_schedule_id uuid,
  p_user_id uuid
) returns json as $$
declare
  v_capacity int;
  v_count int;
  v_booking_id uuid;
begin
  -- Check if user already booked
  if exists (select 1 from bookings where schedule_id = p_schedule_id and user_id = p_user_id and status = 'confirmed') then
    return json_build_object('success', false, 'message', 'You are already booked for this class.');
  end if;

  -- Get class capacity
  select capacity into v_capacity from schedule where id = p_schedule_id;
  
  -- Get current booking count
  select count(*) into v_count from bookings where schedule_id = p_schedule_id and status = 'confirmed';

  if v_count >= v_capacity then
    return json_build_object('success', false, 'message', 'Class is full.');
  end if;

  -- Insert booking
  insert into bookings (user_id, schedule_id, status)
  values (p_user_id, p_schedule_id, 'confirmed')
  returning id into v_booking_id;

  return json_build_object('success', true, 'message', 'Booking confirmed!', 'booking_id', v_booking_id);
end;
$$ language plpgsql security definer;

-- SEED DATA (Optional, for testing)
-- Insert some classes and coaches if empty
insert into public.coaches (name, specialty, bio, image_url)
select 'Mike Ochieng', 'CrossFit L3', 'Head Coach', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
where not exists (select 1 from coaches);

insert into public.classes (title, description, intensity)
select 'WOD', 'Workout of the Day', 'High'
where not exists (select 1 from classes);
