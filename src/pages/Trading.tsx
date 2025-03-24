
import React from 'react';
import Header from '@/components/Layout/Header';
import TradingChart from '@/components/Dashboard/TradingChart';
import OrderManagement from '@/components/Dashboard/OrderManagement';
import RiskManagement from '@/components/Dashboard/RiskManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/UI/Chip';
import { 
  Bell, UserCircle, Settings, Info, PanelLeftOpen, 
  ArrowDownUp, AreaChart, LineChart, CandlestickChart, AlertTriangle 
} from 'lucide-react';

const Trading = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-screen-2xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Execute trades, manage orders, and monitor your performance
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Bell size={16} className="mr-2" />
                <span>Alerts</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </Button>
              <Button size="sm" className="h-9">
                <UserCircle size={16} className="mr-2" />
                <span>Account</span>
              </Button>
            </div>
          </div>
          
          {/* Market Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">BTC/USD</span>
                <Chip variant="success" size="sm">+2.45%</Chip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$43,521.67</span>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">ETH/USD</span>
                <Chip variant="danger" size="sm">-1.23%</Chip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$2,845.13</span>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">SOL/USD</span>
                <Chip variant="success" size="sm">+3.78%</Chip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$106.82</span>
              </div>
            </Card>
            
            <Card className="p-4 border border-border/40">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Market Cap</span>
                <Chip variant="primary" size="sm">24h</Chip>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$1.82T</span>
                <span className="text-sm text-success">+1.2%</span>
              </div>
            </Card>
          </div>
          
          {/* Main Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Trading Chart */}
              <TradingChart />
              
              {/* Order Management */}
              <div className="mt-6">
                <OrderManagement />
              </div>
            </div>
            
            <div>
              {/* Risk Management */}
              <RiskManagement />
            </div>
          </div>
          
          {/* Notifications and Alerts */}
          <div className="mt-8">
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="text-primary" size={20} />
                  <h2 className="text-2xl font-semibold">Notifications & Alerts</h2>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-border/40">
                    <div className="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full text-primary">
                      <ArrowDownUp size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Trade Executed</h3>
                        <span className="text-xs text-muted-foreground">10 min ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Your limit order to buy 0.15 BTC at $43,250 has been executed successfully.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-border/40">
                    <div className="h-8 w-8 flex items-center justify-center bg-warning/10 rounded-full text-warning">
                      <AlertTriangle size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Price Alert</h3>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">ETH/USD has dropped below your alert price of $2,900.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-md border border-border/40">
                    <div className="h-8 w-8 flex items-center justify-center bg-success/10 rounded-full text-success">
                      <Info size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Strategy Update</h3>
                        <span className="text-xs text-muted-foreground">3 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Your "Golden Cross" strategy is generating a buy signal for BTC/USD.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
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

export default Trading;
