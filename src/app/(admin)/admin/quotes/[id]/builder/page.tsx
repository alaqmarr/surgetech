import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { QuoteBuilderClient } from "./builder-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function QuoteBuilderPage({ params }: { params: Promise<{ id: string }> }) {
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Quotation Builder</h1>
          <p className="text-surface-400">
            Quote #{quote.quoteNumber} • For {quote.enquiry.name || "Customer"}
          </p>
        </div>
      </div>

      <QuoteBuilderClient quote={quote} />
    </div>
  );
}
