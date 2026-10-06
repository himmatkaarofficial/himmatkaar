"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus, Edit, Trash2, Calendar, MapPin, Clock, UserPlus,
  X, Upload, Loader2, Link2, Copy, Check, Lock, Unlock, Sparkles, AlertCircle, ExternalLink
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
  status: string; // 'upcoming' | 'past' | 'cancelled'
  image: string;
  registration_link?: string;
  registration_closed?: boolean;
}

export default function AdminEventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "10:00 AM",
    location: "",
    type: "Workshop",
    capacity: 100,
    registered: 0,
    status: "upcoming",
    image: "",
    registration_link: "",
    registration_closed: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events?limit=100&status=all", { cache: "no-store" });
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("error", "Failed to fetch events");
    } fontually: {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingEvent ? `/api/events/${editingEvent.id}` : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchEvents();
        closeModal();
        showToast(
          "success",
          editingEvent ? "Event updated successfully!" : "Event created successfully!"
        );
      } else {
        const data = await response.json();
        showToast("error", data.error || "Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      showToast("error", "Failed to save event");
    }
  };

  const toggleRegistrationClosed = async (event: Event) => {
    const newStatus = !event.registration_closed;
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration_closed: newStatus }),
      });

      if (response.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, registration_closed: newStatus } : e))
        );
        showToast(
          "success",
          newStatus
            ? `Registration for "${event.title}" is now CLOSED 🔒`
            : `Registration for "${event.title}" is now OPEN 🔓`
        );
      } else {
        showToast("error", "Failed to update registration status");
      }
    } catch (error) {
      console.error("Error updating registration status:", error);
      showToast("error", "Failed to update registration status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchEvents();
        showToast("success", "Event deleted successfully!");
      } else {
        showToast("error", "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      showToast("error", "Failed to delete event");
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "10:00 AM",
      location: "",
      type: "Workshop",
      capacity: 100,
      registered: 0,
      status: "upcoming",
      image: "",
      registration_link: "",
      registration_closed: false,
    });
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      type: event.type || "Workshop",
      capacity: event.capacity || 100,
      registered: event.registered || 0,
      status: (event.status || "upcoming").toLowerCase(),
      image: event.image || "",
      registration_link: event.registration_link || "",
      registration_closed: !!event.registration_closed,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const upcomingEvents = events.filter((e) => (e.status || "").toLowerCase() === "upcoming");
  const pastEvents = events.filter((e) => (e.status || "").toLowerCase() === "past");

  const displayedEvents =
    activeTab === "upcoming"
      ? upcomingEvents
      : activeTab === "past"
      ? pastEvents
      : events;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="text-[#39894c]" size={28} />
            Events Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage upcoming events, past archives, registration links, and registration status
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#39894c] text-white rounded-xl hover:bg-[#2d5f3d] transition-all font-bold shadow-lg shadow-[#39894c]/20 shrink-0 cursor-pointer"
        >
          <Plus size={20} />
          Create New Event
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Total Events</p>
          <p className="text-3xl font-extrabold text-slate-900">{events.length}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 shadow-sm">
          <p className="text-xs text-emerald-700 font-bold mb-1 uppercase tracking-wider">🚀 Upcoming Events</p>
          <p className="text-3xl font-extrabold text-[#39894c]">{upcomingEvents.length}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">📜 Past Events</p>
          <p className="text-3xl font-extrabold text-slate-700">{pastEvents.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Registrations Open</p>
          <p className="text-3xl font-extrabold text-blue-600">
            {upcomingEvents.filter((e) => !e.registration_closed).length}
          </p>
        </div>
      </div>

      {/* ⭐ DEDICATED UPCOMING EVENTS SECTION (Always visible when there are upcoming events) ⭐ */}
      {upcomingEvents.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-700/50 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-[#0ae448] text-[#08170d] font-bold tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} /> Upcoming Events Section
              </span>
              <span className="text-xs text-emerald-200 font-mono">({upcomingEvents.length} Active)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#081b0f] border border-emerald-700/60 rounded-xl p-5 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                    <button
                      onClick={() => toggleRegistrationClosed(evt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                        evt.registration_closed
                          ? "bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30"
                          : "bg-[#0ae448]/20 text-[#0ae448] border border-[#0ae448]/40 hover:bg-[#0ae448]/30"
                      }`}
                      title="Click to toggle registration status"
                    >
                      {evt.registration_closed ? (
                        <>
                          <Lock size={12} /> Registration Closed
                        </>
                      ) : (
                        <>
                          <Unlock size={12} /> Registration Open
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-emerald-200 line-clamp-2 mb-3 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-emerald-300 mb-4">
                    <span>📅 {evt.date}</span>
                    <span>📍 {evt.location}</span>
                    {evt.time && <span>⏰ {evt.time}</span>}
                  </div>

                  {/* Registration Link Bar */}
                  {evt.registration_link ? (
                    <div className="bg-[#0a2614] border border-emerald-600/40 rounded-lg p-2.5 flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0 text-xs text-emerald-200 font-mono">
                        <Link2 size={14} className="text-[#0ae448] shrink-0" />
                        <span className="truncate">{evt.registration_link}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => copyToClipboard(evt.registration_link!, evt.id)}
                          className="p-1.5 hover:bg-emerald-800 rounded text-emerald-300 transition-colors"
                          title="Copy registration link"
                        >
                          {copiedId === evt.id ? <Check size={14} className="text-[#0ae448]" /> : <Copy size={14} />}
                        </button>
                        <a
                          href={evt.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-emerald-800 rounded text-emerald-300 transition-colors"
                          title="Open link"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-950/40 border border-yellow-700/40 rounded-lg p-2 text-xs text-yellow-200/90 font-mono mb-3">
                      ⚠️ No registration link set. Click Edit to add link.
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400">
                    Status: <strong className="text-white uppercase">{evt.status}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(evt)}
                      className="px-3 py-1.5 bg-[#0ae448] text-[#08170d] font-bold rounded-lg text-xs hover:bg-[#08c93e] transition-all cursor-pointer"
                    >
                      Edit Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "all", label: `📁 All Events (${events.length})` },
          { id: "upcoming", label: `🚀 Upcoming (${upcomingEvents.length})` },
          { id: "past", label: `📜 Past (${pastEvents.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#39894c] text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#39894c]" size={48} />
        </div>
      ) : displayedEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
          <Calendar className="mx-auto mb-4 text-slate-300" size={56} />
          <p className="text-slate-700 font-bold text-lg">No Events Found</p>
          <p className="text-slate-500 text-sm mt-1">
            Click "Create New Event" to add an event.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedEvents.map((event) => {
            const isUpcoming = (event.status || "").toLowerCase() === "upcoming";
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0 bg-slate-100">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-mono text-xs">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[11px] font-bold text-slate-900 border border-slate-200">
                        {event.type || "Event"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase ${
                          isUpcoming
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Calendar className="text-[#39894c] shrink-0" size={16} />
                          <span className="font-semibold">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Clock className="text-[#39894c] shrink-0" size={16} />
                          <span>{event.time || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <MapPin className="text-[#39894c] shrink-0" size={16} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Registration Link info for Upcoming Events */}
                      {isUpcoming && (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-4">
                          <div className="flex items-center gap-2 truncate">
                            <Link2 className="text-[#39894c] shrink-0" size={16} />
                            <span className="font-semibold text-slate-700">Registration Link:</span>
                            {event.registration_link ? (
                              <a
                                href={event.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline font-mono truncate hover:text-blue-800"
                              >
                                {event.registration_link}
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">No link provided</span>
                            )}
                          </div>

                          <button
                            onClick={() => toggleRegistrationClosed(event)}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                              event.registration_closed
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-green-100 text-green-700 border border-green-200"
                            }`}
                          >
                            {event.registration_closed ? (
                              <>
                                <Lock size={12} /> Registration Closed
                              </>
                            ) : (
                              <>
                                <Unlock size={12} /> Registration Open
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#39894c]/10 text-[#39894c] rounded-lg hover:bg-[#39894c] hover:text-white transition-all font-semibold text-xs cursor-pointer"
                      >
                        <Edit size={16} /> Edit Event
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Create / Edit Event Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Event Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="Youth Leadership Summit 2026"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm resize-none bg-white text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="Provide detailed description of your event..."
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="e.g. 10:00 AM - 01:00 PM"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="Faisalabad Convention Center / Online Zoom"
                />
              </div>

              {/* Event Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Event Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Summit, Workshop, Meetup, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium"
                  >
                    <option value="upcoming">Upcoming Event</option>
                    <option value="past">Past Event</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* 🚀 CONDITIONAL FIELDS FOR UPCOMING EVENTS */}
              {formData.status === "upcoming" && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-4">
                  <p className="text-xs font-bold text-[#39894c] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> Upcoming Event Registration Settings
                  </p>

                  {/* Registration Link Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Link2 size={13} className="text-[#39894c]" /> Registration Form / Link URL
                    </label>
                    <input
                      type="url"
                      value={formData.registration_link}
                      onChange={(e) =>
                        setFormData({ ...formData, registration_link: e.target.value })
                      }
                      placeholder="https://forms.google.com/your-event-form"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c] transition-all text-sm bg-white text-slate-900 font-medium placeholder:text-slate-400"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Provide Google Form, WhatsApp, or external registration URL for attendees.
                    </p>
                  </div>

                  {/* Registration Closed Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg border border-slate-200 hover:border-emerald-300 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.registration_closed}
                      onChange={(e) =>
                        setFormData({ ...formData, registration_closed: e.target.checked })
                      }
                      className="w-4 h-4 text-[#39894c] accent-[#39894c] rounded cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        🔒 Registration Closed Option
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Check this box when you want to stop/close registrations for this event.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Event Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Event Banner Image *
                </label>
                <div className="space-y-3">
                  {formData.image && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all cursor-pointer font-medium text-xs">
                      <Upload size={16} />
                      {uploading ? "Uploading..." : "Upload Event Banner"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {uploading && <Loader2 className="animate-spin text-[#39894c]" size={18} />}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Max 5MB. Recommended resolution: 16:9 ratio (1200x675).
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-[#39894c] text-white rounded-xl hover:bg-[#2d5f3d] transition-all font-bold disabled:opacity-50 shadow-md text-sm cursor-pointer"
                >
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium text-sm cursor-pointer"
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
