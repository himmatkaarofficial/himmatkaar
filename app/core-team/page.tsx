"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Linkedin, Loader2, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCardImage from "@/components/TeamCardImage";
import TeamMemberDetailModal, { TeamMemberDetail } from "@/components/TeamMemberDetailModal";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

const TEAM_HERO_IMAGES = [
  "/team-slides/team-slide-1.jpg",
  "/team-slides/team-slide-2.jpg",
  "/team-slides/team-slide-3.jpg",
  "/team-slides/team-slide-4.jpg",
];

const DEFAULT_CORE_TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Salman Khan",
    role: "Founder & Executive Director",
    bio: "Career mentor and visionary driving youth empowerment and industry readiness across Pakistan.",
    image: "/team/founder.jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    id: "2",
    name: "Co-Founder",
    role: "Co-Founder & Strategic Lead",
    bio: "Co-leading educational initiatives, program operations, and corporate relations.",
    image: "/team/cofounder.png",
    linkedin: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Creative & Graphics Lead",
    role: "Creative & Design Lead",
    bio: "Directing visual brand identity, media design, and digital creative campaigns.",
    image: "/team/creative-and%20graphics-lead.png",
    linkedin: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Sipehre Shamsi",
    role: "Lead Facilitator",
    bio: "Specialist in career growth strategies, resume development, and student leadership coaching.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    id: "5",
    name: "Aimen Shahid",
    role: "Program Facilitator",
    bio: "Empowering students through communication masterclasses and public speaking training.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    id: "6",
    name: "Frasat Tanveer",
    role: "Corporate Placement Lead",
    bio: "Connecting LaunchPad fellows with top-tier corporate internship and employment roles.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
];

const ITEMS_PER_PAGE = 9;

