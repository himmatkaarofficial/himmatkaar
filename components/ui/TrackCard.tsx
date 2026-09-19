import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TrackCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  chromaColor?: string;
  badgeLabel?: string;
  badgeColor?: string;
  badgeTextColor?: string;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  icon,
  title,
  description,
  href = "/launchpad",
  badgeLabel,
}) => {
  return (
    <Link href={href} className="block group h-full">
      <div className="bg-[#0e2417] rounded-lg p-6 sm:p-8 flex flex-col gap-4 min-h-[320px] sm:min-h-[340px] border border-[#1a3a24] transition-all hover:border-[#0ae448]/50 hover:bg-[#132f1f] h-full">
        {/* Specimen Category Badge */}
        {badgeLabel && (
          <span className="badge-category-green self-start">
            [{badgeLabel}]
          </span>
        )}

        {/* Icon */}
        <div className="text-[#0ae448] mt-1 group-hover:scale-105 transition-transform">{icon}</div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-[#abff84] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base leading-relaxed text-[#8ea896] flex-1">
          {description}
        </p>

        {/* Explore Arrow Link */}
        <div className="mt-auto pt-4 border-t border-[#1a3a24]/60">
          <span className="link-seed-arrow cursor-pointer group-hover:text-[#abff84] inline-flex items-center gap-2">
            Explore Track <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};


