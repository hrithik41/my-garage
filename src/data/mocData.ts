export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string; // Used to dynamically map Lucide Icons
  shortDescription: string;
  longDescription: string;
  startingPrice: number;
  estimatedTime: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  expiryDate: string;
}

export interface CarBrand {
  name: string;
  models: string[];
  multiplier: number; // Hatchback = 1.0, Sedan = 1.2, SUV = 1.4, Luxury = 1.8
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  brand: string;
  model: string;
  fuelType: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  pickupRequired: boolean;
  address?: string;
  status: 'Booked' | 'Vehicle Received' | 'Under Inspection' | 'In Progress' | 'Completed' | 'Delivered';
  cost: number;
  notes?: string;
}

// 1. Service Categories
export const mockServices: ServiceCategory[] = [
  {
    id: "general-service",
    name: "General Service",
    iconName: "Wrench",
    shortDescription: "Basic inspection, engine oil check, and multi-point diagnostics.",
    longDescription: "Our comprehensive general service is designed to maintain your car's reliability and health. We inspect all fluid levels, filter elements, and run full-system checks to detect minor issues before they become major expenses.",
    startingPrice: 1999,
    estimatedTime: "2-3 Hours",
    benefits: [
      "Extends engine longevity",
      "Improves throttle response & efficiency",
      "Detailed health scorecard generated"
    ],
    faqs: [
      { question: "How often should I get a general service?", answer: "We recommend a general inspection every 6 months or 5,000 kms, whichever comes first." },
      { question: "Is engine oil replaced?", answer: "Yes, standard general service includes topping up fluids and checking filters, while engine oil replacement is fully carried out." }
    ]
  },
  {
    id: "periodic-maintenance",
    name: "Periodic Maintenance",
    iconName: "ShieldCheck",
    shortDescription: "Manufacturer scheduled oil, filter, and overall tune-ups.",
    longDescription: "Scheduled filter replacements (air, oil, cabin filters), spark plug adjustments, wheel rotations, and standard diagnostic checks in strict compliance with manufacturer specs.",
    startingPrice: 3499,
    estimatedTime: "4 Hours",
    benefits: [
      "Preserves vehicle warranty guidelines",
      "Maximizes fuel economy",
      "Preventive wear protection for engine parts"
    ],
    faqs: [
      { question: "Does this affect my brand warranty?", answer: "No, our service matches standard manufacturer service charts, preserving your warranty protection." }
    ]
  },
  {
    id: "engine-repair",
    name: "Engine Repair",
    iconName: "Activity",
    shortDescription: "Engine diagnostic scans, overhaul, gasket replacements.",
    longDescription: "Deep engineering diagnostic sweeps, head gasket installations, cooling system repair, sensor updates, or complete engine rebuilds handled by high-end mechanics.",
    startingPrice: 7999,
    estimatedTime: "1-2 Days",
    benefits: [
      "Fixes check-engine indicator triggers",
      "Solves overheating issues",
      "Smooth power delivery and compression restoration"
    ],
    faqs: [
      { question: "How long does a complex engine overhaul take?", answer: "Normally between 24 to 48 hours depending on parts availability and complexity." }
    ]
  },
  {
    id: "brake-service",
    name: "Brake Service",
    iconName: "Disc",
    shortDescription: "Brake pad replacement, disc rotor resurfacing, and fluid flush.",
    longDescription: "We check, machine, or replace brake pads and discs. We also perform a complete hydraulic line flush to remove air bubbles and ensure responsive stopping power.",
    startingPrice: 1499,
    estimatedTime: "2 Hours",
    benefits: [
      "Guarantees short stopping distances",
      "Eliminates squeaking/grinding noises",
      "Ensures passenger and driver safety"
    ],
    faqs: [
      { question: "When should I change my brake pads?", answer: "Brake pads usually last between 20,000 to 40,000 kms, depending on driving habits." }
    ]
  },
  {
    id: "wheel-alignment",
    name: "Wheel Alignment",
    iconName: "Compass",
    shortDescription: "3D computerized wheel alignment & digital balancing.",
    longDescription: "Complete laser wheel alignment, steering angle calibration, dynamic counter-weight balancing, and tire tread depth reviews.",
    startingPrice: 999,
    estimatedTime: "1 Hour",
    benefits: [
      "Prevents uneven tire wear",
      "Eliminates steering wheel vibrations or pulling",
      "Improves high-speed highway stability"
    ],
    faqs: [
      { question: "How do I know if my alignment is out?", answer: "If your car pulls to the left or right, or the steering wheel is off-center when driving straight, you need an alignment." }
    ]
  },
  {
    id: "ac-repair",
    name: "AC Repair & Service",
    iconName: "Wind",
    shortDescription: "Gas top-up, filter clean, leak test, and cooling fixes.",
    longDescription: "Refrigerant recharging (R134a/R1234yf), condenser cleanups, cabin microfilter updates, and HVAC compression line leak testing.",
    startingPrice: 1299,
    estimatedTime: "2-3 Hours",
    benefits: [
      "Restores freezing cabin temperatures",
      "Removes bad odors & bacteria from ventilation",
      "Enhances engine load efficiency"
    ],
    faqs: [
      { question: "Why is my AC blowing warm air?", answer: "This is usually caused by low refrigerant levels, a clogged filter, or compressor failure. We run pressure tests to find the cause." }
    ]
  }
];

