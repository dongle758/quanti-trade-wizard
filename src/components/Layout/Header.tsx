
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle scroll effect for glass header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItems = () => (
    <>
      <NavLink to="/" icon={<BarChart3 size={18} />} label="Dashboard" />
      <NavLink to="/charts" icon={<LineChart size={18} />} label="Charts" />
      <NavLink to="/strategy" icon={<PieChart size={18} />} label="Strategy" />
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-md bg-background/80 shadow-subtle' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">QuantiTrade</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-1">
            <NavItems />
          </nav>
        )}

        {/* Search Bar and Icons */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell size={18} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings size={18} />
          </Button>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  icon, 
  label 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string;
}) => {
  const active = window.location.pathname === to;
  const isMobile = useIsMobile();
  
  const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-md transition-colors";
  const desktopClasses = !isMobile ? "hover:bg-muted/70" : "";
  const activeClasses = active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground";
  
  return (
    <Link to={to} className={`${baseClasses} ${desktopClasses} ${activeClasses}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;
