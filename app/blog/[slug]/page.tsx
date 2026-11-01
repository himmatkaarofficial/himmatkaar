"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Loader2, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

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
  content: string;
  published: boolean;
}

const FALLBACK_POSTS: Record<string, BlogPost> = {
  "navigating-tech-interviews-in-pakistan": {
    id: "1",
    slug: "navigating-tech-interviews-in-pakistan",
    title: "Navigating Tech Interviews: A Comprehensive Guide for Fresh Graduates in Pakistan",
    excerpt: "Learn how to stand out in software engineering and tech interviews by mastering DSA, system design fundamentals, and effective behavioral storytelling.",
    author: "Salman Khan",
    date: "2026-03-15",
    read_time: "5 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    category: "Career Guidance",
    content: `
      <h2>The Landscape of Tech Hiring in Pakistan</h2>
      <p>Entering the software development industry as a fresh graduate can feel overwhelming. With hundreds of applicants for every junior position at top software houses and multinational engineering hubs, technical excellence alone is rarely sufficient. You must combine problem-solving prowess with structured communication.</p>
      
      <h2>1. Master Core Fundamentals Over Syntax</h2>
      <p>Interviewers care about your grasp of Data Structures and Algorithms (DSA), OOP principles, and clean system flow. Focus on understanding time-complexity tradeoffs rather than memorizing library functions.</p>
      
      <h2>2. The Power of Behavioral Storytelling (STAR Method)</h2>
      <p>When asked about past projects, utilize the Situation, Task, Action, and Result (STAR) framework. Emphasize what <em>you</em> personally engineered, what blockers occurred, and how your resolution created measurable performance gains.</p>

      <h2>3. Building Proof of Work</h2>
      <p>A deployed full-stack application with real users or clean Git commits speaks louder than a generic university final-year project. Make sure your GitHub and portfolio are documented with clear README files and live demo links.</p>
    `,
    published: true
  },
  "mastering-public-speaking-introverts": {
    id: "2",
    slug: "mastering-public-speaking-introverts",
    title: "From Hesitation to Impact: Public Speaking Strategies for Emerging Leaders",
    excerpt: "Overcoming imposter syndrome and delivering memorable presentations during corporate meetings and university showcases.",
    author: "Aimen Shahid",
    date: "2026-03-10",
    read_time: "4 min read",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    category: "Communication",
    content: `
      <h2>Why Communication is a Core Leadership Competency</h2>
      <p>Clear speech and authentic articulation separate good contributors from great leaders. Public speaking is not an innate genetic gift—it is an iterative craft honed through deliberate feedback and structured practice.</p>
      
      <h2>Structuring Your Thought Process</h2>
      <p>Before stepping on stage or unmuting in a critical stakeholder meeting, identify the single core takeaway you want your audience to remember. Everything you say should reinforce that thesis.</p>
    `,
    published: true
  }
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    params.then(p => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch('/api/blog?published=true');
      const data = await response.json();
      const foundPost = data.posts?.find((p: BlogPost) => p.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
      } else if (FALLBACK_POSTS[slug]) {
        setPost(FALLBACK_POSTS[slug]);
      } else {
        notFound();
      }
    } catch (error) {
      console.error('Error fetching blog post, checking fallback:', error);
      if (FALLBACK_POSTS[slug]) {
        setPost(FALLBACK_POSTS[slug]);
      } else {
        notFound();
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07190e] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#389456]" size={48} />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07190e] text-white flex flex-col font-sans selection:bg-[#2d7a46] selection:text-white">
      <Navbar />

      <main className="pt-20 flex-grow">
        
        {/* ── Header & Breadcrumbs ── */}
        <section className="bg-gradient-to-b from-[#0c2616] to-[#07190e] py-12 sm:py-16 border-b border-[#1d442a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-lg bg-[#07190e]/80 border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-colors text-xs font-mono uppercase tracking-wider"
            >
              <ArrowLeft size={14} className="text-[#389456]" /> Back to All Articles
            </Link>

            {/* Category Tag */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#07190e] border border-[#1d442a] text-[#f3ae29] text-xs font-mono font-semibold uppercase tracking-wider">
                <BookOpen size={14} className="text-[#f3ae29]" /> {post.category}
              </span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif-heading text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#d1e7d8] pb-6 border-b border-[#1d442a]"
            >
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#389456]" />
                <span className="font-semibold text-white">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#389456]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#389456]" />
                <span>{post.read_time}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CRISP LIGHT READING CANVAS ── */}
        <section className="bg-[#f8faf7] py-12 sm:py-20 border-b border-[#e2ede4]">
          <article className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[320px] sm:h-[460px] rounded-2xl overflow-hidden mb-12 border border-[#e2ede4] shadow-md"
            >
              <Image 
                src={post.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"} 
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Content Body Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e2ede4] shadow-sm text-slate-800 leading-relaxed space-y-6 text-base sm:text-lg"
            >
              <div 
                className="blog-content prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0c2616] prose-headings:font-bold prose-p:text-slate-700 prose-strong:text-[#0c2616]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-6 bg-white rounded-2xl border border-[#e2ede4] flex items-center justify-between flex-wrap gap-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Share2 size={18} className="text-[#2d7a46]" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0c2616]">Share this insight</h3>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-[#f8faf7] border border-[#e2ede4] text-slate-700 flex items-center justify-center hover:bg-[#2d7a46] hover:text-white hover:border-[#2d7a46] transition-colors" aria-label="Share on Facebook">
                  <Facebook size={16} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-[#f8faf7] border border-[#e2ede4] text-slate-700 flex items-center justify-center hover:bg-[#2d7a46] hover:text-white hover:border-[#2d7a46] transition-colors" aria-label="Share on Twitter">
                  <Twitter size={16} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-[#f8faf7] border border-[#e2ede4] text-slate-700 flex items-center justify-center hover:bg-[#2d7a46] hover:text-white hover:border-[#2d7a46] transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin size={16} />
                </button>
              </div>
            </motion.div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-8 bg-white rounded-2xl border border-[#e2ede4] shadow-sm flex items-start gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#0c2616] text-[#f3ae29] font-serif-heading font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2d7a46] font-semibold">Article Author</span>
                <h4 className="font-serif-heading text-xl font-bold text-[#0c2616] mt-0.5">{post.author}</h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  Educator and mentor dedicated to youth empowerment, career readiness, and educational excellence across Pakistan with the HimmatKaar Foundation.
                </p>
              </div>
            </motion.div>

          </article>
        </section>

        {/* ── Related Posts CTA ── */}
        <section className="bg-[#0c2616] py-16 sm:py-20 border-t border-[#1d442a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#07190e] rounded-3xl p-8 sm:p-12 border border-[#1d442a] shadow-xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c2616] border border-[#1d442a] text-[#f3ae29] text-xs font-mono uppercase tracking-wider mb-4">
                Continue Reading
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Explore More HimmatKaar Articles
              </h2>
              <p className="text-base text-[#d1e7d8] mb-8 max-w-lg mx-auto leading-relaxed">
                Discover actionable guides on CV tailoring, soft skill masterclasses, and networking opportunities.
              </p>
              <Link href="/blog">
                <button className="px-8 py-3.5 rounded-xl bg-[#2d7a46] text-white font-bold hover:bg-[#389456] transition-colors text-sm shadow-md inline-flex items-center gap-2">
                  View All Blog Posts <ArrowRight size={16} />
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