// 2. Blog Posts
export const mockBlogs: BlogPost[] = [
  {
    id: "monsoon-car-care",
    title: "Essential Monsoon Car Care Tips",
    category: "Maintenance",
    excerpt: "Driving in heavy rains requires optimal traction, vision, and mechanical health. Learn how to prepare your car.",
    content: "Monsoons bring cool relief but are incredibly taxing on your vehicle. Road water can corrode underbody parts, and worn wipers block vision, causing hazardous driving conditions. 1. Check Wipers: Worn rubber leaves streaks that block your view. Replace blades annually. 2. Verify Tires: Balding tires lose traction on wet roads, leading to dangerous hydroplaning. Ensure your tire treads are at least 2mm deep. 3. Underbody Anti-Rust Coat: A polymer-based underbody coating shields metal frames from road grime and corrosive salt water. 4. Check Brakes: Dampness reduces braking friction. Get your brake pads inspected immediately if they squeak during wet weather.",
    publishedAt: "June 10, 2026",
    readTime: "4 mins read",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "battery-maintenance",
    title: "How to Extend Your Car Battery Life",
    category: "Battery",
    excerpt: "Don't get stranded! Understand the warning signs of a failing battery and how to maximize its working lifespan.",
    content: "A car battery generally lasts between 3 to 5 years. However, short trips, extreme weather conditions, and leaving electronics on can wear it down much faster. To maximize its lifespan: 1. Clean Terminals: Acid crust limits current flow. Scrub terminals with a baking soda and water mixture. 2. Minimize Electronics: Don't run AC or radio for long while the engine is turned off. 3. Secure the Battery: Vibrations damage delicate plates inside the cells. Ensure mounting brackets are tight. 4. Drive Regularly: Cars that sit idle lose charge. Drive for at least 20 minutes once a week to recharge the battery.",
    publishedAt: "May 25, 2026",
    readTime: "5 mins read",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop"
  }
];

// 3. Active Coupons & Offers
export const mockCoupons: Coupon[] = [
  { code: "FIRST20", discountPercentage: 20, description: "Get 20% off on your first general service package.", expiryDate: "2026-07-31" },
  { code: "RAINY15", discountPercentage: 15, description: "Monsoon special: 15% discount on detailing & painting.", expiryDate: "2026-08-15" },
  { code: "FREEINSPECT", discountPercentage: 100, description: "Complimentary 40-point vehicle diagnostics check.", expiryDate: "2026-12-31" }
];

// 4. Vehicle Segments & Multipliers
export const mockBrands: CarBrand[] = [
  { name: "Maruti Suzuki", models: ["Swift", "Baleno", "Brezza", "Ertiga", "Alto"], multiplier: 1.0 },
  { name: "Hyundai", models: ["i20", "Creta", "Verna", "Venue", "Grand i10"], multiplier: 1.1 },
  { name: "Tata", models: ["Nexon", "Harrier", "Altroz", "Tiago", "Safari"], multiplier: 1.1 },
  { name: "Mahindra", models: ["XUV700", "Thar", "Scorpio-N", "Bolero"], multiplier: 1.25 },
  { name: "Honda", models: ["City", "Amaze", "Elevate", "Civic"], multiplier: 1.15 },
  { name: "Toyota", models: ["Innova Hycross", "Fortuner", "Glanza", "Urban Cruiser"], multiplier: 1.3 },
  { name: "BMW", models: ["3 Series", "5 Series", "X1", "X5"], multiplier: 1.8 }
];

// 5. Initial Bookings (For Admin & Customer Portals)
export const mockBookings: Booking[] = [
  {
    id: "B-88392",
    customerName: "Hrithik Sharma",
    email: "hrithik@example.com",
    phone: "9876543210",
    vehicleNumber: "MH-02-DZ-4321",
    brand: "Hyundai",
    model: "Creta",
    fuelType: "Diesel",
    serviceType: "Periodic Maintenance",
    date: "2026-06-14",
    timeSlot: "10:00 AM - 12:00 PM",
    pickupRequired: true,
    address: "Andheri West, Mumbai, 400053",
    status: "Under Inspection",
    cost: 3848,
    notes: "AC cooling is slightly low. Please check."
  },
  {
    id: "B-23849",
    customerName: "Sneha Patel",
    email: "sneha@example.com",
    phone: "9123456789",
    vehicleNumber: "MH-12-RS-9988",
    brand: "Maruti Suzuki",
    model: "Swift",
    fuelType: "Petrol",
    serviceType: "Brake Service",
    date: "2026-06-13",
    timeSlot: "02:00 PM - 04:00 PM",
    pickupRequired: false,
    status: "Completed",
    cost: 1499,
    notes: "Rear brakes are making squeaking sounds."
  }
];
