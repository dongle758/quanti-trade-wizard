import React from 'react';
import { 
  TrendingUp, ArrowDown, ArrowUp, Wallet, AlertCircle, DollarSign 
} from 'lucide-react';
import {Card} from '@/components/UI/Card';
import {Chip} from '@/components/UI/Chip';
import { Progress } from '@/components/ui/progress';
import { getPortfolioSummary } from '@/api/portfolioApi';
import { useQuery } from '@tanstack/react-query';

const PortfolioSummary = () => {
  // Use React Query to fetch portfolio data
  const { data: portfolioResponse, isLoading, error } = useQuery({
    queryKey: ['portfolioSummary'],
    queryFn: getPortfolioSummary,
  });

  // Extract portfolio data from the API response or use fallback data
  const portfolioData = portfolioResponse?.success ? portfolioResponse.data : {
    totalValue: 48668.5,
    totalChange: 1197.83,
    changePercentage: 2.52,
    positions: [
      { asset: 'BTC', allocation: 45, value: 27150.25, change: 2.43 },
      { asset: 'ETH', allocation: 30, value: 12642.80, change: 1.87 },
      { asset: 'SOL', allocation: 15, value: 5375.45, change: 4.21 },
      { asset: 'USDC', allocation: 10, value: 3500.00, change: 0 },
    ]
  };
  
  const { totalValue, totalChange, changePercentage, positions } = portfolioData;
  
  return (
    <Card glass className="animate-fade-in">
      <div className="mb-6">
        <Chip size="sm" variant="primary" className="mb-2">Portfolio</Chip>
        <h2 className="text-2xl font-semibold">Holdings Overview</h2>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 bg-muted/30 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-16 bg-muted/30 rounded-lg"></div>
            ))}
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="text-center text-destructive py-8">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <p>Failed to load portfolio data</p>
          <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
        </div>
      )}
      
      {/* Portfolio Summary */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <SummaryCard 
              title="Total Balance" 
              value={`$${totalValue.toLocaleString()}`} 
              change={changePercentage} 
              icon={<Wallet size={20} />} 
            />
            <SummaryCard 
              title="Daily Profit/Loss" 
              value={`$${totalChange.toLocaleString()}`} 
              change={changePercentage} 
              showChangeAsValue 
              icon={<DollarSign size={20} />} 
            />
            <SummaryCard 
              title="Asset Allocation" 
              value={`${positions.length} Assets`} 
              showBalance={false} 
              icon={<TrendingUp size={20} />} 
            />
          </div>
          
          {/* Assets Allocation */}
          <h3 className="text-sm font-medium mb-4">Asset Allocation</h3>
          <div className="space-y-4">
            {positions.map((position) => (
              <AssetAllocation key={position.asset} position={position} />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

const SummaryCard = ({ 
  title, 
  value, 
  change,
  showChangeAsValue = false,
  showBalance = true,
  icon
}: { 
  title: string; 
  value: string; 
  change?: number;
  showChangeAsValue?: boolean;
  showBalance?: boolean;
  icon: React.ReactNode;
}) => {
  const isPositive = typeof change === 'number' && change > 0;
  const isNegative = typeof change === 'number' && change < 0;
  
  return (
    <div className="bg-muted/40 p-4 rounded-lg border border-border/40">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">{title}</div>
          <div className="text-xl font-semibold">{value}</div>
          
          {showBalance && typeof change === 'number' && (
            <div className="flex items-center mt-1">
              <div className={`flex items-center ${
                isPositive ? 'text-success' : isNegative ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {isPositive ? (
                  <ArrowUp size={14} className="mr-1" />
                ) : isNegative ? (
                  <ArrowDown size={14} className="mr-1" />
                ) : null}
                <span className="text-sm">
                  {showChangeAsValue ? 
                    (isPositive ? '+' : '') : 
                    (isPositive ? '+' : '')}
                  {Math.abs(change).toFixed(2)}
                  {!showChangeAsValue && '%'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground ml-2">24h</span>
            </div>
          )}
        </div>
        
        <div className="p-2 bg-background rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

const AssetAllocation = ({ position }: { position: any }) => {
  const { asset, allocation, value, change } = position;
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const getAssetColor = (asset: string) => {
    switch (asset) {
      case 'BTC': return 'bg-amber-500';
      case 'ETH': return 'bg-purple-500';
      case 'SOL': return 'bg-green-500';
      case 'USDC': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="bg-card p-3 rounded-md border border-border/40">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className={`${getAssetColor(asset)} w-6 h-6 rounded-full flex items-center justify-center mr-2`}>
            <span className="text-xs text-white font-medium">{asset.charAt(0)}</span>
          </div>
          <span className="font-medium">{asset}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium">${value.toLocaleString()}</span>
          <Chip
            size="sm"
            variant={isPositive ? 'success' : isNegative ? 'danger' : 'secondary'}
            className="ml-2"
          >
            {isPositive ? '+' : ''}{change}%
          </Chip>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
        <span>Allocation</span>
        <span>{allocation}%</span>
      </div>
      
      <Progress value={allocation} className="h-1.5" />
    </div>
  );
};

export default PortfolioSummary;
