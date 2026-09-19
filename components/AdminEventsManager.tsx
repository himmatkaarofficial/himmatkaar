"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, Edit, Trash2, Eye, Calendar, MapPin, Clock, UserPlus, 
  Filter, X, Upload, Loader2
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  capacity: number;
  registered: number;
  status: string;
  image: string;
}

export default function AdminEventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "",
    capacity: 0,
    registered: 0,
    status: "upcoming",
    image: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?limit=100&status=all', { cache: 'no-store' });
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
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
      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchEvents();
        closeModal();
        alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchEvents();
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "",
      capacity: 0,
      registered: 0,
      status: "upcoming",
      image: ""
    });
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      capacity: event.capacity,
      registered: event.registered,
      status: event.status,
      image: event.image
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
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
          Create New Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Events</p>
          <p className="text-3xl font-extrabold text-slate-900">{events.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Total Registrations</p>
          <p className="text-3xl font-extrabold text-slate-900">{events.reduce((sum, e) => sum + e.registered, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Avg. Attendance</p>
          <p className="text-3xl font-extrabold text-slate-900">
            {events.length > 0 ? Math.round(events.reduce((sum, e) => sum + (e.registered / e.capacity * 100), 0) / events.length) : 0}%
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 font-medium mb-2">Upcoming</p>
          <p className="text-3xl font-extrabold text-slate-900">{events.filter(e => e.status === 'upcoming').length}</p>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-80 h-64 md:h-auto relative overflow-hidden flex-shrink-0">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-900">
                    {event.type}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    event.status === 'upcoming' ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#39894c]/10 rounded-lg">
                      <Calendar className="text-[#39894c]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Date</p>
                      <p className="text-sm font-bold text-slate-900">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#39894c]/10 rounded-lg">
                      <Clock className="text-[#39894c]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Time</p>
                      <p className="text-sm font-bold text-slate-900">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#39894c]/10 rounded-lg">
                      <MapPin className="text-[#39894c]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Location</p>
                      <p className="text-sm font-bold text-slate-900">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UserPlus className="text-slate-500" size={16} />
                      <span className="text-sm text-slate-500 font-medium">Registrations</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{event.registered} / {event.capacity}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#39894c] rounded-full transition-all duration-500" 
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => openEditModal(event)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#39894c]/10 text-[#39894c] rounded-lg hover:bg-[#39894c] hover:text-white transition-all font-medium"
                  >
                    <Edit size={18} />
                    Edit Event
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
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
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Youth Leadership Summit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="09:00 AM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  placeholder="Faisalabad Convention Center"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Event Type *</label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                    placeholder="Summit, Workshop, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Capacity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Registered</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.registered}
                    onChange={(e) => setFormData({...formData, registered: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Image *</label>
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
                  {editingEvent ? 'Update Event' : 'Create Event'}
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

