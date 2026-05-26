import { useState } from 'react';
import { Shield, FileText, AlertTriangle, Scale, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Terms() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    {
      id: 'intro',
      title: '1. Introduction',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Welcome to Nyali CrossFit & Gym. These Terms and Conditions govern your membership, participation in classes, and use of our facilities located at Promenade Mall, Links Rd, Mombasa, Kenya, as well as our website and online services.
          </p>
          <p className="text-gray-300 leading-relaxed">
            By signing a membership agreement, purchasing a pass, booking a class, or entering our facility, you agree to be fully bound by these Terms and Conditions. Please read them carefully.
          </p>
          <p className="text-gray-300 leading-relaxed">
            In these terms, "we," "us," "our," and "Nyali CrossFit" refer to Nyali CrossFit & Gym. "Member," "you," and "your" refer to any member, guest, or visitor to our gym.
          </p>
        </div>
      ),
    },
    {
      id: 'membership',
      title: '2. Membership & Access',
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            All members must complete a physical or digital membership registration, including a Health Questionnaire (PAR-Q) and a Liability Waiver, prior to using any gym equipment or participating in any training session.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Membership Types & Payments</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Memberships are non-transferable and non-refundable.</li>
            <li>Fees must be paid in advance. Monthly subscriptions auto-renew on your billing date unless canceled in writing.</li>
            <li>We offer flexible daily passes, weekly packages, monthly memberships, and annual commitments. Prices are displayed at our reception and on our pricing page.</li>
            <li>Nyali CrossFit & Gym reserves the right to adjust membership rates with a minimum of 30 days notice to active members.</li>
          </ul>
          <h4 className="text-white font-bold text-lg mt-4">Access Rules</h4>
          <p className="text-gray-300 leading-relaxed">
            Members must check in at the front desk upon arrival. Access may be denied if your account is in arrears or if you violate gym rules.
          </p>
        </div>
      ),
    },
    {
      id: 'conduct',
      title: '3. Conduct & Safety',
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Nyali CrossFit & Gym is a community dedicated to support, progress, and mutual respect. We expect all members to maintain high standards of sportsmanship, hygiene, and safe training habits.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Key Gym Rules</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-brand-accent">Safety First:</strong> Follow the instructions of our certified coaches at all times. Do not perform movements you cannot control safely.</li>
            <li><strong className="text-brand-accent">Re-rack & Clean:</strong> Return all barbells, plates, dumbbells, kettlebells, and accessories to their designated storage after use. Wipe down equipment with provided sanitizers.</li>
            <li><strong className="text-brand-accent">Appropriate Attire:</strong> Clean athletic apparel and closed-toe training shoes are mandatory. Lifting barefoot or in sandals is prohibited unless specified by a coach for certain movements.</li>
            <li><strong className="text-brand-accent">No Harassment:</strong> We maintain a zero-tolerance policy for bullying, harassment, discrimination, or abusive language. Violations will result in immediate termination of membership without refund.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'waiver',
      title: '4. Liability & Waiver',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-lg p-4 mb-4">
            <h4 className="text-brand-accent font-heading font-bold text-lg flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" /> Important Assumption of Risk
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Physical exercise, high-intensity training, Olympic weightlifting, and CrossFit involve inherent risks of injury, illness, or death. By participating, you acknowledge and voluntarily accept these risks.
            </p>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Before commencing any training at Nyali CrossFit & Gym, you represent that you are in good physical condition and have no medical reason or impairment that would prevent you from training safely. If you have any pre-existing medical conditions, you must secure medical clearance from a licensed physician before starting.
          </p>
          <p className="text-gray-300 leading-relaxed">
            You agree to release, waive, and discharge Nyali CrossFit & Gym, its owners, coaches, staff, and affiliates from any and all liability, claims, or demands arising out of any injury, loss, damage, or death sustained while on gym premises or participating in gym activities, except in cases of gross negligence.
          </p>
        </div>
      ),
    },
    {
      id: 'cancellation',
      title: '5. Bookings & Cancellations',
      icon: Clock,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            Due to limited class sizes and high demand, we implement a structured booking and cancellation policy to ensure fair access for all athletes.
          </p>
          <h4 className="text-white font-bold text-lg mt-4">Class Reservations</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Classes must be booked in advance via our member app, website, or at reception.</li>
            <li>Reservations open up to 7 days in advance.</li>
          </ul>
          <h4 className="text-white font-bold text-lg mt-4">Cancellation Policy</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong className="text-brand-accent">Standard Classes:</strong> Cancellations must be made at least <strong className="text-white">2 hours</strong> prior to the class start time.</li>
            <li><strong className="text-brand-accent">Late Cancellations & No-Shows:</strong> Failure to cancel in time or missing a reserved class may result in a forfeit of that session (for class card holders) or a suspension of advance booking privileges (for unlimited monthly members) if repeated.</li>
            <li><strong className="text-brand-accent">Personal Training:</strong> Personal training sessions must be canceled or rescheduled with at least <strong className="text-white">24 hours</strong> notice. Failure to do so will result in the session being charged in full.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'legal',
      title: '6. Governing Law',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            These Terms and Conditions shall be governed by, construed, and enforced in accordance with the Laws of the Republic of Kenya.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Any dispute arising out of or in connection with these terms, including any question regarding their existence, validity, or termination, shall be subject to the exclusive jurisdiction of the competent courts of Mombasa, Kenya.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If any provision of these terms is found to be invalid or unenforceable by a court of law, the remaining provisions will continue in full force and effect.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to amend these terms at any time. The most current version will always be posted on our website, and continued use of the gym constitutes acceptance of any updates.
          </p>
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
              Terms & <span className="text-brand-accent">Conditions</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-sans">
              Please read the rules, safety agreements, and terms of membership at Nyali CrossFit & Gym carefully.
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
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-brand-accent text-brand-black font-bold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isActive ? 'text-brand-black scale-110' : 'text-gray-400 group-hover:text-brand-accent'
                      }`} />
                      <span className="truncate">{section.title.split('. ')[1]}</span>
                      <ChevronRight className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        isActive ? 'text-brand-black rotate-90' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
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
                Have questions about our Terms?
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                If you have any questions, concerns, or need clarification regarding these Terms and Conditions, please feel free to reach out to our management team.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:info@nyalicrossfitgym.com"
                  className="inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-200 bg-brand-accent text-brand-black hover:bg-brand-accent-hover skew-x-[-10deg] h-12 px-6 text-base"
                >
                  <span className="skew-x-[10deg]">Contact Management</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
