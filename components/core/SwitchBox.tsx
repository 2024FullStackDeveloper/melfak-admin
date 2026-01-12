"use client";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Activity } from "react";

interface SwitchBoxProps extends React.ComponentPropsWithoutRef<typeof Switch> {
  label?: string;
  labelClassName?: string;
  subTitle?: string;
  subTitleClassName?: string;
  error?: string;
}
const SwitchBox: React.FC<SwitchBoxProps> = ({
  label,
  labelClassName,
  subTitle,
  subTitleClassName,
  error,
  ...props
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border-secondary border p-4">
      <div className="space-y-0.5">
        {label && (
          <Label className={cn("text-base", labelClassName)}>{label}</Label>
        )}
        {subTitle && (
          <p className={cn("text-sm text-muted-foreground", subTitleClassName)}>
            {subTitle}
          </p>
        )}
        {error && <p className="text-destructive text-sm mt-1">{error}</p>}
      </div>
      <Switch {...props} />
    </div>
  );
};
export default SwitchBox;
