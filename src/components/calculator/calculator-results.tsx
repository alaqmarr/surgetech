"use client";

import React, { useState, useMemo, useEffect } from "react";
import { runSolarCalculation } from "@/lib/calculator";
import { CalculatorInputs, ConsumerCategory, LocationContext, TariffRecord } from "@/lib/calculator/types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Sun, Zap, X, MapPin, Calculator, IndianRupee } from "lucide-react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import toast from "react-hot-toast";
import { getTariff } from "@/data/tariffs/database";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface CalculatorResultsProps {
  pin: string;
  bill: number;
  type: ConsumerCategory;
  scenario: "conservative" | "expected" | "optimistic";
  roof?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function CalculatorResults({ pin, bill, type, scenario, roof }: CalculatorResultsProps) {
  const [location, setLocation] = useState<LocationContext | null>(null);
  const [discom, setDiscom] = useState<string>("Generic National Grid");
  const [tariff, setTariff] = useState<TariffRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Enquiry Modal State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let detectedDiscom = "Generic National Grid";
        let locationData: LocationContext | null = null;
        
        if (pin && pin.length === 6) {
          try {
            const locRes = await fetch(`/api/location?pincode=${pin}`);
            if (locRes.ok) {
              locationData = await locRes.json();
              if (isMounted) setLocation(locationData);
              detectedDiscom = locationData?.state === "Telangana" ? "TSSPDCL" : 
                               locationData?.state === "Delhi" ? "BSES Rajdhani" : "Generic National Grid";
            }
          } catch (locErr) {
            console.warn("Location fetch failed, proceeding with defaults", locErr);
          }
        }
        
        if (isMounted) setDiscom(detectedDiscom);
        const resolvedTariff = getTariff(detectedDiscom, type);
        if (isMounted) setTariff(resolvedTariff);
      } catch (err) {
        console.error("Failed to load calculation data", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchData();

    return () => { isMounted = false; };
  }, [pin, type]);

  const inputs: CalculatorInputs = useMemo(() => {
    return {
      location: location || undefined,
      state: location?.state || "Generic National Grid",
      discom,
      tariff: tariff || undefined,
      propertyType: type,
      monthlyBill: bill,
      scenario: scenario,
      roofAreaSqFt: roof,
    };
  }, [location, discom, tariff, type, bill, scenario, roof]);

  const results = useMemo(() => runSolarCalculation(inputs), [inputs]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  if (isLoading) {
    return <LoadingScreen message="Analyzing your solar potential..." />;
  }

  const handleRequestQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pinCode: pin,
          monthlyBill: bill,
          propertyType: type,
          scenario,
        })
      });
      
      if (!res.ok) throw new Error("Failed to submit enquiry");
      
      toast.success("Enquiry submitted! We'll email your formal quote shortly.", { duration: 5000 });
      setShowModal(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-navy-950 min-h-screen pt-8 md:pt-12 pb-8 relative overflow-hidden gradient-mesh-dark flex items-center justify-center">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 w-full max-w-7xl relative z-10 h-full flex flex-col justify-center">
        
        {/* Header Section (Super Compact) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              YOUR SOLAR <span className="text-gradient">POTENTIAL</span>
            </h1>
            <p className="text-sm text-surface-300 font-medium mt-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-cyan-400" /> {location ? `${location.city}, ${location.state}` : `PIN ${pin}`}
              <span className="mx-2 opacity-50">|</span>
              <span className="capitalize text-white font-bold">{type} Property</span>
              <span className="mx-2 opacity-50">|</span>
              <IndianRupee className="w-3 h-3 text-white mr-0.5" /> {new Intl.NumberFormat('en-IN').format(bill)}/mo Bill
            </p>
          </div>
          <Button variant="solar" size="sm" className="shadow-lg shadow-cyan-500/20 px-6 font-bold tracking-wide" onClick={() => setShowModal(true)}>
            GET FORMAL QUOTE <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Dashboard Grid */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[calc(100vh-220px)] lg:min-h-[600px] lg:max-h-[800px]"
        >
          
          {/* LEFT COLUMN: Data Metrics (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 h-full">
            
            {/* Top Stat: System Size & Generation */}
            <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-5 border border-white/10 relative overflow-hidden flex-1 shadow-lg group">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 h-24 w-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500" />
              <div className="relative z-10 flex flex-col h-full justify-center">
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Recommended System</p>
                <div className="flex items-baseline mb-3">
                  <span className="font-heading text-5xl font-extrabold text-white drop-shadow-sm">{results.recommendedSystemSizeKw}</span>
                  <span className="text-xl ml-1 text-white/50 font-bold">kW</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Annual Gen.</p>
                    <p className="text-lg font-bold text-white"><Sun className="w-3 h-3 inline text-orange-400 mr-1"/>{new Intl.NumberFormat('en-IN').format(results.estimatedAnnualGenerationKwh)} <span className="text-xs text-white/50">kWh</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Payback</p>
                    <p className="text-lg font-bold text-green-400"><Zap className="w-3 h-3 inline text-green-400 mr-1"/>{results.paybackYears} <span className="text-xs text-green-400/50">yrs</span></p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Middle: Financials */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-5 border border-white/10 shadow-lg flex-1 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Financial Breakdown</p>
              <div className="space-y-2 text-sm flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className="text-surface-300">System Cost</span>
                  <span className="font-bold text-white">{formatCurrency(results.estimatedSystemCost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-surface-300">Gov. Subsidy</span>
                  <span className="font-bold text-green-400">-{formatCurrency(results.applicableIncentive)}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5 mt-2">
                  <span className="font-bold text-white">Net Investment</span>
                  <span className="font-bold text-cyan-400 text-lg">{formatCurrency(results.netInvestment)}</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom: Bill Impact */}
            <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-5 border border-green-500/20 shadow-lg relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3 relative z-10">Monthly Bill Impact</p>
              
              <div className="flex items-center justify-between relative z-10 gap-2">
                <div className="flex-1 bg-white/5 p-3 rounded-xl border border-red-500/10">
                  <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-1">Current</p>
                  <p className="text-lg font-bold text-white/60 line-through decoration-red-500/50 tabular-nums">{formatCurrency(bill)}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 shrink-0" />
                <div className="flex-1 bg-green-500/10 p-3 rounded-xl border border-green-500/30">
                  <p className="text-[10px] text-green-400 uppercase font-bold tracking-widest mb-1">New Bill</p>
                  <p className="text-xl font-extrabold text-green-400 tabular-nums drop-shadow-sm">{formatCurrency(results.newAnnualBill / 12)}</p>
                </div>
              </div>
              <div className="mt-3 text-center relative z-10">
                <p className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 py-1.5 px-3 rounded-full inline-flex items-center">
                  <Leaf className="w-3 h-3 mr-1.5" /> Saves {formatCurrency(results.annualSavings)}/yr
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Chart & Assumptions (Col span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-4 h-full min-h-[400px] lg:min-h-0">
            
            {/* Chart */}
            <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-5 lg:p-6 border border-white/10 shadow-lg flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="text-sm font-bold text-white tracking-wide">25-Year Cumulative Cash Flow</h3>
                <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-lg">
                   <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">25Y Net Benefit: <span className="text-sm font-extrabold ml-1">+{formatCurrency(results.lifetimeSavings25Y)}</span></p>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={results.cashFlow25Years} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                         <linearGradient id="calcColorWithout" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="calcColorWith" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#25A65A" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#25A65A" stopOpacity={0.1}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                      <XAxis 
                         dataKey="year" 
                         tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}}
                         axisLine={false}
                         tickLine={false}
                         dy={10}
                      />
                      <YAxis 
                         tickFormatter={(val) => `₹${val / 100000}L`} 
                         tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}}
                         axisLine={false}
                         tickLine={false}
                         dx={10}
                      />
                      <Tooltip 
                         formatter={(value: unknown, name: unknown) => [
                            formatCurrency(value as number),
                            (name as string) === 'withoutSolar' ? 'Without Solar' : 'With Solar'
                         ]}
                         labelFormatter={(label) => `Year ${label}`}
                         contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', padding: '8px 12px', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="withoutSolar" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#calcColorWithout)" name="withoutSolar" />
                      <Area type="monotone" dataKey="withSolar" stroke="#25A65A" strokeWidth={3} fillOpacity={1} fill="url(#calcColorWith)" name="withSolar" />
                   </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bottom Bar: Assumptions */}
            <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-4 border border-white/5 shadow-lg shrink-0 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${results.confidenceScore === 'High' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : results.confidenceScore === 'Medium' ? 'bg-yellow-500 shadow-[0_0_8px_#eab308]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{results.confidenceScore} Accuracy</span>
              </div>
              <div className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6 text-[11px] text-surface-400">
                <span className="flex items-center"><Calculator className="w-3 h-3 mr-1"/> {results.assumptions.tariffSource}</span>
                <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1"/> {results.assumptions.solarProfileUsed}</span>
                <span className="flex items-center"><Zap className="w-3 h-3 mr-1"/> {results.assumptions.solarDegradationRate * 100}% Degradation</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-navy-900 border border-white/10 rounded-3xl max-w-md w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                <h3 className="font-heading text-xl font-bold text-white">Request Formal Quote</h3>
                <button onClick={() => setShowModal(false)} className="p-2 text-surface-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleRequestQuote} className="p-6 overflow-y-auto custom-scrollbar">
                <p className="text-sm text-surface-300 mb-6">
                  Get a verified quotation, a PDF copy of these estimates, and a free consultation from our engineering team.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-950 rounded-xl border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-950 rounded-xl border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-navy-950 rounded-xl border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    type="submit" 
                    variant="green" 
                    className="w-full py-4 text-base font-bold shadow-lg shadow-green-500/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send My Quote"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
