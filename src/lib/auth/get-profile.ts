import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export interface CurrentProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
}

/**
 * Reads the logged-in user's profile row. Returns null if there is no
 * session or no matching profile — callers decide what to do (middleware
 * already redirects unauthenticated visitors away from /admin/*, so this
 * is mainly for reading the role to drive UI, not the primary gate).
 */
export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) return null;

  return profile as CurrentProfile;
}
