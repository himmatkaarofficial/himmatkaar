"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  Cpu, 
  Layers,
  ExternalLink
} from "lucide-react";
import AdminImageUploader from "./AdminImageUploader";

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  category: "managing" | "tech";
  display_order: number;
  created_at?: string;
}

export default function AdminPartnerManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "managing" | "tech">("all");
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    logo_url: string;
    category: "managing" | "tech";
    display_order: number;
  }>({
    name: "",
    logo_url: "",
    category: "managing",
    display_order: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/partners", { cache: "no-store" });
      const data = await res.json();
      setPartners(data.partners || []);
    } catch {
      showToast("error", "Failed to fetch partners");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = (category: "managing" | "tech" = "managing") => {
    setEditingPartner(null);
    setFormData({
      name: "",
      logo_url: "",
      category,
      display_order: partners.filter((p) => p.category === category).length + 1,
    });
    setShowModal(true);
  };

  const openEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      category: partner.category,
      display_order: partner.display_order ?? 0,
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", "partner");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logo_url: data.url }));
        showToast("success", "Logo uploaded successfully!");
      } else {
        showToast("error", data.error || "Upload failed");
      }
    } catch {
      showToast("error", "Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logo_url) {
      showToast("error", "Please upload or provide a logo image");
      return;
    }

    setSaving(true);
    try {
      if (editingPartner) {
        const res = await fetch(`/api/partners/${editingPartner.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast("success", "Partner logo updated!");
      } else {
        const res = await fetch("/api/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showToast("success", "Partner logo added successfully!");
      }
      setShowModal(false);
      fetchPartners();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save partner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showToast("success", "Partner logo removed");
      setDeleteConfirmId(null);
      fetchPartners();
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete partner");
    }
  };

  const managingPartners = partners.filter((p) => p.category === "managing");
  const techPartners = partners.filter((p) => p.category === "tech");

  const filteredPartners =
    activeTab === "all"
      ? partners
      : activeTab === "managing"
      ? managingPartners
      : techPartners;

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold transition-all ${
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Partner Logos Manager</h2>
          <p className="text-sm text-slate-500 mt-1 font-body">
            Manage Managing Partners and Tech Partners logo marquees on the homepage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAdd("managing")}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#39894c] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2d7040] transition-all shadow-md cursor-pointer"
          >
            <Plus size={16} /> Add Managing Partner
          </button>
          <button
            onClick={() => openAdd("tech")}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md cursor-pointer"
          >
            <Plus size={16} /> Add Tech Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-[#39894c] rounded-xl">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Partners</p>
            <p className="text-2xl font-extrabold text-slate-900">{partners.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Managing Partners</p>
            <p className="text-2xl font-extrabold text-blue-600">{managingPartners.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tech Partners</p>
            <p className="text-2xl font-extrabold text-purple-600">{techPartners.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: "all", label: `All Logos (${partners.length})` },
          { key: "managing", label: `Managing Partners (${managingPartners.length})` },
          { key: "tech", label: `Tech Partners (${techPartners.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-[#39894c] text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Managing Partners */}
      {(activeTab === "all" || activeTab === "managing") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#39894c]" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Our Managing Partners ({managingPartners.length})
              </h3>
            </div>
            <button
              onClick={() => openAdd("managing")}
              className="text-xs font-bold text-[#39894c] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Add Logo
            </button>
          </div>

          {managingPartners.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <Building2 className="mx-auto mb-2 text-slate-300" size={36} />
              <p className="text-sm font-semibold text-slate-600">No Managing Partner logos added yet</p>
              <button
                onClick={() => openAdd("managing")}
                className="mt-3 px-4 py-1.5 bg-[#39894c]/10 text-[#39894c] rounded-lg text-xs font-bold hover:bg-[#39894c]/20 transition-all cursor-pointer"
              >
                + Add First Managing Partner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {managingPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between hover:border-[#39894c] hover:shadow-md transition-all group"
                >
                  {/* Logo Display Card (Mimics Homepage White Box) */}
                  <div className="relative w-full h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 mb-3 overflow-hidden">
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 truncate mb-1" title={partner.name}>
                      {partner.name}
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-[#39894c] font-semibold">
                      Managing Partner
                    </span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openEdit(partner)}
                      className="p-1.5 text-slate-500 hover:text-[#39894c] hover:bg-[#39894c]/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>

                    {deleteConfirmId === partner.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-1.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(partner.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section 2: Tech Partners */}
      {(activeTab === "all" || activeTab === "tech") && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Our Tech Partners ({techPartners.length})
              </h3>
            </div>
            <button
              onClick={() => openAdd("tech")}
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Add Logo
            </button>
          </div>

          {techPartners.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <Cpu className="mx-auto mb-2 text-slate-300" size={36} />
              <p className="text-sm font-semibold text-slate-600">No Tech Partner logos added yet</p>
              <button
                onClick={() => openAdd("tech")}
                className="mt-3 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-bold hover:bg-purple-100 transition-all cursor-pointer"
              >
                + Add First Tech Partner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {techPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between hover:border-purple-500 hover:shadow-md transition-all group"
                >
                  {/* Logo Display Card */}
                  <div className="relative w-full h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 mb-3 overflow-hidden">
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 truncate mb-1" title={partner.name}>
                      {partner.name}
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 text-purple-600 font-semibold">
                      Tech Partner
                    </span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openEdit(partner)}
                      className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>

                    {deleteConfirmId === partner.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-1.5 py-1 bg-slate-100 text-slate-600 rounded text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(partner.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                {editingPartner ? "Edit Partner Logo" : "Add Partner Logo"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Partner Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block font-body">
                  Partner Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: "managing" })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.category === "managing"
                        ? "bg-[#39894c] text-white border-[#39894c] shadow-md"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Building2 size={16} /> Managing Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: "tech" })}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.category === "tech"
                        ? "bg-purple-600 text-white border-purple-600 shadow-md"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Cpu size={16} /> Tech Partner
                  </button>
                </div>
              </div>

              {/* Partner Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block font-body">
                  Partner Name *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. The Cabinet / Cybergen"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                />
              </div>

              {/* Logo Upload & Crop */}
              <AdminImageUploader
                label="Partner Logo Image *"
                imageUrl={formData.logo_url}
                uploadType="partner"
                defaultAspect="1:1"
                onChange={(url) => setFormData((prev) => ({ ...prev, logo_url: url }))}
                helpText="Crop logo with 1:1 Square ratio or custom ratio for optimal marquee alignment."
              />

              {/* Display Order */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block font-body">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-6 py-2.5 bg-[#39894c] hover:bg-[#2d7040] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {editingPartner ? "Update Partner Logo" : "Add Partner Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
