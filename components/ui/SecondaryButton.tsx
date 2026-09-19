import React from 'react';
import Link from 'next/link';

export interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  text,
  onClick,
  href,
  disabled = false,
}) => {
  const baseClasses = "btn-ghost-pill inline-flex items-center justify-center text-center cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed";

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
