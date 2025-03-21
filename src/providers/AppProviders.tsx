
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from './QueryProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryProvider>
  );
};
