"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  id?: string;
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string | null;
  rating?: number;
  feedback?: string;
  text?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Ahmed Khan",
    role: "Software Engineer",
    company: "Tech Corp",
    rating: 5,
    text: "HimmatKaar transformed my career trajectory completely. The fellowship taught me not just technical skills, but how to think critically and communicate effectively. Within 2 months of completing the program, I landed my dream job at a leading tech company!"
  },
  {
    name: "Fatima Ali",
    role: "Marketing Manager",
    company: "Digital Solutions",
    rating: 5,
    text: "The confidence I gained through HimmatKaar is invaluable. The public speaking sessions and resume workshops prepared me for real-world challenges. I am now leading a team of 10 people and could not be more grateful for this opportunity!"
  },
  {
    name: "Hassan Raza",
    role: "Data Analyst",
    company: "Analytics Pro",
    rating: 5,
    text: "Coming from a small town, I never thought I could compete with city students. HimmatKaar showed me that with the right mindset and skills, anything is possible. The mentorship and networking opportunities opened doors I never knew existed!"
  },
  {
    name: "Ayesha Malik",
    role: "Product Designer",
    company: "Creative Studio",
    rating: 5,
    text: "The fellowship's focus on lifelong learning changed my perspective entirely. I learned how to learn, which has been crucial in my fast-paced design career. The community support continues even after graduation. Highly recommend to everyone!"
  }
];

export default function TestimonialCarousel() {
  const [items, setItems] = useState<TestimonialItem[]>(defaultTestimonials);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data.testimonials && data.testimonials.length > 0) {
            setItems(data.testimonials);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => { emblaApi.off("select", onSelect); clearInterval(interval); };
  }, [emblaApi, items]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((testimonial, index) => {
            const feedbackText = testimonial.feedback || testimonial.text || "";
            const ratingCount = testimonial.rating ?? 5;
            const initials = testimonial.name
              ? testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "HK";

            return (
              <div key={testimonial.id || index} className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_80%] min-w-0 px-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-[#0c2616] rounded-2xl p-6 sm:p-10 md:p-12 border border-[#1d442a] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[340px]"
                >
                  {/* Urdu Calligraphy Background Watermark */}
                  <div
                    className="absolute -right-6 -bottom-8 font-urdu text-8xl sm:text-9xl text-[#2d7a46]/10 select-none pointer-events-none"
                    dir="rtl"
                  >
                    ہمت کار
                  </div>

                  <div>
                    {/* Top Row: Naked Quote Icon & Verified Member Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-[#389456]">
                        <Quote size={36} strokeWidth={1.5} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0a2012] border border-[#275836] font-mono text-xs text-[#a3caad]">
                        <CheckCircle2 size={13} className="text-[#389456]" />
                        VERIFIED MEMBER
                      </span>
                    </div>

                    {/* Rating indicators (Amber soft squares) */}
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(ratingCount)].map((_, i) => (
                        <span
                          key={i}
                          className="w-2.5 h-2.5 rounded-sm bg-[#f3ae29] inline-block"
                        />
                      ))}
                    </div>

                    {/* Testimonial text in Playfair Display serif or clean typography */}
                    <p className="mb-8 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#d1e7d8]">
                      &ldquo;{feedbackText}&rdquo;
                    </p>
                  </div>

                  {/* Author Credentials */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#1d442a]">
                    {testimonial.avatar_url ? (
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#275836] flex-shrink-0 bg-[#0a2012]">
                        <Image
                          src={testimonial.avatar_url}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#0a2012] border border-[#275836] text-[#389456] flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif-heading text-lg font-bold text-white tracking-tight">
                        {testimonial.name}
                      </h4>
                      {(testimonial.role || testimonial.company) && (
                        <p className="font-mono text-xs text-[#a3caad] mt-0.5">
                          {testimonial.role}{testimonial.role && testimonial.company ? " · " : ""}{testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows (Soft Rounded Rectangles) */}
      <button
        onClick={scrollPrev}
        className="absolute left-1 md:-left-5 top-1/2 -translate-y-1/2 rounded-xl p-3 bg-[#0c2616] border border-[#1d442a] text-[#d1e7d8] hover:text-white hover:border-[#389456] hover:bg-[#10321e] transition-all z-10 shadow-xl"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-1 md:-right-5 top-1/2 -translate-y-1/2 rounded-xl p-3 bg-[#0c2616] border border-[#1d442a] text-[#d1e7d8] hover:text-white hover:border-[#389456] hover:bg-[#10321e] transition-all z-10 shadow-xl"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      {/* Amber/Gold Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className="h-2 rounded-sm transition-all duration-300"
            style={{
              width: index === selectedIndex ? "28px" : "8px",
              background: index === selectedIndex ? "#f3ae29" : "#1d442a",
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
