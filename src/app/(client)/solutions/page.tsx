import Link from "next/link";
import { ArrowRight, Home, Building2, Factory } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Solutions | Surgetech Solar",
  description: "Discover our comprehensive solar solutions for residential, commercial, and industrial properties.",
};

const solutions = [
  {
    id: "residential",
    title: "Residential Solar",
    description: "Empower your home with clean energy. Slash your monthly electricity bills and increase your property value with our premium home solar installations.",
    icon: Home,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "commercial",
    title: "Commercial Solar",
    description: "Turn your unused roof space into a profit center. Stabilize your operational costs and showcase your commitment to sustainability.",
    icon: Building2,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "industrial",
    title: "Industrial Solar",
    description: "Heavy-duty solar power plants designed for manufacturing and industrial facilities to offset massive energy requirements and achieve ESG goals.",
    icon: Factory,
    color: "bg-green-100 text-green-600",
  }
];

export default function SolutionsPage() {
  return (
    <>
      <div className="pt-48 lg:pt-56 md:pb-20 min-h-screen bg-navy-950 gradient-mesh-dark relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
              ENERGY SOLUTIONS FOR <span className="text-gradient">EVERY SCALE.</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-200 font-medium">
              Whether you&apos;re powering a family home or a massive industrial facility, our engineering team designs custom solar systems that maximize your return on investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution) => (
              <div key={solution.id} className="glass-dark rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-lg flex flex-col h-full hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 group">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-8 bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                  <solution.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                  {solution.title}
                </h2>
                <p className="text-surface-200 mb-8 flex-1 leading-relaxed">
                  {solution.description}
                </p>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <Link 
                    href={`/solutions/${solution.id}`}
                    className="inline-flex items-center font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Explore Details
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
