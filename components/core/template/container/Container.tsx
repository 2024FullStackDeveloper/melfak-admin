"use client";
import React from "react";

type AlignmentType =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
  alignHorizontal?: AlignmentType;
  alignVertical?: AlignmentType;
  direction?: "row" | "col";
  withPadding?: boolean;
};

const Container = ({
  children,
  fullWidth,
  fullHeight,
  className,
  alignHorizontal = "start",
  alignVertical = "start",
  direction = "col",
  withPadding = false,
}: Props) => {
  const fullWidthClass = fullWidth ? "w-full" : "";
  const fullHeightClass = fullHeight ? "h-full flex-grow" : "";
  const paddingClass = withPadding ? "p-5 md:px-8 lg:px-12" : "";

  const getAlignmentClass = () => {
    const horizontalAlignments = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      between: "items-between",
      around: "items-around",
      evenly: "items-evenly",
    };

    const verticalAlignments = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return `${horizontalAlignments[alignHorizontal]} ${verticalAlignments[alignVertical]}`;
  };

  return (
    <div
      className={`flex ${
        direction === "col" ? "flex-col" : "flex-row"
      } ${fullWidthClass} ${fullHeightClass} ${paddingClass} ${getAlignmentClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
