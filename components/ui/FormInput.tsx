'use client';

import React from 'react';

export interface FormInputProps {
  type: 'text' | 'email' | 'textarea' | 'tel' | 'password' | 'number';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  label,
  name,
  id,
  required = false,
  disabled = false,
  rows = 4,
}) => {
  const inputId = id || name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const style: React.CSSProperties = {
    width: '100%',
    padding: '12px 18px',
    borderRadius: 'var(--radius-controls)',
    border: hasError ? '1px solid #e07a73' : '1px solid var(--color-border)',
    background: 'var(--color-espresso)',
    color: 'var(--color-text-primary)',
    fontSize: '13px',
    fontFamily: 'var(--font-sans-gallery)',
    outline: 'none',
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-xs font-bold uppercase tracking-[0.20em] text-[var(--color-text-muted)] font-sans"
        >
          {label}
          {required && <span className="text-[var(--color-badge-gold)] ml-1">*</span>}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          style={{ ...style, resize: 'none' }}
          aria-label={label || placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={style}
          aria-label={label || placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-[#e07a73] font-sans"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
