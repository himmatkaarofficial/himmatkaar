'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

/**
 * CountUp animation component
 * Animates a number from 0 to target value when scrolled into view
 * Default duration: 2s
 * Respects prefers-reduced-motion preference
 */
export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (inView) {
      // If user prefers reduced motion, jump directly to end value
      if (prefersReducedMotion) {
        setCount(end);
        return;
      }

      // Animate from 0 to end value
      const increment = end / (duration * 60); // 60fps
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev >= end) {
            clearInterval(timer);
            return end;
          }
          return Math.min(prev + increment, end);
        });
      }, 1000 / 60); // 60fps

      return () => clearInterval(timer);
    }
  }, [inView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.floor(count)}
      {suffix}
    </span>
  );
};

