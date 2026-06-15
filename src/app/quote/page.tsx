"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { mockBrands, mockServices } from "@/data/mocData";
import { Calculator, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function QuotePage() {
  const [selectedBrand, setSelectedBrand] = useState(mockBrands[0].name);
  const [selectedModel, setSelectedModel] = useState(mockBrands[0].models[0]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [selectedServiceId, setSelectedServiceId] = useState(mockServices[0].id);

  const [quoteRange, setQuoteRange] = useState<{ min: number; max: number; base: number } | null>(null);

  // Update models list when brand changes
  const activeBrandData = mockBrands.find(b => b.name === selectedBrand) || mockBrands[0];
  
  useEffect(() => {
    if (activeBrandData) {
      setSelectedModel(activeBrandData.models[0]);
    }
  }, [selectedBrand]);

  // Run calculation when selections change
  useEffect(() => {
    const service = mockServices.find(s => s.id === selectedServiceId) || mockServices[0];
    const brand = mockBrands.find(b => b.name === selectedBrand) || mockBrands[0];

    const baseCost = service.startingPrice * brand.multiplier;
    const min = Math.round(baseCost * 0.9);
    const max = Math.round(baseCost * 1.15);

    setQuoteRange({ min, max, base: Math.round(baseCost) });
  }, [selectedBrand, selectedModel, selectedYear, selectedServiceId]);

  const activeService = mockServices.find(s => s.id === selectedServiceId) || mockServices[0];
  const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

  return (
    <main className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
          Instant Estimation
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Car Service Price Calculator
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Select your vehicle specifics and choose a service to receive an instant, accurate pricing quote range.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Input Form (Lg: 7 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-7 glass p-8 rounded-2xl border border-card-border bg-card-bg/95 space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-divider pb-4">
            <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Select Car Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Brand Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Car Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
              >
                {mockBrands.map((brand) => (
                  <option key={brand.name} value={brand.name} className="bg-[#16161e] text-white">
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown (Dynamic) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Car Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
              >
                {activeBrandData.models.map((model) => (
                  <option key={model} value={model} className="bg-[#16161e] text-white">
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturing Year */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Model Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#16161e] text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Service Package
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
              >
                {mockServices.map((service) => (
                  <option key={service.id} value={service.id} className="bg-[#16161e] text-white">
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </motion.div>

        {/* Right Side: Quote Display Card (Lg: 5 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="glass p-8 rounded-2xl border border-card-border bg-card-bg/95 space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-primary/5 blur-2xl pointer-events-none" />

            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                Estimated Price Range
              </span>
              {quoteRange && (
                <h2 className="text-3xl md:text-4xl font-black text-brand-primary glow-text-orange tracking-tight">
                  ₹{quoteRange.min.toLocaleString()} - ₹{quoteRange.max.toLocaleString()}
                </h2>
              )}
              <p className="text-xs text-gray-400">
                For {selectedBrand} {selectedModel} ({selectedYear})
              </p>
            </div>

            {/* Inclusions list */}
            <div className="border-t border-divider pt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                What is included in this quote:
              </h4>
              <ul className="space-y-3 text-xs md:text-sm text-text-muted">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-accent-green shrink-0" />
                  <span>Free Pickup & Drop Service</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-accent-green shrink-0" />
                  <span>100% Genuine OEM/OES Spare Spares</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-accent-green shrink-0" />
                  <span>6 Months / 10,000 km Service Warranty</span>
                </li>
              </ul>
            </div>

            {/* Dynamic Details Box */}
            <div className="p-4 bg-background/60 border border-card-border rounded-xl text-xs space-y-1.5 leading-relaxed text-gray-400">
              <p className="font-bold text-white uppercase text-[9px] tracking-wider mb-1">
                Selected Package: {activeService.name}
              </p>
              <p>{activeService.shortDescription}</p>
              <p className="text-[10px] text-gray-500 pt-1">
                ⏱️ Repair Time: {activeService.estimatedTime}
              </p>
            </div>

            {/* Book Now Button passing params */}
            <Link
              href={`/book?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}&service=${encodeURIComponent(selectedServiceId)}&cost=${quoteRange?.base || 0}`}
              className="flex items-center justify-center gap-2 w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 text-sm cursor-pointer"
            >
              Book this Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </motion.div>
      </div>

    </main>
  );
}
