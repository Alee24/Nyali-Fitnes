import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { Clock, User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingModal } from '@/components/BookingModal';

// Weekly Schedule Template (repeats year-round)
// 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const WEEKLY_TEMPLATE: { [key: number]: any[] } = {
  // Monday
  1: [
    {
      id: 'mon-1',
      title: 'NCG // Engine',
      start_time: '06:00',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Group Training Area',
      intensity: 'High'
    },
    {
      id: 'mon-2',
      title: 'HYROX TECHNIQUE',
      start_time: '13:30',
      duration_minutes: 35,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Medium'
    },
    {
      id: 'mon-3',
      title: 'HYROX INTRO',
      start_time: '18:00',
      duration_minutes: 15,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Low'
    },
    {
      id: 'mon-4',
      title: 'NCG X HERA',
      start_time: '18:15',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'mon-5',
      title: 'NCG // Powerlift',
      start_time: '19:30',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    }
  ],
  // Tuesday
  2: [
    {
      id: 'tue-1',
      title: 'HYROX // Strength',
      start_time: '06:00',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Group Training Area',
      intensity: 'High'
    },
    {
      id: 'tue-2',
      title: 'HYROX TECHNIQUE',
      start_time: '12:00',
      duration_minutes: 35,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Medium'
    },
    {
      id: 'tue-3',
      title: 'HYROX TECHNIQUE',
      start_time: '17:00',
      duration_minutes: 30,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Medium'
    },
    {
      id: 'tue-4',
      title: 'Bulletproof',
      start_time: '18:45',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'PT Mezzanine',
      intensity: 'High'
    }
  ],
  // Wednesday
  3: [
    {
      id: 'wed-1',
      title: 'HYROX',
      start_time: '06:00',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Group Training Area',
      intensity: 'High'
    },
    {
      id: 'wed-2',
      title: 'HYROX // BLAST',
      start_time: '13:00',
      duration_minutes: 30,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'wed-3',
      title: 'Induction - Functional',
      start_time: '17:00',
      duration_minutes: 30,
      coach: 'Gym Instructor',
      location: 'Functional Area',
      intensity: 'Low'
    },
    {
      id: 'wed-4',
      title: 'HYROX INTRO',
      start_time: '18:00',
      duration_minutes: 15,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Low'
    },
    {
      id: 'wed-5',
      title: 'HYROX // INTERVALS',
      start_time: '18:15',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    }
  ],
  // Thursday
  4: [
    {
      id: 'thu-1',
      title: 'NCG // Engine',
      start_time: '06:00',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Group Training Area',
      intensity: 'High'
    },
    {
      id: 'thu-2',
      title: 'HYROX // BLAST',
      start_time: '12:30',
      duration_minutes: 30,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'thu-3',
      title: 'HYROX // Strength',
      start_time: '18:15',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    }
  ],
  // Friday
  5: [
    {
      id: 'fri-1',
      title: 'HYROX // INTERVALS',
      start_time: '06:00',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'fri-2',
      title: 'HYROX // Strength',
      start_time: '12:30',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'fri-3',
      title: 'NCG // Powerlift',
      start_time: '18:30',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    }
  ],
  // Saturday
  6: [
    {
      id: 'sat-1',
      title: 'NCG // TEAM SEND',
      start_time: '08:15',
      duration_minutes: 45,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'High'
    },
    {
      id: 'sat-2',
      title: 'Pull-up Master class',
      start_time: '08:45',
      duration_minutes: 75,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Medium'
    },
    {
      id: 'sat-3',
      title: 'Open Gym',
      start_time: '10:00',
      duration_minutes: 120,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Low'
    }
  ],
  // Sunday
  0: [
    {
      id: 'sun-1',
      title: 'Open Gym',
      start_time: '09:00',
      duration_minutes: 180,
      coach: 'Gym Instructor',
      location: 'Gym Floor',
      intensity: 'Low'
    },
    {
      id: 'sun-2',
      title: 'Yoga & Mobility',
      start_time: '10:00',
      duration_minutes: 60,
      coach: 'Gym Instructor',
      location: 'Studio',
      intensity: 'Low'
    }
  ]
};

