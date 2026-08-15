"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, Building2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // If this is the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-navy-950 gradient-mesh-dark overflow-hidden selection:bg-cyan-500/30 print:bg-white print:overflow-visible print:h-auto">
      {/* Sidebar */}
      <aside className="w-64 glass-dark border-r border-white/10 flex flex-col relative z-20 print:hidden">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <h1 className="text-xl font-bold font-heading text-white flex items-center">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/20">
                <span className="text-white text-sm">S</span>
             </div>
             Admin Panel
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                pathname === "/admin/dashboard" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                  : "text-surface-200 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <LayoutDashboard className={`mr-3 h-5 w-5 ${pathname === "/admin/dashboard" ? "text-cyan-400" : "text-surface-400"}`} />
              Dashboard
            </Link>
            
            <Link
              href="/admin/enquiries"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                pathname.startsWith("/admin/enquiries") 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                  : "text-surface-200 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Users className={`mr-3 h-5 w-5 ${pathname.startsWith("/admin/enquiries") ? "text-cyan-400" : "text-surface-400"}`} />
              Enquiries
            </Link>

            <Link
              href="/admin/projects"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                pathname.startsWith("/admin/projects") 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                  : "text-surface-200 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Building2 className={`mr-3 h-5 w-5 ${pathname.startsWith("/admin/projects") ? "text-cyan-400" : "text-surface-400"}`} />
              Projects
            </Link>
            
            <Link
              href="/admin/settings"
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                pathname === "/admin/settings" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                  : "text-surface-200 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <Settings className={`mr-3 h-5 w-5 ${pathname === "/admin/settings" ? "text-cyan-400" : "text-surface-400"}`} />
              Settings
            </Link>
            
            {pathname.startsWith("/admin/settings") && (
              <div className="pl-12 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                <Link href="/admin/settings#site-details" className="block py-2 text-xs text-surface-400 hover:text-cyan-400">Site Contact Details</Link>
                <Link href="/admin/settings#email-config" className="block py-2 text-xs text-surface-400 hover:text-cyan-400">SMTP Configuration</Link>
                <Link href="/admin/settings#profile" className="block py-2 text-xs text-surface-400 hover:text-cyan-400">Admin Profile</Link>
              </div>
            )}
          </nav>
        </div>

        <div className="p-5 border-t border-white/10 bg-white/5">
          <div className="flex items-center mb-5 px-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3 shadow-md">
               {session?.user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-surface-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 print:overflow-visible">
        <div className="p-6 md:p-10 print:p-0">
           {children}
        </div>
      </main>
    </div>
  );
}
