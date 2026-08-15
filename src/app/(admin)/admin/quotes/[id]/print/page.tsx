import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrintButton } from "./print-button";

export const dynamic = 'force-dynamic';

export default async function QuotePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return notFound();
  }

  const { id } = await params;

  const quote = await prisma.quote.findUnique({
    where: { id },
    include: {
      lineItems: {
        orderBy: { sortOrder: "asc" }
      },
      enquiry: {
        include: {
          calculationSnapshot: true,
        }
      }
    }
  });

  if (!quote) {
    return notFound();
  }

  const siteSettings = await prisma.siteSettings.findFirst();

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans print:m-0 max-w-4xl mx-auto rounded-xl shadow-2xl print:shadow-none overflow-hidden relative">
      
      {/* Non-Printable Header Actions */}
      <div className="bg-slate-100 p-4 flex justify-between items-center border-b border-slate-200 print:hidden rounded-t-xl">
        <h2 className="font-bold text-slate-700">Print Preview</h2>
        <PrintButton quoteId={quote.id} />
      </div>

      <div className="p-10 md:p-14 print:p-0">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg mb-4 print:shadow-none">
              <span className="text-white text-3xl font-bold font-heading">S</span>
            </div>
            <h1 className="text-3xl font-bold font-heading text-slate-900 tracking-tight">Surgetech Solar</h1>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">{siteSettings?.contactAddress || "123 Solar Park, Industrial Area, Green City, 400001"}</p>
            <p className="text-slate-500 text-sm">{siteSettings?.contactPhone || "+91 98765 43210"}</p>
            <p className="text-slate-500 text-sm">{siteSettings?.contactEmail || "quotes@surgetechsolar.com"}</p>
          </div>
          
          <div className="text-right">
            <h2 className="text-4xl font-bold text-slate-200 tracking-widest uppercase mb-4 print:text-slate-300">Quotation</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="font-semibold">Quote #:</span>
              <span>{quote.quoteNumber}</span>
              <span className="font-semibold">Date:</span>
              <span>{new Date(quote.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span className="font-semibold">Valid Until:</span>
              <span>{new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-8 mb-12 border-t border-b border-slate-200 py-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quote For</h3>
            <p className="font-bold text-slate-800 text-lg">{quote.enquiry.name || "Customer"}</p>
            <p className="text-slate-600">{quote.enquiry.email}</p>
            <p className="text-slate-600">{quote.enquiry.phone}</p>
            <p className="text-slate-600">Pincode: {quote.enquiry.pinCode}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Specifications</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="font-medium text-slate-600">System Type:</span>
              <span className="font-bold text-slate-800">{quote.systemType || "On-Grid Solar PV"}</span>
              <span className="font-medium text-slate-600">Structure:</span>
              <span className="font-bold text-slate-800">{quote.structureType || "Flush Mount"}</span>
              <span className="font-medium text-slate-600">Property Type:</span>
              <span className="font-bold text-slate-800">{quote.enquiry.propertyType}</span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-12 min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-800">
                <th className="py-3 px-2 font-bold text-slate-800 text-sm w-12 text-center">#</th>
                <th className="py-3 px-2 font-bold text-slate-800 text-sm">Description</th>
                <th className="py-3 px-2 font-bold text-slate-800 text-sm text-center">Qty</th>
                <th className="py-3 px-2 font-bold text-slate-800 text-sm text-right">Price (₹)</th>
                <th className="py-3 px-2 font-bold text-slate-800 text-sm text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {quote.lineItems.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-200">
                  <td className="py-4 px-2 text-slate-500 text-center">{index + 1}</td>
                  <td className="py-4 px-2">
                    <p className="font-bold text-slate-800">{item.name}</p>
                    {item.description && <p className="text-slate-500 text-sm mt-1">{item.description}</p>}
                  </td>
                  <td className="py-4 px-2 text-center text-slate-700">{item.quantity} <span className="text-xs text-slate-400">{item.uom}</span></td>
                  <td className="py-4 px-2 text-right text-slate-700">{(item.unitPrice || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-2 text-right font-bold text-slate-800">{(item.total || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
              {quote.lineItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">No items added to this quote yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-16">
          <div className="w-80">
            <div className="flex justify-between py-2 text-sm text-slate-600">
              <span>Subtotal</span>
              <span>₹{(quote.subtotal || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            
            {quote.discount && quote.discount > 0 ? (
              <div className="flex justify-between py-2 text-sm text-emerald-600 font-medium">
                <span>Discount</span>
                <span>-₹{quote.discount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            ) : null}
            
            <div className="flex justify-between py-2 text-sm text-slate-600">
              <span>GST (18%)</span>
              <span>₹{(quote.taxAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between py-4 border-t-2 border-slate-800 text-lg font-bold text-slate-900 mt-2">
              <span>Grand Total</span>
              <span>₹{(quote.totalAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Terms & Notes */}
        <div className="grid grid-cols-2 gap-8 text-sm text-slate-600">
          <div>
            <h4 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">Terms & Conditions</h4>
            <div className="whitespace-pre-line text-slate-500">
              {quote.terms || "Standard terms apply."}
            </div>
          </div>
          <div>
            {quote.notes && (
              <>
                <h4 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-xs">Notes</h4>
                <div className="whitespace-pre-line text-slate-500">
                  {quote.notes}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
          <p>Thank you for your business!</p>
          <p className="mt-1">This is a computer generated document. No signature is required.</p>
        </div>

      </div>
    </div>
  );
}
