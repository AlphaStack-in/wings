# Creating your first admin login

The `profiles` table's RLS policies only let an existing `super_admin`
grant roles — which means the very first admin account can't be created
through the app itself. Do this once, directly in Supabase:

1. **Supabase Dashboard → Authentication → Users → Add user.** Create a
   user with your email and a password. Copy the user's UUID from the
   users list.
2. **Supabase Dashboard → SQL Editor**, run (replace the placeholders):

   ```sql
   insert into profiles (id, email, full_name, role)
   values ('paste-the-user-uuid-here', 'you@example.com', 'Your Name', 'super_admin');
   ```

3. Go to `/admin/login` on the site and sign in with that email/password.

After that, a super_admin can create further staff accounts the same way
(Authentication → Add user, then insert a `profiles` row — or once the
Admin Users module is built, do it from the UI at `/admin/users`, which is
currently a placeholder).

## What's built so far in the admin panel

- `/admin/login` — Supabase Auth email/password sign-in, generic error
  message (doesn't reveal whether an email exists), show/hide password
- Sidebar + topbar shell wrapping every `/admin/*` route, role-aware nav
  (Site Settings/SEO/Audit Logs need `admin`+, Admin Users needs
  `super_admin`)
- `/admin` dashboard — real counts (new enquiries, pending visits,
  published programs, gallery items, upcoming events); no invented numbers,
  no chart until there's enough data to plot one
- `/admin/programs` — full CRUD: search, table with publish/unpublish
  toggle and delete-with-confirm, create/edit form with inline validation
  and idle/submitting/error states, audit logging on every write, and
  `revalidatePath` on the public `/` and `/programs/[slug]` pages so
  changes show up without a redeploy

Every other sidebar item (Enquiries, School Visits, Activities, Gallery,
Events, Testimonials, FAQs, Announcements, Site Settings, SEO, Admin Users,
Audit Logs) is a "coming soon" placeholder — the database tables and RLS
already exist for all of them; only the CRUD UI is missing, and Programs is
the template to copy.
