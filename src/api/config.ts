
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
  },
  ORDERS: {
    LIST: '/orders/list',
    PLACE: '/orders/place',
    CANCEL: '/orders/cancel',
    HISTORY: '/orders/history',
  },
  RISK: {
    PARAMETERS: '/risk/parameters',
    EXPOSURE: '/risk/exposure',
    WARNINGS: '/risk/warnings',
    METRICS: '/risk/metrics',
    ALLOCATION: '/risk/allocation',
  },
  NOTIFICATIONS: {
    LIST: '/notifications/list',
    MARK_READ: '/notifications/markRead',
    SETTINGS: '/notifications/settings',
  }
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
