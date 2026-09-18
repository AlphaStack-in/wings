import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client. Bypasses Row Level Security entirely.
 *
 * The `server-only` import above makes any accidental import of this file
 * from a Client Component fail the build, rather than leaking the service
 * role key to the browser.
 *
 * Use ONLY for trusted server-side operations that legitimately need to
 * cross RLS boundaries (e.g. an audit-log writer, a scheduled job). Do NOT
 * use this as a shortcut for normal admin CRUD — use lib/supabase/server.ts
 * plus real RLS policies for that, so authorization is enforced by Postgres
 * itself, not just by which client happened to be called.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
