import React from 'react';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/UI/Chip';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ArrowDown, ArrowUp, ShieldAlert, ShieldCheck } from 'lucide-react';

const RiskManagement = () => {
  return (
    <Card className="space-y-6">
      <div className="pb-4 border-b border-border/40">
        <Chip size="sm" variant="primary" className="mb-2">Risk Management</Chip>
        <h2 className="text-2xl font-semibold">Portfolio Risk</h2>
      </div>
      
      <div className="space-y-4">
        <RiskSummaryCard 
          title="Risk Score" 
          value="72" 
          status="moderate" 
          description="Overall risk exposure based on asset allocation and market conditions." 
        />
        
        <RiskSummaryCard 
          title="Volatility" 
          value="5.8%" 
          status="low" 
          description="Historical volatility of your portfolio over the past 30 days." 
        />
        
        <RiskSummaryCard 
          title="Max Drawdown" 
          value="-8.2%" 
          status="moderate" 
          description="Maximum potential loss from peak to trough during a specified period." 
        />
      </div>
      
      <div className="pt-4 border-t border-border/40">
        <h3 className="text-xl font-semibold mb-4">Risk Breakdown</h3>
        
        <RiskFactor 
          asset="BTC" 
          allocation={45} 
          riskContribution={52} 
          status="moderate" 
        />
        <RiskFactor 
          asset="ETH" 
          allocation={30} 
          riskContribution={28} 
          status="low" 
        />
        <RiskFactor 
          asset="SOL" 
          allocation={15} 
          riskContribution={12} 
          status="low" 
        />
        <RiskFactor 
          asset="USDC" 
          allocation={10} 
          riskContribution={8} 
          status="low" 
        />
      </div>
    </Card>
  );
};

const RiskSummaryCard = ({ 
  title, 
  value, 
  status, 
  description 
}: { 
  title: string; 
  value: string; 
  status: 'low' | 'moderate' | 'high'; 
  description: string; 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'low': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'low': return <ShieldCheck size={20} className="text-green-500" />;
      case 'moderate': return <ShieldAlert size={20} className="text-yellow-500" />;
      case 'high': return <AlertTriangle size={20} className="text-red-500" />;
      default: return null;
    }
  };
  
  return (
    <div className="bg-muted/40 p-4 rounded-lg border border-border/40">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-muted-foreground mb-1">{title}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
        <div className="p-2">{getStatusIcon()}</div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className={`text-sm font-medium mt-2 ${getStatusColor()}`}>
        Risk: {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

const RiskFactor = ({ 
  asset, 
  allocation, 
  riskContribution, 
  status 
}: { 
  asset: string; 
  allocation: number; 
  riskContribution: number; 
  status: 'low' | 'moderate' | 'high'; 
}) => {
  const isPositive = riskContribution > allocation;
  
  return (
    <div className="bg-card p-3 rounded-md border border-border/40">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{asset}</span>
        <div className="flex items-center">
          <span className="text-sm font-medium">{riskContribution}%</span>
          <Chip
            size="sm"
            variant={status === 'high' ? 'danger' : status === 'moderate' ? 'warning' : 'success'}
            className="ml-2"
          >
            {status}
          </Chip>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
        <span>Allocation</span>
        <span>{allocation}%</span>
      </div>
      
      <Progress value={allocation} className="h-1.5" />
      
      {isPositive && (
        <div className="flex items-center text-xs text-destructive mt-2">
          <AlertTriangle size={14} className="mr-1" />
          <span>Risk contribution exceeds allocation</span>
        </div>
      )}
    </div>
  );
};

export default RiskManagement;
