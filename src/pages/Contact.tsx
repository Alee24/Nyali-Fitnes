import { Button } from '@/components/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <img 
            src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-23-at-12.19.33-e1771950026733.jpeg" 
            alt="Nyali Crossfit & Gym Logo" 
            className="h-24 w-auto object-contain mb-8" 
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
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData);
              const message = `*Website Contact Form*\n\n` +
                `*Name:* ${data.firstName} ${data.lastName}\n` +
                `*Email:* ${data.email}\n` +
                `*Message:* ${data.message}`;
              
              const url = `https://wa.me/254743040404?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
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
            <Button type="submit" size="lg" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none">Send Message via WhatsApp</Button>
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
              <div className="flex justify-between"><span>Mon - Fri</span> <span>05:30 - 20:00</span></div>
              <div className="flex justify-between"><span>Saturday</span> <span>07:00 - 13:00</span></div>
              <div className="flex justify-between"><span>Sunday</span> <span>Closed</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
