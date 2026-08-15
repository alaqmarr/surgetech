import { ArrowRight, Home, Building2, Factory } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const sectors = [
  {
    title: "Residential Solar",
    description: "Architectural rooftop systems designed to seamlessly integrate with your home. Drastically reduce energy bills and increase property value with premium, low-profile panels.",
    icon: Home,
    href: "/solutions/residential",
    imagePath: "/images/residential-solar.jpg",
    imageClass: "from-cyan-900/40 to-navy-950",
    glowColor: "bg-cyan-500/20"
  },
  {
    title: "Commercial Solar",
    description: "Empower your business with scalable clean energy. Lock in utility rates, benefit from accelerated depreciation (MACRS), and demonstrate strong corporate sustainability.",
    icon: Building2,
    href: "/solutions/commercial",
    imagePath: "/images/commercial-solar.jpg",
    imageClass: "from-green-900/40 to-navy-950",
    glowColor: "bg-green-500/20"
  },
  {
    title: "Industrial & Utility",
    description: "Heavy-duty solar infrastructure engineered for maximum yield. From mega-watt factory rooftops to ground-mounted solar farms with advanced grid integrations.",
    icon: Factory,
    href: "/solutions/industrial",
    imagePath: "/images/industrial-solar.jpg",
    imageClass: "from-orange-900/40 to-navy-950",
    glowColor: "bg-orange-500/20"
  }
];

export function Solutions() {
  return (
    <section className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
              SOLUTIONS FOR <br />EVERY SCALE.
            </h2>
            <p className="text-lg md:text-xl text-surface-300 font-medium">
              We design, engineer, and install highly efficient solar infrastructure across all sectors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {sectors.map((sector, index) => (
            <Link 
              key={index} 
              href={sector.href}
              className="group block relative rounded-[2rem] overflow-hidden min-h-[450px] lg:min-h-[600px] border border-white/10"
            >
              {/* Background Image */}
              <Image
                src={sector.imagePath}
                alt={sector.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
              />

              <div className={`absolute inset-0 bg-gradient-to-t ${sector.imageClass} z-0`} />
              
              {/* Abstract structural texture/gradient */}
              <div className="absolute inset-0 bg-navy-950/60 mix-blend-multiply z-10" />
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl z-10 opacity-40 group-hover:opacity-70 transition-opacity duration-500 ${sector.glowColor}`} />

              <div className="relative z-20 p-8 md:p-10 h-full flex flex-col justify-end">
                <div className="mb-auto">
                  <div className="h-14 w-14 rounded-2xl glass-dark border border-white/20 flex items-center justify-center text-white mb-6 backdrop-blur-md">
                    <sector.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-4">{sector.title}</h3>
                  <p className="text-surface-200 text-base md:text-lg mb-8 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {sector.description}
                  </p>
                  <div className="inline-flex items-center text-sm font-bold text-white uppercase tracking-wider">
                    Explore Solution
                    <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
