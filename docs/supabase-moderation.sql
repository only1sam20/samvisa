-- OPTIONAL FUTURE INTEGRATION. This file is not executed by the application.
-- Run only in a new/appropriate Supabase project after reviewing its schema.
-- The current website emails reviews and publishes approved content manually.
-- Raw submissions remain private: no browser-facing policies or public view.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  professional_title text not null check (char_length(professional_title) between 2 and 150),
  company text check (company is null or char_length(company) <= 150),
  service text not null check (char_length(service) between 1 and 150),
  rating smallint not null check (rating between 1 and 5),
  review text not null check (char_length(review) between 20 and 3000),
  privacy_preference text not null check (privacy_preference in ('full-name', 'first-name', 'anonymous')),
  consent boolean not null default false,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  constraint approval_requires_consent check (approved = false or consent = true)
);

alter table public.reviews enable row level security;
alter table public.reviews force row level security;

-- No RLS policies are created. Anonymous and ordinary authenticated clients
-- have neither direct grants nor a policy permitting access to this table.
revoke all privileges on table public.reviews from public, anon, authenticated;

-- The future server-only integration uses the service role; never expose its
-- key in the browser. Moderation takes place in the authenticated owner console.
grant select, insert, update, delete on table public.reviews to service_role;

-- Future inserts must explicitly set approved = false, preserve consent, and
-- accept only server-validated fields. Do not trust a submitted approved flag.
-- A future public loader must query approved = true AND consent = true, then
-- return only reviewed publication text and consented identity. For anonymous
-- reviews, omit title/company and remove identifying information in the quote.
-- Never return this raw table, even if a row has been approved.
-- If this table already exists, CREATE TABLE IF NOT EXISTS will not migrate its
-- columns or remove existing policies: inspect those separately before use.
