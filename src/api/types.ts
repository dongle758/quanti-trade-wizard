
// API response types for market data
export interface MarketData {
  name: string;
  price: number;
  change: number;
  volume: string;
  volumeValue: number;
}

export interface ChartDataPoint {
  date: string;
  price: number;
  volume: number;
}

export interface PortfolioPosition {
  asset: string;
  allocation: number;
  value: number;
  change: number;
}

export interface MarketSummary {
  globalMarketCap: string;
  globalMarketCapChange: number;
  volume24h: string;
  volume24hChange: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
