import { imageSchema } from "@/lib/utils";
import { z } from "zod";

/**
 * Creates a sign-in validation schema with localized error messages
 * @param t - Translation function from next-intl
 * @returns Zod schema for sign-in validation
 */
export const createSocialMediaSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    name: z
      .string({ message: t("validations.name.required") })
      .min(1, { message: t("validations.name.required") }),
    iconFile: imageSchema,
    displayOrder: z.number(),
    unActive: z.boolean(),
  });
};

// Default schema for backward compatibility (uses Arabic messages)
const addSocialMediaSchema = z.object({
  name: z
    .string({ message: " اسم الشبكة الاجتماعية مطلوب!" })
    .min(1, { message: "اسم الشبكة الاجتماعية مطلوب!" }),
  iconFile: imageSchema.refine((file: any) => file?.size === 0, {
    message: "صورة مطلوبة!",
  }),
  displayOrder: z.number(),
  unActive: z.boolean(),
});

export const updateSocialMediaSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    name: z
      .string({ message: t("validations.name.required") })
      .min(1, { message: t("validations.name.required") }),
    iconFile: imageSchema.optional(),
    displayOrder: z.number(),
    unActive: z.boolean(),
  });
};

const editSocialMediaSchema = z.object({
  name: z
    .string({ message: "اسم الشبكة الاجتماعية مطلوب!" })
    .min(1, { message: "اسم الشبكة الاجتماعية مطلوب!" }),
  iconFile: imageSchema.optional(),
  displayOrder: z.number(),
  unActive: z.boolean(),
});

export { addSocialMediaSchema, editSocialMediaSchema };
