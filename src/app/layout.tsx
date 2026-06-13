import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/appContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Clean, readable body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Sleek, bold automotive-style heading font
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hrithik's Garage | Premium Car Care & Repairs",
  description: "Multi-brand car service workshop offering premium maintenance, inspections, detailing, and emergency breakdown services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d11] text-[#f3f4f6] font-sans">
        <AppProvider>
          {/* Header Navigation */}
          <Navbar />
          
          {/* Main page content wrapper */}
          <div className="flex-grow">
            {children}
          </div>
          
          {/* Footer */}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
