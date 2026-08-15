"use client";

import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Factory, Home, Building2, Zap, ShieldCheck, Leaf } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const getSolutionData = (type: string) => {
  const data = {
    residential: {
      title: "Residential Solar",
      heroImage: "/images/residential-solar.jpg",
      icon: Home,
      subtitle: "Power your home. Empower your future.",
      description: "Take control of your energy costs and protect your family from rising electricity tariffs. Our residential solar systems are designed to seamlessly integrate with your home's architecture while delivering maximum efficiency.",
      benefits: [
        "Reduce electricity bills by up to 90%",
        "Increase property value",
        "Protect against rising energy costs",
        "25-year performance warranty",
        "Smart mobile monitoring app",
        "Hassle-free net metering approvals"
      ],
      features: [
        { title: "Sleek Design", desc: "Aesthetic panels that blend with your roof." },
        { title: "Smart Inverters", desc: "Intelligent energy routing." },
        { title: "Battery Ready", desc: "Easily add storage later." }
      ]
    },
    commercial: {
      title: "Commercial Solar",
      heroImage: "/images/commercial-solar.jpg",
      icon: Building2,
      subtitle: "Smart energy for smart businesses.",
      description: "Transform your commercial property's idle roof space into a powerful energy asset. Our commercial solutions deliver high ROI and rapid payback periods, significantly reducing your operational expenditures.",
      benefits: [
        "Accelerated depreciation benefits",
        "Rapid ROI (typically 3-5 years)",
        "Lock in long-term energy costs",
        "Enhance corporate ESG profile",
        "Custom engineering for complex roofs",
        "Zero downtime installation process"
      ],
      features: [
        { title: "High Yield", desc: "Maximized energy generation." },
        { title: "Grid Sync", desc: "Seamless utility integration." },
        { title: "Tax Incentives", desc: "Expert guidance on rebates." }
      ]
    },
    industrial: {
      title: "Industrial Solar",
      heroImage: "/images/industrial-solar.jpg",
      icon: Factory,
      subtitle: "Heavy-duty power for heavy industry.",
      description: "Engineered for scale and reliability, our industrial solar plants are built to withstand harsh environments while delivering the massive power output required by manufacturing and industrial facilities.",
      benefits: [
        "Offset massive energy requirements",
        "Protect against grid instability",
        "Peak load shaving capabilities",
        "Utility-scale components & engineering",
        "Advanced grid-synchronization",
        "Comprehensive O&M services"
      ],
      features: [
        { title: "Rugged Build", desc: "Withstands harsh conditions." },
        { title: "Mega-Scale", desc: "MW-class generation capacity." },
        { title: "O&M Included", desc: "24/7 dedicated monitoring." }
      ]
    }
  };

  return data[type as keyof typeof data] || null;
};

export default function SolutionDetail({ params }: { params: Promise<{ type: string }> }) {
  // Use React.use to unwrap the Promise in Next.js 15+
  const resolvedParams = use(params);
  const solution = getSolutionData(resolvedParams.type);

  if (!solution) {
    notFound();
  }

  const Icon = solution.icon;

  return (
    <>
      <div className="min-h-screen bg-navy-950 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-48 lg:pt-56 pb-24">
          <div className="absolute inset-0 z-0">
            <Image 
              src={solution.heroImage} 
              alt={solution.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full glass border border-white/20 px-4 py-1.5 text-xs font-bold text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Icon className="mr-2 h-4 w-4" />
                  SURGETECH SOLUTIONS
                </div>
                
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg">
                  {solution.title.split(' ')[0]} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                    {solution.title.split(' ')[1]}
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-surface-200 mb-10 font-medium">
                  {solution.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="solar" size="lg" className="h-14 px-8 text-lg rounded-xl shadow-[0_5px_20px_rgba(247,148,29,0.3)]" asChild>
                    <Link href={`/solar-calculator?type=${resolvedParams.type}`}>
                      Calculate Savings <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" className="h-14 px-8 text-lg rounded-xl border-white/20 hover:bg-white/10" asChild>
                    <Link href="/contact">
                      Contact Engineering
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right Side Glass Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="glass-dark border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-green-500/20 rounded-full blur-3xl" />
                  
                  <h3 className="font-heading text-2xl font-bold text-white mb-6">System Capabilities</h3>
                  <div className="space-y-6">
                    {solution.features.map((feat, i) => (
                      <div key={i} className="flex items-start">
                         <div className="bg-white/5 p-3 rounded-xl mr-4 border border-white/10">
                           {i === 0 ? <Zap className="h-6 w-6 text-cyan-400" /> : 
                            i === 1 ? <ShieldCheck className="h-6 w-6 text-green-400" /> : 
                                      <Leaf className="h-6 w-6 text-orange-400" />}
                         </div>
                         <div>
                           <h4 className="text-white font-bold text-lg">{feat.title}</h4>
                           <p className="text-surface-300 text-sm">{feat.desc}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* DETAILS & BENEFITS */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                  Engineered for <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Maximum Performance.</span>
                </h2>
                <p className="text-lg text-surface-200 leading-relaxed mb-10">
                  {solution.description}
                </p>
                
                {/* Visual Placeholder for Blueprint */}
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group">
                  <Image 
                    src={solution.heroImage}
                    alt="System Detail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-navy-950/40 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 mb-4 backdrop-blur-md border border-cyan-500/30">
                        <Zap className="h-8 w-8" />
                      </div>
                      <p className="text-white font-bold tracking-widest uppercase text-sm">System Visualization</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
                  
                  <h3 className="font-heading text-3xl font-bold text-white mb-8">
                    Key Advantages
                  </h3>
                  
                  <ul className="space-y-6">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <CheckCircle2 className="h-6 w-6 text-cyan-400 mr-4 shrink-0" />
                        <span className="text-white font-medium text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12 pt-8 border-t border-white/10">
                     <p className="text-sm text-surface-400 mb-4 uppercase tracking-widest font-bold">Ready to start your transition?</p>
                     <Button variant="solar" size="lg" className="w-full h-16 text-xl rounded-2xl shadow-[0_5px_20px_rgba(247,148,29,0.2)] justify-between px-8" asChild>
                       <Link href="/contact">
                         Speak with our engineers
                         <ArrowRight className="h-6 w-6" />
                       </Link>
                     </Button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
