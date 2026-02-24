export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'member' | 'coach' | 'admin';
        };
      };
      classes: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          duration_minutes: number;
          intensity: 'Low' | 'Medium' | 'High' | 'Variable';
        };
      };
      coaches: {
        Row: {
          id: string;
          name: string;
          image_url: string | null;
        };
      };
      schedule: {
        Row: {
          id: string;
          class_id: string;
          coach_id: string | null;
          start_time: string;
          end_time: string;
          capacity: number;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          schedule_id: string;
          status: 'confirmed' | 'cancelled' | 'waitlist';
          created_at: string;
        };
      };
    };
  };
};

export type ScheduleWithDetails = {
  id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  classes: {
    title: string;
    duration_minutes: number;
    intensity: string;
  };
  coaches: {
    name: string;
  } | null;
  booking_count?: number;
  user_booked?: boolean;
};
