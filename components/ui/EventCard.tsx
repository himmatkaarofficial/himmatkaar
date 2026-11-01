import React from "react";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";

interface EventCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  description,
  location,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-[#0c2616] rounded-2xl overflow-hidden border border-[#1d442a] flex flex-col justify-between transition-all duration-300 hover:border-[#389456] hover:shadow-[0_8px_30px_rgba(45,122,70,0.18)] h-full ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div>
        {/* Event Image */}
        <div className="relative w-full h-52 overflow-hidden flex-shrink-0 bg-[#0a2012]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c2616] via-transparent to-transparent opacity-75" />
        </div>

        {/* Content */}
        <div className="p-6 text-white">
          {/* Date Tag */}
          <div className="self-start mb-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md border border-[#275836] bg-[#0a2012] text-[#f3ae29] font-medium tracking-wide">
              <Calendar size={13} className="text-[#f3ae29]" />
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif-heading text-xl font-bold leading-snug tracking-tight text-white group-hover:text-[#d1e7d8] transition-colors duration-200 mb-2.5">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-[#a3caad] line-clamp-3 mb-2">
            {description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-[#1d442a] text-xs font-mono text-[#a3caad] flex items-center justify-between">
        <span>📍 {location || "Himmatkaar Event"}</span>
        <span className="text-[#2d7a46] group-hover:text-[#f3ae29] font-bold uppercase tracking-wider flex items-center gap-0.5 transition-colors">
          Details <ArrowUpRight size={13} />
        </span>
      </div>
    </div>
  );
};
