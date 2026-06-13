"use client";

import React, { useState } from "react";
import { mockCoupons } from "@/data/mocData";
import { Star, ArrowLeft, ArrowRight, Copy, Check, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mockReviews = [
  {
    id: 1,
    name: "Aman Malhotra",
    car: "Honda City (Petrol)",
    rating: 5,
    date: "June 2, 2026",
    comment: "Excellent service! They picked up my Honda City in the morning and returned it by 4 PM. Prices are 35% lower than the dealer, and the billing is fully transparent. Highly recommended!"
  },
  {
    id: 2,
    name: "Priyanka Sen",
    car: "Hyundai Creta (Diesel)",
    rating: 5,
    date: "May 28, 2026",
    comment: "Had my Creta's AC serviced here. The cooling is back to showroom quality. The mechanics explained the issues patiently before doing any repairs. Exceptional experience."
  },
  {
    id: 3,
    name: "Rohan D'Souza",
    car: "BMW 3 Series (Luxury)",
    rating: 5,
    date: "May 15, 2026",
    comment: "Was skeptical about giving my 3 Series outside of authorized BMW garages, but their diagnostic tools and genuine parts usage are top-notch. Truly dealer-grade work at great rates."
  }
];

export default function TestimonialsAndOffers() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % mockReviews.length);
  };

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + mockReviews.length) % mockReviews.length);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const currentReview = mockReviews[reviewIndex];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      
      {/* Left Column: Testimonials Slider (Lg size: 7 cols) */}
      <div className="lg:col-span-7 space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Loved By 2,500+ Car Owners
          </h2>
        </div>

        {/* Testimonials Slider Box */}
        <div className="glass p-8 md:p-10 rounded-2xl relative min-h-[300px] flex flex-col justify-between overflow-hidden">
          {/* Decorative Quote Icon */}
          <div className="absolute right-6 top-6 text-brand-primary/5">
            <Quote className="w-32 h-32 stroke-[3]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 relative z-10"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 stroke-yellow-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                "{currentReview.comment}"
              </p>

              {/* Reviewer Details */}
              <div className="border-t border-divider pt-6 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-white text-base md:text-lg">
                    {currentReview.name}
                  </h4>
                  <p className="text-xs text-brand-primary font-semibold">
                    {currentReview.car}
                  </p>
                </div>
                <span className="text-xs text-gray-500 font-semibold">{currentReview.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider navigation controls */}
          <div className="flex justify-end gap-3 mt-8 relative z-10">
            <button 
              onClick={prevReview}
              className="p-3 bg-[#1e1e26] hover:bg-brand-primary hover:text-white rounded-xl border border-divider text-gray-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextReview}
              className="p-3 bg-[#1e1e26] hover:bg-brand-primary hover:text-white rounded-xl border border-divider text-gray-400 transition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Latest Offers Grid (Lg size: 5 cols) */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-bold text-accent-blue uppercase tracking-widest bg-accent-blue/10 px-3 py-1 rounded-full">
            Exclusive Benefits
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Latest Active Offers
          </h2>
        </div>

        {/* Offers Cards */}
        <div className="space-y-6">
          {mockCoupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div 
                key={coupon.code}
                className="glass p-6 rounded-2xl border border-divider flex items-center justify-between gap-6 hover:border-accent-blue/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-white">
                      {coupon.discountPercentage === 100 ? "FREE" : `${coupon.discountPercentage}% OFF`}
                    </span>
                    <span className="text-[10px] bg-accent-blue/10 text-accent-blue font-bold px-2 py-0.5 rounded border border-accent-blue/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[280px]">
                    {coupon.description}
                  </p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    Expires: {coupon.expiryDate}
                  </p>
                </div>

                {/* Copy Code Button */}
                <button
                  onClick={() => copyToClipboard(coupon.code)}
                  className={`px-4 py-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all duration-300 shrink-0 relative z-10 ${
                    isCopied
                      ? "bg-green-600/20 border-green-500 text-green-400"
                      : "bg-[#1e1e26] hover:bg-[#272733] border-divider text-gray-300 hover:text-white"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      {coupon.code}
                    </>
                  )}
                </button>

                {/* Accent lighting decor */}
                <div className="absolute right-[-20%] bottom-[-20%] w-24 h-24 rounded-full bg-accent-blue/5 blur-xl group-hover:bg-accent-blue/10 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
