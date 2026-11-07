"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, Loader2, BookOpen, Sparkles, Send, CheckCircle2 } from "lucide-react";
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

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "navigating-tech-interviews-in-pakistan",
    title: "Navigating Tech Interviews: A Comprehensive Guide for Fresh Graduates in Pakistan",
    excerpt: "Learn how to stand out in software engineering and tech interviews by mastering DSA, system design fundamentals, and effective behavioral storytelling.",
    author: "Salman Khan",
    date: "2026-03-15",
    read_time: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    category: "Career Guidance",
    published: true
  },
  {
    id: "2",
    slug: "mastering-public-speaking-introverts",
    title: "From Hesitation to Impact: Public Speaking Strategies for Emerging Leaders",
    excerpt: "Overcoming imposter syndrome and delivering memorable presentations during corporate meetings and university showcases.",
    author: "Aimen Shahid",
    date: "2026-03-10",
    read_time: "4 min read",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    category: "Communication",
    published: true
  },
  {
    id: "3",
    slug: "why-mentorship-accelerates-growth",
    title: "Why Mentorship is the Missing Link in Traditional Higher Education",
    excerpt: "How structured peer learning, facilitator feedback, and active industry alumni bridges the widening gap between academia and real jobs.",
    author: "Sipehre Shamsi",
    date: "2026-03-02",
    read_time: "6 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    category: "Mentorship",
    published: true
  }
];

const CATEGORIES = ["All", "Career Guidance", "Communication", "Mentorship", "Technical Skills"];

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPostId, setSelectedPostId] = useState<string>("1");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=true');
      const data = await response.json();
      const posts = data.posts && data.posts.length > 0 ? data.posts : DEFAULT_BLOG_POSTS;
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error fetching blog posts, using defaults:', error);
      setBlogPosts(DEFAULT_BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">

        {/* ── Page Header ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] py-16 sm:py-20 border-b border-[#1d442a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#07190e]/80 border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="text-[#389456]" /> Back to Home
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-widest mb-4">
                <BookOpen size={14} className="text-[#f3ae29]" />
                <span>Knowledge & Thought Leadership</span>
              </div>
              <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-[1.1] max-w-3xl">
                Insights, Guides &{" "}
                <span className="text-[#389456]">
                  Perspectives
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#d1e7d8] max-w-2xl font-normal leading-relaxed">
                Explore articles on career development, technical interview prep, executive presence, and stories from Pakistan&apos;s youth ecosystem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CRISP WHITE SECTION: Blog Grid with Interactive Cards ── */}
        <section className="bg-[#f8faf7] py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            {/* Category Filter Pills & Indicator */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-[#0c2616] text-white shadow-md border border-[#0c2616]"
                        : "bg-white text-slate-700 border border-[#e2ede4] hover:border-[#2d7a46]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-[#e2ede4] shadow-sm inline-flex items-center gap-2">
                <Sparkles size={14} className="text-[#2d7a46]" />
                <span>Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}</span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-[#2d7a46]" size={40} />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#e2ede4] p-8">
                <BookOpen size={48} className="text-[#2d7a46] mx-auto mb-4" />
                <h3 className="font-serif-heading text-2xl font-bold text-[#0c2616] mb-2">No articles in this category</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Try selecting another category or check back soon as our team regularly publishes new insights.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-5 py-2.5 rounded-xl bg-[#2d7a46] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#389456] transition-colors"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, idx) => {
                  const isSelected = selectedPostId === post.id;
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => setSelectedPostId(post.id)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                        isSelected
                          ? "bg-[#0c2616] text-white border-[#2d7a46] shadow-xl ring-2 ring-[#2d7a46]/40 scale-[1.02]"
                          : "bg-white text-slate-900 border-[#e2ede4] hover:border-[#2d7a46]/50 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Image tile */}
                        <div className="rounded-xl overflow-hidden relative h-52 w-full border border-black/5 mb-4">
                          <Image 
                            src={post.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"} 
                            alt={post.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            sizes="400px" 
                          />
                          <span className={`absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow-sm ${
                            isSelected 
                              ? "bg-[#07190e]/95 text-[#f3ae29] border border-[#1d442a]"
                              : "bg-white/95 text-[#2d7a46] border border-[#e2ede4]"
                          }`}>
                            {post.category}
                          </span>

                          {isSelected && (
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[#2d7a46] text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-md">
                              <CheckCircle2 size={12} /> Selected
                            </div>
                          )}
                        </div>

                        {/* Title & Excerpt */}
                        <h3 className={`font-serif-heading text-lg sm:text-xl font-bold mb-2 line-clamp-2 leading-snug transition-colors ${
                          isSelected ? "text-white" : "text-[#0c2616] group-hover:text-[#2d7a46]"
                        }`}>
                          {post.title}
                        </h3>
                        <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                          isSelected ? "text-[#d1e7d8]" : "text-slate-600"
                        }`}>
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isSelected ? "border-[#1d442a]" : "border-slate-100"
                      }`}>
                        <div>
                          <p className={`font-medium ${isSelected ? "text-[#f3ae29]" : "text-[#0c2616]"}`}>
                            {post.author}
                          </p>
                          <p className={`flex items-center gap-1 text-[10px] font-mono ${
                            isSelected ? "text-[#a3caad]" : "text-slate-500"
                          }`}>
                            <Clock size={11} className={isSelected ? "text-[#389456]" : "text-[#2d7a46]"} /> {post.read_time} • {formatDate(post.date)}
                          </p>
                        </div>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                            isSelected
                              ? "bg-[#2d7a46] text-white hover:bg-[#389456]"
                              : "bg-[#e8f5ec] text-[#2d7a46] hover:bg-[#2d7a46] hover:text-white"
                          }`}
                        >
                          Read <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CRISP WHITE FLOATING NEWSLETTER SECTION ── */}
        <section className="bg-white py-16 sm:py-24 border-b border-[#e2ede4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f8faf7] rounded-3xl p-8 sm:p-12 border border-[#e2ede4] shadow-sm text-center"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#e8f5ec] text-[#2d7a46] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <Sparkles size={14} className="text-[#2d7a46]" /> Weekly Publication
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0c2616] mb-3 tracking-tight">
                Never Miss an Edition
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                Join thousands of students and mentors who receive our curated job guides, workshop invitations, and thought pieces every week.
              </p>

              {subscribed ? (
                <div className="bg-[#e8f5ec] border border-[#2d7a46]/40 rounded-xl p-4 text-[#2d7a46] font-semibold text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                  <CheckCircle2 size={18} /> Thank you! You&apos;re subscribed to HimmatKaar Insights.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="flex-1 bg-white border border-[#e2ede4] rounded-xl px-4 py-3 text-slate-900 text-sm focus:border-[#2d7a46] outline-none transition-colors shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#2d7a46] text-white font-semibold text-sm hover:bg-[#389456] transition-colors flex items-center justify-center gap-2 shadow-md shrink-0"
                  >
                    Subscribe <Send size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
