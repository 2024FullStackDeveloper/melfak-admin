"use client";
import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

export interface SortButtonProps {
  isAcs?: boolean;
  label: string;
  onSort?: () => void;
}

const SortButton = ({ isAcs, label, ...props }: SortButtonProps) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Button variant="none" onClick={props?.onSort}>
        {isAcs ? (
          <ArrowUpDown className=" h-4 w-4" />
        ) : (
          <ArrowDownUp className=" h-4 w-4" />
        )}
      </Button>
      {label}
    </div>
  );
};
export default SortButton;
