# Wings Foundation School — Website + CMS + Admin Platform

Status: **Phase 1 scaffold** (architecture, design system, navigation, homepage).
This is a real, working starting point — not a mockup — but it is one phase
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

## 2. What's actually built and working

- Full route/folder structure for every public and admin route in the spec
- Design tokens (colors, fonts, motion) wired through CSS variables +
  Tailwind, with `prefers-reduced-motion` respected globally
- Root layout, Header (transparent→solid on scroll, mobile menu, sticky
  mobile CTA bar), Footer — all driven by a `site_settings` row, nothing
  hard-coded
- Homepage: Hero, trust indicators, about/why-Wings previews, a real
  DB-driven Programs section with a proper empty state, admission CTA
- Complete initial SQL migration (`supabase/migrations/0001_init.sql`):
  every table from the spec, `updated_at` triggers, and RLS policies for
  all of them — public read only for published/active rows, anonymous
  insert-only on enquiries/visits/contact/newsletter, editor/admin/
  super_admin tiers enforced in Postgres
- Safe seed data (`supabase/seed.sql`) — placeholders only, no fabricated
  testimonials, ratings, or numbers

## 3. Not yet built (the remaining phases)

- About/Programs-detail/Daycare/Activities/Learning-journey/Gallery/Events/
  Admissions/School-visit/Parents/FAQ/Contact page implementations
- Admin panel UI (dashboard, all CRUD modules, login page)
- Supabase Auth wiring (sign-in form, session handling in the admin shell)
- Enquiry/school-visit/contact API routes + Zod validation + rate limiting
- Storage buckets + upload policies, image upload UI
- SEO (sitemap, robots, JSON-LD, per-page metadata), analytics scaffolding
- Tests, accessibility pass, Lighthouse/perf pass, security audit

## 4. Environment variables

Copy `.env.example` to `.env.local` and fill in a real Supabase project's
URL/keys before running anything — this scaffold has not been run against
a live database.

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

Tell me which slice to build next — the fastest path to something you can
actually click through is: **admin auth + login page → admin dashboard
shell → Programs CRUD (the simplest full-stack module) → then the
remaining public pages.** Or I can keep going phase-by-phase as originally
ordered. Either way, I'll keep verifying each phase (typecheck/lint) before
moving to the next, as the spec asks.
