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
  ChevronLeft,
  Linkedin,
  ArrowRight
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
  const [sessions, setSessions] = useState<CohortSession[]>(COHORT_1_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<CohortSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNextCohortModalOpen, setIsNextCohortModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch sessions dynamically from DB
  useEffect(() => {
    async function fetchDbSessions() {
      try {
        const res = await fetch("/api/launchpad?cohort=Cohort%201", { cache: "no-store" });
        const data = await res.json();
        if (data.sessions && data.sessions.length > 0) {
          const mapped: CohortSession[] = data.sessions.map((s: any) => ({
            id: s.id,
            sessionNumber: s.session_number,
            title: s.title,
            category: s.category,
            date: s.date,
            time: s.time,
            status: "Completed",
            mentor: {
              id: s.id,
              name: s.mentor_name,
              initials: s.mentor_name.split(" ").map((n: string) => n[0]).join(""),
              role: s.mentor_role,
              expertise: s.category,
              photoUrl: s.mentor_photo_url,
              bio: s.mentor_bio,
              linkedin: s.mentor_linkedin,
            },
            summary: s.summary,
            keyTakeaways: s.key_takeaways || [],
            sessionPhotos: (s.session_photos || []).map((p: any, idx: number) => ({
              id: `${s.id}-p-${idx}`,
              url: p.url,
              caption: p.caption,
            })),
          }));
          setSessions(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch sessions for cohort-1:", err);
      }
    }
    fetchDbSessions();
  }, []);

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
    ...Array.from(new Set(sessions.map((s) => s.category))),
  ];

  const handleOpenSession = (session: CohortSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const filteredSessions = sessions.filter((session) => {
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



      {/* Sessions Grid */}
      <section style={{ background: 'var(--color-canvas)', padding: '60px 0 100px', minHeight: '600px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Featured One-on-One Mentorship Card */}
          {(() => {
            const featuredSession = sessions.find((s) => s.is_featured || s.mentor?.is_featured) || sessions.find((s) => s.mentor.name.toLowerCase().includes("salman")) || sessions[0];
            if (!featuredSession) return null;

            const mentor = featuredSession.mentor;
            const mentorName = mentor?.name || "Salman Khan";
            const mentorRole = mentor?.role || "Lead Mentor & Career Coach";
            const mentorPhoto = mentor?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
            const mentorBio = mentor?.bio || "Lead Mentor guiding cohort participants through one-on-one sessions, goal setting, and career progression strategies.";
            const mentorLinkedin = mentor?.linkedin || "https://linkedin.com";
            const sessionSummary = featuredSession.summary || "Every week throughout Cohort 1, dedicated one-on-one mentorship sessions are held providing tailored career guidance, individual feedback, and strategic growth blueprints.";
            const sessionPhotos = featuredSession.sessionPhotos || [];

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0e2417] rounded-xl p-6 sm:p-10 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 mb-12 shadow-xl"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="annotation-curly text-xs">
                        <Sparkles size={12} className="inline mr-1" /> &#123; Featured Mentorship &#125;
                      </span>
                      <span className="text-[10px] font-mono uppercase text-[#8ea896] bg-[#08170d] px-2.5 py-1 rounded border border-[#1a3a24]">
                        Weekly Throughout Cohort
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                      One-on-One Mentorship with {mentorName}
                    </h2>
                    <p className="text-sm text-[#8ea896] font-normal leading-relaxed mb-6">
                      {sessionSummary}
                    </p>

                    <ul className="space-y-2.5 font-sans mb-6">
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

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => handleOpenSession(featuredSession)}
                        className="btn-gsap-cta text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
                      >
                        <span>View Session Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#08170d] rounded-xl p-6 sm:p-8 border border-[#1a3a24] text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#0ae448] mb-4 shadow-lg shrink-0">
                      <Image
                        src={mentorPhoto}
                        alt={mentorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {mentorName}
                    </h3>
                    <p className="text-xs font-mono text-[#0ae448] uppercase tracking-wider mb-3 font-semibold">
                      &#123; {mentorRole} &#125;
                    </p>
                    {mentorBio && (
                      <p className="text-xs text-[#8ea896] font-normal mb-4 max-w-sm line-clamp-3 leading-relaxed">
                        {mentorBio}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                      {mentorLinkedin && (
                        <a
                          href={mentorLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a66c2]/20 hover:bg-[#0a66c2]/35 text-[#70b5f9] border border-[#0a66c2]/50 rounded-lg text-xs font-semibold transition-all"
                        >
                          <Linkedin size={15} /> Connect on LinkedIn
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenSession(featuredSession)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0ae448]/10 hover:bg-[#0ae448]/20 text-[#0ae448] border border-[#0ae448]/30 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Sparkles size={14} /> View Details
                      </button>
                    </div>

                    {/* Session Photos Preview */}
                    {sessionPhotos.length > 0 && (
                      <div className="w-full pt-4 mt-2 border-t border-[#1a3a24]">
                        <p className="text-[10px] font-mono text-[#8ea896] uppercase tracking-wider mb-2 text-center">
                          Session Highlights
                        </p>
                        <div className="flex items-center justify-center gap-2.5">
                          {sessionPhotos.slice(0, 3).map((photo, i) => (
                            <div
                              key={i}
                              onClick={() => handleOpenSession(featuredSession)}
                              className="relative w-16 h-12 rounded-lg overflow-hidden border border-[#1a3a24] hover:border-[#0ae448] transition-all cursor-pointer shrink-0 group shadow"
                              title={photo.caption || "View Photo"}
                            >
                              <Image src={photo.url} alt={photo.caption || `Photo ${i+1}`} fill className="object-cover group-hover:scale-110 transition-transform" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-[11px] font-mono text-[#8ea896]/80 bg-[#0e2417] px-3 py-1.5 rounded-full border border-[#1a3a24] mt-4">
                      Weekly 1-hour 1-on-1 sessions for personalized growth
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })()}
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
