import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[#111827]">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'} text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition-all duration-150 text-base ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
