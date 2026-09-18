import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

// Used whenever site_settings has no row yet (fresh install) so pages never
// crash or show blank contact info — everything here is a clearly-labeled
// placeholder, never a fabricated real fact.
const FALLBACK_SETTINGS: SiteSettings = {
  id: "fallback",
  school_name: "Wings Foundation School",
  tagline: "Where Little Wings Learn to Fly",
  phone: null,
  whatsapp: null,
  email: null,
  address: "Nanmangalam, Chennai, Tamil Nadu [ADDRESS TO BE CONFIRMED]",
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  postal_code: null,
  latitude: null,
  longitude: null,
  facebook_url: null,
  instagram_url: null,
  youtube_url: null,
  google_business_url: null,
  logo_url: null,
  favicon_url: null,
  hero_image_url: null,
  default_meta_title: "Wings Foundation School | Preschool in Nanmangalam, Chennai",
  default_meta_description:
    "A warm, nurturing preschool and daycare in Nanmangalam, Chennai, where children learn through play.",
  created_at: new Date(0).toISOString(),
  updated_at: new Date(0).toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // No Supabase project configured yet (e.g. first local preview before
  // .env.local is filled in) — serve the fallback instead of crashing.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return FALLBACK_SETTINGS;
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    return (data as SiteSettings | null) ?? FALLBACK_SETTINGS;
  } catch {
    // Supabase unreachable / table not migrated yet — degrade gracefully
    // rather than taking the whole page down.
    return FALLBACK_SETTINGS;
  }
}
