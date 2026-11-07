"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BookOpen, Wrench, Code2, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: <Code2 size={28} />, title: "Build Real Projects", desc: "Apply concepts immediately through live project sprints, hands-on repositories, and portfolio deliverables.", tag: "Feature 01" },
  { icon: <Wrench size={28} />, title: "Use Industry Tools", desc: "Train with modern developer toolchains, AI prompt frameworks, and cloud workflows used by top engineering teams.", tag: "Feature 02" },
  { icon: <BookOpen size={28} />, title: "Learn by Doing", desc: "Interactive, mentor-backed live coding sessions focused strictly on market outcomes and employment excellence.", tag: "Feature 03" },
];

export default function TechnicalWorkshopsPage() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">

        {/* ── 1. Page Header (Dark Forest Green) ── */}
        <section className="bg-[#0a2012] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#1d442a] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-[#a3caad] hover:text-white transition-colors uppercase">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">Technical Workshops</span>
              </div>
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight max-w-3xl leading-[1.08]">
                Technical{" "}
                <span className="text-[#389456] italic">
                  Workshops!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#a3caad] leading-relaxed max-w-2xl font-normal">
                Hands-on masterclasses designed to build practical capabilities in modern developer tools, AI enablement, and technical problem solving.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Feature Cards Grid (Crisp White / Light Section with Interactive Cards) ── */}
        <section className="bg-white py-20 md:py-24 border-b border-[#e2ede4] text-[#07190e] relative">
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
            <div className="mb-14 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                • Curriculum Highlights
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08] mb-3">
                Hands-On{" "}
                <span className="text-[#2d7a46] italic">Capabilities!</span>
              </h2>
              <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed">
                Click any pillar below to inspect the hands-on engineering methodology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((item, idx) => {
                const isSelected = activeFeatureIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveFeatureIndex(idx)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-8 border transition-all duration-300 cursor-pointer select-none shadow-md flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                        : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}>
                          {item.icon}
                        </div>
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
                        }`}>
                          {item.tag}
                        </span>
                      </div>
                      <h3 className={`font-serif-heading text-xl font-bold mb-3 tracking-tight ${
                        isSelected ? "text-white" : "text-[#07190e]"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                      }`}>
                        {item.desc}
                      </p>
                    </div>

                    <div className={`pt-4 mt-6 border-t text-xs font-mono flex items-center justify-between ${
                      isSelected ? "border-[#1d442a] text-[#f3ae29]" : "border-[#e2ede4] text-[#4a6b53]"
                    }`}>
                      <span>{isSelected ? "✓ Active Selection" : "Click to select"}</span>
                      <span className={`text-[11px] font-bold ${isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}`}>
                        {isSelected ? "ACTIVE" : "SELECT →"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. CTA (Dark Forest Section) ── */}
        <section className="bg-[#0a2012] py-20 sm:py-24 border-t border-[#1d442a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0c2616] rounded-2xl p-8 sm:p-12 border border-[#1d442a] shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
              <div className="mb-3">
                <span className="annotation-curly">Hands-on Learning</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
                Explore Upcoming <span className="text-[#389456] italic">Workshops!</span>
              </h2>
              <p className="text-base sm:text-lg text-[#a3caad] mb-8 max-w-xl mx-auto font-normal leading-relaxed">
                See upcoming technical workshop schedules and secure your spot in the next session.
              </p>
              <Link href="/events/upcoming">
                <button className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                  <span>View Upcoming Events</span>
                  <ArrowUpRight size={16} className="text-[#f3ae29]" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

