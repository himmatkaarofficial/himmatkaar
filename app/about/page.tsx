"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, ArrowUpRight, CheckCircle2, Award, Sparkles, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  const values = [
    {
      id: "empathy",
      icon: <Heart size={28} />,
      title: "Empathy & Compassion",
      desc: "We understand the unique challenges faced by underserved youth and approach every interaction with genuine compassion and respect.",
      tag: "Value 01",
    },
    {
      id: "community",
      icon: <Users size={28} />,
      title: "Community Driven",
      desc: "We build strong, supportive networks where fellows, mentors, and corporate partners learn from each other and grow together.",
      tag: "Value 02",
    },
    {
      id: "excellence",
      icon: <Target size={28} />,
      title: "Excellence in Action",
      desc: "We are deeply committed to delivering high-quality, impactful programs that create real, measurable, and sustainable career transformation.",
      tag: "Value 03",
    },
  ];

  const milestones = [
    {
      step: "01",
      title: "Founding Philosophy",
      tagline: "Bridging the talent gap",
      desc: "HimmatKaar was founded in Faisalabad with a simple, unyielding belief: talent is universal, but opportunity is not. We set out to change the narrative for youth.",
    },
    {
      step: "02",
      title: "Breaking Barriers",
      tagline: "Skills & Mentorship",
      desc: "We saw ambitious students held back by lack of practical corporate skills and industry networks. We built a flagship 12-week fellowship model.",
    },
    {
      step: "03",
      title: "1,000+ Alumni Impact",
      tagline: "National Movement",
      desc: "Empowered over 1,000 fellows from diverse educational backgrounds to secure meaningful corporate careers and community leadership in Faisalabad.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">

        {/* ── 1. Hero / Page Header (Dark Forest Green with Urdu Watermark) ── */}
        <section className="bg-[#0a2012] pt-16 pb-20 sm:pt-20 sm:pb-24 relative border-b border-[#1d442a] overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  Our Story & Mission
                </span>
              </div>
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.08] max-w-4xl">
                Driving Youth Change with{" "}
                <span className="text-[#389456] italic">
                  HimmatKaar!
                </span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#a3caad] font-normal">
                We believe every young person deserves the opportunity to reach their full potential. By bridging the divide between university classrooms and corporate boardrooms, we empower tomorrow&apos;s transformative leaders.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 2. Mission & Vision Cards (Crisp White / Light Section) ── */}
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
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                • Purpose & Direction
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08]">
                Our Mission &{" "}
                <span className="text-[#2d7a46] italic">
                  Vision!
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Target size={32} className="text-[#2d7a46]" />,
                  title: 'Our Mission',
                  text: 'To empower underserved youth with the corporate skills, entrepreneurial mindset, and confidence needed to succeed in competitive careers and become transformative leaders in their communities. We provide the tools; they bring the drive.',
                  badge: 'Mission Statement',
                },
                {
                  icon: <Eye size={32} className="text-[#2d7a46]" />,
                  title: 'Our Vision',
                  text: "An ecosystem where every ambitious student in Faisalabad has direct access to high-caliber mentorship, corporate networking, and live internship opportunities—enabling them to build meaningful careers and secure their socio-economic futures.",
                  badge: 'Long-term Vision',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-[#f8faf7] rounded-2xl p-8 sm:p-10 border border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f2f8f4] transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] border border-[#a3caad]">
                      {card.badge}
                    </span>
                  </div>
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#07190e] mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#3a5342]">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Core Values with Interactive Click-to-Change-Color (Dark Forest Section) ── */}
        <section className="bg-[#0a2012] py-20 md:py-28 border-b border-[#1d442a] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-14 max-w-3xl">
              <div className="mb-3">
                <span className="annotation-curly">
                  Foundational Principles
                </span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
                Our Core{" "}
                <span className="text-[#389456] italic">
                  Values!
                </span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#a3caad] font-normal">
                Click any value card below to highlight our guiding principles in action.
              </p>
            </div>

            {/* 3 Interactive Cards (Click to change color) */}
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v, i) => {
                const isSelected = activeValueIndex === i;
                return (
                  <motion.div
                    key={v.id}
                    onClick={() => setActiveValueIndex(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-8 border transition-all duration-300 cursor-pointer select-none shadow-xl flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#103820] border-[#f3ae29] text-white shadow-[0_12px_36px_rgba(45,122,70,0.35)] scale-[1.02]"
                        : "bg-[#0c2616] border-[#1d442a] text-[#d1e7d8] hover:border-[#389456] hover:bg-[#0f2e1b]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#0a2012] text-[#389456] border-[#1d442a]"
                        }`}>
                          {v.tag}
                        </span>
                        {isSelected && <CheckCircle2 size={16} className="text-[#f3ae29]" />}
                      </div>

                      <div className={`mb-4 ${isSelected ? "text-[#f3ae29]" : "text-[#389456]"}`}>
                        {v.icon}
                      </div>

                      <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                        {v.title}
                      </h3>

                      <p className={`text-sm sm:text-base leading-relaxed ${isSelected ? "text-[#d1e7d8]" : "text-[#a3caad]"}`}>
                        {v.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#1d442a] text-xs font-mono">
                      <span className={isSelected ? "text-[#f3ae29] font-bold" : "text-[#a3caad]/70"}>
                        {isSelected ? "✓ Active Value Principle" : "Click to select"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Our Journey — Milestone Cards (Crisp White Canvas with Interactive Selection) ── */}
        <section className="bg-white py-20 md:py-28 border-b border-[#e2ede4] text-[#07190e] relative">
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
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider">
                  • Journey & Milestones
                </span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] mb-3 tracking-tight leading-[1.08]">
                Our Journey{" "}
                <span className="text-[#2d7a46] italic">
                  So Far!
                </span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#3a5342] font-normal">
                Building a movement of empowered youth and transformative leaders step-by-step. Click any phase to explore.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {milestones.map((milestone, idx) => {
                const isSelected = activeMilestoneIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-2xl p-8 border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none shadow-md ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                        : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
                        }`}>
                          Phase {milestone.step}
                        </span>
                        <span className={`text-2xl font-bold font-mono ${
                          isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]/40"
                        }`}>
                          #{milestone.step}
                        </span>
                      </div>
                      <h3 className={`font-serif-heading text-xl sm:text-2xl font-bold mb-1 tracking-tight ${
                        isSelected ? "text-white" : "text-[#07190e]"
                      }`}>
                        {milestone.title}
                      </h3>
                      <p className={`text-xs font-mono mb-4 ${
                        isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"
                      }`}>
                        {milestone.tagline}
                      </p>
                      <p className={`text-sm sm:text-base leading-relaxed ${
                        isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                      }`}>
                        {milestone.desc}
                      </p>
                    </div>

                    <div className={`pt-4 mt-6 border-t text-xs font-mono ${
                      isSelected ? "border-[#1d442a] text-[#f3ae29]" : "border-[#e2ede4] text-[#4a6b53]"
                    }`}>
                      <span>{isSelected ? "✓ Active Selected Milestone" : "Click to select"}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-14 text-center">
              <Link href="/impact">
                <button className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                  <span>See Our Full Impact</span>
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

