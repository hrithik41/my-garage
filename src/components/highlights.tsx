"use client";

import React from "react";
import { Shield, Sparkles, Truck, CalendarCheck, Layers } from "lucide-react";

export default function Highlights() {
  const highlights = [
    { icon: Shield, title: "Certified Technicians", desc: "Expert Hands" },
    { icon: Sparkles, title: "Genuine Parts", desc: "100% OEM/OES" },
    { icon: Truck, title: "Pick & Drop Service", desc: "Contactless & Free" },
    { icon: CalendarCheck, title: "Same-Day Delivery", desc: "Standard Repairs" },
    { icon: Layers, title: "Multi-Brand Support", desc: "All Makes & Models" },
  ];

  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass bg-secondary/90 border border-divider rounded-2xl p-6 shadow-xl shadow-black/40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 lg:divide-x divide-divider">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`flex items-center gap-4 py-3 lg:py-0 lg:px-6 transition-all duration-300 hover:translate-y-[-2px] ${
                  index >= 2 ? "pt-4 md:pt-0" : ""
                }`}
              >
                <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
