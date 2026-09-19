'use client';

import React, { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '@/components/ui';

export default function ButtonDemoPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--color-off-white)] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-[var(--color-deep-navy)] mb-8 text-center">
          Button Components Demo
        </h1>

        {/* Primary Button Examples */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-display font-bold text-[var(--color-courage-green)] mb-6">
            Primary Button
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                With onClick Handler
              </h3>
              <PrimaryButton
                text="Click Me"
                onClick={() => setClickCount(clickCount + 1)}
              />
              <p className="mt-2 text-sm text-gray-600">
                Clicked {clickCount} times
              </p>
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                With Link (href)
              </h3>
              <PrimaryButton text="Go to Home" href="/" />
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Disabled State
              </h3>
              <PrimaryButton text="Disabled Button" disabled />
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Hover & Focus States
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Hover over the button to see brightness increase and scale animation.
                Tab to it to see the focus ring.
              </p>
              <PrimaryButton text="Hover & Focus Me" onClick={() => {}} />
            </div>
          </div>
        </section>

        {/* Secondary Button Examples */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-display font-bold text-[var(--color-courage-green)] mb-6">
            Secondary Button
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                With onClick Handler
              </h3>
              <SecondaryButton
                text="Click Me"
                onClick={() => alert('Secondary button clicked!')}
              />
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                With Link (href)
              </h3>
              <SecondaryButton text="Go to About" href="/about" />
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Disabled State
              </h3>
              <SecondaryButton text="Disabled Button" disabled />
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Hover & Focus States
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Hover over the button to see the fill effect with Courage Gold background.
                Tab to it to see the focus ring.
              </p>
              <SecondaryButton text="Hover & Focus Me" onClick={() => {}} />
            </div>
          </div>
        </section>

        {/* Responsive Demo */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-display font-bold text-[var(--color-courage-green)] mb-6">
            Responsive Behavior
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Mobile: Full Width (&lt;768px)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Resize your browser to less than 768px to see buttons expand to full width.
              </p>
              <div className="space-y-3">
                <PrimaryButton text="Primary Full Width" onClick={() => {}} />
                <SecondaryButton text="Secondary Full Width" onClick={() => {}} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-[var(--color-deep-navy)]">
                Desktop: Auto Width (&gt;768px)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                On desktop, buttons have auto width based on content.
              </p>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton text="Apply Now" onClick={() => {}} />
                <SecondaryButton text="Learn More" onClick={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* Dark Background Demo */}
        <section className="bg-[var(--color-deep-navy)] p-8 rounded-lg">
          <h2 className="text-2xl font-display font-bold text-[var(--color-courage-gold)] mb-6">
            On Dark Background
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-sans font-semibold mb-3 text-white">
                Button Visibility on Dark Sections
              </h3>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton text="Primary Button" onClick={() => {}} />
                <SecondaryButton text="Secondary Button" onClick={() => {}} />
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Info */}
        <section className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-display font-bold text-[var(--color-courage-green)] mb-6">
            Accessibility Features
          </h2>
          
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Keyboard navigation support (Tab to focus, Enter/Space to activate)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Visible focus indicators with ring outline</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Disabled state with reduced opacity and cursor indication</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Proper semantic HTML (button vs link based on usage)</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Montserrat font with bold weight for readability</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--color-courage-green)] mr-2">✓</span>
              <span>Adequate padding (16px vertical, 24px horizontal)</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}


