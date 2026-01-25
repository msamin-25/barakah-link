
import React from 'react';
import { UserRole } from '../backend/types';
import { Logo } from './Logo';

interface NavbarProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ role, onRoleChange, onNavigate, currentView }) => {
  return (
    <div className="fixed top-12 left-0 right-0 z-[100] px-8 pointer-events-none">
      <nav className="max-w-7xl mx-auto celestial-glass rounded-[3rem] border border-white/10 pointer-events-auto h-24 md:h-28 flex items-center justify-between px-10 md:px-16 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.6)]">
        <div 
          className="cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95" 
          onClick={() => onNavigate('landing')}
        >
          <Logo size="md" />
        </div>

        <div className="flex items-center space-x-12 lg:space-x-16">
          <div className="hidden md:flex items-center space-x-12">
            {[
              { name: 'Food Map', view: 'map' },
              { name: 'SMS Support', view: 'sms' }
            ].map((item) => (
              <button 
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group py-3 ${currentView === item.view ? 'text-amber-500' : 'text-slate-500 hover:text-white'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_10px_#fbbf24] transition-transform duration-700 origin-left ${currentView === item.view ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </button>
            ))}
            {role === 'donor' && (
              <button 
                onClick={() => onNavigate('donor-dashboard')}
                className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all relative group py-3 ${currentView === 'donor-dashboard' ? 'text-amber-500' : 'text-slate-500 hover:text-white'}`}
              >
                My Listings
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_10px_#fbbf24] transition-transform duration-700 origin-left ${currentView === 'donor-dashboard' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
              </button>
            )}
          </div>
          
          <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>

          {role === 'guest' ? (
            <button 
              onClick={() => onNavigate('auth')}
              className="group relative px-12 py-5 overflow-hidden rounded-[2rem] bg-amber-500 text-emerald-950 text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_15px_40px_-10px_rgba(251,191,36,0.5)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_25px_60px_-15px_rgba(251,191,36,0.7)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Get Started</span>
            </button>
          ) : (
            <button 
              onClick={() => {
                onRoleChange('guest');
                onNavigate('landing');
              }}
              className="px-8 py-3 rounded-2xl border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-rose-500/10 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};