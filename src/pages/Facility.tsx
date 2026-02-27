import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/Animations';
import { MOCK_COACHES } from '@/lib/supabase';
import { ChevronRight, X } from 'lucide-react';

export default function Facility() {
  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="bg-brand-charcoal py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-heading text-white mb-6 tracking-wide"
          >
            Our <span className="text-brand-accent">Facility</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            World-class equipment. Expert coaching. Unmatched atmosphere.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Row 1: Mission and Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          {/* Left Column: Mission */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-4xl font-heading text-white mb-6">OUR MISSION</h2>
                <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                  <p>
                    At Nyalicrossfit & Gym, our mission is to build a stronger, healthier community through high-performance training, premium facilities, and an environment that inspires consistency and growth.
                  </p>
                  <p>
                    We exist to provide elite-level equipment, expert coaching, and a motivating atmosphere where beginners feel welcome and athletes feel challenged. Every space we create is designed to help people move better, train smarter, and unlock their full potential — physically and mentally.
                  </p>
                  <div className="pt-4 border-l-4 border-brand-accent pl-6">
                    <p className="font-heading text-2xl text-white mb-2">We are more than a gym.</p>
                    <p className="text-brand-accent font-bold uppercase tracking-wider">We are a culture of discipline, resilience, and progress.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Video */}
          <div>
            <ScrollReveal>
              <div className="w-full bg-brand-charcoal rounded-xl overflow-hidden border border-white/10 shadow-2xl sticky top-24">
                <video 
                  src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Video-2026-02-23-at-11.54.13-2.mp4" 
                  controls 
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover"
                  poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </ScrollReveal>
          </div>
        </div>



        {/* Membership Cards Section */}
        <section className="mt-24 mb-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading text-white mb-4">Membership Options</h2>
              <div className="h-1 w-24 bg-brand-accent mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Basic Package */}
              <div className="bg-black border-2 border-white flex flex-col items-center text-center p-0 hover:border-brand-accent transition-colors duration-300">
                <div className="p-10 flex flex-col items-center w-full flex-grow">
                  <h3 className="text-5xl font-heading text-white mb-2 tracking-wide">BASIC</h3>
                  <p className="text-xl font-bold text-white mb-8 uppercase tracking-wider">STARTING AT KSh 6,000</p>
                  
                  <ul className="space-y-3 text-white mb-8">
                    {['Gym Access', 'CrossFit Classes', 'Sauna Access'].map((item, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <ChevronRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium uppercase tracking-wider">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/pricing" className="w-full bg-white text-black font-heading text-2xl py-4 hover:bg-gray-200 transition-colors uppercase tracking-wide block">
                  Enquire Now
                </a>
              </div>

              {/* Premium Package */}
              <div className="bg-black border-2 border-white flex flex-col items-center text-center p-0 relative hover:border-brand-accent transition-colors duration-300">
                <div className="p-10 flex flex-col items-center w-full flex-grow">
                  <div className="bg-brand-accent text-white px-4 py-1 mb-2 transform -skew-x-12">
                    <h3 className="text-5xl font-heading tracking-wide transform skew-x-12">PREMIUM</h3>
                  </div>
                  <p className="text-xl font-bold text-white mb-8 uppercase tracking-wider">STARTING AT KSh 11,000</p>
                  
                  <ul className="space-y-3 text-white mb-8">
                    {['Gym Access', 'CrossFit Classes', 'Spin Classes', 'Sauna Access'].map((item, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2">
                        <ChevronRight className="h-4 w-4 text-white" />
                        <span className="text-sm font-medium uppercase tracking-wider">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/pricing" className="w-full bg-white text-black font-heading text-2xl py-4 hover:bg-gray-200 transition-colors uppercase tracking-wide block">
                  Enquire Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
