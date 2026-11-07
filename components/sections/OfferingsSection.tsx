"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

interface Offering {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OfferingsSectionProps {
  offerings: Offering[];
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({ offerings }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOffering = offerings[activeIndex] || offerings[0];

  return (
    <section id="offerings" className="bg-white py-20 sm:py-24 lg:py-28 relative border-t border-[#e2ede4] text-[#07190e]">
      {/* Light subtle grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(45, 122, 70, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(45, 122, 70, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Crisp Light typography) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider">
              • Core Curriculum & Offerings
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08] mb-4">
            Everything You Need to{" "}
            <span className="text-[#2d7a46] italic">
              Succeed!
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#3a5342] font-normal">
            Comprehensive skill-building and career acceleration support designed for Pakistan&apos;s brightest youth. Click any module below to inspect full deliverables.
          </p>
        </motion.div>

        {/* Split Grid: Left 6 Cards Grid (8 cols), Right Interactive Preview Card (4 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 6 Offering Cards Grid (Click to change color) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {offerings.map((offering, index) => (
              <OfferingCard
                key={index}
                icon={offering.icon}
                title={offering.title}
                description={offering.description}
                offeringNumber={`0${index + 1}`}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          {/* Right: Interactive Preview & CTA Card (Deep Forest Green Accent) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-[#0c2616] rounded-2xl p-6 sm:p-8 border border-[#1d442a] shadow-2xl relative overflow-hidden text-white">
              
              {/* Tagline Banner */}
              <div className="mb-6 px-4 py-3 rounded-xl bg-[#0a2012] border border-[#275836] flex items-center gap-2">
                <Sparkles size={16} className="text-[#f3ae29] flex-shrink-0" />
                <span className="text-xs font-mono text-[#d1e7d8] font-medium">
                  Different skills. One stronger future.
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-category-green !text-xs !rounded-md">
                      Curriculum 0{activeIndex + 1}
                    </span>
                  </div>

                  <div className="text-[#f3ae29]">
                    {activeOffering.icon}
                  </div>

                  <h3 className="font-serif-heading text-2xl font-bold text-white tracking-tight">
                    {activeOffering.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#d1e7d8]">
                    {activeOffering.description}
                  </p>

                  <div className="pt-4 border-t border-[#1d442a] space-y-2.5 text-xs text-[#a3caad]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#389456] flex-shrink-0" />
                      <span>Cohort-vetted practical curriculum</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#389456] flex-shrink-0" />
                      <span>Led by seasoned industry practitioners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#389456] flex-shrink-0" />
                      <span>Portfolio deliverables & evaluation</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#1d442a]">
                <Link
                  href="/launchpad"
                  className="btn-gsap-cta w-full justify-center !py-3 !text-sm !rounded-xl"
                >
                  <span>APPLY VIA LAUNCHPAD</span>
                  <ArrowUpRight size={16} className="text-[#f3ae29]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



