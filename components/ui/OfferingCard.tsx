import React from "react";
import { CheckCircle2 } from "lucide-react";

interface OfferingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  offeringNumber?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({
  icon,
  title,
  description,
  offeringNumber,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 cursor-pointer select-none shadow-md ${
        isActive
          ? "bg-[#0c2616] border-[#2d7a46] text-white shadow-[0_12px_32px_rgba(12,38,22,0.35)] scale-[1.02]"
          : "bg-white border-[#d8e6db] text-[#07190e] hover:border-[#2d7a46]/70 hover:bg-[#f2f8f4] hover:shadow-lg"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          {/* Naked Icon (Color adapts on active selection) */}
          <div className={isActive ? "text-[#f3ae29]" : "text-[#2d7a46]"}>
            {icon}
          </div>
          {offeringNumber && (
            <span
              className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${
                isActive
                  ? "bg-[#10321e] text-[#f3ae29] border-[#2d7a46]"
                  : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
              }`}
            >
              {offeringNumber}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-serif-heading text-xl font-bold tracking-tight mb-2.5 transition-colors ${
            isActive ? "text-white" : "text-[#07190e]"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed transition-colors ${
            isActive ? "text-[#d1e7d8]" : "text-[#4a6b53]"
          }`}
        >
          {description}
        </p>
      </div>

      <div
        className={`pt-4 mt-5 border-t flex items-center justify-between text-xs font-mono transition-colors ${
          isActive
            ? "border-[#1d442a] text-[#f3ae29] font-semibold"
            : "border-[#e2ede4] text-[#4a6b53]"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {isActive ? (
            <>
              <CheckCircle2 size={14} className="text-[#f3ae29]" />
              <span>Selected Offering</span>
            </>
          ) : (
            <span>Click to select & view</span>
          )}
        </span>
        <span className={`text-[11px] font-bold ${isActive ? "text-[#f3ae29]" : "text-[#2d7a46]"}`}>
          {isActive ? "ACTIVE" : "SELECT →"}
        </span>
      </div>
    </div>
  );
};



