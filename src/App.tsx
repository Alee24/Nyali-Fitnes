import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '@/components/Layout';
import { useEffect } from 'react';

// Pages
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import Coaches from '@/pages/Coaches';
import Schedule from '@/pages/Schedule';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Admin from '@/pages/Admin';
import CrossFit from '@/pages/CrossFit';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  // Hide Navbar/Footer on login/dashboard/admin for a cleaner app-like feel
  const isAppRoute = ['/login', '/dashboard', '/admin'].some(route => pathname.startsWith(route));

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-brand-black">
      <ScrollToTop />
      {!isAppRoute && <Navbar />}
      <main className={!isAppRoute ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crossfit" element={<CrossFit />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/classes" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAppRoute && <Footer />}
    </div>
  );
}
