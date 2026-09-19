# Animation Components

This directory contains reusable Framer Motion animation wrapper components for the Himmatkaar website redesign.

## Components

### FadeInUp

Animates children with opacity 0→1 and y 20→0 when scrolled into view.

**Props:**
- `children: ReactNode` - Content to animate
- `delay?: number` - Optional delay before animation starts (default: 0)

**Features:**
- Duration: 0.6s
- Triggers once when scrolled into view
- Respects `prefers-reduced-motion` preference

**Usage:**
```tsx
import { FadeInUp } from '@/components/animations';

<FadeInUp delay={0.2}>
  <div>Your content here</div>
</FadeInUp>
```

### StaggeredGrid

Animates children with staggered fade-in-up effect, creating a cascading animation.

**Props:**
- `children: ReactNode[]` - Array of elements to animate
- `staggerDelay?: number` - Delay between each item animation (default: 0.08s)
- `className?: string` - Optional CSS classes for the container

**Features:**
- Duration: 0.6s per item
- Default stagger delay: 0.08s between items
- Triggers once when scrolled into view
- Respects `prefers-reduced-motion` preference

**Usage:**
```tsx
import { StaggeredGrid } from '@/components/animations';

<StaggeredGrid className="grid grid-cols-3 gap-4" staggerDelay={0.1}>
  {items.map((item, index) => (
    <div key={index}>{item.content}</div>
  ))}
</StaggeredGrid>
```

### CountUp

Animates a number from 0 to target value when scrolled into view.

**Props:**
- `end: number` - Target number to count up to
- `duration?: number` - Animation duration in seconds (default: 2)
- `suffix?: string` - Optional suffix to append (e.g., "+", "%")
- `prefix?: string` - Optional prefix to prepend (e.g., "$")

**Features:**
- Duration: 2s (configurable)
- Animates at 60fps for smooth counting
- Triggers once when scrolled into view
- Respects `prefers-reduced-motion` preference (jumps to end value)

**Usage:**
```tsx
import { CountUp } from '@/components/animations';

<div className="text-4xl font-bold">
  <CountUp end={1000} suffix="+" duration={2.5} />
</div>
```

## Accessibility

All animation components respect the user's `prefers-reduced-motion` system preference:
- **FadeInUp**: Skips animation, content appears immediately
- **StaggeredGrid**: Skips animation, all items appear immediately
- **CountUp**: Jumps directly to end value without counting animation

## Implementation Details

- Built with Framer Motion 12.35.0
- Uses `whileInView` for scroll-triggered animations
- Uses `viewport={{ once: true }}` to trigger animations only once
- Uses `useInView` hook for CountUp component
- All components are client-side rendered (`'use client'` directive)

## Demo

See `AnimationDemo.tsx` for usage examples of all animation components.

## Design Specifications

These components follow the Himmatkaar Brand Guidelines 2026-2027:
- Animation duration: 0.6s (medium timing)
- Stagger delay: 0.08s between items
- Count-up duration: 2s for stats
- Easing: Default Framer Motion easing (ease-in-out)
