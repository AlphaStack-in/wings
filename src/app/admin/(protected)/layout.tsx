import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { AdminSidebar } from "@/components/admin/sidebar";
import { SignOutButton } from "@/components/admin/sign-out-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // middleware.ts already redirects unauthenticated requests to
  // /admin/login for every /admin/* route except /admin/login itself.
  // This second check reads the role for the sidebar/topbar and is a
  // defense-in-depth backstop, not the primary gate.
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar role={profile.role} />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:px-6">
          <div>
            <p className="text-sm font-semibold text-ink">
              {profile.full_name ?? profile.email ?? "Admin"}
            </p>
            <p className="text-xs capitalize text-muted">{profile.role.replace("_", " ")}</p>
          </div>
          <SignOutButton />
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
