import { motion } from 'motion/react';
import { ScrollReveal } from '@/components/Animations';
import { MOCK_COACHES } from '@/lib/supabase';

export default function Community() {
  const galleryImages = [
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.05.17.jpeg",
      alt: "Community Workout",
      category: "Community"
    },
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.09.16.jpeg",
      alt: "Gym Facility",
      category: "Facilities"
    },
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.09.15-2.jpeg",
      alt: "Group Class",
      category: "Community"
    },
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.09.15-1.jpeg",
      alt: "Weightlifting Area",
      category: "Facilities"
    },
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.09.15.jpeg",
      alt: "Spinning Class",
      category: "Community"
    },
    {
      src: "https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-26-at-09.09.14.jpeg",
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
