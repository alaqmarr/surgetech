import React from "react";
import { HelpCircle } from "lucide-react";
import { FAQ } from "@/components/home/faq";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about solar panel installation, maintenance, and costs.",
};

export default function FAQPage() {
  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <HelpCircle className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Support</span>
          </div>
        </div>

        {/* We can re-use the existing FAQ component from the home page! */}
        <FAQ />
      </div>
    </div>
  );
}
