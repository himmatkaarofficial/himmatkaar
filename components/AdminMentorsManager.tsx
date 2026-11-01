"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus, Edit, Trash2, GraduationCap, X, Loader2,
  CheckCircle, AlertCircle, Linkedin, Search, Sparkles, ExternalLink
} from "lucide-react";
import AdminImageUploader from "./AdminImageUploader";

export interface LaunchpadMentorSession {
  id: string;
  session_number: number;
  title: string;
  category: string;
  date: string;
  time: string;
  cohort: string;
  status: string;
  mentor_name: string;
  mentor_role: string;
  mentor_photo_url: string;
  mentor_bio: string;
  mentor_linkedin: string;
  summary: string;
  key_takeaways: string[];
  session_photos: { url: string; caption: string }[];
  is_featured?: boolean;
}

const ROLES = [
  "Lead Facilitator",
  "Program Facilitator",
  "Industry Mentor",
  "Academic Advisor",
  "Career Coach",
  "Technical Mentor",
  "Branding Specialist",
  "Networking Coach",
  "Guest Speaker",
  "Executive Advisor"
];

const EMPTY_FORM: Omit<LaunchpadMentorSession, "id"> = {
  session_number: 1,
  title: "Career Purpose & Personal Growth Path",
  category: "Career Development",
  date: "October 12, 2024",
  time: "10:00 AM - 1:00 PM",
  cohort: "Cohort 1",
  status: "Completed",
  mentor_name: "",
  mentor_role: "Lead Facilitator",
  mentor_photo_url: "",
  mentor_bio: "",
  mentor_linkedin: "",
  summary: "",
  key_takeaways: [],
  session_photos: [],
  is_featured: false,
};

