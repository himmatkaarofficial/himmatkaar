"use client";

import React from "react";
import Image from "next/image";

interface PartnerMarqueeProps {
  title?: string;
  logos: string[];
  reverse?: boolean;
}

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ 
  title = "Our Managing Partners", 
  logos,
  reverse = false 
}) => {
  const infiniteLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-8 bg-[#08170d] border-b border-[#1a3a24] relative">
      <div className="text-center mb-5">
        <span className="annotation-curly">
          &#123; {title} &#125;
        </span>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #08170d, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #08170d, transparent)" }}
        />

        {/* Marquee */}
        <div className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee-infinite"}`}>
          {infiniteLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 sm:mx-6 flex items-center justify-center p-4 bg-white rounded-xl border border-[#1a3a24] transition-all hover:scale-105 shadow-md"
              style={{
                width: "160px",
                height: "85px",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo}
                  alt={`Partner ${(index % logos.length) + 1}`}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-infinite {
          animation: marquee-infinite 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};
