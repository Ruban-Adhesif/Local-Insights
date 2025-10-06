import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={clsx(baseClasses, hoverClasses, paddingClasses[padding], className)}>
      {children}
    </div>
  );
}
