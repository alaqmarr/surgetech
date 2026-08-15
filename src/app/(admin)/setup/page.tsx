import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import SetupForm from "./setup-form";

export const dynamic = 'force-dynamic';

export default async function SetupPage() {
  const adminCount = await prisma.adminUser.count();

  if (adminCount > 0) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-navy-950 gradient-mesh-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-cyan-500/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
             <span className="text-white text-3xl font-bold">S</span>
           </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white font-heading">
          Initial Setup
        </h2>
        <p className="mt-2 text-center text-sm text-surface-400">
          Create the first SUPER_ADMIN account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-dark py-8 px-4 border border-white/10 shadow-2xl sm:rounded-2xl sm:px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <SetupForm />
        </div>
      </div>
    </div>
  );
}
