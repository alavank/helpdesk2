import { forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'open' | 'in-progress' | 'waiting' | 'resolved' | 'cancelled' | 'low' | 'medium' | 'high' | 'critical';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';
    
    const variantStyles = {
      default: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
      open: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'in-progress': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      waiting: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      resolved: 'bg-green-500/20 text-green-400 border border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30',
      low: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
      medium: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      high: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
    };
    
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {dot && (
          <span className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'default' && 'bg-gray-400',
            variant === 'open' && 'bg-blue-400',
            variant === 'in-progress' && 'bg-yellow-400',
            variant === 'waiting' && 'bg-orange-400',
            variant === 'resolved' && 'bg-green-400',
            variant === 'cancelled' && 'bg-red-400',
            variant === 'low' && 'bg-gray-400',
            variant === 'medium' && 'bg-blue-400',
            variant === 'high' && 'bg-orange-400',
            variant === 'critical' && 'bg-red-400',
          )} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
