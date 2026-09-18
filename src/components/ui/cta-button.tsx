import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  showArrow?: boolean;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: CTAButtonProps) {
  const base =
    "group focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 font-heading font-semibold transition-all duration-300 active:scale-95 hover:-translate-y-0.5";

  const styles =
    variant === "primary"
      ? "bg-coral text-white shadow-lg shadow-coral/25 hover:bg-coral/90"
      : "bg-white text-ink border-2 border-sky/40 hover:border-sky hover:bg-sky-light/40";

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
      {showArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
