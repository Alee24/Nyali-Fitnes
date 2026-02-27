// Mock data for the website
export const MOCK_CLASSES = [
  { id: 1, title: 'CrossFit WOD', time: '06:00 AM', duration: '60 min', coach: 'Gym Instructor', intensity: 'High' },
  { id: 2, title: 'Functional Strength', time: '07:30 AM', duration: '60 min', coach: 'Gym Instructor', intensity: 'Medium' },
  { id: 3, title: 'Open Gym', time: '09:00 AM', duration: '120 min', coach: 'Gym Instructor', intensity: 'Variable' },
  { id: 4, title: 'CrossFit WOD', time: '05:00 PM', duration: '60 min', coach: 'Gym Instructor', intensity: 'High' },
  { id: 5, title: 'Spinning', time: '06:30 PM', duration: '45 min', coach: 'Gym Instructor', intensity: 'High' },
];

import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const MOCK_COACHES = [
  { 
    id: 1, 
    name: 'Gym Instructor', 
    specialty: 'Head Coach / CrossFit L3', 
    bio: 'Experienced in competitive lifting and CrossFit coaching.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 2, 
    name: 'Gym Instructor', 
    specialty: 'Gymnastics & Mobility', 
    bio: 'Specializes in bodyweight movements and injury prevention.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Gym Instructor', 
    specialty: 'Strength & Conditioning', 
    bio: 'Focuses on raw strength and power development.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop'
  },
];

export const PRICING_DATA = {
  individual: {
    title: "Individual Membership",
    description: "Includes Gym, CrossFit, and Sauna.",
    plans: [
      { duration: "Daily", basic: "KSh 1,700", premium: null },
      { duration: "Weekly", basic: "KSh 6,000", premium: null },
      { duration: "Starter Month", basic: "KSh 11,000", premium: "KSh 12,999" },
      { duration: "Quarterly", basic: "KSh 30,000", premium: "KSh 33,000" },
      { duration: "6 Months", basic: "KSh 55,000", premium: "KSh 59,000" },
      { duration: "Annual", basic: "KSh 99,000", premium: "KSh 117,000", highlight: "Best Value: Pay 9 Months, Train 12 (3 Months Free)" },
    ]
  },
  spinning: {
    title: "Spinning Membership",
    description: "Access to Spinning classes.",
    plans: [
      { duration: "Daily", price: "KSh 1,000" },
    ]
  },
  corporate: {
    title: "Corporate Membership",
    description: "Discounted rates for groups.",
    headers: ["Duration", "5–10 People", "10+ People"],
    plans: [
      { duration: "Monthly", tier1: "KSh 8,500", tier2: "KSh 7,000" },
      { duration: "Quarterly", tier1: "KSh 25,000", tier2: "KSh 22,500" },
      { duration: "6 Months", tier1: "KSh 43,000", tier2: "KSh 40,000" },
      { duration: "Annual", tier1: "KSh 75,000", tier2: "KSh 67,500", highlight: "Best Value" },
    ]
  }
};

// Keep MOCK_PRICING for backward compatibility if needed, but we will switch to PRICING_DATA
export const MOCK_PRICING = [
  {
    id: 'basic-monthly',
    name: 'Individual Basic',
    price: 'KSh 11,000',
    period: '/month',
    features: ['Gym Access', 'CrossFit Classes', 'Sauna Access']
  },
  // ... other legacy items can remain or be ignored
];
