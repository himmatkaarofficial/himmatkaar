import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "white" | "parchment" | "mint" | "canopy" | "light" | "dark" | "forest" | "deep";
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "white",
  className = "",
  style = {},
}) => {
  const variantBackgrounds: Record<string, string> = {
    white:    "#ffffff",
    parchment:"var(--color-parchment)",
    mint:     "var(--color-mint-card)",
    canopy:   "var(--color-canopy-shadow)",
    light:    "#ffffff",
    dark:     "var(--color-canopy-shadow)",
    forest:   "var(--color-forest-floor)",
    deep:     "var(--color-canopy-shadow)",
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-full flex flex-col ${className}`}
      style={{
        background: variantBackgrounds[variant] || "#ffffff",
        borderRadius: "var(--radius-cards)",
        padding: "var(--card-padding)",
        border: "1px solid var(--color-dew)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
