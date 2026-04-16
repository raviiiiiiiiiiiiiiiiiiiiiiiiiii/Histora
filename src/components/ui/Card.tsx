import React from 'react';

export const Card = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
