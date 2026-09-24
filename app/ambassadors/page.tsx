"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, MapPin, Loader2, ArrowRight, Sparkles, CheckCircle2, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCardImage from "@/components/TeamCardImage";

interface Ambassador {
  id: string;
  name: string;
  role: string;
  city: string;
  bio: string;
  image: string;
  linkedin: string;
}

const DEFAULT_AMBASSADORS: Ambassador[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    role: "Campus Ambassador",
    city: "Lahore",
    bio: "Representing Himmatkaar at UET Lahore and driving student engagement initiatives across STEM departments.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    id: "2",
    name: "Hamza Ali",
    role: "Campus Ambassador",
    city: "Islamabad",
    bio: "Building tech community connections and hosting peer learning workshops at FAST Islamabad.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Fatima Zahra",
    role: "Campus Ambassador",
    city: "Faisalabad",
    bio: "Leading youth awareness drives and workshop registrations at COMSATS Faisalabad.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Bilal Ahmed",
    role: "Campus Ambassador",
    city: "Karachi",
    bio: "Fostering entrepreneurial networks and organizing campus discovery bootcamps at NED University Karachi.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
];

export default function Ambassadors() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmbassadorId, setSelectedAmbassadorId] = useState<string>("1");

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const response = await fetch('/api/ambassadors');
        const data = await response.json();
        const fetched = data.ambassadors && data.ambassadors.length > 0 ? data.ambassadors : DEFAULT_AMBASSADORS;
        setAmbassadors(fetched);
      } catch (error) {
        console.error('Error fetching ambassadors, using default:', error);
        setAmbassadors(DEFAULT_AMBASSADORS);
      } finally {
        setLoading(false);
      }
    };
    fetchAmbassadors();
  }, []);

  const displayAmbassadors = ambassadors.length > 0 ? ambassadors : DEFAULT_AMBASSADORS;
  const selectedAmbassador = displayAmbassadors.find((a) => a.id === selectedAmbassadorId) || displayAmbassadors[0];

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── Page Header ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#1d442a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link 
              href="/team" 
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#07190e]/80 border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="text-[#389456]" /> Back to Team Overview
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
                <GraduationCap size={14} className="text-[#f3ae29]" />
                <span>Nationwide Student Network</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] max-w-3xl">
                Campus Ambassadors{" "}
                <span className="text-[#389456]">
                  Network
                </span>
                <span className="font-urdu block text-2xl sm:text-3xl lg:text-4xl text-[#f3ae29] font-normal mt-2">
                  ہمت کار سفیر
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#d1e7d8] max-w-2xl font-normal leading-relaxed">
                Meet our passionate student leaders representing Himmatkaar across Pakistan&apos;s leading universities, running local events, and connecting peers with industry opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CRISP WHITE SECTION: Interactive Ambassador Grid ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <Sparkles size={14} className="text-[#2d7a46]" /> Interactive Ambassadors Directory
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0c2616] tracking-tight">
                  University Representatives
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Click any ambassador card to highlight their profile and see their campus mission.
                </p>
              </div>

              {selectedAmbassador && (
                <div className="p-3 px-4 rounded-xl bg-white border border-[#2d7a46]/30 shadow-sm flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2d7a46] animate-pulse" />
                  <span className="text-xs font-medium text-slate-700">
                    Selected: <strong className="text-[#0c2616]">{selectedAmbassador.name} ({selectedAmbassador.city})</strong>
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#2d7a46]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayAmbassadors.map((ambassador, idx) => {
                  const isSelected = selectedAmbassadorId === ambassador.id;
                  return (
                    <motion.div
                      key={ambassador.id || idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => setSelectedAmbassadorId(ambassador.id)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between group ${
                        isSelected
                          ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl ring-2 ring-[#2d7a46]/40 scale-[1.02]"
                          : "bg-white text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="rounded-xl overflow-hidden relative h-52 w-full border border-black/5 mb-4">
                          <TeamCardImage
                            src={ambassador.image}
                            alt={ambassador.name}
                            name={ambassador.name}
                            sizes="300px"
                          />
                          {/* City tag */}
                          <span className={`absolute top-3 left-3 font-mono text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 uppercase font-semibold shadow-sm ${
                            isSelected 
                              ? "bg-[#07190e]/95 text-[#f3ae29] border border-[#1d442a]"
                              : "bg-white/95 text-[#2d7a46] border border-[#e2ede4]"
                          }`}>
                            <MapPin size={11} className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"} /> {ambassador.city}
                          </span>

                          {isSelected && (
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[#2d7a46] text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-md">
                              <CheckCircle2 size={12} />
                            </div>
                          )}
                        </div>

                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <h3 className={`font-serif-heading text-lg font-bold transition-colors ${
                              isSelected ? "text-white" : "text-[#0c2616] group-hover:text-[#2d7a46]"
                            }`}>
                              {ambassador.name}
                            </h3>
                            <p className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                              isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"
                            }`}>
                              {ambassador.role}
                            </p>
                          </div>

                          {ambassador.linkedin && (
                            <a
                              href={ambassador.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`p-2 rounded-lg border transition-colors ${
                                isSelected 
                                  ? "bg-[#163e24] border-[#2d7a46] text-[#f3ae29] hover:bg-[#2d7a46] hover:text-white"
                                  : "bg-[#f8faf7] border-[#e2ede4] text-[#2d7a46] hover:bg-[#e8f5ec]"
                              }`}
                              aria-label={`${ambassador.name} LinkedIn`}
                            >
                              <Linkedin size={13} />
                            </a>
                          )}
                        </div>

                        <p className={`text-xs leading-relaxed mt-2 ${
                          isSelected ? "text-[#d1e7d8]" : "text-slate-600"
                        }`}>
                          {ambassador.bio}
                        </p>
                      </div>

                      <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                        isSelected ? "border-[#1d442a] text-[#a3caad]" : "border-slate-100 text-slate-500"
                      }`}>
                        <span>Campus Lead</span>
                        <span className={isSelected ? "text-[#f3ae29] font-bold" : "text-[#2d7a46]"}>
                          {isSelected ? "Selected" : "Click to select"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Become Ambassador CTA ── */}
        <section className="bg-[#0c2616] py-20 border-t border-[#1d442a]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0a2012] to-[#07190e] rounded-3xl p-8 sm:p-12 border border-[#1d442a] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c2616] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-wider mb-4">
                  Campus Leadership 2026
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                  Become a Campus Ambassador
                </h2>
                <p className="text-base text-[#d1e7d8] leading-relaxed font-normal">
                  Lead student drives, organize exclusive HimmatKaar networking sessions at your university, and earn executive mentorship and certificates.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2d7a46] text-white font-bold hover:bg-[#389456] transition-colors text-base shadow-lg"
                >
                  Apply to Represent <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
