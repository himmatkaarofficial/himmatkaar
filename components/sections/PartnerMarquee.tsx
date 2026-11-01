"use client";

import React, { useState } from "react";
import Image from "next/image";
import PartnerDetailModal, { PartnerDetail } from "@/components/PartnerDetailModal";

export interface PartnerItem {
  id?: string;
  name: string;
  logo_url: string;
  category?: "managing" | "tech";
  description?: string;
  website_url?: string;
}

interface PartnerMarqueeProps {
  title?: string;
  logos?: string[];
  partnersData?: PartnerItem[];
  category?: "managing" | "tech";
  reverse?: boolean;
}

export const PartnerMarquee: React.FC<PartnerMarqueeProps> = ({ 
  title = "Our Collaborative Partners", 
  logos = [],
  partnersData,
  category,
  reverse = false 
}) => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerDetail | null>(null);

  // Normalize partner objects
  let items: PartnerDetail[] = [];
  if (partnersData && partnersData.length > 0) {
    items = partnersData;
  } else if (logos && logos.length > 0) {
    items = logos.map((url, idx) => ({
      id: `p-${idx}`,
      name: "Partner",
      logo_url: url,
      category: category || "managing",
    }));
  }

  // If there are no partner items, hide this marquee completely
  if (items.length === 0) {
    return null;
  }

  const infiniteItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-10 bg-[#0a2012] border-b border-[#1d442a] relative">
      <div className="text-center mb-6">
        <span className="annotation-curly">
          {title}
        </span>
      </div>

      <div className="relative">
        {/* Gradient Edge Masks */}
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
          {infiniteItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedPartner(item)}
              className="flex-shrink-0 mx-3 sm:mx-5 flex items-center justify-center p-3 sm:p-4 bg-white rounded-2xl border border-[#d8e6db] hover:border-[#2d7a46] hover:shadow-xl transition-all hover:scale-105 cursor-pointer shadow-md group"
              style={{ width: "170px", height: "85px" }}
              title={`Click to view ${item.name} details`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.logo_url}
                  alt={item.name}
                  fill
                  className="object-contain p-1 transition-transform group-hover:scale-105"
                  sizes="170px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Detail Modal */}
      <PartnerDetailModal
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />

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
