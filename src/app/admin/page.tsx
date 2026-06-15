"use client";

import React, { useState } from "react";
import { useApp } from "@/context/appContext";
import { Booking } from "@/data/mocData";
import { 
  ClipboardList, 
  CheckCircle, 
  Wrench, 
  TrendingUp, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Edit,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const { bookings, updateBookingStatus, updateBookingDate } = useApp();
  
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Reschedule Modal State
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState("10:00 AM - 12:00 PM");

  // Calculate Metrics
  const totalBookings = bookings.length;
  
  const activeRepairs = bookings.filter(
    b => b.status === "Under Inspection" || b.status === "In Progress" || b.status === "Vehicle Received"
  ).length;

  const completedServices = bookings.filter(
    b => b.status === "Completed" || b.status === "Delivered"
  ).length;

  const estimatedRevenue = bookings
    .filter(b => b.status !== "Completed" && b.status !== "Delivered")
    .reduce((sum, b) => sum + b.cost, 0);

  const realizedRevenue = bookings
    .filter(b => b.status === "Completed" || b.status === "Delivered")
    .reduce((sum, b) => sum + b.cost, 0);

  // Search & Filter Logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
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

  const handleOpenReschedule = (booking: Booking) => {
    setSelectedBooking(booking);
    setNewDate(booking.date);
    setNewTimeSlot(booking.timeSlot);
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooking && newDate) {
      updateBookingDate(selectedBooking.id, newDate, newTimeSlot);
      setSelectedBooking(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Workshop Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Manage real-time mechanic queue, update repair statuses, and reschedule slots.</p>
      </div>

      {/* METRIC CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-3xl font-black text-foreground">{totalBookings}</h3>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
            <ClipboardList className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Repairs</p>
            <h3 className="text-3xl font-black text-foreground">{activeRepairs}</h3>
          </div>
          <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl border border-brand-primary/20">
            <Wrench className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Completed Jobs</p>
            <h3 className="text-3xl font-black text-foreground">{completedServices}</h3>
          </div>
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/60 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Realized Revenue</p>
            <h3 className="text-2xl font-black text-green-500">₹{realizedRevenue.toLocaleString()}</h3>
            <p className="text-[10px] text-gray-500 font-medium">Pending: ₹{estimatedRevenue.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-divider pb-6">
        
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, name, plate number, car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input-bg border border-card-border rounded-xl text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-input-bg border border-card-border p-1.5 rounded-xl text-xs font-bold text-gray-400">
          <span className="px-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filter Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-foreground border-none outline-none focus:ring-0 cursor-pointer pr-4 font-extrabold"
          >
            <option value="All">All Jobs</option>
            <option value="Booked">Booked</option>
            <option value="Under Inspection">Under Inspection</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

      </div>

      {/* WORKSHOP QUEUE TABLE */}
      <div className="glass border border-card-border rounded-2xl bg-card-bg/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-divider bg-secondary/50 text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                <th className="py-4 px-6">ID & Customer</th>
                <th className="py-4 px-6">Vehicle Details</th>
                <th className="py-4 px-6">Selected Service</th>
                <th className="py-4 px-6">Date & Slot</th>
                <th className="py-4 px-6">Status Tracker</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider text-xs font-semibold">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No matching service bookings found in workshop queue.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-secondary/15 transition-all">
                    
                    {/* ID & Customer */}
                    <td className="py-4 px-6 space-y-1">
                      <p className="text-brand-primary font-bold text-[10px]">{b.id}</p>
                      <p className="text-foreground text-sm font-black">{b.customerName}</p>
                      <p className="text-[10px] text-gray-400">{b.phone} | {b.email}</p>
                    </td>

                    {/* Vehicle */}
                    <td className="py-4 px-6 space-y-1">
                      <p className="text-foreground font-black text-sm">{b.brand} {b.model}</p>
                      <div className="flex gap-2">
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-[#1c1c24] border border-card-border px-2 py-0.5 rounded text-foreground">
                          {b.vehicleNumber}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-gray-400">{b.fuelType}</span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-6 space-y-1">
                      <p className="text-foreground font-black text-sm">{b.serviceType}</p>
                      <p className="text-gray-400 font-bold">Est. Cost: ₹{b.cost.toLocaleString()}</p>
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-6 space-y-1 text-gray-300">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {b.date}
                      </p>
                      <p className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {b.timeSlot}
                      </p>
                    </td>

                    {/* Status dropdown selector */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md w-fit ${getStatusBadgeClass(b.status)}`}>
                          {b.status}
                        </span>
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className="bg-input-bg border border-card-border rounded-lg py-1 px-2 text-[10px] font-bold text-foreground outline-none focus:border-brand-primary/50 cursor-pointer"
                        >
                          <option value="Booked">Booked</option>
                          <option value="Under Inspection">Under Inspection</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenReschedule(b)}
                        className="inline-flex items-center gap-1 text-accent-blue bg-accent-blue/10 hover:bg-accent-blue hover:text-white border border-accent-blue/20 font-bold px-3 py-1.5 rounded-lg transition text-[10px] cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                        Reschedule
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESCHEDULE MODAL BACKDROP */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-md w-full bg-card-bg border border-card-border p-6 rounded-2xl shadow-2xl space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1c1c26] text-gray-400 hover:text-white border border-divider transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-foreground">Reschedule Service Appointment</h3>
                <p className="text-xs text-gray-400">
                  Update appointment date & time slot for Booking ID: <strong>{selectedBooking.id}</strong>
                </p>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSaveReschedule} className="space-y-4">
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Time Slot</label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                  >
                    {["08:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM", "02:00 PM - 04:00 PM", "04:00 PM - 06:00 PM"].map(ts => (
                      <option key={ts} value={ts} className="bg-[#16161e] text-white">{ts}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3.5 rounded-xl transition cursor-pointer text-xs"
                >
                  Save Schedule Changes
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
