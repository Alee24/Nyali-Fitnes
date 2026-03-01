import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Flame, Timer, Dumbbell, Heart, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/Animations';

export default function CrossFit() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="pt-20 min-h-screen bg-brand-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-black/60 z-10" />
          <img 
            src="https://mclinic.co.ke/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-01-at-11.23.29.jpeg" 
            alt="CrossFit Training" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-heading text-white mb-6 tracking-wide"
          >
            CrossFit <span className="text-brand-accent">Training</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light tracking-wide"
          >
            Constantly varied, functional movements performed at high intensity.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-2xl text-gray-300 leading-relaxed mb-8 font-light">
              CrossFit is a strength and conditioning program built around constantly varied, functional movements performed at safe, effective intensity.
            </p>
            <p className="text-4xl font-heading text-white mb-16">
              At Nyali Crossfit & Gym, classes are coach-guided and beginner friendly.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <ScrollReveal delay={0.2}>
              <div className="bg-brand-charcoal p-10 border border-white/5 hover:border-brand-accent transition-colors duration-300 h-full">
                <h3 className="text-3xl font-heading text-brand-accent mb-8">Every Workout Combines</h3>
                <ul className="space-y-6">
                  {['Strength training', 'Cardio conditioning', 'Functional movement', 'Mobility work'].map((item, i) => (
                    <li key={i} className="flex items-center text-xl text-gray-300">
                      <Dumbbell className="h-6 w-6 text-brand-accent mr-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="bg-brand-charcoal p-10 border border-white/5 hover:border-brand-accent transition-colors duration-300 h-full">
                <h3 className="text-3xl font-heading text-brand-accent mb-8">Class Structure (1 Hour)</h3>
                <ul className="space-y-6">
                  {[
                    { label: 'Warm-up', icon: Flame },
                    { label: 'Skill or strength training', icon: Dumbbell },
                    { label: 'Workout of the Day (WOD)', icon: Timer },
                    { label: 'Cooldown and mobility', icon: Heart }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-xl text-gray-300">
                      <item.icon className="h-6 w-6 text-brand-accent mr-4" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-16 p-8 bg-brand-accent/5 border border-brand-accent/20">
              <p className="text-xl text-white font-light">
                All movements are scalable — meaning you do not need to be fit before starting. 
                <span className="block mt-4 text-brand-accent font-heading text-4xl tracking-wide">You only need to start.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-6xl font-heading text-white mb-8">Who It’s For</h2>
              <p className="text-gray-400 mb-10 text-xl font-light leading-relaxed">
                CrossFit at Nyali Crossfit & Gym is ideal for anyone willing to put in the work. No experience required. Our coaches teach every movement.
              </p>
              <ul className="space-y-4">
                {[
                  'Beginners looking for guidance',
                  'Weight loss clients',
                  'Busy professionals needing efficiency',
                  'Athletes wanting to level up',
                  'Anyone tired of normal gyms'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-xl text-white">
                    <CheckCircle2 className="h-6 w-6 text-brand-accent mr-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <Link to="/contact">
                  <Button size="lg" className="px-10 py-6 text-lg">Start Your Journey</Button>
                </Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="relative h-[600px] overflow-hidden group">
                <img 
                  src="https://mclinic.co.ke/wp-content/uploads/2026/03/WhatsApp-Image-2026-02-28-at-15.05.03.jpeg" 
                  alt="Diverse Group Training" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="flex items-center text-brand-accent mb-2">
                    <Users className="h-8 w-8 mr-3" />
                    <span className="font-heading text-3xl">Community Driven</span>
                  </div>
                  <p className="text-white text-xl font-light">Join a tribe that supports your growth.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-6xl font-heading text-white mb-16">The Benefits</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Lose Body Fat', desc: 'High-intensity interval training is proven to burn fat efficiently.' },
              { title: 'Build Lean Muscle', desc: 'Compound movements build functional strength and definition.' },
              { title: 'Improve Endurance', desc: 'Push your cardiovascular limits and increase stamina.' },
              { title: 'Increase Strength', desc: 'Progressive overload ensures you get stronger over time.' },
              { title: 'Boost Confidence', desc: 'Achieve things you never thought possible.' },
              { title: 'Reduce Stress', desc: 'Channel your energy into a productive, endorphin-releasing workout.' }
            ].map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-brand-charcoal p-10 border border-white/5 hover:border-brand-accent transition-all duration-300 hover:-translate-y-2 group">
                  <h3 className="text-3xl font-heading text-white mb-4 group-hover:text-brand-accent transition-colors">{benefit.title}</h3>
                  <p className="text-gray-400 font-light text-lg">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-accent text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-6xl md:text-8xl font-heading text-brand-black mb-8">Don't Wait to Get Fit</h2>
            <p className="text-2xl text-brand-black/80 mb-12 font-medium">
              You don't have to be great to start, but you have to start to be great.
            </p>
            <Link to="/pricing">
              <Button variant="secondary" size="lg" className="border-2 border-brand-black font-black px-12 py-6 text-lg bg-brand-black text-white hover:bg-white hover:text-brand-black hover:border-white">
                Become a Member
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
