'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredGridProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

/**
 * StaggeredGrid animation wrapper component
 * Animates children with staggered fade-in-up effect
 * Default stagger delay: 0.08s between items
 */
export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  staggerDelay = 0.08,
  className = '',
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * staggerDelay }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

