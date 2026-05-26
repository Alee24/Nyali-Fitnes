import { useState } from 'react';
import { Shield, Eye, Database, Cookie, Key, HelpCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection');

  const sections = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            At Nyali CrossFit & Gym, your privacy is a priority. We collect personal information to provide you with tailored fitness coaching, manage your membership, and communicate key updates.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Types of Data We Collect</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-brand-accent">Identity Data:</strong> Full name, date of birth, gender, and national identification number or passport number (where required).</li>
            <li><strong className="text-brand-accent">Contact Data:</strong> Email address, phone number (WhatsApp details), and physical home address.</li>
            <li><strong className="text-brand-accent">Health & Fitness Data:</strong> PAR-Q questionnaire responses, physical assessment results, injuries, and medical clearance details provided by you to guarantee safety in CrossFit and high-intensity workouts.</li>
            <li><strong className="text-brand-accent">Financial Data:</strong> Bank account or mobile payment (e.g., M-Pesa) receipts and transactions. We do not store raw card credentials; they are securely processed by authorized third-party gateways.</li>
            <li><strong className="text-brand-accent">Usage Data:</strong> Class attendance records, gym check-in timestamps, and interactions with our member web app.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'use',
      title: '2. How We Use Your Data',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We use your personal data in compliance with Kenyan data protection laws. Your data is used exclusively to facilitate and improve your training experience at Nyali CrossFit & Gym.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Primary Purposes</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>To process your membership, register accounts, and manage class bookings.</li>
            <li>To customize class instructions and weights based on your safety profiles, injuries, and fitness levels.</li>
            <li>To process billing transactions and avoid interruptions in your membership.</li>
            <li>To send critical alerts such as schedule changes, class cancellations, or emergency notifications.</li>
            <li>To distribute marketing newsletters, training tips, and gym event invitations (you can opt-out at any time).</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'protection',
      title: '3. Data Security & Sharing',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We implement comprehensive security protocols to guard your personal data against unauthorized access, loss, or alteration.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Security Measures</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Strict access controls limiting data viewability exclusively to active trainers and administrators.</li>
            <li>Use of industry-standard encrypted channels for secure web traffic and Supabase database interactions.</li>
            <li>No paper sheets with sensitive physical check-ins are stored in public view; all information is digitized.</li>
          </ul>
          <h4 className="text-white font-bold text-lg mt-4">Information Sharing</h4>
          <p className="text-gray-300 leading-relaxed">
            We <strong className="text-brand-accent">never sell or rent</strong> your personal data. We only share information with third-party service providers (like payment processors and cloud hosting engines) who operate under strict non-disclosure terms to enable gym processes.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      title: '4. Cookies & Tracking',
      icon: Cookie,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Our website and online apps utilize standard cookies and local storage tokens to enhance user navigation and optimize platform performance.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Usage Types</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-brand-accent">Essential Cookies:</strong> Critical files needed to remember your login state, security validations, and class booking preferences.</li>
            <li><strong className="text-brand-accent">Performance Cookies:</strong> Anonymous analytical files (e.g., Google Analytics) that help us measure website traffic and user patterns to improve UI speed.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            You can modify your browser settings to decline cookies if preferred; however, certain interactive segments of our class booking portal may not function fully as a result.
          </p>
        </div>
      ),
    },
    {
      id: 'rights',
      title: '5. Your Rights',
      icon: Key,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Under Kenyan privacy laws, you possess absolute control over your personal data. You have the right to access, modify, or restrict the usage of your data.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Available Actions</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-brand-accent">Access & Export:</strong> Request a complete summary of all personal information we store under your profile.</li>
            <li><strong className="text-brand-accent">Correction:</strong> Edit incorrect information, contact details, or safety/injury history.</li>
            <li><strong className="text-brand-accent">Erasure:</strong> Request the deletion of your account and related files once you terminate your membership.</li>
            <li><strong className="text-brand-accent">Opt-Out:</strong> Unsubscribe from non-essential emails or texts by clicking unsubscribe links or writing to us.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      title: '6. Privacy Contacts',
      icon: HelpCircle,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, wish to exercise any of your data rights, or submit a complaint, please contact our Data Compliance Officer.
          </p>
          <div className="bg-brand-black border border-white/5 rounded-xl p-6 mt-4 space-y-2 font-sans text-sm">
            <p className="text-gray-400"><strong className="text-white">Officer:</strong> Nyali Gym Data Compliance Team</p>
            <p className="text-gray-400"><strong className="text-white">Email:</strong> privacy@nyalicrossfitgym.com</p>
            <p className="text-gray-400"><strong className="text-white">Address:</strong> Promenade Mall Links Rd, Mombasa, Kenya</p>
            <p className="text-gray-400"><strong className="text-white">Phone:</strong> +254 743 040 404</p>
          </div>
        </div>
      ),
    },
  ];

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-b from-brand-charcoal to-brand-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 tracking-wider">
              Privacy <span className="text-brand-accent">Policy</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-sans">
              Learn how we collect, utilize, and protect your identity and health records at Nyali CrossFit & Gym.
            </p>
            <div className="mt-4 text-xs text-gray-500 font-sans">
              Last Updated: May 2026
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sticky Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-brand-charcoal border border-white/10 rounded-xl p-4 space-y-1">
              <h3 className="font-heading text-lg font-bold text-white px-3 pb-3 border-b border-white/5 uppercase tracking-wider">
                Table of Contents
              </h3>
              <div className="pt-3 space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollTo(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-semibold transition-all duration-200 group border ${
                        isActive
                          ? 'bg-brand-accent text-brand-black font-bold border-brand-accent shadow-lg shadow-brand-accent/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isActive ? 'text-brand-black scale-110' : 'text-gray-300 group-hover:text-brand-accent'
                      }`} />
                      <span className="truncate">{section.title.split('. ')[1]}</span>
                      <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        isActive ? 'text-brand-black rotate-90' : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-1'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="lg:col-span-3 space-y-10">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className="bg-brand-charcoal border border-white/10 rounded-2xl p-6 md:p-8 hover:border-brand-accent/30 transition-all duration-300 shadow-xl"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
                    <div className="p-3 bg-brand-black rounded-xl border border-white/5 text-brand-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wider">
                      {section.title}
                    </h2>
                  </div>
                  <div className="font-sans text-gray-300 space-y-4">
                    {section.content}
                  </div>
                </motion.section>
              );
            })}

            {/* Footer Summary / Call to Action */}
            <div className="bg-gradient-to-r from-brand-charcoal to-brand-black border border-white/10 rounded-2xl p-8 text-center space-y-4">
              <h3 className="font-heading text-2xl font-bold text-white tracking-wider">
                Concerned about Data Security?
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                We are fully committed to compliance with data preservation and integrity policies. Get in touch if you wish to query or terminate your active logs.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:privacy@nyalicrossfitgym.com"
                  className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-200 bg-brand-accent text-brand-black hover:bg-brand-accent-hover skew-x-[-10deg] h-12 px-6 text-base"
                >
                  <span className="skew-x-[10deg]">Email Data Officer</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
