"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Upload, 
  Loader2, 
  Quote, 
  Star, 
  Check, 
  X,
  AlertCircle,
  MessageSquareQuote
} from "lucide-react";
import AdminImageUploader from "./AdminImageUploader";

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string | null;
  rating: number;
  feedback: string;
  display_order?: number;
  is_active?: boolean;
  created_at?: string;
}

export default function AdminTestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    avatar_url: "",
    rating: 5,
    feedback: "",
    display_order: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setTestimonials(data.testimonials || []);
      } else {
        setError(data.error || "Failed to load testimonials");
      }
    } catch (err) {
      console.error(err);
      setError("Network error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      avatar_url: "",
      rating: 5,
      feedback: "",
      display_order: testimonials.length,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingTestimonial(item);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      company: item.company || "",
      avatar_url: item.avatar_url || "",
      rating: item.rating || 5,
      feedback: item.feedback || "",
      display_order: item.display_order ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("file", file);
      data.append("type", "testimonial");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({ ...prev, avatar_url: json.url }));
        setSuccessMessage("Member photo uploaded successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(json.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.feedback.trim()) {
      alert("Please provide both a Name and Feedback message.");
      return;
    }

    try {
      setSaving(true);
      if (editingTestimonial) {
        // Update
        const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setIsModalOpen(false);
          setSuccessMessage("Testimonial updated successfully!");
          setTimeout(() => setSuccessMessage(null), 3000);
          fetchTestimonials();
        } else {
          alert(data.error || "Failed to update testimonial");
        }
      } else {
        // Create
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setIsModalOpen(false);
          setSuccessMessage("Testimonial added successfully!");
          setTimeout(() => setSuccessMessage(null), 3000);
          fetchTestimonials();
        } else {
          alert(data.error || "Failed to create testimonial");
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial for "${name}"?`)) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setSuccessMessage("Testimonial deleted.");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[var(--color-courage-green)]/10 text-[var(--color-courage-green)] rounded-lg">
              <MessageSquareQuote size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              Member Voices & Testimonials
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-body">
            Manage feedback quotes, member pictures, names, and roles displayed on the homepage &ldquo;What Our Members Say!&rdquo; section.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-courage-green)] hover:bg-[#072412] text-white rounded-xl font-medium shadow-md transition-all font-body text-sm cursor-pointer"
        >
          <Plus size={18} />
          Add Member Feedback
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in">
          <Check size={18} className="text-emerald-600" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} className="text-red-600" />
          {error}
        </div>
      )}

      {/* Testimonials List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-[var(--color-courage-green)]" size={32} />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Quote className="mx-auto text-slate-300 mb-3" size={48} />
          <h3 className="text-lg font-bold text-slate-700">No testimonials added yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
            Add testimonials with member photos, names, and feedback so they appear in the homepage slider.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-courage-green)] text-white rounded-lg text-sm font-medium shadow-sm hover:bg-[#072412] transition-colors"
          >
            <Plus size={16} />
            Add First Feedback
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header: Avatar, Name, Role, Rating & Actions */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    {item.avatar_url ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-courage-green)]/30 flex-shrink-0 bg-slate-100">
                        <Image
                          src={item.avatar_url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#08170d] text-[#0ae448] border border-[#0ae448]/40 flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold shadow-[0_0_8px_rgba(10,228,72,0.15)]">
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-base leading-tight font-heading">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-body mt-0.5">
                        {item.role || "Member"} {item.company ? `· ${item.company}` : ""}
                      </p>
                      {/* Rating stars */}
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-[#0ae448] text-[#0ae448]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-slate-500 hover:text-[var(--color-courage-green)] hover:bg-slate-50 rounded-lg transition-colors"
                      title="Edit Feedback"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed relative italic">
                  &ldquo;{item.feedback}&rdquo;
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                <span>Order: #{item.display_order ?? idx}</span>
                <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {editingTestimonial ? "Edit Member Feedback" : "Add New Member Feedback"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Member Avatar Upload & Crop */}
              <AdminImageUploader
                label="Member Photo / Avatar *"
                imageUrl={formData.avatar_url}
                uploadType="testimonial"
                defaultAspect="1:1"
                onChange={(url) => setFormData((prev) => ({ ...prev, avatar_url: url }))}
                helpText="Crop profile picture with 1:1 Square or Custom ratio."
              />

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmed Khan"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)]"
                />
              </div>

              {/* Role & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Corp"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)]"
                  />
                </div>
              </div>

              {/* Rating & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                    Rating (Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value) || 5 }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)]"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                    <option value={2}>2 Stars (★★☆☆☆)</option>
                    <option value={1}>1 Star  (★☆☆☆☆)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        display_order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)]"
                  />
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 font-body">
                  Feedback / Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="HimmatKaar transformed my career trajectory completely..."
                  value={formData.feedback}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, feedback: e.target.value }))
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)] leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="flex items-center gap-2 px-5 py-2 bg-[var(--color-courage-green)] hover:bg-[#072412] text-white rounded-xl text-sm font-medium shadow-md transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingTestimonial ? "Save Changes" : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
