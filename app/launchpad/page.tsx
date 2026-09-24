"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Award,
  CheckCircle2,
  Rocket,
  Target,
  TrendingUp,
  Lightbulb,
  Network,
  DollarSign,
  ArrowUpRight,
  Search,
  Sparkles,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Loader2,
  Linkedin
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextCohortModal from "@/components/NextCohortModal";

// ── Types ──────────────────────────────────────────────────────────────────
export interface DbSession {
  id: string;
  session_number: number;
  title: string;
  category: string;
  date: string;
  time: string;
  cohort: string;
  status: string;
  mentor_name: string;
  mentor_role: string;
  mentor_photo_url: string;
  mentor_bio: string;
  mentor_linkedin?: string;
  summary: string;
  key_takeaways: string[];
  session_photos: { url: string; caption: string }[];
}

// ── Session Detail Modal ──────────────────────────────────────────────────
function SessionModal({ session, onClose }: { session: DbSession; onClose: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") selectedPhoto ? setSelectedPhoto(null) : onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedPhoto, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        <motion.div
          className="relative z-10 w-full max-w-3xl bg-[#0c2616] border border-[#1d442a] rounded-2xl shadow-2xl overflow-hidden text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-[#1d442a]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#10321e] text-[#389456] border border-[#1d442a]">
                Session {session.session_number} · {session.cohort}
              </span>
              <button
                onClick={onClose}
                className="p-2 text-[#a3caad] hover:text-white hover:bg-[#10321e] rounded-xl transition-all font-mono text-sm"
              >
                ✕ Close
              </button>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-2">{session.title}</h2>
            <div className="flex flex-wrap gap-3 text-xs text-[#a3caad] font-mono">
              <span className="flex items-center gap-1"><Calendar size={13} className="text-[#389456]" /> {session.date}</span>
              <span className="flex items-center gap-1"><Clock size={13} className="text-[#389456]" /> {session.time}</span>
              <span className="px-2 py-0.5 bg-[#2d7a46]/20 border border-[#389456]/40 text-[#d1e7d8] rounded-md font-semibold">
                {session.status}
              </span>
            </div>
          </div>

          {/* Mentor */}
          <div className="p-6 sm:p-8 border-b border-[#1d442a]">
            <div className="flex items-start gap-4">
              {session.mentor_photo_url && (
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#2d7a46] shrink-0">
                  <Image src={session.mentor_photo_url} alt={session.mentor_name} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-white text-lg">{session.mentor_name}</p>
                  {session.mentor_linkedin && (
                    <a
                      href={session.mentor_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-[#70b5f9] border border-[#0a66c2]/40 rounded-xl text-xs font-semibold transition-all shrink-0"
                    >
                      <Linkedin size={14} /> LinkedIn Profile
                    </a>
                  )}
                </div>
                <p className="text-xs font-mono text-[#389456] uppercase tracking-wider mb-2 font-semibold">
                  {session.mentor_role}
                </p>
                {session.mentor_bio && (
                  <p className="text-xs sm:text-sm text-[#d1e7d8] leading-relaxed">{session.mentor_bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          {session.summary && (
            <div className="p-6 sm:p-8 border-b border-[#1d442a]">
              <p className="text-xs font-mono text-[#f3ae29] uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                <Sparkles size={14} /> Session Summary
              </p>
              <p className="text-sm text-[#d1e7d8] leading-relaxed">{session.summary}</p>
            </div>
          )}

          {/* Key Takeaways */}
          {session.key_takeaways?.length > 0 && (
            <div className="p-6 sm:p-8 border-b border-[#1d442a]">
              <p className="text-xs font-mono text-[#389456] uppercase tracking-widest mb-4 flex items-center gap-2 font-bold">
                <BookOpen size={14} /> Key Takeaways
              </p>
              <ul className="space-y-3">
                {session.key_takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#d1e7d8]">
                    <CheckCircle2 size={16} className="text-[#389456] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Photos */}
          {session.session_photos?.length > 0 && (
            <div className="p-6 sm:p-8">
              <p className="text-xs font-mono text-[#a3caad] uppercase tracking-widest mb-4 font-bold">
                Session Photos
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {session.session_photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative aspect-video rounded-xl overflow-hidden border border-[#1d442a] hover:border-[#389456] transition-all group"
                  >
                    <Image src={photo.url} alt={photo.caption || `Photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {selectedPhoto && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#1d442a]">
              <Image src={selectedPhoto.url} alt={selectedPhoto.caption} fill className="object-contain" />
            </div>
            {selectedPhoto.caption && (
              <p className="text-center text-sm text-[#d1e7d8] mt-3 font-mono">{selectedPhoto.caption}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Hero Images ────────────────────────────────────────────────────────────
const LAUNCHPAD_HERO_IMAGES = [
  "/launchpad-slides/launchpad-slide-1-v2.jpg",
  "/launchpad-slides/launchpad-slide-2.jpg",
  "/launchpad-slides/launchpad-slide-3.jpg",
  "/launchpad-slides/launchpad-slide-4.png",
  "/launchpad-slides/launchpad-slide-5.jpg",
];

// ── Main Content ───────────────────────────────────────────────────────────
function LaunchpadContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab = searchParams.get("tab") === "cohort-1" ? "cohort1" : "format";
  const [activeTab, setActiveTab] = useState<"format" | "cohort1">(initialTab);

  const [sessions, setSessions] = useState<DbSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<DbSession | null>(null);

  const [isNextCohortModalOpen, setIsNextCohortModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeObjectiveIndex, setActiveObjectiveIndex] = useState<number>(0);

  // Fetch sessions from Supabase via API
  useEffect(() => {
    async function fetchSessions() {
      setSessionsLoading(true);
      try {
        const res = await fetch("/api/launchpad?cohort=Cohort%201", { cache: "no-store" });
        const data = await res.json();
        setSessions(data.sessions || []);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setSessionsLoading(false);
      }
    }
    fetchSessions();
  }, []);

  // Hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LAUNCHPAD_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % LAUNCHPAD_HERO_IMAGES.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + LAUNCHPAD_HERO_IMAGES.length) % LAUNCHPAD_HERO_IMAGES.length);

  // Sync tab with URL
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "cohort-1" && activeTab !== "cohort1") setActiveTab("cohort1");
    else if (tabParam === "format" && activeTab !== "format") setActiveTab("format");
  }, [searchParams]);

  const handleTabSwitch = (tab: "format" | "cohort1") => {
    setActiveTab(tab);
    const paramVal = tab === "cohort1" ? "cohort-1" : "format";
    router.push(`/launchpad?tab=${paramVal}`, { scroll: false });
    setTimeout(() => {
      const tabBar = document.getElementById("launchpad-tabs");
      if (tabBar) tabBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const categories = ["All", ...Array.from(new Set(sessions.map((s) => s.category)))];

  const filteredSessions = sessions.filter((session) => {
    const matchesCategory = selectedCategory === "All" || session.category === selectedCategory;
    const matchesQuery =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      {/* ── 1. Hero Section (Carousel with Serif Headline & Urdu Accents) ── */}
      <section className="relative text-white flex items-center overflow-hidden pt-20 pb-16 sm:py-24">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={LAUNCHPAD_HERO_IMAGES[currentImageIndex]}
              alt={`Himmatkaar LaunchPad Slide ${currentImageIndex + 1}`}
              fill
              priority={currentImageIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Refined Image Overlays for Crisp Photo Visibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0c2616]/85 via-[#0c2616]/55 to-[#0c2616]/25" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c2616]/95 via-transparent to-black/20" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
            <span className="annotation-curly">
              6-Week Training + 6-Week Industry Internship
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05] max-w-4xl"
          >
            Himmatkaar{" "}
            <span className="text-[#389456] italic">
              LaunchPad!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-base sm:text-lg lg:text-xl max-w-2xl mb-8 text-[#a3caad] leading-relaxed font-normal"
          >
            Transform from university student to industry professional in 12 weeks. Intensive training, personalized 1-on-1 mentorship, and guaranteed industry internship placement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <button
              onClick={() => setIsNextCohortModalOpen(true)}
              className="btn-gsap-cta flex items-center gap-2 !rounded-xl !py-3.5 !px-7"
            >
              <span>Apply for Next Cohort</span>
              <ArrowUpRight size={18} className="text-[#f3ae29]" />
            </button>
            <button
              onClick={() => handleTabSwitch(activeTab === "format" ? "cohort1" : "format")}
              className="btn-gsap-ghost !rounded-xl !py-3.5 !px-6"
            >
              {activeTab === "format" ? "View Cohort 1 Archive" : "View Program Format"}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-6 mt-10 text-xs font-mono font-bold uppercase tracking-wider text-[#a3caad]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#f3ae29]" />
              Free for Eligible Students
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#389456]" />
              Real Industry Internship
            </span>
          </motion.div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl bg-[#0c2616]/60 border border-[#1d442a] hover:border-[#389456] transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl bg-[#0c2616]/60 border border-[#1d442a] hover:border-[#389456] transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {LAUNCHPAD_HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="h-1.5 rounded-md transition-all duration-300"
              style={{
                width: index === currentImageIndex ? "28px" : "8px",
                background: index === currentImageIndex ? "#f3ae29" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── 2. Tab Bar (Soft Rounded-2XL Segmented Control, No Pills) ── */}
      <section id="launchpad-tabs" className="sticky top-20 z-30 py-4 px-4 sm:px-6 bg-[#0a2012]/95 backdrop-blur-xl border-y border-[#1d442a]">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#0c2616] p-1.5 rounded-2xl border border-[#1d442a] shadow-xl flex items-center gap-2">
            <button
              onClick={() => handleTabSwitch("format")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "format"
                  ? "bg-[#2d7a46] text-white font-bold shadow-md border border-[#389456]"
                  : "text-[#a3caad] hover:text-white hover:bg-[#10321e]"
              }`}
            >
              <Rocket size={16} className={activeTab === "format" ? "text-[#f3ae29]" : "text-[#389456]"} />
              <span>LaunchPad Format</span>
            </button>
            <button
              onClick={() => handleTabSwitch("cohort1")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "cohort1"
                  ? "bg-[#2d7a46] text-white font-bold shadow-md border border-[#389456]"
                  : "text-[#a3caad] hover:text-white hover:bg-[#10321e]"
              }`}
            >
              <GraduationCap size={16} className={activeTab === "cohort1" ? "text-[#f3ae29]" : "text-[#389456]"} />
              <span>Cohort 1 Archive</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Main Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === "format" ? (
          <motion.div key="tab-format" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
            
            {/* Quick Stats (Dark Forest Green) */}
            <section className="bg-[#0a2012] py-14 sm:py-16 border-b border-[#1d442a] relative">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { icon: <Calendar size={24} />, title: "Duration", desc: "12 Weeks (6+6)", tag: "Timeline" },
                    { icon: <Clock size={24} />, title: "Format", desc: "Mon/Thu + Mentorship", tag: "Schedule" },
                    { icon: <Users size={24} />, title: "Cohort Size", desc: "25 Students per Cohort", tag: "Capacity" },
                    { icon: <Award size={24} />, title: "Mode", desc: "Hybrid (In-person + Online)", tag: "Delivery" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="bg-[#0c2616] rounded-2xl p-6 border border-[#1d442a] hover:border-[#389456] transition-all duration-300 shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-[#389456]">{item.icon}</div>
                          <span className="text-[10px] font-mono text-[#f3ae29] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#0a2012] border border-[#1d442a]">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-serif-heading text-xl font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#a3caad] font-mono">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Program Objectives (Crisp White / Light Section with Interactive Cards) */}
            <section className="bg-white py-20 sm:py-24 border-b border-[#e2ede4] text-[#07190e] relative">
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
                    • Program Objectives
                  </span>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] mb-4 tracking-tight leading-[1.08]">
                    What You&apos;ll{" "}
                    <span className="text-[#2d7a46] italic">Achieve!</span>
                  </h2>
                  <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed">
                    Transform into an industry-ready professional through 6 weeks of intensive training and 6 weeks of hands-on industry experience. Click any card to highlight deliverables.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: <Target size={28} />, title: "Career Purpose & Growth Path", desc: "Identify your career purpose and personal growth trajectory with clarity, confidence, and structured roadmap.", tag: "Goal Setting" },
                    { icon: <DollarSign size={28} />, title: "Job-Ready Documents", desc: "Develop executive documents including CV, LinkedIn profile, and digital portfolio that command attention from recruiters.", tag: "Branding" },
                    { icon: <Network size={28} />, title: "Interview & Communication", desc: "Master interview frameworks, public speaking, and executive correspondence for corporate boardrooms.", tag: "Soft Skills" },
                    { icon: <Lightbulb size={28} />, title: "Professional Networks", desc: "Build and leverage high-level industry relationships with mentors, founders, and peers across Pakistan.", tag: "Networking" },
                    { icon: <TrendingUp size={28} />, title: "Essential Soft Skills", desc: "Understand sales mindset, active listening, teamwork, and modern workplace adaptability.", tag: "Mindset" },
                    { icon: <Rocket size={28} />, title: "AI & Automation Tools", desc: "Apply cutting-edge AI, prompting, and automation tools for maximum productivity and competitive edge.", tag: "Technology" }
                  ].map((benefit, index) => {
                    const isSelected = activeObjectiveIndex === index;
                    return (
                      <motion.div
                        key={index}
                        onClick={() => setActiveObjectiveIndex(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 cursor-pointer select-none shadow-md flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                            : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}>
                              {benefit.icon}
                            </div>
                            <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                              isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#e8f5ec] text-[#2d7a46] border-[#a3caad]"
                            }`}>
                              {benefit.tag}
                            </span>
                          </div>
                          <h3 className={`font-serif-heading text-xl font-bold mb-2 tracking-tight ${
                            isSelected ? "text-white" : "text-[#07190e]"
                          }`}>
                            {benefit.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${
                            isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                          }`}>
                            {benefit.desc}
                          </p>
                        </div>

                        <div className={`pt-4 mt-5 border-t text-xs font-mono flex items-center justify-between ${
                          isSelected ? "border-[#1d442a] text-[#f3ae29]" : "border-[#e2ede4] text-[#4a6b53]"
                        }`}>
                          <span>{isSelected ? "✓ Active Objective" : "Click to select"}</span>
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

            {/* 12-Week Journey (Dark Forest Section) */}
            <section className="bg-[#0a2012] py-20 sm:py-24 border-b border-[#1d442a] relative">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14 max-w-3xl">
                  <div className="mb-3">
                    <span className="annotation-curly">
                      Structured Roadmap
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
                    Your 12-Week{" "}
                    <span className="text-[#389456] italic">Journey!</span>
                  </h2>
                  <p className="text-base sm:text-lg text-[#a3caad] font-normal leading-relaxed">
                    A structured two-phase program taking you from classroom to corporate executive.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Phase 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0c2616] rounded-2xl p-8 sm:p-10 border border-[#1d442a] hover:border-[#389456] transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-category-green !text-xs !rounded-md">
                        Phase 1 · Weeks 1–6
                      </span>
                      <BookOpen size={20} className="text-[#389456]" />
                    </div>
                    <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-3">Intensive Training</h3>
                    <p className="text-sm text-[#a3caad] leading-relaxed mb-6 font-normal">Six weeks of structured skill-building sessions held bi-weekly, combined with personalized one-on-one mentorship.</p>
                    <ul className="space-y-3 text-sm text-[#d1e7d8]">
                      {["Bi-weekly interactive group sessions (Mon & Thu)", "Weekly one-on-one mentorship with industry executives", "Hands-on commercial deliverables every single week", "Peer accountability groups and cohort team drills"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-[#389456] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Phase 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0c2616] rounded-2xl p-8 sm:p-10 border border-[#1d442a] hover:border-[#389456] transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-category-gold !text-xs !rounded-md">
                        Phase 2 · Weeks 7–12
                      </span>
                      <Rocket size={20} className="text-[#f3ae29]" />
                    </div>
                    <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-3">Industry Internship</h3>
                    <p className="text-sm text-[#a3caad] leading-relaxed mb-6 font-normal">Six weeks of real-world commercial placement applying your skillsets directly in professional partner organizations.</p>
                    <ul className="space-y-3 text-sm text-[#d1e7d8]">
                      {["Direct placement with a vetted corporate partner", "Apply skills to real live projects and commercial deliverables", "Build an employer-verified professional portfolio", "Earn an accredited Certificate of Completion & Endorsement"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-[#f3ae29] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Facilitators & Mentors (Crisp White / Light Section) */}
            <section className="bg-white py-20 sm:py-24 border-b border-[#e2ede4] text-[#07190e] relative">
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
                    • Expert Guidance
                  </span>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] mb-4 tracking-tight leading-[1.08]">
                    Facilitators &amp;{" "}
                    <span className="text-[#2d7a46] italic">Mentors!</span>
                  </h2>
                  <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed">
                    Learn directly from industry practitioners leading our LaunchPad fellowship sessions.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sessions.length > 0
                    ? sessions.map((session, index) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 }}
                          className="bg-[#f8faf7] rounded-2xl p-6 border border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2] transition-all duration-300 flex flex-col justify-between shadow-md"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#2d7a46] shadow-sm">
                                {session.mentor_photo_url ? (
                                  <Image src={session.mentor_photo_url} alt={session.mentor_name} fill className="object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-[#e8f5ec] flex items-center justify-center text-[#2d7a46] font-bold text-xl">
                                    {session.mentor_name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              {session.mentor_linkedin && (
                                <a
                                  href={session.mentor_linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2.5 rounded-xl bg-white border border-[#d8e6db] text-[#4a6b53] hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all"
                                  title={`${session.mentor_name}'s LinkedIn`}
                                >
                                  <Linkedin size={16} />
                                </a>
                              )}
                            </div>
                            <h3 className="font-serif-heading text-lg font-bold text-[#07190e] mb-1">{session.mentor_name}</h3>
                            <p className="text-[11px] font-mono text-[#2d7a46] uppercase tracking-wider mb-3 font-semibold">{session.mentor_role}</p>
                            {session.mentor_bio && (
                              <p className="text-xs text-[#3a5342] leading-relaxed line-clamp-3 mb-3">{session.mentor_bio}</p>
                            )}
                            <p className="text-xs text-[#4a6b53]/80 italic">Topic: {session.title}</p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#e2ede4] flex items-center justify-between">
                            <button
                              onClick={() => setSelectedSession(session)}
                              className="text-xs font-mono font-bold text-[#2d7a46] hover:text-[#07190e] flex items-center gap-1 uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              <span>Session Details</span>
                              <ArrowUpRight size={14} className="text-[#f3ae29]" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    : Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-[#f8faf7] rounded-2xl p-6 border border-[#d8e6db] animate-pulse h-48" />
                      ))
                  }
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* ── TAB 2: COHORT 1 ARCHIVE ── */
          <motion.div key="tab-cohort1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="bg-[#0a2012] py-14 sm:py-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Cohort Intro Banner */}
              <div className="bg-[#0c2616] rounded-2xl p-6 sm:p-10 border border-[#1d442a] mb-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="max-w-2xl">
                  <div className="mb-3">
                    <span className="annotation-curly">
                      Completed Cohort Showcase
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white mb-3">Cohort 1 Masterclasses &amp; Archive</h2>
                  <p className="text-sm text-[#a3caad] font-normal leading-relaxed">
                    Explore all {sessions.length} completed sessions led by our industry mentors. Click any session card to view key takeaways and photo highlights.
                  </p>
                </div>
                <div className="bg-[#0a2012] rounded-xl border border-[#1d442a] flex items-center gap-6 p-4 px-6 text-center shrink-0">
                  <div>
                    <p className="text-2xl sm:text-3xl font-mono font-bold text-[#f3ae29]">{sessions.length}/{sessions.length}</p>
                    <p className="text-[10px] font-mono text-[#a3caad] uppercase tracking-widest mt-1">Sessions</p>
                  </div>
                  <div className="h-8 w-px bg-[#1d442a]" />
                  <div>
                    <p className="text-2xl sm:text-3xl font-mono font-bold text-[#389456]">25</p>
                    <p className="text-[10px] font-mono text-[#a3caad] uppercase tracking-widest mt-1">Graduates</p>
                  </div>
                </div>
              </div>

              {/* Sessions Grid */}
              {sessionsLoading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="animate-spin text-[#389456]" size={40} />
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="text-center py-24 text-[#a3caad]">
                  <GraduationCap size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No sessions found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedSession(session)}
                      className="bg-[#0c2616] rounded-2xl border border-[#1d442a] hover:border-[#389456] hover:bg-[#10321e] transition-all duration-300 p-6 sm:p-7 cursor-pointer flex flex-col justify-between shadow-xl group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-[11px] font-bold text-[#389456] uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a2012] border border-[#1d442a]">
                            Session {session.session_number}
                          </span>
                          <span className="text-[11px] font-mono text-[#f3ae29] font-semibold">
                            {session.status}
                          </span>
                        </div>
                        <h3 className="font-serif-heading text-xl font-bold text-white mb-2 group-hover:text-[#d1e7d8] transition-colors">
                          {session.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#a3caad] line-clamp-2 leading-relaxed mb-6 font-normal">{session.summary}</p>
                        <div className="flex items-center gap-3 pt-4 border-t border-[#1d442a]">
                          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#2d7a46] shrink-0">
                            {session.mentor_photo_url
                              ? <Image src={session.mentor_photo_url} alt={session.mentor_name} fill className="object-cover" />
                              : <div className="w-full h-full bg-[#10321e] flex items-center justify-center text-[#389456] font-bold text-sm">{session.mentor_name.charAt(0)}</div>
                            }
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{session.mentor_name}</p>
                            <p className="text-[10px] font-mono text-[#a3caad] uppercase">{session.mentor_role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 mt-5 border-t border-[#1d442a] flex items-center justify-between">
                        <span className="text-xs font-mono text-[#f3ae29] font-semibold uppercase tracking-wider group-hover:underline">View Session Details</span>
                        <ChevronRight size={16} className="text-[#389456] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4. CTA Banner ── */}
      <section className="bg-[#0a2012] py-20 sm:py-24 border-t border-[#1d442a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0c2616] rounded-2xl p-8 sm:p-12 border border-[#1d442a] text-center shadow-2xl relative overflow-hidden">
            <div className="mb-3">
              <span className="annotation-curly">
                Join Next Cohort
              </span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
              Ready to Join the Next{" "}
              <span className="text-[#389456] italic">LaunchPad Cohort?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#a3caad] font-normal max-w-xl mx-auto mb-8 leading-relaxed">
              Transform from student to professional in 12 weeks with intensive mentorship and 6 weeks of industry internship experience.
            </p>
            <button
              onClick={() => setIsNextCohortModalOpen(true)}
              className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8"
            >
              <span>Apply for Next Cohort</span>
              <ArrowUpRight size={18} className="text-[#f3ae29]" />
            </button>
          </div>
        </div>
      </section>

      {/* Session Detail Modal */}
      {selectedSession && (
        <SessionModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}

      <NextCohortModal isOpen={isNextCohortModalOpen} onClose={() => setIsNextCohortModalOpen(false)} />

      <Footer />
    </div>
  );
}

export default function Launchpad() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0c2616] flex items-center justify-center text-white font-mono text-sm">
        Loading Launchpad...
      </div>
    }>
      <LaunchpadContent />
    </Suspense>
  );
}

