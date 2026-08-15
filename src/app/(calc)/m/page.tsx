"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CalculatorResults } from "@/components/calculator/calculator-results";
import { ConsumerCategory } from "@/lib/calculator/types";
import { LoadingScreen } from "@/components/ui/loading-screen";

function CalculatorResultsRenderer() {
  const searchParams = useSearchParams();
  
  const pin = searchParams.get('pin') || "500001";
  const bill = Number(searchParams.get('bill')) || 5000;
  const type = (searchParams.get('type') as ConsumerCategory) || "residential";
  const scenario = (searchParams.get('scenario') as "conservative" | "expected" | "optimistic") || "expected";
  const roof = searchParams.get('roof') ? Number(searchParams.get('roof')) : undefined;

  return (
    <CalculatorResults 
      pin={pin}
      bill={bill}
      type={type}
      scenario={scenario}
      roof={roof}
    />
  );
}

export default function SolarCalculatorMePage() {
  return (
    <main>
      <Suspense fallback={<LoadingScreen message="Loading your solar results..." />}>
        <CalculatorResultsRenderer />
      </Suspense>
    </main>
  );
}
