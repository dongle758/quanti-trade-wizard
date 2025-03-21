
import React from 'react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StatProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  valueClassName?: string;
  onClick?: () => void;
}

const Stat = ({
  label,
  value,
  change,
  icon,
  tooltip,
  className,
  valueClassName,
  onClick
}: StatProps) => {
  // Determine if change is positive, negative, or neutral
  const isPositive = typeof change === 'number' && change > 0;
  const isNegative = typeof change === 'number' && change < 0;
  
  // Format the change value with a + or - sign and 2 decimal places
  const formattedChange = typeof change === 'number' 
    ? `${isPositive ? '+' : ''}${change.toFixed(2)}%` 
    : null;

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 transition-colors duration-200", 
        onClick ? "cursor-pointer hover:bg-muted/50" : "",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="flex-shrink-0 p-2 bg-primary/10 text-primary rounded-md">
          {icon}
        </div>
      )}
      
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-muted-foreground/60 hover:text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex items-baseline gap-2 mt-1">
          <span className={cn("text-xl font-semibold truncate", valueClassName)}>
            {value}
          </span>
          
          {formattedChange && (
            <span className={cn(
              "text-xs font-medium",
              isPositive ? "text-success" : "",
              isNegative ? "text-destructive" : "",
              !isPositive && !isNegative ? "text-muted-foreground" : ""
            )}>
              {formattedChange}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stat;
