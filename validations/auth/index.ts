import { z } from "zod";

/**
 * Creates a sign-in validation schema with localized error messages
 * @param t - Translation function from next-intl
 * @returns Zod schema for sign-in validation
 */
export const createSignInSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    email: z
      .string({ message: t("validations.email.required") })
      .min(1, { message: t("validations.email.required") })
      .email({
        message: t("validations.email.invalid"),
      }),
    password: z
      .string({ message: t("validations.password.required") })
      .min(1, { message: t("validations.password.required") }),
  });
};

// Default schema for backward compatibility (uses Arabic messages)
const signInSchema = z.object({
  email: z
    .string({ message: "البريد الالكتروني مطلوب!" })
    .min(1, { message: "البريد الالكتروني مطلوب!" })
    .email({
      message: "البريد الالكتروني غير صحيح!",
    }),
  password: z
    .string({ message: "كلمة المرور مطلوبة!" })
    .min(1, { message: "كلمة المرور مطلوبة!" })
    .min(6, {
      message: "كلمة المرور يجب أن تكون أطول من 6 أحرف!",
    })
    .max(20, {
      message: "كلمة المرور يجب أن تكون أقل من 20 حرف!",
    }),
});

export const createEmailVerifyingSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    email: z
      .string({ message: t("validations.email.required") })
      .min(1, { message: t("validations.email.required") })
      .email({
        message: t("validations.email.invalid"),
      }),
  });
};

const emailVerifyingSchema = z.object({
  email: z
    .string({ message: "البريد الالكتروني مطلوب!" })
    .min(1, { message: "البريد الالكتروني مطلوب!" })
    .email({
      message: "البريد الالكتروني غير صحيح!",
    }),
});

export const createChangePasswordSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    email: z
      .string({ message: t("validations.email.required") })
      .min(1, { message: t("validations.email.required") })
      .email({
        message: t("validations.email.invalid"),
      })
      .optional(),
    newPassword: z.string().min(6, {
      message: t("validations.newPassword.min", { min: 6 }),
    }),
    otp: z.string().length(4, {
      message: t("validations.otp.length"),
    }),
  });
};

const changePasswordSchema = z.object({
  email: z
    .string({ message: "البريد الالكتروني مطلوب!" })
    .min(1, { message: "البريد الالكتروني مطلوب!" })
    .email({
      message: "البريد الالكتروني غير صحيح!",
    }),
  newPassword: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون أطول من 6 أحرف!",
  }),
  otp: z.string().length(4, {
    message: "الكود مطلوب!",
  }),
});

export const createUpdateUserProfile = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    email: z
      .string({ message: t("validations.email.required") })
      .min(1, { message: t("validations.email.required") })
      .email({
        message: t("validations.email.invalid"),
      }),
    mobileNumber: z
      .string({ message: t("validations.mobileNumber.required") })
      .min(1, { message: t("validations.mobileNumber.required") }),
    fullName: z
      .string({ message: t("validations.fullName.required") })
      .min(1, { message: t("validations.fullName.required") }),
  });
};

export type UpdateUserProfileType = z.infer<typeof createUpdateUserProfile>;

export const createUpdateUserPassword = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    currentPassword: z
      .string({ message: t("validations.currentPassword.required") })
      .min(6),
    newPassword: z
      .string({ message: t("validations.newPassword.required") })
      .min(6),
  });
};

export type UpdateUserPasswordType = z.infer<typeof createUpdateUserPassword>;

export { signInSchema, emailVerifyingSchema, changePasswordSchema };
