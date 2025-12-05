"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface OverLayProps extends ComponentProps<"div"> {}

const OverLay: React.FC = ({ className }: OverLayProps) => {
  return (
    <div
      className={cn(
        "w-full h-full opacity-5 -z-1 fixed bg-no-repeat bg-contain bg-center",
        className
      )}
      style={{
        backgroundImage: `url('/bg.png')`,
        aspectRatio: "auto",
      }}
    />
  );
};

export default OverLay;
