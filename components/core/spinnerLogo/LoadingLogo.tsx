"use client";
import SvgComponent from "../logos/SvgComponent";

interface SpinnerLogoProps {
  size?: "small" | "medium" | "large";
}

const LoadingLogo = ({ size = "medium" }: SpinnerLogoProps) => {
  const dimensions = {
    small: { width: 50, height: 50 },
    medium: { width: 100, height: 100 },
    large: { width: 150, height: 150 },
  };

  const { width, height } = dimensions[size];

  return (
    <div className="animate-pulse">
      <SvgComponent width={width} height={height} />
    </div>
  );
};

export default LoadingLogo;
