"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LucideIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import useLocalizer from "@/hooks/useLocalizer";
import IconWrapper from "./IconWrapper";
import { Textarea } from "../ui/textarea";

interface TextAreaInputProps extends React.ComponentProps<"textarea"> {
  labelClassName?: string;
  label: string;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  labelClassName,
  label,
  error,
  ...props
}) => {
  const isRequired = props.required || false;
  const { isRtl } = useLocalizer();
  return (
    <div className="flex flex-col gap-2">
      <Label
        className={cn(labelClassName, "flex items-baseline")}
        htmlFor={props.id}
      >
        {label}
        {isRequired && <span className="text-lg text-destructive">*</span>}
      </Label>
      <div className="relative flex items-center">
        <Textarea
          {...props}
          className={cn(
            "border-0 border-b-border border-b-2 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-b-accent px-0 h-10 text-base",
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

TextAreaInput.displayName = "TextAreaInput";

export default TextAreaInput;