export default function CoreTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("1");
  const [selectedMemberForModal, setSelectedMemberForModal] = useState<TeamMemberDetail | null>(null);

  // Background carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TEAM_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % TEAM_HERO_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + TEAM_HERO_IMAGES.length) % TEAM_HERO_IMAGES.length);
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team");
        const data = await response.json();
        const fetched = data.members && data.members.length > 0 ? data.members : DEFAULT_CORE_TEAM;
        setMembers(fetched);
      } catch (error) {
        console.error("Error fetching team members, using default:", error);
        setMembers(DEFAULT_CORE_TEAM);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  const displayMembers = members.length > 0 ? members : DEFAULT_CORE_TEAM;
  const totalPages = useMemo(() => Math.max(1, Math.ceil(displayMembers.length / ITEMS_PER_PAGE)), [displayMembers.length]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayMembers.slice(start, start + ITEMS_PER_PAGE);
  }, [displayMembers, currentPage]);

  const selectedMember = useMemo(() => {
    return displayMembers.find((m) => m.id === selectedMemberId) || displayMembers[0];
  }, [displayMembers, selectedMemberId]);

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── Page Hero with Animated Background Carousel ── */}
        <section className="relative text-white flex items-center overflow-hidden py-16 sm:py-20 border-b border-[#1d442a]">
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
                src={TEAM_HERO_IMAGES[currentImageIndex]}
                alt={`Himmatkaar Team Slide ${currentImageIndex + 1}`}
                fill
                priority={currentImageIndex === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Refined Dark Monograph Vignette Overlay for Clear Image Visibility */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07190e]/80 via-[#0c2616]/50 to-[#07190e]/25" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#07190e]/90 via-transparent to-black/20" />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full">
            <Link 
              href="/team" 
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#0c2616]/80 border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="text-[#389456]" /> Back to Team Overview
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0c2616]/80 border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
                <Sparkles size={14} className="text-[#f3ae29]" />
                <span>Executive Leadership</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] max-w-3xl">
                Meet All Our{" "}
                <span className="text-[#389456]">
                  Teammates
                </span>
                <span className="font-urdu block text-2xl sm:text-3xl lg:text-4xl text-[#f3ae29] font-normal mt-2">
                  ہمت کار لیڈرشپ
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#d1e7d8] max-w-2xl font-normal leading-relaxed">
                Explore our full leadership roster and the dedicated mentors, facilitators, and directors building the future of Pakistan&apos;s youth.
              </p>
            </motion.div>
          </div>

          {/* Carousel Prev Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl bg-[#0c2616]/80 border border-[#1d442a] hover:border-[#389456] hover:bg-[#0c2616] transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="text-[#389456]" />
          </button>

          {/* Carousel Next Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl bg-[#0c2616]/80 border border-[#1d442a] hover:border-[#389456] hover:bg-[#0c2616] transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="text-[#389456]" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {TEAM_HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-md transition-all duration-300 ${
                  index === currentImageIndex ? "w-8 bg-[#f3ae29]" : "w-2.5 bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── CRISP WHITE SECTION: Interactive Team Member Cards ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Header with Selector Hint */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <UserCheck size={14} className="text-[#2d7a46]" /> Click any card to preview full details
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0c2616] tracking-tight">
                  Core Team Directory
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Click on any leader below to switch their details and view their impact highlights.
                </p>
              </div>

              {selectedMember && (
                <div className="p-3 px-4 rounded-xl bg-white border border-[#2d7a46]/30 shadow-sm flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2d7a46] animate-pulse" />
                  <span className="text-xs font-medium text-slate-700">
                    Currently Viewing: <strong className="text-[#0c2616]">{selectedMember.name}</strong>
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#2d7a46]" size={40} />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedMembers.map((member, idx) => {
                    const isSelected = selectedMemberId === member.id;
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.06 }}
                        onClick={() => {
                          setSelectedMemberId(member.id);
                          setSelectedMemberForModal({
                            id: member.id,
                            name: member.name,
                            role: member.role,
                            bio: member.bio,
                            image: member.image,
                            linkedin: member.linkedin,
                            type: "core-team",
                          });
                        }}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                          isSelected
                            ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl ring-2 ring-[#2d7a46]/40 scale-[1.02]"
                            : "bg-white text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 hover:shadow-md"
                        }`}
                      >
                        <div>
                          {/* Image container */}
                          <div className="rounded-xl overflow-hidden relative h-48 w-full border border-black/5 mb-3">
                            <TeamCardImage
                              src={member.image}
                              alt={member.name}
                              name={member.name}
                              sizes="400px"
                            />
                            {isSelected && (
                              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#2d7a46] text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-md">
                                <CheckCircle2 size={12} /> Active
                              </div>
                            )}
                          </div>

                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <h3 className={`font-serif-heading text-lg font-bold transition-colors ${
                                isSelected ? "text-white" : "text-[#0c2616] group-hover:text-[#2d7a46]"
                              }`}>
                                {member.name}
                              </h3>
                              <p className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                                isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"
                              }`}>
                                {member.role}
                              </p>
                            </div>
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`p-2 rounded-lg border transition-colors shrink-0 ${
                                  isSelected 
                                    ? "bg-[#163e24] border-[#2d7a46] text-[#f3ae29] hover:bg-[#2d7a46] hover:text-white"
                                    : "bg-[#f8faf7] border-[#e2ede4] text-[#2d7a46] hover:bg-[#e8f5ec]"
                                }`}
                                aria-label={`${member.name} LinkedIn`}
                              >
                                <Linkedin size={14} />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                          isSelected ? "border-[#1d442a] text-[#a3caad]" : "border-slate-100 text-slate-500"
                        }`}>
                          <span>HimmatKaar Core Team</span>
                          <span className={`font-semibold flex items-center gap-1 ${isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}`}>
                            View Profile →
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl bg-white border border-[#e2ede4] text-xs font-medium text-slate-700 hover:border-[#2d7a46] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                          page === currentPage
                            ? "bg-[#0c2616] text-white border border-[#0c2616] shadow-sm"
                            : "bg-white text-slate-700 border border-[#e2ede4] hover:border-[#2d7a46]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-xl bg-white border border-[#e2ede4] text-xs font-medium text-slate-700 hover:border-[#2d7a46] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ── Dark Forest CTA ── */}
        <section className="bg-[#0c2616] py-16 sm:py-20 border-t border-[#1d442a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-wider mb-4">
              Join Our Mission
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Want to Join the HimmatKaar Team?
            </h2>
            <p className="text-base text-[#d1e7d8] max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              We are continually expanding our facilitator network, campus leads, and strategic advisors across Pakistan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[#2d7a46] text-white font-semibold hover:bg-[#389456] transition-colors text-sm shadow-md"
              >
                Apply for Leadership & Mentorship
              </Link>
              <Link
                href="/ambassadors"
                className="px-6 py-3.5 rounded-xl bg-[#07190e] border border-[#1d442a] text-[#d1e7d8] hover:text-white hover:border-[#389456] transition-colors text-sm"
              >
                Explore Campus Ambassadors
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <TeamMemberDetailModal
        member={selectedMemberForModal}
        onClose={() => setSelectedMemberForModal(null)}
      />
    </div>
  );
}
