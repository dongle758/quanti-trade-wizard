
import React from 'react';
import Header from '@/components/Layout/Header';
import StrategyBuilder from '@/components/Dashboard/StrategyBuilder';
import { Button } from '@/components/ui/button';
import {Card} from '@/components/UI/Card';
import {Chip} from '@/components/UI/Chip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Save, PlayCircle, ChevronDown, ArrowUpDown, Plus, File, Copy, Trash } from 'lucide-react';

// Sample strategies data
const strategies = [
  { id: 1, name: 'Golden Cross', asset: 'BTC/USD', timeframe: '1D', profitFactor: 1.8, winRate: 65, status: 'active' },
  { id: 2, name: 'RSI Divergence', asset: 'ETH/USD', timeframe: '4H', profitFactor: 2.1, winRate: 58, status: 'active' },
  { id: 3, name: 'MACD Crossover', asset: 'SOL/USD', timeframe: '1H', profitFactor: 1.5, winRate: 62, status: 'inactive' },
  { id: 4, name: 'Triple Bottom', asset: 'BTC/USD', timeframe: '1W', profitFactor: 2.4, winRate: 70, status: 'active' },
];

const Strategy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-screen-2xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Strategy Builder</h1>
              <p className="text-muted-foreground mt-1">
                Create, test and optimize algorithmic trading strategies
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <File size={16} />
                <span>Load Template</span>
              </Button>
              <Button variant="default" className="flex items-center gap-1">
                <Plus size={16} />
                <span>New Strategy</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="builder">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="strategies">My Strategies</TabsTrigger>
              <TabsTrigger value="history">Backtest History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="mt-6">
              <StrategyBuilder />
            </TabsContent>
            
            <TabsContent value="strategies" className="mt-6 animate-fade-in">
              <Card glass>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-semibold">My Strategies</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9">
                      <ArrowUpDown size={14} className="mr-2" />
                      Sort
                    </Button>
                    <Button variant="outline" size="sm" className="h-9">
                      Filter
                      <ChevronDown size={14} className="ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border/40 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Strategy Name</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Timeframe</TableHead>
                        <TableHead>Profit Factor</TableHead>
                        <TableHead>Win Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {strategies.map(strategy => (
                        <TableRow key={strategy.id}>
                          <TableCell className="font-medium">{strategy.name}</TableCell>
                          <TableCell>{strategy.asset}</TableCell>
                          <TableCell>{strategy.timeframe}</TableCell>
                          <TableCell>{strategy.profitFactor}</TableCell>
                          <TableCell>{strategy.winRate}%</TableCell>
                          <TableCell>
                            <Chip 
                              variant={strategy.status === 'active' ? 'success' : 'secondary'}
                              size="sm"
                            >
                              {strategy.status}
                            </Chip>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <PlayCircle size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Copy size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6 animate-fade-in">
              <Card glass>
                <h2 className="text-2xl font-semibold mb-6">Backtest History</h2>
                
                <div className="border border-border/40 rounded-md p-6 text-center">
                  <div className="max-w-md mx-auto">
                    <p className="text-muted-foreground mb-4">
                      You haven't run any backtests yet. Create a strategy and run a backtest to see results here.
                    </p>
                    <Button>Create Strategy</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
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

export default Strategy;
