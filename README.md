# Wings Foundation School — Website + CMS + Admin Platform

Status: **Phase 1 + admin auth/dashboard/Programs CRUD slice.**
This is a real, working starting point — not a mockup — but it is one slice
of the ~10-phase plan in the original spec, not the finished platform.

## 1. Architecture summary

- Next.js 15 (App Router) + TypeScript + Tailwind + shadcn-style primitives
- Supabase: Postgres + Auth + Storage, RLS-first authorization
- Three-tier Supabase client split: `lib/supabase/client.ts` (browser, anon
  key), `server.ts` (server components/actions, session-aware), `admin.ts`
  (service role, server-only, marked with `server-only` so it can't leak
  into a client bundle)
- `middleware.ts` gates `/admin/*` on an authenticated session; per-role
  authorization (`editor` / `admin` / `super_admin`) is enforced again by
  Postgres RLS via `is_admin()` / `is_editor()` / `is_super_admin()`, not
  just in the UI
- `/admin/login` sits outside the `(protected)` route group so the sidebar
  layout's auth check can't create a redirect loop on the login page itself

## 2. What's actually built and working

- Full route/folder structure for every public and admin route in the spec
- Design tokens (colors, fonts, motion) wired through CSS variables +
  Tailwind, with `prefers-reduced-motion` respected globally
- Root layout, Header (transparent→solid on scroll, mobile menu, sticky
  mobile CTA bar), Footer — all driven by a `site_settings` row, nothing
  hard-coded, with a graceful fallback if Supabase isn't configured yet
- Homepage: Hero, trust indicators, about/why-Wings previews, a real
  DB-driven Programs section with a proper empty state, admission CTA
- Complete initial SQL migration (`supabase/migrations/0001_init.sql`):
  every table from the spec, `updated_at` triggers, and RLS policies for
  all of them — public read only for published/active rows, anonymous
  insert-only on enquiries/visits/contact/newsletter, editor/admin/
  super_admin tiers enforced in Postgres
- Safe seed data (`supabase/seed.sql`) — grounded in the school's real
  public listings where verifiable, `[TO BE CONFIRMED]` placeholders
  elsewhere; see `SOURCE-NOTES.md`
- **Admin auth**: `/admin/login` (Supabase Auth, generic error message,
  show/hide password), sidebar+topbar shell, role-aware nav
- **Admin dashboard**: real DB counts, no invented numbers, no chart until
  there's real data
- **Programs CRUD**: full create/edit/delete/publish flow with validation,
  audit logging, and on-demand revalidation of the public pages — see
  `ADMIN-SETUP.md` for how to log in

## 3. Not yet built (the remaining phases)

- About/Programs-detail/Daycare/Activities/Learning-journey/Gallery/Events/
  Admissions/School-visit/Parents/FAQ/Contact page implementations
- CRUD UI for every other admin module (Enquiries, School Visits,
  Activities, Gallery, Events, Testimonials, FAQs, Announcements, Site
  Settings, SEO, Admin Users, Audit Logs) — tables and RLS already exist;
  Programs is the template to copy
- Public-facing enquiry/school-visit/contact forms + their API routes
- Storage buckets + upload policies, image upload UI
- SEO (sitemap, robots, JSON-LD, per-page metadata), analytics scaffolding
- Tests, accessibility pass, Lighthouse/perf pass, security audit

## 4. Environment variables

Copy `.env.example` to `.env.local` and fill in a real Supabase project's
URL/keys. The site runs without them (placeholder content), but the admin
panel needs a real project — see `ADMIN-SETUP.md` for creating your first
login.

## 5. Running it

```bash
npm install
npx supabase db push       # applies supabase/migrations against your project
npm run dev
```

## 6. Content grounded in public listings

Pulled ProEves, magicpin, and EduTribe (Facebook and Justdial blocked
automated access). Real hours, age ranges, contact info, and service names
are now in `supabase/seed.sql`; the exact street address is still a
placeholder because two sources disagree on it. Full writeup, including
what was deliberately left out (unverifiable fees, AI-inferred "profile"
content from EduTribe, a likely proxy phone/rating from magicpin), is in
`SOURCE-NOTES.md`. No third-party photos were downloaded or reused.

## 7. Suggested next step

The fastest path to a fully click-through-able admin panel is to copy the
Programs CRUD pattern (`src/app/admin/(protected)/programs/`) into each
remaining module — Enquiries and School Visits first, since those are the
two the public site actually needs before Admissions/School-visit forms can
go live. Say the word and I'll keep going module by module.

