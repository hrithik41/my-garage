"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/appContext";
import { mockBrands, mockServices } from "@/data/mocData";
import { Calendar, User, Car, ClipboardList, Check, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addBooking } = useApp();

  // Form Steps: 1 = Contact Info, 2 = Vehicle Info, 3 = Booking Specs
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    vehicleNumber: "",
    brand: mockBrands[0].name,
    model: mockBrands[0].models[0],
    fuelType: "Petrol",
    serviceType: mockServices[0].name,
    date: "",
    timeSlot: "10:00 AM - 12:00 PM",
    pickupRequired: false,
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{ id: string; cost: number } | null>(null);

  // 1. Read parameters passed from services/quotes pages
  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const modelParam = searchParams.get("model");
    const serviceParam = searchParams.get("service");

    if (brandParam || modelParam || serviceParam) {
      setFormData(prev => {
        const matchedService = mockServices.find(s => s.id === serviceParam || s.name === serviceParam);
        
        return {
          ...prev,
          brand: brandParam || prev.brand,
          model: modelParam || prev.model,
          serviceType: matchedService ? matchedService.name : prev.serviceType,
        };
      });
      // Skip directly to step 2 if they arrived pre-selected
      setStep(2);
    }
  }, [searchParams]);

  // Update models list when brand changes
  const activeBrandData = mockBrands.find(b => b.name === formData.brand) || mockBrands[0];
  
  useEffect(() => {
    if (activeBrandData && !searchParams.get("model")) {
      setFormData(prev => ({ ...prev, model: activeBrandData.models[0] }));
    }
  }, [formData.brand]);

  // 2. Validate Step inputs
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
      if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Provide a valid 10-digit number";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Provide a valid email address";
    } else if (step === 2) {
      if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = "Vehicle license plate number is required";
    } else if (step === 3) {
      if (!formData.date) newErrors.date = "Select a preferred date";
      if (formData.pickupRequired && !formData.address.trim()) newErrors.address = "Pickup address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  // 3. Mock Plate registration lookup (Vahan API simulation)
  const handlePlateLookup = () => {
    if (!formData.vehicleNumber.trim()) {
      setErrors({ vehicleNumber: "Enter plate number first (e.g. MH12RS9988)" });
      return;
    }
    
    setIsSearchingPlate(true);
    setErrors({});
    
    setTimeout(() => {
      setIsSearchingPlate(false);
      // Mock data filled based on plate matches
      setFormData(prev => ({
        ...prev,
        brand: "Hyundai",
        model: "Creta",
        fuelType: "Diesel"
      }));
    }, 1500);
  };

  // 4. Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    // Calculate simulated service cost
    const service = mockServices.find(s => s.name === formData.serviceType) || mockServices[0];
    const brand = mockBrands.find(b => b.name === formData.brand) || mockBrands[0];
    const finalCost = Math.round(service.startingPrice * brand.multiplier);

    // Add booking to AppState
    const confirmedBooking = addBooking({
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      vehicleNumber: formData.vehicleNumber,
      brand: formData.brand,
      model: formData.model,
      fuelType: formData.fuelType,
      serviceType: formData.serviceType,
      date: formData.date,
      timeSlot: formData.timeSlot,
      pickupRequired: formData.pickupRequired,
      address: formData.pickupRequired ? formData.address : undefined,
      notes: formData.notes,
      cost: finalCost,
    });

    setBookingSuccess({ id: confirmedBooking.id, cost: finalCost });
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
      
      {/* SUCCESS CONFIRMATION MODAL CARD */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass p-8 rounded-2xl border border-green-500/30 text-center space-y-6 bg-card-bg shadow-2xl relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-500">
              <Check className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground">Booking Confirmed!</h2>
              <p className="text-sm text-gray-400">
                Your appointment has been registered successfully.
              </p>
            </div>

            <div className="p-4 bg-background/60 border border-card-border rounded-xl text-left space-y-2 text-xs">
              <p className="text-foreground"><strong className="text-brand-primary">Booking ID:</strong> {bookingSuccess.id}</p>
              <p className="text-foreground"><strong className="text-brand-primary">Scheduled Date:</strong> {formData.date}</p>
              <p className="text-foreground"><strong className="text-brand-primary">Time Slot:</strong> {formData.timeSlot}</p>
              <p className="text-foreground"><strong className="text-brand-primary">Estimated cost:</strong> ₹{bookingSuccess.cost.toLocaleString()}</p>
              <p className="text-green-400 font-bold flex items-center gap-1 mt-2">
                <Sparkles className="w-3.5 h-3.5" />
                Loyalty points earned: {Math.floor(bookingSuccess.cost * 0.05)} Points!
              </p>
            </div>

            <button
              onClick={() => router.push("/portal")}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-4 rounded-xl shadow-md transition cursor-pointer"
            >
              Go to My Portal & Track Car
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORM INTERFACE */}
      {!bookingSuccess && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-foreground">Book Car Service</h1>
            <p className="text-sm text-gray-400">
              Get premium multi-brand repairs with free pickup and drop.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span className={step === 1 ? "text-brand-primary" : step > 1 ? "text-foreground" : ""}>Contact</span>
            <div className="w-8 h-[2px] bg-divider" />
            <span className={step === 2 ? "text-brand-primary" : step > 2 ? "text-foreground" : ""}>Vehicle</span>
            <div className="w-8 h-[2px] bg-divider" />
            <span className={step === 3 ? "text-brand-primary" : ""}>Schedule</span>
          </div>

          {/* Form Fields Box */}
          <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-card-border bg-card-bg/95 space-y-6">
            
            {/* STEP 1: CONTACT DETAILS */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-divider pb-3">
                  <User className="w-5 h-5 text-brand-primary" />
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                  />
                  {errors.customerName && <p className="text-xs text-red-500 font-bold">{errors.customerName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: VEHICLE DETAILS */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-divider pb-3">
                  <Car className="w-5 h-5 text-brand-primary" />
                  Vehicle Configuration
                </h3>

                {/* License Plate input with simulation Lookup API */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">License Plate Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g. MH02DZ4321"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                      className="flex-grow bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 uppercase tracking-widest transition"
                    />
                    <button
                      type="button"
                      onClick={handlePlateLookup}
                      disabled={isSearchingPlate}
                      className="bg-accent-blue/15 hover:bg-accent-blue hover:text-white border border-accent-blue/30 text-accent-blue font-bold px-4 py-3.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {isSearchingPlate ? "Searching..." : "Auto-Fetch Specs"}
                    </button>
                  </div>
                  {errors.vehicleNumber && <p className="text-xs text-red-500 font-bold">{errors.vehicleNumber}</p>}
                  <p className="text-[10px] text-gray-500">
                    * Type any plate code and click "Auto-Fetch Specs" to simulate vehicle registration data query.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Car Brand</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      {mockBrands.map(b => (
                        <option key={b.name} value={b.name} className="bg-[#16161e] text-white">{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Car Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      {activeBrandData.models.map(m => (
                        <option key={m} value={m} className="bg-[#16161e] text-white">{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      {["Petrol", "Diesel", "CNG", "Electric"].map(f => (
                        <option key={f} value={f} className="bg-[#16161e] text-white">{f}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCHEDULE & OPTIONS */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-divider pb-3">
                  <ClipboardList className="w-5 h-5 text-brand-primary" />
                  Service details & Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Selected Package</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      {mockServices.map(s => (
                        <option key={s.id} value={s.name} className="bg-[#16161e] text-white">{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Time Slot</label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      {["08:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM"].map(ts => (
                        <option key={ts} value={ts} className="bg-[#16161e] text-white">{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider font-sans">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                  />
                  {errors.date && <p className="text-xs text-red-500 font-bold">{errors.date}</p>}
                </div>

                {/* Pickup Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#16161e]/50 border border-card-border rounded-xl">
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Complimentary Pickup & Drop</h4>
                    <p className="text-[10px] text-gray-500">We will collect and deliver the vehicle free of cost.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, pickupRequired: !formData.pickupRequired })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                      formData.pickupRequired
                        ? "bg-accent-blue/15 border-accent-blue text-accent-blue"
                        : "bg-[#16161e] border-card-border text-gray-400"
                    }`}
                  >
                    {formData.pickupRequired ? "Yes (Active)" : "No"}
                  </button>
                </div>

                {/* Pickup Address Field (Conditional) */}
                {formData.pickupRequired && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Pickup Address</label>
                    <textarea
                      rows={3}
                      placeholder="Enter full address for vehicle collection"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                    />
                    {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address}</p>}
                  </motion.div>
                )}

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Additional Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="Specific requests or issues you want checked..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                  />
                </div>
              </motion.div>
            )}

            {/* Footers buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-divider gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-[#1e1e26] hover:bg-[#272733] border border-card-border text-gray-300 font-bold px-6 py-3.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold px-8 py-3.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold px-8 py-3.5 rounded-xl text-xs transition cursor-pointer shadow-md shadow-brand-primary/10 hover:shadow-lg"
                >
                  Confirm Booking
                </button>
              )}
            </div>

          </form>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-gray-500 font-medium animate-pulse">
        Loading Booking Module...
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}
