import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/Button';
import { Check, Users, Bike, Dumbbell, Briefcase } from 'lucide-react';
import { PRICING_DATA } from '@/lib/supabase';
import { ScrollReveal } from '@/components/Animations';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<'individual' | 'spinning' | 'teen' | 'corporate'>('individual');

  const categories = [
    { id: 'individual', name: 'Individual', icon: Dumbbell },
    { id: 'spinning', name: 'Spinning', icon: Bike },
    { id: 'teen', name: 'Teens', icon: Users },
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
              <div className="bg-brand-charcoal border border-white/10 overflow-hidden">
                <div className="grid grid-cols-3 bg-black/40 p-6 border-b border-white/5 text-sm uppercase tracking-wider font-bold text-gray-500">
                  <div>Duration</div>
                  <div className="text-center">Basic</div>
                  <div className="text-center text-brand-accent">Premium</div>
                </div>
                <div className="divide-y divide-white/5">
                  {PRICING_DATA.individual.plans.map((plan, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-3 p-6 items-center hover:bg-white/5 transition-colors group relative"
                    >
                      <div className="font-heading text-2xl text-white flex items-center">
                        {plan.duration}
                        {plan.highlight && (
                          <span className="ml-3 text-[10px] bg-brand-accent text-brand-black px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                            {plan.highlight}
                          </span>
                        )}
                      </div>
                      <div className="text-center text-gray-300 font-medium text-lg">{plan.basic}</div>
                      <div className="text-center text-white font-bold text-xl group-hover:text-brand-accent transition-colors scale-110">
                        {plan.premium || <span className="text-gray-600 text-sm font-normal">-</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {(activeCategory === 'spinning' || activeCategory === 'teen') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRICING_DATA[activeCategory].plans.map((plan, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-brand-charcoal p-8 border border-white/10 hover:border-brand-accent transition-all hover:-translate-y-2 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                    <h3 className="text-gray-500 text-sm uppercase tracking-widest mb-2 font-bold">{plan.duration}</h3>
                    <div className="text-5xl font-heading text-white mb-8 group-hover:text-brand-accent transition-colors">
                      {plan.price}
                    </div>
                    <Button variant="outline" className="w-full border-white/20 hover:border-brand-accent hover:bg-brand-accent hover:text-brand-black">Select Plan</Button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeCategory === 'corporate' && (
              <div className="bg-brand-charcoal border border-white/10 overflow-hidden">
                <div className="grid grid-cols-3 bg-black/40 p-6 border-b border-white/5 text-sm uppercase tracking-wider font-bold text-gray-500">
                  <div>{PRICING_DATA.corporate.headers[0]}</div>
                  <div className="text-center">{PRICING_DATA.corporate.headers[1]}</div>
                  <div className="text-center">{PRICING_DATA.corporate.headers[2]}</div>
                </div>
                <div className="divide-y divide-white/5">
                  {PRICING_DATA.corporate.plans.map((plan, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-3 p-6 items-center hover:bg-white/5 transition-colors"
                    >
                      <div className="font-heading text-2xl text-white flex items-center">
                        {plan.duration}
                        {plan.highlight && (
                          <span className="ml-3 text-[10px] bg-brand-accent text-brand-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            {plan.highlight}
                          </span>
                        )}
                      </div>
                      <div className="text-center text-gray-300 font-medium text-lg">{plan.tier1}</div>
                      <div className="text-center text-white font-bold text-xl">{plan.tier2}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-6 bg-brand-accent/5 text-center border-t border-white/5">
                  <p className="text-gray-400 text-sm">
                    Corporate rates apply to groups from the same organization. Contact us for custom invoicing.
                  </p>
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
