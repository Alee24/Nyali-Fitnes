import { motion } from 'motion/react';
import { ScrollReveal } from '@/components/Animations';
import { MOCK_COACHES } from '@/lib/supabase';

export default function Community() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=2070&auto=format&fit=crop",
      alt: "Community Workout",
      category: "Community"
    },
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      alt: "Gym Facility",
      category: "Facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop",
      alt: "Group Class",
      category: "Community"
    },
    {
      src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
      alt: "Weightlifting Area",
      category: "Facilities"
    },
    {
      src: "https://images.unsplash.com/photo-1591311630200-ffa9120a540f?q=80&w=1413&auto=format&fit=crop",
      alt: "Spinning Class",
      category: "Community"
    },
    {
      src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop",
      alt: "Outdoor Training",
      category: "Facilities"
    }
  ];

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
            Our <span className="text-brand-accent">Community</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto font-light"
          >
            More than just a gym. We are a family united by fitness.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Row 1: Video and Coaches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left Column: Video */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-4xl font-heading text-white mb-4">Experience the Energy</h2>
                <p className="text-gray-400">
                  Check out what happens inside our walls. From daily WODs to special events, there's always something happening at Nyali Crossfit & Gym.
                </p>
              </div>
              <div className="w-full bg-brand-charcoal rounded-xl overflow-hidden border border-white/10 shadow-2xl sticky top-24">
                <video 
                  src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Video-2026-02-23-at-11.54.13-2.mp4" 
                  controls 
                  className="w-full h-auto object-cover"
                  poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Meet the Coaches */}
          <div>
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-4xl font-heading text-white mb-4">Meet Our Coaches</h2>
                <p className="text-gray-400">
                  Our team of expert coaches is dedicated to helping you reach your fitness goals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {MOCK_COACHES.map((coach, idx) => (
                  <motion.div 
                    key={coach.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-brand-charcoal rounded-xl overflow-hidden border border-white/5 hover:border-brand-accent/50 transition-colors group"
                  >
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img 
                        src={coach.image} 
                        alt={coach.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-heading text-white mb-1">{coach.name}</h3>
                      <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">{coach.specialty}</p>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{coach.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Row 2: Gallery */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-heading text-white mb-4">Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-square overflow-hidden rounded-lg bg-brand-charcoal border border-white/5"
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <span className="text-brand-accent text-[10px] font-bold uppercase tracking-wider mb-1">{image.category}</span>
                  <h3 className="text-white font-heading text-lg">{image.alt}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
