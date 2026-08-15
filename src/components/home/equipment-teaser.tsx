import { ArrowRight, ShieldCheck, Zap, SunMedium, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Tier-1 Equipment",
    description: "We exclusively source from globally recognized, bankable manufacturers.",
    icon: SunMedium,
  },
  {
    title: "25-Year Warranties",
    description: "Long-term performance guarantees on panels and inverters.",
    icon: ShieldCheck,
  },
  {
    title: "Precision Engineering",
    description: "Custom structural and electrical designs for maximum yield.",
    icon: Settings,
  },
  {
    title: "Seamless Integration",
    description: "Smart grid syncing and advanced battery storage capabilities.",
    icon: Zap,
  }
];

export function EquipmentTeaser() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-navy-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Typography & Features */}
          <div className="order-2 lg:order-1">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
              ENGINEERING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">EXCELLENCE.</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-300 font-medium leading-relaxed mb-12 max-w-lg">
              A solar system is only as good as its weakest link. That&apos;s why we refuse to compromise on quality, pairing top-tier components with meticulous installation standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                    <feature.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                  <p className="text-sm text-surface-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto glass-dark text-white border-white/20 hover:bg-white/10">
                Discover Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Immersive Visual */}
          <div className="order-1 lg:order-2 relative w-full aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 border border-white/10 rounded-[2rem]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-navy-900/0 to-transparent blur-2xl" />
            
            <Image 
              src="/engineering-excellence.jpg"
              alt="Solar Architecture Render"
              fill
              className="object-cover rounded-[1.5rem] p-2 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent rounded-[2rem] pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
