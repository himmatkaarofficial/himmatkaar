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
    <section className="bg-[#0a2012] py-16 md:py-20 border-y border-[#1d442a] relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

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
              className="bg-[#0c2616] rounded-2xl p-6 sm:p-8 border border-[#1d442a] hover:border-[#389456] transition-all duration-300 text-center shadow-xl group hover:shadow-[0_8px_30px_rgba(45,122,70,0.12)]"
            >
              <p className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-[#f3ae29] transition-colors duration-300">
                <CountUp
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-[#a3caad] font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

