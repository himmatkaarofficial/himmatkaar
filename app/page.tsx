"use client";

import {
  Users,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Globe,
  Award,
  Rocket,
  Code,
  Network,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextCohortModal from "@/components/NextCohortModal";
import {
  HeroSection,
  PartnerMarquee,
  AboutSection,
  ProgramTracksSection,
  OfferingsSection,
  StatsBar,
  EventsSection,
  TestimonialsSection,
  NewsletterSection
} from "@/components/sections";

export default function Home() {
  const [partnerLogos, setPartnerLogos] = useState<string[]>([
    "/partners/the-cabinet.png",
    "/partners/partner2.png"
  ]);

  const [techPartnerLogos, setTechPartnerLogos] = useState<string[]>([
    "/partners/tech1.png",
    "/partners/tech2.png"
  ]);

  useEffect(() => {
    async function fetchPartnerLogos() {
      try {
        const res = await fetch("/api/partners", { cache: "no-store" });
        const data = await res.json();
        if (data.partners && data.partners.length > 0) {
          const managing = data.partners
            .filter((p: any) => p.category === "managing" && p.logo_url)
            .map((p: any) => p.logo_url);
          const tech = data.partners
            .filter((p: any) => p.category === "tech" && p.logo_url)
            .map((p: any) => p.logo_url);

          if (managing.length > 0) setPartnerLogos(managing);
          if (tech.length > 0) setTechPartnerLogos(tech);
        }
      } catch (err) {
        console.error("Failed to fetch partner logos:", err);
      }
    }
    fetchPartnerLogos();
  }, []);

  const [homeHeroImages, setHomeHeroImages] = useState<string[]>([
    "/home-page-carosel/1.jpg",
    "/home-page-carosel/2.jpg",
    "/home-page-carosel/3.jpg",
    "/home-page-carosel/4.jpeg",
    "/home-page-carosel/5.jpeg"
  ]);

  useEffect(() => {
    async function fetchHomeHeroSlides() {
      try {
        const res = await fetch("/api/hero-slides?section=home");
        const data = await res.json();
        if (data.slides && data.slides.length > 0) {
          setHomeHeroImages(data.slides.map((s: { image?: string }) => s.image || "/home-page-carosel/1.jpg"));
        }
      } catch (err) {
        console.error("Failed to fetch home hero slides:", err);
      }
    }
    fetchHomeHeroSlides();
  }, []);

  // Hero Section Data
  const heroData = {
    headline: "Evolve Your Future with Himmatkaar!",
    urduHeadline: "ہمت کار",
    primaryCTA: { text: "Apply for Himmatkaar LaunchPad" },
    secondaryCTA: { text: "Learn More", href: "/about" },
    heroImages: homeHeroImages
  };

  // About Section Data
  const aboutData = {
    image: "/about-hero.jpg",
    heading: "Faisalabad's Leading Youth Empowerment Platform",
    description: [
      "Himmatkaar is Faisalabad's premier youth empowerment platform, driving the growth of the next generation of leaders. We provide comprehensive support through mentorship, skill development, and community engagement.",
      "Our mission is to cultivate a strong resource pool to support young innovators and change-makers across Pakistan, helping them transform their ideas into impactful initiatives that benefit their communities."
    ],
    stats: [
      { value: "1,000+", label: "Youth Empowered" },
      { value: "50+", label: "Events Hosted" }
    ]
  };

  // Program Tracks Data
  const programTracks = [
    {
      icon: <Rocket size={36} />,
      title: "Launchpad",
      description: "Launch your innovative projects with Himmatkaar's comprehensive support and mentorship",
      href: "/launchpad"
    },
    {
      icon: <Code size={36} />,
      title: "Technical Workshops",
      description: "Skill-building technical workshops and practical training sessions for career readiness",
      href: "/technical-workshops"
    },
    {
      icon: <Network size={36} />,
      title: "Networking Events",
      description: "Connect with mentors, industry leaders, and peers to build meaningful relationships",
      href: "/networking-events"
    }
  ];

  // Offerings Data
  const offerings = [
    {
      icon: <Award size={36} />,
      title: "Professional Branding",
      description: "Build a strong personal brand that stands out. Learn to craft your unique value proposition and present yourself professionally across all platforms."
    },
    {
      icon: <Users size={36} />,
      title: "Executive Communication",
      description: "Master the art of professional communication. Develop skills in public speaking, presentation, and effective business correspondence."
    },
    {
      icon: <TrendingUp size={36} />,
      title: "Corporate Readiness",
      description: "Prepare for the corporate world with essential workplace skills, professional etiquette, and industry-standard practices."
    },
    {
      icon: <BookOpen size={36} />,
      title: "Technical Workshops",
      description: "Hands-on training in cutting-edge technologies and tools. Stay ahead with practical skills that employers are looking for."
    },
    {
      icon: <Globe size={36} />,
      title: "Networking Events",
      description: "Connect with industry leaders, mentors, and peers. Build meaningful relationships that open doors to new opportunities."
    },
    {
      icon: <Lightbulb size={36} />,
      title: "Employability Excellence",
      description: "Comprehensive career development support including resume building, interview preparation, and job search strategies."
    }
  ];

  // Stats Data
  const stats = [
    { value: 1, suffix: "+", label: "Years of Operation" },
    { value: 1000, suffix: "+", label: "Student Impact" },
    { value: 10, suffix: "+", label: "Events Organized" },
    { value: 20, suffix: "+", label: "Staff Employs" }
  ];

  const [isNextCohortModalOpen, setIsNextCohortModalOpen] = useState(false);
  const [activeIdentity, setActiveIdentity] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#08170d] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection {...heroData} onPrimaryClick={() => setIsNextCohortModalOpen(true)} />

        {/* Partner Marquees */}
        <PartnerMarquee title="Our Managing Partners" logos={partnerLogos} />
        <PartnerMarquee title="Our Tech Partners" logos={techPartnerLogos} reverse={true} />

        {/* About Section */}
        <AboutSection {...aboutData} />

        {/* Program Tracks Section */}
        <ProgramTracksSection tracks={programTracks} />

        {/* Offerings Section */}
        <OfferingsSection offerings={offerings} />

        {/* Stats Bar */}
        <StatsBar stats={stats} />

        {/* ── Himmatkaar Launchpad Feature Section ── */}
        <section id="launchpad" className="bg-[#0a2012] py-20 md:py-28 border-t border-[#1d442a] relative overflow-hidden">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#0c2616] rounded-2xl p-6 sm:p-10 lg:p-14 border border-[#1d442a] relative overflow-hidden shadow-2xl">
              
              {/* Urdu watermark in background */}
              <div 
                className="absolute -right-10 -bottom-10 font-urdu text-9xl sm:text-[180px] text-[#2d7a46]/10 select-none pointer-events-none"
                dir="rtl"
              >
                ہمت کار
              </div>

              <div className="relative z-10">
                {/* Section Eyebrow & Title */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                  <div className="mb-3">
                    <span className="annotation-curly">
                      Our Flagship Program
                    </span>
                  </div>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
                    Himmatkaar{" "}
                    <span className="text-[#389456] italic">
                      LaunchPad!
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-[#a3caad] font-normal">
                    Transform from university student to industry professional in just 12 weeks. Explore each module of our fellowship below.
                  </p>
                </div>

                {/* ── 4 Key Stat / Phase Cards (Soft Rounded Rectangles, Naked Icons) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {[
                    {
                      id: "training",
                      phase: "Phase 01",
                      title: "Intensive Training",
                      duration: "6 Weeks",
                      icon: <BookOpen className="w-5 h-5 flex-shrink-0" />,
                      tagline: "Skill Acceleration & Workshops",
                      description: "6 weeks of interactive, high-impact sessions covering CV strategy, LinkedIn branding, executive communication, and AI tools.",
                      highlights: ["Executive Presence & Speaking", "CV & Portfolio Optimization", "Modern Tooling & AI Mastery"]
                    },
                    {
                      id: "mentorship",
                      phase: "Phase 02",
                      title: "1-on-1 Mentorship",
                      duration: "Ongoing",
                      icon: <Users className="w-5 h-5 flex-shrink-0" />,
                      tagline: "Dedicated Corporate Mentors",
                      description: "Personalized 1-on-1 weekly guidance from corporate executives and industry leaders to hone leadership and interview readiness.",
                      highlights: ["1:1 Mentorship Sessions", "Mock Interview Drills", "Customized Career Roadmap"]
                    },
                    {
                      id: "internship",
                      phase: "Phase 03",
                      title: "Industry Internship",
                      duration: "6 Weeks",
                      icon: <TrendingUp className="w-5 h-5 flex-shrink-0" />,
                      tagline: "Real-World Work Placement",
                      description: "6 weeks of hands-on placement in vetted partner organizations to work on live projects and build real commercial experience.",
                      highlights: ["Live Company Placement", "Real Project Deliverables", "Performance Evaluation"]
                    },
                    {
                      id: "placement",
                      phase: "Cohort Limit",
                      title: "Career Placement",
                      duration: "25 Seats",
                      icon: <Award className="w-5 h-5 flex-shrink-0" />,
                      tagline: "Employment & Alumni Network",
                      description: "Direct talent pipeline to hiring corporate partners, job referrals, and lifetime access to the Himmatkaar alumni community.",
                      highlights: ["Corporate Hiring Pipeline", "Job Referrals & Endorsements", "Lifetime Alumni Community"]
                    }
                  ].map((identity, index) => {
                    const isActive = activeIdentity === index;
                    return (
                      <motion.div
                        key={identity.id}
                        onClick={() => setActiveIdentity(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`cursor-pointer rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden select-none shadow-lg ${
                          isActive
                            ? "bg-[#10321e] text-white border-[#389456] shadow-[0_8px_30px_rgba(45,122,70,0.3)] scale-[1.02]"
                            : "bg-[#0a2012] text-white border-[#1d442a] hover:border-[#389456]/60 hover:bg-[#10321e]/60"
                        }`}
                      >
                        <div>
                          {/* Top Phase & Stat */}
                          <div className="flex items-center justify-between mb-4">
                            <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                              isActive
                                ? "bg-[#2d7a46] text-white border-[#389456]"
                                : "bg-[#0c2616] text-[#a3caad] border-[#1d442a]"
                            }`}>
                              {identity.phase}
                            </span>
                            <span className="font-mono text-xs font-semibold text-[#f3ae29]">
                              {identity.duration}
                            </span>
                          </div>

                          {/* Naked Icon & Title */}
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className={isActive ? "text-[#f3ae29]" : "text-[#389456]"}>
                              {identity.icon}
                            </div>
                            <h3 className="font-serif-heading text-lg font-bold tracking-tight text-white">
                              {identity.title}
                            </h3>
                          </div>
                          <p className="text-xs font-mono text-[#a3caad] mb-3">
                            {identity.tagline}
                          </p>
                        </div>

                        {/* Interactive Indicator */}
                        <div className="pt-3 border-t border-[#1d442a] flex items-center justify-between text-xs font-mono">
                          <span className={isActive ? "text-[#f3ae29] font-bold" : "text-[#a3caad]/70"}>
                            {isActive ? "✓ Selected Phase" : "Click to view"}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 text-[#389456] transition-transform ${isActive ? "translate-x-1" : ""}`} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Active Identity Detailed Preview Box ── */}
                <AnimatePresence mode="wait">
                  {(() => {
                    const activeData = [
                      {
                        id: "training",
                        phase: "Phase 01",
                        title: "Intensive Training & Core Foundations",
                        duration: "Weeks 01–06",
                        tagline: "Skill Acceleration & Workshops",
                        description: "6 weeks of interactive, high-impact sessions covering CV strategy, LinkedIn branding, executive communication, and AI enablement for top-tier roles.",
                        highlights: ["Executive Presence & Public Speaking", "CV & Portfolio Optimization", "Modern Tooling & AI Mastery"]
                      },
                      {
                        id: "mentorship",
                        phase: "Phase 02",
                        title: "1-on-1 Mentorship & Leadership Coaching",
                        duration: "Ongoing Throughout 12 Weeks",
                        tagline: "Dedicated Corporate Mentors",
                        description: "Personalized 1-on-1 weekly guidance from corporate executives and industry leaders to hone leadership, strategic thinking, and interview readiness.",
                        highlights: ["1:1 Mentorship Sessions", "Mock Interview Drills", "Customized Career Roadmap"]
                      },
                      {
                        id: "internship",
                        phase: "Phase 03",
                        title: "Industry Internship & Live Projects",
                        duration: "Weeks 07–12",
                        tagline: "Real-World Work Experience",
                        description: "6 weeks of hands-on placement in vetted partner organizations to work on live projects and build real commercial experience.",
                        highlights: ["Live Company Placement", "Real Project Deliverables", "Performance Evaluation"]
                      },
                      {
                        id: "placement",
                        phase: "Cohort Cap",
                        title: "Direct Career Placement & Network",
                        duration: "25 Seats per Cohort",
                        tagline: "Employment & Alumni Network",
                        description: "Direct talent pipeline to hiring corporate partners, job referrals, and lifetime access to the Himmatkaar alumni community across Pakistan.",
                        highlights: ["Corporate Hiring Pipeline", "Job Referrals & Endorsements", "Lifetime Alumni Community"]
                      }
                    ][activeIdentity];

                    return (
                      <motion.div
                        key={activeData.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#0a2012] rounded-2xl p-6 sm:p-8 border border-[#1d442a] relative overflow-hidden shadow-xl"
                      >
                        <div className="grid lg:grid-cols-3 gap-6 items-center">
                          <div className="lg:col-span-2">
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="font-mono text-xs font-bold uppercase text-[#f3ae29] bg-[#0c2616] px-3 py-1 rounded-md border border-[#1d442a]">
                                Selected: {activeData.phase}
                              </span>
                              <span className="font-mono text-xs text-[#a3caad]">
                                ({activeData.duration})
                              </span>
                            </div>
                            <h4 className="font-serif-heading text-2xl font-bold text-white mb-2 tracking-tight">
                              {activeData.title}
                            </h4>
                            <p className="text-sm sm:text-base text-[#d1e7d8] leading-relaxed mb-5">
                              {activeData.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {activeData.highlights.map((h, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0c2616] border border-[#1d442a] text-[#d1e7d8] flex items-center gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-sm bg-[#389456]" />
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 justify-center">
                            <button
                              onClick={() => setIsNextCohortModalOpen(true)}
                              className="btn-gsap-cta justify-center w-full !rounded-xl"
                            >
                              <span>Apply for LaunchPad</span>
                              <ArrowRight size={16} className="text-[#f3ae29]" />
                            </button>
                            <Link href="/launchpad" className="w-full">
                              <button className="btn-gsap-ghost justify-center w-full !rounded-xl">
                                Explore Full Program
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <EventsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      <Footer />

      {/* Next Cohort Modal */}
      <NextCohortModal
        isOpen={isNextCohortModalOpen}
        onClose={() => setIsNextCohortModalOpen(false)}
      />
    </div>
  );
}
