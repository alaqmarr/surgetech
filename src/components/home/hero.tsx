import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center pt-32 lg:pt-40 pb-48 md:pb-64">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-background.jpg" 
          alt="Futuristic Solar Home" 
          fill
          priority
          className="object-cover object-center scale-105 transform"
          quality={100}
        />
        {/* Dark overlays to ensure text readability */}
        <div className="absolute inset-0 bg-navy-950/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-flex items-center rounded-full glass border border-white/40 px-5 py-2.5 text-sm font-bold text-surface-200 shadow-[0_0_15px_rgba(0,255,255,0.2)] backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-500/50">
            <Sun className="mr-2 h-5 w-5 text-orange-500 animate-[spin_10s_linear_infinite]" />
            Powering a Brighter Tomorrow
          </div>
          
          <h1 className="mb-6 font-heading text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl leading-[1.05] drop-shadow-2xl">
            CLEAN ENERGY.<br />
            <span className="text-gradient">BETTER TOMORROW.</span>
          </h1>
          
          <p className="mb-12 text-xl md:text-2xl leading-relaxed text-surface-200 font-medium max-w-3xl mx-auto drop-shadow-md">
            Smart solar solutions for homes, businesses and industries — designed to generate clean energy, reduce electricity costs, and deliver dependable long-term performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/solar-calculator" className="w-full sm:w-auto">
              <Button variant="solar" size="lg" className="w-full text-lg h-16 px-10 shadow-[0_0_40px_rgba(247,148,29,0.3)]">
                Calculate My Savings
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/solutions" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full text-lg h-16 px-10 backdrop-blur-md bg-white/5 border border-white/20 hover:bg-white/15">
                Explore Solutions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
