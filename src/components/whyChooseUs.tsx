"use client";

import React from "react";
import { Award, Users, CheckCircle, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const stats = [
    { 
      icon: Award, 
      value: "8+", 
      label: "Years of Experience", 
      desc: "Delivering expert vehicle care since 2018." 
    },
    { 
      icon: Users, 
      value: "25,000+", 
      label: "Cars Serviced", 
      desc: "Trusted by hatchback, sedan, and premium SUV owners." 
    },
    { 
      icon: CheckCircle, 
      value: "99.4%", 
      label: "Satisfaction Rate", 
      desc: "Based on direct customer reviews & post-service calls." 
    },
    { 
      icon: ShieldCheck, 
      value: "100%", 
      label: "Service Warranty", 
      desc: "Genuine OEM parts and network labor backing." 
    },
  ];

  const brands = [
    "Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Honda", 
    "Toyota", "Kia", "Volkswagen", "Skoda", "BMW", "Mercedes-Benz"
  ];

  return (
    <section className="py-24 bg-[#09090c] border-y border-divider overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
            Our Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Why Car Owners Choose Us
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            We offer workshop services matching authorized dealer qualities at up to 40% more affordable costs, complete with warranties on all repairs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="glass p-6 md:p-8 rounded-2xl border border-divider hover:border-brand-primary/20 transition-all duration-300 group hover:translate-y-[-4px]"
              >
                <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary w-fit mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-gray-200 tracking-wide uppercase mb-3">
                  {stat.label}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Brands We Service Ticker */}
        <div className="border-t border-divider pt-12">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
            Supported Multi-Brand Vehicles
          </p>
          
          {/* Scrolling Ticker Wrap */}
          <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#09090c] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#09090c] after:to-transparent">
            
            {/* Horizontal Flex Scroll (Custom Loop) */}
            <div className="flex gap-12 w-max animate-[scroll_40s_linear_infinite] whitespace-nowrap hover:[animation-play-state:paused]">
              {/* Render items twice to build a seamless loop */}
              {[...brands, ...brands].map((brand, i) => (
                <div 
                  key={i} 
                  className="text-base md:text-lg font-extrabold tracking-wider text-gray-400 hover:text-white transition-colors duration-300 select-none bg-[#16161e] border border-divider py-3 px-6 rounded-xl inline-block"
                >
                  {brand}
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
