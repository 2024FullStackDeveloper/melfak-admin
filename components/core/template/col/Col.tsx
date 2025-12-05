"use client";
import { getSpanClasses, SpanProps } from "@/lib/utils";
import React, { forwardRef, ElementType } from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  alignVertical?: "center" | "start" | "end" | "between" | "around";
  alignHorizontal?: "center" | "start" | "end";
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  span?: SpanProps;
  as?: ElementType;
  href?: string;
  target?: string;
}

const Col = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      alignVertical,
      alignHorizontal,
      className,
      fullWidth = false,
      fullHeight = false,
      onClick,
      onMouseEnter,
      onMouseLeave,
      style,
      span,
      as = "div",
      href,
      target,
      ...props
    },
    ref
  ) => {
    const Element = as as ElementType;

    return (
      <Element
        ref={ref}
        href={href}
        target={target}
        className={`flex flex-col
          ${getSpanClasses(span)}
          ${alignVertical === "center" ? "justify-center" : ""}
          ${alignVertical === "start" ? "justify-start" : ""}
          ${alignVertical === "end" ? "justify-end" : ""}
          ${alignVertical === "between" ? "justify-between" : ""}
          ${alignVertical === "around" ? "justify-around" : ""}
          ${alignHorizontal === "center" ? "items-center" : ""}
          ${alignHorizontal === "start" ? "items-start" : ""}
          ${alignHorizontal === "end" ? "items-end" : ""}
          ${fullWidth ? "w-full" : ""}
          ${fullHeight ? "h-full" : ""}
          ${onClick ? "cursor-pointer" : ""}
          ${className}`}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Col.displayName = "Col";

export default Col;
