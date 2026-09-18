import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-2 inline-block rounded-full bg-sun-light px-4 py-1 text-sm font-semibold text-sun-700 text-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-lg text-muted">{description}</p>
      )}
    </div>
  );
}
