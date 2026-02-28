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
    { id: 'mon-1', title: 'CrossFit', start_time: '05:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-2', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-3', title: 'CrossFit', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-4', title: 'Introduction', start_time: '08:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'mon-5', title: 'Female Only CrossFit', start_time: '08:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'mon-6', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'mon-7', title: 'Female Only CrossFit', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'mon-8', title: 'CrossFit', start_time: '14:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-9', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-10', title: 'Introduction', start_time: '17:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'mon-11', title: 'CrossFit', start_time: '17:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-12', title: 'CrossFit', start_time: '18:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-13', title: 'Introduction', start_time: '18:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'mon-14', title: 'CrossFit', start_time: '19:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'mon-15', title: 'CrossFit', start_time: '20:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Tuesday
  2: [
    { id: 'tue-1', title: 'CrossFit', start_time: '05:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-2', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-3', title: 'CrossFit', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-4', title: 'Introduction', start_time: '08:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'tue-5', title: 'Female Only CrossFit', start_time: '08:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'tue-6', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'tue-7', title: 'Female Only CrossFit', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'tue-8', title: 'CrossFit', start_time: '14:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-9', title: 'Introduction', start_time: '15:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'tue-10', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-11', title: 'Introduction', start_time: '17:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'tue-12', title: 'CrossFit', start_time: '17:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-13', title: 'Introduction', start_time: '18:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'tue-14', title: 'Upper Body', start_time: '18:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'tue-15', title: 'CrossFit', start_time: '19:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'tue-16', title: 'Spinning', start_time: '19:15', duration_minutes: 45, coach: 'Gym Instructor', location: 'Spin Studio', intensity: 'High' },
    { id: 'tue-17', title: 'CrossFit', start_time: '20:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Wednesday
  3: [
    { id: 'wed-1', title: 'CrossFit', start_time: '05:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-2', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-3', title: 'CrossFit', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-4', title: 'Female Only CrossFit', start_time: '08:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'wed-5', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'wed-6', title: 'Female Only Upper Body', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'wed-7', title: 'CrossFit', start_time: '14:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-8', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-9', title: 'Introduction', start_time: '17:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'wed-10', title: 'CrossFit', start_time: '17:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-11', title: 'CrossFit', start_time: '18:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-12', title: 'Introduction', start_time: '18:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'wed-13', title: 'CrossFit', start_time: '19:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'wed-14', title: 'CrossFit', start_time: '20:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Thursday
  4: [
    { id: 'thu-1', title: 'CrossFit', start_time: '05:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-2', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-3', title: 'CrossFit', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-4', title: 'Introduction', start_time: '08:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'thu-5', title: 'Female Only CrossFit', start_time: '08:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'thu-6', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'thu-7', title: 'Female Only CrossFit', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'thu-8', title: 'CrossFit', start_time: '14:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-9', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-10', title: 'Introduction', start_time: '17:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'thu-11', title: 'Introduction', start_time: '18:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'thu-12', title: 'Lower Body', start_time: '18:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'thu-13', title: 'CrossFit', start_time: '19:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'thu-14', title: 'Spinning', start_time: '19:15', duration_minutes: 45, coach: 'Gym Instructor', location: 'Spin Studio', intensity: 'High' },
    { id: 'thu-15', title: 'CrossFit', start_time: '20:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Friday
  5: [
    { id: 'fri-1', title: 'CrossFit', start_time: '05:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-2', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-3', title: 'CrossFit', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-4', title: 'Introduction', start_time: '08:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'fri-5', title: 'Female Only CrossFit', start_time: '08:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'fri-6', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'fri-7', title: 'Female Only CrossFit', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'fri-8', title: 'CrossFit', start_time: '14:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-9', title: 'Introduction', start_time: '15:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'fri-10', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-11', title: 'Introduction', start_time: '17:00', duration_minutes: 30, coach: 'Gym Instructor', location: 'Intro Area', intensity: 'Low' },
    { id: 'fri-12', title: 'CrossFit', start_time: '18:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'fri-13', title: 'CrossFit Open', start_time: '19:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Saturday
  6: [
    { id: 'sat-1', title: 'CrossFit', start_time: '06:15', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'sat-2', title: 'Full Body Mobility', start_time: '07:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Low' },
    { id: 'sat-3', title: 'CrossFit', start_time: '08:45', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'sat-4', title: 'Female Only CrossFit', start_time: '10:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'sat-5', title: 'Female Only Lower Body', start_time: '11:30', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Medium' },
    { id: 'sat-6', title: 'GENTS ICE BATH', start_time: '14:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Recovery Area', intensity: 'Low' },
    { id: 'sat-7', title: 'CrossFit', start_time: '15:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'sat-8', title: 'CrossFit', start_time: '16:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
    { id: 'sat-9', title: 'CrossFit', start_time: '17:00', duration_minutes: 60, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'High' },
  ],
  // Sunday
  0: [
    { id: 'sun-1', title: 'Open Gym', start_time: '09:00', duration_minutes: 180, coach: 'Gym Instructor', location: 'Crossfit Floor', intensity: 'Low' },
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
    if (t.includes('crossfit')) return 'bg-brand-accent';
    if (t.includes('introduction')) return 'bg-green-500';
    if (t.includes('female only')) return 'bg-purple-500';
    if (t.includes('upper body') || t.includes('lower body')) return 'bg-yellow-500';
    if (t.includes('spinning')) return 'bg-blue-500';
    if (t.includes('mobility')) return 'bg-teal-500';
    if (t.includes('ice bath')) return 'bg-cyan-400';
    return 'bg-gray-500';
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
                    (() => {
                      // Group sessions by start time
                      const sessions = weeklySchedules[day.dateString] || [];
                      const groups: { [key: string]: any[] } = {};
                      sessions.forEach(session => {
                        if (!groups[session.start_time]) {
                          groups[session.start_time] = [];
                        }
                        groups[session.start_time].push(session);
                      });
                      
                      // Sort groups by time
                      const sortedTimes = Object.keys(groups).sort();
                      
                      return sortedTimes.map((time) => (
                        <div key={time} className="flex gap-2">
                          {groups[time].map((session) => (
                            <motion.div
                              key={session.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex-1 min-w-0 group relative bg-white text-brand-black p-3 rounded-lg border-l-4 border-brand-accent hover:translate-y-[-2px] transition-all duration-200 shadow-lg cursor-pointer"
                              style={{ borderLeftColor: getClassColor(session.title).replace('bg-', 'var(--color-') }}
                              onClick={() => handleClassClick(session)}
                            >
                              <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getClassColor(session.title)}`} />
                              
                              <div className="flex justify-between items-end mb-2 border-b border-gray-200 pb-2">
                                <span className="font-bold text-lg leading-none">{formatTime(session.start_time)}</span>
                                <span className="text-xs font-mono text-gray-500">{formatDuration(session.duration_minutes)}</span>
                              </div>
                              
                              <h3 className="font-heading font-bold text-lg leading-tight mb-1 uppercase tracking-tight truncate">
                                {session.title}
                              </h3>
                              
                              <div className="space-y-1">
                                <div className="flex items-center text-xs text-gray-600 font-medium truncate">
                                  <User className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{session.coach}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 truncate">
                                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{session.location}</span>
                                </div>
                              </div>

                              {/* Hover Overlay for Booking */}
                              <div className="absolute inset-0 bg-brand-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                                <Button 
                                  size="sm" 
                                  className="bg-brand-accent text-brand-black hover:bg-white border-none font-bold text-xs px-4 whitespace-nowrap"
                                >
                                  Book Now
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ));
                    })()
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
