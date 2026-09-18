import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Program } from "@/types/database";
import { DeleteProgramButton } from "./delete-button";
import { ProgramActiveToggle } from "./active-toggle";

export default async function AdminProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("programs")
    .select("*")
    .order("display_order", { ascending: true });

  if (q) {
    query = query.ilike("name", `%${q}%`);
  }

  const { data, error } = await query;
  const programs = (data as Program[] | null) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold text-ink">Programs</h1>
        <Link
          href="/admin/programs/new"
          className="focus-ring flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-heading font-semibold text-white hover:bg-coral/90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Program
        </Link>
      </div>

      <form className="mt-4" action="/admin/programs" method="get">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search programs by name…"
          className="focus-ring w-full max-w-sm rounded-lg border border-ink/15 px-3 py-2 text-sm"
        />
      </form>

      <div className="mt-4 overflow-x-auto rounded-xl2 bg-white shadow-sm">
        {error ? (
          <p className="p-8 text-center text-coral">
            Something went wrong loading programs. Please try again.
          </p>
        ) : programs.length === 0 ? (
          <p className="p-8 text-center text-muted">
            {q ? `No programs match "${q}".` : "No programs yet — create the first one."}
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Ages</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{program.name}</td>
                  <td className="px-4 py-3 text-muted">{program.slug}</td>
                  <td className="px-4 py-3 text-muted">
                    {program.age_min != null && program.age_max != null
                      ? `${program.age_min}–${program.age_max} yrs`
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ProgramActiveToggle id={program.id} isActive={program.is_active} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/programs/${program.id}/edit`}
                        aria-label={`Edit ${program.name}`}
                        className="focus-ring rounded-lg p-2 text-ink/70 hover:bg-cream hover:text-ink"
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <DeleteProgramButton id={program.id} name={program.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
