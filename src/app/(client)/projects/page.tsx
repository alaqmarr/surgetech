import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory, Home, Sun, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Our Projects",
  description: "Explore our portfolio of residential and commercial solar installations.",
};

const PROJECTS = [
  {
    id: 1,
    title: "Eco-Village Residential Complex",
    category: "Residential",
    capacity: "120 kWp",
    description: "A comprehensive community-wide solar implementation providing power to 45 homes and common areas.",
    icon: <Home className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 2,
    title: "TechPark Corporate Hub",
    category: "Commercial",
    capacity: "500 kWp",
    description: "Rooftop solar installation across three corporate buildings, offsetting 60% of their daily energy consumption.",
    icon: <Factory className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 3,
    title: "Greenfield Manufacturing Plant",
    category: "Industrial",
    capacity: "1.2 MWp",
    description: "Large-scale industrial solar grid ensuring continuous operations and massive reduction in carbon footprint.",
    icon: <Factory className="w-5 h-5 text-blue-400" />,
  },
  {
    id: 4,
    title: "Suburban Villa Retrofit",
    category: "Residential",
    capacity: "15 kWp",
    description: "Premium black-on-black monocrystalline panels integrated seamlessly with a hybrid battery storage system.",
    icon: <Home className="w-5 h-5 text-cyan-400" />,
  },
];

export default function ProjectsPage() {
  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full max-w-3xl h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/50 border border-white/10 mb-6 backdrop-blur-md">
            <Sun className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Our Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Powering the Future, <span className="text-gradient">One Roof at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-300">
            Explore a selection of our most impactful residential, commercial, and industrial solar installations across the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PROJECTS.map((project) => (
            <div key={project.id} className="glass-dark rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col relative">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
              
              <div className="h-64 w-full bg-navy-900/80 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent opacity-80" />
                <span className="text-surface-400 font-bold uppercase tracking-widest text-sm z-10 flex items-center gap-2">
                  {project.icon} {project.category}
                </span>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-green-400 font-bold text-sm w-fit mb-6">
                  <Zap className="h-4 w-4" /> {project.capacity} System
                </div>
                
                <p className="text-surface-300 mb-8 flex-grow">
                  {project.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-surface-200"><CheckCircle2 className="h-4 w-4 text-cyan-400 mr-2 shrink-0" /> Turnkey Installation</li>
                  <li className="flex items-center text-sm text-surface-200"><CheckCircle2 className="h-4 w-4 text-cyan-400 mr-2 shrink-0" /> Premium Tier-1 Modules</li>
                  <li className="flex items-center text-sm text-surface-200"><CheckCircle2 className="h-4 w-4 text-cyan-400 mr-2 shrink-0" /> Smart Monitoring Enabled</li>
                </ul>

                <Button variant="ghost" className="w-full sm:w-auto self-start text-cyan-400 hover:text-cyan-300 p-0 hover:bg-transparent">
                  View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glass p-8 md:p-12 rounded-3xl text-center border border-white/10 relative overflow-hidden mt-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-cyan-500/10 blur-3xl pointer-events-none" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to start your own project?</h2>
          <p className="text-surface-300 mb-8 max-w-2xl mx-auto relative z-10">
            Join hundreds of satisfied customers who have already made the switch to clean, sustainable solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/solar-calculator">
              <Button variant="solar" size="lg" className="w-full sm:w-auto">
                Calculate Savings
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
