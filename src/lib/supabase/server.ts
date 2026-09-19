import { createServerClient, type CookieOptions, type SetAllCookies } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server client — for use in Server Components, Server Actions, and Route
 * Handlers. Respects the current user's session and RLS policies. This is
 * the client that all authenticated admin reads/writes should go through
 * (never the admin/service-role client for anything a session can do).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            );
          } catch {
            // Called from a Server Component with no response to write to —
            // safe to ignore as long as middleware also refreshes sessions.
          }
        },
      },
    }
  );
}
