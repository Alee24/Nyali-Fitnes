import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { Calendar as CalendarIcon, Clock, User, AlertCircle, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ScheduleWithDetails } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal } from '@/components/Animations';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<string>('');
  const [schedules, setSchedules] = useState<ScheduleWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  // Generate next 7 days for the tabs
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      label: date.toLocaleDateString('en-US', { weekday: 'long' }),
      dateString: date.toISOString().split('T')[0], // YYYY-MM-DD
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  useEffect(() => {
    // Set initial active day to today
    setActiveDay(days[0].dateString);
    
    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (activeDay) {
      fetchSchedule(activeDay);
    }
  }, [activeDay, user]); // Re-fetch when day changes or user logs in (to update booked status)

  const fetchSchedule = async (dateStr: string) => {
    setLoading(true);
    try {
      // 1. Get schedules for the day
      const startOfDay = `${dateStr}T00:00:00`;
      const endOfDay = `${dateStr}T23:59:59`;

      const { data, error } = await supabase
        .from('schedule')
        .select(`
          id, start_time, end_time, capacity,
          classes (title, duration_minutes, intensity),
          coaches (name)
        `)
        .gte('start_time', startOfDay)
        .lte('start_time', endOfDay)
        .order('start_time');

      if (error) throw error;

      // 2. Get booking counts and user status for these schedules
      const enrichedData = await Promise.all(data.map(async (item: any) => {
        // Get booking count
        const { count } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('schedule_id', item.id)
          .eq('status', 'confirmed');

        // Check if current user booked
        let userBooked = false;
        if (user) {
          const { data: booking } = await supabase
            .from('bookings')
            .select('id')
            .eq('schedule_id', item.id)
            .eq('user_id', user.id)
            .eq('status', 'confirmed')
            .single();
          userBooked = !!booking;
        }

        return {
          ...item,
          booking_count: count || 0,
          user_booked: userBooked
        };
      }));

      setSchedules(enrichedData);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (scheduleId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(scheduleId);
    try {
      // Call the Postgres function we defined in schema
      const { data, error } = await supabase.rpc('book_class', {
        p_schedule_id: scheduleId,
        p_user_id: user.id
      });

      if (error) throw error;

      if (data.success) {
        // Refresh data to show updated status
        fetchSchedule(activeDay);
        alert('Class booked successfully!');
      } else {
        alert(data.message);
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      alert('Failed to book class. Please try again.');
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="bg-brand-charcoal py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-heading font-normal text-white mb-6 tracking-wide">Class Schedule</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Book your spot in our daily WODs, specialty classes, or open gym sessions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-2 no-scrollbar">
          {days.map((day) => (
            <button
              key={day.dateString}
              onClick={() => setActiveDay(day.dateString)}
              className={`flex-shrink-0 px-6 py-4 rounded-lg font-heading font-bold uppercase tracking-wider text-sm transition-all border ${
                activeDay === day.dateString 
                  ? 'bg-brand-accent text-brand-black border-brand-accent transform scale-105' 
                  : 'bg-brand-charcoal text-gray-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              <span className="block text-xs opacity-70 mb-1">{day.displayDate}</span>
              <span className="text-lg">{day.label}</span>
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4 min-h-[400px]">
          {loading ? (
            <div className="text-center py-20 text-gray-500 animate-pulse">Loading schedule...</div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-20 bg-brand-charcoal rounded-xl border border-white/5">
              <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-white font-heading mb-2">No Classes Scheduled</h3>
              <p className="text-gray-500">Check back later or try another day.</p>
            </div>
          ) : (
            schedules.map((session, index) => {
              const startTime = new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const isFull = (session.booking_count || 0) >= session.capacity;
              
              return (
                <ScrollReveal key={session.id} delay={index * 0.05} width="100%">
                  <div className="bg-brand-charcoal border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between hover:border-brand-accent/30 transition-colors group relative overflow-hidden">
                    {/* Left: Time & Info */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto mb-6 md:mb-0">
                      <div className="flex flex-col items-center justify-center w-28 h-28 bg-brand-black rounded-lg border border-white/10 group-hover:border-brand-accent/50 transition-colors shrink-0">
                        <Clock className="h-6 w-6 text-brand-accent mb-2" />
                        <span className="text-white font-heading text-2xl tracking-wide">{startTime}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase">{session.classes.duration_minutes} min</span>
                      </div>
                      
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-heading text-white mb-2 tracking-wide">{session.classes.title}</h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                          <span className="flex items-center"><User className="h-4 w-4 mr-2 text-brand-accent" /> {session.coaches?.name || 'Staff'}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${
                            session.classes.intensity === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 
                            session.classes.intensity === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' : 
                            'border-blue-500/30 text-blue-400 bg-blue-500/10'
                          }`}>
                            {session.classes.intensity} Intensity
                          </span>
                          <span className="text-xs">
                            {session.booking_count} / {session.capacity} Spots
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action */}
                    <div className="w-full md:w-auto">
                      {session.user_booked ? (
                        <Button disabled className="w-full md:w-40 bg-green-500/20 text-green-400 border border-green-500/50 cursor-default">
                          <Check className="mr-2 h-4 w-4" /> Booked
                        </Button>
                      ) : isFull ? (
                        <Button disabled className="w-full md:w-40 bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed">
                          Full
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleBook(session.id)}
                          disabled={!!bookingLoading}
                          className="w-full md:w-40"
                        >
                          {bookingLoading === session.id ? 'Booking...' : 'Book Now'}
                        </Button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
