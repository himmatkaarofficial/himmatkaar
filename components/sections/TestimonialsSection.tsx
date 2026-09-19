"use client";

import React from "react";
import { motion } from "framer-motion";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-[#08170d] py-20 md:py-28 border-t border-[#1a3a24] relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/3 left-10 w-[450px] h-[300px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <div className="mb-3">
            <span className="annotation-curly">
              &#123; Member Voices &#125;
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
            What Our Members{" "}
            <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
              Say!
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal">
            Hear from the changemakers who are making a difference
          </p>
        </motion.div>

        <TestimonialCarousel />
      </div>
    </section>
  );
};

