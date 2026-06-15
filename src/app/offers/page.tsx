"use client";

import React, { useState } from "react";
import { mockCoupons } from "@/data/mocData";
import { Copy, Check, Tag, Calendar, Gift, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const bundles = [
    {
      title: "Monsoon Readiness Combo",
      price: 3499,
      savings: "Save 30%",
      description: "Prepare your car for heavy downpours with complete visibility and wheel checkups.",
      inclusions: ["Rain-X Windshield Treatment", "Complete Wiper Blade Replacement", "40-Point Brake & Wheel Check", "Underbody Water Wash"],
      link: "/book?service=Periodic%20Maintenance"
    },
    {
      title: "Showroom Detailer's Pack",
      price: 5999,
      savings: "Save 25%",
      description: "Bring back the factory finish glow with our premium polishing and interior detailing.",
      inclusions: ["3-Step Machine Wax & Polish", "Full Interior Deep Carpet Vacuum", "Leather Conditioner & Dash Polish", "Engine Bay Detailing"],
      link: "/book?service=General%20Service"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Exclusive <span className="text-brand-primary">Coupons & Bundles</span>
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Save big on premium car care. Copy active coupon codes directly or book pre-packaged value bundles.
        </p>
      </div>

      {/* 1. COUPON GRID */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2 border-b border-divider pb-4">
          <Tag className="w-6 h-6 text-brand-primary" />
          Active Discount Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCoupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <motion.div
                key={coupon.code}
                whileHover={{ y: -4 }}
                className="glass border border-card-border rounded-2xl bg-card-bg/40 p-6 flex flex-col justify-between relative overflow-hidden shadow-lg"
              >
                {/* Visual Accent ticket cutout */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-r border-card-border rounded-full" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-l border-card-border rounded-full" />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl text-xs font-bold flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      {coupon.discountPercentage}% OFF
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{coupon.code}</h3>
                    <p className="text-xs text-gray-400 font-medium">{coupon.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-divider flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    Expires {coupon.expiryDate}
                  </div>

                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className={`flex items-center gap-1 font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0 border ${
                      isCopied
                        ? "bg-green-500/10 border-green-500/20 text-green-500"
                        : "bg-[#1d1d26] border-divider text-gray-300 hover:text-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. VALUE BUNDLES SECTION */}
      <div className="space-y-8 pt-8 border-t border-divider">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          Popular Value Service Bundles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map((bundle, index) => (
            <div
              key={index}
              className="glass border border-card-border rounded-2xl bg-card-bg/40 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-brand-primary/30 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black text-foreground leading-tight max-w-[70%]">{bundle.title}</h3>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1 rounded-full">
                    {bundle.savings}
                  </span>
                </div>

                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {bundle.description}
                </p>

                {/* Bundle Inclusions */}
                <div className="space-y-2 text-xs font-semibold text-gray-300 border-t border-divider pt-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Combo Package Details:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {bundle.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price / CTA */}
              <div className="mt-8 pt-4 border-t border-divider flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">All-Inclusive Price</p>
                  <p className="text-2xl font-black text-foreground">₹{bundle.price.toLocaleString()}</p>
                </div>

                <Link
                  href={bundle.link}
                  className="inline-flex items-center gap-1.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md shadow-brand-primary/10 hover:shadow-lg"
                >
                  Book Bundle
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
