
import React from 'react';
import { cn } from "@/lib/utils";

type ChipVariant = 'default' | 'outline' | 'secondary' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
  onClick?: () => void;
}

const Chip = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  onClick,
  ...props
}: ChipProps) => {
  // Define variant classes
  const variantClasses: Record<ChipVariant, string> = {
    default: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border bg-transparent',
    secondary: 'bg-secondary/60 text-secondary-foreground',
    primary: 'bg-primary/10 text-primary dark:bg-primary/20',
    success: 'bg-success/10 text-success dark:bg-success/20',
    warning: 'bg-warning/10 text-warning dark:bg-warning/20',
    danger: 'bg-destructive/10 text-destructive dark:bg-destructive/20',
    info: 'bg-info/10 text-info dark:bg-info/20',
  };

  // Define size classes
  const sizeClasses: Record<ChipSize, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        onClick ? 'cursor-pointer hover:opacity-80' : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

export  {Chip};
