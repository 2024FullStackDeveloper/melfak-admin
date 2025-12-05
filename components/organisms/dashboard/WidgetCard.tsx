"use client";

import IconWrapper from "@/components/core/IconWrapper";
import Text from "@/components/core/text/Text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/themeContext";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IWidgetCard {
  title: string;
  value: string;
  icon: LucideIcon;
}
const WidgetCard: React.FC<IWidgetCard> = ({ title, value, icon }) => {
  const { theme } = useTheme();
  return (
    <Card
      className={cn(
        "border-0 " +
          (theme === "dark"
            ? "border-t-2 border-t-accent"
            : "border-t-2 border-t-primary")
      )}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br opacity-50  transition-opacity rounded-lg`}
      />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <Text type="bodyLargeBold">{title}</Text>
        </CardTitle>
        <div
          className={cn(
            "flex h-12 w-12 border items-center justify-center rounded-lg shadow-lg  transition-transform",
            theme === "dark" ? " border-accent" : " border-primary"
          )}
        >
          <IconWrapper Icon={icon} size={20} />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <Text type="bodyLargeBold">{value}</Text>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
