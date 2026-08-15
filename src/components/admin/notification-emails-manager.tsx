"use client";

import { useState, useEffect } from "react";
import { Mail, Plus, Trash2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface NotificationEmail {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
}

export function NotificationEmailsManager() {
  const [emails, setEmails] = useState<NotificationEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const fetchEmails = async () => {
    try {
      const res = await fetch("/api/admin/settings/notification-emails");
      if (res.ok) {
        const data = await res.json();
        setEmails(data);
      }
    } catch (error) {
      console.error("Failed to fetch notification emails", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    
    setIsAdding(true);
    try {
      const res = await fetch("/api/admin/settings/notification-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, name: newName }),
      });

      if (!res.ok) throw new Error("Failed to add email");

      toast.success("Email added successfully");
      setNewEmail("");
      setNewName("");
      fetchEmails();
    } catch (error) {
      toast.error("Error adding email");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/settings/notification-emails/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      
      toast.success("Email removed");
      setEmails(emails.filter(e => e.id !== id));
    } catch (error) {
      toast.error("Error removing email");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/settings/notification-emails/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      setEmails(emails.map(e => e.id === id ? { ...e, isActive: !currentStatus } : e));
      toast.success(currentStatus ? "Email disabled" : "Email enabled");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  if (isLoading) {
    return <div className="animate-pulse p-6 bg-white/5 rounded-2xl">Loading emails...</div>;
  }

  return (
    <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden mt-8">
      <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-cyan-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Admin Notification Emails</h2>
        </div>
        <span className="px-2.5 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-400 rounded-md">Alerts</span>
      </div>
      <div className="p-6">
        <p className="text-sm text-surface-400 mb-6">These email addresses will receive BCC notifications whenever a new contact form or enquiry is submitted.</p>
        
        <form onSubmit={handleAdd} className="flex gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Name (Optional)" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
          <input 
            type="email" 
            placeholder="admin@example.com" 
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-[2] bg-navy-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
          <Button type="submit" disabled={isAdding} className="bg-cyan-500 hover:bg-cyan-600 text-navy-950 font-bold shrink-0">
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />} Add Email
          </Button>
        </form>

        <div className="space-y-3">
          {emails.length === 0 ? (
            <div className="text-center p-6 bg-white/5 rounded-xl text-surface-400 text-sm border border-dashed border-white/10">
              No notification emails added yet. Add one above to start receiving alerts.
            </div>
          ) : (
            emails.map((email) => (
              <div key={email.id} className="flex items-center justify-between p-4 bg-navy-900/50 rounded-xl border border-white/5">
                <div>
                  <div className="font-semibold text-white">{email.email}</div>
                  {email.name && <div className="text-xs text-surface-400">{email.name}</div>}
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={email.isActive}
                        onChange={() => toggleActive(email.id, email.isActive)}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${email.isActive ? 'bg-cyan-500' : 'bg-surface-600'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${email.isActive ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-surface-300">
                      {email.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </label>
                  <button 
                    onClick={() => handleDelete(email.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
