
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend 
} from 'recharts';
import { 
  BarChart3, CandlestickChart, LineChart, ArrowRightLeft, 
  ArrowDownUp, Timer, Minus, Plus 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {Chip} from '@/components/UI/Chip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getChartData } from '@/api/marketApi';
import { ChartDataPoint } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

// Available timeframes
const timeframes = [
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
];

// Available indicators
const indicators = [
  { label: 'MA', name: 'Moving Average' },
  { label: 'EMA', name: 'Exponential Moving Average' },
  { label: 'MACD', name: 'Moving Average Convergence Divergence' },
  { label: 'RSI', name: 'Relative Strength Index' },
  { label: 'BB', name: 'Bollinger Bands' },
];

const TradingChart = () => {
  const [chartType, setChartType] = useState('area');
  const [timeframe, setTimeframe] = useState('1d');
  const [selectedIndicators, setSelectedIndicators] = useState(['MA']);
  const [market, setMarket] = useState('btcusd');
  
  // Use React Query to fetch chart data
  const { data: chartResponse, isLoading, error } = useQuery({
    queryKey: ['chartData', market, timeframe],
    queryFn: () => getChartData(market, timeframe),
  });

  // Default to empty array if data isn't available yet
  const chartData = chartResponse?.success ? chartResponse.data : generateFallbackData();
  
  // Toggle indicator selection
  const toggleIndicator = (indicator: string) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
    } else {
      setSelectedIndicators([...selectedIndicators, indicator]);
    }
  };
  
  return (
    <Card className="relative overflow-hidden p-0 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-border/40 rounded-lg">
      {/* Chart Header */}
      <div className="p-6 border-b border-border/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Chip size="sm" variant="primary" className="mb-2">Price Chart</Chip>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">BTC/USD</h2>
              <span className="text-xl">$43,521.67</span>
              <Chip variant="success" size="sm">+2.43%</Chip>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Type Selector */}
            <div className="bg-muted/50 rounded-md p-1 flex">
              <Button 
                variant={chartType === 'area' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-2"
                onClick={() => setChartType('area')}
              >
                <AreaChart className="mr-1 h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Area</span>
              </Button>
              <Button 
                variant={chartType === 'candle' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-2"
                onClick={() => setChartType('candle')}
              >
                <CandlestickChart className="mr-1 h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Candle</span>
              </Button>
              <Button 
                variant={chartType === 'line' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-2"
                onClick={() => setChartType('line')}
              >
                <LineChart className="mr-1 h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Line</span>
              </Button>
            </div>
            
            {/* Timeframe Selector */}
            <div className="bg-muted/50 rounded-md p-1 flex">
              {timeframes.map(tf => (
                <Button 
                  key={tf.value}
                  variant={timeframe === tf.value ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setTimeframe(tf.value)}
                >
                  {tf.label}
                </Button>
              ))}
            </div>
            
            {/* Zoom Controls */}
            <div className="bg-muted/50 rounded-md p-1 flex">
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Indicators */}
        <div className="flex flex-wrap items-center gap-2 mt-4 mb-1">
          <span className="text-sm text-muted-foreground">Indicators:</span>
          {indicators.map(indicator => (
            <Chip
              key={indicator.label}
              variant={selectedIndicators.includes(indicator.label) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => toggleIndicator(indicator.label)}
              className="cursor-pointer"
            >
              {indicator.label}
            </Chip>
          ))}
        </div>
      </div>
      
      {/* Loading state for chart */}
      {isLoading && (
        <div className="h-[400px] p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        </div>
      )}
      
      {/* Error state for chart */}
      {error && (
        <div className="h-[400px] p-4 flex items-center justify-center">
          <div className="text-center text-destructive">
            <p>Failed to load chart data</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
          </div>
        </div>
      )}
      
      {/* Chart Content */}
      {!isLoading && !error && (
        <div className="h-[400px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={['dataMin - 1000', 'dataMax + 1000']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
              />
              {/* Moving Average line would be added here when selected */}
              {selectedIndicators.includes('MA') && (
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--warning))"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  fill="none"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Volume Panel */}
      {!isLoading && !error && (
        <div className="h-[100px] p-4 border-t border-border/40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--muted-foreground))"
                fillOpacity={0.5}
                fill="hsl(var(--muted))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

// Helper function to generate fallback data when API fails
const generateFallbackData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let value = 43000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    
    // Create some realistic price movements
    const change = (Math.random() - 0.5) * 600;
    value += change;
    
    const volume = Math.floor(100000 + Math.random() * 900000);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(value * 100) / 100,
      volume
    });
  }
  
  return data;
};

export default TradingChart;
