"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  category: string;
  published: boolean;
}

const CARD_COLORS = [
  'var(--color-charcoal)',
  'var(--color-field-deep)',
  'var(--color-field-olive)',
  'var(--color-charcoal)',
  'var(--color-field-emerald)',
  'var(--color-field-deep)',
];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogPosts(); }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=true');
      const data = await response.json();
      setBlogPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-canvas)', color: 'var(--color-text-primary)', overflowX: 'hidden' }}>
      <Navbar />

      <main className="pt-20">

        {/* ── Page Header ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '80px 0 60px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 label-gallery hover:text-white transition-colors" style={{ color: 'var(--color-text-muted)' }}>
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="badge-gallery badge-mint inline-flex mb-5">Insights & Stories</span>
              <h1 className="font-portrait mb-4" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--color-text-primary)', maxWidth: '640px' }}>
                Himmatkaar Blog
              </h1>
              <p style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '520px' }}>
                Explore articles, insights, and success stories from our community of changemakers and innovators.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Blog Grid ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '0 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-badge-gold)' }} />
              </div>
            ) : blogPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)' }}>
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    style={{
                      background: CARD_COLORS[idx % CARD_COLORS.length],
                      borderRadius: 'var(--radius-cards)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Image tile */}
                    <div style={{ margin: '20px 20px 0', borderRadius: 'var(--radius-images)', overflow: 'hidden', position: 'relative', height: '200px', flexShrink: 0 }}>
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="400px" />
                      <span className="badge-gallery badge-gold absolute top-3 left-3" style={{ fontSize: '8px', padding: '4px 10px' }}>
                        {post.category}
                      </span>
                    </div>
                    {/* Card body */}
                    <div style={{ padding: '20px 20px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 className="font-portrait mb-3" style={{ fontSize: '22px', color: 'var(--color-text-primary)', flex: 1 }}>{post.title}</h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', marginBottom: '16px' }}>{post.excerpt}</p>

                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <p className="label-gallery" style={{ color: 'var(--color-text-muted)' }}>{formatDate(post.date)}</p>
                          <p className="label-gallery mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                            <Clock size={10} /> {post.read_time}
                          </p>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="btn-ghost-pill inline-flex items-center gap-1">
                          Read <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section style={{ background: 'var(--color-canvas)', padding: '0 0 80px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: 'var(--color-field-forest)', borderRadius: 'var(--radius-cards)', padding: '60px 40px' }}
            >
              <span className="badge-gallery badge-gold inline-flex mb-5">Newsletter</span>
              <h2 className="font-portrait mb-4" style={{ fontSize: '35px', color: 'var(--color-text-primary)' }}>Never Miss an Update</h2>
              <p className="mb-8" style={{ fontSize: '15px', lineHeight: 1.3, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans-gallery)', maxWidth: '480px' }}>
                Subscribe to get the latest articles and insights delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3" style={{ maxWidth: '480px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ flex: 1, background: 'var(--color-espresso)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-buttons)', padding: '10px 20px', color: 'var(--color-text-primary)', fontSize: '13px', fontFamily: 'var(--font-sans-gallery)', outline: 'none' }}
                />
                <button className="btn-filled-pill">Subscribe</button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
