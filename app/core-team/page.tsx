"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Linkedin, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCardImage from "@/components/TeamCardImage";

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

const ITEMS_PER_PAGE = 6;
const CARD_COLORS = ['var(--color-field-deep)', 'var(--color-charcoal)', 'var(--color-field-olive)', 'var(--color-field-emerald)', 'var(--color-field-deep)', 'var(--color-charcoal)'];

export default function CoreTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Hero with Animated Background Carousel ── */}
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
                src={TEAM_HERO_IMAGES[currentImageIndex]}
                alt={`Himmatkaar Team Slide ${currentImageIndex + 1}`}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-16 sm:pt-6 sm:pb-20 relative z-20 w-full">
            <Link href="/team" className="inline-flex items-center gap-2 mb-6 label-gallery text-[var(--color-text-muted)] hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Team
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  &#123; Core Team &#125;
                </span>
              </div>
              <h1 
                className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                Meet All Our{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Teammates!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-2xl font-normal">
                Explore our complete leadership team and the people driving Himmatkaar forward.
              </p>
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
            {TEAM_HERO_IMAGES.map((_, index) => (
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

        {/* ── Team Grid ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '60px 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-badge-gold)' }} />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedMembers.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      style={{ background: CARD_COLORS[idx % CARD_COLORS.length], borderRadius: 'var(--radius-cards)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border)' }}
                    >
                      <div style={{ margin: '20px 20px 0', borderRadius: 'var(--radius-images)', overflow: 'hidden', position: 'relative', height: '240px' }}>
                        <TeamCardImage
                          src={member.image}
                          alt={member.name}
                          name={member.name}
                          sizes="400px"
                        />
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 right-3"
                            style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-badge-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dark)', zIndex: 10 }}
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin size={13} />
                          </a>
                        )}
                      </div>
                      <div style={{ padding: '20px 20px 28px' }}>
                        <h3 className="font-portrait mb-1" style={{ fontSize: '24px', color: 'var(--color-text-primary)' }}>{member.name}</h3>
                        <p className="label-gallery mb-3" style={{ color: 'var(--color-badge-gold)' }}>{member.role}</p>
                        <p style={{ fontSize: '14px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)' }}>{member.bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="btn-ghost-pill"
                      style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: 'var(--radius-buttons)',
                          fontSize: '9px',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          fontFamily: 'var(--font-sans-gallery)',
                          border: `1px solid ${page === currentPage ? 'var(--color-badge-gold)' : 'var(--color-border)'}`,
                          background: page === currentPage ? 'var(--color-badge-gold)' : 'transparent',
                          color: page === currentPage ? 'var(--color-text-dark)' : 'var(--color-text-muted)',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          transition: 'all 0.2s',
                        }}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-ghost-pill"
                      style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
