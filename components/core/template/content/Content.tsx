"use client";
import React from "react";
import Text from "../../text/Text";
import Col from "../col/Col";

type Props = {
  children: React.ReactNode;
  className?: string;
  grid?: boolean;
  gridCols?: number;
  gridGap?: number;
  isLoading?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  xs?: {
    gridCols?: number;
    gridGap?: number;
  };
  sm?: {
    gridCols?: number;
    gridGap?: number;
  };
  md?: {
    gridCols?: number;
    gridGap?: number;
  };
  lg?: {
    gridCols?: number;
    gridGap?: number;
  };
  xl?: {
    gridCols?: number;
    gridGap?: number;
  };
  xxl?: {
    gridCols?: number;
    gridGap?: number;
  };
};

const Content = ({
  children,
  className,
  grid = false,
  gridCols = 1,
  gridGap = 4,
  isLoading = false,
  fullWidth = false,
  fullHeight = false,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: Props) => {
  const gridClass = grid ? `grid` : ``;
  const fullWidthClass = fullWidth ? "w-full" : "";
  const fullHeightClass = fullHeight ? "h-full flex-grow" : "";

  const getGridColsClass = () => {
    const classes = [];

    // Default grid columns
    if (gridCols === 1) classes.push("grid-cols-1");
    if (gridCols === 2) classes.push("grid-cols-2");
    if (gridCols === 3) classes.push("grid-cols-3");
    if (gridCols === 4) classes.push("grid-cols-4");
    if (gridCols === 5) classes.push("grid-cols-5");
    if (gridCols === 6) classes.push("grid-cols-6");
    if (gridCols === 7) classes.push("grid-cols-7");
    if (gridCols === 8) classes.push("grid-cols-8");
    if (gridCols === 9) classes.push("grid-cols-9");
    if (gridCols === 10) classes.push("grid-cols-10");
    if (gridCols === 11) classes.push("grid-cols-11");
    if (gridCols === 12) classes.push("grid-cols-12");

    // Extra small screens (using min-width instead of max-width)
    if (xs?.gridCols === 1) classes.push("min-[320px]:grid-cols-1");
    if (xs?.gridCols === 2) classes.push("min-[320px]:grid-cols-2");
    if (xs?.gridCols === 3) classes.push("min-[320px]:grid-cols-3");
    if (xs?.gridCols === 4) classes.push("min-[320px]:grid-cols-4");
    if (xs?.gridCols === 5) classes.push("min-[320px]:grid-cols-5");
    if (xs?.gridCols === 6) classes.push("min-[320px]:grid-cols-6");

    // Small screens
    if (sm?.gridCols === 1) classes.push("sm:grid-cols-1");
    if (sm?.gridCols === 2) classes.push("sm:grid-cols-2");
    if (sm?.gridCols === 3) classes.push("sm:grid-cols-3");
    if (sm?.gridCols === 4) classes.push("sm:grid-cols-4");
    if (sm?.gridCols === 5) classes.push("sm:grid-cols-5");
    if (sm?.gridCols === 6) classes.push("sm:grid-cols-6");

    // Medium screens
    if (md?.gridCols === 1) classes.push("md:grid-cols-1");
    if (md?.gridCols === 2) classes.push("md:grid-cols-2");
    if (md?.gridCols === 3) classes.push("md:grid-cols-3");
    if (md?.gridCols === 4) classes.push("md:grid-cols-4");
    if (md?.gridCols === 5) classes.push("md:grid-cols-5");
    if (md?.gridCols === 6) classes.push("md:grid-cols-6");

    // Large screens
    if (lg?.gridCols === 1) classes.push("lg:grid-cols-1");
    if (lg?.gridCols === 2) classes.push("lg:grid-cols-2");
    if (lg?.gridCols === 3) classes.push("lg:grid-cols-3");
    if (lg?.gridCols === 4) classes.push("lg:grid-cols-4");
    if (lg?.gridCols === 5) classes.push("lg:grid-cols-5");
    if (lg?.gridCols === 6) classes.push("lg:grid-cols-6");

    // Extra large screens
    if (xl?.gridCols === 1) classes.push("xl:grid-cols-1");
    if (xl?.gridCols === 2) classes.push("xl:grid-cols-2");
    if (xl?.gridCols === 3) classes.push("xl:grid-cols-3");
    if (xl?.gridCols === 4) classes.push("xl:grid-cols-4");
    if (xl?.gridCols === 5) classes.push("xl:grid-cols-5");
    if (xl?.gridCols === 6) classes.push("xl:grid-cols-6");

    // 2XL screens
    if (xxl?.gridCols === 1) classes.push("2xl:grid-cols-1");
    if (xxl?.gridCols === 2) classes.push("2xl:grid-cols-2");
    if (xxl?.gridCols === 3) classes.push("2xl:grid-cols-3");
    if (xxl?.gridCols === 4) classes.push("2xl:grid-cols-4");
    if (xxl?.gridCols === 5) classes.push("2xl:grid-cols-5");
    if (xxl?.gridCols === 6) classes.push("2xl:grid-cols-6");

    return classes.join(" ");
  };

  const getGridGapClass = () => {
    const classes = [];

    // Default gap
    if (gridGap === 0) classes.push("gap-0");
    if (gridGap === 1) classes.push("gap-1");
    if (gridGap === 2) classes.push("gap-2");
    if (gridGap === 3) classes.push("gap-3");
    if (gridGap === 4) classes.push("gap-4");
    if (gridGap === 5) classes.push("gap-5");
    if (gridGap === 6) classes.push("gap-6");
    if (gridGap === 7) classes.push("gap-7");
    if (gridGap === 8) classes.push("gap-8");
    if (gridGap === 9) classes.push("gap-9");
    if (gridGap === 10) classes.push("gap-10");
    if (gridGap === 11) classes.push("gap-11");
    if (gridGap === 12) classes.push("gap-12");

    // Responsive gaps (using min-width for xs)
    if (xs?.gridGap) classes.push(`min-[320px]:gap-${xs.gridGap}`);
    if (sm?.gridGap) classes.push(`sm:gap-${sm.gridGap}`);
    if (md?.gridGap) classes.push(`md:gap-${md.gridGap}`);
    if (lg?.gridGap) classes.push(`lg:gap-${lg.gridGap}`);
    if (xl?.gridGap) classes.push(`xl:gap-${xl.gridGap}`);
    if (xxl?.gridGap) classes.push(`2xl:gap-${xxl.gridGap}`);

    return classes.join(" ");
  };

  if (isLoading) {
    return (
      <Col
        fullWidth
        fullHeight
        alignVertical={"center"}
        alignHorizontal={"center"}
        className="h-full w-full rounded-lg bg-white p-4 md:p-10"
      >
        <Text type={"bodyBaseMedium"}>جاري التحميل ...</Text>
      </Col>
    );
  }

  return (
    <div
      className={`${gridClass} ${getGridColsClass()} ${getGridGapClass()} ${fullWidthClass} ${fullHeightClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Content;
