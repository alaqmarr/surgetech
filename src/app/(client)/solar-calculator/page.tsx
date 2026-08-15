import { CalculatorInput } from "@/components/calculator/calculator-input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Savings Calculator | Surgetech Solar",
  description: "Calculate your estimated solar savings, system size, and payback period with our interactive Solar Energy Intelligence Engine.",
};

export default function SolarCalculatorPage() {
  return (
    <div>
      <CalculatorInput />
    </div>
  );
}


