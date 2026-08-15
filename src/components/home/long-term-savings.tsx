"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const generateData = (years: number) => {
  const data = [];
  let withoutSolar = 0;
  let withSolar = 0;
  
  const initialMonthlyBill = 5000;
  const annualIncrease = 1.05; // 5% increase per year
  
  const solarSystemCost = 250000;
  const solarMaintenance = 5000; // Annual maintenance
  const solarSavingsPercent = 0.90; // 90% reduction
  
  for (let i = 0; i <= years; i++) {
    if (i === 0) {
      data.push({ year: i, withoutSolar: 0, withSolar: solarSystemCost });
    } else {
      const annualBill = (initialMonthlyBill * 12) * Math.pow(annualIncrease, i - 1);
      withoutSolar += annualBill;
      
      const solarBill = annualBill * (1 - solarSavingsPercent);
      withSolar += solarBill + solarMaintenance;
      
      data.push({ 
        year: i, 
        withoutSolar: Math.round(withoutSolar), 
        withSolar: Math.round(withSolar) 
      });
    }
  }
  return data;
};

export function LongTermSavings() {
  const [years, setYears] = React.useState(25);
  const data = React.useMemo(() => generateData(years), [years]);
  
  const totalSavings = data[data.length - 1].withoutSolar - data[data.length - 1].withSolar;

  return (
    <section className="py-24 bg-navy-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            SEE THE LONG-TERM VALUE OF SOLAR.
          </h2>
          <p className="text-lg text-muted">
            Electricity prices rise every year. Solar protects you from inflation and delivers a strong return on investment.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-navy-900/30 rounded-3xl p-6 md:p-10 shadow-sm border border-surface-100 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Estimated Cumulative Savings</p>
                <p className="font-heading text-4xl font-extrabold text-green-600">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalSavings)}
                </p>
              </div>
              
              <div className="flex bg-navy-900/50 rounded-full p-1 border border-surface-100 shadow-sm">
                {[5, 10, 15, 20, 25].map(y => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${years === y ? 'bg-navy-800 text-white' : 'text-muted hover:text-white hover:bg-navy-900/30'}`}
                  >
                    {y} Yrs
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B3B73" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0B3B73" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25A65A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#25A65A" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="year" 
                    tickFormatter={(val) => `Year ${val}`} 
                    tick={{fill: '#64748B', fontSize: 12}}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    tickFormatter={(val) => `₹${val / 100000}L`} 
                    tick={{fill: '#64748B', fontSize: 12}}
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                  />
                  <Tooltip 
                    formatter={(value: unknown, name: unknown) => [
                      new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value as number),
                      (name as string) === 'withoutSolar' ? 'Grid Cost (No Solar)' : 'Cost with Solar'
                    ]}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="withoutSolar" 
                    stroke="#0B3B73" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorWithout)" 
                    name="withoutSolar"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="withSolar" 
                    stroke="#25A65A" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorWith)" 
                    name="withSolar"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-muted text-center">
            * This is an indicative estimate based on provided assumptions (5% annual tariff increase). Actual savings may vary based on usage patterns, policy changes, and weather conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
