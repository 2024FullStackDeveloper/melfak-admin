"use client";

import Text from "@/components/core/text/Text";
import { useTheme } from "@/contexts/themeContext";
import useLocalizer from "@/hooks/useLocalizer";
import { cn } from "@/lib/utils";
import useAuthState from "@/services/zustand/authState";
import { MoonIcon, SunIcon } from "lucide-react";
import { useMemo } from "react";

const Welcome: React.FC = () => {
  const { t, isRtl } = useLocalizer();
  const { theme } = useTheme();
  const { user } = useAuthState();

  const isEvening = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    return hours > 11;
  }, []);

  const period = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return t("titles.goodMorning");
    return t("titles.goodEvening");
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 w-full min-h-[120px] border-0 shadow-lg  bg-card/50 p-4",
        theme === "dark" ? "border-accent" : "border-primary",
        isRtl ? "border-r-4" : "border-l-4"
      )}
    >
      <div className="flex flex-row gap-2">
        <Text type="header3">{period}</Text>
        {isEvening ? (
          <MoonIcon size={32} />
        ) : (
          <SunIcon size={32} className="text-yellow-500" />
        )}
      </div>
      <Text type="bodyLargeRegular">{user?.fullName}</Text>
    </div>
  );
};

export default Welcome;
