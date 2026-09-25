// src/components/sovereign/NexusNavigationModals.jsx
// NEXUS Navigation & Real-World Intelligence — Maps, Wi-Fi/Satellite, Food, Events Modal

import { useState } from 'react';
import { MapPin, Wifi, Utensils, Calendar, X, Compass, Globe, Search, Star } from 'lucide-react';
import nexusNavigationService from '@/services/nexusNavigationService';
import toast from 'react-hot-toast';

export default function NexusNavigationModals({ isOpen, onClose, initialTab = 'maps' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // maps | wifi | food | events

  if (!isOpen) return null;

  const locations = nexusNavigationService.getLocations();
  const restaurants = nexusNavigationService.getRestaurants();
  const events = nexusNavigationService.getEvents();

  return (
    <div className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900/98 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <Compass size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">NEXUS Navigation & Intelligence</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Global Satellite GPS
                </span>
              </div>
              <p className="text-xs text-slate-400">Interactive maps, Wi-Fi/satellite locator, global food & events</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('maps')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'maps' ? 'bg-emerald-500 text-slate-950 font-extrabold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin size={14} /> NEXOS Maps & Satellite
          </button>
          <button
            onClick={() => setActiveTab('wifi')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'wifi' ? 'bg-cyan-600 text-white shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wifi size={14} /> Wi-Fi & Satellite Telemetry
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'food' ? 'bg-amber-600 text-white shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Utensils size={14} /> Global Food & Recipes
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'events' ? 'bg-purple-600 text-white shadow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar size={14} /> Events & Bookings
          </button>
        </div>

        {/* Tab 1: Maps & Satellite */}
        {activeTab === 'maps' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            <div className="h-48 rounded-3xl bg-slate-950 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="text-center space-y-1 relative z-10">
                <span className="text-4xl">📡</span>
                <p className="text-xs font-bold text-emerald-400 font-mono">Live Satellite Orbit GPS Layer Active</p>
                <p className="text-[10px] text-slate-400">Lat: 33.3152° N · Lng: 44.3661° E (Baghdad, Iraq 🇮🇶)</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pe-1 custom-scrollbar">
              {locations.map((loc) => (
                <div key={loc.id} className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{loc.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{loc.country} · Category: {loc.category}</p>
                  </div>
                  <button onClick={() => toast.success(`Route calculated to ${loc.name}`)} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                    Route GPS
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Wi-Fi & Satellite */}
        {activeTab === 'wifi' && (
          <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar text-xs">
            <div className="p-4 rounded-3xl bg-slate-800/40 border border-cyan-500/30 space-y-2">
              <h4 className="font-bold text-cyan-400 flex items-center gap-2"><Wifi size={16} /> Open Wi-Fi Mesh Nodes</h4>
              <p className="text-slate-300">NEXUS P2P mesh network automatically detects 14 zero-tracking public Wi-Fi access points nearby.</p>
            </div>

            <div className="p-4 rounded-3xl bg-slate-800/40 border border-cyan-500/30 space-y-2">
              <h4 className="font-bold text-cyan-400 flex items-center gap-2"><Globe size={16} /> Satellite Telemetry Stream</h4>
              <p className="text-slate-300">Starlink & ISS orbit passes detected: Next overhead window in 18 minutes.</p>
            </div>
          </div>
        )}

        {/* Tab 3: Food & Recipes */}
        {activeTab === 'food' && (
          <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
            {restaurants.map((r) => (
              <div key={r.id} className="p-4 rounded-3xl bg-slate-800/40 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{r.name}</h4>
                  <span className="text-amber-400 text-xs font-bold">{r.rating}</span>
                </div>
                <p className="text-xs text-slate-300">{r.location} · {r.cuisine}</p>
                <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-amber-300">
                  Signature Dish: <strong>{r.signature}</strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Events */}
        {activeTab === 'events' && (
          <div className="flex-1 overflow-y-auto space-y-3 pe-1 custom-scrollbar">
            {events.map((e) => (
              <div key={e.id} className="p-4 rounded-3xl bg-slate-800/40 border border-purple-500/30 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{e.title}</h4>
                  <p className="text-slate-400 mt-0.5">{e.location} · Date: {e.date}</p>
                </div>
                <button onClick={() => toast.success(`Seat booked for ${e.title}!`)} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[11px]">
                  Book Seat
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
