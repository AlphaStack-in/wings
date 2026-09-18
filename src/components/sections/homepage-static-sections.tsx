import { Heart, Palette, Users, Leaf } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import type { SiteSettings } from "@/types/database";

export function TrustIndicators() {
  // Real numbers only — see spec section 75. Until verified counts exist,
  // this shows qualitative trust markers instead of invented statistics.
  const points = [
    { icon: Heart, label: "Nurturing, play-based approach" },
    { icon: Users, label: "Experienced, caring educators" },
    { icon: Leaf, label: "Safe, child-friendly campus" },
    { icon: Palette, label: "Creative, hands-on activities" },
  ];

  return (
    <section className="border-y border-ink/5 bg-white/60 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {points.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <span className="rounded-full bg-sky-light p-3">
              <Icon className="h-5 w-5 text-sky" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-ink">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="A place where every child feels at home"
          description="[CONTENT TO BE CONFIRMED — Our Story copy pending from the school. Edit via Admin → Settings → Pages.]"
        />
        <div className="mt-8 text-center">
          <CTAButton href="/about" variant="secondary">
            Learn About Our Approach
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export function WhyWings() {
  const reasons = [
    {
      title: "Learning Through Play",
      description:
        "[CONTENT TO BE CONFIRMED] Everyday activities are designed as playful learning experiences.",
    },
    {
      title: "Warm, Watchful Care",
      description:
        "[CONTENT TO BE CONFIRMED] Small groups and attentive educators so every child is seen.",
    },
    {
      title: "A Joyful Environment",
      description:
        "[CONTENT TO BE CONFIRMED] Bright, safe spaces built for curiosity and movement.",
    },
  ];

  return (
    <section className="bg-leaf-light/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why Wings" title="Why families choose us" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl2 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-heading text-lg font-bold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdmissionCTA({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-coral py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold">
          Ready to give your child a joyful start?
        </h2>
        <p className="max-w-xl text-white/90">
          Reach out to our admissions team at {settings.school_name} — we're
          happy to answer every question.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton href="/admissions" variant="secondary" className="bg-white text-coral border-white hover:bg-white/90">
            Enquire Now
          </CTAButton>
          <CTAButton href="/school-visit" className="bg-ink hover:bg-ink/90">
            Book a School Visit
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
