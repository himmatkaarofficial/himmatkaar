"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus, Edit, Trash2, Rocket, X, Loader2, ChevronDown, ChevronUp,
  GraduationCap, Save, AlertCircle, CheckCircle, Upload, Linkedin, Camera
} from "lucide-react";
import AdminImageUploader from "./AdminImageUploader";

interface SessionPhoto {
  url: string;
  caption: string;
}

interface LaunchpadSession {
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
  session_photos: SessionPhoto[];
  is_featured?: boolean;
}

const CATEGORIES = [
  "Career Development",
  "Communication",
  "Corporate Readiness",
  "Academic & Research",
  "Career Coaching",
  "Technology",
  "Personal Branding",
  "Networking",
  "Other",
];

const EMPTY_FORM: Omit<LaunchpadSession, "id"> = {
  session_number: 1,
  title: "",
  category: "Career Development",
  date: "",
  time: "",
  cohort: "Cohort 1",
  status: "Completed",
  mentor_name: "",
  mentor_role: "",
  mentor_photo_url: "",
  mentor_bio: "",
  mentor_linkedin: "",
  summary: "",
  key_takeaways: [""],
  session_photos: [],
  is_featured: false,
};

// ─── Image Upload Button ───────────────────────────────────────────────────
function ImageUploadBtn({
  currentUrl,
  onUploaded,
  label,
  uploadType = "launchpad",
  round = false,
  size = "normal",
}: {
  currentUrl: string;
  onUploaded: (url: string) => void;
  label: string;
  uploadType?: string;
  round?: boolean;
  size?: "normal" | "small";
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", uploadType);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        onUploaded(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-slate-600 block">{label}</label>
      <div className="flex items-center gap-3">
        {/* Preview */}
        <div className={`relative overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 ${
          round ? "rounded-full w-16 h-16" : "rounded-xl w-20 h-14"
        }`}>
          {currentUrl ? (
            <Image src={currentUrl} alt="preview" fill className="object-cover" />
          ) : (
            <Camera size={size === "small" ? 14 : 18} className="text-slate-300" />
          )}
        </div>

        {/* Upload button */}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFile}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-[#39894c] hover:text-[#39894c] hover:bg-[#39894c]/5 transition-all disabled:opacity-50 w-full justify-center"
          >
            {uploading ? (
              <><Loader2 size={14} className="animate-spin" /> Uploading...</>
            ) : (
              <><Upload size={14} /> {currentUrl ? "Change Image" : "Upload Image"}</>
            )}
          </button>
          {currentUrl && (
            <p className="text-[10px] text-[#39894c] mt-1 truncate font-mono">{currentUrl.split("/").pop()}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Bulk Session Photo Uploader ──────────────────────────────────────────────
const MAX_PHOTOS = 7;

function BulkPhotoUploader({
  photos,
  onAdd,
  onRemove,
  onCaptionChange,
}: {
  photos: SessionPhoto[];
  onAdd: (newPhotos: SessionPhoto[]) => void;
  onRemove: (index: number) => void;
  onCaptionChange: (index: number, caption: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      alert(`Maximum ${MAX_PHOTOS} photos allowed.`);
      return;
    }
    const toUpload = files.slice(0, remaining);
    if (files.length > remaining) {
      alert(`Only ${remaining} more photo(s) can be added (max ${MAX_PHOTOS}). Uploading first ${remaining}.`);
    }

    setUploading(true);
    const uploaded: SessionPhoto[] = [];
    for (const file of toUpload) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("type", "launchpad");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok) {
          uploaded.push({ url: data.url, caption: "" });
        } else {
          alert(`Upload failed for ${file.name}: ${data.error}`);
        }
      } catch {
        alert(`Upload failed for ${file.name}`);
      }
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (uploaded.length) onAdd(uploaded);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {photos.length < MAX_PHOTOS && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:border-[#39894c] hover:text-[#39894c] hover:bg-[#39894c]/5 transition-all disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 size={16} className="animate-spin" /> Uploading photos...</>
            ) : (
              <><Upload size={16} /> Select Photos ({photos.length}/{MAX_PHOTOS} uploaded) — Choose up to {MAX_PHOTOS - photos.length} more</>
            )}
          </button>
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              {/* Image Preview */}
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={photo.url} alt={photo.caption || `Photo ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-all"
                >
                  <X size={12} />
                </button>
                <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  {i + 1}/{photos.length}
                </span>
              </div>
              {/* Caption */}
              <div className="p-2">
                <input
                  value={photo.caption}
                  onChange={(e) => onCaptionChange(i, e.target.value)}
                  placeholder={`Caption (optional)`}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {photos.length === MAX_PHOTOS && (
        <p className="text-xs text-amber-600 font-medium text-center">Maximum {MAX_PHOTOS} photos reached. Remove a photo to add more.</p>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function AdminLaunchpadManager() {
  const [sessions, setSessions] = useState<LaunchpadSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSession, setEditingSession] = useState<LaunchpadSession | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [formData, setFormData] = useState<Omit<LaunchpadSession, "id">>(EMPTY_FORM);
  const [filterCohort, setFilterCohort] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => { fetchSessions(); }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/launchpad", { cache: "no-store" });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      showToast("error", "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingSession(null);
    setFormData({ ...EMPTY_FORM, session_number: sessions.length + 1 });
    setShowModal(true);
  };

  const openEdit = (session: LaunchpadSession) => {
    setEditingSession(session);
    setFormData({
      session_number: session.session_number,
      title: session.title,
      category: session.category,
      date: session.date,
      time: session.time,
      cohort: session.cohort,
      status: session.status,
      mentor_name: session.mentor_name,
      mentor_role: session.mentor_role,
      mentor_photo_url: session.mentor_photo_url || "",
      mentor_bio: session.mentor_bio || "",
      mentor_linkedin: session.mentor_linkedin || "",
      summary: session.summary || "",
      key_takeaways: session.key_takeaways?.length ? session.key_takeaways : [""],
      session_photos: session.session_photos?.length ? session.session_photos : [],
      is_featured: !!session.is_featured,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        key_takeaways: formData.key_takeaways.filter((t) => t.trim()),
        session_photos: formData.session_photos.filter((p) => p.url.trim()),
      };

      if (editingSession) {
        const res = await fetch(`/api/launchpad/${editingSession.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("success", "Session updated successfully!");
      } else {
        const res = await fetch("/api/launchpad", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("success", "Session created successfully!");
      }
      setShowModal(false);
      fetchSessions();
    } catch (err: any) {
      showToast("error", err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/launchpad/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      showToast("success", "Session deleted");
      setDeleteConfirmId(null);
      fetchSessions();
    } catch (err: any) {
      showToast("error", err.message || "Delete failed");
    }
  };

  const updateTakeaway = (i: number, val: string) => {
    const updated = [...formData.key_takeaways];
    updated[i] = val;
    setFormData({ ...formData, key_takeaways: updated });
  };
  const addTakeaway = () => setFormData({ ...formData, key_takeaways: [...formData.key_takeaways, ""] });
  const removeTakeaway = (i: number) => {
    const updated = formData.key_takeaways.filter((_, idx) => idx !== i);
    setFormData({ ...formData, key_takeaways: updated.length ? updated : [""] });
  };

  const addPhotos = (newPhotos: SessionPhoto[]) => {
    setFormData({ ...formData, session_photos: [...formData.session_photos, ...newPhotos].slice(0, MAX_PHOTOS) });
  };
  const removePhoto = (i: number) => setFormData({ ...formData, session_photos: formData.session_photos.filter((_, idx) => idx !== i) });
  const updatePhotoCaption = (i: number, caption: string) => {
    const updated = [...formData.session_photos];
    updated[i] = { ...updated[i], caption };
    setFormData({ ...formData, session_photos: updated });
  };

  const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]";

  const filtered = filterCohort === "all" ? sessions : sessions.filter((s) => s.cohort === filterCohort);
  const cohorts = [...new Set(sessions.map((s) => s.cohort))];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold ${
          toast.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {toast.type === "success" ? <CheckCircle size={18} className="text-green-600" /> : <AlertCircle size={18} className="text-red-600" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Launchpad Sessions</h2>
          <p className="text-sm text-slate-500 mt-1">Manage cohort sessions, mentors, and archives</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/mentors"
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-[#39894c] border border-emerald-200 rounded-xl font-bold hover:bg-emerald-100 transition-all text-xs sm:text-sm"
          >
            <GraduationCap size={18} /> Manage Mentors Directly
          </Link>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#39894c] text-white rounded-xl font-bold hover:bg-[#2d7040] transition-all shadow-md text-xs sm:text-sm">
            <Plus size={18} /> Add Session
          </button>
        </div>
      </div>

      {/* ⭐ Featured One-on-One Mentorship Dedicated Manager Section */}
      {(() => {
        const featured = sessions.find((s) => s.is_featured) || sessions.find((s) => s.mentor_name.toLowerCase().includes("salman")) || sessions[0];
        return (
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-emerald-700/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#0ae448] shrink-0 bg-emerald-950 shadow-md">
                  {featured?.mentor_photo_url ? (
                    <Image src={featured.mentor_photo_url} alt={featured.mentor_name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-[#0ae448]">
                      {featured?.mentor_name ? featured.mentor_name.charAt(0) : "SK"}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#0ae448] text-[#08170d] font-bold tracking-wider">
                      ⭐ Featured 1-on-1 Mentorship
                    </span>
                    <span className="text-xs text-emerald-300 font-mono">
                      {featured?.cohort || "Cohort 1"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {featured ? `One-on-One Mentorship with ${featured.mentor_name}` : "Featured One-on-One Mentorship"}
                  </h3>
                  <p className="text-xs text-emerald-200 mt-1 line-clamp-2 max-w-xl leading-relaxed">
                    {featured?.summary || featured?.mentor_bio || "Weekly 1-on-1 mentorship sessions providing tailored career guidance."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (featured) openEdit(featured);
                  else openAdd();
                }}
                className="bg-[#0ae448] hover:bg-[#08c93e] text-[#08170d] font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all shrink-0 cursor-pointer"
              >
                <Edit size={16} /> Edit Featured 1-on-1 Mentorship
              </button>
            </div>
          </div>
        );
      })()}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Sessions", value: sessions.length, color: "text-[#39894c]" },
          { label: "Cohorts", value: cohorts.length, color: "text-blue-700" },
          { label: "Completed", value: sessions.filter((s) => s.status === "Completed").length, color: "text-purple-700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-medium mb-1">{stat.label}</p>
            <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      {cohorts.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">Filter:</span>
          {["all", ...cohorts].map((c) => (
            <button key={c} onClick={() => setFilterCohort(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterCohort === c ? "bg-[#39894c] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#39894c]"}`}>
              {c === "all" ? "All Cohorts" : c}
            </button>
          ))}
        </div>
      )}

      {/* Sessions List */}
      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="animate-spin text-[#39894c]" size={32} /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-16 text-center">
          <Rocket className="mx-auto mb-4 text-slate-300" size={48} />
          <p className="text-slate-500 font-medium">No sessions yet</p>
          <p className="text-slate-400 text-sm mt-1">Click "Add Session" to create your first session</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((session) => (
            <div key={session.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Mentor Photo */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    {session.mentor_photo_url ? (
                      <Image src={session.mentor_photo_url} alt={session.mentor_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#39894c]/10 flex items-center justify-center">
                        <GraduationCap className="text-[#39894c]" size={20} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-mono text-[#39894c] font-bold">Session {session.session_number}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{session.cohort}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${session.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {session.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 truncate">{session.title}</p>
                    <p className="text-xs text-slate-500">{session.mentor_name} · {session.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => setExpandedId(expandedId === session.id ? null : session.id)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all">
                    {expandedId === session.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <button onClick={() => openEdit(session)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                  {deleteConfirmId === session.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleDelete(session.id)} className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700">Confirm</button>
                      <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirmId(session.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                  )}
                </div>
              </div>

              {expandedId === session.id && (
                <div className="border-t border-slate-100 p-5 bg-slate-50 grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Summary</p>
                    <p className="text-slate-700 text-xs leading-relaxed">{session.summary || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Key Takeaways</p>
                    <ul className="space-y-1">
                      {(session.key_takeaways || []).map((t, i) => (
                        <li key={i} className="text-slate-700 text-xs flex items-start gap-2"><span className="text-[#39894c]">•</span>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Mentor</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-700 text-xs">{session.mentor_name}</span>
                      {session.mentor_linkedin && (
                        <a href={session.mentor_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <Linkedin size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Photos</p>
                    <div className="flex gap-2">
                      {(session.session_photos || []).filter(p => p.url).map((p, i) => (
                        <div key={i} className="relative w-16 h-10 rounded-lg overflow-hidden border border-slate-200">
                          <Image src={p.url} alt={p.caption || ""} fill className="object-cover" />
                        </div>
                      ))}
                      {!(session.session_photos || []).filter(p => p.url).length && <span className="text-xs text-slate-400">No photos</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingSession ? "Edit Session" : "Add New Session"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-7">

              {/* ⭐ Featured Checkbox Toggle */}
              <label className="flex items-center gap-3 cursor-pointer bg-emerald-50 hover:bg-emerald-100/70 p-3.5 rounded-xl border border-emerald-200 transition-all">
                <input
                  type="checkbox"
                  checked={formData.is_featured || false}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-[#39894c] accent-[#39894c] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">⭐ Mark as Featured One-on-One Mentorship Card</p>
                  <p className="text-[11px] text-slate-500">Showcases this mentor &amp; session inside the Featured Mentorship banner on website</p>
                </div>
              </label>

              {/* ── SECTION: Basic Info ── */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Rocket size={12} /> Basic Info
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Session #</label>
                    <input type="number" required value={formData.session_number}
                      onChange={(e) => setFormData({ ...formData, session_number: parseInt(e.target.value) })}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Cohort</label>
                    <input required value={formData.cohort}
                      onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                      placeholder="e.g. Cohort 1" className={inputCls} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Session Title *</label>
                  <input required value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Career Purpose & Personal Growth" className={inputCls} />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Category</label>
                    <select value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={inputCls}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Date</label>
                    <input value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="October 12, 2024" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Time</label>
                    <input value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="10:00 AM - 1:00 PM" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Status</label>
                  <select value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={inputCls}>
                    <option>Completed</option>
                    <option>Upcoming</option>
                    <option>In Progress</option>
                  </select>
                </div>
              </div>

              {/* ── SECTION: Mentor ── */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap size={12} /> Mentor Details
                </p>

                {/* Photo Upload & Crop */}
                <div className="mb-3">
                  <AdminImageUploader
                    label="Mentor Photo *"
                    imageUrl={formData.mentor_photo_url}
                    uploadType="launchpad"
                    defaultAspect="1:1"
                    onChange={(url) => setFormData((prev) => ({ ...prev, mentor_photo_url: url }))}
                    helpText="Crop mentor portrait picture with 1:1 ratio."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Mentor Name *</label>
                    <input required value={formData.mentor_name}
                      onChange={(e) => setFormData({ ...formData, mentor_name: e.target.value })}
                      placeholder="e.g. Sipehre Shamsi" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1 block">Mentor Role</label>
                    <input value={formData.mentor_role}
                      onChange={(e) => setFormData({ ...formData, mentor_role: e.target.value })}
                      placeholder="e.g. Lead Facilitator" className={inputCls} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block flex items-center gap-1">
                    <Linkedin size={12} className="text-blue-600" /> LinkedIn URL
                  </label>
                  <input value={formData.mentor_linkedin}
                    onChange={(e) => setFormData({ ...formData, mentor_linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username" className={inputCls} />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Mentor Bio</label>
                  <textarea rows={3} value={formData.mentor_bio}
                    onChange={(e) => setFormData({ ...formData, mentor_bio: e.target.value })}
                    placeholder="Brief background about the mentor..."
                    className={`${inputCls} resize-none`} />
                </div>
              </div>

              {/* ── SECTION: Content ── */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Session Content</p>

                <div className="mb-3">
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">Session Summary</label>
                  <textarea rows={3} value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="What was this session about?"
                    className={`${inputCls} resize-none`} />
                </div>

              </div>

              {/* ── SECTION: Session Photos ── */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Camera size={12} /> Session Photos
                  <span className="font-normal normal-case text-slate-400 ml-1">(max {MAX_PHOTOS} photos)</span>
                </p>
                <BulkPhotoUploader
                  photos={formData.session_photos}
                  onAdd={addPhotos}
                  onRemove={removePhoto}
                  onCaptionChange={updatePhotoCaption}
                />
                <p className="text-[11px] text-slate-400 mt-2">Upload JPEG, PNG or WebP images. Max 5MB each.</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#39894c] text-white rounded-xl font-bold hover:bg-[#2d7040] disabled:opacity-50 transition-all text-sm shadow-md">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? "Saving..." : editingSession ? "Update Session" : "Create Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
