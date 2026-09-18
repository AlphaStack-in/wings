import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client — safe to import in Client Components.
 * Uses the public anon key only. Never import the admin client here.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
