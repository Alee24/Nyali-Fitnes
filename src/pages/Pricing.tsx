import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/Button';
import { Check, Users, Bike, Dumbbell, Briefcase } from 'lucide-react';
import { PRICING_DATA } from '@/lib/supabase';
import { ScrollReveal } from '@/components/Animations';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<'individual' | 'spinning' | 'corporate'>('individual');

  const categories = [
    { id: 'individual', name: 'Individual', icon: Dumbbell },
    { id: 'spinning', name: 'Spinning', icon: Bike },
    { id: 'corporate', name: 'Corporate', icon: Briefcase },
  ] as const;

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
            Membership <span className="text-brand-accent">Plans</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            Flexible options for every lifestyle. No hidden fees.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center px-8 py-4 rounded-none border-b-2 font-heading text-xl tracking-wide transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-brand-accent text-brand-accent bg-white/5'
                  : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <cat.icon className="mr-3 h-5 w-5" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl font-heading text-white mb-2">{PRICING_DATA[activeCategory].title}</h2>
              <p className="text-brand-accent text-lg font-medium tracking-wide uppercase">{PRICING_DATA[activeCategory].description}</p>
            </div>

            {activeCategory === 'individual' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRICING_DATA.individual.plans.map((plan, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-brand-black border-4 border-white p-8 flex flex-col items-center text-center relative group hover:bg-white hover:text-brand-black transition-colors duration-300 min-h-[500px]"
                  >
                    <div className="flex-grow flex flex-col items-center justify-center w-full">
                      <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-6">{plan.duration}</h3>
                      
                      <p className="text-lg font-sans font-bold uppercase tracking-widest mb-2">Starting From</p>
                      <div className="text-5xl md:text-6xl font-sans font-black tracking-tight mb-6">
                        {plan.basic}
                      </div>

                      {plan.premium && (
                        <div className="mb-8 py-1 px-3 border border-current rounded-full text-xs font-sans font-bold uppercase tracking-widest">
                          Premium: {plan.premium}
                        </div>
                      )}
                    </div>

                    <div className="w-full space-y-4 mt-auto">
                      <Button className="w-full rounded-none border-2 border-current bg-current text-brand-black hover:bg-transparent hover:text-current font-bold uppercase tracking-widest py-6 text-lg transition-all">
                        Book Now
                      </Button>
                      <Button variant="outline" className="w-full rounded-none border-2 border-current bg-transparent text-current hover:bg-current hover:text-brand-black font-bold uppercase tracking-widest py-6 text-lg transition-all">
                        Day Pass
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeCategory === 'spinning' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRICING_DATA[activeCategory].plans.map((plan, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-brand-black border-4 border-white p-8 flex flex-col items-center text-center relative group hover:bg-white hover:text-brand-black transition-colors duration-300 min-h-[500px]"
                  >
                    <div className="flex-grow flex flex-col items-center justify-center w-full">
                      <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-6">{plan.duration}</h3>
                      
                      <p className="text-lg font-sans font-bold uppercase tracking-widest mb-2">Price</p>
                      <div className="text-5xl md:text-6xl font-sans font-black tracking-tight mb-8">
                        {plan.price}
                      </div>
                    </div>

                    <div className="w-full space-y-4 mt-auto">
                      <Button className="w-full rounded-none border-2 border-current bg-current text-brand-black hover:bg-transparent hover:text-current font-bold uppercase tracking-widest py-6 text-lg transition-all">
                        Select Plan
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeCategory === 'corporate' && (
              <div className="space-y-8">
                <div className="bg-brand-charcoal border border-white/10 p-8 rounded-xl">
                  <h3 className="text-2xl font-heading text-white mb-6">Inquire via WhatsApp</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = Object.fromEntries(formData);
                      const message = `*Corporate Membership Inquiry*\n\n` +
                        `*Company:* ${data.company}\n` +
                        `*Contact Person:* ${data.name}\n` +
                        `*Email:* ${data.email}\n` +
                        `*Phone:* ${data.phone}\n` +
                        `*Employees:* ${data.employees}\n\n` +
                        `Hello, I would like to inquire about corporate membership options.`;
                      
                      const url = `https://wa.me/254743040404?text=${encodeURIComponent(message)}`;
                      window.open(url, '_blank');
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                        <input required name="company" type="text" className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Contact Person</label>
                        <input required name="name" type="text" className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input required name="email" type="email" className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <input required name="phone" type="tel" className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Number of Employees (Approx.)</label>
                      <input required name="employees" type="number" className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none" />
                    </div>
                    <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none">
                      Send Inquiry via WhatsApp
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-24 text-center">
          <ScrollReveal>
            <h3 className="text-3xl font-heading text-white mb-6">Need a Custom Plan?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg font-light">
              We offer tailored packages for large teams, schools, and special events. Get in touch with our management team.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/contact'} className="px-10 py-6 text-lg">Contact Us</Button>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
