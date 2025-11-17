import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light' | 'btSuccess'|'warning'|'error'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium cursor-pointer transition-all duration-200 border-none outline-none shadow-sm focus:outline-none";

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
    light: 'bg-white text-primary-600 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    btSuccess: 'bg-btSuccess text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    warning: 'bg-warning text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
    error: 'bg-error text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-[var(--Azul,#2F80ED)] text-[1.5rem] font-bold leading-none text-center flex items-center justify-center",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
