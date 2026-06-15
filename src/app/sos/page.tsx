"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  MapPin, 
  Phone, 
  Navigation, 
  Truck, 
  Clock, 
  User, 
  Check, 
  Compass, 
  AlertTriangle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SosPage() {
  const [step, setStep] = useState<"form" | "tracking">("form");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState("");
  
  const [formData, setFormData] = useState({
    issueType: "Flat Tire / Blowout",
    vehicleNumber: "",
    phone: "",
    notes: ""
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setAddress(`Latitude: ${position.coords.latitude.toFixed(5)}, Longitude: ${position.coords.longitude.toFixed(5)}`);
        setGpsLoading(false);
      },
      (error) => {
        console.error(error);
        // Fallback simulation
        setTimeout(() => {
          setLocation({ lat: 19.0760, lng: 72.8777 }); // Mumbai Center Coordinates
          setAddress("Mumbai High Road, Intersection NH4, Mumbai");
          setGpsLoading(false);
        }, 1200);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.vehicleNumber.trim() || !formData.phone.trim()) {
      alert("Please provide vehicle number and mobile number.");
      return;
    }
    setStep("tracking");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
          Emergency Breakdown SOS
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Instant vehicle recovery dispatch. Our nearest mobile technician team is on stand-by.
        </p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SUBMISSION FORM */}
        {step === "form" && (
          <motion.div
            key="sos-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass p-8 rounded-2xl border border-red-500/20 bg-card-bg/50 space-y-6"
          >
            <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-xs font-bold text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>
                WARNING: SOS submissions trigger priority dispatch sequences. Please utilize only in active road emergencies.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Issue Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Type of Emergency</label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-red-500/50 transition cursor-pointer"
                  >
                    <option value="Flat Tire / Blowout">Flat Tire / Blowout</option>
                    <option value="Dead Battery / Jumpstart">Dead Battery / Jumpstart</option>
                    <option value="Engine Overheating / Smoking">Engine Overheating / Smoking</option>
                    <option value="Towing Required (Accident / Crash)">Towing Required (Accident / Crash)</option>
                    <option value="Key Locked Inside Car">Key Locked Inside Car</option>
                  </select>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Emergency Contact Mobile</label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vehicle Plate */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Vehicle Registration Number</label>
                  <input
                    type="text"
                    placeholder="E.g. MH12RS9988"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-red-500/50 uppercase tracking-wider transition"
                    required
                  />
                </div>

                {/* Geolocation Button */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">GPS Coordinates</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coordinates not acquired"
                      value={address}
                      readOnly
                      className="flex-grow bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-xs font-semibold outline-none cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={gpsLoading}
                      className="bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-500 font-bold px-4 py-3.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 shrink-0 flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      {gpsLoading ? "Acquiring..." : "Locate Me"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Describe Current Situation</label>
                <textarea
                  rows={3}
                  placeholder="Give any milestones or description of location (e.g. Near Shell fuel station)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-red-500/50 transition"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg transition cursor-pointer text-sm tracking-wider uppercase border border-red-500/30"
              >
                Send Assistance Request
              </button>

            </form>
          </motion.div>
        )}

        {/* STEP 2: DISPATCH TRACKING RADAR SCREEN */}
        {step === "tracking" && (
          <motion.div
            key="sos-tracking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass p-8 rounded-2xl border border-red-500/20 bg-card-bg/60 space-y-8 text-center"
          >
            
            {/* RADAR EFFECT CONTAINER */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              
              {/* Spinning Radar Line */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-red-500/10"
                style={{
                  background: "conic-gradient(from 0deg, rgba(239, 68, 68, 0.15) 0deg, transparent 90deg)"
                }}
              />

              {/* Pulsing Target Dot */}
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-4 h-4 bg-red-500 rounded-full z-10 border-2 border-white shadow-lg"
              />

              <div className="absolute w-28 h-28 rounded-full border border-red-500/20" />
              <div className="absolute w-16 h-16 rounded-full border border-red-500/30 border-dashed animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Towing Truck En Route</h3>
              <p className="text-xs text-gray-400">Assistance request approved. Dispatch coordinates locked.</p>
            </div>

            {/* DRIVER INFO CARD */}
            <div className="p-4 bg-background/50 border border-card-border rounded-xl text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <p className="text-gray-400 flex items-center gap-1.5 font-semibold">
                  <User className="w-4 h-4 text-brand-primary" />
                  <strong>Technician:</strong> Rohan Sharma
                </p>
                <p className="text-gray-400 flex items-center gap-1.5 font-semibold">
                  <Truck className="w-4 h-4 text-accent-blue" />
                  <strong>Vehicle:</strong> Tata Xenon Tow (MH02-FF-2211)
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 flex items-center gap-1.5 font-semibold">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <strong>Estimated Arrival:</strong> 12 Mins
                </p>
                <p className="text-gray-400 flex items-center gap-1.5 font-semibold">
                  <Compass className="w-4 h-4 text-green-500" />
                  <strong>Distance:</strong> 2.4 Kms away
                </p>
              </div>
            </div>

            {/* PROGRESS TICKER */}
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 border-t border-divider pt-6">
              <span className="text-green-500 flex items-center gap-0.5">
                <Check className="w-3.5 h-3.5" /> Request Lock
              </span>
              <span className="text-green-500 flex items-center gap-0.5">
                <Check className="w-3.5 h-3.5" /> Dispatched
              </span>
              <span className="text-red-500 animate-pulse">En Route</span>
              <span>Arrived</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep("form")}
                className="w-1/2 bg-[#1e1e26] hover:bg-[#282834] border border-card-border text-gray-300 font-bold py-3.5 rounded-xl text-xs transition cursor-pointer"
              >
                Go Back
              </button>
              <a
                href="tel:1800998877"
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-md"
              >
                <Phone className="w-4 h-4" />
                Call Helpline
              </a>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
