"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import TeamCardImage from "@/components/TeamCardImage";
import { 
  Plus, Edit, Trash2, Upload, Loader2, X, Filter, Linkedin, MapPin
} from "lucide-react";

interface Ambassador {
  id: string;
  name: string;
  role: string;
  city: string;
  bio: string;
  image: string;
  linkedin: string;
  display_order: number;
}

export default function AdminAmbassadorsManager() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAmbassador, setEditingAmbassador] = useState<Ambassador | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "Campus Ambassador",
    city: "",
    university: "",
    bio: "",
    image: "",
    linkedin: "",
    display_order: 0
  });

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  const fetchAmbassadors = async () => {
    try {
      const response = await fetch('/api/ambassadors');
      const data = await response.json();
      setAmbassadors(data.ambassadors || []);
    } catch (error) {
      console.error('Error fetching ambassadors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'ambassador');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingAmbassador ? `/api/ambassadors/${editingAmbassador.id}` : '/api/ambassadors';
      const method = editingAmbassador ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchAmbassadors();
        closeModal();
        alert(editingAmbassador ? 'Ambassador updated!' : 'Ambassador added!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save ambassador');
      }
    } catch (error) {
      console.error('Error saving ambassador:', error);
      alert('Failed to save ambassador');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ambassador?')) return;

    try {
      const response = await fetch(`/api/ambassadors/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchAmbassadors();
        alert('Ambassador deleted!');
      } else {
        alert('Failed to delete ambassador');
      }
    } catch (error) {
      console.error('Error deleting ambassador:', error);
      alert('Failed to delete ambassador');
    }
  };

  const openCreateModal = () => {
    setEditingAmbassador(null);
    setFormData({
      name: "",
      role: "Campus Ambassador",
      city: "",
      university: "",
      bio: "",
      image: "",
      linkedin: "",
      display_order: ambassadors.length
    });
    setShowModal(true);
  };

  const openEditModal = (ambassador: Ambassador) => {
    setEditingAmbassador(ambassador);
    setFormData({
      name: ambassador.name,
      role: ambassador.role,
      city: ambassador.city,
      university: (ambassador as any).university || "",
      bio: ambassador.bio,
      image: ambassador.image,
      linkedin: ambassador.linkedin,
      display_order: ambassador.display_order
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAmbassador(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#39894c]" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium shadow-sm">
            <Filter size={20} />
            Filter
          </button>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#39894c] text-white rounded-lg hover:bg-[#2d5f3d] transition-all font-bold shadow-lg shadow-[#39894c]/20"
        >
          <Plus size={20} />
          Add Ambassador
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Ambassadors</p>
          <p className="text-3xl font-extrabold text-slate-900">{ambassadors.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Cities Covered</p>
          <p className="text-3xl font-extrabold text-slate-900">{new Set(ambassadors.map(a => a.city)).size}</p>
        </div>
      </div>

      {/* Ambassadors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ambassadors.map((ambassador) => (
          <div key={ambassador.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-64 overflow-hidden">
              <TeamCardImage 
                src={ambassador.image} 
                alt={ambassador.name}
                name={ambassador.name}
                sizes="300px"
              />
              <div className="absolute inset-0 bg-[#2d5f3d]/40 pointer-events-none"></div>
              <div className="absolute top-4 right-4 bg-[#39894c] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <MapPin size={12} />
                {ambassador.city}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{ambassador.name}</h3>
              <p className="text-[#39894c] font-semibold mb-3 text-sm">{ambassador.role}</p>
              <p className="text-slate-600 leading-relaxed text-sm mb-4 line-clamp-3">{ambassador.bio}</p>
              
              {ambassador.linkedin && (
                <a 
                  href={ambassador.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-[#39894c] mb-4"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              )}

              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => openEditModal(ambassador)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#39894c]/10 text-[#39894c] rounded-lg hover:bg-[#39894c] hover:text-white transition-all text-sm font-medium"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(ambassador.id)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingAmbassador ? 'Edit Ambassador' : 'Add Ambassador'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Zainab Tariq"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Campus Ambassador"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Karachi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">University *</label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="University of Karachi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio *</label>
                <textarea
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Brief bio about the ambassador..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
                <input
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image *</label>
                <div className="space-y-3">
                  {formData.image && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-300">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all cursor-pointer font-medium">
                      <Upload size={18} />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {uploading && <Loader2 className="animate-spin text-[#39894c]" size={20} />}
                  </div>
                  <p className="text-xs text-slate-500">Max 5MB. Supported: JPEG, PNG, WebP</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-[#39894c] text-white rounded-lg hover:bg-[#2d5f3d] transition-all font-bold disabled:opacity-50 shadow-lg"
                >
                  {editingAmbassador ? 'Update Ambassador' : 'Add Ambassador'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

