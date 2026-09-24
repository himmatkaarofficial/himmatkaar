"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, ArrowUpRight, Loader2, Users, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  status: string;
}

const EVENT_HERO_IMAGES = [
  "/events/event-slide-1.jpg",
  "/events/event-slide-2.jpg",
  "/events/event-slide-3.jpg",
  "/events/event-slide-4.jpg",
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(0);

  // Background carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % EVENT_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % EVENT_HERO_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + EVENT_HERO_IMAGES.length) % EVENT_HERO_IMAGES.length);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events?status=upcoming', { cache: 'no-store' });
        const data = await response.json();
        if (response.ok && data.events && data.events.length > 0) {
          setEvents(data.events);
        } else {
          setEvents([
            { id: '1', title: "Startup Pitch Competition 2026", date: "2026-03-25", time: "10:00 AM - 5:00 PM", location: "Karachi Expo Center", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities. Present your startup idea to leading investors.", status: "Registration Open", type: "Competition" },
            { id: '2', title: "Tech Skills Bootcamp", date: "2026-04-10", time: "9:00 AM - 6:00 PM", location: "Lahore Innovation Hub", image: "/events/event-slide-2.jpg", description: "Intensive bootcamp covering web development, mobile apps, and AI fundamentals with hands-on projects.", status: "Early Bird", type: "Bootcamp" },
            { id: '3', title: "Social Impact Summit", date: "2026-04-20", time: "2:00 PM - 8:00 PM", location: "Islamabad Convention Hall", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to discuss sustainable solutions for community challenges.", status: "Coming Soon", type: "Summit" },
          ]);
        }
      } catch {
        setEvents([
          { id: '1', title: "Startup Pitch Competition 2026", date: "2026-03-25", time: "10:00 AM - 5:00 PM", location: "Karachi Expo Center", image: "/events/event-slide-1.jpg", description: "Compete for seed funding and mentorship opportunities. Present your startup idea to leading investors.", status: "Registration Open", type: "Competition" },
          { id: '2', title: "Tech Skills Bootcamp", date: "2026-04-10", time: "9:00 AM - 6:00 PM", location: "Lahore Innovation Hub", image: "/events/event-slide-2.jpg", description: "Intensive bootcamp covering web development, mobile apps, and AI fundamentals with hands-on projects.", status: "Early Bird", type: "Bootcamp" },
          { id: '3', title: "Social Impact Summit", date: "2026-04-20", time: "2:00 PM - 8:00 PM", location: "Islamabad Convention Hall", image: "/events/event-slide-4.jpg", description: "Join social entrepreneurs and changemakers to discuss sustainable solutions for community challenges.", status: "Coming Soon", type: "Summit" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

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
                src={EVENT_HERO_IMAGES[currentImageIndex]}
                alt={`Himmatkaar Event Slide ${currentImageIndex + 1}`}
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
                <span className="badge-category-gold !rounded-md !px-3 !py-1 !text-xs">
                  • Upcoming Cohorts & Sessions
                </span>
              </div>
              <h1 className="font-serif-heading mb-4 text-white font-bold leading-[1.08] tracking-tight max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
                Join Our Upcoming{" "}
                <span className="text-[#389456] italic">
                  Events!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#d1e7d8] max-w-2xl font-normal">
                Reserve your seat for upcoming webinars, leadership workshops, pitch competitions, and corporate networking conclaves across Pakistan.
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
            {EVENT_HERO_IMAGES.map((_, index) => (
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

        {/* ── 2. Events Grid (Crisp White / Light Section with Interactive Cards) ── */}
        <section className="bg-white py-20 md:py-24 border-t border-[#e2ede4] text-[#07190e] relative">
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
            <div className="mb-14 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#e8f5ec] border border-[#a3caad] text-[#2d7a46] font-mono text-xs font-bold uppercase tracking-wider mb-3">
                • Registrations Open
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#07190e] tracking-tight leading-[1.08] mb-3">
                Select An Upcoming{" "}
                <span className="text-[#2d7a46] italic">Experience!</span>
              </h2>
              <p className="text-base sm:text-lg text-[#3a5342] font-normal leading-relaxed">
                Click any event card to view registration details and schedule.
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-[#2d7a46]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {events.map((event, idx) => {
                  const isSelected = selectedEventIndex === idx;
                  return (
                    <motion.div
                      key={event.id || idx}
                      onClick={() => setSelectedEventIndex(idx)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className={`rounded-2xl overflow-hidden border transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-2xl scale-[1.02]"
                          : "bg-[#f8faf7] text-[#07190e] border-[#d8e6db] hover:border-[#2d7a46] hover:bg-[#f0f6f2]"
                      }`}
                    >
                      <div>
                        <div className="relative h-52 w-full overflow-hidden bg-[#0a2012]">
                          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="400px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <span className={`absolute top-3 right-3 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                            isSelected ? "bg-[#2d7a46] text-white border-[#389456]" : "bg-[#0a2012]/90 text-[#f3ae29] border-[#1d442a]"
                          }`}>
                            {event.status}
                          </span>
                        </div>
                        
                        <div className="p-6">
                          <h3 className={`font-serif-heading text-xl font-bold mb-2.5 transition-colors ${
                            isSelected ? "text-white" : "text-[#07190e]"
                          }`}>
                            {event.title}
                          </h3>
                          <p className={`text-sm leading-relaxed mb-4 ${
                            isSelected ? "text-[#d1e7d8]" : "text-[#3a5342]"
                          }`}>
                            {event.description}
                          </p>
                        </div>
                      </div>

                      <div className={`px-6 pb-6 pt-3 border-t space-y-2 text-xs font-mono ${
                        isSelected ? "border-[#1d442a] text-[#d1e7d8]" : "border-[#e2ede4] text-[#4a6b53]"
                      }`}>
                        <p className="flex items-center gap-2">
                          <Calendar size={13} className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"} /> {formatDate(event.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={13} className={isSelected ? "text-[#f3ae29]" : "text-[#2d7a46]"} /> {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={13} className={isSelected ? "text-[#389456]" : "text-[#2d7a46]"} /> {event.location}
                        </p>
                        
                        <div className="pt-3">
                          <Link href="/register" className="block w-full">
                            <button
                              className={`w-full justify-center !py-2.5 !px-4 !text-xs !rounded-xl inline-flex items-center gap-2 transition-all ${
                                isSelected
                                  ? "btn-gsap-cta"
                                  : "btn-gsap-ghost hover:border-[#2d7a46] hover:bg-[#2d7a46]/20"
                              }`}
                            >
                              <span>Register for Event</span>
                              <ArrowUpRight size={14} className="text-[#f3ae29]" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

