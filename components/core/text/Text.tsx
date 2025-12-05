"use client";
import React, { useState } from "react";
import { FontSize } from "@/types/Fonts";

type TextProps = {
  children: React.ReactNode;
  type: FontSize;
  className?: string;
  link?: boolean;
  onClick?: () => void;
  center?: boolean;
  underline?: boolean;
  showMore?: boolean;
  maxLength?: number;
  showMoreText?: string;
  showLessText?: string;
  breakWords?: boolean;
};

const fonts: Record<FontSize, Record<string, string>> = {
  header1: {
    fontSize: "text-6xl",
    fontWeight: "font-bold",
  },
  header2: {
    fontSize: "text-5xl",
    fontWeight: "font-bold",
  },
  header3: {
    fontSize: "text-4xl",
    fontWeight: "font-bold",
  },
  header4: {
    fontSize: "text-3xl",
    fontWeight: "font-bold",
  },
  header5: {
    fontSize: "text-2xl",
    fontWeight: "font-bold",
  },
  header6: {
    fontSize: "text-xl",
    fontWeight: "font-bold",
  },
  bodyXLargeBold: {
    fontSize: "text-xl",
    fontWeight: "font-bold",
  },
  bodyXLargeSemiBold: {
    fontSize: "text-xl",
    fontWeight: "font-semibold",
  },
  bodyXLargeMedium: {
    fontSize: "text-xl",
    fontWeight: "font-medium",
  },
  bodyXLargeRegular: {
    fontSize: "text-xl",
    fontWeight: "font-normal",
  },
  bodyLargeBold: {
    fontSize: "text-lg",
    fontWeight: "font-bold",
  },
  bodyLargeSemiBold: {
    fontSize: "text-lg",
    fontWeight: "font-semibold",
  },
  bodyLargeMedium: {
    fontSize: "text-lg",
    fontWeight: "font-medium",
  },
  bodyLargeRegular: {
    fontSize: "text-lg",
    fontWeight: "font-normal",
  },
  bodyBaseBold: {
    fontSize: "text-base",
    fontWeight: "font-bold",
  },
  bodyBaseSemiBold: {
    fontSize: "text-base",
    fontWeight: "font-semibold",
  },
  bodyBaseMedium: {
    fontSize: "text-base",
    fontWeight: "font-medium",
  },
  bodyBaseRegular: {
    fontSize: "text-base",
    fontWeight: "font-normal",
  },
  bodySmallBold: {
    fontSize: "text-sm",
    fontWeight: "font-bold",
  },
  bodySmallSemiBold: {
    fontSize: "text-sm",
    fontWeight: "font-semibold",
  },
  bodySmallMedium: {
    fontSize: "text-sm",
    fontWeight: "font-medium",
  },
  bodySmallRegular: {
    fontSize: "text-sm",
    fontWeight: "font-normal",
  },
  bodyXSmallBold: {
    fontSize: "text-xs",
    fontWeight: "font-bold",
  },
  bodyXSmallSemiBold: {
    fontSize: "text-xs",
    fontWeight: "font-semibold",
  },
  bodyXSmallMedium: {
    fontSize: "text-xs",
    fontWeight: "font-medium",
  },
  bodyXSmallRegular: {
    fontSize: "text-xs",
    fontWeight: "font-normal",
  },
  bodyXXSmallRegular: {
    fontSize: "text-[10px]",
    fontWeight: "font-normal",
  },
  bodyXXSmallMedium: {
    fontSize: "text-[10px]",
    fontWeight: "font-medium",
  },
  bodyXXSmallBold: {
    fontSize: "text-[10px]",
    fontWeight: "font-bold",
  },
  bodyXXSmallSemiBold: {
    fontSize: "text-[10px]",
    fontWeight: "font-semibold",
  },
};

const Text: React.FC<TextProps> = ({
  children,
  type,
  className = "",
  link = false,
  onClick,
  center = false,
  underline = false,
  showMore = false,
  maxLength = 150,
  showMoreText = "عرض المزيد",
  showLessText = "عرض أقل",
  breakWords = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const textStyles = fonts[type];
  const linkClass = link ? "hover:underline cursor-pointer" : "";
  const centerClass = center ? "text-center" : "";
  const underlineClass = underline ? "underline" : "";
  const breakWordsClass = breakWords ? "break-words whitespace-normal" : "";
  const textClasses = `${textStyles?.fontSize} ${textStyles?.fontWeight} ${linkClass} ${centerClass} ${underlineClass} ${breakWordsClass} ${className}`;

  const text = typeof children === "string" ? children : "";
  const shouldShowMore = showMore && text.length > maxLength;
  const displayText =
    shouldShowMore && !isExpanded ? `${text.slice(0, maxLength)}...` : text;

  const content = (
    <p onClick={onClick} className={textClasses}>
      {shouldShowMore ? (
        <span>
          {displayText}
          {!isExpanded && "... "}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`inline-block hover:underline cursor-pointer text-primary-900 ${textStyles?.fontSize}`}
          >
            {isExpanded ? showLessText : showMoreText}
          </span>
        </span>
      ) : (
        children
      )}
    </p>
  );

  if (breakWords) {
    return (
      <div className="break-words whitespace-normal overflow-hidden block w-full">
        {content}
      </div>
    );
  }

  return content;
};

export default Text;
