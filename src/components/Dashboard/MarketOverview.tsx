
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, LineChart, Percent } from 'lucide-react';
import {Card} from '@/components/UI/Card';
import {Stat} from '@/components/UI/Stat';
import {Chip} from '@/components/UI/Chip';
import { getMarketOverview } from '@/api/marketApi';
import { MarketData, MarketSummary } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

const MarketOverview = () => {
  // Use React Query to fetch market data
  const { data: marketResponse, isLoading, error } = useQuery({
    queryKey: ['marketOverview'],
    queryFn: getMarketOverview,
  });

  // Extract data from the API response or use fallback data
  const marketData = marketResponse?.success ? marketResponse.data.marketData : [];
  const summary = marketResponse?.success ? marketResponse.data.summary : {
    globalMarketCap: '$1.86T',
    globalMarketCapChange: 1.23,
    volume24h: '$78.5B',
    volume24hChange: -2.41
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Chip size="sm" variant="primary" className="mb-2">Market Overview</Chip>
          <h2 className="text-2xl font-semibold">Top Cryptocurrencies</h2>
        </div>
        <div className="flex items-center gap-2">
          <Stat 
            label="Global Market Cap" 
            value={summary.globalMarketCap} 
            change={summary.globalMarketCapChange} 
            icon={<DollarSign size={16} />} 
            className="border rounded-lg" 
          />
          <Stat 
            label="24h Volume" 
            value={summary.volume24h} 
            change={summary.volume24hChange} 
            icon={<LineChart size={16} />} 
            className="border rounded-lg hidden sm:flex" 
          />
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="animate-pulse bg-muted/20">
              <div className="h-32"></div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <Card className="p-6 text-center text-destructive">
          <p>Failed to load market data</p>
          <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
        </Card>
      )}
      
      {/* Market data grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.length > 0 ? (
            marketData.map((item) => (
              <MarketCard key={item.name} data={item} />
            ))
          ) : (
            // Show fallback data cards
            <FallbackMarketCards />
          )}
        </div>
      )}
    </div>
  );
};

const MarketCard = ({ data }: { data: MarketData }) => {
  const isPositive = data.change > 0;
  
  return (
    <Card hover glass className="transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{data.name}</span>
            <Chip 
              size="sm" 
              variant={isPositive ? 'success' : 'danger'}
              className="ml-1"
            >
              {isPositive ? '+' : ''}{data.change}%
            </Chip>
          </div>
          <div className="text-2xl font-semibold">${data.price}</div>
          <div className="text-sm text-muted-foreground mt-1">Volume: {data.volume}</div>
        </div>
        
        <div className={`p-3 rounded-full ${
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        }`}>
          {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        </div>
      </div>
      
      <div className="mt-4 h-16 overflow-hidden relative">
        {/* Placeholder for sparkline chart - would be replaced with actual chart */}
        <div className="absolute inset-0 flex items-end">
          <div className={`h-full w-full flex items-end ${isPositive ? 'bg-success/5' : 'bg-destructive/5'}`}>
            {Array.from({ length: 20 }).map((_, i) => {
              const height = Math.abs(Math.sin(i * 0.5) * 100) % 100;
              return (
                <div 
                  key={i} 
                  style={{
                    height: `${height}%`,
                    width: '5%',
                    margin: '0 1px'
                  }}
                  className={`transition-all duration-300 ${
                    isPositive ? 'bg-success/30' : 'bg-destructive/30'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Fallback data for when API fails
const FallbackMarketCards = () => {
  const fallbackData: MarketData[] = [
    { name: 'BTC/USD', price: 43521.67, change: 2.43, volume: '$28.4B', volumeValue: 28400000000 },
    { name: 'ETH/USD', price: 2176.39, change: 1.87, volume: '$12.6B', volumeValue: 12600000000 },
    { name: 'SOL/USD', price: 106.25, change: 4.21, volume: '$4.8B', volumeValue: 4800000000 },
    { name: 'BNB/USD', price: 318.76, change: -0.52, volume: '$1.9B', volumeValue: 1900000000 },
    { name: 'XRP/USD', price: 0.5487, change: -1.34, volume: '$1.7B', volumeValue: 1700000000 },
    { name: 'ADA/USD', price: 0.4129, change: 0.78, volume: '$980M', volumeValue: 980000000 },
  ];
  
  return (
    <>
      {fallbackData.map((item) => (
        <MarketCard key={item.name} data={item} />
      ))}
    </>
  );
};

export default MarketOverview;
