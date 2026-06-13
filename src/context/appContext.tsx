"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, mockBookings, mockCoupons, Coupon } from '../data/mocData';

type UserRole = 'GUEST' | 'CUSTOMER' | 'ADMIN';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: UserProfile;
  addLoyaltyPoints: (points: number) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateBookingDate: (id: string, date: string, timeSlot: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUser: UserProfile = {
  name: "Hrithik Mishra",
  email: "hrithik@example.com",
  phone: "9876543210",
  loyaltyPoints: 350,
  membershipLevel: "Gold",
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('CUSTOMER'); // Default simulated role
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load bookings from mockData initially, or localStorage if available
  useEffect(() => {
    const savedBookings = localStorage.getItem('garage_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings(mockBookings);
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('garage_bookings', JSON.stringify(newBookings));
  };

  // Switch role helper
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  // Add loyalty points
  const addLoyaltyPoints = (points: number) => {
    setUser(prev => {
      const newPoints = prev.loyaltyPoints + points;
      let level: UserProfile['membershipLevel'] = 'Bronze';
      if (newPoints >= 500) level = 'Platinum';
      else if (newPoints >= 300) level = 'Gold';
      else if (newPoints >= 150) level = 'Silver';
      
      return {
        ...prev,
        loyaltyPoints: newPoints,
        membershipLevel: level
      };
    });
  };

  // Create a new service booking
  const addBooking = (newBookingData: Omit<Booking, 'id' | 'status'>) => {
    const randomId = `B-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: randomId,
      status: 'Booked',
    };

    const updated = [newBooking, ...bookings];
    saveBookings(updated);

    // Reward points for booking (5% of booking cost)
    const earnedPoints = Math.floor(newBooking.cost * 0.05);
    addLoyaltyPoints(earnedPoints);

    return newBooking;
  };

  // Update a booking's status (Admin Dashboard action)
  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    saveBookings(updated);
  };

  // Reschedule booking date/time
  const updateBookingDate = (id: string, date: string, timeSlot: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, date, timeSlot } : b);
    saveBookings(updated);
  };

  // Coupon application logic
  const applyCoupon = (code: string): boolean => {
    const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      user,
      addLoyaltyPoints,
      bookings,
      addBooking,
      updateBookingStatus,
      updateBookingDate,
      appliedCoupon,
      applyCoupon,
      clearCoupon,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
