import { CheckCircle2 } from "lucide-react";

const pillars = [
  {
    title: "Lower Electricity Bills",
    description: "Generate more of your own power and reduce grid dependence."
  },
  {
    title: "Premium Quality Products",
    description: "Use carefully selected components suited to the application."
  },
  {
    title: "Expert Installation",
    description: "Professional system design, installation and commissioning."
  },
  {
    title: "Reliable After-Sales Support",
    description: "Service continues beyond installation."
  },
  {
    title: "Residential. Commercial. Industrial.",
    description: "Solutions designed for different energy requirements."
  }
];

export function WhySurgetech() {
  return (
    <section className="py-24 bg-navy-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              MORE THAN SOLAR PANELS.<br className="hidden md:block" /> A COMPLETE ENERGY SOLUTION.
            </h2>
            
            <div className="space-y-6">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1">{pillar.title}</h3>
                    <p className="text-muted">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-full min-h-[500px] w-full rounded-3xl bg-navy-900/30 overflow-hidden shadow-lg border border-surface-100 hidden lg:block">
            {/* Visual representation instead of a plain image for now */}
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 via-navy-800 to-cyan-900" />
            
            {/* Decorative tech lines */}
            <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0 80 L80 0" stroke="white" strokeWidth="0.2" fill="none" />
              <path d="M20 100 L100 20" stroke="white" strokeWidth="0.2" fill="none" />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
              <div className="h-20 w-20 rounded-full border border-white/20 flex items-center justify-center mb-6 bg-white/5 backdrop-blur-sm">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Engineering Quality</h3>
              <p className="text-white/80 max-w-sm">
                Placeholder image: Engineers/technicians installing equipment or high-quality solar panel close-up.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
