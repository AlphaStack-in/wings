import Link from "next/link";
import { Inbox, CalendarCheck, GraduationCap, Images, PartyPopper } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface DashboardCard {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

async function getDashboardCounts() {
  const supabase = await createClient();

  // Run all counts in parallel. `head: true` avoids pulling any rows back —
  // we only need `count`.
  const [newEnquiries, pendingVisits, publishedPrograms, galleryItems, upcomingEvents] =
    await Promise.all([
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase
        .from("school_visits")
        .select("id", { count: "exact", head: true })
        .eq("status", "requested"),
      supabase.from("programs").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("gallery_items").select("id", { count: "exact", head: true }),
      supabase
        .from("events")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true)
        .gte("event_date", new Date().toISOString().slice(0, 10)),
    ]);

  return {
    newEnquiries: newEnquiries.count ?? 0,
    pendingVisits: pendingVisits.count ?? 0,
    publishedPrograms: publishedPrograms.count ?? 0,
    galleryItems: galleryItems.count ?? 0,
    upcomingEvents: upcomingEvents.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts();

  const cards: DashboardCard[] = [
    { label: "New Enquiries", href: "/admin/enquiries", icon: Inbox, count: counts.newEnquiries },
    {
      label: "Pending Visits",
      href: "/admin/school-visits",
      icon: CalendarCheck,
      count: counts.pendingVisits,
    },
    {
      label: "Published Programs",
      href: "/admin/programs",
      icon: GraduationCap,
      count: counts.publishedPrograms,
    },
    { label: "Gallery Items", href: "/admin/gallery", icon: Images, count: counts.galleryItems },
    {
      label: "Upcoming Events",
      href: "/admin/events",
      icon: PartyPopper,
      count: counts.upcomingEvents,
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Live counts from the database — nothing here is estimated.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ label, href, icon: Icon, count }) => (
          <Link
            key={href}
            href={href}
            className="focus-ring rounded-xl2 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon className="h-5 w-5 text-coral" aria-hidden="true" />
            <p className="mt-3 text-3xl font-bold text-ink">{count}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>

      {/* Charts (enquiries/visits over time, lead sources) intentionally
          omitted until there's enough real data to plot — spec section 36
          says not to render charts on insufficient data. */}
    </div>
  );
}
