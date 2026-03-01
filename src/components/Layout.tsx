import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Classes', path: '/schedule' },
    { name: 'Membership', path: '/pricing' },
    { name: 'Our Facility', path: '/facility' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-brand-black border-b border-white/10 py-2",
        scrolled ? "shadow-lg" : ""
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-23-at-12.19.33-e1771950026733.jpeg" 
              alt="Nyali Crossfit & Gym Logo" 
              className="h-12 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-wider text-white leading-none">
                NYALI <span className="text-brand-accent">CROSSFIT & GYM</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest transition-colors relative group",
                    location.pathname === link.path ? "text-brand-accent" : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full",
                    location.pathname === link.path ? "w-full" : ""
                  )} />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-accent focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-md text-lg font-heading font-bold uppercase tracking-wider",
                    location.pathname === link.path ? "text-brand-accent bg-white/5" : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://mclinic.co.ke/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-23-at-12.19.33-e1771950026733.jpeg" 
                alt="Nyali Crossfit & Gym Logo" 
                className="h-12 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-wider text-white">
                  NYALI <span className="text-brand-accent">CROSSFIT & GYM</span>
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Forging elite fitness in Mombasa. Join our community of dedicated athletes and transform your life through functional movement.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/classes" className="hover:text-brand-accent transition-colors">Classes</Link></li>
              <li><Link to="/schedule" className="hover:text-brand-accent transition-colors">Schedule</Link></li>
              <li><Link to="/coaches" className="hover:text-brand-accent transition-colors">Coaches</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-accent transition-colors">Membership</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Promenade Mall Links Rd.</li>
              <li>Mombasa, Coast, Kenya</li>
              <li className="pt-2 text-brand-accent">
                <a href="https://wa.me/254743040404" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +254 743 040 404
                </a>
              </li>
              <li>info@nyalicrossfitgym.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>05:00 - 22:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>06:00 - 18:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>09:00 - 16:00</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a 
              href="https://www.instagram.com/nyalicrossfitgym/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.youtube.com/@NyaliCrossfitandGym" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-accent transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@nyalicrossfitgym" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-accent transition-colors"
              aria-label="TikTok"
            >
              <svg 
                className="h-5 w-5" 
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
              className="text-gray-400 hover:text-brand-accent transition-colors"
              aria-label="WhatsApp"
            >
              <svg 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                stroke="none"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
          <div className="text-center text-xs text-gray-600 flex flex-col md:flex-row items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Nyali Crossfit & Gym. All rights reserved.</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span>
              Developed by <a href="https://www.kkdes.co.ke" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition-colors">KKDES</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
