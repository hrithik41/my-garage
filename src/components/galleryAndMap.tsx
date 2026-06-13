"use client";

import React, { useState, useRef } from "react";
import { Sparkles, MapPin, Navigation, Compass } from "lucide-react";

export default function GalleryAndMap() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      
      {/* Left Column: Interactive Before/After (Lg: 6 cols) */}
      <div className="lg:col-span-6 space-y-8">
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">
            Before & After
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            See the Magic of Detailing
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Drag the divider slider left and right to see the deep restoration of paint coatings, wheel grime clearance, and dent removal.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-divider select-none cursor-ew-resize"
        >
          {/* After Image (Background) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=1000&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute right-4 bottom-4 bg-[#0d0d11]/80 border border-divider px-3 py-1.5 rounded-lg text-xs font-black tracking-widest text-accent-blue uppercase z-10">
            After
          </div>

          {/* Before Image (Foreground overlay with clipping) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop')`,
              width: `${sliderPosition}%`,
            }}
          />
          <div className="absolute left-4 bottom-4 bg-[#0d0d11]/80 border border-divider px-3 py-1.5 rounded-lg text-xs font-black tracking-widest text-brand-primary uppercase z-10">
            Before
          </div>

          {/* Slider line bar splitter */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Draggable central handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-divider shadow-xl flex items-center justify-center text-secondary">
              <Compass className="w-4 h-4 animate-spin-slow text-brand-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Google Maps & Directions (Lg: 6 cols) */}
      <div className="lg:col-span-6 space-y-8">
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-xs font-bold text-accent-blue uppercase tracking-widest bg-accent-blue/10 px-3 py-1 rounded-full">
            Workshop Location
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Visit Us in Andheri West
          </h2>
        </div>

        {/* Map Box */}
        <div className="glass p-4 rounded-2xl border border-divider shadow-2xl relative overflow-hidden space-y-4">
          <div className="w-full h-[250px] rounded-xl overflow-hidden relative">
            {/* Styled Google Maps Iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.7562093201464!2d72.82737637583626!3d19.118335050720448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e15b36bb03%3A0xe54d3bb9cb7d3129!2sLink%20Rd%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717882902345!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(40%)" }} 
              allowFullScreen={false} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick directions text */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white text-sm">Hrithik's Garage Main Branch</h4>
                <p className="text-xs text-gray-400">Link Road, Near Metro Pillar 124, Andheri West</p>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#1e1e26] hover:bg-brand-primary hover:text-white border border-divider text-gray-300 font-bold px-4 py-2.5 rounded-lg text-xs transition-all duration-300 shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
