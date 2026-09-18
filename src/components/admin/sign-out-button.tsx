"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="focus-ring flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink hover:bg-cream"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      Sign Out
    </button>
  );
}
