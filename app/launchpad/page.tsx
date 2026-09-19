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
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionDetailModal from "@/components/SessionDetailModal";
import NextCohortModal from "@/components/NextCohortModal";
import { COHORT_1_SESSIONS, CohortSession } from "@/lib/cohort1-data";

const LAUNCHPAD_HERO_IMAGES = [
  "/launchpad-slides/launchpad-slide-1-v2.jpg",
  "/launchpad-slides/launchpad-slide-2.jpg",
  "/launchpad-slides/launchpad-slide-3.jpg",
  "/launchpad-slides/launchpad-slide-4.png",
  "/launchpad-slides/launchpad-slide-5.jpg",
];

function LaunchpadContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab state: "format" or "cohort1"
  const initialTab = searchParams.get("tab") === "cohort-1" ? "cohort1" : "format";
  const [activeTab, setActiveTab] = useState<"format" | "cohort1">(initialTab);

  // Modal State for Cohort 1 sessions
  const [selectedSession, setSelectedSession] = useState<CohortSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal State for Next Cohort Announcement
  const [isNextCohortModalOpen, setIsNextCohortModalOpen] = useState<boolean>(false);

  // Search & Filter State for Cohort 1
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Hero carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LAUNCHPAD_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % LAUNCHPAD_HERO_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + LAUNCHPAD_HERO_IMAGES.length) % LAUNCHPAD_HERO_IMAGES.length);
  };

  const categories = [
    "All",
    "Career Development",
    "Communication",
    "Corporate Readiness",
    "Academic & Research",
    "Career Coaching",
    "Technology",
    "Personal Branding",
    "Networking",
  ];

  // Sync state with URL params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "cohort-1" && activeTab !== "cohort1") {
      setActiveTab("cohort1");
    } else if (tabParam === "format" && activeTab !== "format") {
      setActiveTab("format");
    }
  }, [searchParams]);

  const handleTabSwitch = (tab: "format" | "cohort1") => {
    setActiveTab(tab);
    const paramVal = tab === "cohort1" ? "cohort-1" : "format";
    router.push(`/launchpad?tab=${paramVal}`, { scroll: false });
    setTimeout(() => {
      const tabBar = document.getElementById("launchpad-tabs");
      if (tabBar) {
        tabBar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  const handleOpenSession = (session: CohortSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const filteredSessions = COHORT_1_SESSIONS.filter((session) => {
    const matchesCategory =
      selectedCategory === "All" || session.category === selectedCategory;
    const matchesQuery =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)' }}>
      <Navbar />

      {/* ── Hero Section with Animated Background Carousel (Same as Homepage Hero) ── */}
      <section className="relative text-white flex items-center overflow-hidden py-4 sm:py-6">
        {/* Full-bleed Animated Image Carousel */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
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

        {/* Dark Monograph Vignette Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(13,40,24,0.72)' }} />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(13,40,24,0.65), transparent)' }} />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full pt-4 pb-16 sm:pt-6 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="annotation-curly inline-flex items-center gap-2">
              &#123; 6-Week Training + 6-Week Industry Internship &#125;
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-6 text-white font-bold leading-[1.05] tracking-tight max-w-4xl"
            style={{ fontSize: "clamp(36px, 6vw, 80px)" }}
          >
            Himmatkaar{" "}
            <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
              LaunchPad!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-base sm:text-lg lg:text-xl max-w-2xl mb-10 text-[#8ea896] leading-relaxed font-normal"
          >
            Transform from student to professional in 12 weeks. Intensive training, personalized mentorship, and real industry internship experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <button
              onClick={() => setIsNextCohortModalOpen(true)}
              className="btn-gsap-cta flex items-center gap-2"
            >
              Apply for Next Cohort <ArrowRight size={16} />
            </button>
            <button
              onClick={() => handleTabSwitch(activeTab === "format" ? "cohort1" : "format")}
              className="btn-gsap-ghost"
            >
              {activeTab === "format" ? "View Cohort 1 Archive" : "View Program Format"}
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-6 mt-10 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[var(--color-badge-gold)]" />
              Free for Eligible Students
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[var(--color-badge-mint)]" />
              Real Industry Internship
            </span>
          </motion.div>
        </div>

        {/* Carousel Prev Arrow */}
        <button
          onClick={prevImage}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full transition-all"
          style={{ border: '1px solid var(--color-border)', background: 'rgba(13,40,24,0.5)' }}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Carousel Next Arrow */}
        <button
          onClick={nextImage}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full transition-all"
          style={{ border: '1px solid var(--color-border)', background: 'rgba(13,40,24,0.5)' }}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {LAUNCHPAD_HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === currentImageIndex ? '28px' : '8px',
                background: index === currentImageIndex
                  ? 'var(--color-badge-gold)'
                  : 'rgba(255,255,255,0.3)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Sticky Dual View Tab Bar (Oval Pill Card Container) ── */}
      <section
        id="launchpad-tabs"
        className="sticky top-20 z-30 py-5 px-4 sm:px-6 transition-all duration-300 bg-[#08170d]/90 backdrop-blur-xl border-b border-[#1a3a24]"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0e2417] p-2 rounded-full border border-[#1a3a24] shadow-2xl flex items-center gap-2">
            <button
              onClick={() => handleTabSwitch("format")}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "format"
                  ? 'bg-[#0ae448] text-[#08170d] font-bold shadow-[0_0_15px_rgba(10,228,72,0.35)] border border-[#0ae448]'
                  : 'bg-[#08170d] text-[#8ea896] hover:text-white border border-[#1a3a24] hover:border-[#0ae448]/40'
              }`}
            >
              <Rocket size={16} />
              <span>LaunchPad Format</span>
            </button>
            <button
              onClick={() => handleTabSwitch("cohort1")}
              className={`flex-1 py-3 px-4 sm:px-6 rounded-full font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "cohort1"
                  ? 'bg-[#0ae448] text-[#08170d] font-bold shadow-[0_0_15px_rgba(10,228,72,0.35)] border border-[#0ae448]'
                  : 'bg-[#08170d] text-[#8ea896] hover:text-white border border-[#1a3a24] hover:border-[#0ae448]/40'
              }`}
            >
              <GraduationCap size={16} />
              <span>Cohort 1 Archive</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Dynamic Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === "format" ? (
          <motion.div
            key="tab-format"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Quick Stats Grid Cards */}
            <section className="bg-[#08170d] py-12 sm:py-16 border-b border-[#1a3a24]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[
                    { icon: <Calendar size={24} className="text-[#0ae448]" />, title: "Duration", desc: "12 Weeks (6+6)", tag: "Timeline" },
                    { icon: <Clock size={24} className="text-[#abff84]" />, title: "Format", desc: "Mon/Thu + Mentorship", tag: "Schedule" },
                    { icon: <Users size={24} className="text-[#0ae448]" />, title: "Cohort Size", desc: "25 Students per Cohort", tag: "Capacity" },
                    { icon: <Award size={24} className="text-[#abff84]" />, title: "Mode", desc: "Hybrid (In-person + Online)", tag: "Delivery" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="bg-[#0e2417] rounded-xl p-6 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 rounded-lg bg-[#08170d] border border-[#1a3a24] group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="text-[10px] font-mono text-[#0ae448] tracking-widest uppercase">&#123; {item.tag} &#125;</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#0ae448] transition-colors">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#8ea896] font-mono">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Program Objectives */}
            <section className="bg-[#08170d] py-16 sm:py-20 border-b border-[#1a3a24]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-14">
                  <span className="annotation-curly mb-3 inline-block">&#123; Program Objectives &#125;</span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                    What You&apos;ll{" "}
                    <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                      Achieve!
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#8ea896] max-w-xl font-normal leading-relaxed">
                    Transform into an industry-ready professional through 6 weeks of intensive training and 6 weeks of hands-on industry experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: <Target size={28} className="text-[#0ae448]" />, title: "Career Purpose & Growth Path", desc: "Identify your career purpose and personal growth path with clarity and confidence.", tag: "Goal Setting" },
                    { icon: <DollarSign size={28} className="text-[#abff84]" />, title: "Job-Ready Documents", desc: "Develop professional documents including CV, LinkedIn profile, and portfolio that stand out.", tag: "Branding" },
                    { icon: <Network size={28} className="text-[#0ae448]" />, title: "Interview & Communication", desc: "Master interview and communication skills for corporate settings and professional environments.", tag: "Soft Skills" },
                    { icon: <Lightbulb size={28} className="text-[#abff84]" />, title: "Professional Networks", desc: "Build and leverage professional networks for growth opportunities and career advancement.", tag: "Networking" },
                    { icon: <TrendingUp size={28} className="text-[#0ae448]" />, title: "Essential Soft Skills", desc: "Understand the value of soft skills, sales mindset, and adaptability in the modern workplace.", tag: "Mindset" },
                    { icon: <Rocket size={28} className="text-[#abff84]" />, title: "AI & Automation Tools", desc: "Apply AI and automation tools for productivity, innovation, and staying ahead of the curve.", tag: "Technology" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                      className="bg-[#0e2417] rounded-xl p-6 sm:p-8 border border-[#1a3a24] hover:border-[#0ae448]/60 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-[#08170d] border border-[#1a3a24] group-hover:scale-110 transition-transform">
                          {benefit.icon}
                        </div>
                        <span className="text-[10px] font-mono text-[#0ae448] tracking-widest uppercase">
                          &#123; {benefit.tag} &#125;
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#0ae448] transition-colors">{benefit.title}</h3>
                      <p className="text-xs sm:text-sm text-[#8ea896] leading-relaxed font-sans">{benefit.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 12-Week Journey Phase Cards */}
            <section className="bg-[#08170d] py-16 sm:py-20 border-b border-[#1a3a24]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-14">
                  <span className="annotation-curly mb-3 inline-block">&#123; Structured Roadmap &#125;</span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                    Your 12-Week{" "}
                    <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                      Journey!
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#8ea896] max-w-xl font-normal">
                    A structured two-phase program taking you from classroom to corporate.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phase 1 Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#0ae448] tracking-widest uppercase">
                        &#123; Phase 1 · Weeks 1–6 &#125;
                      </span>
                      <BookOpen size={18} className="text-[#0ae448]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#0ae448] transition-colors">Intensive Training</h3>
                    <p className="text-sm text-[#8ea896] leading-relaxed mb-6 font-normal">
                      Six weeks of structured skill-building sessions held every Monday &amp; Thursday, combined with personalized one-on-one mentorship.
                    </p>
                    <ul className="space-y-3 font-sans">
                      {[
                        "Bi-weekly group sessions (Mon & Thu)",
                        "Weekly one-on-one mentorship with Salman Khan",
                        "Hands-on deliverables every week",
                        "Peer accountability and team exercises",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#8ea896]">
                          <CheckCircle2 size={16} className="text-[#0ae448] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Phase 2 Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0e2417] rounded-xl p-8 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#abff84] tracking-widest uppercase">
                        &#123; Phase 2 · Weeks 7–12 &#125;
                      </span>
                      <Rocket size={18} className="text-[#abff84]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#abff84] transition-colors">Industry Internship</h3>
                    <p className="text-sm text-[#8ea896] leading-relaxed mb-6 font-normal">
                      Six weeks of real-world industry placement applying your skills in professional environments.
                    </p>
                    <ul className="space-y-3 font-sans">
                      {[
                        "Placed with a real industry organization",
                        "Apply skills to live projects and challenges",
                        "Build a strong professional portfolio",
                        "Earn a certificate of completion",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#8ea896]">
                          <CheckCircle2 size={16} className="text-[#abff84] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Facilitators Grid */}
            <section className="bg-[#08170d] py-16 sm:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-14">
                  <span className="annotation-curly mb-3 inline-block">&#123; Expert Guidance &#125;</span>
                  <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                    Facilitators &amp;{" "}
                    <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                      Mentors!
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#8ea896] max-w-xl font-normal">
                    Learn from industry leaders guiding our LaunchPad cohorts.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Sipehre Shamsi", role: "Lead Facilitator", expertise: "Career Development & Professional Growth", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
                    { name: "Aimen Shahid", role: "Program Facilitator", expertise: "Communication & Soft Skills", photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
                    { name: "Frasat Tanveer", role: "Industry Mentor", expertise: "Corporate Readiness & Workplace Skills", photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
                    { name: "Dr. Ahmad", role: "Academic Advisor", expertise: "Research & Academic Excellence", photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
                    { name: "Ubaid Afzal", role: "Career Coach", expertise: "Job Search & Interview Preparation", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
                    { name: "Dr. Hammad Armaghan", role: "Technical Mentor", expertise: "Technology & Innovation", photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
                    { name: "Rameen Anwar", role: "Branding Specialist", expertise: "Personal Branding & Digital Presence", photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
                    { name: "Awais Khan", role: "Networking Coach", expertise: "Professional Networking & Connections", photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" }
                  ].map((mentor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-[#0e2417] rounded-xl p-6 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border border-[#0ae448]/40">
                          <Image
                            src={mentor.photoUrl}
                            alt={mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#0ae448] transition-colors">{mentor.name}</h3>
                        <p className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest mb-3 font-semibold">
                          &#123; {mentor.role} &#125;
                        </p>
                        <p className="text-xs text-[#8ea896] leading-relaxed font-normal">
                          {mentor.expertise}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#1a3a24]">
                        <button
                          onClick={() => handleTabSwitch("cohort1")}
                          className="text-xs font-mono text-[#0ae448] hover:text-white flex items-center gap-1 uppercase tracking-wider transition-colors"
                        >
                          <span>Masterclasses</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* TAB 2: COHORT 1 ARCHIVE */
          <motion.div
            key="tab-cohort1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#08170d] py-12 sm:py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Cohort 1 Intro Banner Card */}
              <div className="bg-[#0e2417] rounded-xl p-6 sm:p-10 border border-[#1a3a24] mb-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="annotation-curly mb-3 inline-block">
                    ✨ &#123; Completed Cohort Showcase &#125;
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                    Cohort 1 Masterclasses &amp; Archive
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8ea896] font-normal leading-relaxed">
                    Explore all 8 completed sessions led by our industry mentors. Click any card to view key takeaways and photo highlights.
                  </p>
                </div>
                <div className="bg-[#08170d] rounded-lg border border-[#1a3a24] flex items-center gap-6 p-4 px-6 text-center shrink-0">
                  <div>
                    <p className="text-2xl sm:text-3xl font-mono font-bold text-[#0ae448]">8/8</p>
                    <p className="text-[10px] font-mono text-[#8ea896] uppercase tracking-widest mt-1">Sessions</p>
                  </div>
                  <div className="h-8 w-px bg-[#1a3a24]" />
                  <div>
                    <p className="text-2xl sm:text-3xl font-mono font-bold text-[#0ae448]">25</p>
                    <p className="text-[10px] font-mono text-[#8ea896] uppercase tracking-widest mt-1">Graduates</p>
                  </div>
                </div>
              </div>

              {/* Filter and Search Bar Card */}
              <div className="bg-[#0e2417] rounded-xl p-5 border border-[#1a3a24] mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Search Input */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8ea896]" size={16} />
                    <input
                      type="text"
                      placeholder="Search mentor or topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#08170d] border border-[#1a3a24] rounded-lg py-2.5 pl-10 pr-4 text-white text-xs font-mono outline-none focus:border-[#0ae448] transition-colors"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[11px] font-mono uppercase px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#0ae448] text-[#08170d] border-[#0ae448] font-bold'
                            : 'bg-[#08170d] text-[#8ea896] border-[#1a3a24] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured One-on-One Mentorship Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0e2417] rounded-xl p-6 sm:p-10 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 mb-10"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="annotation-curly text-xs">
                        <Sparkles size={12} className="inline mr-1" /> &#123; Featured Mentorship &#125;
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[#8ea896]">
                        Weekly Throughout Cohort
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                      One-on-One Mentorship with Salman Khan
                    </h2>
                    <p className="text-sm text-[#8ea896] font-normal leading-relaxed mb-6">
                      Every week throughout Cohort 1, Salman Khan held dedicated one-on-one mentorship sessions providing tailored career guidance.
                    </p>

                    <ul className="space-y-2.5 font-sans">
                      {[
                        "Personalized career guidance and goal setting",
                        "Individual feedback on progress and development",
                        "Tailored advice for each student's career path",
                        "Direct access to industry insights and expertise",
                      ].map((point, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-[#8ea896] font-normal">
                          <CheckCircle2 size={15} className="text-[#0ae448] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#08170d] rounded-xl p-8 border border-[#1a3a24] text-center">
                    <div className="w-20 h-20 rounded-full bg-[#0e2417] text-[#0ae448] flex items-center justify-center text-2xl font-bold font-mono mx-auto mb-4 border border-[#0ae448]/40">
                      SK
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Salman Khan</h3>
                    <p className="text-xs font-mono text-[#0ae448] uppercase tracking-wider mb-4">
                      Lead Mentor &amp; Career Coach
                    </p>
                    <p className="text-xs text-[#8ea896] font-normal">
                      Weekly 1-hour sessions with 2–3 students for personalized growth.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sessions Directory Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOpenSession(session)}
                    className="bg-[#0e2417] rounded-xl border border-[#1a3a24] hover:border-[#0ae448]/60 transition-all duration-300 p-6 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest">
                          &#123; Session {session.sessionNumber} &#125;
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          Completed
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#0ae448] transition-colors">
                        {session.title}
                      </h3>

                      <p className="text-xs text-[#8ea896] line-clamp-2 leading-relaxed mb-6 font-normal">
                        {session.summary}
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-[#1a3a24]">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#1a3a24] shrink-0">
                          <Image
                            src={session.mentor.photoUrl}
                            alt={session.mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{session.mentor.name}</p>
                          <p className="text-[10px] font-mono text-[#8ea896] uppercase">{session.mentor.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1a3a24] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#0ae448] uppercase tracking-wider group-hover:underline">View Details</span>
                      <ChevronRight size={16} className="text-[#0ae448] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA Banner Card ── */}
      <section className="bg-[#08170d] py-16 sm:py-20 border-t border-[#1a3a24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0e2417] rounded-2xl p-8 sm:p-12 border border-[#1a3a24] text-center">
            <span className="annotation-curly mb-3 inline-block">&#123; Join Next Cohort &#125;</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to Join the Next LaunchPad Cohort?
            </h2>
            <p className="text-sm sm:text-base text-[#8ea896] font-normal max-w-xl mx-auto mb-8">
              Transform from student to professional in 12 weeks with intensive mentorship and 6 weeks of industry internship experience.
            </p>
            <button
              onClick={() => setIsNextCohortModalOpen(true)}
              className="btn-gsap-cta inline-flex items-center gap-2"
            >
              Apply Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <SessionDetailModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NextCohortModal
        isOpen={isNextCohortModalOpen}
        onClose={() => setIsNextCohortModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default function Launchpad() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Loading Launchpad...
      </div>
    }>
      <LaunchpadContent />
    </Suspense>
  );
}
