"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, MapPin, Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCardImage from "@/components/TeamCardImage";

interface Ambassador {
  id: string;
  name: string;
  role: string;
  city: string;
  bio: string;
  image: string;
  linkedin: string;
}

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

const CARD_COLORS = [
  'var(--color-field-deep)',
  'var(--color-charcoal)',
  'var(--color-field-olive)',
  'var(--color-field-emerald)',
];

export default function Ambassadors() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const response = await fetch('/api/ambassadors');
        const data = await response.json();
        const fetched = data.ambassadors && data.ambassadors.length > 0 ? data.ambassadors : DEFAULT_AMBASSADORS;
        setAmbassadors(fetched);
      } catch (error) {
        console.error('Error fetching ambassadors, using default:', error);
        setAmbassadors(DEFAULT_AMBASSADORS);
      } finally {
        setLoading(false);
      }
    };
    fetchAmbassadors();
  }, []);

  const displayAmbassadors = ambassadors.length > 0 ? ambassadors : DEFAULT_AMBASSADORS;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Header ── */}
        <section className="bg-[#08170d] pt-6 pb-16 sm:pt-8 sm:pb-20 border-b border-[#1a3a24]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link href="/team" className="inline-flex items-center gap-2 mb-6 text-xs font-mono text-[#0ae448] hover:text-white transition-colors uppercase">
              <ArrowLeft size={14} /> Back to Team
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-4">
                <span className="annotation-curly">&#123; Campus Ambassadors &#125;</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight max-w-2xl">
                Our Ambassadors{" "}
                <span className="text-[#0ae448] underline decoration-[#0ae448]/40 underline-offset-8">
                  Network!
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#8ea896] leading-relaxed max-w-2xl font-normal">
                Meet our passionate campus ambassadors representing Himmatkaar across Pakistan&apos;s major cities and universities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Ambassadors Grid ── */}
        <section className="bg-[#08170d] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-[#0ae448]" size={40} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayAmbassadors.map((ambassador, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#0e2417] rounded-xl border border-[#1a3a24] hover:border-[#0ae448]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="m-4 rounded-lg overflow-hidden relative h-48 border border-[#1a3a24]">
                      <TeamCardImage
                        src={ambassador.image}
                        alt={ambassador.name}
                        name={ambassador.name}
                        sizes="300px"
                      />
                      {/* City badge */}
                      <span className="bg-[#08170d]/90 text-[#0ae448] border border-[#1a3a24] font-mono text-[10px] px-2.5 py-1 rounded-md absolute top-3 left-3 flex items-center gap-1 uppercase">
                        <MapPin size={10} /> {ambassador.city}
                      </span>
                      {ambassador.linkedin && (
                        <a
                          href={ambassador.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#0ae448] flex items-center justify-center text-[#08170d] hover:bg-[#abff84] transition-colors z-10"
                          aria-label={`${ambassador.name} LinkedIn`}
                        >
                          <Linkedin size={12} />
                        </a>
                      )}
                    </div>
                    <div className="p-4 pt-1 flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#0ae448] transition-colors">{ambassador.name}</h3>
                      <p className="text-[10px] font-mono text-[#0ae448] uppercase tracking-widest mb-2">&#123; {ambassador.role} &#125;</p>
                      <p className="text-xs text-[#8ea896] leading-relaxed font-normal">{ambassador.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Become Ambassador CTA ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '0 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: 'var(--color-field-forest)', borderRadius: 'var(--radius-cards)', padding: '60px 40px', border: '1px solid var(--color-border)' }}
            >
              <span className="badge-gallery badge-gold inline-flex mb-5">Apply</span>
              <h2 className="font-portrait mb-4" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Become a Campus Ambassador</h2>
              <p className="mb-8" style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '480px' }}>
                Join our network and represent Himmatkaar at your university
              </p>
              <Link href="/contact">
                <button className="btn-filled-pill">Apply Now <ArrowRight size={14} /></button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
