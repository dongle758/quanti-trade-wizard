
import React, { useState } from 'react';
import { 
  Sliders, Plus, X, Save, PlayCircle, 
  AlertCircle, CheckCircle, Settings 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/UI/Chip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Sample indicators and options
const indicators = [
  { id: 'ma', name: 'Moving Average', params: ['period', 'source'] },
  { id: 'ema', name: 'Exponential Moving Average', params: ['period', 'source'] },
  { id: 'rsi', name: 'Relative Strength Index', params: ['period', 'overboughtLevel', 'oversoldLevel'] },
  { id: 'macd', name: 'MACD', params: ['fastPeriod', 'slowPeriod', 'signalPeriod'] },
  { id: 'bb', name: 'Bollinger Bands', params: ['period', 'deviation'] },
];

// Condition operators
const operators = [
  { value: 'crossesAbove', label: 'Crosses Above' },
  { value: 'crossesBelow', label: 'Crosses Below' },
  { value: 'isAbove', label: 'Is Above' },
  { value: 'isBelow', label: 'Is Below' },
  { value: 'equals', label: 'Equals' },
];

// Data sources
const dataSources = [
  { value: 'close', label: 'Close' },
  { value: 'open', label: 'Open' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
  { value: 'hl2', label: 'HL/2' },
  { value: 'hlc3', label: 'HLC/3' },
  { value: 'ohlc4', label: 'OHLC/4' },
];

const StrategyBuilder = () => {
  const [selectedTab, setSelectedTab] = useState('conditions');
  const [conditions, setConditions] = useState([
    { 
      id: 1, 
      indicator1: 'price', 
      operator: 'crossesAbove', 
      indicator2: 'ma'
    }
  ]);
  
  // Add a new condition
  const addCondition = () => {
    const newId = conditions.length > 0 
      ? Math.max(...conditions.map(c => c.id)) + 1 
      : 1;
      
    setConditions([
      ...conditions, 
      { id: newId, indicator1: 'price', operator: 'crossesAbove', indicator2: 'ma' }
    ]);
  };
  
  // Remove a condition
  const removeCondition = (id: number) => {
    setConditions(conditions.filter(c => c.id !== id));
  };
  
  return (
    <Card glass>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Chip size="sm" variant="primary" className="mb-2">Strategy Builder</Chip>
          <h2 className="text-2xl font-semibold">Create Trading Strategy</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-1">
            <Save size={16} />
            <span>Save</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <PlayCircle size={16} />
            <span>Backtest</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="conditions" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conditions" className="animate-fade-in">
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Entry Conditions</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addCondition}
                  className="flex items-center gap-1 text-xs"
                >
                  <Plus size={14} />
                  <span>Add Condition</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {conditions.map(condition => (
                  <div key={condition.id} className="flex items-center gap-2 flex-wrap bg-card p-3 rounded-md border border-border/40">
                    <Select defaultValue={condition.indicator1}>
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price</SelectItem>
                        {indicators.map(ind => (
                          <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue={condition.operator}>
                      <SelectTrigger className="h-8 w-[140px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map(op => (
                          <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue={condition.indicator2}>
                      <SelectTrigger className="h-8 w-[120px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map(ind => (
                          <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                        ))}
                        <SelectItem value="value">Value</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCondition(condition.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg border border-border/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Exit Conditions</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-xs"
                >
                  <Plus size={14} />
                  <span>Add Condition</span>
                </Button>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-border/40 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">No exit conditions defined</span>
                <Button variant="ghost" size="sm" className="text-xs">Add Condition</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="parameters" className="animate-fade-in">
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/40">
              <h3 className="font-medium mb-4">Strategy Parameters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategyName">Strategy Name</Label>
                    <Input id="strategyName" placeholder="My Trading Strategy" className="h-9" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="asset">Trading Pair</Label>
                    <Select defaultValue="btcusd">
                      <SelectTrigger id="asset">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btcusd">BTC/USD</SelectItem>
                        <SelectItem value="ethusd">ETH/USD</SelectItem>
                        <SelectItem value="solusd">SOL/USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Select defaultValue="1d">
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="4h">4 Hours</SelectItem>
                        <SelectItem value="1d">1 Day</SelectItem>
                        <SelectItem value="1w">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="initialCapital">Initial Capital</Label>
                      <span className="text-sm text-muted-foreground">$10,000</span>
                    </div>
                    <Slider
                      id="initialCapital"
                      defaultValue={[10000]}
                      max={100000}
                      min={1000}
                      step={1000}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="positionSize">Position Size (%)</Label>
                      <span className="text-sm text-muted-foreground">20%</span>
                    </div>
                    <Slider
                      id="positionSize"
                      defaultValue={[20]}
                      max={100}
                      min={1}
                      step={1}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="useStopLoss" />
                      <Label htmlFor="useStopLoss">Use Stop Loss</Label>
                    </div>
                    <Input 
                      placeholder="e.g. 5%" 
                      className="w-24 h-9" 
                      disabled 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="useTakeProfit" />
                      <Label htmlFor="useTakeProfit">Use Take Profit</Label>
                    </div>
                    <Input 
                      placeholder="e.g. 15%" 
                      className="w-24 h-9" 
                      disabled 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="animate-fade-in">
          <div className="flex items-center justify-center h-[300px] bg-muted/50 rounded-lg border border-border/40">
            <div className="text-center max-w-md p-6">
              <AlertCircle size={40} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Backtest Results</h3>
              <p className="text-muted-foreground mb-4">
                Configure your strategy conditions and parameters, then run a backtest to see the results here.
              </p>
              <Button disabled={selectedTab !== 'results'}>
                Run Backtest
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default StrategyBuilder;
