import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Layers, ArrowRight, BarChart3, Sun, Battery, RefreshCw, Cpu, CheckCircle2, XCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Catalog | Surgetech Solar",
  description: "Browse our catalog of Tier-1 solar panels, inverters, batteries, and mounting structures.",
};

const categories = [
  {
    name: "Solar Panels",
    description: "High-efficiency monocrystalline and PERC modules from global Tier-1 manufacturers.",
    icon: Layers,
    items: ["Bifacial Modules", "Half-Cut Cell Tech", "High Wattage Series"]
  },
  {
    name: "Inverters",
    description: "Intelligent string and hybrid inverters to convert and manage your power efficiently.",
    icon: Zap,
    items: ["String Inverters", "Microinverters", "Hybrid Inverters"]
  },
  {
    name: "Energy Storage",
    description: "Advanced Lithium-ion (LiFePO4) battery systems for reliable backup and peak shaving.",
    icon: ShieldCheck,
    items: ["Residential Batteries", "Commercial Storage Racks", "BMS Systems"]
  }
];

export default function EquipmentPage() {
  return (
    <>
      <div className="pt-48 lg:pt-56 md:pb-16 md:pb-24 min-h-screen bg-navy-950 gradient-mesh-dark relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8 border-b border-white/10 pb-10 md:pb-16">
            <div className="max-w-2xl">
               <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-4 block flex items-center">
                 <ShieldCheck className="h-4 w-4 mr-2" />
                 Premium Components
               </span>
               <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
                 THE HEART OF YOUR <span className="text-gradient">SYSTEM.</span>
               </h1>
               <p className="text-lg md:text-xl text-surface-200 font-medium">
                 A solar plant is only as reliable as its weakest component. That&apos;s why we exclusively use Tier-1, bankable equipment engineered to perform for decades.
               </p>
            </div>
            <Button variant="solar" size="lg" className="shrink-0 w-full md:w-auto text-lg py-6 shadow-[0_0_20px_rgba(37,166,90,0.2)]">
               Download Data Sheets
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, index) => (
              <div key={index} className="glass-dark rounded-[2rem] p-8 border border-white/10 shadow-lg flex flex-col hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                  <cat.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-white mb-4">{cat.name}</h2>
                <p className="text-surface-200 mb-8">{cat.description}</p>
                
                <div className="mt-auto pt-6 border-t border-white/10">
                   <ul className="space-y-3 mb-6">
                      {cat.items.map((item, i) => (
                         <li key={i} className="text-sm font-medium text-white/80 flex items-center before:content-[''] before:block before:w-1.5 before:h-1.5 before:bg-cyan-400 before:rounded-full before:mr-3">
                            {item}
                         </li>
                      ))}
                   </ul>
                   <button className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center transition-colors">
                      View Specifications <ArrowRight className="ml-2 h-4 w-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* Solar Systems Comparison Section */}
          <div className="mt-16 md:mt-32">
            <div className="text-center mb-10 md:mb-16">
              <h3 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm">Choose Your Solar Setup</h3>
              <p className="text-lg md:text-xl text-surface-200 max-w-3xl mx-auto font-medium">
                Home solar panel solutions are categorized by how they connect to the utility grid, resulting in three primary setups.
              </p>
            </div>

            <div className="glass-dark rounded-[2rem] p-6 md:p-10 border border-white/10 shadow-2xl mb-16 md:mb-24">
              <h4 className="font-heading text-xl md:text-2xl font-bold text-white mb-8 flex items-center pb-6 border-b border-white/5">
                <BarChart3 className="mr-3 text-cyan-400 h-6 w-6 shrink-0" /> Comparison of Home Solar Solutions
              </h4>
              <div className="overflow-x-auto pb-4">
                <table className="min-w-[800px] w-full text-left">
                  <thead>
                    <tr>
                      <th className="pb-6 pt-2 font-bold text-white/50 uppercase tracking-widest text-xs w-1/4">Feature</th>
                      <th className="pb-6 pt-2 font-bold text-white uppercase tracking-widest text-xs w-1/4">On-Grid System</th>
                      <th className="pb-6 pt-2 font-bold text-white uppercase tracking-widest text-xs w-1/4">Off-Grid System</th>
                      <th className="pb-6 pt-2 font-bold text-white uppercase tracking-widest text-xs w-1/4 flex items-center"><RefreshCw className="h-4 w-4 mr-2 text-cyan-400" /> Hybrid System</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    <tr>
                      <td className="py-5 font-semibold text-white/80">Grid Connection</td>
                      <td className="py-5 text-surface-200">Connected to utility grid</td>
                      <td className="py-5 text-surface-200">Completely disconnected</td>
                      <td className="py-5 text-surface-200">Connected to utility grid</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-semibold text-white/80">Battery Storage</td>
                      <td className="py-5 text-surface-200">No</td>
                      <td className="py-5"><span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-lg inline-block">Yes (Required)</span></td>
                      <td className="py-5"><span className="text-green-400 font-bold bg-green-500/10 px-3 py-1 rounded-lg inline-block">Yes (Required)</span></td>
                    </tr>
                    <tr>
                      <td className="py-5 font-semibold text-white/80">Power During Outages</td>
                      <td className="py-5 text-surface-200">No (Shuts down for safety)</td>
                      <td className="py-5 text-green-400 font-bold">Yes</td>
                      <td className="py-5 text-green-400 font-bold">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-semibold text-white/80">Excess Power Usage</td>
                      <td className="py-5 text-surface-200">Sent to grid (Net Metering)</td>
                      <td className="py-5 text-surface-200">Wasted if batteries are full</td>
                      <td className="py-5 text-surface-200">Sent to grid or stored</td>
                    </tr>
                    <tr>
                      <td className="py-5 font-semibold text-white/80">Upfront Cost</td>
                      <td className="py-5 text-green-400 font-bold">Lowest cost</td>
                      <td className="py-5 text-surface-200">High cost</td>
                      <td className="py-5 text-surface-200">Highest cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {/* On-Grid */}
              <div className="glass-dark p-8 rounded-[2rem] border border-white/10 shadow-lg hover:border-orange-500/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-500/20 p-3 rounded-xl mr-4 border border-orange-500/30">
                     <Sun className="h-6 w-6 text-orange-400" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white">1. On-Grid</h4>
                </div>
                <p className="text-orange-300 mb-6 font-bold text-xs bg-orange-500/10 border border-orange-500/20 inline-block px-3 py-1 rounded-full uppercase tracking-widest">Grid-Tied</p>
                <p className="text-surface-200 mb-6 font-medium">This is the most common and cost-effective system for urban homes with reliable power grids.</p>
                <div className="space-y-5 text-sm">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <strong className="text-white block mb-1 text-xs uppercase tracking-widest">How it works:</strong>
                    <span className="text-surface-200">Your solar panels power your home directly. If they produce more energy than you need, the excess is sent to the government grid via Net Metering, giving you power credits.</span>
                  </div>
                  <div>
                    <strong className="text-green-400 flex items-center mb-1"><CheckCircle2 className="h-4 w-4 mr-2"/> Pros:</strong>
                    <span className="text-surface-200">Lowest initial investment, highest return on investment, and zero battery maintenance.</span>
                  </div>
                  <div>
                    <strong className="text-red-400 flex items-center mb-1"><XCircle className="h-4 w-4 mr-2"/> Cons:</strong>
                    <span className="text-surface-200">If the power grid goes down, your solar system automatically shuts off to protect utility workers. You will experience blackouts during power cuts.</span>
                  </div>
                </div>
              </div>

              {/* Off-Grid */}
              <div className="glass-dark p-8 rounded-[2rem] border border-white/10 shadow-lg hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-green-500/20 p-3 rounded-xl mr-4 border border-green-500/30">
                     <Battery className="h-6 w-6 text-green-400" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white">2. Off-Grid</h4>
                </div>
                <p className="text-green-300 mb-6 font-bold text-xs bg-green-500/10 border border-green-500/20 inline-block px-3 py-1 rounded-full uppercase tracking-widest">Stand-Alone</p>
                <p className="text-surface-200 mb-6 font-medium">This system is completely independent of the power company and relies entirely on battery storage.</p>
                <div className="space-y-5 text-sm">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <strong className="text-white block mb-1 text-xs uppercase tracking-widest">How it works:</strong>
                    <span className="text-surface-200">Panels power the home and charge a massive battery bank during the day. At night, the home draws power exclusively from the batteries.</span>
                  </div>
                  <div>
                    <strong className="text-green-400 flex items-center mb-1"><CheckCircle2 className="h-4 w-4 mr-2"/> Pros:</strong>
                    <span className="text-surface-200">Total energy independence. Ideal for remote rural areas, farmhouses, or zones with frequent, long power cuts.</span>
                  </div>
                  <div>
                    <strong className="text-red-400 flex items-center mb-1"><XCircle className="h-4 w-4 mr-2"/> Cons:</strong>
                    <span className="text-surface-200">Expensive due to the heavy battery bank. Batteries need replacement every 5 to 15 years depending on the type.</span>
                  </div>
                </div>
              </div>

              {/* Hybrid */}
              <div className="glass-dark p-8 rounded-[2rem] border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-cyan-400 text-navy-950 text-[10px] font-extrabold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-md">Ultimate</div>
                <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                <div className="flex items-center mb-6 mt-2 relative z-10">
                  <div className="bg-cyan-500/20 p-3 rounded-xl mr-4 border border-cyan-500/30">
                     <RefreshCw className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-white">3. Hybrid</h4>
                </div>
                <p className="text-cyan-300 mb-6 font-bold text-xs bg-cyan-500/10 border border-cyan-500/20 inline-block px-3 py-1 rounded-full uppercase tracking-widest relative z-10">The Best of Both</p>
                <p className="text-surface-200 mb-6 font-medium relative z-10">This setup combines the best of both worlds by connecting to the grid while utilizing a battery backup.</p>
                <div className="space-y-5 text-sm relative z-10">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <strong className="text-white block mb-1 text-xs uppercase tracking-widest">How it works:</strong>
                    <span className="text-surface-200">It prioritizes powering your home first, charging your batteries second, and exporting excess electricity to the grid third.</span>
                  </div>
                  <div>
                    <strong className="text-green-400 flex items-center mb-1"><CheckCircle2 className="h-4 w-4 mr-2"/> Pros:</strong>
                    <span className="text-surface-200">Continuous power during grid outages, lower electricity bills through net metering, and flexibility to manage power usage.</span>
                  </div>
                  <div>
                    <strong className="text-red-400 flex items-center mb-1"><XCircle className="h-4 w-4 mr-2"/> Cons:</strong>
                    <span className="text-surface-200">High upfront cost because you must buy both a specialized hybrid inverter and a battery bank.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-950 to-navy-950 border border-cyan-500/20 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
              <h4 className="font-heading text-3xl font-bold mb-6 flex items-center relative z-10">
                <Cpu className="mr-4 h-8 w-8 text-cyan-400" /> Modern Tech Variations
              </h4>
              <p className="text-surface-200 mb-10 text-lg relative z-10 max-w-2xl">When choosing your panels, you will also encounter these specific technical solutions designed to maximize efficiency and reliability.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <h5 className="text-xl font-bold mb-3 text-cyan-400">Bifacial Solar Panels</h5>
                  <p className="text-surface-200 leading-relaxed">Panels that generate power from both sides by absorbing reflected light from your roof floor, increasing efficiency by up to 20%.</p>
                </div>
                <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <h5 className="text-xl font-bold mb-3 text-cyan-400">Microinverter Systems</h5>
                  <p className="text-surface-200 leading-relaxed">Instead of one large central inverter, a tiny inverter is attached to every individual panel. This ensures that if one panel is blocked by a shadow, the rest of the system still runs at 100% capacity.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="font-heading text-4xl font-extrabold text-white mb-10">Factors to Consider</h3>
              <ul className="space-y-4">
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">1</span> Energy Load</strong>
                  <span className="text-surface-200 pl-11">Calculate total household watt-hours consumed daily by appliances.</span>
                </li>
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">2</span> Roof Space & Shadow</strong>
                  <span className="text-surface-200 pl-11">Check shadow-free square footage and structural load capacity.</span>
                </li>
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">3</span> System Type</strong>
                  <span className="text-surface-200 pl-11">Choose between On-Grid (tied to utility), Off-Grid (independent with batteries), or Hybrid.</span>
                </li>
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">4</span> Location & Tilt Angle</strong>
                  <span className="text-surface-200 pl-11">Optimize direction (South-facing in India) and tilt based on latitude.</span>
                </li>
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">5</span> Net Metering & Approvals</strong>
                  <span className="text-surface-200 pl-11">Check local DISCOM rules for grid synchronization and subsidies.</span>
                </li>
                <li className="glass-dark p-6 rounded-[1.5rem] border border-white/5 shadow-lg flex flex-col hover:bg-white/5 transition-colors">
                  <strong className="text-white block mb-2 text-lg flex items-center"><span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mr-3 text-sm font-bold border border-cyan-500/30">6</span> Budget & Quality</strong>
                  <span className="text-surface-200 pl-11">Balance tier-1 component lifespans against upfront investment.</span>
                </li>
              </ul>
            </div>

            <div className="glass-dark border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h3 className="font-heading text-3xl font-extrabold text-white mb-10 pb-6 border-b border-white/10">Complete Equipment List</h3>
              
              <div className="space-y-10">
                <div>
                  <h4 className="font-heading text-xl font-bold text-cyan-400 mb-5 flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></span> Major Core Hardware</h4>
                  <ul className="space-y-4 pl-5 border-l border-white/10 ml-1">
                    <li className="text-surface-200"><strong className="text-white">Solar Panels:</strong> Photovoltaic modules (Monocrystalline, Bifacial, or TOPCon) to capture sunlight.</li>
                    <li className="text-surface-200"><strong className="text-white">Solar Inverter:</strong> Converts direct current (DC) into alternating current (AC) for home use (On-grid, Off-grid, or Hybrid).</li>
                    <li className="text-surface-200"><strong className="text-white">Solar Batteries:</strong> Deep-cycle or Lithium-ion storage bank (required only for Off-grid or Hybrid systems).</li>
                    <li className="text-surface-200"><strong className="text-white">Charge Controller:</strong> MPPT or PWM unit to regulate voltage going into batteries.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading text-xl font-bold text-cyan-400 mb-5 flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></span> Mounting & Structural Items</h4>
                  <ul className="space-y-4 pl-5 border-l border-white/10 ml-1">
                    <li className="text-surface-200"><strong className="text-white">Mounting Rails/Racks:</strong> Hot-dip galvanized iron (GI) or aluminum frames.</li>
                    <li className="text-surface-200"><strong className="text-white">L-Feet and Clamps:</strong> Mid clamps and end clamps to lock panels onto rails.</li>
                    <li className="text-surface-200"><strong className="text-white">Fasteners & Hardware:</strong> Stainless steel nuts, bolts, washers, and spring washers.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading text-xl font-bold text-cyan-400 mb-5 flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></span> Safety & Protection Boxes</h4>
                  <ul className="space-y-4 pl-5 border-l border-white/10 ml-1">
                    <li className="text-surface-200"><strong className="text-white">DC Distribution Box (DCDB):</strong> Houses DC Miniature Circuit Breakers (MCB) and Surge Protection Devices (SPD) from panels.</li>
                    <li className="text-surface-200"><strong className="text-white">AC Distribution Box (ACDB):</strong> Houses AC MCBs, isolators, and SPDs between the inverter and home load.</li>
                    <li className="text-surface-200"><strong className="text-white">Lightning Arrester (LA):</strong> Copper or galvanized rod to protect the array from lightning strikes.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading text-xl font-bold text-cyan-400 mb-5 flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3"></span> Cabling & Accessories</h4>
                  <ul className="space-y-4 pl-5 border-l border-white/10 ml-1">
                    <li className="text-surface-200"><strong className="text-white">DC & AC Cables:</strong> UV-resistant DC cables and flexible AC cables for grid connection.</li>
                    <li className="text-surface-200"><strong className="text-white">MC4 Connectors:</strong> Waterproof plug connectors for secure panel-to-inverter wiring.</li>
                    <li className="text-surface-200"><strong className="text-white">Earthing Kits:</strong> Copper-bonded earthing rods and green earthing wire.</li>
                    <li className="text-surface-200"><strong className="text-white">Metering & Monitoring:</strong> Bi-directional net meter and Wi-Fi data logger for phone app tracking.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
