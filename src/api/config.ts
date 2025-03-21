
// Base API URL - change this to your backend server URL
export const API_BASE_URL = 'https://api.quantitrade.example/v1';

// API Endpoints
export const ENDPOINTS = {
  MARKET: {
    OVERVIEW: '/market/overview',
    CHART_DATA: '/market/chart',
    CORRELATION: '/market/correlation',
  },
  PORTFOLIO: {
    SUMMARY: '/portfolio/summary',
    POSITIONS: '/portfolio/positions',
    PERFORMANCE: '/portfolio/performance',
  },
  STRATEGY: {
    LIST: '/strategy/list',
    DETAILS: '/strategy/details',
    BACKTEST: '/strategy/backtest',
  }
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
