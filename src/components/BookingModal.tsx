import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Tag } from 'lucide-react';
import { Button } from './Button';

export interface BookingDetails {
  title: string;
  subtitle?: string; // e.g., Date/Time for classes, Duration for memberships
  description?: string; // e.g., Coach for classes, Price for memberships
  type: 'Class' | 'Membership' | 'Package';
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails | null;
}

export function BookingModal({ isOpen, onClose, bookingDetails }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen || !bookingDetails) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Booking Request: ${bookingDetails.title}`;
    
    let body = `Booking Request Details:\n\n` +
      `Item: ${bookingDetails.title}\n`;

    if (bookingDetails.subtitle) {
      body += `Details: ${bookingDetails.subtitle}\n`;
    }
    if (bookingDetails.description) {
      body += `Info: ${bookingDetails.description}\n`;
    }

    body += `\nAttendee Details:\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}`;

    const mailtoUrl = `mailto:info@nyalicrossfitgym.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-charcoal border border-white/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-2xl font-heading text-white">Book {bookingDetails.type}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-brand-black/50 p-4 rounded-lg space-y-2 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">{bookingDetails.title}</h3>
              
              {bookingDetails.subtitle && (
                <div className="flex items-center text-gray-400 text-sm">
                  {bookingDetails.type === 'Class' ? (
                    <Calendar className="h-4 w-4 mr-2 text-brand-accent" />
                  ) : (
                    <Clock className="h-4 w-4 mr-2 text-brand-accent" />
                  )}
                  {bookingDetails.subtitle}
                </div>
              )}
              
              {bookingDetails.description && (
                <div className="flex items-center text-gray-400 text-sm">
                  {bookingDetails.type === 'Class' ? (
                    <User className="h-4 w-4 mr-2 text-brand-accent" />
                  ) : (
                    <Tag className="h-4 w-4 mr-2 text-brand-accent" />
                  )}
                  {bookingDetails.description}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-brand-black border border-white/10 rounded px-4 py-2 text-white focus:border-brand-accent focus:outline-none"
                  placeholder="+254..."
                />
              </div>

              <Button type="submit" className="w-full bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black border-none mt-4 font-bold">
                Confirm Booking via Email
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

