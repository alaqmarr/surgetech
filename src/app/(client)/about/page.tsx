

import { Users, Target, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Surgetech Solar",
  description: "Learn about Surgetech Solar's mission, our engineering team, and our commitment to clean energy.",
};

const values = [
  {
    icon: Target,
    title: "Engineering Excellence",
    description: "We don't just sell panels; we engineer power plants. Every system is custom-designed for optimal yield and longevity."
  },
  {
    icon: Users,
    title: "Customer First",
    description: "From the initial consultation to 25 years down the line, our relationship with you is our highest priority."
  },
  {
    icon: Zap,
    title: "Uncompromising Quality",
    description: "We exclusively partner with global Tier-1 manufacturers. If we wouldn't put it on our own roof, we won't put it on yours."
  }
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-48 lg:pt-56 md:pb-16 md:pb-24 min-h-screen bg-navy-950 gradient-mesh-dark relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />

        {/* Hero */}
        <section className="relative z-10 mb-20 md:mb-32">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl text-center mx-auto">
               <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight text-white drop-shadow-md">
                 EMPOWERING THE TRANSITION TO <span className="text-gradient">CLEAN ENERGY.</span>
               </h1>
               <p className="text-xl md:text-2xl text-surface-200 leading-relaxed max-w-3xl mx-auto font-medium">
                 Surgetech Solar was founded with a singular mission: to make high-performance solar energy accessible, reliable, and financially brilliant for every homeowner and business.
               </p>
             </div>
           </div>
        </section>

        {/* Our Story */}
        <section className="relative z-10 mb-24 md:mb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-square md:aspect-[4/3] lg:aspect-square glass-dark rounded-[2rem] border border-white/10 overflow-hidden flex items-center justify-center text-surface-200 font-bold relative group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-green-500/5 group-hover:opacity-50 transition-opacity" />
                 <div className="absolute inset-0 border border-white/5 rounded-[2rem] z-20 pointer-events-none" />
                 {/* Placeholders for actual image */}
                 <div className="relative z-10 flex flex-col items-center">
                    <Users className="w-16 h-16 text-white/20 mb-4" />
                    <span className="text-white/40 tracking-widest uppercase text-sm">Company / Team Photo</span>
                 </div>
              </div>
              
              <div>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-8">
                  Not just another <span className="text-cyan-400">solar company.</span>
                </h2>
                <div className="space-y-6 text-lg text-surface-200 leading-relaxed font-medium">
                   <p>
                     The solar industry has grown rapidly, but so has the noise. Homeowners and businesses are often bombarded with aggressive sales tactics, confusing financial models, and sub-par equipment installations.
                   </p>
                   <p>
                     We started Surgetech Solar to provide an alternative: an engineering-first approach. We believe that a solar installation is a 25-year infrastructure project, not a quick retail transaction.
                   </p>
                   <p>
                     By combining transparent financial modeling, Tier-1 equipment, and meticulous installation standards, we deliver energy solutions that perform precisely as promised—year after year.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
                OUR <span className="text-gradient">CORE VALUES</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {values.map((val, index) => (
                 <div key={index} className="glass-dark p-10 rounded-[2rem] border border-white/10 shadow-lg hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group">
                   <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-colors">
                      <val.icon className="h-8 w-8 text-cyan-400" />
                   </div>
                   <h3 className="font-heading text-2xl font-bold text-white mb-4">{val.title}</h3>
                   <p className="text-surface-200 leading-relaxed">{val.description}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


