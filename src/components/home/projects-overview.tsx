import { MapPin, Quote, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";

export async function ProjectsOverview() {
  let caseStudies = [];
  
  try {
    caseStudies = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 6, // Limit to 6 on homepage
    });
  } catch (error) {
    console.error("Failed to fetch projects (table might not exist yet):", error);
    return null; // Fail gracefully and hide the section
  }

  if (!caseStudies || caseStudies.length === 0) {
    return null; // Auto-hide section if no projects exist
  }

  return (
    <section className="py-24 bg-navy-900/30 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
              PROVEN <span className="text-gradient">IMPACT.</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-300 font-medium">
              Real installations. Real savings. Hear from the homeowners and businesses powering their future with Surgetech.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="secondary" className="w-full md:w-auto shrink-0 shadow-sm glass-dark border border-white/20 text-white">
              View Case Studies
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {caseStudies.map((study) => (
            <div 
              key={study.id} 
              className="group flex flex-col rounded-[2rem] glass-dark border border-white/10 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
              
              <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="glass px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm border border-white/10 bg-white/5">
                    {study.type}
                  </div>
                  <div className="flex items-center text-surface-300 text-sm font-semibold">
                    <MapPin className="h-4 w-4 mr-1 text-cyan-400" />
                    {study.location}
                  </div>
                </div>

                <Quote className="h-10 w-10 text-white/10 mb-4" />
                <p className="text-white text-lg font-medium leading-relaxed mb-6 flex-1">
                  &quot;{study.quote}&quot;
                </p>
                {study.author && (
                  <div className="text-sm font-bold text-cyan-400 mb-8 uppercase tracking-wider">
                    — {study.author}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-[10px] text-surface-300 mb-1 uppercase tracking-wider font-bold">System Size</p>
                    <p className="font-bold text-white flex items-center text-lg">
                      <Zap className="h-4 w-4 mr-1 text-orange-400" />
                      {study.size}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-surface-300 mb-1 uppercase tracking-wider font-bold">Est. Savings</p>
                    <p className="font-bold text-green-400 text-lg">{study.savings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
