"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Briefcase, GraduationCap, Globe, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Impact() {
  const [activeStatIndex, setActiveStatIndex] = useState<number | null>(0);
  const [activeRippleIndex, setActiveRippleIndex] = useState<number | null>(0);

  const mainStats = [
    { icon: <Users className="w-8 h-8" />, number: "1,000+", label: "Fellows Empowered", desc: "Students from diverse universities and colleges across Faisalabad.", tag: "Faisalabad Reach" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "85%", label: "Career Placement Rate", desc: "Secured meaningful employment or paid internships within 90 days.", tag: "Employment" },
    { icon: <Award className="w-8 h-8" />, number: "75%", label: "Skills Improvement Index", desc: "Average measurable growth in technical and executive competencies.", tag: "Competency" }
  ];

  const rippleItems = [
    { 
      icon: <Briefcase className="w-6 h-6" />, 
      title: "Career & Economic Mobility", 
      stats: ["85% employment rate within 3 months of fellowship completion", "60% average salary increase post-program placement", "200+ partner companies actively hiring our alumni"],
      tag: "Mobility"
    },
    { 
      icon: <GraduationCap className="w-6 h-6" />, 
      title: "Holistic Skills Mastery", 
      stats: ["72% improvement in proactive leadership and speaking", "81% boost in corporate interviewing and pitch competence", "60% aggregate improvement in commercial confidence"],
      tag: "Skills"
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      title: "Faisalabad Regional Footprint",
      stats: ["Ambitious fellows representing campuses across Faisalabad", "Representing youth from all sectors of Faisalabad", "Active local alumni clusters across Faisalabad"],
      tag: "Faisalabad Reach"
    },
    { 
      icon: <Users className="w-6 h-6" />, 
      title: "Community & Socioeconomic Impact", 
      stats: ["5,000+ indirect community beneficiaries reached", "1,700+ local youth community initiatives executed", "Lifelong collaborative changemaker network"],
      tag: "Community"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08170d] text-white flex flex-col font-sans relative overflow-hidden">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── 1. Hero Section (Dark Forest Green) ── */}
        <section className="bg-[#0a2012] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-b border-[#1d442a] overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  Real Numbers, Real Change
                </span>
              </div>
              <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                Measuring Our{" "}
                <span className="text-[#389456] italic">
                  Impact!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#a3caad] max-w-2xl mx-auto leading-relaxed font-normal">
                At HimmatKaar, data tells a story. Our impact isn&apos;t just measured in numbers, but in careers launched, lives transformed, and communities uplifted across Faisalabad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Main Stats (Crisp White / Light Section with Interactive Cards) ── */}
        <section className="bg-white py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative z-20 border-b border-[#e2ede4] text-[#07190e]">
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

          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                • Verified Metrics
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08]">
                Core Achievement <span className="text-[#2d7a46] italic">Pillars!</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mainStats.map((stat, index) => {
                const isSelected = activeStatIndex === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveStatIndex(index)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-8 border transition-all duration-300 cursor-pointer select-none shadow-md flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                        : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}>
                          {stat.icon}
                        </div>
                        <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
                        }`}>
                          {stat.tag}
                        </span>
                      </div>
                      <div className={`font-serif-heading text-4xl sm:text-5xl font-bold mb-2 tracking-tight ${
                        isSelected ? "text-[#f3ae29]" : "text-[#07190e]"
                      }`}>
                        {stat.number}
                      </div>
                      <h3 className={`text-lg font-bold mb-2 ${
                        isSelected ? "text-white" : "text-[#07190e]"
                      }`}>
                        {stat.label}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                      }`}>
                        {stat.desc}
                      </p>
                    </div>

                    <div className={`pt-4 mt-6 border-t text-xs font-mono flex items-center justify-between ${
                      isSelected ? "border-[#1d442a] text-[#f3ae29]" : "border-[#e2ede4] text-[#4a6b53]"
                    }`}>
                      <span>{isSelected ? "✓ Active Metric" : "Click to select"}</span>
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

        {/* ── 3. Detailed Impact Breakdown Cards (Dark Forest Section) ── */}
        <section className="bg-[#0a2012] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1d442a] relative">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-14 max-w-3xl">
              <div className="mb-3">
                <span className="annotation-curly">The Ripple Effect</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
                Tangible Widespread{" "}
                <span className="text-[#389456] italic">
                  Change!
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#a3caad] font-normal leading-relaxed">
                How our rigorous curriculum translates directly into sustainable socioeconomic outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {rippleItems.map((item, index) => {
                const isSelected = activeRippleIndex === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveRippleIndex(index)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`rounded-2xl p-8 border transition-all duration-300 cursor-pointer select-none shadow-xl ${
                      isSelected
                        ? "bg-[#103820] border-[#f3ae29] text-white shadow-[0_12px_36px_rgba(45,122,70,0.3)]"
                        : "bg-[#0c2616] border-[#1d442a] text-[#d1e7d8] hover:border-[#389456] hover:bg-[#0f2e1b]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={isSelected ? "text-[#f3ae29]" : "text-[#389456]"}>
                          {item.icon}
                        </div>
                        <h3 className="font-serif-heading text-xl font-bold text-white tracking-tight">{item.title}</h3>
                      </div>
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                        isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#0a2012] text-[#389456] border-[#1d442a]"
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {item.stats.map((stat, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[#d1e7d8] font-normal">
                          <CheckCircle2 size={15} className={`shrink-0 ${isSelected ? "text-[#f3ae29]" : "text-[#389456]"}`} />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Progress Metrics Section ── */}
        <section className="bg-[#0a2012] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <div className="mb-3">
                <span className="annotation-curly">Performance Benchmark</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">Core Success Metrics</h2>
            </div>
            
            <div className="bg-[#0c2616] rounded-2xl border border-[#1d442a] p-6 sm:p-10 space-y-8 shadow-2xl">
              {[
                { label: "Job & Internship Placement (Within 90 Days)", value: 85 },
                { label: "Overall Skills Improvement Index", value: 75 },
                { label: "Fellow Program Satisfaction Score", value: 92 },
                { label: "Fellowship Completion & Certification Rate", value: 88 }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-[#d1e7d8]">{metric.label}</span>
                    <span className="text-xl font-mono font-bold text-[#f3ae29]">{metric.value}%</span>
                  </div>
                  <div className="h-2.5 bg-[#0a2012] rounded-full overflow-hidden border border-[#1d442a]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-[#389456]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/contact">
                <button className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                  <span>Get Involved With Us</span>
                  <ArrowUpRight size={18} className="text-[#f3ae29]" />
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
