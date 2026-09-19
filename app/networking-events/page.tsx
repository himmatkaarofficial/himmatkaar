"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Handshake, Users, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: <Handshake size={28} />, title: "Mentor Access", desc: "Connect directly with experienced mentors and advisors.", color: 'var(--color-field-deep)' },
  { icon: <Users size={28} />, title: "Peer Community", desc: "Collaborate with ambitious youth from diverse backgrounds.", color: 'var(--color-field-forest)' },
  { icon: <Globe size={28} />, title: "Growth Opportunities", desc: "Unlock partnerships, internships, and new opportunities.", color: 'var(--color-field-olive)' },
];

export default function NetworkingEventsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Header ── */}
        <section className="bg-[#08170d] pt-6 pb-16 sm:pt-8 sm:pb-20 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-[#0ae448] hover:text-white transition-colors uppercase">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">&#123; Networking Initiative &#125;</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight max-w-2xl">
                Networking{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Events!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#8ea896] leading-relaxed max-w-2xl font-normal">
                Build meaningful relationships with mentors, peers, and professionals through curated networking opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Feature Cards Grid ── */}
        <section className="bg-[#08170d] py-16 sm:py-20 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-[#08170d] border border-[#1a3a24] text-[#0ae448] group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest">&#123; Feature 0{idx + 1} &#125;</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0ae448] transition-colors">{item.title}</h3>
                    <p className="text-sm text-[#8ea896] leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#08170d] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-[#0e2417] rounded-2xl p-8 sm:p-12 border border-[#1a3a24]">
              <span className="annotation-curly mb-3 inline-block">&#123; Upcoming Sessions &#125;</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Join the Next Networking Event</h2>
              <p className="text-sm sm:text-base text-[#8ea896] mb-8 max-w-xl font-normal">
                Check upcoming sessions and connect with the Himmatkaar community.
              </p>
              <Link href="/events/upcoming">
                <button className="btn-gsap-cta inline-flex items-center gap-2">View Upcoming Events <ArrowRight size={14} /></button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
