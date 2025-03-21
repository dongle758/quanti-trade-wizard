
import React from 'react';
import Header from '@/components/Layout/Header';
import TradingChart from '@/components/Dashboard/TradingChart';
import { Button } from '@/components/ui/button';
import Card from '@/components/UI/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, LineChart, CandlestickChart, CalendarDays, Clock } from 'lucide-react';

const Charts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-screen-2xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
              <p className="text-muted-foreground mt-1">
                Advanced technical analysis and market visualization
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="btcusd">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btcusd">BTC/USD</SelectItem>
                  <SelectItem value="ethusd">ETH/USD</SelectItem>
                  <SelectItem value="solusd">SOL/USD</SelectItem>
                  <SelectItem value="xrpusd">XRP/USD</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="1d">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="bg-muted/50 rounded-md p-1 flex">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Clock size={16} className="mr-1" />
                  <span className="sr-only sm:not-sr-only">Real-time</span>
                </Button>
                <Button variant="secondary" size="sm" className="h-8 px-2">
                  <CalendarDays size={16} className="mr-1" />
                  <span className="sr-only sm:not-sr-only">Historical</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Chart */}
          <TradingChart />
          
          {/* Additional Chart Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Volume Profile</h2>
                <div className="bg-muted/50 rounded-md p-1 flex">
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <BarChart3 size={16} />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 w-8 px-0">
                    <LineChart size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="h-[300px] bg-muted/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Volume profile chart visualization</span>
              </div>
            </Card>
            
            <Card glass>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Market Depth</h2>
                <div className="bg-muted/50 rounded-md p-1 flex">
                  <Button variant="secondary" size="sm" className="h-8 w-8 px-0">
                    <BarChart3 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <LineChart size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="h-[300px] bg-muted/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Market depth chart visualization</span>
              </div>
            </Card>
          </div>
          
          {/* Correlation Matrix */}
          <Card glass>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Asset Correlation Matrix</h2>
              <Select defaultValue="30d">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-[400px] bg-muted/30 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Correlation matrix visualization</span>
            </div>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-border/40">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-sm text-muted-foreground">
                © 2024 QuantiTrade. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Button>
              <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Button>
              <Button variant="link" size="sm" className="text-muted-foreground hover:text-foreground">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Charts;
