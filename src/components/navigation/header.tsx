"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import type { SiteSettings } from "@/types/database";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-white/95 shadow-sm backdrop-blur"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="font-heading text-xl font-bold text-ink">
            {settings.school_name}
          </Link>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded-md text-sm font-semibold text-ink/80 transition-colors hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/school-visit"
              className="focus-ring rounded-full border-2 border-sky/40 px-4 py-2 text-sm font-heading font-semibold text-ink hover:border-sky"
            >
              Book a School Visit
            </Link>
            <Link
              href="/admissions"
              className="focus-ring rounded-full bg-coral px-5 py-2 text-sm font-heading font-semibold text-white shadow-md hover:bg-coral/90"
            >
              Enquire Now
            </Link>
          </div>

          <button
            type="button"
            className="focus-ring rounded-md p-2 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <nav
            className="border-t border-ink/10 bg-white px-4 pb-6 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="focus-ring block rounded-md px-2 py-3 font-semibold text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="focus-ring mt-3 block rounded-full bg-coral px-5 py-3 text-center font-heading font-semibold text-white"
            >
              Enquire Now
            </Link>
          </nav>
        )}
      </header>

      {/* Sticky bottom action bar — mobile only (spec section 7) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-ink/10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden">
        {settings.phone && (
          <a
            href={`tel:${settings.phone}`}
            className="focus-ring flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-semibold text-ink"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call
          </a>
        )}
        <WhatsAppButton
          whatsappNumber={settings.whatsapp}
          context="general"
          className="flex-1 rounded-none border-x border-ink/10 bg-transparent py-2 text-xs !text-ink shadow-none"
        />
        <Link
          href="/admissions"
          className="focus-ring flex flex-1 flex-col items-center justify-center gap-0.5 bg-coral py-2 text-xs font-semibold text-white"
        >
          Enquire
        </Link>
      </div>
    </>
  );
}
