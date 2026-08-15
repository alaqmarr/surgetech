"use client";

import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function PrintButton({ quoteId }: { quoteId: string }) {
  const router = useRouter();
  
  return (
    <div className="flex gap-3">
      <Button variant="ghost" onClick={() => router.push(`/admin/quotes/${quoteId}/builder`)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Builder
      </Button>
      <Button variant="solar" onClick={() => window.print()}>
        <Printer className="w-4 h-4 mr-2" />
        Print Quote
      </Button>
    </div>
  );
}
