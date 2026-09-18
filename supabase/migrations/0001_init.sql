-- Wings Foundation School — initial schema + RLS
-- Run via: supabase db push  (or the Supabase SQL editor)

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('super_admin', 'admin', 'editor');
create type enquiry_status as enum (
  'new', 'contacted', 'visit_scheduled', 'visited', 'application', 'admitted', 'closed'
);
create type visit_status as enum (
  'requested', 'confirmed', 'rescheduled', 'completed', 'cancelled'
);
create type announcement_type as enum ('general', 'holiday', 'admission', 'event', 'important');
create type event_status as enum ('draft', 'published', 'archived');

-- ============================================================
-- PROFILES & ROLES  (spec section 24)
-- ============================================================
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  role user_role not null default 'editor',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- SECURITY HELPER FUNCTIONS (spec section 33)
-- `security definer` + fixed search_path so these are safe to call from RLS
-- policies without being spoofable by a caller-controlled search_path.
-- ============================================================
create or replace function is_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'super_admin') and is_active
  );
$$;

create or replace function is_editor() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('editor', 'admin', 'super_admin') and is_active
  );
$$;

create or replace function is_super_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'super_admin' and is_active
  );
$$;

-- ============================================================
-- SITE SETTINGS (section 25)
-- ============================================================
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  school_name text not null default 'Wings Foundation School',
  tagline text,
  phone text,
  whatsapp text,
  email text,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  google_business_url text,
  logo_url text,
  favicon_url text,
  hero_image_url text,
  default_meta_title text,
  default_meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- PROGRAMS
-- ============================================================
create table programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  age_min int,
  age_max int,
  duration text,
  timing text,
  image text,
  highlights text[],
  learning_focus text[],
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table program_features (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  label text not null,
  display_order int not null default 0
);

-- ============================================================
-- ACTIVITIES
-- ============================================================
create table activity_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid references activity_categories (id) on delete set null,
  image text,
  gallery text[],
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- GALLERY
-- ============================================================
create table gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0
);

create table gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  storage_path text,
  category_id uuid references gallery_categories (id) on delete set null,
  alt_text text,
  caption text,
  display_order int not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- EVENTS
-- ============================================================
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  event_date date,
  location text,
  cover_image text,
  status event_status not null default 'draft',
  is_featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table event_gallery (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  image_url text not null,
  display_order int not null default 0
);

-- ============================================================
-- TESTIMONIALS  (never fabricate — spec section 19)
-- ============================================================
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  relationship text,
  content text not null,
  source text,
  source_url text,
  rating int check (rating between 1 and 5),
  image_url text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- FAQS
-- ============================================================
create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  display_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  type announcement_type not null default 'general',
  start_date date,
  end_date date,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ENQUIRIES  (public insert, admin-only read — spec section 26/32)
