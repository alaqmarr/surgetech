import { prisma } from "@/lib/db";
import { Users, FileText, CheckCircle, Activity } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalEnquiries, newEnquiries, quotesSent, totalAdminUsers] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.quote.count({ where: { status: "SENT" } }),
    prisma.adminUser.count(),
  ]);

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold font-heading text-white mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex flex-row items-center justify-between pb-4 relative z-10">
            <h3 className="text-sm font-medium text-surface-200">Total Enquiries</h3>
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
               <Users className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-bold text-white mb-1">{totalEnquiries}</div>
            <p className="text-xs text-surface-400">All time leads</p>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
          <div className="flex flex-row items-center justify-between pb-4 relative z-10">
            <h3 className="text-sm font-medium text-surface-200">New Enquiries</h3>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
               <Activity className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-bold text-white mb-1">{newEnquiries}</div>
            <p className="text-xs text-amber-400/80">Needs attention</p>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />
          <div className="flex flex-row items-center justify-between pb-4 relative z-10">
            <h3 className="text-sm font-medium text-surface-200">Quotes Sent</h3>
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
               <FileText className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-bold text-white mb-1">{quotesSent}</div>
            <p className="text-xs text-surface-400">Awaiting response</p>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-green-500/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-all" />
          <div className="flex flex-row items-center justify-between pb-4 relative z-10">
            <h3 className="text-sm font-medium text-surface-200">Admin Users</h3>
            <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
               <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl font-bold text-white mb-1">{totalAdminUsers}</div>
            <p className="text-xs text-surface-400">Active staff members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
