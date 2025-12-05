import { z } from "zod";

export const updateSettingsSchema = (
  t: (key: string, values?: Record<string, any>) => string
) => {
  return z.object({
    applicationName: z
      .string({ message: t("validations.applicationName.required") })
      .min(1, { message: t("validations.applicationName.required") }),
    arSummary: z.string().nullable().optional(),
    enSummary: z.string().nullable().optional(),
    otpExpiryInMin: z.number().min(1).max(60),
    misLoginAttemptsLimit: z.number().min(1).max(10),
    passwordMinLength: z.number().min(6).max(32),
    passwordRequireUppercase: z.boolean(),
    passwordRequireLowercase: z.boolean(),
    passwordRequireNumber: z.boolean(),
    passwordRequireSpecialCharacter: z.boolean(),
    host: z
      .string({ message: t("validations.host.required") })
      .min(1, { message: t("validations.host.required") }),
    port: z.number().min(1).max(65535),
    useSsl: z.boolean(),
    email: z.string().email({ message: t("validations.email.required") }),
    password: z
      .string()
      .min(1, { message: t("validations.password.required") })
      .optional(),
  });
};

const editSettingsSchema = z.object({
  applicationName: z
    .string({ message: "Application name is required" })
    .min(1, { message: "Application name is required" }),
  arSummary: z.string().nullable().optional(),
  enSummary: z.string().nullable().optional(),
  otpExpiryInMin: z.number().min(1).max(60),
  misLoginAttemptsLimit: z.number().min(1).max(10),
  passwordMinLength: z.number().min(6).max(32),
  passwordRequireUppercase: z.boolean(),
  passwordRequireLowercase: z.boolean(),
  passwordRequireNumber: z.boolean(),
  passwordRequireSpecialCharacter: z.boolean(),
  host: z
    .string({ message: "Host is required" })
    .min(1, { message: "Host is required" }),
  port: z.number().min(1).max(65535),
  useSsl: z.boolean(),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }).optional(),
});

export { editSettingsSchema };