export default function AdminMentorsManager() {
  const [sessions, setSessions] = useState<LaunchpadMentorSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState<LaunchpadMentorSession | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [formData, setFormData] = useState<Omit<LaunchpadMentorSession, "id">>(EMPTY_FORM);

  useEffect(() => {
    fetchMentors();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/launchpad", { cache: "no-store" });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      showToast("error", "Failed to fetch mentors");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingSession(null);
    setFormData({
      ...EMPTY_FORM,
      session_number: sessions.length + 1,
    });
    setShowModal(true);
  };

  const openEdit = (session: LaunchpadMentorSession) => {
    setEditingSession(session);
    setFormData({
      session_number: session.session_number,
      title: session.title || "",
      category: session.category || "Career Development",
      date: session.date || "",
      time: session.time || "",
      cohort: session.cohort || "Cohort 1",
      status: session.status || "Completed",
      mentor_name: session.mentor_name || "",
      mentor_role: session.mentor_role || "Lead Facilitator",
      mentor_photo_url: session.mentor_photo_url || "",
      mentor_bio: session.mentor_bio || "",
      mentor_linkedin: session.mentor_linkedin || "",
      summary: session.summary || "",
      key_takeaways: session.key_takeaways || [],
      session_photos: session.session_photos || [],
      is_featured: !!session.is_featured,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mentor_name.trim()) {
      showToast("error", "Mentor Name is required");
      return;
    }

    setSaving(true);
    try {
      if (editingSession) {
        const res = await fetch(`/api/launchpad/${editingSession.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("success", "Mentor updated successfully!");
      } else {
        const res = await fetch("/api/launchpad", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("success", "Mentor added successfully!");
      }
      setShowModal(false);
      fetchMentors();
    } catch (err: any) {
      showToast("error", err.message || "Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/launchpad/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      showToast("success", "Mentor removed");
      setDeleteConfirmId(null);
      fetchMentors();
    } catch (err: any) {
      showToast("error", err.message || "Delete failed");
    }
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.mentor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.mentor_role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || s.mentor_role === filterRole;
    return matchesSearch && matchesRole;
  });

  const availableRoles = Array.from(new Set(sessions.map((s) => s.mentor_role).filter(Boolean)));
  const inputCls =
    "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]";

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-red-600" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="text-[#39894c]" size={28} />
            Mentors &amp; Facilitators
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Directly add, update, and manage mentors for LaunchPad fellowship programs
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#39894c] text-white rounded-xl font-bold hover:bg-[#2d7040] transition-all shadow-md shrink-0 cursor-pointer"
        >
          <Plus size={18} /> Add New Mentor
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, role, or topic..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role:</span>
          <button
            onClick={() => setFilterRole("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterRole === "all"
                ? "bg-[#39894c] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All ({sessions.length})
          </button>
          {availableRoles.map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterRole === role
                  ? "bg-[#39894c] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#39894c]" size={36} />
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
          <GraduationCap className="mx-auto mb-4 text-slate-300" size={56} />
          <p className="text-slate-700 font-bold text-lg">No Mentors Found</p>
          <p className="text-slate-500 text-sm mt-1">
            Click "Add New Mentor" to create your first mentor profile.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {s.is_featured && (
                <div className="absolute top-0 right-0 bg-[#0ae448] text-[#08170d] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                  <Sparkles size={11} /> Featured
                </div>
              )}

              <div>
                {/* Header: Photo & LinkedIn */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#39894c]/30 shadow-sm shrink-0 bg-slate-100">
                    {s.mentor_photo_url ? (
                      <Image
                        src={s.mentor_photo_url}
                        alt={s.mentor_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 text-[#39894c] flex items-center justify-center font-bold text-2xl">
                        {s.mentor_name ? s.mentor_name.charAt(0) : "M"}
                      </div>
                    )}
                  </div>

                  {s.mentor_linkedin && (
                    <a
                      href={s.mentor_linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      title={`${s.mentor_name}'s LinkedIn`}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#39894c] transition-colors">
                  {s.mentor_name}
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[#39894c] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  {s.mentor_role || "Mentor"}
                </span>

                {/* Bio */}
                {s.mentor_bio ? (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {s.mentor_bio}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic mb-4">No bio added yet</p>
                )}

                {/* Topic / Session context */}
                {s.title && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 mb-4">
                    <span className="font-semibold text-slate-700 block mb-0.5">Topic:</span>
                    <p className="line-clamp-2 text-slate-800 font-medium">{s.title}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                  {s.cohort}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-[#39894c] hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Edit size={14} /> Edit
                  </button>

                  {deleteConfirmId === s.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(s.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Mentor"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Mentor Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingSession ? "Edit Mentor Profile" : "Add New Mentor / Facilitator"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update mentor information displayed across LaunchPad pages
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Photo Upload & Crop */}
              <AdminImageUploader
                label="Mentor Portrait Photo *"
                imageUrl={formData.mentor_photo_url}
                uploadType="launchpad"
                defaultAspect="1:1"
                onChange={(url: string) => setFormData((prev) => ({ ...prev, mentor_photo_url: url }))}
                helpText="Upload and crop portrait image (1:1 aspect ratio recommended)."
              />

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Mentor Full Name *
                  </label>
                  <input
                    required
                    value={formData.mentor_name}
                    onChange={(e) => setFormData({ ...formData, mentor_name: e.target.value })}
                    placeholder="e.g. Sipehre Shamsi"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Role / Title
                  </label>
                  <input
                    value={formData.mentor_role}
                    onChange={(e) => setFormData({ ...formData, mentor_role: e.target.value })}
                    placeholder="e.g. Lead Facilitator"
                    className={inputCls}
                    list="role-suggestions"
                  />
                  <datalist id="role-suggestions">
                    {ROLES.map((r) => (
                      <option key={r} value={r} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Linkedin size={14} className="text-blue-600" /> LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={formData.mentor_linkedin}
                  onChange={(e) => setFormData({ ...formData, mentor_linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className={inputCls}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Mentor Bio / Details
                </label>
                <textarea
                  rows={3}
                  value={formData.mentor_bio}
                  onChange={(e) => setFormData({ ...formData, mentor_bio: e.target.value })}
                  placeholder="Provide background, expertise, or achievements..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Session Topic & Cohort */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Session Topic / Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Career Purpose & Personal Growth"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">
                    Cohort
                  </label>
                  <input
                    value={formData.cohort}
                    onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                    placeholder="e.g. Cohort 1"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Featured Checkbox Toggle */}
              <label className="flex items-center gap-3 cursor-pointer bg-emerald-50 hover:bg-emerald-100/70 p-3.5 rounded-xl border border-emerald-200 transition-all">
                <input
                  type="checkbox"
                  checked={formData.is_featured || false}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-[#39894c] accent-[#39894c] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    ⭐ Featured Mentor (One-on-One Mentorship)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Highlight this mentor in the website&apos;s Featured One-on-One Mentorship section
                  </p>
                </div>
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#39894c] text-white rounded-xl font-bold hover:bg-[#2d7040] disabled:opacity-50 transition-all text-sm shadow-md cursor-pointer"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <GraduationCap size={16} />}
                  {saving ? "Saving..." : editingSession ? "Update Mentor" : "Save Mentor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
