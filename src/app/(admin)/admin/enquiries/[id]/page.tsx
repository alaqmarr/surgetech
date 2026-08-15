import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SendQuoteButton } from "./send-quote-button";

export const dynamic = 'force-dynamic';

export default async function EnquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const enquiry = await prisma.enquiry.findUnique({
    where: { id },
    include: {
      calculationSnapshot: true,
      quotes: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!enquiry) {
    notFound();
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  const formatDate = (dateString: Date) => 
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(dateString));

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold font-heading text-white mb-8">Enquiry Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-dark shadow-2xl rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
          <h3 className="text-xl font-bold mb-6 text-cyan-400 relative z-10">Contact Information</h3>
          <dl className="space-y-5 relative z-10">
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Name</dt>
              <dd className="mt-1 text-lg text-white font-bold">{enquiry.name || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Email</dt>
              <dd className="mt-1 text-lg text-white font-bold">{enquiry.email || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Phone</dt>
              <dd className="mt-1 text-lg text-white font-bold">{enquiry.phone || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Date Submitted</dt>
              <dd className="mt-1 text-lg text-white">{formatDate(enquiry.createdAt)}</dd>
            </div>
          </dl>
        </div>

        <div className="glass-dark shadow-2xl rounded-2xl p-8 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
          <h3 className="text-xl font-bold mb-6 text-amber-400 relative z-10">Property Details</h3>
          <dl className="space-y-5 relative z-10">
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">PIN Code</dt>
              <dd className="mt-1 text-lg text-white font-bold">{enquiry.pinCode}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Property Type</dt>
              <dd className="mt-1 text-lg text-white font-bold capitalize">{enquiry.propertyType}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-surface-400 uppercase tracking-wider">Monthly Bill</dt>
              <dd className="mt-1 text-lg text-white font-bold">{formatCurrency(enquiry.monthlyBill)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {enquiry.calculationSnapshot.length > 0 && (
        <div className="bg-cyan-950/30 shadow-2xl rounded-2xl p-8 border border-cyan-500/30 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full" />
          <h3 className="text-xl font-bold mb-6 text-cyan-400 relative z-10">Calculation Snapshot</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
             <div className="bg-navy-950/50 p-4 rounded-xl border border-white/5">
               <p className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-2">System Size</p>
               <p className="text-3xl font-bold text-cyan-400">{enquiry.calculationSnapshot[0]?.recommendedSystemSizeKw} kW</p>
             </div>
             <div className="bg-navy-950/50 p-4 rounded-xl border border-white/5">
               <p className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-2">Annual Savings</p>
               <p className="text-3xl font-bold text-green-400">{formatCurrency(enquiry.calculationSnapshot[0]?.annualSavings)}</p>
             </div>
             <div className="bg-navy-950/50 p-4 rounded-xl border border-white/5">
               <p className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-2">Payback Period</p>
               <p className="text-3xl font-bold text-white">{enquiry.calculationSnapshot[0]?.paybackYears} years</p>
             </div>
             <div className="bg-navy-950/50 p-4 rounded-xl border border-white/5">
               <p className="text-sm font-semibold text-surface-400 uppercase tracking-wider mb-2">25Y Benefit</p>
               <p className="text-3xl font-bold text-white">{formatCurrency(enquiry.calculationSnapshot[0]?.lifetimeSavings25Y)}</p>
             </div>
          </div>
        </div>
      )}

      <div className="glass-dark shadow-2xl rounded-2xl p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
          <h3 className="text-xl font-bold text-blue-400 mb-4 md:mb-0">Quotes & Communication</h3>
          <SendQuoteButton enquiryId={enquiry.id} status={enquiry.status} />
        </div>

        <div className="relative z-10">
          {enquiry.quotes.length > 0 ? (
            <div className="space-y-4">
              {enquiry.quotes.map(quote => (
                <div key={quote.id} className="p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/5 transition-colors">
                   <div className="flex justify-between items-center">
                     <p className="font-bold text-lg text-white">{formatCurrency(0)}</p>
                     <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-bold">{quote.status}</span>
                   </div>
                   <p className="text-sm text-surface-400 mt-2">{formatDate(quote.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-surface-400">
               No quotes have been sent yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
