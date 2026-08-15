import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The installation process was smooth and the team explained everything clearly. Our bills have dropped significantly just as they promised.",
    name: "Rajesh Kumar",
    location: "Hyderabad",
    system: "6.6 kW Residential"
  },
  {
    quote: "Surgetech designed a custom solution for our manufacturing unit. Their engineering approach gave us confidence to make the investment.",
    name: "Sanjay Mehta",
    location: "Pune",
    system: "500 kW Industrial"
  },
  {
    quote: "Excellent after-sales support. Whenever I have a question about the monitoring app, their team responds immediately.",
    name: "Priya Sharma",
    location: "Bengaluru",
    system: "10 kW Commercial"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-navy-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
            TRUSTED BY HOMEOWNERS AND BUSINESSES.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-navy-900/50 rounded-2xl p-8 border border-surface-100 shadow-sm relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-white/10 rotate-180" />
              <p className="text-white font-medium text-lg leading-relaxed mb-8 relative z-10">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center font-bold text-cyan-800">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-muted">{t.location} • {t.system}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
