import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Label = ({ className = '', children, ...props }: LabelProps) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
