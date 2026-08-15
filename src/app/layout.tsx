import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Surgetech Solar",
    default: "Surgetech Solar | Clean Energy. Better Tomorrow.",
  },
  description: "Smart solar solutions for homes, businesses and industries — designed to generate clean energy, reduce electricity costs, and deliver dependable long-term performance.",
  keywords: ["solar panels", "solar installation", "solar energy", "commercial solar", "residential solar", "solar calculator", "Surgetech Solar"],
  authors: [{ name: "Surgetech Solar" }],
  openGraph: {
    title: "Surgetech Solar | Clean Energy. Better Tomorrow.",
    description: "Premium solar engineering for maximum ROI. Discover our custom energy solutions and interactive savings calculator.",
    url: "https://surgetechsolar.com",
    siteName: "Surgetech Solar",
    images: [
      {
        url: "https://surgetechsolar.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Surgetech Solar Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgetech Solar",
    description: "Premium solar engineering for maximum ROI.",
    images: ["https://surgetechsolar.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Surgetech Solar",
  "image": "https://surgetechsolar.com/og-image.jpg",
  "description": "Premium engineering-first solar installation and intelligence company.",
  "url": "https://surgetechsolar.com",
  "telephone": "+911800787437",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Surgetech Innovation Hub",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500081",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.4483,
    "longitude": 78.3915
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-navy-950">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
