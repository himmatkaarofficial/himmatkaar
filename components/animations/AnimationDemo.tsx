'use client';

import { FadeInUp } from './FadeInUp';
import { StaggeredGrid } from './StaggeredGrid';
import { CountUp } from './CountUp';

/**
 * Demo component to showcase animation wrappers
 * This can be used for testing and demonstration purposes
 */
export const AnimationDemo = () => {
  const items = [
    { title: 'Item 1', description: 'First item' },
    { title: 'Item 2', description: 'Second item' },
    { title: 'Item 3', description: 'Third item' },
  ];

  return (
    <div className="space-y-16 p-8">
      {/* FadeInUp Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">FadeInUp Animation</h2>
        <FadeInUp>
          <div className="bg-courage-green text-white p-6 rounded-lg">
            This content fades in and moves up when scrolled into view
          </div>
        </FadeInUp>
      </section>

      {/* FadeInUp with Delay Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">FadeInUp with Delay</h2>
        <FadeInUp delay={0.3}>
          <div className="bg-courage-gold text-deep-navy p-6 rounded-lg">
            This content has a 0.3s delay before animating
          </div>
        </FadeInUp>
      </section>

      {/* StaggeredGrid Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">StaggeredGrid Animation</h2>
        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-deep-sapphire text-white p-6 rounded-lg"
            >
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </StaggeredGrid>
      </section>

      {/* CountUp Demo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">CountUp Animation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-courage-green p-8 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              <CountUp end={1000} suffix="+" />
            </div>
            <div className="text-courage-gold">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              <CountUp end={50} suffix="+" />
            </div>
            <div className="text-courage-gold">Events</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              <CountUp end={25} suffix="+" />
            </div>
            <div className="text-courage-gold">Partners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              <CountUp end={95} suffix="%" />
            </div>
            <div className="text-courage-gold">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
};

