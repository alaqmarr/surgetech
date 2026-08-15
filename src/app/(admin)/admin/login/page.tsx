"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully");
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 gradient-mesh-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-cyan-500/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
             <span className="text-white text-3xl font-bold">S</span>
           </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white font-heading">
          Surgetech Admin
        </h2>
        <p className="mt-2 text-center text-sm text-surface-400">
          Sign in to manage your solar business
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-dark py-8 px-4 border border-white/10 shadow-2xl sm:rounded-2xl sm:px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-surface-200">Email address</label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-navy-900/50 border border-white/10 rounded-xl shadow-inner placeholder-surface-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all hover:bg-navy-900/80"
                  placeholder="admin@surgetech.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-surface-200">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-navy-900/50 border border-white/10 rounded-xl shadow-inner placeholder-surface-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent sm:text-sm transition-all hover:bg-navy-900/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="solar" className="w-full py-6 text-lg font-bold" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
