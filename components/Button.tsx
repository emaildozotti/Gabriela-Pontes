import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = "", ...props }) => {
  const baseStyles = "px-8 py-4 rounded-sm transition-all duration-300 font-sans tracking-wide text-sm md:text-base font-semibold uppercase hover:shadow-lg active:scale-95";
  
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 border border-transparent",
    outline: "bg-transparent text-stone-800 border border-stone-800 hover:bg-stone-800 hover:text-stone-50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};