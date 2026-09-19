"use client";

import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/animations/CountUp";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <section className="bg-[#08170d] py-16 md:py-20 border-y border-[#1a3a24] relative overflow-hidden">
      {/* Subtle background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[160px] bg-[#0ae448]/5 blur-[100px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#0e2417] rounded-lg p-5 sm:p-7 md:p-8 border border-[#1a3a24] hover:border-[#0ae448]/40 transition-all duration-300 text-center group"
            >
              <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-[#0ae448] transition-colors duration-300">
                <CountUp
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#a8d5b5] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

