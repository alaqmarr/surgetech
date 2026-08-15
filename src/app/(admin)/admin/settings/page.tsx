"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, Save, ShieldAlert, Phone, Mail, MapPin, Server, Key } from "lucide-react";
import toast from "react-hot-toast";
import { NotificationEmailsManager } from "@/components/admin/notification-emails-manager";

interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass?: string; // Only for sending updates
}

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [settings, setSettings] = useState<SiteSettings>({
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPass: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({
            contactEmail: data.contactEmail || "",
            contactPhone: data.contactPhone || "",
            contactAddress: data.contactAddress || "",
            smtpHost: data.smtpHost || "",
            smtpPort: data.smtpPort ? String(data.smtpPort) : "",
            smtpUser: data.smtpUser || "",
            smtpPass: "", // Never populate password from server
          });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Settings saved successfully!");
        setSettings(prev => ({ ...prev, smtpPass: "" })); // Clear password field after save
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse text-cyan-400">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-heading">Settings</h1>
        <p className="text-surface-300">Manage site configuration, contact details, and SMTP mailer settings.</p>
      </div>

      {/* Public Contact Details */}
      <div id="site-details" className="glass-dark rounded-2xl border border-white/10 overflow-hidden scroll-mt-24">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center">
          <Phone className="h-5 w-5 text-cyan-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Public Contact Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200 flex items-center gap-2"><Mail className="h-4 w-4" /> Support Email</label>
              <input 
                type="email" 
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                placeholder="info@surgetechsolar.com"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200 flex items-center gap-2"><Phone className="h-4 w-4" /> Phone Number</label>
              <input 
                type="text" 
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-surface-200 flex items-center gap-2"><MapPin className="h-4 w-4" /> Office Address</label>
            <textarea 
              name="contactAddress"
              value={settings.contactAddress}
              onChange={handleChange}
              rows={2}
              className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} variant="primary" className="min-w-[120px]">
              {isSaving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Details</>}
            </Button>
          </div>
        </div>
      </div>

      {/* Nodemailer SMTP Settings */}
      <div id="email-config" className="glass-dark rounded-2xl border border-white/10 overflow-hidden scroll-mt-24">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center">
            <Server className="h-5 w-5 text-amber-400 mr-3" />
            <h2 className="text-xl font-bold text-white">SMTP Email Configuration</h2>
          </div>
          <span className="px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-400 rounded-md">Nodemailer</span>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-surface-400 mb-6">These credentials are used by Nodemailer to dispatch automated quotes and enquiry responses.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200">SMTP Host</label>
              <input 
                type="text" 
                name="smtpHost"
                value={settings.smtpHost}
                onChange={handleChange}
                placeholder="smtp.gmail.com"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200">SMTP Port</label>
              <input 
                type="number" 
                name="smtpPort"
                value={settings.smtpPort}
                onChange={handleChange}
                placeholder="465 or 587"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200">Username / Email</label>
              <input 
                type="text" 
                name="smtpUser"
                value={settings.smtpUser}
                onChange={handleChange}
                placeholder="you@domain.com"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200 flex items-center justify-between">
                <span>Password / App Password</span>
                {settings.smtpUser && !settings.smtpPass && <span className="text-xs text-green-400">Password is set (Hidden)</span>}
              </label>
              <input 
                type="password" 
                name="smtpPass"
                value={settings.smtpPass}
                onChange={handleChange}
                placeholder="Leave blank to keep existing"
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} variant="secondary" className="min-w-[120px]">
              {isSaving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save SMTP</>}
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Profile Details */}
      <NotificationEmailsManager />

      <div id="profile" className="glass-dark rounded-2xl border border-white/10 overflow-hidden scroll-mt-24 mt-8">
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center">
          <User className="h-5 w-5 text-cyan-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Admin Profile</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200">Full Name</label>
              <input 
                type="text" 
                defaultValue={session?.user?.name || ""} 
                disabled
                className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-surface-400 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-surface-200">Email Address</label>
              <input 
                type="email" 
                defaultValue={session?.user?.email || ""} 
                disabled
                className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-surface-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
