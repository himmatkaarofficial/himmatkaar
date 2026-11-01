"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Award, CheckCircle2, Sparkles, TrendingUp, Users, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const testimonials = [
  {
    id: "1",
    name: "Ahmed Khan",
    role: "Software Engineer at Systems Ltd",
    location: "Karachi",
    image: "/himmatkaar-logo.jpg",
    track: "Tech & Software Readiness",
    text: "HimmatKaar transformed my career trajectory. The fellowship taught me not just technical skills, but how to think critically and communicate effectively during tough technical interviews. Within 2 months of completing the program, I landed my dream job!",
    rating: 5
  },
  {
    id: "2",
    name: "Fatima Ali",
    role: "Brand Marketing Specialist",
    location: "Lahore",
    image: "/himmatkaar-logo.jpg",
    track: "Corporate Communication",
    text: "The confidence I gained through HimmatKaar is invaluable. The public speaking sessions and resume masterclasses prepared me for real-world corporate challenges. I'm now leading a team of 10 people and couldn't be happier!",
    rating: 5
  },
  {
    id: "3",
    name: "Hassan Raza",
    role: "Data Analytics Associate",
    location: "Islamabad",
    image: "/himmatkaar-logo.jpg",
    track: "Analytics & Problem Solving",
    text: "Coming from a smaller campus, I was unsure if I could compete with tier-1 graduates. HimmatKaar showed me that with the right mindset, mentorship, and practical projects, anything is possible. Forever grateful to my facilitators!",
    rating: 5
  },
  {
    id: "4",
    name: "Ayesha Malik",
    role: "Product Designer",
    location: "Faisalabad",
    image: "/himmatkaar-logo.jpg",
    track: "Creative & Design Leadership",
    text: "The fellowship's focus on lifelong learning changed my perspective entirely. I learned how to learn and adapt rapidly, which has been crucial in my fast-paced design career. The skills I gained apply across all aspects of my career.",
    rating: 5
  },
  {
    id: "5",
    name: "Ali Hussain",
    role: "Business Operations Analyst",
    location: "Multan",
    image: "/himmatkaar-logo.jpg",
    track: "Operations & Strategy",
    text: "HimmatKaar didn't just teach me hard skills; it gave me an unshakeable community of like-minded peers. The networking opportunities and alumni support were as valuable as the formal curriculum itself.",
    rating: 5
  },
  {
    id: "6",
    name: "Sara Ahmed",
    role: "People & Talent Associate",
    location: "Peshawar",
    image: "/himmatkaar-logo.jpg",
    track: "HR & Talent Development",
    text: "The mock interview preparation and executive presence modules were true game-changers. I went from feeling nervous in interviews to presenting my portfolio with total confidence. Received multiple offers within weeks!",
    rating: 5
  }
];

