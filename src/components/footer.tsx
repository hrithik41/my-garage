"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, Clock, MessageCircle, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090c] border-t border-divider mt-auto pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand details */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Hrithik's<span className="text-brand-primary">Garage</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Premium multi-brand automotive workshop. Providing dealer-level diagnostics, repairs, and customization with transparent quoting and free pickup/drop.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/70 bg-[#16161e] border border-divider p-2 rounded-lg w-fit">
            <Shield className="w-4 h-4 text-brand-primary" />
            <span>100% OEM Genuine Spares</span>
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-sm">Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services#general-service" className="hover:text-brand-primary transition">General Inspection</Link></li>
            <li><Link href="/services#periodic-maintenance" className="hover:text-brand-primary transition">Periodic Tune-up</Link></li>
            <li><Link href="/services#brake-service" className="hover:text-brand-primary transition">Brakes Restoration</Link></li>
            <li><Link href="/services#wheel-alignment" className="hover:text-brand-primary transition">3D Alignment & Balances</Link></li>
            <li><Link href="/services#ac-repair" className="hover:text-brand-primary transition">AC Recharging</Link></li>
          </ul>
        </div>

        {/* Company options */}
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-sm">Customer Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/portal" className="hover:text-brand-primary transition">Track Vehicle Status</Link></li>
            <li><Link href="/quote" className="hover:text-brand-primary transition">Instant Price Estimator</Link></li>
            <li><Link href="/offers" className="hover:text-brand-primary transition">Coupons & Schemes</Link></li>
            <li><Link href="/sos" className="hover:text-brand-primary transition">SOS Towing Helpline</Link></li>
          </ul>
        </div>

        {/* Contact information */}
        <div className="space-y-4">
          <h4 className="text-white font-bold tracking-wide uppercase text-sm">Workshop Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
              <span>Link Road, Andheri West, Near Metro Station, Mumbai, MH 400053</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-primary shrink-0" />
              <Link href="tel:+919876543210" className="hover:text-white transition">+91 98765 43210</Link>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <Link href="mailto:info@hrithiksgarage.com" className="hover:text-white transition">info@hrithiksgarage.com</Link>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-brand-primary shrink-0" />
              <span>Mon - Sun: 8:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-divider pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs">
          &copy; {currentYear} Hrithik's Garage. All rights reserved. Designed for elite vehicle care.
        </p>
        <div className="flex gap-6 text-xs">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
