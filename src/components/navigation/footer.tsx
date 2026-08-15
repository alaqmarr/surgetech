import Link from "next/link";
import { Sun } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-surface-50 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Surgetech Solar Home">
              <div className="bg-navy-900/50 rounded-xl p-3 flex items-center justify-center shadow-lg shadow-white/5">
                <Image 
                  src="/logo.jpg" 
                  alt="Surgetech Solar Logo" 
                  width={200} 
                  height={200} 
                  className="h-10 w-auto mix-blend-multiply" 
                />
              </div>
            </Link>
            <p className="text-sm text-surface-300 max-w-sm mb-6 leading-relaxed">
              Clean Energy. Better Tomorrow. We deliver smart, reliable solar solutions designed to generate clean power and reduce your energy costs.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Solutions</h4>
            <ul className="flex flex-col gap-4 text-sm text-surface-400">
              <li><Link href="/solutions/residential" className="hover:text-cyan-400 transition-colors">Residential</Link></li>
              <li><Link href="/solutions/commercial" className="hover:text-cyan-400 transition-colors">Commercial</Link></li>
              <li><Link href="/solutions/industrial" className="hover:text-cyan-400 transition-colors">Industrial</Link></li>
              <li><Link href="/solutions/solar-battery" className="hover:text-cyan-400 transition-colors">Solar + Battery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Equipment</h4>
            <ul className="flex flex-col gap-4 text-sm text-surface-400">
              <li><Link href="/equipment/panels" className="hover:text-cyan-400 transition-colors">Panels</Link></li>
              <li><Link href="/equipment/inverters" className="hover:text-cyan-400 transition-colors">Inverters</Link></li>
              <li><Link href="/equipment/batteries" className="hover:text-cyan-400 transition-colors">Batteries</Link></li>
              <li><Link href="/equipment/structures" className="hover:text-cyan-400 transition-colors">Structures</Link></li>
              <li><Link href="/equipment/street-lights" className="hover:text-cyan-400 transition-colors">Street Lights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-surface-400">
              <li><Link href="/services/installation" className="hover:text-cyan-400 transition-colors">Installation</Link></li>
              <li><Link href="/services/maintenance" className="hover:text-cyan-400 transition-colors">Maintenance</Link></li>
              <li><Link href="/services/servicing" className="hover:text-cyan-400 transition-colors">Servicing</Link></li>
              <li><Link href="/services/upgrades" className="hover:text-cyan-400 transition-colors">Upgrades</Link></li>
              <li><Link href="/services/consultation" className="hover:text-cyan-400 transition-colors">Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-surface-400">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link href="/solar-calculator" className="hover:text-cyan-400 transition-colors">Solar Calculator</Link></li>
              <li><Link href="/faq" className="hover:text-cyan-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-surface-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Surgetech Solar. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-surface-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
