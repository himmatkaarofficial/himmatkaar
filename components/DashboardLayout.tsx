"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  LogOut,
  Bell,
  User
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "coordinator" | "admin";
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
  userName?: string;
  userEmail?: string;
}

export default function DashboardLayout({ 
  children, 
  role, 
  navigation,
  userName = "User Name",
  userEmail = "user@example.com"
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roleColors = {
    student: "#3a8a4d",
    coordinator: "#2563eb",
    admin: "#dc2626"
  };

  const roleLabels = {
    student: "Student",
    coordinator: "Coordinator",
    admin: "Administrator"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu size={24} />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/himmatkaar-logo.jpg"
                  alt="HimmatKaar"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="font-bold text-xl hidden sm:block">HimmatKaar</span>
              </Link>
              <span 
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: roleColors[role] }}
              >
                {roleLabels[role]}
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
                    >
                      <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">Welcome to your dashboard!</p>
                          <p className="text-xs text-gray-500 mt-1">Just now</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/login">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut size={20} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Always rendered on desktop, conditionally on mobile */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
              {/* User Profile */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#a3caad] flex items-center justify-center">
                    <User className="text-[#17431f]" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-sm text-gray-600 truncate">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

