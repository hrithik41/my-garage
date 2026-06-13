"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/appContext";
import { Menu, X, Wrench, ShieldAlert, User, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { role, setRole, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Get Quote", href: "/quote" },
    { name: "Offers", href: "/offers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full glass bg-secondary/85 backdrop-blur-md border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shadow-md">
              <Wrench className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-brand-primary transition-colors">
              Hrithik's<span className="text-brand-primary">Garage</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-brand-primary bg-brand-primary/10 border border-brand-primary/20"
                      : "text-gray-300 hover:text-white hover:bg-[#22222a]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher & Action Button */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Quick Portal Access depending on Role */}
            <Link 
              href={role === 'ADMIN' ? '/admin' : '/portal'} 
              className="flex items-center gap-1.5 text-xs bg-[#22222a] border border-divider px-3 py-1.5 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {role === 'ADMIN' ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                  Admin Dashboard
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-accent-blue" />
                  My Portal
                </>
              )}
            </Link>

            {/* Live Role Switcher Selector */}
            <div className="flex items-center gap-2 bg-[#0d0d11] border border-divider p-1 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-gray-500 px-2">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="bg-transparent text-xs text-white border-none focus:ring-0 outline-none cursor-pointer pr-6 font-bold"
              >
                <option value="CUSTOMER" className="bg-[#16161e]">Customer</option>
                <option value="ADMIN" className="bg-[#16161e]">Admin</option>
              </select>
            </div>

            {/* Emergency SOS Toggler */}
            <Link
              href="/sos"
              className="flex items-center gap-1 bg-red-600/15 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/30 font-bold px-4 py-2 rounded-lg transition-all duration-300 text-sm shadow-md"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              SOS Help
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Quick Role Switcher for Mobile */}
            <button
              onClick={() => setRole(role === 'CUSTOMER' ? 'ADMIN' : 'CUSTOMER')}
              className="p-2 bg-[#22222a] rounded-lg text-xs font-bold border border-divider text-gray-300"
            >
              {role === 'ADMIN' ? 'Set Customer' : 'Set Admin'}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#22222a] transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-divider bg-[#0d0d11] px-4 pt-2 pb-6 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-lg text-base font-semibold text-gray-300 hover:text-white hover:bg-[#22222a] transition"
            >
              {item.name}
            </Link>
          ))}
          <div className="h-[1px] bg-divider my-4" />
          
          <Link
            href={role === 'ADMIN' ? '/admin' : '/portal'}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#22222a] border border-divider py-3 rounded-lg text-white font-semibold"
          >
            {role === 'ADMIN' ? 'Go to Admin Dashboard' : 'Go to Customer Portal'}
          </Link>

          <Link
            href="/sos"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-lg"
          >
            <ShieldAlert className="w-5 h-5" />
            SOS Emergency Breakdown
          </Link>
        </div>
      )}
    </header>
  );
}
