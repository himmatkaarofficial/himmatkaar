"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => { emblaApi.off("select", onSelect); clearInterval(interval); };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_75%] min-w-0 px-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#0e2417] rounded-2xl p-6 sm:p-10 md:p-12 border border-[#1a3a24] shadow-xl relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="mb-6 text-[#0ae448]/80">
                  <Quote size={36} strokeWidth={1.5} />
                </div>

                {/* Rating Pills */}
                <div className="flex gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#0ae448] inline-block shadow-[0_0_6px_#0ae448]"
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="mb-8 text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author Details */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#08170d] border border-[#0ae448]/40 text-[#0ae448] flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold shadow-[0_0_10px_rgba(10,228,72,0.15)]">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="font-mono text-xs text-[#a8d5b5] mt-0.5">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-1 md:-left-5 top-1/2 -translate-y-1/2 rounded-full p-3 bg-[#0e2417] border border-[#1a3a24] text-white hover:text-[#0ae448] hover:border-[#0ae448]/60 transition-all z-10 shadow-lg"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-1 md:-right-5 top-1/2 -translate-y-1/2 rounded-full p-3 bg-[#0e2417] border border-[#1a3a24] text-white hover:text-[#0ae448] hover:border-[#0ae448]/60 transition-all z-10 shadow-lg"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === selectedIndex ? "32px" : "8px",
              background: index === selectedIndex ? "#0ae448" : "#1a3a24",
              boxShadow: index === selectedIndex ? "0 0 8px rgba(10, 228, 72, 0.4)" : "none",
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

