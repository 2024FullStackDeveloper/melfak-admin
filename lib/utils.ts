import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SpanProps =
  | number
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };

export const getSpanClasses = (span?: SpanProps) => {
  if (!span) return "";

  if (typeof span === "number") {
    return `col-span-${span}`;
  }

  const classes = [];

  if (span.xs && span.xs === 1) classes.push(`min-[320px]:col-span-1`);
  if (span.xs && span.xs === 2) classes.push(`min-[320px]:col-span-2`);
  if (span.xs && span.xs === 3) classes.push(`min-[320px]:col-span-3`);
  if (span.xs && span.xs === 4) classes.push(`min-[320px]:col-span-4`);
  if (span.xs && span.xs === 5) classes.push(`min-[320px]:col-span-5`);
  if (span.xs && span.xs === 6) classes.push(`min-[320px]:col-span-6`);
  if (span.xs && span.xs === 7) classes.push(`min-[320px]:col-span-7`);
  if (span.xs && span.xs === 8) classes.push(`min-[320px]:col-span-8`);
  if (span.xs && span.xs === 9) classes.push(`min-[320px]:col-span-9`);
  if (span.xs && span.xs === 10) classes.push(`min-[320px]:col-span-10`);
  if (span.xs && span.xs === 11) classes.push(`min-[320px]:col-span-11`);
  if (span.xs && span.xs === 12) classes.push(`min-[320px]:col-span-12`);

  if (span.sm && span.sm === 1) classes.push(`sm:col-span-1`);
  if (span.sm && span.sm === 2) classes.push(`sm:col-span-2`);
  if (span.sm && span.sm === 3) classes.push(`sm:col-span-3`);
  if (span.sm && span.sm === 4) classes.push(`sm:col-span-4`);
  if (span.sm && span.sm === 5) classes.push(`sm:col-span-5`);
  if (span.sm && span.sm === 6) classes.push(`sm:col-span-6`);
  if (span.sm && span.sm === 7) classes.push(`sm:col-span-7`);
  if (span.sm && span.sm === 8) classes.push(`sm:col-span-8`);
  if (span.sm && span.sm === 9) classes.push(`sm:col-span-9`);
  if (span.sm && span.sm === 10) classes.push(`sm:col-span-10`);
  if (span.sm && span.sm === 11) classes.push(`sm:col-span-11`);
  if (span.sm && span.sm === 12) classes.push(`sm:col-span-12`);

  if (span.md && span.md === 1) classes.push(`md:col-span-1`);
  if (span.md && span.md === 2) classes.push(`md:col-span-2`);
  if (span.md && span.md === 3) classes.push(`md:col-span-3`);
  if (span.md && span.md === 4) classes.push(`md:col-span-4`);
  if (span.md && span.md === 5) classes.push(`md:col-span-5`);
  if (span.md && span.md === 6) classes.push(`md:col-span-6`);
  if (span.md && span.md === 7) classes.push(`md:col-span-7`);
  if (span.md && span.md === 8) classes.push(`md:col-span-8`);
  if (span.md && span.md === 9) classes.push(`md:col-span-9`);
  if (span.md && span.md === 10) classes.push(`md:col-span-10`);
  if (span.md && span.md === 11) classes.push(`md:col-span-11`);
  if (span.md && span.md === 12) classes.push(`md:col-span-12`);

  if (span.lg && span.lg === 1) classes.push(`lg:col-span-1`);
  if (span.lg && span.lg === 2) classes.push(`lg:col-span-2`);
  if (span.lg && span.lg === 3) classes.push(`lg:col-span-3`);
  if (span.lg && span.lg === 4) classes.push(`lg:col-span-4`);
  if (span.lg && span.lg === 5) classes.push(`lg:col-span-5`);
  if (span.lg && span.lg === 6) classes.push(`lg:col-span-6`);
  if (span.lg && span.lg === 7) classes.push(`lg:col-span-7`);
  if (span.lg && span.lg === 8) classes.push(`lg:col-span-8`);
  if (span.lg && span.lg === 9) classes.push(`lg:col-span-9`);
  if (span.lg && span.lg === 10) classes.push(`lg:col-span-10`);
  if (span.lg && span.lg === 11) classes.push(`lg:col-span-11`);
  if (span.lg && span.lg === 12) classes.push(`lg:col-span-12`);

  if (span.xl && span.xl === 1) classes.push(`xl:col-span-1`);
  if (span.xl && span.xl === 2) classes.push(`xl:col-span-2`);
  if (span.xl && span.xl === 3) classes.push(`xl:col-span-3`);
  if (span.xl && span.xl === 4) classes.push(`xl:col-span-4`);
  if (span.xl && span.xl === 5) classes.push(`xl:col-span-5`);
  if (span.xl && span.xl === 6) classes.push(`xl:col-span-6`);
  if (span.xl && span.xl === 7) classes.push(`xl:col-span-7`);
  if (span.xl && span.xl === 8) classes.push(`xl:col-span-8`);
  if (span.xl && span.xl === 9) classes.push(`xl:col-span-9`);
  if (span.xl && span.xl === 10) classes.push(`xl:col-span-10`);
  if (span.xl && span.xl === 11) classes.push(`xl:col-span-11`);
  if (span.xl && span.xl === 12) classes.push(`xl:col-span-12`);

  if (span.xxl && span.xxl === 1) classes.push(`2xl:col-span-1`);
  if (span.xxl && span.xxl === 2) classes.push(`2xl:col-span-2`);
  if (span.xxl && span.xxl === 3) classes.push(`2xl:col-span-3`);
  if (span.xxl && span.xxl === 4) classes.push(`2xl:col-span-4`);
  if (span.xxl && span.xxl === 5) classes.push(`2xl:col-span-5`);
  if (span.xxl && span.xxl === 6) classes.push(`2xl:col-span-6`);
  if (span.xxl && span.xxl === 7) classes.push(`2xl:col-span-7`);
  if (span.xxl && span.xxl === 8) classes.push(`2xl:col-span-8`);
  if (span.xxl && span.xxl === 9) classes.push(`2xl:col-span-9`);
  if (span.xxl && span.xxl === 10) classes.push(`2xl:col-span-10`);

  return classes.join(" ");
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ACCEPTED_IMAGE_EXTENSIONS = [".png", ".jpeg", ".jpg", ".webp"];

const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `حجم الصورة يجب ان يكون اقل  من  ${
      MAX_FILE_SIZE / 1024 / 1024
    } MB`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: `فقط صيغ الصور المقبولة ${ACCEPTED_IMAGE_EXTENSIONS.join(", ")}`,
  });

// Accept File objects (new uploads), strings (existing URLs), null, or undefined
export const imageSchema = z.union([
  imageFileSchema,
  z.string(),
  z.null(),
  z.undefined(),
]);

export const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 50MB

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

const ACCEPTED_VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov"];

const videoFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_VIDEO_SIZE, {
    message: `حجم الفيديو يجب ان يكون اقل من ${
      MAX_VIDEO_SIZE / 1024 / 1024
    } MB`,
  })
  .refine((file) => ACCEPTED_VIDEO_TYPES.includes(file.type), {
    message: `فقط صيغ الفيديو المقبولة ${ACCEPTED_VIDEO_EXTENSIONS.join(", ")}`,
  });

// Accept File objects (new uploads), strings (existing URLs), null, or undefined
export const videoSchema = z.union([
  videoFileSchema,
  z.string(),
  z.null(),
  z.undefined(),
]);
