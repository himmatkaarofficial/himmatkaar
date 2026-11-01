import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface TrackCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  badgeLabel?: string;
  trackNumber?: string;
  trajectory?: string[];
  isActive?: boolean;
  onClick?: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  icon,
  title,
  description,
  href = "/launchpad",
  badgeLabel,
  trackNumber = "01",
  trajectory = ["Learn", "Practice", "Apply"],
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 shadow-xl select-none cursor-pointer h-full ${
        isActive
          ? "bg-[#103820] border-[#f3ae29] text-white shadow-[0_12px_36px_rgba(45,122,70,0.35)] scale-[1.02]"
          : "bg-[#0c2616] border-[#1d442a] text-white hover:border-[#389456] hover:bg-[#0f2e1b]"
      }`}
    >
      <div>
        {/* Top Header: Track Tag & Number */}
        <div className="flex items-center justify-between mb-6">
          <span
            className={`font-mono text-[11px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-md border transition-colors ${
              isActive
                ? "bg-[#2d7a46] text-white border-[#389456]"
                : "bg-[#0a2012] text-[#389456] border-[#1d442a]"
            }`}
          >
            {badgeLabel || `Track ${trackNumber}`}
          </span>
          <div className="flex items-center gap-1.5">
            {isActive && <CheckCircle2 size={14} className="text-[#f3ae29]" />}
            <span className="font-mono text-xs font-bold text-[#f3ae29]">
              {trackNumber} / 03
            </span>
          </div>
        </div>

        {/* Naked Icon */}
        <div className={`mb-4 transition-transform duration-200 ${isActive ? "text-[#f3ae29] scale-105" : "text-[#389456]"}`}>
          {icon}
        </div>

        {/* Title in Playfair Display serif */}
        <h3 className="font-serif-heading text-2xl font-bold tracking-tight text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-[15px] leading-relaxed text-[#d1e7d8] mb-6">
          {description}
        </p>

        {/* Learning Trajectory: Learn -> Practice -> Apply */}
        <div className="mb-6 pt-4 border-t border-[#1d442a]">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#a3caad] mb-2">
            Learning Trajectory
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {trajectory.map((step, i) => (
              <React.Fragment key={i}>
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-colors ${
                    isActive
                      ? "bg-[#0c2616] border-[#2d7a46] text-[#f3ae29] font-medium"
                      : "bg-[#0a2012] border-[#1d442a] text-[#d1e7d8]"
                  }`}
                >
                  {step}
                </span>
                {i < trajectory.length - 1 && (
                  <span className="text-xs text-[#389456] font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Explore CTA Button (Soft Rounded Rectangle, strictly no pill) */}
      <div className="pt-2">
        <Link
          href={href}
          className={`w-full justify-between !py-2.5 !px-4 !text-sm !rounded-xl inline-flex items-center transition-all ${
            isActive
              ? "btn-gsap-cta"
              : "btn-gsap-ghost hover:border-[#389456] hover:bg-[#2d7a46]/20"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{isActive ? "Enrolled Track Details" : "Explore Track"}</span>
          <ArrowUpRight size={16} className="text-[#f3ae29]" />
        </Link>
      </div>
    </div>
  );
};



