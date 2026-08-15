"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function SendQuoteButton({ enquiryId, status }: { enquiryId: string, status: string }) {
  const [isSending, setIsSending] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleSendQuote = async () => {
    setIsSending(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/quote`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send quote");
      }

      toast.success("Formal quote sent successfully!");
      setCurrentStatus("QUOTED");
      
      // We could optionally reload the page to fetch the new quotes list
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error: any) {
      toast.error(error.message || "Failed to send quote");
    } finally {
      setIsSending(false);
    }
  };

  if (currentStatus === "QUOTED") {
    return (
      <Button variant="solar" disabled className="bg-green-500/20 text-green-400 border border-green-500/30">
        <CheckCircle2 className="w-4 h-4 mr-2" />
        Quote Sent
      </Button>
    );
  }

  return (
    <Button 
      variant="solar" 
      onClick={handleSendQuote} 
      disabled={isSending}
    >
      {isSending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="w-4 h-4 mr-2" />
          Send Formal Quote
        </>
      )}
    </Button>
  );
}
