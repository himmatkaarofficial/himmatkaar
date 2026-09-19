"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
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

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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
      
      if (!foundPost) {
        notFound();
      }
      
      setPost(foundPost);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderContent = (content: string) => {
    // Content is HTML from TipTap editor - render it with proper styling
    return (
      <div 
        className="blog-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#39894c]" size={48} />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white  dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#39894c] hover:underline mb-8 font-semibold">
            <ArrowLeft size={20} /> Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-[#39894c] text-white px-4 py-2 rounded-full text-sm font-bold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.read_time}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-96 rounded-2xl overflow-hidden mb-12"
          >
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Share this article</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center hover:bg-[#39894c] hover:text-white transition-colors dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center hover:bg-[#39894c] hover:text-white transition-colors dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center hover:bg-[#39894c] hover:text-white transition-colors dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
                  <Linkedin size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-100  flex items-center justify-center hover:bg-[#39894c] hover:text-white transition-colors dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-slate-50  rounded-2xl dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#39894c] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white">{post.author}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  {post.author} is a passionate advocate for youth empowerment and innovation at Himmatkaar, dedicated to helping young professionals achieve their full potential.
                </p>
              </div>
            </div>
          </motion.div>
        </article>

        {/* Related Posts CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#2d5f3d] rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Read More Articles</h2>
            <p className="text-lg mb-8 text-white/90">
              Explore more insights and stories from the Himmatkaar community
            </p>
            <Link href="/blog">
              <button className="bg-white text-[#2d5f3d] px-6 sm:px-10 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl dark:backdrop-blur-xl dark:bg-white/5 dark:border dark:border-white/10">
                View All Posts
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
