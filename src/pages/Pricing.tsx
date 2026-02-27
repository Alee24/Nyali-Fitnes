import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/Button';
import { Check, Users, Bike, Dumbbell, Briefcase } from 'lucide-react';
import { PRICING_DATA } from '@/lib/supabase';
import { ScrollReveal } from '@/components/Animations';
import { BookingModal, BookingDetails } from '@/components/BookingModal';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<'individual' | 'spinning' | 'corporate'>('individual');
  const [selectedPlan, setSelectedPlan] = useState<BookingDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'individual', name: 'Individual', icon: Dumbbell },
    { id: 'spinning', name: 'Spinning', icon: Bike },
    { id: 'corporate', name: 'Corporate', icon: Briefcase },
  ] as const;

  const handleBooking = (plan: any, category: string) => {
    setSelectedPlan({
      title: `${category} - ${plan.duration}`,
      subtitle: plan.basic || plan.price,
      description: plan.premium ? `Premium: ${plan.premium}` : undefined,
      type: 'Membership'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingDetails={selectedPlan} 
      />
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
                    {plan.highlight && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-black text-xs font-bold uppercase py-1 px-3 tracking-widest whitespace-nowrap z-10 shadow-lg">
                        {plan.highlight}
                      </div>
                    )}
                    <div className="flex-grow flex flex-col items-center justify-center w-full">
                      <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide mb-6">{plan.duration}</h3>
                      
                      <p className="text-base font-sans font-bold uppercase tracking-widest mb-2">Starting From</p>
                      <div className="text-5xl md:text-6xl font-sans font-bold tracking-tight mb-6">
                        {plan.basic}
                      </div>

                      {plan.premium && (
                        <div className="mb-8 py-1 px-3 border border-current rounded-full text-xs font-sans font-bold uppercase tracking-widest">
                          Premium: {plan.premium}
                        </div>
                      )}
                      
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-8">
                        Includes Gym, CrossFit, and Sauna.
                      </p>
                    </div>

                    <div className="w-full space-y-4 mt-auto">
                      <Button 
                        onClick={() => handleBooking(plan, 'Individual Membership')}
                        className="w-full rounded-none border-2 border-brand-accent bg-brand-accent text-brand-black hover:bg-white hover:text-brand-black hover:border-white font-bold uppercase tracking-widest py-6 text-lg transition-all"
                      >
                        Book Now
                      </Button>
                      <Button variant="outline" className="w-full rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-black font-bold uppercase tracking-widest py-6 text-lg transition-all">
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
                      <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-wide mb-6">{plan.duration}</h3>
                      
                      <p className="text-base font-sans font-bold uppercase tracking-widest mb-2">Price</p>
                      <div className="text-5xl md:text-6xl font-sans font-bold tracking-tight mb-8">
                        {plan.price}
                      </div>
                    </div>

                    <div className="w-full space-y-4 mt-auto">
                      <Button 
                        onClick={() => handleBooking(plan, 'Spinning Class')}
                        className="w-full rounded-none border-2 border-current bg-current text-brand-black hover:bg-transparent hover:text-current font-bold uppercase tracking-widest py-6 text-lg transition-all"
                      >
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
                  <h3 className="text-2xl font-heading text-white mb-6">Inquire via Email</h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = Object.fromEntries(formData);
                      
                      const subject = `Corporate Membership Inquiry: ${data.company}`;
                      const body = `Corporate Membership Inquiry Details:\n\n` +
                        `Company: ${data.company}\n` +
                        `Contact Person: ${data.name}\n` +
                        `Email: ${data.email}\n` +
                        `Phone: ${data.phone}\n` +
                        `Employees: ${data.employees}\n\n` +
                        `Message: Hello, I would like to inquire about corporate membership options.`;
                      
                      const mailtoUrl = `mailto:info@nyalicrossfitgym.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      window.location.href = mailtoUrl;
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
                    <Button type="submit" className="w-full bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black border-none font-bold">
                      Send Inquiry via Email
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-24">
          <ScrollReveal>
            <div className="bg-brand-charcoal border border-white/10 p-8 md:p-12 rounded-xl max-w-4xl mx-auto shadow-2xl">
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-heading text-white mb-4 tracking-wide">Build Your Custom Package</h3>
                <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                  Tell us exactly what you need, and we'll create a membership plan tailored to your specific goals and schedule.
                </p>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = Object.fromEntries(formData);
                  
                  const subject = `Custom Package Request: ${data.name}`;
                  const body = `Custom Package Request Details:\n\n` +
                    `Name: ${data.name}\n` +
                    `Email: ${data.email}\n` +
                    `Phone: ${data.phone}\n\n` +
                    `Package Requirements:\n${data.requirements}`;
                  
                  const mailtoUrl = `mailto:info@nyalicrossfitgym.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoUrl;
                }}
                className="space-y-6 text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-accent uppercase tracking-wider mb-2">Name</label>
                    <input required name="name" type="text" className="w-full bg-black/40 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors rounded-none" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-accent uppercase tracking-wider mb-2">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full bg-black/40 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors rounded-none" placeholder="Your Phone Number" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-brand-accent uppercase tracking-wider mb-2">Email Address</label>
                  <input required name="email" type="email" className="w-full bg-black/40 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors rounded-none" placeholder="Your Email Address" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-brand-accent uppercase tracking-wider mb-2">What do you want in your package?</label>
                  <textarea required name="requirements" rows={4} className="w-full bg-black/40 border border-white/10 p-4 text-white focus:border-brand-accent focus:outline-none transition-colors resize-none rounded-none" placeholder="Describe your ideal membership package (e.g., 3 days/week, morning classes only, personal training included)..."></textarea>
                </div>
                
                <div className="text-center pt-6">
                  <Button type="submit" size="lg" className="w-full md:w-auto bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black font-bold text-xl px-12 py-4 uppercase tracking-widest shadow-lg shadow-brand-accent/20 rounded-none transition-all transform hover:-translate-y-1">
                    Send Request
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
