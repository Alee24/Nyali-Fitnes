import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
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
    { name: 'Community', path: '/community' },
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
            />
            <span className="font-heading text-2xl font-bold tracking-wider text-white hidden sm:block">
              NYALI <span className="text-brand-accent">CROSSFIT & GYM</span>
            </span>
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
              />
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                NYALI <span className="text-brand-accent">CROSSFIT & GYM</span>
              </span>
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
              <li className="pt-2 text-brand-accent">+254 743 040 404</li>
              <li>info@nyalicrossfitgym.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between"><span>Mon - Fri</span> <span>05:30 - 20:00</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>07:00 - 13:00</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center">
          <span>&copy; {new Date().getFullYear()} Nyali Crossfit & Gym. All rights reserved.</span>
          <span className="mt-2 md:mt-0">
            Developed by <a href="https://www.kkdes.co.ke" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition-colors">KKDES</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
