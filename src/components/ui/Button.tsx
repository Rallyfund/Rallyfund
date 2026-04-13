import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  href, 
  fullWidth = false,
  className = '', 
  ...props 
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const variants = {
    primary: 'bg-[#22C55E] hover:bg-[#16a34a] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#22C55E]',
    secondary: 'bg-[#1B3A6B] hover:bg-[#2a5298] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#1B3A6B]',
    outline: 'border-2 border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white focus:ring-[#1B3A6B]',
    ghost: 'text-[#1B3A6B] hover:bg-blue-50 focus:ring-[#1B3A6B]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
