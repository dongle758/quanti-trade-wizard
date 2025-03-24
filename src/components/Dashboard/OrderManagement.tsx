
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chip } from '@/components/UI/Chip';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, ArrowDownUp, Filter, MoreHorizontal, EyeIcon, XCircle } from 'lucide-react';

// Sample orders data
const orders = [
  { id: '#28934', pair: 'BTC/USD', type: 'market', side: 'buy', amount: 0.15, price: 43250, status: 'completed', time: '2023-03-15 14:35' },
  { id: '#28933', pair: 'ETH/USD', type: 'limit', side: 'sell', amount: 1.5, price: 2890, status: 'open', time: '2023-03-15 14:30' },
  { id: '#28932', pair: 'SOL/USD', type: 'stop', side: 'sell', amount: 12, price: 105, status: 'canceled', time: '2023-03-15 13:45' },
  { id: '#28931', pair: 'BTC/USD', type: 'limit', side: 'buy', amount: 0.25, price: 42950, status: 'open', time: '2023-03-15 13:15' },
];

const OrderManagement = () => {
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState('buy');
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-border/40">
        <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
        
        <Tabs defaultValue="newOrder">
          <TabsList className="mb-6">
            <TabsTrigger value="newOrder">New Order</TabsTrigger>
            <TabsTrigger value="activeOrders">Active Orders</TabsTrigger>
            <TabsTrigger value="orderHistory">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="newOrder" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Order Form */}
                <div className="space-y-2">
                  <div className="flex rounded-md overflow-hidden border border-border/40">
                    <Button 
                      type="button"
                      variant={side === 'buy' ? 'default' : 'outline'}
                      className={`flex-1 rounded-none ${side === 'buy' ? 'bg-success hover:bg-success/90' : ''}`}
                      onClick={() => setSide('buy')}
                    >
                      Buy
                    </Button>
                    <Button 
                      type="button"
                      variant={side === 'sell' ? 'default' : 'outline'}
                      className={`flex-1 rounded-none ${side === 'sell' ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                      onClick={() => setSide('sell')}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Trading Pair</Label>
                  <Select defaultValue="btcusd">
                    <SelectTrigger>
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btcusd">BTC/USD</SelectItem>
                      <SelectItem value="ethusd">ETH/USD</SelectItem>
                      <SelectItem value="solusd">SOL/USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                
                {orderType !== 'market' && (
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                )}
                
                {orderType === 'stop' && (
                  <div className="space-y-2">
                    <Label>Stop Price</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                )}
                
                <Button className="w-full mt-4" size="lg">
                  {side === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                </Button>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{orderType.charAt(0).toUpperCase() + orderType.slice(1)} {side}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">$43,245.00</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">0.1 BTC</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">$4,324.50</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-medium">$4.32</span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-border/40 flex justify-between text-sm">
                  <span>Final Amount</span>
                  <span className="font-bold">$4,328.82</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activeOrders" className="animate-fade-in">
            <div className="border border-border/40 rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.filter(order => order.status === 'open').map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.pair}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Chip 
                          variant={order.side === 'buy' ? 'success' : 'danger'}
                          size="sm"
                        >
                          {order.side}
                        </Chip>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>${order.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          variant={order.status === 'completed' ? 'success' : order.status === 'open' ? 'primary' : 'danger'}
                          size="sm"
                        >
                          {order.status}
                        </Chip>
                      </TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <XCircle size={16} className="mr-1" />
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="orderHistory" className="animate-fade-in">
            <div className="border border-border/40 rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.pair}</TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Chip 
                          variant={order.side === 'buy' ? 'success' : 'danger'}
                          size="sm"
                        >
                          {order.side}
                        </Chip>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>${order.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          variant={order.status === 'completed' ? 'success' : order.status === 'open' ? 'primary' : 'danger'}
                          size="sm"
                        >
                          {order.status}
                        </Chip>
                      </TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <EyeIcon size={16} className="mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default OrderManagement;
