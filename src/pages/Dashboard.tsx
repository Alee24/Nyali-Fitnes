import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Calendar, Clock, Trophy, TrendingUp, LogOut, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ScrollReveal } from '@/components/Animations';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
        fetchBookings(user.id);
      }
    });
  }, [navigate]);

  const fetchBookings = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, status,
          schedule (
            start_time,
            classes (title, duration_minutes),
            coaches (name)
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'confirmed')
        .order('schedule(start_time)', { ascending: true });

      if (error) throw error;
      
      // Flatten data structure slightly for easier rendering
      const formatted = data.map((b: any) => ({
        id: b.id,
        status: b.status,
        title: b.schedule.classes.title,
        coach: b.schedule.coaches?.name || 'Staff',
        startTime: new Date(b.schedule.start_time),
        duration: b.schedule.classes.duration_minutes
      })).filter((b: any) => b.startTime > new Date()); // Only show future bookings for "upcoming"

      setBookings(formatted);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
      
      // Remove from local state
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (error) {
      console.error('Error cancelling:', error);
      alert('Failed to cancel booking.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Welcome back, {user.email?.split('@')[0]}</h1>
            <p className="text-gray-400">Ready to crush today's WOD?</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
             <Link to="/schedule">
              <Button>Book Class</Button>
            </Link>
            <Button variant="outline" size="sm" className="h-12" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <ScrollReveal delay={0}>
            <div className="bg-brand-charcoal p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-medium">Upcoming Classes</h3>
                <Calendar className="h-5 w-5 text-brand-accent" />
              </div>
              <p className="text-3xl font-bold text-white">{bookings.length}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-brand-charcoal p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-medium">Current Streak</h3>
                <TrendingUp className="h-5 w-5 text-brand-accent" />
              </div>
              <p className="text-3xl font-bold text-white">0 <span className="text-sm text-gray-500 font-normal">days</span></p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-brand-charcoal p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-medium">Personal Records</h3>
                <Trophy className="h-5 w-5 text-brand-accent" />
              </div>
              <p className="text-3xl font-bold text-white">0 <span className="text-sm text-gray-500 font-normal">new!</span></p>
            </div>
          </ScrollReveal>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-4 font-heading font-bold uppercase tracking-wider ${
              activeTab === 'upcoming' 
                ? 'text-brand-accent border-b-2 border-brand-accent' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upcoming Classes
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-4 font-heading font-bold uppercase tracking-wider ${
              activeTab === 'history' 
                ? 'text-brand-accent border-b-2 border-brand-accent' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
        </div>

        {/* Content */}
        <div className="bg-brand-charcoal rounded-xl border border-white/5 p-6 min-h-[300px]">
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-500">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-10">
                  <AlertTriangle className="h-10 w-10 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">You have no upcoming classes.</p>
                  <Link to="/schedule">
                    <Button variant="outline">Book a Class</Button>
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-brand-black/50 rounded-lg border border-white/5 hover:border-brand-accent/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-accent/10 p-3 rounded-lg text-brand-accent">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{booking.title}</h4>
                        <p className="text-sm text-gray-400">
                          {booking.startTime.toLocaleDateString()} • {booking.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {booking.coach}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="text-center text-gray-400 py-10">
              <p>No past classes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
