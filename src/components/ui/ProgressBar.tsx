import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    size = 'md', 
    variant = 'default', 
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    };

    const variants = {
      default: 'bg-blue-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600'
    };

    return (
      <div className="space-y-2">
        {(showLabel || label) && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
            {showLabel && (
              <span className="text-sm text-gray-500">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'w-full bg-gray-200 rounded-full overflow-hidden',
            sizes[size],
            className
          )}
          {...props}
        >
          <div
            className={cn('h-full transition-all duration-300 ease-in-out', variants[variant])}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
