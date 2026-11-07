"use client";

import React from "react";
import { motion } from "framer-motion";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="bg-[#0a2012] py-20 md:py-28 border-t border-[#1d442a] relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

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
              Member Voices
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
            What Our Members{" "}
            <span className="text-[#389456] italic">
              Say!
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#a3caad] font-normal">
            Real experiences and career milestones from graduates in Faisalabad
          </p>
        </motion.div>

        <TestimonialCarousel />
      </div>
    </section>
  );
};

