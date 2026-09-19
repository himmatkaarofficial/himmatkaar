import React from "react";

interface OfferingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  chromaColor?: string;
  bgColor?: string;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-[#0e2417] rounded-lg p-6 sm:p-7 flex flex-col gap-3.5 min-h-[250px] sm:min-h-[260px] border border-[#1a3a24] transition-all hover:border-[#0ae448]/40 hover:bg-[#132f1f] group">
      {/* Icon */}
      <div className="text-[#0ae448] group-hover:scale-105 transition-transform">{icon}</div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white group-hover:text-[#abff84] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-[#8ea896] flex-1">
        {description}
      </p>
    </div>
  );
};


