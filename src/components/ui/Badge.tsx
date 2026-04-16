import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
  children?: React.ReactNode;
}

export const Badge = ({ variant = 'default', className = '', children, ...props }: BadgeProps) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variants = {
    default: 'bg-[#8B5E3C] text-white',
    outline: 'border border-[#8B5E3C] text-[#8B5E3C]',
    secondary: 'bg-[#F5EDE0] text-[#8B5E3C]',
    destructive: 'bg-red-100 text-red-800',
  };
  return (
    <div className={`${base} ${variants[variant as keyof typeof variants] || variants.default} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Badge;
