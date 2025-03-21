
import { apiService } from './apiService';
import { ENDPOINTS } from './config';
import { ApiResponse, PortfolioPosition } from './types';

/**
 * Get portfolio summary data
 */
export const getPortfolioSummary = async (): Promise<ApiResponse<{
  totalValue: number;
  totalChange: number;
  changePercentage: number;
  positions: PortfolioPosition[];
}>> => {
  return apiService.get(ENDPOINTS.PORTFOLIO.SUMMARY);
};

/**
 * Get portfolio performance history
 */
export const getPortfolioPerformance = async (
  period: string = '1m'
): Promise<ApiResponse<any>> => {
  return apiService.get(ENDPOINTS.PORTFOLIO.PERFORMANCE, { period });
};
