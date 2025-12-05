import { imageSchema } from "@/lib/utils";
import { z } from "zod";

/**
 * Creates a sign-in validation schema with localized error messages
 * @param t - Translation function from next-intl
 * @returns Zod schema for sign-in validation
 */
export const createContactSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    phoneNumber: z
      .string({ message: t("validations.phoneNumber.required") })
      .min(1, { message: t("validations.phoneNumber.required") }),
    iconFile: imageSchema,
    isPrimary: z.boolean(),
    unActive: z.boolean(),
  });
};

// Default schema for backward compatibility (uses Arabic messages)
const addContactSchema = z.object({
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب!" })
    .min(1, { message: "رقم الهاتف مطلوب!" }),
  iconFile: imageSchema.refine((file: any) => file?.size === 0, {
    message: "صورة مطلوبة!",
  }),
  isPrimary: z.boolean(),
  unActive: z.boolean(),
});

export const updateContactSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    iconFile: imageSchema.optional(),
    isPrimary: z.boolean(),
    unActive: z.boolean(),
  });
};

const editContactSchema = z.object({
  iconFile: imageSchema.optional(),
  isPrimary: z.boolean(),
  unActive: z.boolean(),
});

export { addContactSchema, editContactSchema };
