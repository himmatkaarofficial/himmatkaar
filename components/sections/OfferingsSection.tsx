"use client";

import React from "react";
import { motion } from "framer-motion";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { StaggeredGrid } from "@/components/animations/StaggeredGrid";

interface Offering {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OfferingsSectionProps {
  offerings: Offering[];
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({ offerings }) => {
  return (
    <section className="bg-[#08170d] py-20 sm:py-24 lg:py-28 relative border-t border-[#1a3a24]">
      {/* Ambient green glow */}
      <div className="glow-green-orb w-[450px] h-[450px] bottom-10 -right-20 opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <div className="mb-4 sm:mb-5">
            <span className="annotation-curly">
              Core Curriculum & Offerings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            Everything You Need to{" "}
            <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
              Succeed!
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal max-w-xl">
            Comprehensive skill-building and career acceleration support designed for Pakistan&apos;s brightest youth.
          </p>
        </motion.div>

        {/* Offerings Grid: Responsive on all devices */}
        <StaggeredGrid staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {offerings.map((offering, index) => (
            <OfferingCard
              key={index}
              icon={offering.icon}
              title={offering.title}
              description={offering.description}
            />
          ))}
        </StaggeredGrid>
      </div>
    </section>
  );
};


