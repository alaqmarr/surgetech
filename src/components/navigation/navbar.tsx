"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Solutions", href: "/solutions" },
  { name: "Equipment", href: "/equipment" },
  { name: "Zero Bill Guide", href: "/net-metering" },
  { name: "Location Check", href: "/pincode-checker" },
  { name: "Solar Calculator", href: "/solar-calculator" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="glass-dark rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80" aria-label="Surgetech Solar Home">
                <div className="bg-white/90 p-1.5 rounded-xl">
                  <Image 
                    src="/logo.jpg" 
                    alt="Surgetech Solar Logo" 
                    width={140} 
                    height={40} 
                    className="h-8 w-auto mix-blend-multiply" 
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-surface-200 transition-colors hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/contact">
                <Button variant="solar" className="rounded-full px-6 shadow-md">Get a Quote</Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="flex p-2 lg:hidden items-center justify-center text-white transition-colors hover:bg-white/10 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-950/95 backdrop-blur-2xl lg:hidden pt-32 pb-8 px-6 flex flex-col justify-between overflow-y-auto"
          >
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-heading font-bold text-white hover:text-cyan-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-12 flex flex-col gap-4">
              <Link href="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="solar" className="w-full h-16 text-xl rounded-2xl shadow-[0_10px_30px_rgba(247,148,29,0.3)]">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/solar-calculator" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full h-16 text-xl rounded-2xl glass-dark border border-white/20 text-white">
                  Calculate Savings
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
