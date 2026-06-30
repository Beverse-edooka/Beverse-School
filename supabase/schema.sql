# Run this in the Supabase SQL Editor when migrating from local SQLite.
# Then set DATABASE_URL to your Supabase Postgres connection string (Session mode / pooler).

create table if not exists "Admin" (
  id text primary key,
  email text unique not null,
  "passwordHash" text not null,
  "createdAt" timestamptz default now()
);

create table if not exists "Mentor" (
  id text primary key,
  name text not null,
  role text not null,
  bio text not null,
  "photoUrl" text,
  featured boolean default false,
  "sortOrder" int default 0,
  "isActive" boolean default true,
  "createdAt" timestamptz default now(),
  "updatedAt" timestamptz default now()
);

create table if not exists "Batch" (
  id text primary key,
  number int unique not null,
  name text not null,
  "maxSeats" int default 25,
  status text default 'open',
  "createdAt" timestamptz default now()
);

create table if not exists "WaitlistEntry" (
  id text primary key,
  "batchId" text not null references "Batch"(id),
  "fullName" text not null,
  email text not null,
  phone text,
  status text default 'pending',
  "createdAt" timestamptz default now(),
  unique(email, "batchId")
);

create table if not exists "SiteUser" (
  id text primary key,
  email text unique not null,
  "passwordHash" text not null,
  "fullName" text not null,
  "createdAt" timestamptz default now()
);

-- Mentor photos: create a public bucket named "mentor-photos" in Supabase Storage.