export default function Schedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [weeklySchedules, setWeeklySchedules] = useState<{ [key: string]: any[] }>({});
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Helper to get Monday of the current week
  const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };

  useEffect(() => {
    // Initialize to this week's Monday
    setCurrentWeekStart(getMonday(new Date()));
  }, []);

  useEffect(() => {
    // Generate schedule for the selected week based on the template
    const grouped: { [key: string]: any[] } = {};
    
    // Iterate through 7 days starting from currentWeekStart (Monday)
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(currentWeekStart.getDate() + i);
      const dateKey = d.toISOString().split('T')[0];
      const dayIndex = d.getDay(); // 0-6
      
      // Get template classes for this day index
      const templateClasses = WEEKLY_TEMPLATE[dayIndex] || [];
      
      // Map template classes to specific date/time for this week
      grouped[dateKey] = templateClasses.map(template => {
        // Construct full ISO string for start_time
        const startDateTime = `${dateKey}T${template.start_time}:00`;
        
        return {
          ...template,
          start_time: startDateTime,
          // We don't strictly need end_time for display, but could calculate it if needed
        };
      });
    }

    setWeeklySchedules(grouped);
  }, [currentWeekStart]);

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newStart);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    return `00:${mins.toString().padStart(2, '0')}`;
  };

  // Generate days array for rendering headers
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return {
      date: d,
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const getClassColor = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('hyrox')) return 'bg-orange-500';
    if (t.includes('ncg') || t.includes('strength')) return 'bg-yellow-500';
    if (t.includes('cardio') || t.includes('sweat')) return 'bg-blue-500';
    if (t.includes('yoga') || t.includes('mobility')) return 'bg-green-500';
    if (t.includes('bulletproof')) return 'bg-gray-500';
    if (t.includes('induction')) return 'bg-cyan-400';
    if (t.includes('pull-up')) return 'bg-purple-600';
    if (t.includes('powerlift')) return 'bg-green-500';
    return 'bg-brand-accent';
  };

  const handleClassClick = (session: any) => {
    const date = new Date(session.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const time = formatTime(session.start_time);
    const duration = `${session.duration_minutes} min`;
    
    setSelectedClass({
      title: session.title,
      subtitle: `${date} at ${time} (${duration})`,
      description: `Coach: ${session.coach}`,
      type: 'Class'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingDetails={selectedClass} 
      />

      <div className="bg-brand-charcoal py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-normal text-white mb-2 tracking-wide">Class Schedule</h1>
              <p className="text-gray-400 font-light">
                Book your spot in our daily WODs and specialty classes.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-brand-black p-2 rounded-lg border border-white/10">
              <button 
                onClick={() => handleWeekChange('prev')}
                className="p-2 hover:bg-white/10 rounded-md text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-white font-heading tracking-widest min-w-[140px] text-center">
                {weekDays[0]?.month} {weekDays[0]?.dayNumber} - {weekDays[6]?.month} {weekDays[6]?.dayNumber}
              </span>
              <button 
                onClick={() => handleWeekChange('next')}
                className="p-2 hover:bg-white/10 rounded-md text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[1000px] grid grid-cols-7 gap-4">
            {/* Day Columns */}
            {weekDays.map((day) => (
              <div key={day.dateString} className="flex flex-col gap-4">
                {/* Header */}
                <div className="text-center py-4 bg-brand-charcoal border-b-2 border-brand-accent/50 rounded-t-lg">
                  <div className="text-brand-accent font-bold uppercase text-sm tracking-wider">{day.dayName}</div>
                  <div className="text-white font-heading text-2xl">{day.dayNumber} {day.month}</div>
                </div>

                {/* Classes */}
                <div className="flex flex-col gap-3">
                  {weeklySchedules[day.dateString]?.length === 0 ? (
                    <div className="p-4 text-center text-gray-600 text-sm italic bg-brand-charcoal/30 rounded-lg border border-white/5">
                      No classes
                    </div>
                  ) : (
                    weeklySchedules[day.dateString]?.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative bg-white text-brand-black p-3 rounded-lg border-l-4 border-brand-accent hover:translate-y-[-2px] transition-all duration-200 shadow-lg cursor-pointer"
                        style={{ borderLeftColor: getClassColor(session.title).replace('bg-', 'var(--color-') }}
                        onClick={() => handleClassClick(session)}
                      >
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getClassColor(session.title)}`} />
                        
                        <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                          <span className="font-bold text-lg leading-none">{formatTime(session.start_time)}</span>
                          <span className="text-xs font-mono text-gray-500">{formatDuration(session.duration_minutes)}</span>
                        </div>
                        
                        <h3 className="font-heading font-bold text-lg leading-tight mb-1 uppercase tracking-tight">
                          {session.title}
                        </h3>
                        
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-600 font-medium">
                            <User className="h-3 w-3 mr-1" />
                            {session.coach}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {session.location}
                          </div>
                        </div>

                        {/* Hover Overlay for Booking */}
                        <div className="absolute inset-0 bg-brand-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                          <Button 
                            size="sm" 
                            className="bg-brand-accent text-brand-black hover:bg-white border-none font-bold text-xs px-4"
                          >
                            Book Now
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
