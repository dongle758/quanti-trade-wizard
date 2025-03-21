
import React, { useState } from 'react';
import { 
  AreaChart, ResponsiveContainer, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend 
} from 'recharts';
import { 
  BarChart3, CandlestickChart, LineChart, ArrowRightLeft, 
  ArrowDownUp, Timer, Minus, Plus 
} from 'lucide-react';
import Card from '@/components/UI/Card';
import Chip from '@/components/UI/Chip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for our chart
const generateData = () => {
  const data = [];
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

const chartData = generateData();

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
  
  // Toggle indicator selection
  const toggleIndicator = (indicator: string) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
    } else {
      setSelectedIndicators([...selectedIndicators, indicator]);
    }
  };
  
  return (
    <Card glass className="relative overflow-hidden" padding="none">
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
                <AreaChart className="mr-1 size-4" />
                <span className="sr-only sm:not-sr-only">Area</span>
              </Button>
              <Button 
                variant={chartType === 'candle' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-2"
                onClick={() => setChartType('candle')}
              >
                <CandlestickChart className="mr-1 size-4" />
                <span className="sr-only sm:not-sr-only">Candle</span>
              </Button>
              <Button 
                variant={chartType === 'line' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-8 px-2"
                onClick={() => setChartType('line')}
              >
                <LineChart className="mr-1 size-4" />
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
                <Minus className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <Plus className="size-4" />
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
      
      {/* Chart Content */}
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
      
      {/* Volume Panel */}
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
    </Card>
  );
};

export default TradingChart;
