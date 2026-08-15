"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileEdit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function BuildQuoteButton({ enquiryId }: { enquiryId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBuildQuote = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/draft-quote`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create draft quote");
      }

      const { quote } = await res.json();
      router.push(`/admin/quotes/${quote.id}/builder`);
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate quote builder");
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleBuildQuote} 
      disabled={isLoading}
      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <FileEdit className="w-4 h-4 mr-2" />
      )}
      Build Custom Quote
    </Button>
  );
}
