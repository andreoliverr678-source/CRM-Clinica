import React from 'react';

export const Card = ({ children, hoverable = false, className = '', ...props }) => {
  return (
    <div
      className={`
        rounded-xl border border-border bg-card text-foreground shadow-sm overflow-hidden
        transition-all duration-200
        ${hoverable ? 'hover:shadow-md hover:border-muted-foreground/20 hover:-translate-y-0.5' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 flex flex-col gap-1.5 border-b border-border/40 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-base font-semibold tracking-tight text-foreground leading-none ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-xs text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pt-0 border-t border-border/40 flex items-center justify-end gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
