"use client";
import { LucideIcon } from "lucide-react";
import IconWrapper from "../../IconWrapper";
import { Button } from "@/components/ui/button";

interface Action<T> {
  icon: LucideIcon;
  iconClassName?: string;
  onPress: (row: T) => void;
  visible?: boolean;
  variant?: React.ComponentProps<typeof Button>["variant"];
  bgColor: string;
  label?: string;
  buttonBehavior?: boolean;
}

interface ActionButtonsProps<T> {
  row: T;
  actions: Action<T>[];
}

const ActionButtons = <T,>({ row, actions }: ActionButtonsProps<T>) => {
  const getGridClasses = (actionsLength: number): string => {
    switch (actionsLength) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className={`grid ${getGridClasses(actions?.length)} gap-x-2`}>
      {actions.map((action, index) =>
        typeof action.visible == "boolean" ? (
          action.visible && (
            <Button
              variant={action.variant ?? "none"}
              key={index}
              type={action?.buttonBehavior ? "button" : "submit"}
              onClick={() => action.onPress(row)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bgColor}`}
            >
              <IconWrapper
                Icon={action.icon}
                className={action.iconClassName}
              />
            </Button>
          )
        ) : (
          <Button
            variant={action.variant ?? "none"}
            key={index}
            type={action?.buttonBehavior ? "button" : "submit"}
            onClick={() => action.onPress(row)}
            className={`flex h-10 w-10 items-center justify-center rounded-md px-3 ${action.bgColor}`}
          >
            <IconWrapper Icon={action.icon} className={action.iconClassName} />
          </Button>
        )
      )}
    </div>
  );
};

export default ActionButtons;
