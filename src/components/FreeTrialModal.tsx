import React, { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { motion, AnimatePresence } from 'motion/react';

interface FreeTrialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FreeTrialModal({ isOpen, onClose }: FreeTrialModalProps) {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('https://formsubmit.co/ajax/info@nyalicrossfitgym.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    _subject: `New Free Trial Booking from ${form.name}`,
                    _template: 'table',
                }),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', phone: '', email: '' });
            } else {
                throw new Error('Submission failed');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Something went wrong. Please try again or call us directly.');
        }
    };

    const handleClose = () => {
        if (status !== 'submitting') {
            setStatus('idle');
            setErrorMsg('');
            setForm({ name: '', phone: '', email: '' });
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.4 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-brand-charcoal border border-white/10 w-full max-w-md rounded-none shadow-2xl pointer-events-auto relative overflow-hidden">
                            {/* Red accent top bar */}
                            <div className="h-1 w-full bg-brand-accent" />

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="p-8">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center text-center py-8"
                                    >
                                        <CheckCircle2 className="h-16 w-16 text-brand-accent mb-4" />
                                        <h2 className="text-2xl font-heading text-white mb-2">You're In!</h2>
                                        <p className="text-gray-400 mb-6">
                                            We've received your request. Our team will contact you shortly to schedule your <span className="text-brand-accent font-semibold">free trial class</span>.
                                        </p>
                                        <Button
                                            onClick={handleClose}
                                            className="bg-brand-accent hover:bg-white hover:text-brand-black transition-all duration-300"
                                        >
                                            Close
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Header */}
                                        <div className="mb-6">
                                            <span className="text-brand-accent text-xs font-bold tracking-widest uppercase">Limited Spots Available</span>
                                            <h2 className="text-3xl font-heading text-white mt-1">Book Your Free Trial</h2>
                                            <p className="text-gray-400 text-sm mt-2">
                                                Fill in your details and we'll reach out to schedule your first class — on us.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="trial-name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Full Name <span className="text-brand-accent">*</span>
                                                </label>
                                                <input
                                                    id="trial-name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="w-full bg-brand-black border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label htmlFor="trial-phone" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Phone Number <span className="text-brand-accent">*</span>
                                                </label>
                                                <input
                                                    id="trial-phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="+254 712 345 678"
                                                    className="w-full bg-brand-black border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="trial-email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                    Email Address <span className="text-brand-accent">*</span>
                                                </label>
                                                <input
                                                    id="trial-email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-brand-black border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
                                                />
                                            </div>

                                            {/* Error */}
                                            {status === 'error' && (
                                                <p className="text-red-400 text-sm">{errorMsg}</p>
                                            )}

                                            {/* Submit */}
                                            <Button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full bg-brand-accent hover:bg-white hover:text-brand-black transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Book My Free Trial'
                                                )}
                                            </Button>

                                            <p className="text-center text-xs text-gray-600 mt-2">
                                                No credit card required. First class is completely free.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
