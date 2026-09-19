"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { 
  Calendar,
  Search,
  Bell,
  UserCircle,
  Award,
  MessageSquare,
  LogOut,
  FileText
} from "lucide-react";
import { signOut } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      setLoggingOut(true);
      try {
        await signOut();
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
        setLoggingOut(false);
      }
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-off-white)]">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <Image src="/himmatkaar-logo.jpg" alt="Himmatkaar Logo" width={48} height={68} className="rounded-lg" />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[var(--color-courage-green)] font-heading">Himmatkaar</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-body">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 font-body">Management</div>
          
          <Link 
            href="/dashboard/admin" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserCircle size={20} className={isActive('/dashboard/admin') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Dashboard</span>
          </Link>

          <Link 
            href="/dashboard/admin/events" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin/events') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar size={20} className={isActive('/dashboard/admin/events') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Events</span>
          </Link>

          <Link 
            href="/dashboard/admin/team" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin/team') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserCircle size={20} className={isActive('/dashboard/admin/team') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Team</span>
          </Link>

          <Link 
            href="/dashboard/admin/ambassadors" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin/ambassadors') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Award size={20} className={isActive('/dashboard/admin/ambassadors') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Ambassadors</span>
          </Link>

          <Link 
            href="/dashboard/admin/blog" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin/blog') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText size={20} className={isActive('/dashboard/admin/blog') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Blog</span>
          </Link>

          <Link 
            href="/dashboard/admin/messages" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group font-body ${
              isActive('/dashboard/admin/messages') 
                ? 'bg-[var(--color-courage-green)] text-white font-semibold shadow-md' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare size={20} className={isActive('/dashboard/admin/messages') ? '' : 'group-hover:text-[var(--color-courage-green)] transition-colors'} />
            <span className="text-sm">Messages</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium disabled:opacity-50 font-body"
          >
            <LogOut size={20} />
            <span className="text-sm">{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-10">
            <h2 className="text-2xl font-bold text-[var(--color-courage-green)] font-heading">{title}</h2>
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-courage-green)] transition-colors" size={20} />
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--color-courage-green)]/20 focus:border-[var(--color-courage-green)] transition-all placeholder:text-slate-400 focus:outline-none font-body" 
                placeholder="Search..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-50 relative transition-colors">
              <Bell size={22} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 font-body">Admin</p>
                <p className="text-xs text-slate-500 font-medium font-body">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[var(--color-courage-green)]/20 bg-[var(--color-courage-green)]/10 flex items-center justify-center">
                <span className="text-[var(--color-courage-green)] font-bold text-sm font-body">A</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[var(--color-off-white)]">
          {children}
        </main>
      </div>
    </div>
  );
}

