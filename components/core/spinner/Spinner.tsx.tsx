"use client";
import { cn } from "@/lib/utils";
import React from "react";

type SpinnerSize = "small" | "medium" | "large";
type SpinnerTheme = "primary" | "secondary" | "black" | "white";

type SpinnerProps = {
  size?: SpinnerSize;
  theme?: SpinnerTheme;
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  theme = "primary",
  className,
}) => {
  const getSize = (): string => {
    switch (size) {
      case "small":
        return "w-5 h-5 border-2";
      case "medium":
        return "w-8 h-8 border-4";
      case "large":
        return "w-12 h-12 border-6";
      default:
        return "w-8 h-8 border-4";
    }
  };

  const getTheme = (): string => {
    switch (theme) {
      case "primary":
        return "border-primary-600";
      case "secondary":
        return "border-secondary-600";
      case "black":
        return "border-black";
      case "white":
        return "border-white";
      default:
        return "border-primary-600";
    }
  };

  const spinnerSize = getSize();
  const spinnerTheme = getTheme();

  return (
    <div
      className={cn(
        `animate-spin rounded-full border-t-2 ${spinnerSize} ${spinnerTheme}`,
        className
      )}
    />
  );
};

export default Spinner;
