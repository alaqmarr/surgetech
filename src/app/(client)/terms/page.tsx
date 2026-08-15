import React from "react";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Surgetech Solar's website and services.",
};

export default function TermsPage() {
  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Terms of Service</h1>
          <p className="text-lg text-surface-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="glass-dark rounded-3xl p-8 md:p-12 border border-white/5 text-surface-200 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Surgetech Solar website and services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Solar Calculator</h2>
            <p>
              The solar calculator provided on this website is for informational and estimation purposes only. It uses generic regional data and mathematical assumptions to provide an approximate calculation of potential solar generation, costs, and savings. 
              <strong> The results are not a guarantee of actual system performance or financial returns.</strong> A formal, customized quote provided after a physical site inspection may differ from these estimates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              The website and its original content, features, and functionality are owned by Surgetech Solar and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Surgetech Solar, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

