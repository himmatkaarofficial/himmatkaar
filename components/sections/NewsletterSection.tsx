"use client";

import React from "react";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/NewsletterForm";

export const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-[#0a2012] py-20 md:py-28 text-white border-t border-[#1d442a] relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Card Surface (Crisp White Container, Soft Rounded 2XL) */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 md:p-16 border border-[#d8e6db] relative overflow-hidden shadow-2xl text-[#07190e]">
          
          {/* Light Grid Inside Container */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(45, 122, 70, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(45, 122, 70, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Urdu Calligraphy Background Watermark */}
          <div
            className="absolute -right-4 -bottom-6 font-urdu text-8xl sm:text-9xl text-[#2d7a46]/10 select-none pointer-events-none"
            dir="rtl"
          >
            ہمت کار
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider">
                  • Stay Updated
                </span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] mb-3 tracking-tight leading-[1.08]">
                Stay{" "}
                <span className="text-[#2d7a46] italic">
                  Updated!
                </span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#3a5342] max-w-lg font-normal">
                Subscribe to our newsletter for the latest cohort announcements, technical masterclasses, and career opportunities across Pakistan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <NewsletterForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


