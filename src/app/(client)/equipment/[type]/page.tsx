import React from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Box, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EquipmentPageProps {
  params: {
    type: string;
  };
}

const EQUIPMENT_DATA: Record<string, { title: string; subtitle: string; features: string[] }> = {
  panels: {
    title: "Premium Solar Panels",
    subtitle: "High-efficiency Tier-1 monocrystalline modules designed for maximum yield and longevity.",
    features: ["Half-cut cell technology", "Anti-reflective coating", "25-year performance warranty", "PID resistant"],
  },
  inverters: {
    title: "Smart Inverters",
    subtitle: "The brain of your solar system. Highly efficient DC to AC conversion with real-time monitoring.",
    features: ["String and micro-inverter options", "99% max efficiency", "Built-in Wi-Fi monitoring", "IP65 weather protection"],
  },
  batteries: {
    title: "Energy Storage Systems",
    subtitle: "Lithium-ion battery solutions to store excess daytime energy for nighttime use and blackout protection.",
    features: ["LiFePO4 safe chemistry", "Scalable capacity (5kWh to 20kWh+)", "10-year warranty", "Seamless grid backup transition"],
  },
  structures: {
    title: "Mounting Structures",
    subtitle: "Wind-resistant, anti-corrosive mounting systems tailored for your specific roof type.",
    features: ["Hot-dip galvanized steel / Aluminum", "Tested for 150km/h wind loads", "Non-penetrative options for flat roofs", "Optimal tilt angles"],
  },
  "street-lights": {
    title: "Solar Street Lights",
    subtitle: "All-in-one independent lighting solutions for communities, pathways, and industrial areas.",
    features: ["Integrated battery and panel", "Motion sensor dimming", "Auto dusk-to-dawn operation", "Zero trenching required"],
  },
};

export async function generateMetadata({ params }: EquipmentPageProps) {
  const { type: rawType } = await params;
  const type = rawType.toLowerCase();
  const data = EQUIPMENT_DATA[type];
  
  if (!data) return { title: "Equipment Not Found" };
  
  return {
    title: `${data.title} | Surgetech Equipment`,
    description: data.subtitle,
  };
}

export default async function EquipmentTypePage({ params }: EquipmentPageProps) {
  const { type: rawType } = await params;
  const type = rawType.toLowerCase();
  const data = EQUIPMENT_DATA[type];

  if (!data) {
    notFound();
  }

  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full max-w-3xl h-[600px] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-br-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1 w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <Box className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Equipment Catalog</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              {data.title}
            </h1>
            
            <p className="text-lg md:text-xl text-surface-300 mb-8 leading-relaxed">
              {data.subtitle}
            </p>
            
            <div className="space-y-4 mb-10">
              {data.features.map((feature, i) => (
                <div key={i} className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="h-6 w-6 text-green-400 mr-4 shrink-0" />
                  <span className="text-surface-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/solar-calculator">
                <Button variant="solar" size="lg" className="w-full sm:w-auto">
                  Build Your System
                </Button>
              </Link>
              <Link href="/equipment">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-cyan-400 hover:text-cyan-300">
                  View All Equipment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="aspect-square relative rounded-[2rem] border border-white/10 glass overflow-hidden bg-navy-900/50 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Placeholder for actual equipment image */}
              <div className="text-center p-8">
                <Box className="h-24 w-24 text-surface-500 mx-auto mb-4 opacity-50" />
                <p className="text-surface-400 font-bold uppercase tracking-widest text-sm">3D Render of {data.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
