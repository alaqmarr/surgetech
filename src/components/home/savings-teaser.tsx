"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, IndianRupee, MapPin, Home, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { ConsumerCategory, LocationContext } from "@/lib/calculator/types";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { runSolarCalculation } from "@/lib/calculator/index";
import { getTariff } from "@/data/tariffs/database";

export function SavingsTeaser() {
  const router = useRouter();
  
  const [pinCode, setPinCode] = useState("");
  const [propertyType, setPropertyType] = useState<ConsumerCategory>("residential");
  const [monthlyBill, setMonthlyBill] = useState(5000);

  const [location, setLocation] = useState<LocationContext | null>(null);
  const [isResolvingPin, setIsResolvingPin] = useState(false);
  const [pinError, setPinError] = useState("");
  
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const results = React.useMemo(() => {
    const discom = location?.likelyDiscom || "Generic National Grid";
    const tariff = getTariff(discom, propertyType);
    return runSolarCalculation({
      propertyType,
      monthlyBill,
      scenario: "expected",
      tariff,
      location: location || undefined,
      discom,
      state: location?.state || "Generic National Grid",
    });
  }, [location, propertyType, monthlyBill]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    
  const formatLakh = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakh`;
    }
    return formatCurrency(val);
  };

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
        scenario: "expected"
      });
      
      router.push(`/m?${params.toString()}`);
    }, 1500);
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

      <section className="relative z-20 -mt-16 md:-mt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-5xl mx-auto glass-dark rounded-[2rem] p-6 md:p-10 shadow-[0_30px_60px_rgba(3,29,61,0.5)] flex flex-col lg:flex-row gap-10 items-center border border-white/10 backdrop-blur-xl">
            
            {/* Real Inputs */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Average Monthly Bill (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input 
                    type="number" 
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-500 focus:bg-white/5 transition-all font-semibold"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Property Type</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <select 
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as ConsumerCategory)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-navy-900 text-white appearance-none focus:outline-none focus:border-green-500 transition-all font-semibold"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Location (PIN)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input 
                      type="text" 
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      maxLength={6}
                      placeholder="e.g. 500081" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-500 focus:bg-white/5 transition-all font-semibold placeholder:text-white/30"
                    />
                    {isResolvingPin && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-green-500" />
                      </div>
                    )}
                  </div>
                  {location && !showLocationAlert && (
                    <p className="text-[10px] text-green-600 mt-1 flex items-center font-bold">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {location.city}
                    </p>
                  )}
                  {pinError && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center font-bold">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {pinError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Reactive Outputs / CTA Side */}
            <div className="w-full lg:w-1/2 bg-navy-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between h-full min-h-[280px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <div className="mb-6">
                <Calculator className="h-6 w-6 text-green-500 mb-6" />
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <p className="text-sm text-surface-200 mb-1">Recommended System</p>
                    <p className="font-heading font-bold text-2xl text-cyan-400">
                      {results.recommendedSystemSizeKw} kW
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-200 mb-1">Annual Savings</p>
                    <p className="font-heading font-bold text-2xl text-green-400">
                      {formatCurrency(results.annualSavings)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-200 mb-1">Payback Period</p>
                    <p className="font-heading font-bold text-2xl text-white">
                      {results.paybackYears === Infinity ? 'Infinity' : `${results.paybackYears} Years`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-200 mb-1">25-Year Savings</p>
                    <p className="font-heading font-bold text-2xl text-white">
                      {formatLakh(results.lifetimeSavings25Y)}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="solar" 
                className="w-full py-6 text-lg"
                onClick={handleCalculate}
                disabled={!pinCode || pinCode.length < 6 || isResolvingPin || showLocationAlert}
              >
                See My Solar Potential
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
