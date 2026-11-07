"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, BookOpen, Award, Users, Target, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  { id: "training", title: "6-Month Leadership Curriculum", desc: "Structured intensive skill-building covering management, executive communication, and AI enablement.", icon: <BookOpen size={24} /> },
  { id: "mentorship", title: "1-on-1 Executive Mentorship", desc: "Weekly dedicated advisory sessions with corporate CXOs and experienced startup founders.", icon: <Users size={24} /> },
  { id: "workshops", title: "Exclusive Masterclasses", desc: "Hands-on masterclasses covering fullstack tools, growth frameworks, and product development.", icon: <Sparkles size={24} /> },
  { id: "network", title: "Faisalabad Alumni Network", desc: "Lifelong access to an influential peer circle and corporate partner talent pipelines in Faisalabad.", icon: <Target size={24} /> },
  { id: "certification", title: "Accredited Certification", desc: "Official verification of completion, executive endorsement, and talent referrals.", icon: <Award size={24} /> },
  { id: "placement", title: "Direct Career Placement", desc: "Fast-track candidate interviews with hiring partner organizations in tech, finance, and consulting.", icon: <Rocket size={24} /> },
];

export default function Fellowship() {
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number | null>(0);

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
            <div className="mb-4">
              <span className="annotation-curly">
                Flagship Fellowship
              </span>
            </div>
            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight max-w-3xl leading-[1.08]">
              Fellowship{" "}
              <span className="text-[#389456] italic">
                Program!
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#a3caad] max-w-2xl font-normal">
              Our Fellowship Program is designed to nurture emerging leaders through intensive mentorship, skill development, and live corporate engagement.
            </p>
          </div>
        </section>

        {/* ── 2. Benefits Grid (Crisp White / Light Section with Interactive Cards) ── */}
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
                • Fellowship Value
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08] mb-3">
                Program <span className="text-[#2d7a46] italic">Benefits!</span>
              </h2>
              <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed">
                Click any benefit card below to highlight key curriculum deliverables.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => {
                const isSelected = activeBenefitIndex === i;
                return (
                  <motion.div
                    key={b.id}
                    onClick={() => setActiveBenefitIndex(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-7 border transition-all duration-300 cursor-pointer select-none shadow-md flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                        : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}>
                          {b.icon}
                        </div>
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
                        }`}>
                          Benefit 0{i + 1}
                        </span>
                      </div>
                      <h3 className={`font-serif-heading text-xl font-bold mb-2 tracking-tight ${
                        isSelected ? "text-white" : "text-[#07190e]"
                      }`}>
                        {b.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                      }`}>
                        {b.desc}
                      </p>
                    </div>

                    <div className={`pt-4 mt-5 border-t text-xs font-mono flex items-center justify-between ${
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

            <div className="mt-14 text-center">
              <Link href="/launchpad">
                <button className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                  <span>Explore Launchpad Fellowship</span>
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

