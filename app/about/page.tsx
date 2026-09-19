"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const values = [
    {
      icon: <Heart size={28} />,
      title: "Empathy & Compassion",
      desc: "We understand the unique challenges faced by underserved youth and approach every interaction with genuine compassion.",
    },
    {
      icon: <Users size={28} />,
      title: "Community Driven",
      desc: "We build strong, supportive networks where fellows, mentors, and partners can learn from each other and grow together.",
    },
    {
      icon: <Target size={28} />,
      title: "Excellence in Action",
      desc: "We are deeply committed to delivering high-quality, impactful programs that create real, measurable, and sustainable change.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">

        {/* ── Hero / Page Header ── */}
        <section className="bg-[#08170d] pt-6 pb-16 sm:pt-8 sm:pb-20 relative border-b border-[#1a3a24] overflow-hidden">
          {/* Ambient Glow */}
          <div 
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#0ae448]/5 blur-[120px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  &#123; Our Story & Mission &#125;
                </span>
              </div>
              <h1 
                className="mb-6 text-white font-bold leading-[1.05] tracking-tight max-w-4xl"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                Driving Change with{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  HimmatKaar!
                </span>
              </h1>
              <p className="max-w-2xl mb-8 text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal">
                We believe every young person deserves the opportunity to reach their full potential. By bridging the gap between talent and opportunity, we empower tomorrow&apos;s leaders, today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Mission & Vision Cards ── */}
        <section className="bg-[#08170d] py-16 md:py-20 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Target size={32} className="text-[#0ae448]" />,
                  title: 'Our Mission',
                  text: 'To empower underserved youth with the skills, mindset, and confidence needed to succeed in their careers and become transformative leaders in their communities. We provide the tools; they bring the drive.',
                  badge: 'Mission',
                },
                {
                  icon: <Eye size={32} className="text-[#abff84]" />,
                  title: 'Our Vision',
                  text: "A world where every young person has access to quality education, mentorship, and opportunities, enabling them to build meaningful careers, secure their futures, and actively contribute to society's growth.",
                  badge: 'Vision',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 sm:p-10 border border-[#1a3a24] hover:border-[#0ae448]/40 transition-all duration-300 group"
                >
                  <div className="mb-4">
                    <span className="annotation-curly text-xs">
                      &#123; {card.badge} &#125;
                    </span>
                  </div>
                  <div className="mb-4">{card.icon}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#0ae448] transition-colors">{card.title}</h2>
                  <p className="text-base leading-relaxed text-[#8ea896]">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="bg-[#08170d] py-20 md:py-24 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="mb-3">
                <span className="annotation-curly">
                  &#123; Values &#125;
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
                Our Core{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Values!
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal max-w-lg">
                The principles that guide our work and shape our culture.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/40 transition-all duration-300 group"
                >
                  <div className="text-[#0ae448] mb-4 group-hover:scale-110 transition-transform">{v.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#0ae448] transition-colors">{v.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#8ea896]">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Journey — Milestone Cards ── */}
        <section className="bg-[#08170d] py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-14">
              <div className="mb-3">
                <span className="annotation-curly">
                  &#123; Journey & Milestones &#125;
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.08]">
                Our Journey{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  So Far!
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal max-w-xl">
                Building a movement of empowered youth and transformative leaders step-by-step.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Founding Philosophy",
                  desc: "HimmatKaar was founded with a simple, unyielding belief: talent is universal, but opportunity is not.",
                  accent: "#0ae448"
                },
                {
                  step: "02",
                  title: "Breaking Barriers",
                  desc: "We saw ambitious students held back by systemic barriers and lack of access to critical skills and networks.",
                  accent: "#abff84"
                },
                {
                  step: "03",
                  title: "1,000+ Alumni Impact",
                  desc: "Empowered over 1,000 fellows from diverse backgrounds to secure meaningful employment and community leadership.",
                  accent: "#ffffff"
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#0ae448] tracking-widest uppercase">
                        &#123; Phase {milestone.step} &#125;
                      </span>
                      <span className="text-2xl font-bold font-mono text-white/30 group-hover:text-[#0ae448] transition-colors">
                        #{milestone.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#0ae448] transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#8ea896]">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/impact">
                <button className="btn-gsap-cta inline-flex items-center gap-2">
                  See Our Impact <ArrowRight size={16} />
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
