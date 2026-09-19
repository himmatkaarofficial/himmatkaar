"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import { 
  Calendar,
  UserCircle,
  Award,
  MessageSquare,
  TrendingUp,
  Users,
  Mail,
  UserPlus,
  ShieldCheck
} from "lucide-react";

interface Stats {
  totalEvents: number;
  upcomingEvents: number;
  totalTeamMembers: number;
  totalAmbassadors: number;
  totalMessages: number;
  unreadMessages: number;
  totalSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalTeamMembers: 0,
    totalAmbassadors: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalSubscribers: 0
  });
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [promoteEmail, setPromoteEmail] = useState("");
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [promotingAdmin, setPromotingAdmin] = useState(false);
  const [adminUserMessage, setAdminUserMessage] = useState("");
  const [adminUserError, setAdminUserError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const createAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminUserMessage("");
    setAdminUserError("");
    setCreatingAdmin(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'create',
          email: newAdminEmail,
          password: newAdminPassword,
          fullName: newAdminName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setAdminUserError(data.error || 'Failed to create admin user.');
        return;
      }

      setAdminUserMessage(`Admin user created: ${data.user?.email || newAdminEmail}`);
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminName("");
    } catch (error) {
      console.error('Create admin error:', error);
      setAdminUserError('Failed to create admin user.');
    } finally {
      setCreatingAdmin(false);
    }
  };

  const promoteExistingUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminUserMessage("");
    setAdminUserError("");
    setPromotingAdmin(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'promote',
          email: promoteEmail,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setAdminUserError(data.error || 'Failed to promote user.');
        return;
      }

      setAdminUserMessage(`User promoted to admin: ${data.user?.email || promoteEmail}`);
      setPromoteEmail("");
    } catch (error) {
      console.error('Promote admin error:', error);
      setAdminUserError('Failed to promote user.');
    } finally {
      setPromotingAdmin(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [eventsRes, teamRes, ambassadorsRes, messagesRes, subscribersRes] = await Promise.all([
        fetch('/api/events?limit=100'),
        fetch('/api/team'),
        fetch('/api/ambassadors'),
        fetch('/api/contact'),
        fetch('/api/newsletter')
      ]);

      const eventsData = await eventsRes.json();
      const teamData = await teamRes.json();
      const ambassadorsData = await ambassadorsRes.json();
      const messagesData = await messagesRes.json();
      const subscribersData = await subscribersRes.json();

      const events = eventsData.events || [];
      const upcomingEvents = events.filter((e: any) => e.status === 'upcoming').length;
      const messages = messagesData.messages || [];
      const unreadMessages = messages.filter((m: any) => m.status === 'unread').length;

      setStats({
        totalEvents: events.length,
        upcomingEvents,
        totalTeamMembers: teamData.members?.length || 0,
        totalAmbassadors: ambassadorsData.ambassadors?.length || 0,
        totalMessages: messages.length,
        unreadMessages,
        totalSubscribers: subscribersData.subscribers?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39894c]"></div>
        </div>
      ) : (
        <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/dashboard/admin/events" className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#39894c]/10 rounded-lg group-hover:bg-[#39894c] transition-colors">
                      <Calendar className="text-[#39894c] group-hover:text-white transition-colors" size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                      <TrendingUp size={14} />
                      <span>{stats.upcomingEvents}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Total Events</p>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.totalEvents}</p>
                  <p className="text-xs text-slate-500 mt-2">{stats.upcomingEvents} upcoming</p>
                </Link>

                <Link href="/dashboard/admin/team" className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors">
                      <UserCircle className="text-blue-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Team Members</p>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.totalTeamMembers}</p>
                  <p className="text-xs text-slate-500 mt-2">Core team</p>
                </Link>

                <Link href="/dashboard/admin/ambassadors" className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors">
                      <Award className="text-purple-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Ambassadors</p>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.totalAmbassadors}</p>
                  <p className="text-xs text-slate-500 mt-2">Campus representatives</p>
                </Link>

                <Link href="/dashboard/admin/messages" className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-600 transition-colors">
                      <MessageSquare className="text-orange-600 group-hover:text-white transition-colors" size={24} />
                    </div>
                    {stats.unreadMessages > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                        {stats.unreadMessages} new
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Messages</p>
                  <p className="text-3xl font-extrabold text-slate-900">{stats.totalMessages}</p>
                  <p className="text-xs text-slate-500 mt-2">{stats.unreadMessages} unread</p>
                </Link>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/dashboard/admin/events" className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-[#39894c] hover:bg-[#39894c]/5 transition-all group">
                      <div className="p-2 bg-[#39894c]/10 rounded-lg group-hover:bg-[#39894c] transition-colors">
                        <Calendar className="text-[#39894c] group-hover:text-white transition-colors" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Create New Event</p>
                        <p className="text-xs text-slate-500">Add upcoming event</p>
                      </div>
                    </Link>

                    <Link href="/dashboard/admin/team" className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors">
                        <UserCircle className="text-blue-600 group-hover:text-white transition-colors" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Add Team Member</p>
                        <p className="text-xs text-slate-500">Manage core team</p>
                      </div>
                    </Link>

                    <Link href="/dashboard/admin/ambassadors" className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group">
                      <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors">
                        <Award className="text-purple-600 group-hover:text-white transition-colors" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Add Ambassador</p>
                        <p className="text-xs text-slate-500">Expand network</p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Newsletter Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Mail className="text-green-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 font-medium">Total Subscribers</p>
                        <p className="text-2xl font-extrabold text-slate-900">{stats.totalSubscribers}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="text-blue-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 font-medium">Total Reach</p>
                        <p className="text-2xl font-extrabold text-slate-900">{stats.totalTeamMembers + stats.totalAmbassadors + stats.totalSubscribers}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Admin User Management</h3>
                    <p className="text-sm text-slate-500 mt-1">Create a new dashboard user account or promote an existing user to admin.</p>
                  </div>
                  <div className="p-3 bg-[#39894c]/10 rounded-lg">
                    <ShieldCheck className="text-[#39894c]" size={22} />
                  </div>
                </div>

                {adminUserError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {adminUserError}
                  </div>
                )}

                {adminUserMessage && (
                  <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {adminUserMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <form onSubmit={createAdminUser} className="space-y-3 rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <UserPlus size={18} className="text-[#39894c]" />
                      Create New Admin User
                    </div>
                    <input
                      type="text"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                      placeholder="Full name (optional)"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                    />
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Temporary password (min 6 chars)"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                    />
                    <button
                      type="submit"
                      disabled={creatingAdmin}
                      className="w-full rounded-lg bg-[#39894c] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#2d5f3d] disabled:opacity-50"
                    >
                      {creatingAdmin ? 'Creating...' : 'Create Admin User'}
                    </button>
                  </form>

                  <form onSubmit={promoteExistingUser} className="space-y-3 rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <ShieldCheck size={18} className="text-[#39894c]" />
                      Promote Existing User
                    </div>
                    <input
                      type="email"
                      required
                      value={promoteEmail}
                      onChange={(e) => setPromoteEmail(e.target.value)}
                      placeholder="existing-user@example.com"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#39894c]/20 focus:border-[#39894c]"
                    />
                    <button
                      type="submit"
                      disabled={promotingAdmin}
                      className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                      {promotingAdmin ? 'Promoting...' : 'Promote To Admin'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-[#2d5f3d] to-[#39894c] rounded-xl p-8 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome to Himmatkaar Admin Portal</h2>
                <p className="text-white/90 mb-6">
                  Manage your events, team members, ambassadors, and communications all in one place.
                </p>
                <div className="flex gap-4">
                  <Link href="/dashboard/admin/events" className="px-6 py-3 bg-white text-[#2d5f3d] rounded-lg font-bold hover:bg-white/90 transition-all">
                    Get Started
                  </Link>
                  <Link href="/" className="px-6 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30 transition-all">
                    View Website
                  </Link>
                </div>
              </div>
            </div>
          )}
    </AdminLayout>
  );
}



