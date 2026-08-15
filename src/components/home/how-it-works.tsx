import { Search, PenTool, Wrench, Zap, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "Understand your energy use, property characteristics, and financial goals.",
    icon: Search
  },
  {
    num: "02",
    title: "Design",
    description: "Engineer the optimal solar solution tailored exactly to your requirements.",
    icon: PenTool
  },
  {
    num: "03",
    title: "Install",
    description: "Professional installation and commissioning by our expert engineering team.",
    icon: Wrench
  },
  {
    num: "04",
    title: "Activate",
    description: "Turn on your system and immediately start generating clean energy.",
    icon: Zap
  },
  {
    num: "05",
    title: "Maintain",
    description: "Ongoing monitoring, servicing and optimization for peak performance.",
    icon: ShieldCheck
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-navy-950 text-white overflow-hidden relative gradient-mesh-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            FROM SUNLIGHT TO <span className="text-gradient">SAVINGS.</span>
          </h2>
          <p className="text-lg text-surface-200">
            A proven, professional process designed to deliver long-term value.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-navy-800 via-cyan-500/50 to-navy-800 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-20 h-20 rounded-2xl glass-dark flex items-center justify-center mb-6 shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-green-500/50 group-hover:shadow-[0_0_30px_rgba(37,166,90,0.3)]">
                  <span className="absolute -top-3 -right-3 text-sm font-bold text-white bg-gradient-to-br from-green-500 to-green-600 rounded-full h-8 w-8 flex items-center justify-center border-2 border-navy-950 shadow-sm">
                    {step.num}
                  </span>
                  <step.icon className="h-8 w-8 text-cyan-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 drop-shadow-sm">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
