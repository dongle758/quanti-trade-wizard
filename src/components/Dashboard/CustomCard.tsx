
import React from 'react';
import { Card as ShadcnCard } from '@/components/ui/card';
import { cn } from "@/lib/utils";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
}

const CustomCard = ({
  children,
  className,
  glass = false,
  ...props
}: CustomCardProps) => {
  return (
    <ShadcnCard
      className={cn(
        glass ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md" : "",
        className
      )}
      {...props}
    >
      {children}
    </ShadcnCard>
  );
};

export default CustomCard;
