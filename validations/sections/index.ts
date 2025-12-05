import { imageSchema, videoSchema } from "@/lib/utils";
import { z } from "zod";

export const createSectionSchema = (
  t: (key: string, values?: Record<string, any>) => string
) =>
  z.object({
    arTitle: z
      .string(t("validations.arTitle.required"))
      .min(1, t("validations.arTitle.required")),
    enTitle: z
      .string(t("validations.enTitle.required"))
      .min(1, t("validations.enTitle.required")),
    arDescription: z.string().optional(),
    enDescription: z.string().optional(),
    unactive: z.boolean(),
  });

export type sectionSchema = ReturnType<typeof createSectionSchema>;

export const createServiceSchema = (
  t: (key: string, values?: Record<string, any>) => string
) =>
  z.object({
    sectionId: z
      .string(t("validations.sectionId.required"))
      .min(1, t("validations.sectionId.required")),
    arTitle: z
      .string(t("validations.arTitle.required"))
      .min(1, t("validations.arTitle.required")),
    enTitle: z
      .string(t("validations.enTitle.required"))
      .min(1, t("validations.enTitle.required")),
    arSubTitle: z.string().optional(),
    enSubTitle: z.string().optional(),
    arDescription: z.string().optional(),
    enDescription: z.string().optional(),
    thumbnailFile: imageSchema,
    imageFile: imageSchema.nullable().optional(),
    unactive: z.boolean(),
    order: z.number(),
    videoFile: videoSchema.nullable().optional(),
    posterFile: imageSchema.nullable().optional(),
    parentServiceId: z.string().optional().nullable(),
  });

export type serviceSchema = ReturnType<typeof createServiceSchema>;

export const createServiceItemSchema = (
  t: (key: string, values?: Record<string, any>) => string
) =>
  z.object({
    serviceId: z
      .string(t("validations.serviceId.required"))
      .min(1, t("validations.serviceId.required")),
    arTitle: z
      .string(t("validations.arTitle.required"))
      .min(1, t("validations.arTitle.required")),
    enTitle: z
      .string(t("validations.enTitle.required"))
      .min(1, t("validations.enTitle.required")),
    arSubTitle: z.string().optional(),
    enSubTitle: z.string().optional(),
    arDescription: z.string().optional(),
    enDescription: z.string().optional(),
    thumbnailFile: imageSchema,
    imageFile: imageSchema.nullable().optional(),
    unactive: z.boolean().optional(),
    order: z.number().optional(),
    videoFile: videoSchema.nullable().optional(),
    posterFile: imageSchema.nullable().optional(),
    price: z.number().optional(),
    isAvailable: z.boolean().optional(),
    isNewArrival: z.boolean().optional(),
    attributes: z
      .array(
        z
          .object({
            id: z.string().optional(),
            itemId: z.string().optional(),
            arName: z.string().min(1, t("validations.arName.required")),
            enName: z.string().min(1, t("validations.enName.required")),
            singleValue: z.boolean(),
            value: z.string().optional(),
            arValue: z.string().optional(),
            enValue: z.string().optional(),
            order: z.number(),
          })
          .superRefine((data, ctx) => {
            if (data.singleValue && !data.value) {
              ctx.addIssue({
                path: ["value"],
                code: "custom",
                message: t("validations.value.required"),
              });
            }

            if (!data.singleValue && !data.arValue) {
              ctx.addIssue({
                path: ["arValue"],
                code: "custom",
                message: t("validations.value.required"),
              });
            }

            if (!data.singleValue && !data.enValue) {
              ctx.addIssue({
                path: ["enValue"],
                code: "custom",
                message: t("validations.value.required"),
              });
            }
          })
      )
      .optional(),
  });

export type serviceItemSchema = ReturnType<typeof createServiceItemSchema>;
