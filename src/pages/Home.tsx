import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flame, Users, Trophy } from 'lucide-react';
import { ScrollReveal, TextReveal, CountUp } from '@/components/Animations';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-brand-black z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
            poster="https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=2070&auto=format&fit=crop"
          >
            <source src="/images/WhatsApp Video 2026-02-23 at 11.54.13 (1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center py-1 px-4 border border-brand-accent/50 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 animate-pulse" />
              Nyali Crossfit & Gym
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-normal text-white mb-8 leading-[0.85] tracking-tight">
            <TextReveal text="Building better humans" className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white" />
          </h1>

          <ScrollReveal delay={0.4}>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light tracking-wide leading-relaxed">
              Join the tribe at Nyali Crossfit & Gym. Expert coaching, supportive community, and results-driven training for all fitness levels.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/pricing">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 bg-brand-accent hover:bg-white hover:text-brand-black transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-brand-accent/20">
                  Become a Member
                </Button>
              </Link>
              <Link to="/schedule">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 border-white text-white hover:bg-white hover:text-brand-black transition-all duration-300">
                  View Schedule
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-2 font-medium uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-brand-accent" />
              Beginner Friendly • No Experience Needed
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-brand-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-12">
            {[
              { label: "Active Members", value: 250, suffix: "+" },
              { label: "Expert Coaches", value: 12, suffix: "" },
              { label: "Classes Weekly", value: 50, suffix: "+" },
              { label: "Years Strong", value: 2, suffix: "" },
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1} className="text-center">
                <div className="text-4xl md:text-6xl font-heading text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-20 bg-brand-black border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-brand-charcoal border-2 border-brand-accent p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_50px_rgba(242,125,38,0.15)]">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block bg-brand-accent text-brand-black text-xs font-bold uppercase py-1 px-3 tracking-widest mb-4 rounded-sm">
                Limited Time Offer
              </div>
              <h2 className="text-4xl md:text-6xl font-heading text-white mb-4 tracking-tight">
                ANNUAL <span className="text-brand-accent">BEST VALUE</span>
              </h2>
              <p className="text-xl text-gray-300 font-light max-w-2xl">
                Commit to your fitness journey and save big. <strong className="text-white">Pay for 9 months, train for 12.</strong> That's 3 months absolutely free.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/pricing">
                <Button size="lg" className="bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black font-bold text-xl px-10 py-8 h-auto shadow-lg shadow-brand-accent/20 transform hover:-translate-y-1 transition-all duration-300">
                  Get Offer <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="text-5xl md:text-7xl font-heading text-white mb-6 tracking-wide">Why Choose Us</h2>
              <div className="h-1 w-24 bg-brand-accent mx-auto" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Expert Coaching",
                desc: "Our certified coaches guide every movement to ensure safety and maximize your results.",
                image: "/images/WhatsApp Image 2026-02-26 at 09.09.15 (1).jpeg"
              },
              {
                icon: Users,
                title: "Community Support",
                desc: "Train with a tribe that pushes you to be your best. We sweat, struggle, and succeed together.",
                image: "/images/WhatsApp Image 2026-02-26 at 09.05.17.jpeg"
              },
              {
                icon: Flame,
                title: "Results Driven",
                desc: "Proven programming that builds functional strength, endurance, and mental toughness.",
                image: "/images/WhatsApp Image 2026-02-26 at 09.09.16.jpeg"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="bg-brand-charcoal p-10 rounded-none border border-white/5 hover:border-brand-accent transition-all duration-500 group h-full relative overflow-hidden">

                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-black/80 pointer-events-none" />

                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500 z-0" />

                  <div className="h-16 w-16 bg-brand-black border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:text-brand-black transition-all duration-300 text-white relative z-10">
                    <item.icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-3xl font-heading text-white mb-4 tracking-wide relative z-10">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light relative z-10 group-hover:text-gray-200 transition-colors">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-heading text-white mb-6 tracking-wide">Find the perfect class for your goals</h2>
            </ScrollReveal>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CrossFit Group",
                image: "/images/WhatsApp Image 2026-03-01 at 11.23.29.jpeg",
                desc: "High-intensity functional movement. The core of what we do."
              },
              {
                title: "Community",
                image: "/images/WhatsApp Image 2026-02-28 at 15.05.03.jpeg",
                desc: "Train with a tribe that pushes you to be your best."
              },
              {
                title: "Spinning",
                image: "/images/WhatsApp Image 2026-02-28 at 08.55.47.jpeg",
                desc: "Endurance focused indoor cycling sessions to build your engine."
              }
            ].map((program, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.2}>
                <div className="group relative h-[500px] overflow-hidden cursor-pointer bg-gray-900 border border-white/5">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-1 bg-brand-accent mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <h3 className="text-4xl font-heading text-white mb-4 tracking-wide">{program.title}</h3>
                    <p className="text-gray-300 text-base mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-light leading-relaxed">
                      {program.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>


        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32 bg-brand-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-6xl md:text-8xl font-heading text-brand-black mb-8 tracking-tight leading-none">
              READY TO START<br />YOUR JOURNEY?
            </h2>
            <p className="text-brand-black/80 text-xl mb-12 font-medium max-w-2xl mx-auto">
              Your first class is on us. Come meet the coaches, see the facility, and experience the workout.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/pricing">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-black border-2 border-brand-black px-12 py-6 text-lg bg-brand-black text-white hover:bg-white hover:text-brand-black hover:border-white">
                  BECOME A MEMBER
                </Button>
              </Link>
              <a href="https://wa.me/254743040404" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-brand-black hover:text-white hover:bg-brand-black border-2 border-brand-black px-12 py-6 text-lg">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="text-5xl font-heading text-white mb-4 tracking-wide">Member Transformations</h2>
              <div className="h-1 w-20 bg-brand-accent mx-auto" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "James K.",
                role: "Member since 2023",
                quote: "I lost 15kg in 6 months, but more importantly, I found a community that supports me every single day. The coaching here is unmatched.",
                image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop"
              },
              {
                name: "Sarah M.",
                role: "Competitive Athlete",
                quote: "Nyali Crossfit & Gym took my training to the next level. The programming is intelligent, challenging, and scalable. I've hit PRs I never thought possible.",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop"
              },
              {
                name: "David O.",
                role: "Morning Crew",
                quote: "The 6AM class is the highlight of my day. Great energy, great people, and a workout that sets me up for success at work.",
                image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1000&auto=format&fit=crop"
              }
            ].map((testimonial, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.2}>
                <div className="bg-brand-charcoal p-10 rounded-none border border-white/5 relative hover:border-brand-accent/40 transition-colors h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-brand-accent object-cover" />
                    <div>
                      <h4 className="text-white font-heading text-2xl tracking-wide">{testimonial.name}</h4>
                      <p className="text-brand-accent text-xs uppercase tracking-wider font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic font-light leading-relaxed text-lg">"{testimonial.quote}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
