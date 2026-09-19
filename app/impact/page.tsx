"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Briefcase, GraduationCap, Globe, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Impact() {
  return (
    <div className="min-h-screen bg-[#08170d] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="glow-green-orb w-[450px] h-[450px] -top-20 right-10 opacity-20" />

      <Navbar />

      <main className="pt-20 flex-grow">

        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center border-b border-[#1a3a24]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="annotation-curly inline-flex items-center gap-2">
                  &#123; Real Numbers, Real Change &#125;
                </span>
              </motion.div>
              <motion.h1 
                variants={fadeInUp} 
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]"
              >
                Measuring Our{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Impact!
                </span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp} 
                className="text-base sm:text-lg lg:text-xl text-[#8ea896] max-w-2xl mx-auto leading-relaxed font-normal mb-8"
              >
                At HimmatKaar, we believe data tells a story. Our impact isn&apos;t just measured in numbers, but in the lives transformed, careers launched, and communities uplifted.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Stats - Green & White Cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-20 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Users className="w-8 h-8 text-[#0ae448]" />, number: "1,000+", label: "Fellows Empowered", desc: "Students from diverse backgrounds transformed.", tag: "Reach" },
                { icon: <TrendingUp className="w-8 h-8 text-[#abff84]" />, number: "85%", label: "Career Success Rate", desc: "Secured meaningful employment within 3 months.", tag: "Employment" },
                { icon: <Award className="w-8 h-8 text-[#0ae448]" />, number: "75%", label: "Skills Improvement", desc: "Average growth in professional competencies.", tag: "Growth" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="p-3 rounded-lg bg-[#08170d] border border-[#1a3a24]">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-mono text-[#0ae448] tracking-widest uppercase">
                        &#123; {stat.tag} &#125;
                      </span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-[#0ae448] transition-colors">
                      {stat.number}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{stat.label}</h3>
                    <p className="text-xs sm:text-sm text-[#8ea896] leading-relaxed font-normal">{stat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Impact Breakdown Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <span className="annotation-curly mb-3 inline-block">&#123; The Ripple Effect &#125;</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                Tangible Widespread{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Change!
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#8ea896]">How our rigorous programs translate into lasting outcomes.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: <Briefcase className="w-6 h-6 text-[#0ae448]" />, 
                  title: "Career & Economic Mobility", 
                  stats: ["85% employment rate within 3 months", "60% average salary increase post-program", "200+ partner companies hired our fellows"],
                  tag: "Mobility"
                },
                { 
                  icon: <GraduationCap className="w-6 h-6 text-[#abff84]" />, 
                  title: "Holistic Skills Development", 
                  stats: ["72% improvement in proactive initiative", "81% boost in interviewing competence", "60% aggregate improvement in confidence"],
                  tag: "Skills"
                },
                { 
                  icon: <Globe className="w-6 h-6 text-[#0ae448]" />, 
                  title: "National Geographic Reach", 
                  stats: ["Students from 125+ universities", "Representing 170+ towns and villages", "Active in all 4 provincial regions"],
                  tag: "Reach"
                },
                { 
                  icon: <Users className="w-6 h-6 text-[#abff84]" />, 
                  title: "Community & Society Impact", 
                  stats: ["5,000+ indirect community beneficiaries", "1,700+ social impact projects initiated", "Robust, self-sustaining alumni network"],
                  tag: "Community"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-[#08170d] border border-[#1a3a24]">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#0ae448] transition-colors">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono text-[#0ae448] tracking-widest uppercase">&#123; {item.tag} &#125;</span>
                  </div>
                  <ul className="space-y-3">
                    {item.stats.map((stat, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#8ea896] font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0ae448] shrink-0"></span>
                        <span>{stat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Metrics Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="annotation-curly mb-3 inline-block">&#123; Performance Benchmark &#125;</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Core Success Metrics</h2>
            </div>
            
            <div className="bg-[#0e2417] rounded-xl border border-[#1a3a24] p-6 sm:p-10 space-y-8">
              {[
                { label: "Job Placement Rate (Within 90 Days)", value: 85 },
                { label: "Overall Skills Improvement Index", value: 75 },
                { label: "Fellow Program Satisfaction", value: 92 },
                { label: "Fellowship Completion Rate", value: 88 }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs sm:text-sm font-medium text-[#8ea896]">{metric.label}</span>
                    <span className="text-xl font-mono font-bold text-[#0ae448]">{metric.value}%</span>
                  </div>
                  <div className="h-2.5 bg-[#08170d] rounded-full overflow-hidden border border-[#1a3a24]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-[#0ae448]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact" className="btn-gsap-cta inline-flex items-center gap-2">
                Get Involved <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}



