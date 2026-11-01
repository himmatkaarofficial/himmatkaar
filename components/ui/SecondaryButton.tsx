import React from 'react';
import Link from 'next/link';

export interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  href,
  disabled = false,
  className = "",
}) => {
  const baseClasses = `btn-gsap-ghost inline-flex items-center justify-center text-center cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed !rounded-xl ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {text}
    </button>
  );
};
