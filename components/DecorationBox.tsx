"use client";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import Text from "./core/text/Text";
const DecorationBox = ({
  className,
  children,
  headerClassName,
  headerContent,
  contentClassName,
  refreshEnabled = false,
  onRefreshClick,
}: React.PropsWithChildren<{
  className?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  contentClassName?: string;
  refreshEnabled?: boolean;
  onRefreshClick?: () => Promise<void>;
}>) => {
  return (
    <div
      className={cn(
        " bg-background rounded-md overflow-hidden shadow-sm border",
        className
      )}
    >
      <header
        className={cn(
          "flex items-center flex-row justify-between bg-card h-14 p-5",
          headerClassName
        )}
      >
        <Text type="bodyLargeMedium">{headerContent}</Text>
        {refreshEnabled && (
          <Button onClick={() => onRefreshClick?.()}>
            <RefreshCw />
          </Button>
        )}
      </header>
      <div className={cn("flex flex-col gap-5 p-5", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default DecorationBox;
