'use client';

import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'spinner' | 'pulse';
}

export function LoadingAnimation({ size = 'md', variant = 'dots' }: LoadingAnimationProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'dots') {
    return (
      <div className="flex space-x-1 justify-center items-center">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`bg-blue-600 rounded-full ${sizes[size]}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={`bg-blue-600 rounded-full ${sizes[size]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    );
  }

  // Default spinner
  return (
    <motion.div
      className={`border-2 border-gray-200 border-t-blue-600 rounded-full ${sizes[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}
