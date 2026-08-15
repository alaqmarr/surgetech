import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminEnquiries() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      quotes: true
    }
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-heading text-white">Enquiries</h2>
      </div>
      
      <div className="glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Bill</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-surface-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-surface-300">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(enq.createdAt))}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-white">{enq.name || "N/A"}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm text-surface-200">{enq.email || "N/A"}</div>
                    <div className="text-sm text-surface-400">{enq.phone || "N/A"}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-surface-300">
                    {enq.pinCode}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-cyan-400 font-bold">
                    ₹{enq.monthlyBill.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border
                      ${enq.status === 'NEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                      ${enq.status === 'QUOTED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                      ${enq.status === 'CONVERTED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      ${enq.status === 'CLOSED' ? 'bg-white/5 text-surface-400 border-white/10' : ''}
                    `}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/enquiries/${enq.id}`} className="text-cyan-400 hover:text-cyan-300 hover:underline transition-all">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
              
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-surface-400">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <span className="text-2xl opacity-50">📥</span>
                      </div>
                      <p>No enquiries found. Wait for users to use the calculator.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
