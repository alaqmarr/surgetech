import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact Us | Surgetech Solar",
  description: "Get in touch with Surgetech Solar for inquiries, quotes, and support.",
};

export default async function ContactPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch (e) {
    console.error("Failed to load site settings", e);
  }

  // Use DB settings or fallback to hardcoded defaults
  const addressLines = (settings?.contactAddress || "Surgetech Innovation Hub\nCyberabad, Hyderabad\nTelangana, 500081").split('\n');
  const phoneNumbers = (settings?.contactPhone || "+91 1800-SURGE-SOLAR\n+91 98765 43210").split('\n');
  const emails = (settings?.contactEmail || "hello@surgetechsolar.com\nsupport@surgetechsolar.com").split('\n');

  return (
    <>
      <div className="pt-48 lg:pt-56 md:pb-20 min-h-screen bg-navy-950 gradient-mesh-dark relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-green-500/10 to-transparent rounded-tr-full blur-3xl -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
              WE&apos;RE HERE TO <span className="text-gradient">HELP.</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-200 font-medium leading-relaxed">
              Whether you need a custom engineering quote, have a question about your existing system, or just want to learn more about solar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="glass-dark rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none transition-all group-hover:bg-cyan-500/20" />
                <h2 className="font-heading text-3xl font-bold text-white mb-10">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start group/item">
                    <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-cyan-500/20 group-hover/item:border-cyan-500/30 transition-all">
                      <MapPin className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Headquarters</h4>
                      <p className="text-surface-200 leading-relaxed">
                        {addressLines.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < addressLines.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group/item">
                    <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-green-500/20 group-hover/item:border-green-500/30 transition-all">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Phone</h4>
                      {phoneNumbers.map((phone, i) => (
                        <p key={i} className="text-surface-200 leading-relaxed">{phone}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start group/item">
                    <div className="h-14 w-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-orange-500/20 group-hover/item:border-orange-500/30 transition-all">
                      <Mail className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Email</h4>
                      {emails.map((email, i) => (
                        <p key={i} className="text-surface-200 leading-relaxed">{email}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start group/item">
                    <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mr-5 group-hover/item:bg-blue-500/20 group-hover/item:border-blue-500/30 transition-all">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">Business Hours</h4>
                      <p className="text-surface-200 leading-relaxed">Monday - Saturday</p>
                      <p className="text-surface-200 leading-relaxed">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-dark rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl">
                <h2 className="font-heading text-3xl font-bold text-white mb-8">Send us a message</h2>
                
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


