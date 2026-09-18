"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CONTEXT_MESSAGES = {
  admission:
    "Hello Wings Foundation School, I would like to enquire about admission for my child.",
  daycare: "Hello Wings Foundation School, I would like to enquire about daycare.",
  visit:
    "Hello Wings Foundation School, I would like to enquire about visiting the school.",
  general: "Hello Wings Foundation School, I would like more information.",
} as const;

interface WhatsAppButtonProps {
  /** E.164 or local number, digits only — comes from site_settings.whatsapp. */
  whatsappNumber: string | null;
  context?: keyof typeof CONTEXT_MESSAGES;
  floating?: boolean;
  className?: string;
}

export function WhatsAppButton({
  whatsappNumber,
  context = "general",
  floating = false,
  className,
}: WhatsAppButtonProps) {
  if (!whatsappNumber) return null;

  const message = encodeURIComponent(CONTEXT_MESSAGES[context]);
  const href = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "focus-ring inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 font-heading font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95",
        floating && "fixed bottom-6 right-6 z-40 shadow-xl",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {!floating && <span>WhatsApp Us</span>}
    </a>
  );
}
