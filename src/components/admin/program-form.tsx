"use client";

import { useActionState } from "react";
import type { Program } from "@/types/database";
import type { ProgramActionState } from "@/app/admin/(protected)/programs/actions";

interface ProgramFormProps {
  action: (state: ProgramActionState, formData: FormData) => Promise<ProgramActionState>;
  initialValues?: Partial<Program>;
  submitLabel: string;
}

const initialState: ProgramActionState = { status: "idle" };

export function ProgramForm({ action, initialValues, submitLabel }: ProgramFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6 max-w-2xl space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-coral-light px-4 py-2 text-sm text-coral">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={initialValues?.name} error={errors.name} required />
        <Field
          label="Slug"
          name="slug"
          defaultValue={initialValues?.slug}
          error={errors.slug}
          required
          hint="Used in the URL, e.g. /programs/toddler"
        />
      </div>

      <Field
        label="Short description"
        name="short_description"
        defaultValue={initialValues?.short_description ?? ""}
        error={errors.short_description}
        hint="Shown on program cards — keep it to one sentence."
      />

      <TextAreaField
        label="Full description"
        name="description"
        defaultValue={initialValues?.description ?? ""}
        error={errors.description}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Minimum age (years)"
          name="age_min"
          type="number"
          defaultValue={initialValues?.age_min ?? ""}
          error={errors.age_min}
        />
        <Field
          label="Maximum age (years)"
          name="age_max"
          type="number"
          defaultValue={initialValues?.age_max ?? ""}
          error={errors.age_max}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Duration"
          name="duration"
          defaultValue={initialValues?.duration ?? ""}
          error={errors.duration}
          placeholder="[TO BE CONFIRMED]"
        />
        <Field
          label="Timing"
          name="timing"
          defaultValue={initialValues?.timing ?? ""}
          error={errors.timing}
          placeholder="e.g. 9:00 AM - 12:00 Noon, Mon-Fri"
        />
      </div>

      <Field
        label="Image URL"
        name="image"
        defaultValue={initialValues?.image ?? ""}
        error={errors.image}
        hint="Paste a Supabase Storage public URL once uploads are wired up."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Display order"
          name="display_order"
          type="number"
          defaultValue={initialValues?.display_order ?? 0}
          error={errors.display_order}
        />
        <label className="flex items-center gap-2 self-end pb-2 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={initialValues?.is_active ?? true}
            className="focus-ring h-4 w-4 rounded border-ink/30"
          />
          Published (visible on the public site)
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="focus-ring rounded-full bg-coral px-6 py-2.5 font-heading font-semibold text-white hover:bg-coral/90 disabled:opacity-60"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  required,
  type = "text",
  hint,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  error?: string;
  required?: boolean;
  type?: string;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
      />
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-coral">
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        defaultValue={defaultValue ?? ""}
        aria-invalid={Boolean(error)}
        className="focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
      />
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  );
}
