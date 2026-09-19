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
import { useState } from "react";
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
  // Hero Section Data
  const heroData = {
    headline: "Evolve Your Future with Himmatkaar!",
    urduHeadline: "ہمت کار",
    primaryCTA: { text: "Apply for Himmatkaar LaunchPad" },
    secondaryCTA: { text: "Learn More", href: "/about" },
    heroImages: [
      "/home-page-carosel/1.jpg",
      "/home-page-carosel/2.jpg",
      "/home-page-carosel/3.jpg",
      "/home-page-carosel/4.jpeg",
      "/home-page-carosel/5.jpeg"
    ]
  };

  // Partner Logos
  const partnerLogos = [
    "/partners/the-cabinet.png",
    "/partners/partner2.png"
  ];

  const techPartnerLogos = [
    "/partners/tech1.png",
    "/partners/tech2.png"
  ];

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
        <section className="bg-[#08170d] py-20 md:py-28 border-t border-[#1a3a24] relative overflow-hidden">
          {/* Ambient Glow */}
          <div 
            className="absolute -top-32 right-10 w-[450px] h-[450px] bg-[#0ae448]/10 blur-[130px] pointer-events-none rounded-full" 
            aria-hidden="true" 
          />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-[#0e2417] rounded-2xl p-6 sm:p-10 lg:p-14 border border-[#1a3a24] relative overflow-hidden shadow-2xl">
              {/* Inner card subtle glow */}
              <div 
                className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[#0ae448]/5 blur-[80px] pointer-events-none rounded-full" 
                aria-hidden="true" 
              />

              <div className="relative z-10">
                {/* Section Eyebrow & Title */}
                <div className="mb-10 text-center max-w-3xl mx-auto">
                  <div className="mb-3">
                    <span className="annotation-curly">
                      &#123; Our Flagship Program &#125;
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.08]">
                    Himmatkaar{" "}
                    <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                      LaunchPad!
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal">
                    Transform from student to professional in just 12 weeks. Click any identity card below to explore its details.
                  </p>
                </div>

                {/* ── Interactive Identity Cards (Color Changes On Click) ── */}
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
                      highlights: ["Executive Presence & Public Speaking", "CV & Portfolio Optimization", "Modern Tooling & AI Mastery"]
                    },
                    {
                      id: "mentorship",
                      phase: "Phase 02",
                      title: "1-on-1 Mentorship",
                      duration: "Weekly",
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
                      tagline: "Real-World Work Experience",
                      description: "6 weeks of hands-on placement in vetted partner organizations to work on live projects and build real commercial experience.",
                      highlights: ["Live Company Placement", "Real Project Deliverables", "Performance Evaluation"]
                    },
                    {
                      id: "placement",
                      phase: "Phase 04",
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
                        className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden select-none ${
                          isActive
                            ? "bg-[#0ae448] text-[#08170d] border-[#0ae448] shadow-[0_0_30px_rgba(10,228,72,0.4)] scale-[1.02]"
                            : "bg-[#08170d] text-white border-[#1a3a24] hover:border-[#0ae448]/50 hover:bg-[#0e2417]"
                        }`}
                      >
                        {/* Top Phase & Stat Pill */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                              isActive
                                ? "bg-[#08170d] text-[#0ae448] border-[#08170d]"
                                : "bg-[#0e2417] text-[#0ae448] border-[#1a3a24]"
                            }`}>
                              {identity.phase}
                            </span>
                            <span className={`font-mono text-xs font-semibold ${
                              isActive ? "text-[#08170d]/80" : "text-[#8ea896]"
                            }`}>
                              {identity.duration}
                            </span>
                          </div>

                          {/* Icon & Title */}
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className={isActive ? "text-[#08170d]" : "text-[#0ae448]"}>
                              {identity.icon}
                            </div>
                            <h3 className={`text-lg font-bold tracking-tight ${
                              isActive ? "text-[#08170d]" : "text-white"
                            }`}>
                              {identity.title}
                            </h3>
                          </div>
                          <p className={`text-xs font-mono font-medium mb-3 ${
                            isActive ? "text-[#08170d]/90" : "text-[#a8d5b5]"
                          }`}>
                            {identity.tagline}
                          </p>
                        </div>

                        {/* Interactive Click Indicator */}
                        <div className="pt-3 border-t border-current/10 flex items-center justify-between text-xs font-mono font-bold">
                          <span>{isActive ? "✓ Active Selected" : "Click to Select"}</span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "translate-x-1" : ""}`} />
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
                        title: "Intensive Training",
                        duration: "6 Weeks",
                        icon: <BookOpen className="w-5 h-5 flex-shrink-0 text-[#0ae448]" />,
                        tagline: "Skill Acceleration & Workshops",
                        description: "6 weeks of interactive, high-impact sessions covering CV strategy, LinkedIn branding, executive communication, and AI tools.",
                        highlights: ["Executive Presence & Public Speaking", "CV & Portfolio Optimization", "Modern Tooling & AI Mastery"]
                      },
                      {
                        id: "mentorship",
                        phase: "Phase 02",
                        title: "1-on-1 Mentorship",
                        duration: "Weekly",
                        icon: <Users className="w-5 h-5 flex-shrink-0 text-[#0ae448]" />,
                        tagline: "Dedicated Corporate Mentors",
                        description: "Personalized 1-on-1 weekly guidance from corporate executives and industry leaders to hone leadership and interview readiness.",
                        highlights: ["1:1 Mentorship Sessions", "Mock Interview Drills", "Customized Career Roadmap"]
                      },
                      {
                        id: "internship",
                        phase: "Phase 03",
                        title: "Industry Internship",
                        duration: "6 Weeks",
                        icon: <TrendingUp className="w-5 h-5 flex-shrink-0 text-[#0ae448]" />,
                        tagline: "Real-World Work Experience",
                        description: "6 weeks of hands-on placement in vetted partner organizations to work on live projects and build real commercial experience.",
                        highlights: ["Live Company Placement", "Real Project Deliverables", "Performance Evaluation"]
                      },
                      {
                        id: "placement",
                        phase: "Phase 04",
                        title: "Career Placement",
                        duration: "25 Seats",
                        icon: <Award className="w-5 h-5 flex-shrink-0 text-[#0ae448]" />,
                        tagline: "Employment & Alumni Network",
                        description: "Direct talent pipeline to hiring corporate partners, job referrals, and lifetime access to the Himmatkaar alumni community.",
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
                        className="bg-[#08170d] rounded-xl p-6 sm:p-8 border border-[#1a3a24] relative overflow-hidden shadow-xl"
                      >
                        <div className="grid lg:grid-cols-3 gap-6 items-center">
                          <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs font-bold uppercase text-[#0ae448] bg-[#0e2417] px-3 py-1 rounded-full border border-[#1a3a24]">
                                Selected Identity: {activeData.phase}
                              </span>
                              <span className="font-mono text-xs text-[#8ea896]">
                                ({activeData.duration})
                              </span>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">
                              {activeData.title}
                            </h4>
                            <p className="text-sm sm:text-base text-[#8ea896] leading-relaxed mb-4">
                              {activeData.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {activeData.highlights.map((h, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0e2417] border border-[#1a3a24] text-[#a8d5b5] flex items-center gap-1.5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0ae448]" />
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 justify-center">
                            <button
                              onClick={() => setIsNextCohortModalOpen(true)}
                              className="btn-gsap-cta justify-center w-full"
                            >
                              Apply for LaunchPad <ArrowRight size={16} />
                            </button>
                            <Link href="/launchpad" className="w-full">
                              <button className="btn-gsap-ghost justify-center w-full">
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
