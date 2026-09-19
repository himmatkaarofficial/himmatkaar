"use client";

import React from "react";
import Image from "next/image";
import { FadeInUp } from "@/components/animations/FadeInUp";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutSectionProps {
  image: string;
  heading: string;
  description: string[];
  stats?: Array<{ value: string; label: string }>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  image,
  heading,
  description,
  stats = [],
}) => {
  return (
    <section className="bg-[#08170d] py-20 sm:py-24 lg:py-28 relative border-t border-[#1a3a24]">
      {/* Subtle ambient light glow */}
      <div className="glow-green-orb w-[350px] h-[350px] -top-20 right-10 opacity-30" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column — Image & Nested Stat Grid */}
          <FadeInUp>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#1a3a24] bg-[#0e2417]">
                <Image
                  src={image}
                  alt="About Himmatkaar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Stat Cards — 8px radius GSAP nested panel */}
              {stats.length > 0 && (
                <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3.5 sm:gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-[#0e2417] rounded-lg p-5 sm:p-6 border border-[#1a3a24]"
                    >
                      <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-wider font-mono text-[#0ae448]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeInUp>

          {/* Right Column — Content */}
          <FadeInUp delay={0.2}>
            <div>
              {/* Curly Eyebrow */}
              <div className="mb-4 sm:mb-5">
                <span className="annotation-curly">
                  Why Himmatkaar®
                </span>
              </div>

              {/* Display Heading — Hero Style */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-6">
                Faisalabad&apos;s Leading Youth{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Empowerment Platform!
                </span>
              </h2>

              {/* Card-Based Description Blocks */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {description.map((paragraph, index) => (
                  <div
                    key={index}
                    className="bg-[#0e2417] rounded-xl p-5 sm:p-6 border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono text-[#0ae448] tracking-widest uppercase">
                        &#123; Pillar 0{index + 1} &#125;
                      </span>
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#8ea896] font-normal group-hover:text-white transition-colors">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Outlined Button */}
              <Link
                href="/about"
                className="btn-gsap-ghost inline-flex"
              >
                Learn More <ArrowRight size={18} className="text-[#0ae448]" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};


