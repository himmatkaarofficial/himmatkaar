"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Search, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft
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

export default function Cohort1Page() {
  const [selectedSession, setSelectedSession] = useState<CohortSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNextCohortModalOpen, setIsNextCohortModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background carousel auto-slide
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

      {/* ── Page Hero with Animated Background Image Carousel ── */}
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
              alt={`Himmatkaar LaunchPad Cohort 1 Slide ${currentImageIndex + 1}`}
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
          <Link
            href="/launchpad"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#0ae448] hover:text-white mb-4 transition-colors uppercase"
          >
            <ArrowLeft size={14} /> Back to LaunchPad
          </Link>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="annotation-curly inline-flex items-center gap-2">
                <Rocket size={13} /> &#123; Completed Cohort Archive &#125;
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-4xl"
              style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
            >
              LaunchPad Cohort 1{" "}
              <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                Sessions!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-[#8ea896] leading-relaxed mb-8 font-normal"
            >
              Explore all masterclasses, facilitator presentations, key takeaways, and session moments from our premier Cohort 1 launch. Click any session card below to view photos and session details.
            </motion.p>

            {/* Quick Stats Grid — Dark Emerald Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-[#1a3a24]">
              {[
                { label: "Facilitators & Mentors", value: "8 Experts" },
                { label: "Completed Masterclasses", value: "8 Sessions" },
                { label: "Cohort Participants", value: "25 Students" },
                { label: "Session Moments", value: "20+ Photos" }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e2417] rounded-xl p-4 border border-[#1a3a24] hover:border-[#0ae448]/40 transition-all"
                >
                  <p className="text-xl sm:text-2xl font-bold text-[#0ae448]">{stat.value}</p>
                  <p className="text-[11px] font-mono text-[#8ea896] mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
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

      {/* Filter and Search Toolbar */}
      <section style={{ background: 'var(--color-canvas)', borderBottom: '1px solid var(--color-border)', padding: '24px 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
              <input
                type="text"
                placeholder="Search mentor or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--color-espresso)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-controls)',
                  padding: '10px 16px 10px 40px',
                  color: 'var(--color-text-primary)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans-gallery)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="badge-gallery cursor-pointer transition-all"
                  style={{
                    background: selectedCategory === cat ? 'var(--color-badge-gold)' : 'var(--color-espresso)',
                    color: selectedCategory === cat ? 'var(--color-text-dark)' : 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Grid */}
      <section style={{ background: 'var(--color-canvas)', padding: '60px 0 100px', minHeight: '600px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-portrait text-2xl sm:text-3xl text-white">
                Cohort 1 Sessions Directory
              </h2>
              <p className="label-gallery mt-1" style={{ color: 'var(--color-text-muted)' }}>
                Showing {filteredSessions.length} completed session{filteredSessions.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {filteredSessions.length === 0 ? (
            <div
              style={{
                background: 'var(--color-charcoal)',
                borderRadius: 'var(--radius-cards)',
                border: '1px solid var(--color-border)',
                padding: '60px 20px',
                textAlign: 'center',
              }}
            >
              <p className="font-portrait text-xl text-white mb-2">No sessions found</p>
              <p className="text-xs text-[var(--color-text-muted)] font-sans mb-6">
                Try adjusting your search query or filter category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="btn-filled-pill"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOpenSession(session)}
                  style={{
                    background: 'var(--color-charcoal)',
                    borderRadius: 'var(--radius-cards)',
                    border: '1px solid var(--color-border)',
                    padding: '24px',
                  }}
                  className="cursor-pointer hover:border-[var(--color-badge-gold)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-gallery bg-[var(--color-badge-gold)] text-[var(--color-text-dark)]">
                        Session {session.sessionNumber}
                      </span>
                      <span className="badge-gallery bg-emerald-500/20 text-emerald-300">
                        Completed
                      </span>
                    </div>

                    <h3 className="font-portrait text-xl text-white mb-3">
                      {session.title}
                    </h3>

                    <p className="text-xs text-[var(--color-text-muted)] font-sans line-clamp-2 leading-relaxed mb-4">
                      {session.summary}
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                        <Image
                          src={session.mentor.photoUrl}
                          alt={session.mentor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-portrait text-sm text-white">{session.mentor.name}</p>
                        <p className="label-gallery text-[9px]" style={{ color: 'var(--color-text-muted)' }}>{session.mentor.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                    <span className="label-gallery" style={{ color: 'var(--color-badge-gold)' }}>View Details</span>
                    <ChevronRight size={16} className="text-[var(--color-badge-gold)]" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Session Details Interactive Modal */}
      <SessionDetailModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Next Cohort Announcement Modal */}
      <NextCohortModal
        isOpen={isNextCohortModalOpen}
        onClose={() => setIsNextCohortModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
