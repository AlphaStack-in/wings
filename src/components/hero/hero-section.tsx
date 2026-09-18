import Image from "next/image";
import { CTAButton } from "@/components/ui/cta-button";
import type { SiteSettings } from "@/types/database";

export function HeroSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-light via-cream to-cream pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Decorative elements — purely visual, hidden from screen readers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-24 h-16 w-28 rounded-full bg-white/70 blur-[1px] animate-float-slow" />
        <div className="absolute right-[12%] top-16 h-12 w-24 rounded-full bg-white/60 blur-[1px] animate-drift-x" />
        <div className="absolute bottom-10 left-[20%] h-6 w-6 rounded-full bg-sun/60 animate-float-slow" />
        <div className="absolute right-[22%] bottom-24 h-4 w-4 rotate-45 bg-coral/50 animate-float-slow" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-semibold text-coral shadow-sm">
            {settings.city ?? "Chennai"}&rsquo;s Warm & Playful Preschool
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Where Little Wings Learn to Fly
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            A warm, nurturing environment where children learn through play,
            creativity, exploration and meaningful everyday experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="/programs">Explore Our Programs</CTAButton>
            <CTAButton href="/school-visit" variant="secondary">
              Book a School Visit
            </CTAButton>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 bg-sky-light shadow-xl">
          {settings.hero_image_url ? (
            <Image
              src={settings.hero_image_url}
              alt={`Children at ${settings.school_name}`}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center text-sm text-muted">
              [ Hero photo — replace via Admin → Settings ]
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
