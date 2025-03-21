
import { apiService } from './apiService';
import { ENDPOINTS } from './config';
import { ApiResponse, MarketData, ChartDataPoint, MarketSummary } from './types';

/**
 * Get market overview data
 */
export const getMarketOverview = async (): Promise<ApiResponse<{
  marketData: MarketData[],
  summary: MarketSummary
}>> => {
  return apiService.get(ENDPOINTS.MARKET.OVERVIEW);
};

/**
 * Get chart data for a specific market and timeframe
 */
export const getChartData = async (
  market: string = 'btcusd',
  timeframe: string = '1d'
): Promise<ApiResponse<ChartDataPoint[]>> => {
  return apiService.get(ENDPOINTS.MARKET.CHART_DATA, { market, timeframe });
};

/**
 * Get correlation matrix data
 */
export const getCorrelationData = async (
  period: string = '30d'
): Promise<ApiResponse<any>> => {
  return apiService.get(ENDPOINTS.MARKET.CORRELATION, { period });
};
