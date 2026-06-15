"use client";

import React, { useState } from "react";
import { mockServices } from "@/data/mocData";
import { 
  Wrench, 
  ShieldCheck, 
  Activity, 
  Disc, 
  Compass, 
  Wind, 
  Check, 
  Clock, 
  ChevronDown, 
  HelpCircle, 
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const IconMap: Record<string, any> = {
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
  Activity: Activity,
  Disc: Disc,
  Compass: Compass,
  Wind: Wind
};

export default function ServicesPage() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Maintenance" | "Repairs" | "AC & Wheels">("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Grouped tabs mapping
  const filteredServices = mockServices.filter(service => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Maintenance") {
      return service.id === "general-service" || service.id === "periodic-maintenance";
    }
    if (selectedFilter === "Repairs") {
      return service.id === "engine-repair" || service.id === "ac-repair";
    }
    if (selectedFilter === "AC & Wheels") {
      return service.id === "wheel-alignment" || service.id === "brake-service";
    }
    return true;
  });

  // Extract all FAQs from service categories for unified FAQ accordion listing
  const allFaqs = mockServices.flatMap(s => s.faqs);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Our Premium <span className="text-brand-primary">Car Care Services</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Choose from standard diagnostic assessments, periodic filter schedules, specialized custom system overhauls, or precision adjustments.
        </p>
      </div>

      {/* 2. Interactive Service Filters */}
      <div className="flex justify-center border-b border-divider pb-4">
        <div className="flex flex-wrap gap-2 justify-center bg-input-bg/50 border border-card-border p-1.5 rounded-2xl">
          {(["All", "Maintenance", "Repairs", "AC & Wheels"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedFilter === tab
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/10"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => {
            const ServiceIcon = IconMap[service.iconName] || Wrench;
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass border border-card-border rounded-2xl bg-card-bg/40 p-6 flex flex-col justify-between hover:border-brand-primary/30 transition-all duration-300 shadow-lg group relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-5">
                  {/* Icon & Details */}
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-brand-primary/15 border border-brand-primary/20 rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-md">
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <div className="text-right text-xs text-gray-400 font-bold space-y-1">
                      <p className="flex items-center justify-end gap-1 font-sans">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {service.estimatedTime}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">Estimated Time</p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-foreground">{service.name}</h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 border-t border-divider pt-4 text-xs font-semibold text-gray-300">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="p-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer / Pricing / Book CTA */}
                <div className="mt-8 pt-4 border-t border-divider flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Starting Price</p>
                    <p className="text-xl font-black text-foreground">₹{service.startingPrice.toLocaleString()}</p>
                  </div>

                  <Link
                    href={`/book?service=${encodeURIComponent(service.id)}`}
                    className="inline-flex items-center gap-1 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-brand-primary/10 hover:shadow-lg"
                  >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 4. FAQs Accordions */}
      <div className="max-w-4xl mx-auto space-y-8 pt-10 border-t border-divider">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-400 font-medium">Clear diagnostics and operations questions answered regarding car services.</p>
        </div>

        <div className="space-y-4">
          {allFaqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="glass border border-card-border rounded-xl bg-card-bg/30 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 flex items-center justify-between text-left text-foreground hover:bg-[#1a1a24]/10 transition font-bold text-sm cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ${
                    isExpanded ? "rotate-180" : ""
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-400 font-semibold leading-relaxed border-t border-divider/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
