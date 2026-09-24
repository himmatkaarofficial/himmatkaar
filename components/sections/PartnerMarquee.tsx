"use client";

import React from "react";
import Image from "next/image";

interface PartnerMarqueeProps {
  title?: string;
  logos: string[];
  reverse?: boolean;
}

const DEFAULT_PARTNERS = [
  "DEVSINC",
  "TECH CORP",
  "ANALYTICS PRO",
  "BIRCLE",
  "KM KAY & EMMIS GLOBAL",
  "NETSOL"
];

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ 
  title = "Our Collaborative Partners", 
  logos,
  reverse = false 
}) => {
  const hasLogos = logos && logos.length > 0;
  const infiniteLogos = hasLogos ? [...logos, ...logos, ...logos, ...logos] : [];
  const infinitePartners = [...DEFAULT_PARTNERS, ...DEFAULT_PARTNERS, ...DEFAULT_PARTNERS];

  return (
    <div className="w-full overflow-hidden py-10 bg-[#0a2012] border-b border-[#1d442a] relative">
      <div className="text-center mb-6">
        <span className="annotation-curly">
          {title}
        </span>
      </div>

      <div className="relative">
        {/* Gradient Edge Masks for Smooth Fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a2012, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a2012, transparent)" }}
        />

        {/* Marquee Track */}
        <div className={`flex items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee-infinite"}`}>
          {hasLogos ? (
            infiniteLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 sm:mx-6 flex items-center justify-center p-4 bg-[#0c2616] rounded-xl border border-[#1d442a] hover:border-[#389456] transition-all hover:scale-105 shadow-md"
                style={{ width: "160px", height: "80px" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo}
                    alt={`Partner ${(index % logos.length) + 1}`}
                    fill
                    className="object-contain filter brightness-90 contrast-125"
                    sizes="160px"
                  />
                </div>
              </div>
            ))
          ) : (
            infinitePartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-3 sm:mx-4 flex items-center justify-center px-6 py-4 bg-[#0c2616] rounded-xl border border-[#1d442a] hover:border-[#389456] transition-all hover:scale-105 shadow-md"
                style={{ height: "64px" }}
              >
                <span className="font-mono text-sm font-bold text-[#d1e7d8] tracking-wider uppercase whitespace-nowrap">
                  {partner}
                </span>
              </div>
            ))
          )}
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
          animation: marquee-infinite 32s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 32s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};
