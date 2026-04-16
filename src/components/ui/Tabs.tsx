import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue, className = '', ...props }: { children: React.ReactNode; defaultValue?: string; className?: string; [key: string]: any }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, className = '', activeTab, setActiveTab, ...props }: any) => (
  <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab });
      }
      return child;
    })}
  </div>
);

export const TabsTrigger = ({ value, children, className = '', activeTab, setActiveTab, ...props }: any) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? 'bg-background text-foreground shadow' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, children, className = '', activeTab, ...props }: any) => {
  if (activeTab !== value) return null;
  return <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`} {...props}>{children}</div>;
};
