"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Message {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  status: string;
  subscribed_at: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'messages' | 'subscribers'>('messages');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [messagesRes, subscribersRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/newsletter')
      ]);
      const messagesData = await messagesRes.json();
      const subscribersData = await subscribersRes.json();
      setMessages(messagesData.messages || []);
      setSubscribers(subscribersData.subscribers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      });
      fetchData();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <AdminLayout title="Messages & Subscribers">
      <div className="space-y-6">
        <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-3 rounded-lg font-semibold ${activeTab === 'messages' ? 'bg-[#39894c] text-white' : 'bg-white text-slate-700'}`}
            >
              Contact Messages ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-6 py-3 rounded-lg font-semibold ${activeTab === 'subscribers' ? 'bg-[#39894c] text-white' : 'bg-white text-slate-700'}`}
            >
              Newsletter ({subscribers.length})
            </button>
          </div>

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{msg.first_name} {msg.last_name}</h3>
                      <p className="text-sm text-slate-600">{msg.email} • {msg.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${msg.status === 'unread' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {msg.status}
                      </span>
                      {msg.status === 'unread' && (
                        <button onClick={() => markAsRead(msg.id)} className="px-3 py-1 bg-[#39894c] text-white rounded-lg text-xs font-semibold">
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-2">{msg.message}</p>
                  <p className="text-xs text-slate-500">{new Date(msg.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-slate-100">
                      <td className="px-6 py-4 text-slate-900">{sub.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </AdminLayout>
  );
}



