
import React from 'react';
import { UserRole, FoodDrop } from '../backend/types';
import { DIETARY_TAGS, CANADIAN_CITIES } from '../constant';
import { Navbar } from '../components/Navbar';
import { MapView } from '../components/MapView';
import { FoodCard } from '../components/FoodCard';
import { DonorDashboard } from '../components/DonorDashboard';
import { SMSView } from '../components/SMSView';
import { Button } from '../components/Button';
import { AuthView } from '../components/AuthView';
import { Logo } from '../components/Logo';

interface AppViewProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: { email: string; name: string } | null;
  view: string;
  setView: (view: string) => void;
  drops: FoodDrop[];
  selectedDrop: FoodDrop | null;
  setSelectedDrop: (drop: FoodDrop | null) => void;
  filter: string;
  setFilter: (filter: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isReserving: boolean;
  setIsReserving: (val: boolean) => void;
  reserveName: string;
  setReserveName: (val: string) => void;
  reservePhone: string;
  setReservePhone: (val: string) => void;
  onAddDrop: (drop: Partial<FoodDrop>) => void;
  onLogin: (role: UserRole, email: string) => void;
  onReserve: (e: React.FormEvent) => void;
}

export const AppView: React.FC<AppViewProps> = (props) => {
  const {
    role, setRole, user, view, setView, drops, selectedDrop, setSelectedDrop,
    filter, setFilter, selectedCity, setSelectedCity, isReserving, setIsReserving,
    reserveName, setReserveName, reservePhone, setReservePhone, onAddDrop, onLogin, onReserve
  } = props;

  const renderHero = () => (
    <div className="relative max-w-7xl mx-auto pt-40 pb-72 px-6">
      <div className="flex flex-col items-center text-center">
        <div className="fade-up inline-flex items-center space-x-3 px-10 py-5 rounded-[2rem] glass-light border border-amber-500/20 mb-16 shadow-[0_15px_40px_-10px_rgba(251,191,36,0.1)] group hover:scale-105 transition-transform">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_20px_#fbbf24] animate-pulse"></span>
          <span className="text-[11px] font-black text-amber-200 uppercase tracking-[0.5em]">Active Support in Kitchener-Waterloo</span>
        </div>
        
        <h1 className="fade-up serif text-[5rem] md:text-[8rem] lg:text-[10rem] text-white mb-12 leading-[0.85] tracking-tighter select-none" style={{ animationDelay: '0.2s' }}>
          Share the <span className="italic text-amber-500 block text-glow-gold">Meal.</span>
        </h1>
        
        <p className="fade-up text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-24 px-4 opacity-80" style={{ animationDelay: '0.4s' }}>
          Bridging the gap between local food surplus and those who need it most. Simple, private, and community-driven.
        </p>

        <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-12 relative z-10" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="px-24 py-10 text-xl shadow-[0_30px_100px_-20px_rgba(251,191,36,0.4)] hover:shadow-[0_40px_120px_-25px_rgba(251,191,36,0.6)]" onClick={() => setView('auth')}>
            Find Food
          </Button>
          <Button variant="outline" size="lg" className="px-20 py-10 text-lg text-white border-white/10 hover:bg-white/5" onClick={() => setView('sms')}>
            SMS Access
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar role={role} onRoleChange={setRole} onNavigate={setView} currentView={view} />

      <main className="max-w-7xl mx-auto px-6 py-12 pt-40 md:pt-56">
        {view === 'landing' && renderHero()}
        
        {view === 'auth' && (
          <div className="max-w-xl mx-auto py-20">
            <AuthView onLogin={onLogin} onCancel={() => setView('landing')} />
          </div>
        )}

        {view === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="lg:col-span-8 space-y-24">
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-4">
                  <h2 className="serif text-7xl md:text-9xl text-white tracking-tighter text-glow-gold">Pickups</h2>
                  <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10 shadow-inner">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Location</span>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="bg-transparent text-amber-400 font-black focus:outline-none cursor-pointer text-sm">
                      <option value="All">All Regions</option>
                      {CANADIAN_CITIES.map(c => <option key={c} value={c} className="bg-emerald-950">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {['All', ...DIETARY_TAGS.slice(0, 4)].map(tag => (
                    <button key={tag} onClick={() => setFilter(tag)} className={`px-12 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 ${filter === tag ? 'bg-amber-500 text-emerald-950 shadow-[0_0_40px_rgba(251,191,36,0.3)]' : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/20'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </header>

              <div className="h-[700px] rounded-[5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative group border-[20px] border-white/5 celestial-glass">
                <MapView drops={drops.filter(d => d.status === 'available')} onSelectDrop={setSelectedDrop} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {drops.map(drop => <FoodCard key={drop.id} drop={drop} onClick={setSelectedDrop} />)}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-48">
                {selectedDrop ? (
                  <div className="celestial-glass p-14 rounded-[5rem] border border-white/10 animate-in slide-in-from-right-12 duration-1000 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="flex justify-between items-start mb-16">
                      <div className="space-y-4">
                        <span className="text-[12px] font-black text-amber-500 uppercase tracking-[0.6em] mb-4 block">{selectedDrop.city}</span>
                        <h3 className="serif text-7xl text-white leading-[0.8] tracking-tighter text-glow-gold">{selectedDrop.title}</h3>
                      </div>
                      <button onClick={() => {setSelectedDrop(null); setIsReserving(false);}} className="w-16 h-16 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-white transition-all shadow-xl group">
                        <svg className="w-8 h-8 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    <div className="space-y-16">
                      {selectedDrop.status === 'available' && !isReserving && (
                        <>
                          <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 italic text-slate-300 text-2xl leading-relaxed shadow-inner italic">"{selectedDrop.aiSummary}"</div>
                          <div className="space-y-4">
                            <span className="text-slate-500 uppercase tracking-[0.5em] text-[11px] font-black">Address</span>
                            <p className="text-2xl font-black text-white leading-tight tracking-tight">{selectedDrop.pickupAddress}</p>
                          </div>
                          <Button fullWidth size="lg" className="h-32 text-2xl rounded-[3rem]" onClick={() => role === 'guest' ? setView('auth') : setIsReserving(true)}>Reserve Pickup</Button>
                        </>
                      )}
                      {selectedDrop.status === 'available' && isReserving && (
                        <form onSubmit={onReserve} className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
                          <input type="text" required placeholder="Pickup Name" value={reserveName} onChange={e => setReserveName(e.target.value)} className="w-full px-10 py-7 bg-white/5 border border-white/10 rounded-[2.5rem] text-white outline-none text-2xl" />
                          <input type="tel" required placeholder="Phone Number" value={reservePhone} onChange={e => setReservePhone(e.target.value)} className="w-full px-10 py-7 bg-white/5 border border-white/10 rounded-[2.5rem] text-white outline-none text-2xl" />
                          <Button type="submit" fullWidth className="h-28 text-xl">Confirm Pickup</Button>
                        </form>
                      )}
                      {selectedDrop.status === 'claimed' && (
                        <div className="space-y-16 text-center py-10 animate-in zoom-in-90 duration-1000">
                          <h4 className="serif text-7xl text-white mb-4">Confirmed.</h4>
                          <span className="text-2xl font-black text-amber-500 uppercase tracking-[0.6em]">CODE: BKL-{Math.floor(Math.random()*9000)+1000}</span>
                          <Button variant="outline" fullWidth onClick={() => setSelectedDrop(null)} className="h-20 rounded-full text-sm text-slate-400">Back to Map</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-32 rounded-[6rem] border-4 border-dashed border-white/5 text-center bg-emerald-950/20">
                    <p className="serif text-5xl text-white/10">Select a point</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'donor-dashboard' && <DonorDashboard onAddDrop={onAddDrop} myDrops={drops.filter(d => d.donorId === user?.email)} />}
        {view === 'sms' && <SMSView drops={drops.filter(d => d.status === 'available')} />}
      </main>

      <footer className="py-72 mt-72 border-t border-white/5 bg-black/20 text-center">
        <Logo size="lg" className="justify-center mb-32" />
        <p className="text-amber-500 font-black text-[14px] uppercase tracking-[1.5em] mb-48">BarakahLink • 2026</p>
      </footer>
    </div>
  );
};