import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-[4px] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      <div 
        className={`
          relative w-full ${sizes[size]} rounded-xl border border-border bg-card text-foreground shadow-2xl z-10 
          flex flex-col max-h-[90vh] overflow-hidden
          animate-in zoom-in-95 duration-200
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-border/40">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow text-sm leading-relaxed">
          {children}
        </div>

        {footerActions && (
          <div className="flex items-center justify-end gap-3 p-4 border-t border-border/40 bg-muted/20">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
