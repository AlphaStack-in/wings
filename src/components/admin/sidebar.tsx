"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  GraduationCap,
  Palette,
  Images,
  PartyPopper,
  Quote,
  HelpCircle,
  Megaphone,
  Settings,
  Search,
  Users,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { UserRole } from "@/types/database";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Omit to allow every role; restrict for admin-only screens. */
  minRole?: Extract<UserRole, "admin" | "super_admin">;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "School Visits", href: "/admin/school-visits", icon: CalendarCheck },
  { label: "Programs", href: "/admin/programs", icon: GraduationCap },
  { label: "Activities", href: "/admin/activities", icon: Palette },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Events", href: "/admin/events", icon: PartyPopper },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Site Settings", href: "/admin/settings", icon: Settings, minRole: "admin" },
  { label: "SEO", href: "/admin/seo", icon: Search, minRole: "admin" },
  { label: "Admin Users", href: "/admin/users", icon: Users, minRole: "super_admin" as never },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText, minRole: "admin" },
];

function canSee(item: NavItem, role: UserRole) {
  if (!item.minRole) return true;
  if (item.minRole === "super_admin") return role === "super_admin";
  return role === "admin" || role === "super_admin";
}

export function AdminSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="hidden w-60 shrink-0 flex-col border-r border-ink/10 bg-white p-4 lg:flex"
    >
      <ul className="space-y-1">
        {NAV_ITEMS.filter((item) => canSee(item, role)).map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-coral/10 text-coral"
                    : "text-ink/70 hover:bg-cream hover:text-ink"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
