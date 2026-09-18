"use client";

import { useTransition } from "react";
import { toggleProgramActive } from "./actions";
import { cn } from "@/lib/utils/cn";

export function ProgramActiveToggle({ id, isActive }: { id: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => toggleProgramActive(id, !isActive))}
      className={cn(
        "focus-ring rounded-full px-3 py-1 text-xs font-semibold transition-opacity",
        isActive ? "bg-leaf-light text-leaf" : "bg-ink/10 text-muted",
        isPending && "opacity-50"
      )}
    >
      {isActive ? "Published" : "Unpublished"}
    </button>
  );
}
