import React from "react";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServicePageProps {
  params: {
    type: string;
  };
}

const SERVICES_DATA: Record<string, { title: string; subtitle: string; features: string[] }> = {
  installation: {
    title: "Turnkey Installation",
    subtitle: "End-to-end solar deployment by certified engineers, ensuring optimal placement, minimal disruption, and uncompromising safety.",
    features: ["Site auditing & 3D shadow analysis", "Structural reinforcement checks", "Utility net-metering approvals", "Zero-downtime integration"],
  },
  maintenance: {
    title: "Preventative Maintenance",
    subtitle: "Keep your system running at peak efficiency with our scheduled cleaning and inspection packages.",
    features: ["Bi-annual panel deep cleaning", "Electrical connection torquing", "Inverter firmware updates", "Detailed health reports"],
  },
  servicing: {
    title: "On-Call Servicing",
    subtitle: "Rapid response troubleshooting and repair for offline systems or performance drops.",
    features: ["48-hour SLA for critical faults", "Component RMA handling", "Thermal imaging diagnostics", "Certified local technicians"],
  },
  upgrades: {
    title: "System Upgrades",
    subtitle: "Expand your existing solar capacity or add smart battery storage to an older grid-tied system.",
    features: ["AC/DC coupling for retrofits", "Panel capacity additions", "Smart EV charger integration", "Monitoring system modernizations"],
  },
  consultation: {
    title: "Engineering Consultation",
    subtitle: "Expert advisory for large commercial, industrial, or complex architectural solar projects.",
    features: ["Feasibility studies & ROI modeling", "Custom mounting structural design", "Grid-impact studies", "ESG compliance reporting"],
  },
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { type: rawType } = await params;
  const type = rawType.toLowerCase();
  const data = SERVICES_DATA[type];
  
  if (!data) return { title: "Service Not Found" };
  
  return {
    title: `${data.title} | Surgetech Services`,
    description: data.subtitle,
  };
}

export default async function ServiceTypePage({ params }: ServicePageProps) {
  const { type: rawType } = await params;
  const type = rawType.toLowerCase();
  const data = SERVICES_DATA[type];

  if (!data) {
    notFound();
  }

  return (
    <div className="pb-16 md:pb-24 min-h-[calc(100vh-80px)] bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="flex-1 w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <Wrench className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Professional Services</span>
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
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="aspect-square relative rounded-[2rem] border border-white/10 glass overflow-hidden bg-navy-900/50 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-center p-8">
                <Wrench className="h-24 w-24 text-surface-500 mx-auto mb-4 opacity-50" />
                <p className="text-surface-400 font-bold uppercase tracking-widest text-sm">Service Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
