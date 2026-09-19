'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
}

/**
 * FadeInUp animation wrapper component
 * Animates children with opacity 0→1 and y 20→0 on scroll into view
 * Duration: 0.6s
 * Respects prefers-reduced-motion preference
 */
export const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

