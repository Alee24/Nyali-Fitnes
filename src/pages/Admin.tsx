import { useState } from 'react';
import { Button } from '@/components/Button';
import { MOCK_CLASSES, MOCK_COACHES } from '@/lib/supabase';
import { Plus, Edit, Trash2, Users, Calendar, Settings } from 'lucide-react';

export default function Admin() {
  const [activeSection, setActiveSection] = useState('classes');

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-brand-charcoal border-r border-white/5 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-heading font-bold text-white mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveSection('classes')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'classes' ? 'bg-brand-accent text-brand-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Calendar className="h-4 w-4 mr-3" /> Classes
              </button>
              <button
                onClick={() => setActiveSection('coaches')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'coaches' ? 'bg-brand-accent text-brand-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="h-4 w-4 mr-3" /> Coaches
              </button>
              <button
                onClick={() => setActiveSection('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'settings' ? 'bg-brand-accent text-brand-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="h-4 w-4 mr-3" /> Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-white capitalize">{activeSection} Management</h1>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add New</Button>
          </div>

          {activeSection === 'classes' && (
            <div className="bg-brand-charcoal rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black/20 text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Class Name</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Coach</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_CLASSES.map((cls) => (
                    <tr key={cls.id} className="text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{cls.title}</td>
                      <td className="px-6 py-4">{cls.time} ({cls.duration})</td>
                      <td className="px-6 py-4">{cls.coach}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded text-blue-400"><Edit className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-white/10 rounded text-red-400"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'coaches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_COACHES.map((coach) => (
                <div key={coach.id} className="bg-brand-charcoal rounded-xl border border-white/5 p-6 relative group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="p-2 bg-brand-black rounded-full text-blue-400 hover:text-white"><Edit className="h-4 w-4" /></button>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={coach.image} alt={coach.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-white font-bold">{coach.name}</h3>
                      <p className="text-sm text-brand-accent">{coach.specialty}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{coach.bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
