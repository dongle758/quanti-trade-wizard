
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import MarketOverview from '@/components/Dashboard/MarketOverview';
import TradingChart from '@/components/Dashboard/TradingChart';
import StrategyBuilder from '@/components/Dashboard/StrategyBuilder';
import PortfolioSummary from '@/components/Dashboard/PortfolioSummary';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  // Simulate loading and staged animations
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-screen-2xl mx-auto space-y-6">
          {/* First Row: Market Overview */}
          <section className={`opacity-0 transform translate-y-4 transition-all duration-500 ease-out ${
            loaded ? 'opacity-100 translate-y-0 delay-100' : ''
          }`}>
            <MarketOverview />
          </section>
          
          {/* Second Row: Trading Chart */}
          <section className={`opacity-0 transform translate-y-4 transition-all duration-500 ease-out ${
            loaded ? 'opacity-100 translate-y-0 delay-300' : ''
          }`}>
            <TradingChart />
          </section>
          
          {/* Third Row: Strategy Builder and Portfolio */}
          <section className={`grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-0 transform translate-y-4 transition-all duration-500 ease-out ${
            loaded ? 'opacity-100 translate-y-0 delay-500' : ''
          }`}>
            <div className="lg:col-span-2">
              <StrategyBuilder />
            </div>
            <div>
              <PortfolioSummary />
            </div>
          </section>
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

export default Index;
