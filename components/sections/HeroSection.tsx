"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  badge?: string;
  headline: string;
  urduHeadline?: string;
  primaryCTA: { text: string; href?: string };
  secondaryCTA: { text: string; href: string };
  heroImages: string[];
  onPrimaryClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = "Faisalabad's Leading Youth Empowerment Platform",
  headline,
  urduHeadline = "ہمت کار",
  primaryCTA,
  secondaryCTA,
  heroImages,
  onPrimaryClick,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  /* Split headline to accent last word in electric green */
  const words = headline.split(" ");
  const accentWord = words[words.length - 1];
  const restWords = words.slice(0, -1).join(" ");

  return (
    <section className="relative bg-[#08170d] text-white flex items-center overflow-hidden py-6 sm:py-8">
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

      {/* Gradient Overlays for Image Visibility & Text Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#08170d] via-[#08170d]/65 to-[#08170d]/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#08170d] via-transparent to-[#08170d]/40" />

      {/* Subtle Ambient Green Glowing Orbs */}
      <div
        className="glow-green-orb w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] top-1/4 -left-20 z-10 opacity-30 pointer-events-none"
      />
      <div
        className="glow-green-orb w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bottom-10 right-10 z-10 opacity-20 pointer-events-none"
      />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24">

        {/* GSAP Curly-Bracket Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 sm:mb-6"
        >
          <span className="annotation-curly text-sm sm:text-base">
            {badge}
          </span>
        </motion.div>

        {/* Urdu Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[76px] leading-none mb-3 text-[#a8d5b5]"
          style={{
            fontFamily: "Noto Nastaliq Urdu, serif",
            direction: "rtl",
            fontWeight: 400,
          }}
        >
          {urduHeadline}
        </motion.div>

        {/* Hero Display Headline — Responsive Clamp */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mb-6 text-white font-bold leading-[1.05] tracking-tight max-w-4xl"
          style={{
            fontSize: "clamp(34px, 5.5vw, 68px)",
          }}
        >
          {restWords}{" "}
          <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
            {accentWord}
          </span>
        </motion.h1>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="max-w-2xl mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl leading-relaxed text-[#8ea896] font-normal"
        >
          Empowering youth with skills, mentorship, and opportunities to build a brighter future.
        </motion.p>

        {/* Outlined Pill CTA Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center max-w-md sm:max-w-none"
        >
          {onPrimaryClick ? (
            <button
              onClick={onPrimaryClick}
              className="btn-gsap-cta text-center justify-center cursor-pointer"
            >
              {primaryCTA.text} <ArrowRight size={18} className="text-[#0ae448]" />
            </button>
          ) : (
            <Link href={primaryCTA.href || "#"} className="btn-gsap-cta text-center justify-center">
              {primaryCTA.text} <ArrowRight size={18} className="text-[#0ae448]" />
            </Link>
          )}
          <Link href={secondaryCTA.href} className="btn-gsap-ghost text-center justify-center">
            {secondaryCTA.text}
          </Link>
        </motion.div>

        {/* Trust Badges in Green & White Minimal Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-4 sm:gap-6 mt-10 sm:mt-12 flex-wrap text-xs sm:text-sm text-[#8ea896]"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0ae448]" />
            1,000+ Youth Empowered
          </span>
          <span className="text-[#1a3a24]">·</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0ae448]" />
            50+ Events Hosted
          </span>
          <span className="text-[#1a3a24]">·</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#0ae448]" />
            Free Programs
          </span>
        </motion.div>
      </div>

      {/* Carousel Navigation Arrows (Desktop & Tablet) */}
      <button
        onClick={prevImage}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full border border-white/20 bg-[#08170d]/60 hover:bg-[#0e2417] hover:border-[#0ae448] transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextImage}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 text-white p-3 rounded-full border border-white/20 bg-[#08170d]/60 hover:bg-[#0e2417] hover:border-[#0ae448] transition-all"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Carousel Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === currentImageIndex ? "32px" : "8px",
              background: index === currentImageIndex ? "#0ae448" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

