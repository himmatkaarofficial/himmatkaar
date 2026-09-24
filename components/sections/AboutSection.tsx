"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Award, ArrowUpRight, Sparkles, Compass, Lightbulb, HeartHandshake, CheckCircle2 } from "lucide-react";
import { FadeInUp } from "@/components/animations/FadeInUp";

interface AboutSectionProps {
  image: string;
  heading?: string;
  description: string[];
  stats?: Array<{ value: string; label: string }>;
}

const CONCEPTS = [
  {
    id: "youth",
    label: "Youth",
    urdu: "نوجوان",
    icon: <Users size={20} />,
    title: "Youth Transformation",
    tagline: "Unlocking bold potential",
    description: "Empowering university students and ambitious youth across Pakistan with competitive skills, high-level confidence, and strategic networks."
  },
  {
    id: "skills",
    label: "Skills",
    urdu: "مہارتیں",
    icon: <Sparkles size={20} />,
    title: "In-Demand Capabilities",
    tagline: "Corporate & technical mastery",
    description: "Practical training in modern software tooling, corporate readiness, executive communication, and AI enablement for top-tier roles."
  },
  {
    id: "mentorship",
    label: "Mentorship",
    urdu: "رہنمائی",
    icon: <Compass size={20} />,
    title: "1-on-1 Guidance",
    tagline: "Direct industry connections",
    description: "Pairing fellows with seasoned industry mentors, CXOs, and company founders to provide tailored feedback and actionable career guidance."
  },
  {
    id: "community",
    label: "Community",
    urdu: "برادری",
    icon: <HeartHandshake size={20} />,
    title: "Vibrant Ecosystem",
    tagline: "Lifelong collaborative network",
    description: "A collaborative circle of peer innovators, campus leaders, and alumni continuously exchanging knowledge and opportunities."
  },
  {
    id: "ideas",
    label: "Ideas",
    urdu: "نظریات",
    icon: <Lightbulb size={20} />,
    title: "Innovation & Ventures",
    tagline: "Converting thoughts to execution",
    description: "Incubating high-potential youth projects and early-stage startup ideas through our comprehensive 12-week LaunchPad framework."
  },
  {
    id: "change",
    label: "Change",
    urdu: "تبدیلی",
    icon: <Award size={20} />,
    title: "Regional & Social Impact",
    tagline: "Leading meaningful progress",
    description: "Driving socioeconomic development and local talent retention by bridging youth talent with leading multinational employers."
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  image,
  heading = "Faisalabad's Leading Youth Empowerment Platform",
  description,
  stats = [
    { value: "1,000+", label: "Youth Empowered" },
    { value: "50+", label: "Events Hosted" }
  ],
}) => {
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(0);
  const activeConcept = CONCEPTS[activeConceptIndex];

  const pillars = [
    { title: "Mentorship", desc: "Executive 1-on-1 career guidance with seasoned corporate leaders", tag: "Pillar 01" },
    { title: "Skill Building", desc: "Hands-on technical & corporate readiness masterclasses", tag: "Pillar 02" },
    { title: "Community", desc: "Lifelong collaborative changemaker network across Pakistan", tag: "Pillar 03" },
  ];

  return (
    <section id="about" className="bg-[#f8faf7] py-20 sm:py-24 lg:py-28 relative border-t border-[#e2ede4] text-[#07190e]">
      {/* Subtle Light Grid Pattern */}
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
        
        {/* Top Header */}
        <div className="max-w-3xl mb-14">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider">
              • About Himmatkaar
            </span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.1] mb-4">
            Faisalabad&apos;s Leading Youth{" "}
            <span className="text-[#2d7a46] italic">
              Empowerment Platform!
            </span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#3a5342] font-normal">
            Himmatkaar bridges the divide between university classrooms and executive boardrooms through experiential skill-building, corporate mentorship, and live internship placement.
          </p>
        </div>

        {/* Main Grid: Left Image & Stats, Right Pillars & Concept Explorer */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column (5 cols) — Image & Stats Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeInUp>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#d8e6db] bg-white shadow-xl">
                <Image
                  src={image || "/about-hero.jpg"}
                  alt="About Himmatkaar Community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07190e]/70 via-transparent to-transparent" />
                
                {/* Urdu badge */}
                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-lg bg-white/95 border border-[#d8e6db] backdrop-blur-md shadow-md">
                  <span className="font-urdu text-sm text-[#2d7a46] font-bold" dir="rtl">ہمت کار — پاکستان</span>
                </div>
              </div>

              {/* Stats Cards (White surfaces with dark text & gold accents) */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-[#d8e6db] shadow-md hover:border-[#2d7a46] hover:shadow-lg transition-all">
                  <Users size={24} className="text-[#2d7a46] mb-3" />
                  <p className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#07190e] mb-1 tracking-tight">
                    1,000+
                  </p>
                  <p className="text-xs uppercase tracking-wider font-mono text-[#4a6b53] font-semibold">
                    Youth Empowered
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#d8e6db] shadow-md hover:border-[#2d7a46] hover:shadow-lg transition-all">
                  <Award size={24} className="text-[#f3ae29] mb-3" />
                  <p className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#07190e] mb-1 tracking-tight">
                    50+
                  </p>
                  <p className="text-xs uppercase tracking-wider font-mono text-[#4a6b53] font-semibold">
                    Events Hosted
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column (7 cols) — Interactive Click-To-Change-Color Pillars & Concept Explorer */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <FadeInUp delay={0.15}>
              
              {/* Three Interactive Pillar Cards (Click to change color) */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#4a6b53] font-bold mb-3">
                  Core Foundations (Click to Select)
                </p>
                <div className="grid sm:grid-cols-3 gap-3.5 mb-6">
                  {pillars.map((pillar, idx) => {
                    const isSelected = activePillarIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActivePillarIndex(idx)}
                        className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer select-none shadow-sm ${
                          isSelected
                            ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl scale-[1.03]"
                            : "bg-white text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46]/60 hover:bg-[#f0f6f2]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                            isSelected ? "bg-[#2d7a46] text-white" : "bg-[#e8f5ec] text-[#2d7a46]"
                          }`}>
                            {pillar.tag}
                          </span>
                          {isSelected && <CheckCircle2 size={14} className="text-[#f3ae29]" />}
                        </div>
                        <h4 className={`text-sm font-bold tracking-tight mb-1 ${
                          isSelected ? "text-white" : "text-[#07190e]"
                        }`}>
                          {pillar.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${
                          isSelected ? "text-[#a3caad]" : "text-[#4a6b53]"
                        }`}>
                          {pillar.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Concept Explorer Container (White Card with Dark Preview) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#d8e6db] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#f3ae29]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#2d7a46] font-bold">
                      Interactive Concept Explorer
                    </span>
                  </div>
                  <span className="font-urdu text-sm text-[#2d7a46] font-semibold" dir="rtl">
                    ہمت کار
                  </span>
                </div>

                {/* Concept Selector Buttons (Click to change color and preview) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {CONCEPTS.map((concept, index) => {
                    const isActive = activeConceptIndex === index;
                    return (
                      <button
                        key={concept.id}
                        onClick={() => setActiveConceptIndex(index)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#0c2616] text-white border border-[#2d7a46] shadow-md scale-[1.02]"
                            : "bg-[#f2f8f4] text-[#2d7a46] border border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#e8f5ec]"
                        }`}
                      >
                        {concept.label}
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Concept Preview Card (Dark Forest Green with gold & sage accents) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeConcept.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#0c2616] rounded-xl p-5 sm:p-6 border border-[#1d442a] text-white shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-[#f3ae29]">
                          {activeConcept.icon}
                          <h4 className="font-serif-heading text-lg font-bold text-white tracking-tight">
                            {activeConcept.title}
                          </h4>
                        </div>
                        <p className="text-xs font-mono text-[#a3caad]">
                          {activeConcept.tagline}
                        </p>
                      </div>
                      <span className="font-urdu text-2xl text-[#f3ae29]/30 select-none" dir="rtl">
                        {activeConcept.urdu}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-[#d1e7d8]">
                      {activeConcept.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom CTA */}
                <div className="mt-6 pt-5 border-t border-[#e2ede4] flex items-center justify-between">
                  <span className="text-xs text-[#4a6b53]">
                    Ready to build your leadership trajectory?
                  </span>
                  <Link
                    href="/about"
                    className="btn-gsap-cta !bg-[#2d7a46] !py-2 !px-4 !text-xs !rounded-xl inline-flex items-center gap-1.5"
                  >
                    <span>Read Full Story</span>
                    <ArrowUpRight size={14} className="text-[#f3ae29]" />
                  </Link>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
};


