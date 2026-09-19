"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Linkedin, Loader2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

interface Ambassador {
  id: string;
  name: string;
  role: string;
  city: string;
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

const DEFAULT_AMBASSADORS: Ambassador[] = [
  {
    id: "1",
    name: "Ayesha Khan",
    role: "Campus Ambassador",
    city: "Lahore",
    bio: "Representing Himmatkaar at UET Lahore and driving student engagement initiatives.",
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
    bio: "Fostering entrepreneurial networks and campus events at NED University Karachi.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com",
  },
];

const cardStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  borderRadius: 'var(--radius-cards)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--color-border)',
});

export default function Team() {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
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
    const fetchData = async () => {
      try {
        const [teamRes, ambassadorsRes] = await Promise.all([
          fetch('/api/team?limit=6'),
          fetch('/api/ambassadors?limit=4')
        ]);
        const teamData = await teamRes.json();
        const ambassadorsData = await ambassadorsRes.json();
        
        const fetchedMembers = teamData.members && teamData.members.length > 0 ? teamData.members : DEFAULT_CORE_TEAM;
        const fetchedAmbassadors = ambassadorsData.ambassadors && ambassadorsData.ambassadors.length > 0 ? ambassadorsData.ambassadors : DEFAULT_AMBASSADORS;
        
        setCoreTeam(fetchedMembers);
        setAmbassadors(fetchedAmbassadors);
      } catch (error) {
        console.error('Error fetching data, using defaults:', error);
        setCoreTeam(DEFAULT_CORE_TEAM);
        setAmbassadors(DEFAULT_AMBASSADORS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chromaColors = ['var(--color-field-deep)', 'var(--color-field-forest)', 'var(--color-field-olive)', 'var(--color-charcoal)', 'var(--color-field-emerald)', 'var(--color-field-deep)'];
  const displayCoreTeam = coreTeam.length > 0 ? coreTeam : DEFAULT_CORE_TEAM;
  const displayAmbassadors = ambassadors.length > 0 ? ambassadors : DEFAULT_AMBASSADORS;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

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
            <Link href="/" className="inline-flex items-center gap-2 mb-6 label-gallery text-[var(--color-text-muted)] hover:text-white transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">
                  &#123; Our Team &#125;
                </span>
              </div>
              <h1 
                className="mb-4 text-white font-bold leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
              >
                Meet the People Behind{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Himmatkaar!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] max-w-2xl font-normal">
                Our dedicated team of professionals is committed to empowering youth across Pakistan and creating lasting impact in communities.
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

        {/* ── Core Team ── */}
        <section className="bg-[#08170d] py-16 sm:py-20 border-t border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="mb-2">
                  <span className="annotation-curly">&#123; Leadership &#125;</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Core{" "}
                  <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                    Team!
                  </span>
                </h2>
              </div>
              <Link href="/core-team" className="btn-gsap-ghost inline-flex items-center gap-2">
                View All <ArrowRight size={14} className="text-[#0ae448]" />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#0ae448]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCoreTeam.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#0e2417] rounded-xl border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    {/* Image tile */}
                    <div className="m-4 rounded-lg overflow-hidden relative h-56 border border-[#1a3a24]">
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
                          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0ae448] flex items-center justify-center text-[#08170d] hover:bg-[#abff84] transition-colors z-10"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                    </div>
                    {/* Card body */}
                    <div className="p-5 pt-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#0ae448] transition-colors">{member.name}</h3>
                      <p className="text-xs font-mono text-[#0ae448] tracking-widest uppercase mb-3">&#123; {member.role} &#125;</p>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#8ea896] font-normal">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Ambassadors ── */}
        <section style={{ background: 'var(--color-charcoal)', padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-portrait mb-2" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Campus Ambassadors</h2>
                <p className="label-gallery" style={{ color: 'var(--color-text-muted)' }}>Our representatives spreading impact across Pakistan</p>
              </div>
              <Link href="/ambassadors" className="btn-ghost-pill inline-flex items-center gap-2">
                View All <ArrowRight size={11} />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-badge-gold)' }} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {displayAmbassadors.map((member, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    style={cardStyle(chromaColors[idx % chromaColors.length])}
                  >
                    <div style={{ margin: '16px 16px 0', borderRadius: 'var(--radius-images)', overflow: 'hidden', position: 'relative', height: '200px' }}>
                      <TeamCardImage
                        src={member.image}
                        alt={member.name}
                        name={member.name}
                        sizes="300px"
                      />
                    </div>
                    <div style={{ padding: '16px 16px 24px' }}>
                      <h3 className="font-portrait mb-1" style={{ fontSize: '20px', color: 'var(--color-text-primary)' }}>{member.name}</h3>
                      <p className="label-gallery mb-2" style={{ color: 'var(--color-badge-mint)' }}>{member.role}</p>
                      <p style={{ fontSize: '13px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)' }}>{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '80px 0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: 'var(--color-field-forest)', borderRadius: 'var(--radius-cards)', padding: '60px 40px', textAlign: 'left', border: '1px solid var(--color-border)' }}
            >
              <span className="badge-gallery badge-gold inline-flex mb-5">Join Us</span>
              <h2 className="font-portrait mb-4" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Want to Join Our Team?</h2>
              <p className="mb-8" style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '480px' }}>
                We&apos;re always looking for passionate individuals who want to make a difference
              </p>
              <Link href="/contact">
                <button className="btn-filled-pill">Get in Touch <ArrowRight size={14} /></button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
