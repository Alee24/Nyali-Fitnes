import { Button } from '@/components/Button';
import { MapPin, Phone, Mail, Clock, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <img 
            src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-23-at-12.19.33-e1771950026733.jpeg" 
            alt="Nyali Crossfit & Gym Logo" 
            className="h-24 w-auto object-contain mb-8" 
            referrerPolicy="no-referrer"
          />
          <h1 className="text-5xl font-heading font-bold text-white mb-8">Get In Touch</h1>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-start">
              <div className="bg-brand-charcoal p-3 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Visit Us</h3>
                <p className="text-gray-400">Promenade Mall Links Rd.<br />Mombasa, Coast, Kenya</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-brand-charcoal p-3 rounded-lg mr-4">
                <Phone className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Call Us</h3>
                <p className="text-gray-400">
                  <a href="https://wa.me/254743040404" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                    +254 743 040 404
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-brand-charcoal p-3 rounded-lg mr-4">
                <Mail className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Email Us</h3>
                <p className="text-gray-400">info@nyalicrossfitgym.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://www.instagram.com/nyalicrossfitgym/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-charcoal p-3 rounded-lg text-gray-400 hover:text-brand-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.youtube.com/@NyaliCrossfitandGym" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-charcoal p-3 rounded-lg text-gray-400 hover:text-brand-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@nyalicrossfitgym" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-charcoal p-3 rounded-lg text-gray-400 hover:text-brand-accent transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  className="h-6 w-6" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  stroke="none"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/254743040404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-charcoal p-3 rounded-lg text-gray-400 hover:text-brand-accent transition-colors"
                aria-label="WhatsApp"
              >
                <svg 
                  className="h-6 w-6" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  stroke="none"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              
              const subject = `Website Contact Form: ${data.firstName} ${data.lastName}`;
              const body = `Name: ${data.firstName} ${data.lastName}\n` +
                `Email: ${data.email}\n\n` +
                `Message:\n${data.message}`;
              
              const mailtoUrl = `mailto:info@nyalicrossfitgym.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              window.location.href = mailtoUrl;
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <input required name="firstName" type="text" className="w-full bg-brand-charcoal border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <input required name="lastName" type="text" className="w-full bg-brand-charcoal border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input required name="email" type="email" className="w-full bg-brand-charcoal border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea required name="message" rows={4} className="w-full bg-brand-charcoal border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Tell us about your fitness goals..." />
            </div>
            <Button type="submit" size="lg" className="w-full bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black border-none font-bold">Send Message</Button>
          </form>
        </div>

        {/* Map */}
        <div className="bg-brand-charcoal relative h-96 lg:h-auto">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.957646698664!2d39.6994!3d-4.0355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012e5c74768d9%3A0x6b8f3e2b2b2b2b2b!2sPromenade%20Mall!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
            allowFullScreen 
            loading="lazy"
            title="Gym Location"
          />
          
          <div className="absolute bottom-8 left-8 bg-brand-black/90 backdrop-blur p-6 rounded-xl border border-white/10 max-w-xs">
            <h4 className="text-white font-heading font-bold mb-2 flex items-center"><Clock className="h-4 w-4 text-brand-accent mr-2" /> Opening Hours</h4>
            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex justify-between"><span>Mon - Fri</span> <span>05:00 - 22:00</span></div>
              <div className="flex justify-between"><span>Saturday</span> <span>06:00 - 18:00</span></div>
              <div className="flex justify-between"><span>Sunday</span> <span>09:00 - 16:00</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
