"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProgram } from "./actions";

export function DeleteProgramButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-ink">Delete "{name}"?</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => deleteProgram(id))}
          className="focus-ring rounded-lg bg-coral px-2 py-1 font-semibold text-white disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="focus-ring rounded-lg px-2 py-1 font-semibold text-ink/70 hover:bg-cream"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${name}`}
      className="focus-ring rounded-lg p-2 text-ink/70 hover:bg-coral-light hover:text-coral"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
