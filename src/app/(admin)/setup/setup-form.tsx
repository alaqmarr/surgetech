"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function SetupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Setup complete! Please sign in.");
      router.push("/admin/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-surface-200">Full Name</label>
        <div className="mt-2">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-4 py-3 bg-navy-900/50 border border-white/10 rounded-xl shadow-inner placeholder-surface-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all hover:bg-navy-900/80"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-surface-200">Email address</label>
        <div className="mt-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-3 bg-navy-900/50 border border-white/10 rounded-xl shadow-inner placeholder-surface-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all hover:bg-navy-900/80"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-surface-200">Password</label>
        <div className="mt-2">
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-4 py-3 bg-navy-900/50 border border-white/10 rounded-xl shadow-inner placeholder-surface-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all hover:bg-navy-900/80"
            placeholder="••••••••"
          />
        </div>
        <p className="mt-2 text-xs text-surface-400">Must be at least 8 characters long.</p>
      </div>

      <div className="pt-2">
        <Button type="submit" variant="solar" className="w-full py-6 text-lg font-bold" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </Button>
      </div>
    </form>
  );
}
