import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/Button';
import { Check, Users, Bike, Dumbbell, Briefcase, Loader2, CheckCircle2 } from 'lucide-react';
import { PRICING_DATA } from '@/lib/supabase';
import { ScrollReveal } from '@/components/Animations';
import { BookingModal, BookingDetails } from '@/components/BookingModal';

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState<'individual' | 'spinning' | 'corporate'>('individual');
  const [selectedPlan, setSelectedPlan] = useState<BookingDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [corpStatus, setCorpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [customStatus, setCustomStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
              className={`flex items-center px-8 py-4 rounded-none border-b-2 font-heading text-xl tracking-wide transition-all duration-300 ${activeCategory === cat.id
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

                  {corpStatus === 'success' ? (
                    <div className="flex flex-col items-center text-center py-8">
                      <CheckCircle2 className="h-16 w-16 text-brand-accent mb-4" />
                      <h4 className="text-2xl font-heading text-white mb-2">Inquiry Sent!</h4>
                      <p className="text-gray-400 mb-6">We'll get back to you regarding your corporate membership options shortly.</p>
                      <Button onClick={() => setCorpStatus('idle')} className="bg-brand-accent text-brand-black hover:bg-white transition-colors">
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setCorpStatus('submitting');
                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData);

                        try {
                          const res = await fetch('https://formsubmit.co/ajax/info@nyalicrossfitgym.com', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                            body: JSON.stringify({
                              name: data.name,
                              email: data.email,
                              phone: data.phone,
                              _subject: `Corporate Membership Inquiry: ${data.company}`,
                              _template: 'table',
                              Company: data.company,
                              Employees: data.employees,
                              Message: 'Hello, I would like to inquire about corporate membership options.'
                            }),
                          });
                          if (res.ok) setCorpStatus('success');
                          else throw new Error();
                        } catch {
                          setCorpStatus('error');
                        }
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

                      {corpStatus === 'error' && (
                        <p className="text-red-400 text-sm">Submission failed. Please try again.</p>
                      )}

                      <Button type="submit" disabled={corpStatus === 'submitting'} className="w-full bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black border-none font-bold">
                        {corpStatus === 'submitting' ? (
                          <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Sending...</span>
                        ) : 'Send Inquiry via Email'}
                      </Button>
                    </form>
                  )}
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

              {customStatus === 'success' ? (
                <div className="flex flex-col items-center text-center py-12">
                  <CheckCircle2 className="h-20 w-20 text-brand-accent mb-6" />
                  <h4 className="text-3xl font-heading text-white mb-4">Request Received!</h4>
                  <p className="text-gray-400 max-w-lg mb-8 text-lg">
                    Thank you for your custom package request. We'll review your requirements and get back to you via email to discuss options.
                  </p>
                  <Button onClick={() => setCustomStatus('idle')} className="bg-brand-accent text-brand-black hover:bg-white transition-colors">
                    Build Another Package
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setCustomStatus('submitting');
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData);

                    try {
                      const res = await fetch('https://formsubmit.co/ajax/info@nyalicrossfitgym.com', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({
                          name: data.name,
                          email: data.email,
                          phone: data.phone,
                          _subject: `Custom Package Request: ${data.name}`,
                          _template: 'table',
                          Requirements: data.requirements
                        }),
                      });
                      if (res.ok) setCustomStatus('success');
                      else throw new Error();
                    } catch {
                      setCustomStatus('error');
                    }
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

                  {customStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center">Submission failed. Please try again.</p>
                  )}

                  <div className="text-center pt-6">
                    <Button type="submit" disabled={customStatus === 'submitting'} size="lg" className="w-full md:w-auto bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black font-bold text-xl px-12 py-4 uppercase tracking-widest shadow-lg shadow-brand-accent/20 rounded-none transition-all transform hover:-translate-y-1">
                      {customStatus === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</span>
                      ) : 'Send Request'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
