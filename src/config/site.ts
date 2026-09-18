export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Daycare", href: "/daycare" },
  { label: "Activities", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Parents", href: "/parents" },
  { label: "Contact", href: "/contact" },
] as const;

// Non-editorial constants only. Everything the school staff should be able
// to change themselves (phone, address, socials, hero copy, etc.) lives in
// the `site_settings` table — never hard-code it in components.
export const SITE_DEFAULTS = {
  name: "Wings Foundation School",
  shortName: "Wings Foundation",
  locality: "Nanmangalam, Chennai, Tamil Nadu",
} as const;
