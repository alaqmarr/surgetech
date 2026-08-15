"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

export function SendQuoteButton({ enquiryId, status }: { enquiryId: string, status: string }) {
  const [isSending, setIsSending] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleSendQuote = async () => {
    setIsSending(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customMessage }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send quote");
      }

      toast.success("Formal quote sent successfully!");
      setCurrentStatus("QUOTED");
      setShowModal(false);
      
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
    <>
      <Button 
        variant="solar" 
        onClick={() => setShowModal(true)}
      >
        <Send className="w-4 h-4 mr-2" />
        Send Formal Quote
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="bg-navy-900 border border-white/10 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-heading text-lg font-bold text-white">Send Formal Quote</h3>
              <button onClick={() => setShowModal(false)} disabled={isSending} className="p-2 text-surface-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-surface-300 mb-4">
                This will generate a formal quote and dispatch an email to the customer. You can optionally include a custom message below.
              </p>
              
              <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">Custom Message (Optional)</label>
              <textarea 
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="E.g., Thank you for taking our call today. As discussed, we are offering an additional 5% discount on the inverter..."
                className="w-full px-4 py-3 bg-navy-950 rounded-xl border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
              />
              
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowModal(false)} disabled={isSending}>
                  Cancel
                </Button>
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
                      Send Quote
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
