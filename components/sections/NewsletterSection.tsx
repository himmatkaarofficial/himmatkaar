"use client";

import React from "react";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/NewsletterForm";

export const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-[#08170d] py-20 md:py-28 text-white border-t border-[#1a3a24] relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Surface */}
        <div className="bg-[#0e2417] rounded-2xl p-8 sm:p-12 md:p-16 border border-[#1a3a24] relative overflow-hidden shadow-2xl">
          {/* Subtle internal gradient */}
          <div 
            className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#0ae448]/5 blur-[90px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="mb-3">
                <span className="annotation-curly">
                  &#123; Stay Updated &#125;
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
                Stay{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Updated!
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-lg font-normal">
                Subscribe to our newsletter for the latest news, events, and opportunities across Pakistan.
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

