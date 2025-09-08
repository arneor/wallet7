'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

export function CardHover({ children, className }: CardHoverProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
