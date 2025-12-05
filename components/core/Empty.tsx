"use client";

import Image from "next/image";
import Text from "./text/Text";
import { cn } from "@/lib/utils";

interface EmptyProps {
  title: string;
  description?: string;
  className?: string;
}

export const Empty = ({ title, description, className }: EmptyProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className={cn("relative aspect-12/9 w-full h-[150px]", className)}>
          <Image
            src="/images/empty.png"
            alt="empty"
            priority
            fill
            className="w-full h-full object-contain"
          />
        </div>
        <Text type="header5" className="text-primary">
          {title}
        </Text>
        {description && (
          <Text type="bodyBaseRegular" className="text-gray-500">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};
