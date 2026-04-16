import React from 'react';

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block text-left group">
    {children}
  </div>
);

export const DropdownMenuTrigger = ({ children, asChild, ...props }: { children?: React.ReactNode; asChild?: boolean; [key: string]: any }) => (
  <div {...props}>{children}</div>
);

export const DropdownMenuContent = ({ children, className = '', align, ...props }: { children: React.ReactNode; className?: string; align?: string; [key: string]: any }) => (
  <div className={`absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block ${className}`} {...props}>
    <div className="py-1">{children}</div>
  </div>
);

export const DropdownMenuItem = ({ children, onClick, className = '', ...props }: { children: React.ReactNode; onClick?: () => void; className?: string; [key: string]: any }) => (
  <button
    onClick={onClick}
    className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const DropdownMenuLabel = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div className={`px-4 py-2 text-sm font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </div>
);

export const DropdownMenuSeparator = () => (
  <div className="my-1 h-px bg-gray-200" />
);
