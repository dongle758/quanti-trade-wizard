
import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
  hover?: boolean;
  animate?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
}

const Card = ({
  children,
  className,
  glass = false,
  hover = false,
  animate = false,
  padding = 'md',
  border = true,
  ...props
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        "rounded-lg", 
        border ? "border border-border/40" : "",
        glass ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md" : "bg-card",
        paddingClasses[padding],
        hover ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-glass" : "",
        animate ? "animate-scale-in" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
