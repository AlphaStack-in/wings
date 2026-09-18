"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth/get-profile";
import { programSchema } from "@/lib/validations/program";

export interface ProgramActionState {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    slug: formData.get("slug"),
    short_description: formData.get("short_description"),
    description: formData.get("description"),
    age_min: formData.get("age_min") || undefined,
    age_max: formData.get("age_max") || undefined,
    duration: formData.get("duration"),
    timing: formData.get("timing"),
    image: formData.get("image"),
    display_order: formData.get("display_order") || 0,
    is_active: formData.get("is_active"),
  };

  return programSchema.safeParse(raw);
}

async function logAudit(action: string, entityId: string | null, metadata: object) {
  const supabase = await createClient();
  const profile = await getCurrentProfile();
  await supabase.from("admin_audit_logs").insert({
    admin_id: profile?.id ?? null,
    action,
    entity: "program",
    entity_id: entityId,
    metadata,
  });
}

function revalidatePublicProgramPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/programs");
  if (slug) revalidatePath(`/programs/${slug}`);
  revalidatePath("/admin/programs");
}

export async function createProgram(
  _prevState: ProgramActionState,
  formData: FormData
): Promise<ProgramActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
      ),
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .insert(parsed.data)
    .select("id, slug")
    .single();

  if (error) {
    // Never surface raw DB errors to the user (spec section 46).
    const message = error.code === "23505" ? "That slug is already in use." : "Could not save the program. Please try again.";
    return { status: "error", message };
  }

  await logAudit("PROGRAM_CREATED", data.id, { name: parsed.data.name });
  revalidatePublicProgramPages(data.slug);
  redirect("/admin/programs");
}

export async function updateProgram(
  id: string,
  _prevState: ProgramActionState,
  formData: FormData
): Promise<ProgramActionState> {
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      fieldErrors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(([k, v]) => [k, v?.[0] ?? ""])
      ),
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("programs").update(parsed.data).eq("id", id);

  if (error) {
    const message = error.code === "23505" ? "That slug is already in use." : "Could not save the program. Please try again.";
    return { status: "error", message };
  }

  await logAudit("PROGRAM_UPDATED", id, { name: parsed.data.name });
  revalidatePublicProgramPages(parsed.data.slug);
  redirect("/admin/programs");
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) {
    throw new Error("Could not delete the program.");
  }
  await logAudit("PROGRAM_DELETED", id, {});
  revalidatePublicProgramPages();
}

export async function toggleProgramActive(id: string, nextValue: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("programs")
    .update({ is_active: nextValue })
    .eq("id", id);
  if (error) {
    throw new Error("Could not update the program.");
  }
  await logAudit(nextValue ? "PROGRAM_PUBLISHED" : "PROGRAM_UNPUBLISHED", id, {});
  revalidatePublicProgramPages();
}
