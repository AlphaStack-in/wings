import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Program } from "@/types/database";

async function fetchPrograms(): Promise<Program[]> {
  // No Supabase project configured yet — show the empty state instead of
  // crashing the page.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .limit(4);

    return (data as Program[] | null) ?? [];
  } catch {
    return [];
  }
}

export async function ProgramsPreview() {
  const list = await fetchPrograms();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Programs"
          title="Programs for every stage of early childhood"
        />

        {list.length === 0 ? (
          <p className="mt-10 rounded-xl2 bg-sun-light/50 p-8 text-center text-muted">
            Program information will be updated soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((program) => (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                className="focus-ring group overflow-hidden rounded-xl2 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sky-light">
                  {program.image ? (
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted">
                      [ Image pending ]
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-ink">{program.name}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {program.short_description ?? "[CONTENT TO BE CONFIRMED]"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
