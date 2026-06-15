"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Provide a valid email";
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = "Provide a 10-digit number";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
      }, 5000);
    }
  };

  const contactDetails = [
    { icon: Phone, title: "Emergency Hotline", val: "+91 98765 43210", subtitle: "24/7 Breakdown Assistance" },
    { icon: Mail, title: "Email Support", val: "support@hrithiksgarage.com", subtitle: "Reply within 4 business hours" },
    { icon: MapPin, title: "Workshop Address", val: "LBS Marg, Kurla West, Mumbai", subtitle: "Opposite Phoenix Marketcity Mall" }
  ];

  const operatingHours = [
    { days: "Monday - Friday", hours: "08:00 AM - 08:00 PM" },
    { days: "Saturday", hours: "09:00 AM - 06:00 PM" },
    { days: "Sunday", hours: "10:00 AM - 04:00 PM (Emergency SOS Only)" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Contact <span className="text-brand-primary">Our Workshop</span>
        </h1>
        <p className="text-sm text-gray-400 font-medium">
          Have queries about service intervals, custom quotes, or warranty coverage? Drop us a message or call our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTACT DETAILS & HOURS */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Quick Info Grid */}
          <div className="space-y-4">
            {contactDetails.map((det, index) => {
              const Icon = det.icon;
              return (
                <div key={index} className="glass p-5 rounded-2xl border border-card-border bg-card-bg/40 flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-400 font-bold uppercase tracking-wider">{det.title}</p>
                    <p className="text-sm font-black text-foreground">{det.val}</p>
                    <p className="text-gray-500 font-medium">{det.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operating Hours */}
          <div className="glass p-6 rounded-2xl border border-card-border bg-card-bg/40 space-y-4">
            <h3 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-divider pb-3">
              <Clock className="w-4.5 h-4.5 text-brand-primary" />
              Operating Hours
            </h3>
            <div className="space-y-3 text-xs">
              {operatingHours.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center font-semibold">
                  <span className="text-gray-400">{item.days}</span>
                  <span className="text-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-2">
          
          <AnimatePresence mode="wait">
            
            {isSubmitted ? (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 rounded-2xl border border-green-500/30 bg-card-bg/60 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto">
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-foreground">Message Sent!</h3>
                  <p className="text-xs text-gray-400">
                    Thank you for contacting us. A customer support representative will reach out shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass p-8 rounded-2xl border border-card-border bg-card-bg/50 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
                  </div>

                  {/* Email */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Mobile Number</label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Billing & Invoicing">Billing & Invoicing</option>
                      <option value="Warranty Claim">Warranty Claim</option>
                      <option value="Corporate / Fleet Services">Corporate / Fleet Services</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#16161e] border border-card-border rounded-xl p-3.5 text-foreground text-sm font-semibold outline-none focus:border-brand-primary/50 transition"
                  />
                  {errors.message && <p className="text-xs text-red-500 font-bold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-black py-4 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1 text-xs"
                >
                  <Send className="w-4 h-4" />
                  Submit Message
                </button>

              </motion.form>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
