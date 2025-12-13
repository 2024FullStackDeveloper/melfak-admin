"use client";
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface SelectProps {
  id?: string;
  label?: string;
  labelClassName?: string;
  isRequired?: boolean;
  placeholder?: string;
  noOptionsMessage?: string;
  onChange: (value: string) => void;
  value?: string | null;
  options?: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
  disabled?: boolean;
  error?: boolean;
}

const Select = ({
  id,
  label,
  labelClassName,
  isRequired,
  onChange,
  placeholder,
  noOptionsMessage,
  className,
  value,
  options = [],
  disabled,
  error,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-4">
      {label && (
        <Label
          className={cn(labelClassName, "flex items-baseline")}
          htmlFor={id}
        >
          {label}
          {isRequired && <span className="text-lg text-destructive">*</span>}
        </Label>
      )}
      <SelectRoot
        name={id}
        value={value || ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "w-full",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground text-center">
              {noOptionsMessage || "No options"}
            </div>
          )}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};

export default Select;
