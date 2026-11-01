import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "white" | "parchment" | "mint" | "canopy" | "light" | "dark" | "forest" | "deep";
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "dark",
  className = "",
  style = {},
}) => {
  const variantBackgrounds: Record<string, string> = {
    white:    "#0c2616",
    parchment:"#0c2616",
    mint:     "#10321e",
    canopy:   "#0a2012",
    light:    "#0c2616",
    dark:     "#0c2616",
    forest:   "#0c2616",
    deep:     "#07190e",
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-full flex flex-col rounded-2xl border border-[#1d442a] p-6 sm:p-8 ${className}`}
      style={{
        background: variantBackgrounds[variant] || "#0c2616",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
