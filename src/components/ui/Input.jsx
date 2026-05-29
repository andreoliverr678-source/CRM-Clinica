import React, { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-muted-foreground select-none"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            ref={ref}
            className={`
              w-full h-10 px-3 rounded-lg border border-border bg-input/40 text-foreground text-sm
              transition-all duration-200 outline-none
              placeholder:text-muted-foreground/60
              focus:bg-input/10 focus:border-primary/50 focus:ring-4 focus:ring-ring
              disabled:opacity-50 disabled:bg-muted/30 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-9' : ''}
              ${rightIcon ? 'pr-9' : ''}
              ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10' : ''}
              ${className}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 text-muted-foreground pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs text-red-500 font-medium leading-none mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </span>
        )}
        
        {!error && helperText && (
          <span className="text-xs text-muted-foreground leading-none mt-0.5">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
