"use client";

import React, { useState } from "react";
import { ArrowRight, MapPin, Zap, AlertCircle, Building2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LocationData {
  pincode: string;
  state: string;
  district: string;
  city: string;
  discom?: string;
  tariffSource?: string;
}

export default function PincodeCheckerPage() {
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LocationData | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Fetch location details
      const locRes = await fetch(`/api/location?pincode=${pincode}`);
      const locData = await locRes.json();

      if (!locRes.ok) {
        throw new Error(locData.error || "Failed to fetch location details.");
      }

      // 2. Infer DISCOM based on state (mock logic, mirrors database.ts)
      let detectedDiscom = "Generic National Grid";
      let sourceName = "Surgetech National Average Estimate";
      
      if (locData.state === "Telangana") {
        detectedDiscom = "TSSPDCL";
        sourceName = "TSERC Tariff Order 2026";
      } else if (locData.state === "Delhi") {
        detectedDiscom = "BSES Rajdhani";
        sourceName = "DERC Tariff Order 2026";
      }

      setResult({
        ...locData,
        discom: detectedDiscom,
        tariffSource: sourceName
      });

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center pt-48 lg:pt-56 pb-16 px-4 sm:px-6 lg:px-8 bg-navy-950 gradient-mesh-dark relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-gradient-to-tr from-cyan-500/10 to-green-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-xl mx-auto w-full relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold tracking-widest text-surface-200 uppercase">Location Checker</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Check Your Area
          </h1>
          <p className="text-lg text-surface-300">
            Enter your PIN code to see your local electricity provider and tariff availability.
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleCheck} className="flex gap-3 mb-8">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit PIN Code"
              className="flex-1 bg-navy-900 border border-white/10 rounded-xl px-5 text-lg text-white font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-surface-500"
              maxLength={6}
            />
            <Button 
              type="submit" 
              variant="solar" 
              className="h-[52px] px-6 text-lg"
              disabled={isLoading || pincode.length !== 6}
            >
              {isLoading ? "Checking..." : "Verify"}
            </Button>
          </form>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 shrink-0" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">State</p>
                  <p className="text-lg font-bold text-white truncate">{result.state}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">District / City</p>
                  <p className="text-lg font-bold text-white truncate">{result.district}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-navy-900 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center w-full">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mr-4 shrink-0">
                    <Building2 className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="overflow-hidden w-full">
                    <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-0.5">Electricity Provider</p>
                    <p className="text-xl font-extrabold text-white truncate">{result.discom}</p>
                    <p className="text-xs text-surface-400 truncate mt-1 flex items-center">
                      <Zap className="h-3 w-3 mr-1" /> Tariff Source: {result.tariffSource}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/solar-calculator?pin=${result.pincode}`}>
                  <Button variant="primary" className="w-full h-14 text-lg">
                    Calculate Savings for this Area <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
