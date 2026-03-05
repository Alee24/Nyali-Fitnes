import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Tag, CheckCircle2, Loader2, Mail } from 'lucide-react';
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !bookingDetails) return null;

  const handleClose = () => {
    if (status !== 'submitting') {
      setStatus('idle');
      setErrorMsg('');
      setFormData({ name: '', email: '', phone: '' });
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If it's a class, go to WhatsApp
    if (bookingDetails.type === 'Class') {
      const body = `*Booking Request Details:*\n\n` +
        `*Item:* ${bookingDetails.title}\n` +
        (bookingDetails.subtitle ? `*Details:* ${bookingDetails.subtitle}\n` : '') +
        (bookingDetails.description ? `*Info:* ${bookingDetails.description}\n` : '') +
        `\n*Attendee Details:*\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}`;

      const whatsappUrl = `https://wa.me/254743040404?text=${encodeURIComponent(body)}`;
      window.open(whatsappUrl, '_blank');
      handleClose();
      return;
    }

    // For everything else, go directly to email via FormSubmit
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('https://formsubmit.co/ajax/info@nyalicrossfitgym.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          _subject: `New ${bookingDetails.type} Booking from ${formData.name}`,
          _template: 'table',
          Item: bookingDetails.title,
          Details: bookingDetails.subtitle || 'N/A',
          Info: bookingDetails.description || 'N/A'
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-charcoal border border-white/10 rounded-none w-full max-w-md overflow-hidden shadow-2xl relative"
        >
          <div className="h-1 w-full bg-brand-accent absolute top-0 left-0" />

          <div className="flex justify-between items-center p-6 border-b border-white/10 mt-1">
            <h2 className="text-2xl font-heading text-white">Book {bookingDetails.type}</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-6"
              >
                <CheckCircle2 className="h-16 w-16 text-brand-accent mb-4" />
                <h2 className="text-2xl font-heading text-white mb-2">Request Sent!</h2>
                <p className="text-gray-400 mb-6">
                  We've received your request for <span className="text-white font-bold">{bookingDetails.title}</span>. Our team will contact you via email shortly.
                </p>
                <Button
                  onClick={handleClose}
                  className="bg-brand-accent hover:bg-white hover:text-brand-black transition-all duration-300 w-full"
                >
                  Close
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="bg-brand-black/50 p-4 rounded-none border-l-4 border-brand-accent space-y-2">
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
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-black border border-white/10 rounded-none px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-black border border-white/10 rounded-none px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-brand-black border border-white/10 rounded-none px-4 py-3 text-white focus:border-brand-accent focus:outline-none transition-colors text-sm"
                      placeholder="+254..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">{errorMsg}</p>
                  )}

                  {bookingDetails.type === 'Class' ? (
                    <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none mt-4 font-bold rounded-none h-12">
                      Confirm Booking via WhatsApp
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-brand-accent hover:bg-white hover:text-brand-black text-brand-black font-bold uppercase tracking-widest transition-all h-12 rounded-none mt-4"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Mail className="h-4 w-4" /> Send Request
                        </span>
                      )}
                    </Button>
                  )}
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

