import React from "react";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Learn how Surgetech Solar handles and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Privacy Policy</h1>
          <p className="text-lg text-surface-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="glass-dark rounded-3xl p-8 md:p-12 border border-white/5 text-surface-200 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              At Surgetech Solar, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., to generate a formal quote or schedule an installation).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
