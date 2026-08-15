import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Shield, BatteryCharging, Headset, LineChart } from "lucide-react";

const services = [
  { name: "Solar Installation", icon: Wrench },
  { name: "Maintenance & Support", icon: Shield },
  { name: "System Upgrades", icon: BatteryCharging },
  { name: "Energy Consultation", icon: Headset },
  { name: "Monitoring", icon: LineChart },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-navy-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900/50 rounded-3xl p-8 md:p-12 lg:p-16 border border-surface-100 shadow-xl shadow-navy-900/5 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
                WE&apos;RE WITH YOU <br className="hidden md:block"/>BEYOND INSTALLATION.
              </h2>
              <p className="text-lg text-muted mb-8 max-w-lg">
                Our relationship doesn&apos;t end when your system is turned on. We offer comprehensive services to ensure your solar investment performs optimally for decades.
              </p>
              
              <ul className="space-y-4 mb-10">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center text-surface-200 font-semibold">
                    <div className="h-8 w-8 rounded-full bg-navy-900/30 flex items-center justify-center mr-4 shrink-0">
                      <service.icon className="h-4 w-4 text-cyan-600" />
                    </div>
                    {service.name}
                  </li>
                ))}
              </ul>
              
              <Button variant="primary" size="lg">
                Talk to a Solar Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative rounded-2xl bg-navy-800/40 aspect-square lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-muted/40 font-semibold">
                  Service / Engineer Photo
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
