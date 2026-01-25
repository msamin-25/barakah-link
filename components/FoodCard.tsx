
import React from 'react';
import { FoodDrop } from '../backend/types';

interface FoodCardProps {
  drop: FoodDrop;
  onClick: (drop: FoodDrop) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ drop, onClick }) => {
  const now = new Date();
  const start = new Date(drop.pickupStartTime);
  const end = new Date(drop.availableUntil);
  
  const elapsed = now.getTime() - start.getTime();
  const total = end.getTime() - start.getTime();
  const progress = Math.min(Math.max((elapsed / total) * 100, 0), 100);
  
  const isAvailable = drop.status === 'available' && now < end;

  return (
    <div 
      onClick={() => onClick(drop)}
      className="group relative cursor-pointer fade-up"
    >
      {/* Main Card Container */}
      <div className={`relative overflow-hidden rounded-[3rem] border border-white/5 transition-all duration-700 celestial-glass p-8 md:p-10 hover:border-amber-400/40 hover:-translate-y-4 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] ${drop.status === 'claimed' ? 'opacity-60 saturate-[0.2]' : ''}`}>
        
        {/* Internal Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Mashrabiya Corner Motif */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 text-amber-400 transform translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6">
          <svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45Z"/></svg>
        </div>

        <div className="flex justify-between items-start mb-10 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_#fbbf24]"></span>
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{drop.donorName}</p>
            </div>
            <h3 className="serif text-4xl md:text-5xl text-white tracking-tight leading-[0.9] text-glow-gold">{drop.title}</h3>
          </div>
          
          <div className={`px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/10 ${isAvailable ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'}`}>
            {drop.status === 'claimed' ? 'Claimed' : isAvailable ? 'Available' : 'Expired'}
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          {/* Progress Indicator (Vitality) */}
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black text-amber-200/50 uppercase tracking-[0.3em]">
              <span>Pickup Window</span>
              <span>{Math.round(100 - progress)}% Remaining</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(251,191,36,0.5)]" 
                style={{ width: `${100 - progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
             </div>
             <div>
               <p className="text-white font-black text-lg tracking-tight">{drop.pickupAddress.split(',')[0]}</p>
               <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">{drop.city}</p>
             </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="bg-emerald-950/40 px-6 py-4 rounded-3xl border border-white/5 flex flex-col items-center">
              <span className="text-[8px] uppercase font-black text-amber-500/60 mb-1 tracking-widest">Quantity</span>
              <span className="text-xl font-black text-white">{drop.quantity.split(' ')[0]}</span>
            </div>
            
            <div className="flex space-x-2">
              {drop.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-5 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};