-- ============================================================
create table enquiries (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  child_name text not null,
  child_dob date,
  phone text not null,
  email text,
  area text,
  program_id uuid references programs (id) on delete set null,
  preferred_contact_method text,
  message text,
  source text default 'website',
  status enquiry_status not null default 'new',
  assigned_to uuid references profiles (id) on delete set null,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- SCHOOL VISITS
-- ============================================================
create table school_visits (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  child_name text,
  child_age int,
  phone text not null,
  email text,
  program_id uuid references programs (id) on delete set null,
  preferred_date date not null,
  preferred_time text,
  status visit_status not null default 'requested',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- CONTACT MESSAGES / NEWSLETTER
-- ============================================================
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- SEO
-- ============================================================
create table seo_pages (
  id uuid primary key default gen_random_uuid(),
  route text not null unique,
  title text,
  description text,
  keywords text,
  og_title text,
  og_description text,
  og_image text,
  canonical_url text,
  robots text default 'index,follow',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- AUDIT LOGS  (spec section 44 — only super_admin may delete)
-- ============================================================
create table admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references profiles (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- updated_at trigger helper
-- ============================================================
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'site_settings','programs','gallery_items','events','testimonials',
      'faqs','announcements','enquiries','school_visits','contact_messages',
      'seo_pages'
    ])
  loop
    execute format(
      'create trigger set_updated_at before update on %I for each row execute function set_updated_at();',
      t
    );
  end loop;
end $$;

-- ============================================================
-- ROW LEVEL SECURITY (mandatory on every table — spec section 32)
-- ============================================================
alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table programs enable row level security;
alter table program_features enable row level security;
alter table activity_categories enable row level security;
alter table activities enable row level security;
alter table gallery_categories enable row level security;
alter table gallery_items enable row level security;
alter table events enable row level security;
alter table event_gallery enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table announcements enable row level security;
alter table enquiries enable row level security;
alter table school_visits enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
alter table seo_pages enable row level security;
alter table admin_audit_logs enable row level security;

-- ---- profiles ----
create policy "profiles_self_select" on profiles for select
  using (id = auth.uid() or is_admin());
create policy "profiles_admin_write" on profiles for all
  using (is_super_admin()) with check (is_super_admin());

-- ---- site_settings: public read, admin write ----
create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_admin_write" on site_settings for insert with check (is_admin());
create policy "site_settings_admin_update" on site_settings for update using (is_admin()) with check (is_admin());

-- ---- published-content tables: public read where is_active/is_published, editor+ write ----
create policy "programs_public_read" on programs for select using (is_active = true or is_editor());
create policy "programs_editor_write" on programs for insert with check (is_editor());
create policy "programs_editor_update" on programs for update using (is_editor()) with check (is_editor());
create policy "programs_admin_delete" on programs for delete using (is_admin());

create policy "program_features_public_read" on program_features for select using (true);
create policy "program_features_editor_write" on program_features for all
  using (is_editor()) with check (is_editor());

create policy "activity_categories_public_read" on activity_categories for select using (true);
create policy "activity_categories_editor_write" on activity_categories for all
  using (is_editor()) with check (is_editor());

create policy "activities_public_read" on activities for select using (is_active = true or is_editor());
create policy "activities_editor_write" on activities for insert with check (is_editor());
create policy "activities_editor_update" on activities for update using (is_editor()) with check (is_editor());
create policy "activities_admin_delete" on activities for delete using (is_admin());

create policy "gallery_categories_public_read" on gallery_categories for select using (true);
create policy "gallery_categories_editor_write" on gallery_categories for all
  using (is_editor()) with check (is_editor());

create policy "gallery_items_public_read" on gallery_items for select using (is_published = true or is_editor());
create policy "gallery_items_editor_write" on gallery_items for insert with check (is_editor());
create policy "gallery_items_editor_update" on gallery_items for update using (is_editor()) with check (is_editor());
create policy "gallery_items_admin_delete" on gallery_items for delete using (is_admin());

create policy "events_public_read" on events for select using (is_published = true or is_editor());
create policy "events_editor_write" on events for insert with check (is_editor());
create policy "events_editor_update" on events for update using (is_editor()) with check (is_editor());
create policy "events_admin_delete" on events for delete using (is_admin());

create policy "event_gallery_public_read" on event_gallery for select using (true);
create policy "event_gallery_editor_write" on event_gallery for all
  using (is_editor()) with check (is_editor());

create policy "testimonials_public_read" on testimonials for select using (is_published = true or is_editor());
create policy "testimonials_editor_write" on testimonials for insert with check (is_editor());
create policy "testimonials_editor_update" on testimonials for update using (is_editor()) with check (is_editor());
create policy "testimonials_admin_delete" on testimonials for delete using (is_admin());

create policy "faqs_public_read" on faqs for select using (is_published = true or is_editor());
create policy "faqs_editor_write" on faqs for insert with check (is_editor());
create policy "faqs_editor_update" on faqs for update using (is_editor()) with check (is_editor());
create policy "faqs_admin_delete" on faqs for delete using (is_admin());

create policy "announcements_public_read" on announcements for select using (is_published = true or is_editor());
create policy "announcements_editor_write" on announcements for insert with check (is_editor());
create policy "announcements_editor_update" on announcements for update using (is_editor()) with check (is_editor());
create policy "announcements_admin_delete" on announcements for delete using (is_admin());

create policy "seo_pages_public_read" on seo_pages for select using (true);
create policy "seo_pages_editor_write" on seo_pages for all
  using (is_editor()) with check (is_editor());

-- ---- enquiries / school_visits / contact_messages / newsletter ----
-- Anonymous users may INSERT only. No anonymous SELECT/UPDATE/DELETE.
-- Only admin/editor roles may read or manage these records.
create policy "enquiries_public_insert" on enquiries for insert
  to anon, authenticated with check (true);
create policy "enquiries_admin_select" on enquiries for select using (is_editor());
create policy "enquiries_admin_update" on enquiries for update using (is_editor()) with check (is_editor());
create policy "enquiries_admin_delete" on enquiries for delete using (is_admin());

create policy "school_visits_public_insert" on school_visits for insert
  to anon, authenticated with check (true);
create policy "school_visits_admin_select" on school_visits for select using (is_editor());
create policy "school_visits_admin_update" on school_visits for update using (is_editor()) with check (is_editor());
create policy "school_visits_admin_delete" on school_visits for delete using (is_admin());

create policy "contact_messages_public_insert" on contact_messages for insert
  to anon, authenticated with check (true);
create policy "contact_messages_admin_select" on contact_messages for select using (is_editor());
create policy "contact_messages_admin_update" on contact_messages for update using (is_editor()) with check (is_editor());
create policy "contact_messages_admin_delete" on contact_messages for delete using (is_admin());

create policy "newsletter_public_insert" on newsletter_subscribers for insert
  to anon, authenticated with check (true);
create policy "newsletter_admin_select" on newsletter_subscribers for select using (is_admin());
create policy "newsletter_admin_delete" on newsletter_subscribers for delete using (is_admin());

-- ---- audit logs: admins can read/insert; only super_admin can delete ----
create policy "audit_logs_admin_select" on admin_audit_logs for select using (is_admin());
create policy "audit_logs_admin_insert" on admin_audit_logs for insert with check (is_admin());
create policy "audit_logs_super_admin_delete" on admin_audit_logs for delete using (is_super_admin());
