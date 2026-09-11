import React from 'react';
import { Card } from './Card';
import clsx from 'clsx';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  accentColor?: 'cyan' | 'pink';
}

export function MetricCard({ title, value, subtitle, icon, trend, accentColor = 'cyan' }: MetricCardProps) {
  return (
    <Card className="relative p-6">
      <div 
        className={clsx(
          "absolute top-0 left-0 right-0 h-1",
          accentColor === 'cyan' ? 'bg-cyan-500' : 'bg-pink-500'
        )} 
      />
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={clsx(
          "p-2 rounded-lg",
          accentColor === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-pink-500/10 text-pink-400'
        )}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h2 className="text-3xl font-bold text-white">{value}</h2>
        {trend && (
          <span className={clsx(
            "flex items-center text-sm font-medium",
            trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
          )}>
            {trend.direction === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {trend.value}%
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
    </Card>
  );
}
