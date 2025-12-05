"use client";

import { LucideIcon } from "lucide-react";

interface IconWrapperProps {
  Icon: LucideIcon;
  size?: number;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  Icon,
  size = 24,
  className = "text-accent-foreground font-bold",
}) => {
  return <Icon size={size} className={className} />;
};

export default IconWrapper;
