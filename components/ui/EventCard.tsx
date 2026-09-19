import React from "react";
import Image from "next/image";

interface EventCardProps {
  image: string;
  title: string;
  date: string;
  description: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  description,
}) => {
  return (
    <div className="group bg-[#0e2417] rounded-xl overflow-hidden border border-[#1a3a24] flex flex-col transition-all duration-300 hover:border-[#0ae448]/50 hover:shadow-[0_0_25px_rgba(10,228,72,0.12)]">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0 bg-[#08170d]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2417] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1 text-white">
        {/* Monospaced Date Pill */}
        <div className="self-start">
          <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-[#0ae448]/30 bg-[#08170d] text-[#0ae448] font-medium tracking-wide">
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold leading-snug tracking-tight text-white group-hover:text-[#0ae448] transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#a8d5b5] line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

