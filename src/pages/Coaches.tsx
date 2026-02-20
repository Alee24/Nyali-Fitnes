import { motion } from 'motion/react';
import { MOCK_COACHES } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { ScrollReveal } from '@/components/Animations';

export default function Coaches() {
  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="bg-brand-charcoal py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading text-white mb-6 tracking-wide"
          >
            Meet The <span className="text-brand-accent">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            World-class athletes and certified professionals dedicated to helping you reach your potential.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCK_COACHES.map((coach, index) => (
            <ScrollReveal key={coach.id} delay={index * 0.1}>
              <div className="group relative">
                <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-brand-charcoal border border-white/5">
                  <div className="absolute inset-0 bg-brand-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                  <img 
                    src={coach.image} 
                    alt={coach.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Social Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                    <div className="flex space-x-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <a href="#" className="text-white hover:text-brand-accent transition-colors"><Instagram className="h-8 w-8" /></a>
                      <a href="#" className="text-white hover:text-brand-accent transition-colors"><Twitter className="h-8 w-8" /></a>
                      <a href="#" className="text-white hover:text-brand-accent transition-colors"><Linkedin className="h-8 w-8" /></a>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-accent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  <h3 className="text-3xl font-heading text-white mb-1 tracking-wide group-hover:text-brand-accent transition-colors">{coach.name}</h3>
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-4">{coach.specialty}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">{coach.bio}</p>
                  
                  <Button variant="outline" size="sm" className="w-full border-white/20 hover:border-brand-accent">Book Session</Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
