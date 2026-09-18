import { ProgramForm } from "@/components/admin/program-form";
import { createProgram } from "../actions";

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">New Program</h1>
      <ProgramForm action={createProgram} submitLabel="Create Program" />
    </div>
  );
}
