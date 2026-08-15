"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much does solar installation cost?",
    answer: "The cost depends on your energy requirements and roof space. A typical residential system can range from ₹1.5L to ₹4L depending on the size and components chosen. Use our Solar Calculator for a quick estimate."
  },
  {
    question: "How much can solar reduce my electricity bill?",
    answer: "A properly sized solar system can reduce your electricity bill by 80% to 95%. In some cases, with net metering, you might even generate a surplus."
  },
  {
    question: "How long does solar installation take?",
    answer: "Once the design is approved and components arrive, the physical installation for a residential system typically takes 2-4 days. However, grid connectivity and net meter approvals from the utility company can take a few weeks."
  },
  {
    question: "Do solar panels work on cloudy days?",
    answer: "Yes. While they are most efficient in direct sunlight, modern solar panels still generate electricity on cloudy or rainy days, albeit at a reduced capacity."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-24 bg-navy-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            FREQUENTLY ASKED QUESTIONS.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-surface-100 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-navy-900/50 hover:bg-navy-900/30 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-heading font-bold text-lg text-white pr-8">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-green-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-muted bg-navy-900/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