const satisfactionStats = [
  { id: "stat1", number: "92%", label: "Would Recommend to a Friend", icon: ThumbsUp, desc: "Fellows who actively advocate for our fellowship" },
  { id: "stat2", number: "88%", label: "Placement & Promotion Rate", icon: TrendingUp, desc: "Secured employment or promotion within 90 days" },
  { id: "stat3", number: "95%", label: "Overall Mentorship Satisfaction", icon: Award, desc: "Rated 5-stars across all facilitator evaluations" }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Testimonials() {
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string>("1");
  const [selectedStatId, setSelectedStatId] = useState<string>("stat1");

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── Page Hero ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1d442a]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest">
                  <Sparkles size={14} className="text-[#f3ae29]" />
                  <span>Verified Fellow Outcomes</span>
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-[1.08]"
              >
                Stories of{" "}
                <span className="text-[#389456]">
                  Courage & Success
                </span>
                <span className="font-urdu block text-2xl sm:text-3xl lg:text-4xl text-[#f3ae29] font-normal mt-2">
                  ہمت کار کامیابی کی کہانیاں
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg lg:text-xl text-[#d1e7d8] max-w-2xl mx-auto leading-relaxed font-normal"
              >
                Hear directly from our ambitious alumni across Pakistan who transitioned from classroom theory into high-impact careers through HimmatKaar.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Featured Spotlight Carousel ── */}
        <section className="bg-[#0c2616] py-14 px-4 sm:px-6 border-b border-[#1d442a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#f3ae29] block mb-1">Spotlight Highlights</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white">Featured Fellow Transformations</h2>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        {/* ── CRISP WHITE SECTION: All Voices Grid (Interactive Click-to-Change) ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  <Users size={14} className="text-[#2d7a46]" /> Interactive Voices Wall
                </span>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0c2616] tracking-tight">
                  Alumni Reviews & Testimonials
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Click any card to highlight their story and read their full reflection.
                </p>
              </div>

              <div className="p-3 px-4 rounded-xl bg-white border border-[#2d7a46]/30 shadow-sm flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2d7a46] animate-pulse" />
                <span className="text-xs font-medium text-slate-700">
                  Select a review to highlight
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => {
                const isSelected = selectedTestimonialId === testimonial.id;
                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setSelectedTestimonialId(testimonial.id)}
                    className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl ring-2 ring-[#2d7a46]/40 scale-[1.02]"
                        : "bg-white text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top bar with rating and track */}
                      <div className="flex justify-between items-start mb-5">
                        <Quote className={`w-8 h-8 transition-colors ${isSelected ? "text-[#389456]" : "text-[#2d7a46]/40"}`} />
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-[#f3ae29] fill-[#f3ae29]" size={14} />
                          ))}
                        </div>
                      </div>

                      {/* Track badge */}
                      <div className="mb-3">
                        <span className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider ${
                          isSelected ? "bg-[#163e24] text-[#f3ae29] border border-[#2d7a46]" : "bg-[#e8f5ec] text-[#2d7a46]"
                        }`}>
                          {testimonial.track}
                        </span>
                      </div>
                      
                      <p className={`text-sm sm:text-base mb-6 leading-relaxed ${
                        isSelected ? "text-[#d1e7d8]" : "text-slate-600 group-hover:text-slate-900"
                      }`}>
                        &quot;{testimonial.text}&quot;
                      </p>
                    </div>
                    
                    <div className={`flex items-center gap-3 pt-4 border-t ${
                      isSelected ? "border-[#1d442a]" : "border-slate-100"
                    }`}>
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#2d7a46]/30 relative shrink-0">
                        <Image 
                          src={testimonial.image} 
                          alt={`${testimonial.name} - ${testimonial.role}`}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className={`font-bold text-sm truncate ${isSelected ? "text-white" : "text-[#0c2616]"}`}>
                            {testimonial.name}
                          </h4>
                          {isSelected && <CheckCircle2 size={13} className="text-[#389456] shrink-0" />}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? "text-[#a3caad]" : "text-slate-600"}`}>
                          {testimonial.role}
                        </p>
                        <p className={`text-[10px] font-mono ${isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"}`}>
                          {testimonial.location}, Pakistan
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CRISP WHITE SECTION 2: Measurable Impact Metrics ── */}
        <section className="bg-white py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Award size={14} className="text-[#2d7a46]" /> Concrete Track Record
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#0c2616] mb-4 tracking-tight">
              The HimmatKaar Advantage
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-12 text-sm sm:text-base">
              Click any metric card below to review how we consistently deliver high-impact results for fellows.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {satisfactionStats.map((stat) => {
                const IconComponent = stat.icon;
                const isSelected = selectedStatId === stat.id;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedStatId(stat.id)}
                    className={`cursor-pointer rounded-2xl p-8 border transition-all duration-300 text-left ${
                      isSelected
                        ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl ring-2 ring-[#2d7a46]/40 scale-105"
                        : "bg-[#f8faf7] text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent size={28} className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"} />
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#389456] bg-[#163e24] px-2 py-0.5 rounded">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className={`text-4xl sm:text-5xl font-extrabold mb-2 font-mono ${
                      isSelected ? "text-[#389456]" : "text-[#0c2616]"
                    }`}>
                      {stat.number}
                    </div>
                    <div className={`text-sm font-bold uppercase tracking-wide mb-2 ${
                      isSelected ? "text-white" : "text-slate-800"
                    }`}>
                      {stat.label}
                    </div>
                    <p className={`text-xs ${
                      isSelected ? "text-[#d1e7d8]" : "text-slate-600"
                    }`}>
                      {stat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
