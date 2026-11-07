"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Zap, Users, BookOpen } from "lucide-react";

interface HeroSectionProps {
  badge?: string;
  headline: string;
  primaryCTA: { text: string; href?: string };
  secondaryCTA: { text: string; href: string };
  heroImages: string[];
  onPrimaryClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = "FAISALABAD'S LEADING YOUTH EMPOWERMENT PLATFORM",
  headline = "Evolve Your Future with Himmatkaar!",
  primaryCTA,
  secondaryCTA,
  heroImages,
  onPrimaryClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-[94vh] bg-[#0a2012] text-white flex items-center overflow-hidden pt-12 pb-16">
      {/* Background Carousel with Smooth Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImages[currentImageIndex]}
            alt={`Himmatkaar Community ${currentImageIndex + 1}`}
            fill
            priority={currentImageIndex === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Refined Forest Green Gradient Overlays (Clear Image Visibility) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07190e]/80 via-[#0a2012]/50 to-[#07190e]/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a2012]/90 via-transparent to-black/20" />
      <div className="absolute inset-0 z-10 bg-radial-grid opacity-30 pointer-events-none" />

      

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-12 sm:pt-12 sm:pb-16">
        
        {/* Top Eyebrow Badge (Soft Rounded Rectangle) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex"
        >
          <span className="badge-category-green !rounded-lg !px-3.5 !py-1.5 !text-xs !bg-[#0c2616]/90 !border-[#275836] !text-[#d1e7d8]">
            <span className="w-1.5 h-1.5 rounded-sm bg-[#f3ae29] inline-block" />
            {badge}
          </span>
        </motion.div>

        {/* Playfair Display Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="font-serif-heading mb-6 text-white font-bold leading-[1.08] tracking-tight max-w-4xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Evolve Your Future with{" "}
          <span className="text-[#389456] italic">
            Himmatkaar!
          </span>
        </motion.h1>

        {/* Quote Callout Box with Green Border */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mb-8 p-4 sm:p-5 rounded-xl bg-[#0c2616]/80 border-l-4 border-l-[#389456] border border-[#1d442a] backdrop-blur-md"
        >
          <p className="text-base sm:text-lg leading-relaxed text-[#d1e7d8] font-normal">
            &ldquo;We cultivate a powerful ecosystem of ambitious Pakistani youth, equipping them with professional mastery, high-impact mentorship, and industry career pathways.&rdquo;
          </p>
        </motion.div>

        {/* Soft Rounded CTA Buttons (Strictly No Pill Shapes) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center max-w-md sm:max-w-none mb-10"
        >
          {onPrimaryClick ? (
            <button
              onClick={onPrimaryClick}
              className="btn-gsap-cta text-center justify-center cursor-pointer !rounded-xl"
            >
              <span>{primaryCTA.text || "APPLY FOR LAUNCHPAD"}</span>
              <ArrowUpRight size={18} className="text-[#f3ae29]" />
            </button>
          ) : (
            <Link href={primaryCTA.href || "/launchpad"} className="btn-gsap-cta text-center justify-center !rounded-xl">
              <span>{primaryCTA.text || "APPLY FOR LAUNCHPAD"}</span>
              <ArrowUpRight size={18} className="text-[#f3ae29]" />
            </Link>
          )}
          <Link href={secondaryCTA.href || "/about"} className="btn-gsap-ghost text-center justify-center !rounded-xl">
            {secondaryCTA.text || "Learn More"}
          </Link>
        </motion.div>

        {/* Key Feature Badges (Naked Icons - No Circular Wrappers) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center gap-6 sm:gap-8 flex-wrap pt-4 border-t border-[#1d442a]/80 text-xs sm:text-sm text-[#a3caad]"
        >
          <div className="flex items-center gap-2.5">
            <Zap size={18} className="text-[#f3ae29] flex-shrink-0" />
            <span className="font-medium text-[#e8f5ec]">12-Week Accelerator</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={18} className="text-[#389456] flex-shrink-0" />
            <span className="font-medium text-[#e8f5ec]">Mentorship & Networking</span>
          </div>
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-[#389456] flex-shrink-0" />
            <span className="font-medium text-[#e8f5ec]">Technical Practical Workshops</span>
          </div>
        </motion.div>
      </div>

      {/* Screen Edge Arrow Controls (Soft Rounded Rectangles) */}
      <button
        onClick={prevImage}
        className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} className="text-[#e8f5ec]" />
      </button>

      <button
        onClick={nextImage}
        className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-xl border border-[#1d442a] bg-[#0c2616]/80 hover:bg-[#10321e] hover:border-[#389456] transition-all backdrop-blur-md"
        aria-label="Next image"
      >
        <ChevronRight size={22} className="text-[#e8f5ec]" />
      </button>

      {/* Bottom Center Amber/Gold Indicators (Soft Rectangles) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="h-2 rounded-sm transition-all duration-300"
            style={{
              width: index === currentImageIndex ? "28px" : "10px",
              background: index === currentImageIndex ? "#f3ae29" : "rgba(232, 245, 236, 0.25)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

