import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-black disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-brand-accent text-brand-black hover:bg-brand-accent-hover skew-x-[-10deg]': variant === 'primary',
            'bg-white text-brand-black hover:bg-gray-200 skew-x-[-10deg]': variant === 'secondary',
            'border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-black skew-x-[-10deg]': variant === 'outline',
            'text-gray-300 hover:text-white': variant === 'ghost',
            
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <span className={cn({ 'skew-x-[10deg]': variant !== 'ghost' })}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
