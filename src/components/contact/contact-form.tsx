"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! We will get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">First Name</label>
          <input 
            type="text" 
            name="firstName"
            required
            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            required
            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">Interest / Inquiry Type</label>
        <select name="type" className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all appearance-none">
          <option value="Residential Solar Quote" className="bg-navy-900">Residential Solar Quote</option>
          <option value="Commercial/Industrial Quote" className="bg-navy-900">Commercial/Industrial Quote</option>
          <option value="Customer Support / Maintenance" className="bg-navy-900">Customer Support / Maintenance</option>
          <option value="Partnership Inquiry" className="bg-navy-900">Partnership Inquiry</option>
          <option value="Other" className="bg-navy-900">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-surface-200 mb-2 uppercase tracking-wider">Message</label>
        <textarea 
          rows={5}
          name="message"
          required
          className="w-full px-5 py-4 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/5 focus:bg-white/5 text-white placeholder:text-white/30 transition-all resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <div className="pt-4">
        <Button variant="solar" size="lg" className="w-full py-6 text-lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Sending...
              <Loader2 className="ml-3 h-5 w-5 animate-spin" />
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-3 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
