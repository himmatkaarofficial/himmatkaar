"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, Image as ImageIcon, Loader2, Sparkles, Layers, RefreshCw, X, Check } from "lucide-react";

export interface HeroSlide {
  id: string;
  section: "team" | "launchpad";
  title?: string;
  image: string;
  display_order?: number;
}

export default function AdminHeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "team" | "launchpad">("all");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    section: "team" as "team" | "launchpad",
    title: "",
    image: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hero-slides");
      const data = await response.json();
      setSlides(data.slides || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      showFeedback("error", "Failed to load hero slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingSlide(null);
    setFormData({
      section: activeTab === "launchpad" ? "launchpad" : "team",
      title: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      section: slide.section,
      title: slide.title || "",
      image: slide.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      showFeedback("error", "Please provide an image URL or path.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingSlide) {
        // PUT update
        const response = await fetch(`/api/hero-slides/${editingSlide.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingSlide,
            section: formData.section,
            title: formData.title,
            image: formData.image,
          }),
        });

        if (!response.ok) throw new Error("Failed to update slide");
        showFeedback("success", "Hero slide updated successfully!");
      } else {
        // POST create
        const response = await fetch("/api/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create slide");
        showFeedback("success", "Hero slide added successfully!");
      }

      setIsModalOpen(false);
      fetchSlides();
    } catch (error) {
      console.error("Save slide error:", error);
      showFeedback("error", "An error occurred while saving the slide.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;

    try {
      const response = await fetch(`/api/hero-slides/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete slide");
      showFeedback("success", "Slide deleted successfully!");
      fetchSlides();
    } catch (error) {
      console.error("Delete slide error:", error);
      showFeedback("error", "Failed to delete slide.");
    }
  };

  const filteredSlides = slides.filter((slide) => {
    if (activeTab === "all") return true;
    return slide.section === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Layers className="text-[var(--color-courage-green)]" size={22} />
            Hero Section Slides Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage background carousel slides for Team and Launchpad hero sections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSlides}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Refresh slides"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[var(--color-courage-green)] text-white hover:bg-[#1f5933] transition-colors text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus size={16} /> Add Hero Slide
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "all"
              ? "bg-[var(--color-courage-green)] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All Slides ({slides.length})
        </button>

        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "team"
              ? "bg-[var(--color-courage-green)] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Team Hero Slides ({slides.filter((s) => s.section === "team").length})
        </button>

        <button
          onClick={() => setActiveTab("launchpad")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "launchpad"
              ? "bg-[var(--color-courage-green)] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Launchpad Hero Slides ({slides.filter((s) => s.section === "launchpad").length})
        </button>
      </div>

      {/* Slides Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[var(--color-courage-green)]" size={36} />
        </div>
      ) : filteredSlides.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <ImageIcon className="mx-auto text-slate-300 mb-3" size={48} />
          <h3 className="text-base font-bold text-slate-800">No Hero Slides Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Add your first background image slide for this section to display it dynamically on the website.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-courage-green)] text-white text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add First Slide
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={slide.title || "Hero Slide"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="400px"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white shadow-md ${
                      slide.section === "team" ? "bg-emerald-700" : "bg-amber-600"
                    }`}
                  >
                    • {slide.section.toUpperCase()} HERO SLIDE
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {slide.title || `${slide.section === "team" ? "Team" : "Launchpad"} Background Slide`}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 truncate" title={slide.image}>
                    {slide.image}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">ID: {slide.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(slide)}
                    className="p-2 rounded-lg text-slate-600 hover:text-[var(--color-courage-green)] hover:bg-emerald-50 transition-colors"
                    title="Edit Slide"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Slide"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-slate-900">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Section Target *
                </label>
                <select
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value as "team" | "launchpad" })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)] text-sm font-medium"
                >
                  <option value="team">Team & Core-Team Hero Carousel</option>
                  <option value="launchpad">LaunchPad Fellowship Hero Carousel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slide Label / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Executive Team Slide 1"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  placeholder="e.g. /team-slides/team-slide-1.jpg or https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)] text-sm font-medium"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Enter local path (e.g. <code>/team-slides/team-slide-1.jpg</code>) or a direct public image URL.
                </p>
              </div>

              {formData.image && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Image Preview
                  </label>
                  <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={formData.image.startsWith("http")}
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-courage-green)] text-white hover:bg-[#1f5933] text-xs font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {editingSlide ? "Update Slide" : "Save Hero Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
