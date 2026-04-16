import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm';
  asChild?: boolean;
  render?: any;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', className = '', children, asChild, render, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
      default: 'bg-[#8B5E3C] text-white hover:bg-[#6B4528]',
      outline: 'border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#F5EDE0]',
      ghost: 'text-[#8B5E3C] hover:bg-[#F5EDE0]',
      link: 'text-[#8B5E3C] underline-offset-4 hover:underline',
      secondary: 'bg-[#F5EDE0] text-[#8B5E3C] hover:bg-[#EBDCC5]',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    };
    const sizes = { 
      sm: 'px-3 py-1.5 text-sm', 
      md: 'px-5 py-2.5 text-sm', 
      lg: 'px-7 py-3 text-base',
      icon: 'h-10 w-10',
      'icon-sm': 'h-8 w-8'
    };
    
    const Component = render || 'button';
    
    return (
      <Component 
        ref={ref}
        className={`${base} ${variants[variant as keyof typeof variants] || variants.default} ${sizes[size as keyof typeof sizes] || sizes.md} ${className}`} 
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
