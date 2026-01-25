
import React, { useState } from 'react';
import { Button } from './Button';
import { UserRole } from '../backend/types';
import { Logo } from './Logo';

interface AuthViewProps {
  onLogin: (role: UserRole, email: string) => void;
  onCancel: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin, onCancel }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<UserRole>('recipient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, email);
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div className="max-w-md mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12 flex flex-col items-center">
        <Logo size="lg" className="mb-8" showText={false} />
        <h2 className="serif text-5xl text-white mb-3 tracking-tight">Join BarakahLink</h2>
        <p className="text-slate-500 font-medium">Connecting surplus food with local need.</p>
      </div>

      <div className="celestial-glass p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#064e3b] via-amber-400 to-[#064e3b]"></div>
        
        {/* Role Selection */}
        <div className="flex p-1.5 bg-white/5 rounded-2xl mb-10 border border-white/5">
          <button
            type="button"
            onClick={() => setRole('recipient')}
            className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              role === 'recipient' ? 'bg-amber-500 text-emerald-950 shadow-lg' : 'text-slate-400'
            }`}
          >
            I need help
          </button>
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              role === 'donor' ? 'bg-amber-500 text-emerald-950 shadow-lg' : 'text-slate-400'
            }`}
          >
            I want to donate
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center space-x-12 mb-10 border-b border-white/5">
          {['login', 'signup'].map((m) => (
            <button 
              key={m}
              type="button"
              onClick={() => setMode(m as any)}
              className={`pb-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all border-b-2 ${mode === m ? 'text-amber-500 border-amber-500' : 'text-slate-500 border-transparent hover:text-white'}`}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-[1.5rem] focus:bg-white/10 focus:border-amber-500/20 focus:ring-4 focus:ring-amber-500/5 font-bold text-white placeholder:text-slate-600 transition-all outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-[1.5rem] focus:bg-white/10 focus:border-amber-500/20 focus:ring-4 focus:ring-amber-500/5 font-bold text-white placeholder:text-slate-600 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" fullWidth size="lg" className="rounded-[1.5rem] h-20 mt-6 shadow-2xl">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Button>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.4em]">
              <span className="px-4 bg-[#011a14] text-slate-600">OR CONTINUE WITH</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onLogin(role, 'google-user@gmail.com')}
            className="w-full flex items-center justify-center px-8 py-5 border-2 border-white/5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest text-white hover:bg-white/5 transition-all active:scale-[0.98] shadow-sm"
          >
            <GoogleIcon />
            Google
          </button>
        </form>
      </div>

      <button
        onClick={onCancel}
        className="w-full mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};