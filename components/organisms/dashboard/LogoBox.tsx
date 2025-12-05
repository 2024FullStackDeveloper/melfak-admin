"use client";

import { useTheme } from "@/contexts/themeContext";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LogoBox() {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[200px] bg-background/50 rounded-lg border"
      )}
    >
      {theme === "dark" ? (
        <Image
          src={"/images/logo.png"}
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      ) : (
        <Image
          src={"/images/logo-black.png"}
          alt="logo"
          fill
          className="object-contain"
          priority
        />
      )}
    </div>
  );
}
