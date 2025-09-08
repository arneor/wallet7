import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('timeline-container', className)}>
      <div className="timeline-line" />
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  children: ReactNode;
  icon?: ReactNode;
  date?: string;
  title?: string;
  className?: string;
}

export function TimelineItem({ children, icon, date, title, className }: TimelineItemProps) {
  return (
    <div className={cn('timeline-item', className)}>
      <div className="timeline-marker">
        {icon || <div className="w-2 h-2 bg-blue-600 rounded-full" />}
      </div>
      <div className="flex-1 min-w-0">
        {(title || date) && (
          <div className="flex items-center justify-between mb-2">
            {title && <h3 className="text-sm font-medium text-gray-900">{title}</h3>}
            {date && <time className="text-xs text-gray-500">{date}</time>}
          </div>
        )}
        <div className="text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}
