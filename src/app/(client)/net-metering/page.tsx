import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Moon, ArrowRightLeft, Calculator, CheckSquare, Sparkles, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Achieve a Zero Electricity Bill | Net Metering Guide | Surgetech",
  description: "Learn how an On-Grid Solar System with Net Metering can completely wipe out your electricity bill.",
};

export default function NetMeteringPage() {
  return (
    <div className="pt-48 lg:pt-56 md:pb-16 md:pb-24 min-h-screen bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs mb-4 block flex justify-center items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Net-Zero Guide
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            HOW TO WIPE OUT YOUR <span className="text-gradient">ELECTRICITY BILL</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-200 font-medium max-w-3xl mx-auto leading-relaxed">
            To completely wipe out your electricity bill, the <strong className="text-white">On-Grid Solar System</strong> is your best option. It is the most financially efficient solution because it eliminates the need for expensive batteries, allowing you to maximize every unit of electricity your roof generates through a system called Net Metering.
          </p>
        </div>

        {/* How Net Metering Works */}
        <div className="glass-dark rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/10 mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-10 pb-6 border-b border-white/10">
            <div className="bg-cyan-500/20 p-3 rounded-xl mb-4 md:mb-0 md:mr-4 border border-cyan-500/30">
               <ArrowRightLeft className="h-8 w-8 text-cyan-400 shrink-0" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">How Net Metering Works</h2>
          </div>
          
          <p className="text-lg text-surface-200 font-medium mb-10">
            With an on-grid system, you do not need to match your daily production to your daily consumption. Here is exactly how it balances out:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            <div className="glass-dark p-8 rounded-2xl border border-orange-500/20 relative overflow-hidden transition-all hover:border-orange-500/40 group">
              <Sun className="absolute -bottom-4 -right-4 h-40 w-40 text-orange-500 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />
              <h3 className="font-bold text-2xl text-orange-400 mb-4 relative z-10 flex items-center">
                 <Sun className="h-6 w-6 mr-3 text-orange-500" /> During the Day
              </h3>
              <p className="text-surface-200 relative z-10 leading-relaxed">
                Your panels produce excess power. This surplus is exported directly back to the government utility grid. The grid acts as your giant virtual battery.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-blue-500/20 relative overflow-hidden transition-all hover:border-blue-500/40 group">
              <Moon className="absolute -bottom-4 -right-4 h-40 w-40 text-blue-500 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              <h3 className="font-bold text-2xl text-blue-400 mb-4 relative z-10 flex items-center">
                 <Moon className="h-6 w-6 mr-3 text-blue-500" /> At Night
              </h3>
              <p className="text-surface-200 relative z-10 leading-relaxed">
                Your panels stop working. You pull power back from the grid exactly as you normally would.
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 shadow-inner">
            <h3 className="font-heading text-2xl text-white mb-4">The Monthly Settlement</h3>
            <p className="text-surface-200 mb-8">At the end of the month, your net meter automatically calculates the difference:</p>
            
            <div className="glass-dark px-6 py-6 md:px-10 rounded-2xl shadow-lg font-mono text-center text-sm md:text-xl text-white font-bold border border-cyan-500/30 overflow-x-auto whitespace-nowrap bg-cyan-950/30">
              <span className="text-orange-400">(Units Imported)</span> <span className="text-white/50">-</span> <span className="text-blue-400">(Units Exported)</span> <span className="text-white/50">=</span> <span className="text-green-400">Your Bill</span>
            </div>
            
            <p className="text-green-400 font-bold mt-8 text-lg flex flex-col items-center justify-center text-center">
              <span className="flex items-center text-xl mb-2"><Sparkles className="mr-3 h-6 w-6 shrink-0" /> If you export more than you import, your electricity bill drops to zero!</span>
              <span className="text-sm text-green-400/70 font-normal italic">*(You only pay a nominal fixed meter-rent charge)*</span>
            </p>
          </div>
        </div>

        {/* Sizing Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24">
          <div>
            <div className="flex items-center mb-8">
              <div className="bg-cyan-500/20 p-3 rounded-xl mr-4 border border-cyan-500/30">
                 <Calculator className="h-8 w-8 text-cyan-400 shrink-0" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">How to Calculate Your Size</h2>
            </div>
            <p className="text-surface-200 text-lg mb-8 leading-relaxed">
              To completely eliminate your bill, your system must generate 100% of your average annual power consumption. Use this simple benchmark:
            </p>
            
            <ul className="space-y-6 mb-10">
              <li className="glass-dark p-6 rounded-2xl border border-white/10 shadow-lg flex items-start group hover:border-cyan-500/30 transition-all">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold rounded-xl h-10 w-10 flex items-center justify-center shrink-0 mr-4 group-hover:bg-cyan-500/30 transition-colors">1</span>
                <div>
                  <strong className="text-white text-lg block mb-1">The Generation Benchmark</strong>
                  <span className="text-surface-200 text-sm leading-relaxed block">In India, 1 kW of solar panels generates roughly 4 units (kWh) of electricity per day (or ~120 units per month).</span>
                </div>
              </li>
              <li className="glass-dark p-6 rounded-2xl border border-white/10 shadow-lg flex items-start group hover:border-cyan-500/30 transition-all">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold rounded-xl h-10 w-10 flex items-center justify-center shrink-0 mr-4 group-hover:bg-cyan-500/30 transition-colors">2</span>
                <div>
                  <strong className="text-white text-lg block mb-1">The Required Roof Area</strong>
                  <span className="text-surface-200 text-sm leading-relaxed block">You need approximately 70 to 100 square feet of shadow-free roof space per 1 kW of installation.</span>
                </div>
              </li>
            </ul>
            
            <div className="bg-gradient-to-br from-cyan-950 to-navy-950 border border-cyan-500/30 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-0" />
              <h4 className="font-bold text-xl text-cyan-400 mb-3 relative z-10 flex items-center">
                 <Zap className="h-5 w-5 mr-2" /> Finding Your Target:
              </h4>
              <p className="text-surface-200 relative z-10 leading-relaxed">
                Look at your last 12 months of electricity bills, find the average monthly units (kWh) consumed, and divide that number by 120. That is the kW capacity you need.
              </p>
            </div>
          </div>
          
          <div className="flex items-center w-full">
            <div className="w-full glass-dark rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-all duration-300">
              <div className="bg-white/5 py-6 px-8 shrink-0 border-b border-white/10">
                <h3 className="font-bold text-white text-xl">System Sizing Table</h3>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="min-w-[500px] w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-8 py-5 font-bold text-white/50 uppercase tracking-widest text-xs">Your Monthly Bill</th>
                      <th className="px-8 py-5 font-bold text-white/50 uppercase tracking-widest text-xs">Required Capacity</th>
                      <th className="px-8 py-5 font-bold text-white/50 uppercase tracking-widest text-xs">Required Roof Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    <tr className="hover:bg-white/5 transition-colors group/row">
                      <td className="px-8 py-6 font-semibold text-white group-hover/row:text-cyan-300 transition-colors">~360 Units</td>
                      <td className="px-8 py-6 font-bold text-cyan-400">3 kW System</td>
                      <td className="px-8 py-6 text-surface-200">~250 sq. ft.</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group/row">
                      <td className="px-8 py-6 font-semibold text-white group-hover/row:text-cyan-300 transition-colors">~600 Units</td>
                      <td className="px-8 py-6 font-bold text-cyan-400">5 kW System</td>
                      <td className="px-8 py-6 text-surface-200">~450 sq. ft.</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors group/row">
                      <td className="px-8 py-6 font-semibold text-white group-hover/row:text-cyan-300 transition-colors">~1,200 Units</td>
                      <td className="px-8 py-6 font-bold text-cyan-400">10 kW System</td>
                      <td className="px-8 py-6 text-surface-200">~900 sq. ft.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-950 border border-white/10 rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center mb-12 relative z-10">
            <div className="bg-green-500/20 p-4 rounded-2xl mb-4 md:mb-0 md:mr-6 border border-green-500/30">
               <CheckSquare className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white drop-shadow-md">Checklist to Reach a <span className="text-green-400">₹0 Bill</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
              <h3 className="font-bold text-xl text-green-400 mb-3 flex items-center">
                 <span className="w-6 h-6 rounded-full bg-green-500/20 text-xs flex items-center justify-center mr-3 border border-green-500/30 text-green-400">1</span>
                 Check Feasibility
              </h3>
              <p className="text-surface-200 leading-relaxed pl-9">
                Ensure your roof has unshaded sunlight from 9:00 AM to 4:00 PM. Shadow on even one panel can drop the entire array's performance.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
              <h3 className="font-bold text-xl text-green-400 mb-3 flex items-center">
                 <span className="w-6 h-6 rounded-full bg-green-500/20 text-xs flex items-center justify-center mr-3 border border-green-500/30 text-green-400">2</span>
                 Apply for Net Metering
              </h3>
              <p className="text-surface-200 leading-relaxed pl-9">
                You must apply through your local electricity distribution company (DISCOM). They will inspect your setup and replace your old meter with a bi-directional net meter. Our team handles this paperwork for you.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
              <h3 className="font-bold text-xl text-green-400 mb-3 flex items-center">
                 <span className="w-6 h-6 rounded-full bg-green-500/20 text-xs flex items-center justify-center mr-3 border border-green-500/30 text-green-400">3</span>
                 Check for Subsidies
              </h3>
              <p className="text-surface-200 leading-relaxed pl-9">
                Look into national portal schemes (like PM-Surya Ghar: Muft Bijli Yojana) which offer heavy financial subsidies for residential on-grid systems up to 3 kW, significantly shortening your payback period.
              </p>
            </div>
            
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
              <h3 className="font-bold text-xl text-green-400 mb-3 flex items-center">
                 <span className="w-6 h-6 rounded-full bg-green-500/20 text-xs flex items-center justify-center mr-3 border border-green-500/30 text-green-400">4</span>
                 High-Efficiency Panels
              </h3>
              <p className="text-surface-200 leading-relaxed pl-9">
                Use Monocrystalline or TOPCon panels. They generate more power in low-light or cloudy conditions, ensuring your generation targets are met even during monsoon seasons.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center relative z-10">
             <Button variant="solar" size="lg" className="w-full md:w-auto py-8 text-xl shadow-[0_0_30px_rgba(37,166,90,0.2)]" asChild>
                <Link href="/solar-calculator">
                   Start Your Calculation Now
                   <ArrowRightLeft className="ml-3 h-5 w-5" />
                </Link>
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
