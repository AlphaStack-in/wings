import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import type { SiteSettings } from "@/types/database";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-heading text-xl font-bold">{settings.school_name}</p>
          <p className="mt-2 text-sm text-cream/70">
            {settings.tagline ?? "[TAGLINE TO BE CONFIRMED]"}
          </p>
          <div className="mt-4 flex gap-3">
            {settings.facebook_url && (
              <a href={settings.facebook_url} aria-label="Facebook" className="focus-ring rounded-full bg-white/10 p-2 hover:bg-white/20">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {settings.instagram_url && (
              <a href={settings.instagram_url} aria-label="Instagram" className="focus-ring rounded-full bg-white/10 p-2 hover:bg-white/20">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {settings.youtube_url && (
              <a href={settings.youtube_url} aria-label="YouTube" className="focus-ring rounded-full bg-white/10 p-2 hover:bg-white/20">
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-heading font-semibold text-sun-light">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring text-cream/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-heading font-semibold text-sun-light">Contact</p>
          <ul className="mt-3 space-y-3 text-sm text-cream/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{settings.address ?? "[ADDRESS TO BE CONFIRMED]"}</span>
            </li>
            {settings.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`tel:${settings.phone}`} className="focus-ring hover:text-white">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="focus-ring hover:text-white">
                  {settings.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-cream/60">
        <p>
          © {new Date().getFullYear()} {settings.school_name}. All rights reserved. ·{" "}
          <Link href="/privacy" className="focus-ring underline">Privacy Policy</Link> ·{" "}
          <Link href="/terms" className="focus-ring underline">Terms</Link>
        </p>
      </div>
    </footer>
  );
}
