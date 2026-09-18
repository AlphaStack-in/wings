import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProgramForm } from "@/components/admin/program-form";
import type { Program } from "@/types/database";
import { updateProgram } from "../../actions";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("programs").select("*").eq("id", id).maybeSingle();

  if (!data) {
    notFound();
  }

  const program = data as Program;
  const boundUpdate = updateProgram.bind(null, program.id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">Edit {program.name}</h1>
      <ProgramForm action={boundUpdate} initialValues={program} submitLabel="Save Changes" />
    </div>
  );
}
