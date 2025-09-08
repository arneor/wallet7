import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  imageSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  title, 
  description, 
  imageSrc, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {imageSrc && (
        <div className="mb-6">
          <Image
            src={imageSrc}
            alt={title}
            width={200}
            height={200}
            className="mx-auto opacity-50"
          />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
