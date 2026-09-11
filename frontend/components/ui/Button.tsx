import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline-cyan' | 'outline-pink' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className, 
  children, 
  disabled, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0B0B]";
  
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:opacity-90 focus:ring-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.3)]",
    'outline-cyan': "border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 focus:ring-cyan-500",
    'outline-pink': "border border-pink-500 text-pink-400 hover:bg-pink-500/10 focus:ring-pink-500",
    ghost: "text-gray-300 hover:text-white hover:bg-[#2A2A2A] focus:ring-gray-500",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={clsx(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
