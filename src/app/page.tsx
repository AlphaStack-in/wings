import { HeroSection } from "@/components/hero/hero-section";
import {
  TrustIndicators,
  AboutPreview,
  WhyWings,
  AdmissionCTA,
} from "@/components/sections/homepage-static-sections";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { getSiteSettings } from "@/lib/services/site-settings";

// Public marketing content can be statically generated and revalidated
// on-demand (via /api/revalidate) whenever an admin publishes a change —
// see spec section 55.
export const revalidate = 3600;

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <HeroSection settings={settings} />
      <TrustIndicators />
      <AboutPreview />
      <WhyWings />
      <ProgramsPreview />
      {/* Learning approach, Activities, Gallery preview, Daycare, Testimonials,
          Events, FAQ preview and Contact sections follow the same
          server-component + empty-state pattern as ProgramsPreview above and
          are the next slice of Phase 1 work. */}
      <AdmissionCTA settings={settings} />
    </>
  );
}
