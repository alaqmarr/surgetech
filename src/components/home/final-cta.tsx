import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/final-cta-bg.jpg" 
          alt="Futuristic Solar Facility" 
          fill
          priority
          className="object-cover object-center scale-105 transform"
          quality={100}
        />
        {/* Dark overlays to ensure text readability */}
        <div className="absolute inset-0 bg-navy-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto glass-dark backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          
          <div className="mb-6 inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-bold text-cyan-400 tracking-widest uppercase">
            <Zap className="mr-2 h-4 w-4" />
            Join the Revolution
          </div>
          
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
            POWERING A BRIGHTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">TOMORROW.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-surface-200 mb-10 max-w-2xl mx-auto font-medium">
            Ready to understand what solar could do for your home or business? Take the first step towards energy independence today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/solar-calculator" className="w-full sm:w-auto">
              <Button variant="solar" size="lg" className="w-full text-lg h-16 px-8 shadow-[0_10px_30px_rgba(247,148,29,0.3)] hover:shadow-[0_15px_40px_rgba(247,148,29,0.5)] transition-all">
                Calculate My Savings
                <Calculator className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full text-lg h-16 px-8 bg-white/5 hover:bg-white/15 border-white/20 backdrop-blur-md">
                Get a Solar Assessment
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
