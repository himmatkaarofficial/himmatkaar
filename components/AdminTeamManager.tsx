"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import TeamCardImage from "@/components/TeamCardImage";
import { 
  Plus, Edit, Trash2, Upload, Loader2, X, Filter, Linkedin
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  display_order: number;
}

export default function AdminTeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    linkedin: "",
    display_order: 0
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/team', { cache: 'no-store' });
      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
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
    formData.append('type', 'team');

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
      const url = editingMember ? `/api/team/${editingMember.id}` : '/api/team';
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchMembers();
        closeModal();
        alert(editingMember ? 'Team member updated!' : 'Team member added!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save team member');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save team member');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const response = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchMembers();
        alert('Team member deleted!');
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member');
    }
  };

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      linkedin: "",
      display_order: members.length
    });
    setShowModal(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      linkedin: member.linkedin,
      display_order: member.display_order
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
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
          Add Team Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Members</p>
          <p className="text-3xl font-extrabold text-slate-900">{members.length}</p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-80 overflow-hidden">
              <TeamCardImage 
                src={member.image} 
                alt={member.name}
                name={member.name}
                sizes="400px"
              />
              <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
              <p className="text-[#39894c] font-semibold mb-3">{member.role}</p>
              <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
              
              {member.linkedin && (
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#39894c] mb-4"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                </a>
              )}

              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => openEditModal(member)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#39894c]/10 text-[#39894c] rounded-lg hover:bg-[#39894c] hover:text-white transition-all font-medium"
                >
                  <Edit size={18} />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(member.id)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Trash2 size={18} />
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
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
                  placeholder="Ahmed Khan"
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
                  placeholder="Founder & CEO"
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
                  placeholder="Brief bio about the team member..."
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
                  {editingMember ? 'Update Member' : 'Add Member'}
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

