"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Linkedin, Loader2, ArrowUpRight, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, MapPin } from "lucide-react";
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

export default function Team() {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAmbassadorIndex, setSelectedAmbassadorIndex] = useState<number | null>(0);
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

  const displayCoreTeam = coreTeam.length > 0 ? coreTeam : DEFAULT_CORE_TEAM;
  const displayAmbassadors = ambassadors.length > 0 ? ambassadors : DEFAULT_AMBASSADORS;

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">

        {/* ── 1. Page Hero with Carousel (Dark Forest) ── */}
        <section className="relative text-white flex items-center overflow-hidden py-16 sm:py-20 min-h-[520px]">
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

          {/* Refined Vignette Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07190e]/80 via-[#0a2012]/50 to-[#0c2616]/25" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a2012]/90 via-transparent to-black/20" />
          <div className="absolute inset-0 z-10 bg-radial-grid opacity-30 pointer-events-none" />

          {/* Hero Content */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative z-20 w-full">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-sm font-mono text-[#a3caad] hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="badge-category-green !rounded-md !px-3 !py-1 !text-xs">
                  • Leadership & Mentors
                </span>
              </div>
              <h1 className="font-serif-heading mb-4 text-white font-bold leading-[1.08] tracking-tight max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
                Meet the People Behind{" "}
                <span className="text-[#389456] italic">
                  Himmatkaar!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#d1e7d8] max-w-2xl font-normal">
                Our dedicated team of professionals is committed to empowering youth across Pakistan and creating lasting impact in local communities.
              </p>
            </motion.div>
          </div>

          {/* Carousel controls */}
          <button
            onClick={prevImage}
            className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} className="text-[#e8f5ec]" />
          </button>
          <button
            onClick={nextImage}
            className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight size={22} className="text-[#e8f5ec]" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {TEAM_HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="h-2 rounded-sm transition-all duration-300"
                style={{
                  width: index === currentImageIndex ? '28px' : '8px',
                  background: index === currentImageIndex ? '#f3ae29' : 'rgba(232,245,236,0.3)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── 2. Core Team (Dark Forest Green) ── */}
        <section className="bg-[#0a2012] py-20 sm:py-24 border-t border-[#1d442a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <div className="mb-2">
                  <span className="annotation-curly">Leadership</span>
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Core <span className="text-[#389456] italic">Team!</span>
                </h2>
              </div>
              <Link href="/core-team" className="btn-gsap-ghost inline-flex items-center gap-2 !rounded-xl">
                <span>View Full Team</span>
                <ArrowUpRight size={16} className="text-[#f3ae29]" />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#389456]" size={40} />
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
                    onClick={() =>
                      setSelectedMemberForModal({
                        id: member.id,
                        name: member.name,
                        role: member.role,
                        bio: member.bio,
                        image: member.image,
                        linkedin: member.linkedin,
                        type: "core-team",
                      })
                    }
                    className="bg-[#0c2616] rounded-2xl border border-[#1d442a] hover:border-[#389456] hover:bg-[#10321e] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl cursor-pointer"
                  >
                    <div className="m-4 rounded-xl overflow-hidden relative h-60 border border-[#1d442a] bg-[#0a2012]">
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
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-[#0c2616]/90 border border-[#2d7a46] flex items-center justify-center text-[#f3ae29] hover:bg-[#2d7a46] hover:text-white transition-all z-10 shadow-lg"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                    
                    <div className="p-6 pt-1">
                      <h3 className="font-serif-heading text-xl font-bold text-white mb-1 group-hover:text-[#d1e7d8] transition-colors">{member.name}</h3>
                      <p className="text-xs font-mono text-[#389456] font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                      <p className="text-sm leading-relaxed text-[#a3caad] font-normal">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── 3. Campus Ambassadors (Crisp White / Light Section with Interactive Selection) ── */}
        <section className="bg-white py-20 sm:py-24 border-t border-[#e2ede4] text-[#07190e] relative">
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  • Campus Ambassadors
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08]">
                  Campus <span className="text-[#2d7a46] italic">Ambassadors!</span>
                </h2>
                <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed mt-2">
                  Our student leaders driving impact across Pakistan&apos;s leading universities. Click any card to select.
                </p>
              </div>
              <Link href="/ambassadors" className="btn-gsap-ghost !text-[#07190e] !border-[#d8e6db] hover:!border-[#2d7a46] inline-flex items-center gap-2 !rounded-xl">
                <span>View All Ambassadors</span>
                <ArrowUpRight size={16} className="text-[#2d7a46]" />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#2d7a46]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayAmbassadors.map((member, idx) => {
                  const isSelected = selectedAmbassadorIndex === idx;
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => {
                        setSelectedAmbassadorIndex(idx);
                        setSelectedMemberForModal({
                          id: member.id,
                          name: member.name,
                          role: member.role,
                          city: member.city,
                          bio: member.bio,
                          image: member.image,
                          linkedin: member.linkedin,
                          type: "ambassador",
                        });
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer select-none shadow-md ${
                        isSelected
                          ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                          : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                      }`}
                    >
                      <div className="m-4 rounded-xl overflow-hidden relative h-48 border border-[#d8e6db] bg-white">
                        <TeamCardImage
                          src={member.image}
                          alt={member.name}
                          name={member.name}
                          sizes="300px"
                        />
                        <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-md absolute top-3 left-3 flex items-center gap-1 uppercase border ${
                          isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-white/95 text-[#2d7a46] border-[#d8e6db]"
                        }`}>
                          <MapPin size={10} /> {member.city}
                        </span>
                      </div>
                      
                      <div className="p-5 pt-1 flex-1">
                        <h3 className={`font-serif-heading text-lg font-bold mb-1 ${
                          isSelected ? "text-white" : "text-[#07190e]"
                        }`}>
                          {member.name}
                        </h3>
                        <p className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2 ${
                          isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"
                        }`}>
                          {member.role}
                        </p>
                        <p className={`text-xs leading-relaxed ${
                          isSelected ? "text-[#d1e7d8]" : "text-[#4a6b53]"
                        }`}>
                          {member.bio}
                        </p>
                      </div>

                      <div className={`px-5 pb-4 pt-3 border-t text-xs font-mono flex items-center justify-between ${
                        isSelected ? "border-[#1d442a] text-[#f3ae29]" : "border-[#e2ede4] text-[#4a6b53]"
                      }`}>
                        <span>{isSelected ? "✓ Selected Ambassador" : "Click to select"}</span>
                        <span className={`text-[10px] font-bold ${isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}`}>
                          {isSelected ? "ACTIVE" : "SELECT →"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── 4. Join CTA ── */}
        <section className="bg-[#0a2012] py-20 sm:py-24 border-t border-[#1d442a]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0c2616] rounded-2xl p-8 sm:p-12 border border-[#1d442a] shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
              <div className="mb-3">
                <span className="annotation-curly">Join Us</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
                Want to Join <span className="text-[#389456] italic">Our Team?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#a3caad] mb-8 max-w-xl mx-auto font-normal leading-relaxed">
                We&apos;re always looking for passionate youth mentors, operators, and campus leaders who want to create lasting social impact.
              </p>
              <Link href="/contact">
                <button className="btn-gsap-cta inline-flex items-center gap-2 !rounded-xl !py-3.5 !px-8">
                  <span>Get in Touch</span>
                  <ArrowUpRight size={16} className="text-[#f3ae29]" />
                </button>
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

