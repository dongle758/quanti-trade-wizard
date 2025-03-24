
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Chip } from '@/components/UI/Chip';
import { Slider } from '@/components/ui/slider';
import { AlertTriangle, Shield, Bell, PieChart, ArrowUpDown } from 'lucide-react';

const RiskManagement = () => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-primary" size={20} />
          <h2 className="text-2xl font-semibold">Risk Management</h2>
        </div>
        <p className="text-muted-foreground mb-6">Configure risk parameters and limits for your trading activities</p>
        
        <Tabs defaultValue="parameters">
          <TabsList className="mb-6">
            <TabsTrigger value="parameters">Risk Parameters</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Position Limits</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="maxPositionSize">Max Position Size (% of Portfolio)</Label>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Slider
                      id="maxPositionSize"
                      defaultValue={[15]}
                      max={50}
                      min={1}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="maxLeverage">Max Leverage</Label>
                      <span className="text-sm text-muted-foreground">3x</span>
                    </div>
                    <Slider
                      id="maxLeverage"
                      defaultValue={[3]}
                      max={10}
                      min={1}
                      step={1}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Stop Loss Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="autoStopLoss" defaultChecked />
                      <Label htmlFor="autoStopLoss">Auto Stop Loss</Label>
                    </div>
                    <Input 
                      type="number"
                      placeholder="5%"
                      className="w-24 h-9"
                      defaultValue="5"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="trailingStop" />
                      <Label htmlFor="trailingStop">Trailing Stop</Label>
                    </div>
                    <Input 
                      type="number"
                      placeholder="2%"
                      className="w-24 h-9"
                      defaultValue="2"
                      disabled
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Take Profit Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="autoTakeProfit" defaultChecked />
                      <Label htmlFor="autoTakeProfit">Auto Take Profit</Label>
                    </div>
                    <Input 
                      type="number"
                      placeholder="15%"
                      className="w-24 h-9"
                      defaultValue="15"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="partialTakeProfit" />
                      <Label htmlFor="partialTakeProfit">Partial Take Profit</Label>
                    </div>
                    <Input 
                      type="number"
                      placeholder="10%"
                      className="w-24 h-9"
                      defaultValue="10"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Daily Limits</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxDailyLoss">Max Daily Loss</Label>
                    <Input 
                      id="maxDailyLoss"
                      type="number"
                      placeholder="$1,000"
                      className="w-32 h-9"
                      defaultValue="1000"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxDailyTrades">Max Daily Trades</Label>
                    <Input 
                      id="maxDailyTrades"
                      type="number"
                      placeholder="20"
                      className="w-32 h-9"
                      defaultValue="20"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Button className="w-full">Save Risk Parameters</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Alerts</h3>
                  
                  <div className="rounded-md border border-border/40 p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="alertAsset">Asset</Label>
                      <Input id="alertAsset" placeholder="BTC/USD" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="alertPrice">Price</Label>
                      <Input id="alertPrice" type="number" placeholder="45000" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="alertCondition">Condition</Label>
                      <div className="flex rounded-md overflow-hidden border border-border/40">
                        <Button 
                          type="button"
                          variant="outline"
                          className="flex-1 rounded-none"
                        >
                          Above
                        </Button>
                        <Button 
                          type="button"
                          variant="default"
                          className="flex-1 rounded-none"
                        >
                          Below
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full">Create Alert</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Preferences</h3>
                  
                  <div className="rounded-md border border-border/40 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="emailNotifs" defaultChecked />
                        <Label htmlFor="emailNotifs">Email Notifications</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="pushNotifs" defaultChecked />
                        <Label htmlFor="pushNotifs">Push Notifications</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch id="smsNotifs" />
                        <Label htmlFor="smsNotifs">SMS Notifications</Label>
                      </div>
                    </div>
                    
                    <div className="pt-2 mt-2 border-t border-border/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="orderNotifs" className="text-sm">Order Executions</Label>
                        <Switch id="orderNotifs" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="priceAlertNotifs" className="text-sm">Price Alerts</Label>
                        <Switch id="priceAlertNotifs" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="riskNotifs" className="text-sm">Risk Warnings</Label>
                        <Switch id="riskNotifs" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
                <div className="flex items-center gap-2 mb-2">
                  <Bell size={18} />
                  <h3 className="font-medium">Active Alerts</h3>
                </div>
                
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between bg-card p-3 rounded-md border border-border/40">
                    <div className="flex items-center gap-2">
                      <Chip variant="primary" size="sm">BTC/USD</Chip>
                      <span>Price below $42,000</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-card p-3 rounded-md border border-border/40">
                    <div className="flex items-center gap-2">
                      <Chip variant="primary" size="sm">ETH/USD</Chip>
                      <span>Price above $3,200</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
                  <h3 className="font-medium mb-3">Risk Exposure</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">BTC/USD</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-success h-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ETH/USD</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-warning h-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SOL/USD</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-destructive h-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-sm">90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
                  <h3 className="font-medium mb-3">Risk Allocation</h3>
                  
                  <div className="flex items-center justify-center p-4">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="flex flex-col items-center justify-center p-3 bg-card rounded-md border border-border/40">
                        <span className="text-sm text-muted-foreground mb-1">High Risk</span>
                        <span className="text-lg font-semibold">15%</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-3 bg-card rounded-md border border-border/40">
                        <span className="text-sm text-muted-foreground mb-1">Medium Risk</span>
                        <span className="text-lg font-semibold">35%</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-3 bg-card rounded-md border border-border/40">
                        <span className="text-sm text-muted-foreground mb-1">Low Risk</span>
                        <span className="text-lg font-semibold">40%</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-3 bg-card rounded-md border border-border/40">
                        <span className="text-sm text-muted-foreground mb-1">Cash</span>
                        <span className="text-lg font-semibold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={18} className="text-warning" />
                    <h3 className="font-medium">Risk Warnings</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={16} className="text-warning mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">High Exposure in SOL/USD</p>
                          <p className="text-xs text-muted-foreground">Your position exceeds recommended allocation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={16} className="text-warning mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Approaching Daily Loss Limit</p>
                          <p className="text-xs text-muted-foreground">Currently at 78% of your daily loss limit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 border border-border/40">
                  <h3 className="font-medium mb-3">Risk Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <span className="text-xs text-muted-foreground block mb-1">Sharpe Ratio</span>
                      <span className="text-lg font-semibold">1.75</span>
                    </div>
                    
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <span className="text-xs text-muted-foreground block mb-1">Max Drawdown</span>
                      <span className="text-lg font-semibold">-12.5%</span>
                    </div>
                    
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <span className="text-xs text-muted-foreground block mb-1">Win Rate</span>
                      <span className="text-lg font-semibold">68%</span>
                    </div>
                    
                    <div className="bg-card p-3 rounded-md border border-border/40">
                      <span className="text-xs text-muted-foreground block mb-1">Risk/Reward</span>
                      <span className="text-lg font-semibold">1:2.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default RiskManagement;
