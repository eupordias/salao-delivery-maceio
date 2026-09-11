import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'none';
}

export function Card({ children, className, glowColor = 'none' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden',
        glowColor === 'cyan' && 'glow-cyan',
        glowColor === 'pink' && 'glow-pink',
        className
      )}
    >
      {children}
    </div>
  );
}
