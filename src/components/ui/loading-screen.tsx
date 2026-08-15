import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Calculating your savings..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm animate-in fade-in duration-300">
      <Loader2 className="h-16 w-16 animate-spin text-navy-600 mb-6" />
      <h2 className="font-heading text-2xl font-bold text-white animate-pulse">{message}</h2>
      <p className="text-muted mt-2">Accessing local tariff databases and solar irradiation profiles</p>
    </div>
  );
}
