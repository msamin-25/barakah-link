

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-black uppercase tracking-[0.25em] rounded-[1.5rem] transition-all duration-500 active:scale-[0.94] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';
  
  const variants = {
    primary: 'bg-emerald-950 text-amber-400 shadow-[0_20px_40px_-15px_rgba(1,26,20,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(1,26,20,0.4)] border-b-4 border-emerald-900',
    secondary: 'bg-amber-600 text-white shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(217,119,6,0.3)] border-b-4 border-amber-800',
    outline: 'bg-white/40 backdrop-blur-md border border-emerald-900/10 text-emerald-900 hover:bg-white hover:border-emerald-900/30 shadow-sm',
    ghost: 'text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-50/50',
    danger: 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white shadow-sm',
  };

  const sizes = {
    sm: 'px-6 py-3 text-[9px]',
    md: 'px-10 py-5 text-[10px]',
    lg: 'px-16 py-8 text-[12px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Premium Shimmer Streak */}
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
      
      {/* Decorative Gold Streak for Primary */}
      {variant === 'primary' && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}

      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
};
