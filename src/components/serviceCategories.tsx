"use client";

import React from "react";
import Link from "next/link";
import { mockServices } from "@/data/mocData";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function ServiceCategories() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
          Professional Services
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What Care Does Your Car Need?
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          From basic fluid checks to high-precision engineering tune-ups, find the exact solution tailored to your vehicle segment.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockServices.map((service) => {
          // Dynamically lookup the Lucide icon from its name in the mockData
          const LucideIcon = (Icons as any)[service.iconName] || Icons.Wrench;

          return (
            <div 
              key={service.id} 
              className="glass p-6 md:p-8 rounded-2xl border border-divider hover:border-brand-primary/30 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:shadow-black/50"
            >
              <div>
                {/* Card Header Icon & Price */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#1e1e26] border border-divider rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <LucideIcon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Starting Price</p>
                    <p className="text-lg font-black text-white group-hover:text-brand-primary transition-colors">
                      ₹{service.startingPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Service Details */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-white transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Service Specs */}
                <div className="flex gap-4 border-t border-divider pt-4 mb-6 text-xs text-gray-400">
                  <div>
                    <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px] mb-1">Time</span>
                    <span className="font-semibold text-white">{service.estimatedTime}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-divider" />
                  <div>
                    <span className="block text-gray-500 font-bold uppercase tracking-wider text-[9px] mb-1">Warranty</span>
                    <span className="font-semibold text-white">10000 km / 6 Months</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-2">
                <Link
                  href={`/services#${service.id}`}
                  className="flex-grow flex items-center justify-center gap-1.5 bg-[#1e1e26] hover:bg-[#272732] border border-divider text-gray-300 hover:text-white font-semibold py-3 px-4 rounded-lg text-xs transition"
                >
                  View Details
                </Link>
                <Link
                  href="/book"
                  className="flex items-center justify-center p-3 bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary hover:text-white rounded-lg text-brand-primary transition"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
