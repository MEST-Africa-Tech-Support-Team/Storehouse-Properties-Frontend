import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    rounded = 'md', 
    children, 
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-glow',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      ghost: 'text-blue-600 hover:bg-blue-50',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-glow',
    };

    const sizes = {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const roundings = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          roundings[rounded],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };