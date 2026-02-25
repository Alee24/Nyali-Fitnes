import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function Schedule() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        bookingDetails={null} 
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
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
        <iframe 
          src="https://app.wodify.com/Public/ClassCalendarEntry.aspx?TenantKey=SYtBn7RkSv&Location_Id=10746&Program_Id=113177,114395,126900,127225,129583,134098,134185,135738,137694" 
          width="1200" 
          height="1100" 
          style={{ maxWidth: '100%', border: 'none' }}
          title="Wodify Class Calendar"
        />
      </div>
    </div>
  );
}
