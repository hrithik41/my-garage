"use client";

import React, { useState } from "react";
import { useApp } from "@/context/appContext";
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Wrench, 
  Truck, 
  ShieldAlert, 
  CheckCircle,
  FileText,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CustomerPortal() {
  const { bookings, user, updateBookingStatus } = useApp();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  // Filter bookings for the simulated customer (using "hrithik@example.com")
  const customerBookings = bookings.filter(b => b.email === user.email);

  const activeBookings = customerBookings.filter(
    b => b.status !== "Completed" && b.status !== "Delivered"
  );
  const historyBookings = customerBookings.filter(
    b => b.status === "Completed" || b.status === "Delivered"
  );

  const steps: { label: string; icon: any }[] = [
    { label: "Booked", icon: FileText },
    { label: "Under Inspection", icon: ShieldAlert },
    { label: "In Progress", icon: Wrench },
    { label: "Completed", icon: CheckCircle },
    { label: "Delivered", icon: Truck },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Booked": return 0;
      case "Vehicle Received": return 1; // Map Received/Under Inspection together
      case "Under Inspection": return 1;
      case "In Progress": return 2;
      case "Completed": return 3;
      case "Delivered": return 4;
      default: return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked": return "bg-blue-500/10 text-blue-500 border border-blue-500/20";
      case "Vehicle Received":
      case "Under Inspection": return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "In Progress": return "bg-brand-primary/10 text-brand-primary border border-brand-primary/20";
      case "Completed": return "bg-green-500/10 text-green-500 border border-green-500/20";
      case "Delivered": return "bg-purple-500/10 text-purple-500 border border-purple-500/20";
      default: return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* 1. CUSTOMER PROFILE & MEMBERSHIP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Detail Card */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary shrink-0 shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-foreground">{user.name}</h2>
            <p className="text-xs text-gray-400 font-semibold">{user.email} | {user.phone}</p>
            <span className="inline-block text-[10px] tracking-wider uppercase font-extrabold text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">
              Verified Account
            </span>
          </div>
        </div>

        {/* Loyalty Points Card */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-300" />
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loyalty Balance</p>
            <h3 className="text-2xl font-black text-foreground">{user.loyaltyPoints} Points</h3>
            <p className="text-[10px] text-green-500 font-bold">5% cashback active on new bookings</p>
          </div>
        </div>

        {/* Membership Level Card */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center text-purple-500 shrink-0 shadow-inner">
            <CreditCard className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Membership Level</p>
            <h3 className="text-2xl font-black text-foreground">{user.membershipLevel} Tier</h3>
            <p className="text-[10px] text-gray-500">Free towing & diagnostics included</p>
          </div>
        </div>

      </div>

      {/* 2. TABBED TRACKING INTERFACE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-divider pb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 px-1 text-sm font-bold border-b-2 transition-colors cursor-pointer relative ${
                activeTab === "active"
                  ? "text-brand-primary border-brand-primary"
                  : "text-gray-400 border-transparent hover:text-foreground"
              }`}
            >
              Active Services ({activeBookings.length})
              {activeBookings.length > 0 && (
                <span className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-brand-primary rounded-full animate-ping" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-4 px-1 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === "history"
                  ? "text-brand-primary border-brand-primary"
                  : "text-gray-400 border-transparent hover:text-foreground"
              }`}
            >
              Service History ({historyBookings.length})
            </button>
          </div>

          <Link
            href="/book"
            className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-brand-primary/10"
          >
            + New Appointment
          </Link>
        </div>

        {/* LISTINGS CONTAINER */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "active" ? (
              <motion.div
                key="active-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {activeBookings.length === 0 ? (
                  <div className="text-center py-16 glass border border-card-border rounded-2xl bg-card-bg/25">
                    <p className="text-gray-400 font-semibold mb-4">No active service appointments found.</p>
                    <Link
                      href="/book"
                      className="inline-block bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary hover:text-white text-brand-primary text-xs font-bold px-6 py-3 rounded-xl transition"
                    >
                      Book Your Car Service
                    </Link>
                  </div>
                ) : (
                  activeBookings.map((booking) => {
                    const currentStepIndex = getStepIndex(booking.status);
                    const isExpanded = expandedBooking === booking.id;

                    return (
                      <div
                        key={booking.id}
                        className="glass border border-card-border rounded-2xl bg-card-bg/40 overflow-hidden shadow-lg hover:border-card-border-hover transition-colors duration-300"
                      >
                        {/* Booking Header bar */}
                        <div 
                          onClick={() => toggleExpand(booking.id)}
                          className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-[#1a1a24]/30 transition"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-black text-foreground">
                                {booking.brand} {booking.model}
                              </h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                {booking.timeSlot}
                              </span>
                              <span className="text-brand-primary font-bold">
                                {booking.serviceType}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-divider pt-3 md:border-0 md:pt-0">
                            <div className="text-left md:text-right">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Estimated Cost</p>
                              <p className="text-lg font-black text-foreground">₹{booking.cost.toLocaleString()}</p>
                            </div>
                            <button className="p-1.5 rounded-lg bg-[#1c1c26] text-gray-400 hover:text-white border border-divider transition">
                              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Stepper and Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden border-t border-divider bg-[#09090d]/50"
                            >
                              <div className="p-6 space-y-8">
                                {/* STEPPER BAR */}
                                <div className="relative pt-4 pb-8">
                                  {/* Line behind steps */}
                                  <div className="absolute top-[28px] left-[5%] right-[5%] h-[3px] bg-divider rounded" />
                                  <div 
                                    className="absolute top-[28px] left-[5%] h-[3px] bg-brand-primary rounded transition-all duration-500" 
                                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 90}%` }}
                                  />

                                  {/* Steps circles */}
                                  <div className="flex justify-between relative">
                                    {steps.map((s, index) => {
                                      const Icon = s.icon;
                                      const isCompleted = index < currentStepIndex;
                                      const isActive = index === currentStepIndex;
                                      
                                      return (
                                        <div key={s.label} className="flex flex-col items-center w-[18%] text-center">
                                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                                            isCompleted 
                                              ? "bg-brand-primary border-brand-primary text-white" 
                                              : isActive
                                                ? "bg-background border-brand-primary text-brand-primary shadow-lg ring-4 ring-brand-primary/10"
                                                : "bg-background border-card-border text-gray-500"
                                          }`}>
                                            <Icon className="w-4 h-4" />
                                          </div>
                                          <span className={`mt-2.5 text-[10px] font-bold tracking-tight max-w-[80px] line-clamp-2 uppercase ${
                                            isActive ? "text-brand-primary" : isCompleted ? "text-foreground" : "text-gray-500"
                                          }`}>
                                            {s.label}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* DETAILS BLOCK */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-t border-divider pt-6">
                                  <div className="space-y-3">
                                    <h5 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Service & Vehicle Info</h5>
                                    <p className="text-gray-400"><strong className="text-foreground">License Plate:</strong> {booking.vehicleNumber}</p>
                                    <p className="text-gray-400"><strong className="text-foreground">Fuel Configuration:</strong> {booking.fuelType}</p>
                                    <p className="text-gray-400"><strong className="text-foreground">Service Notes:</strong> {booking.notes || "None listed."}</p>
                                  </div>
                                  <div className="space-y-3">
                                    <h5 className="font-bold text-foreground uppercase tracking-wider text-[10px]">Logistics & Location</h5>
                                    <p className="text-gray-400">
                                      <strong className="text-foreground">Pickup Status: </strong>
                                      {booking.pickupRequired ? (
                                        <span className="text-accent-blue font-bold">Required (Complimentary)</span>
                                      ) : (
                                        "Self Drop-off"
                                      )}
                                    </p>
                                    {booking.pickupRequired && (
                                      <p className="text-gray-400 flex items-start gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                                        <span>{booking.address}</span>
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Booking action buttons */}
                                {booking.status === "Booked" && (
                                  <div className="flex justify-end pt-4 border-t border-divider">
                                    <button
                                      onClick={() => {
                                        if(confirm("Are you sure you want to cancel this service appointment?")) {
                                          updateBookingStatus(booking.id, "Completed"); // Set to Completed/Cancelled mockup state
                                        }
                                      }}
                                      className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer text-xs"
                                    >
                                      Cancel Booking
                                    </button>
                                  </div>
                                )}

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </motion.div>
            ) : (
              <motion.div
                key="history-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {historyBookings.length === 0 ? (
                  <div className="text-center py-16 glass border border-card-border rounded-2xl bg-card-bg/25">
                    <p className="text-gray-400 font-semibold">No past service visits on record.</p>
                  </div>
                ) : (
                  historyBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="glass border border-card-border p-5 rounded-2xl bg-card-bg/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-foreground">
                            {booking.brand} {booking.model}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 border border-green-500/20">
                            Service Completed
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                          <span>{booking.serviceType}</span>
                          <span>•</span>
                          <span>Completed on {booking.date}</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right border-t border-divider sm:border-none pt-3 sm:pt-0 w-full sm:w-auto">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Paid</p>
                        <p className="text-base font-black text-foreground">₹{booking.cost.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
