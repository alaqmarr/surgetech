"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ConsumerCategory, LocationContext } from "@/lib/calculator/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Loader2, CheckCircle2, AlertCircle, Home, Building2, Factory, Settings2, Sparkles } from "lucide-react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { LoadingScreen } from "@/components/ui/loading-screen";

export function CalculatorInput() {
  const router = useRouter();
  
  const [pinCode, setPinCode] = useState("");
  const [propertyType, setPropertyType] = useState<ConsumerCategory>("residential");
  const [monthlyBill, setMonthlyBill] = useState(5000);
  const [scenario, setScenario] = useState<"conservative" | "expected" | "optimistic">("expected");

  const [isDetailed, setIsDetailed] = useState(false);
  const [roofArea, setRoofArea] = useState<string>("");

  const [location, setLocation] = useState<LocationContext | null>(null);
  const [isResolvingPin, setIsResolvingPin] = useState(false);
  const [pinError, setPinError] = useState("");

  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!pinCode || pinCode.length !== 6) {
        setLocation(null);
        return;
      }

      setIsResolvingPin(true);
      setPinError("");

      try {
        const res = await fetch(`/api/location?pincode=${pinCode}`);
        if (!res.ok) throw new Error("Invalid PIN");
        
        const data = await res.json();
        setLocation(data);
        setShowLocationAlert(true);
      } catch (err) {
        setLocation(null);
        setPinError("Could not detect location.");
      } finally {
        setIsResolvingPin(false);
      }
    };

    const timer = setTimeout(() => {
      fetchLocation();
    }, 500);

    return () => clearTimeout(timer);
  }, [pinCode]);

  const handleCalculate = () => {
    setIsLoadingResults(true);
    
    setTimeout(() => {
      const params = new URLSearchParams({
        pin: pinCode,
        bill: monthlyBill.toString(),
        type: propertyType,
        scenario: scenario
      });
      if (roofArea) params.set('roof', roofArea);
      
      router.push(`/m?${params.toString()}`);
    }, 1500);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const getBillColorClass = () => {
    if (monthlyBill < 5000) return "text-green-400";
    if (monthlyBill < 15000) return "text-cyan-400";
    if (monthlyBill < 30000) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <>
      {isLoadingResults && <LoadingScreen />}
      
      <AlertDialog 
        isOpen={showLocationAlert}
        title="Location Detected"
        description={`We detected your PIN code is in ${location?.city || ''}, ${location?.state || ''}. Is this correct?`}
        confirmText="Yes, Proceed"
        cancelText="Change PIN"
        onConfirm={() => setShowLocationAlert(false)}
        onCancel={() => {
          setShowLocationAlert(false);
          setPinCode("");
          setLocation(null);
        }}
      />

      <main className="h-screen w-full relative flex items-center pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Full Screen Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/calculator-bg.jpg" 
            alt="Solar Intelligence Blueprint"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Left Side: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 text-center lg:text-left pt-8 lg:pt-0"
          >
            <div className="inline-flex items-center rounded-full glass border border-white/20 px-3 py-1 text-[10px] font-bold text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sparkles className="mr-2 h-3 w-3" />
              HELIOS ENGINE v4.8
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              Precision <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Engineering.</span>
            </h1>
            <p className="text-surface-200 text-base lg:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
              Enter your property details and our proprietary intelligence engine will instantly calculate your optimal system size, costs, and 25-year return on investment.
            </p>
          </motion.div>

          {/* Right Side: Form Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-7/12 max-w-2xl glass-dark rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-center max-h-full"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />

            <div className="space-y-6 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
              
              {/* STEP 1: PROPERTY TYPE */}
              <div>
                <h3 className="text-xs font-bold text-surface-400 mb-3 tracking-widest uppercase">1. Select Property Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "residential", label: "Home", icon: Home },
                    { id: "commercial", label: "Business", icon: Building2 },
                    { id: "industrial", label: "Factory", icon: Factory }
                  ].map((type) => {
                    const isSelected = propertyType === type.id;
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setPropertyType(type.id as ConsumerCategory)}
                        className={`relative flex items-center justify-center flex-col p-3 rounded-xl border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-cyan-400 scale-[1.02]' 
                            : 'bg-white/5 border-white/10 text-surface-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-cyan-400' : 'text-surface-400'}`} strokeWidth={isSelected ? 2 : 1.5} />
                        <span className="text-xs font-bold tracking-wide text-center">{type.label}</span>
                        {isSelected && (
                          <motion.div layoutId="property-outline" className="absolute inset-0 border-2 border-cyan-500 rounded-xl" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: MONTHLY BILL */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-xs font-bold text-surface-400 tracking-widest uppercase mb-1">2. Avg Monthly Bill</h3>
                  <div className={`font-heading text-3xl font-extrabold transition-colors duration-300 ${getBillColorClass()} flex items-center justify-end group`}>
                    <span className="mr-1">₹</span>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={monthlyBill === 0 ? "" : monthlyBill.toLocaleString('en-IN')}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setMonthlyBill(val ? Number(val) : 0);
                      }}
                      className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-cyan-500 text-right focus:outline-none focus:ring-0 p-0 w-[160px] tabular-nums transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="relative pt-2 pb-2">
                  <input 
                    type="range" 
                    min="1000" 
                    max={propertyType === "residential" ? 20000 : 500000} 
                    step={propertyType === "residential" ? 500 : 5000}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer hover:accent-cyan-400 transition-all z-10 relative"
                  />
                  <div className="flex justify-between text-[10px] text-surface-500 mt-2 font-bold tracking-wider uppercase">
                    <span>₹1,000</span>
                    <span>{propertyType === "residential" ? "₹20,000+" : "₹5,00,000+"}</span>
                  </div>
                </div>
              </div>

              {/* STEP 3: LOCATION */}
              <div>
                <h3 className="text-xs font-bold text-surface-400 mb-3 tracking-widest uppercase">3. Location Details</h3>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative bg-navy-900/80 border border-white/10 rounded-xl flex items-center p-2 transition-all duration-300 focus-within:border-cyan-500/50 focus-within:bg-navy-800 shadow-inner">
                    <div className="p-2 bg-white/5 rounded-lg mr-3">
                      <MapPin className="h-5 w-5 text-cyan-400" />
                    </div>
                    <input 
                      type="text" 
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      maxLength={6}
                      className="flex-1 bg-transparent border-none text-xl text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-0"
                      placeholder="Enter 6-Digit PIN"
                    />
                    <div className="pr-3">
                      {isResolvingPin && <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />}
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {location && !showLocationAlert && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-green-400 mt-2 flex items-center font-bold px-2"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Verified Region: {location.city}, {location.state}
                    </motion.p>
                  )}
                  {pinError && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-400 mt-2 flex items-center font-bold px-2"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {pinError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* ADVANCED SETTINGS */}
              <div className="pt-2">
                <button 
                  onClick={() => setIsDetailed(!isDetailed)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center text-xs font-bold text-surface-200 uppercase tracking-wide">
                    <Settings2 className="h-4 w-4 mr-2 text-cyan-400" />
                    Advanced Parameters
                  </div>
                  <div className={`text-surface-400 transition-transform duration-300 ${isDetailed ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>

                <AnimatePresence>
                  {isDetailed && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 mt-3 rounded-xl border border-white/5 bg-navy-900/50 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-surface-400 mb-2 tracking-widest uppercase">Roof Area (Sq Ft)</label>
                            <input 
                              type="number" 
                              value={roofArea}
                              onChange={(e) => setRoofArea(e.target.value)}
                              className="w-full px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-500 transition-all font-semibold placeholder:text-white/30"
                              placeholder="Auto-calculate"
                            />
                          </div>
                          <div>
                             <label className="block text-[10px] font-bold text-surface-400 mb-2 tracking-widest uppercase">Market Scenario</label>
                             <div className="flex rounded-lg border border-white/10 overflow-hidden bg-white/5 p-1">
                                {(["conservative", "expected", "optimistic"] as const).map((s) => (
                                   <button
                                     key={s}
                                     onClick={() => setScenario(s)}
                                     className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-md ${scenario === s ? 'bg-cyan-500 text-navy-950 shadow-md' : 'text-surface-400 hover:text-white'}`}
                                   >
                                      {s}
                                   </button>
                                ))}
                             </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* CALCULATE BUTTON */}
              <div className="pt-2">
                <Button 
                  variant="solar" 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-xl shadow-[0_5px_20px_rgba(247,148,29,0.3)] hover:shadow-[0_10px_30px_rgba(247,148,29,0.5)]"
                  onClick={handleCalculate}
                  disabled={!pinCode || pinCode.length < 6 || isResolvingPin || showLocationAlert}
                >
                  Run Engine
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>

            </div>
          </motion.div>
        </div>
        
        {/* Custom scrollbar style for webkit */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.1); 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(6,182,212,0.5); 
          }
        `}} />
      </main>
    </>
  );
}
