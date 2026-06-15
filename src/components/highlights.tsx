"use client";

import React from "react";
import { Shield, Sparkles, Truck, CalendarCheck, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Highlights() {
  const highlights = [
    { 
      icon: Shield, 
      title: "Certified Technicians", 
      desc: "Manufacturer trained and certified mechanics." 
    },
    { 
      icon: Sparkles, 
      title: "Genuine Parts", 
      desc: "100% official OEM/OES spares with warranty." 
    },
    { 
      icon: Truck, 
      title: "Pick & Drop Service", 
      desc: "Complimentary pickup & drop at your doorstep." 
    },
    { 
      icon: CalendarCheck, 
      title: "Same-Day Delivery", 
      desc: "Standard maintenance completed on the same day." 
    },
    { 
      icon: Layers, 
      title: "Multi-Brand Support", 
      desc: "Diagnostics and servicing for all makes & models." 
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } as const;

  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass bg-card-bg/95 border border-card-border rounded-2xl p-6 shadow-xl shadow-black/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 lg:divide-x divide-divider">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`flex items-start gap-4 py-3 lg:py-0 lg:px-4 transition-colors duration-300 ${
                  index > 0 ? "pt-6 md:pt-3 lg:pt-0" : ""
                }`}
              >
                <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary shadow-sm shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-sm md:text-base tracking-wide leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
