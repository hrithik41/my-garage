"use client";

import React from "react";
import { Calendar, Phone, MessageSquare, Star, Shield, Award, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919876543210?text=Hi! I want to book a service for my car.", "_blank");
  };

  // Framer Motion Animation Variants
    // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring" as const, stiffness: 80, damping: 18 } 
    }
  };


  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 md:py-24 md:px-8 bg-[#09090c]">
      
      {/* Background Video with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-50"
          poster="https://images.unsplash.com/photo-1617886903355-9354bb57751f?q=80&w=1920&auto=format&fit=crop"
        >
          <source 
            src="https://static.videezy.com/system/resources/previews/000/052/064/original/Cleaning_and_Washing_the_Car_Engine_in_Service.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0d0d11]" />
      </div>

      {/* Decorative Radial Light Beam */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-primary opacity-[0.08] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-blue opacity-[0.05] blur-[120px] pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        
        {/* Left Side: Headline & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
          
          {/* Trust Badge */}
          <motion.div 
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 bg-[#22222a] border border-[rgba(255,255,255,0.08)] py-1.5 px-3 rounded-full text-xs font-semibold tracking-wider text-brand-primary uppercase"
          >
            <Shield className="w-3.5 h-3.5" />
            100% Certified Mechanics & Genuine Parts
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
          >
            Trusted Car Service & <br className="hidden md:inline" />
            <span className="text-brand-primary glow-text-orange font-black">
              Repair Experts
            </span>
          </motion.h1>

          {/* Short Subtitle */}
          <motion.p 
            variants={fadeUpVariants}
            className="text-gray-400 text-sm md:text-lg max-w-xl font-medium leading-relaxed"
          >
            Get dealer-grade servicing at up to 40% lower costs. Free pickup & drop, warranty-protected repair, and 100% transparent pricing for all multi-brand cars.
          </motion.p>

          {/* Ratings Displays */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center gap-4 py-2"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 stroke-yellow-500" />
              ))}
            </div>
            <div className="text-xs md:text-sm text-gray-300 font-medium">
              <span className="font-bold text-white text-base">4.9/5</span> Google Rating (2,500+ Reviews)
            </div>
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div 
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/book"
              className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:shadow-[rgba(249,87,56,0.2)] transition-all duration-300 transform active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              Book Service
            </Link>
            
            <button 
              onClick={handleCall}
              className="flex items-center justify-center gap-2 bg-[#22222a] hover:bg-[#2e2e38] text-white border border-[rgba(255,255,255,0.1)] hover:border-gray-500 font-bold py-4 px-6 rounded-lg transition-all duration-300 transform active:scale-95"
            >
              <Phone className="w-5 h-5 text-gray-400" />
              Call Now
            </button>

            <button 
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp Us
            </button>
          </motion.div>
        </div>

        {/* Right Side: Floating High-Tech Feature Card (Desktop only) */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-5 hidden lg:block relative"
        >
          <div className="glass p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-primary/10 blur-2xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-white tracking-wide border-b border-divider pb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-brand-primary" />
              Workshop Highlights
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Full Warranty Protection</h4>
                  <p className="text-xs text-gray-400">100% network warranty on all replacement parts and labor.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mt-1">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">25,000+ Cars Restored</h4>
                  <p className="text-xs text-gray-400">Serving Mumbai's premium and economy class vehicles since 2018.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 mt-1">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">24/7 Breakdown Help</h4>
                  <p className="text-xs text-gray-400">Locked out or stuck on a highway? We are one click away.</p>
                </div>
              </div>
            </div>

            {/* Quick Live Stats Indicator */}
            <div className="bg-[#0d0d11]/80 border border-divider p-4 rounded-xl flex items-center justify-around text-center">
              <div>
                <p className="text-xl font-extrabold text-brand-primary">45+</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Technicians</p>
              </div>
              <div className="h-8 w-[1px] bg-divider" />
              <div>
                <p className="text-xl font-extrabold text-white">100%</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Genuine OEM</p>
              </div>
              <div className="h-8 w-[1px] bg-divider" />
              <div>
                <p className="text-xl font-extrabold text-accent-blue">Same-Day</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Delivery</p>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
