import { z } from "zod";

export const programSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only."),
  short_description: z.string().trim().max(280).optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  age_min: z.coerce.number().int().min(0).max(18).optional(),
  age_max: z.coerce.number().int().min(0).max(18).optional(),
  duration: z.string().trim().optional().or(z.literal("")),
  timing: z.string().trim().optional().or(z.literal("")),
  image: z.string().trim().url("Must be a valid URL.").optional().or(z.literal("")),
  display_order: z.coerce.number().int().min(0).default(0),
  is_active: z.coerce.boolean().default(true),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
