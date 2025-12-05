"use client";
import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  alignVertical?: "center" | "start" | "end" | "between" | "around" | "evenly";
  alignHorizontal?:
    | "center"
    | "start"
    | "end"
    | "between"
    | "around"
    | "evenly"
    | "stretch"
    | "evenly";
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Row = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      alignVertical,
      alignHorizontal,
      className,
      fullWidth = false,
      fullHeight = false,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const alignVerticalClass =
      alignVertical == "center"
        ? "items-center"
        : alignVertical == "start"
        ? "items-start"
        : alignVertical == "end"
        ? "items-end"
        : alignVertical == "between"
        ? "items-between"
        : alignVertical == "around"
        ? "items-around"
        : alignVertical == "evenly"
        ? "items-evenly"
        : "";

    const alignHorizontalClass =
      alignHorizontal == "center"
        ? "justify-center"
        : alignHorizontal == "start"
        ? "justify-start"
        : alignHorizontal == "end"
        ? "justify-end"
        : alignHorizontal == "between"
        ? "justify-between"
        : alignHorizontal == "around"
        ? "justify-around"
        : alignHorizontal == "evenly"
        ? "justify-evenly"
        : alignHorizontal == "stretch"
        ? "justify-stretch"
        : "";

    const fullWidthClass = fullWidth ? "w-full" : "";
    const fullHeightClass = fullHeight ? "h-full" : "";
    const clickableClass = onClick ? "cursor-pointer" : "";

    return (
      <div
        ref={ref}
        className={`flex flex-row ${alignVerticalClass} ${alignHorizontalClass} ${fullWidthClass} ${fullHeightClass} ${clickableClass} ${className}`}
        style={style}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = "Row";

export default Row;
