"use client";
import Image from "next/image";
import React from "react";

export type TIconSize = "sm" | "md" | "lg" | "xl";

export const IconSizes = {
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 32,
    height: 32,
  },
  xl: {
    width: 48,
    height: 48,
  },
};

interface ICustomIconSize {
  width: number;
  height: number;
}

interface IIconProps {
  name: string;
  className?: string;
  size?: TIconSize;
  customSize?: ICustomIconSize;
  onClick?: any;
  style?: React.CSSProperties;
}

const Icon = ({
  name,
  className,
  size,
  customSize,
  onClick,
  style,
  ...props
}: IIconProps) => {
  try {
    const IconComponent = `/icons/${name}.svg`;
    const preparedWidth = customSize
      ? customSize.width
      : IconSizes[`${size || "md"}`].width;
    const preparedHeight = customSize
      ? customSize.height
      : IconSizes[`${size || "md"}`].height;
    return (
      <Image
        onClick={onClick}
        src={IconComponent}
        className={className}
        alt={name}
        width={preparedWidth}
        height={preparedHeight}
        {...props}
        style={{
          display: "inline-block",
          fill: "currentcolor",
          ...style,
        }}
      />
    );
  } catch (error) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }
};

export default Icon;
