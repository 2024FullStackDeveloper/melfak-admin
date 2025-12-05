"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LucideIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import useLocalizer from "@/hooks/useLocalizer";
import IconWrapper from "./IconWrapper";

interface TextInputProps extends React.ComponentProps<"input"> {
  labelClassName?: string;
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  iconSize?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  labelClassName,
  label,
  error,
  icon,
  iconClassName,
  iconSize = 24,
  ...props
}) => {
  const isRequired = props.required || false;
  const { isRtl } = useLocalizer();
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          className={cn(labelClassName, "flex items-baseline")}
          htmlFor={props.id}
        >
          {label}
          {isRequired && <span className="text-lg text-destructive">*</span>}
        </Label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <IconWrapper
            Icon={icon}
            size={iconSize}
            className={cn(
              "absolute h-5 w-5 text-secondary-foreground",
              isRtl ? "right-0" : "left-0"
            )}
          />
        )}
        <Input
          {...props}
          className={cn(
            "border-0 border-b-2 border-border rounded-none shadow-none focus-visible:ring-0 focus-visible:border-accent px-0 h-10 text-base",
            isRtl ? "pr-8" : "pl-8",
            props.className
          )}
          aria-required={isRequired}
        />
      </div>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
};

TextInput.displayName = "TextInput";

export default TextInput;
