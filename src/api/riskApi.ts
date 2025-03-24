
import { apiService } from './apiService';
import { ApiResponse } from './types';

// Types for risk management data
interface RiskParameters {
  maxPositionSize: number;
  maxLeverage: number;
  autoStopLoss: boolean;
  stopLossPercentage: number;
  trailingStop: boolean;
  trailingStopPercentage: number;
  autoTakeProfit: boolean;
  takeProfitPercentage: number;
  maxDailyLoss: number;
  maxDailyTrades: number;
}

interface RiskExposure {
  asset: string;
  percentage: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface RiskWarning {
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

interface RiskAllocation {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  cash: number;
}

interface RiskMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  riskRewardRatio: string;
}

// Risk management API endpoints
const riskEndpoints = {
  PARAMETERS: '/risk/parameters',
  EXPOSURE: '/risk/exposure',
  WARNINGS: '/risk/warnings',
  METRICS: '/risk/metrics',
  ALLOCATION: '/risk/allocation',
};

// Get risk parameters
export const getRiskParameters = async (): Promise<ApiResponse<RiskParameters>> => {
  return apiService.get(riskEndpoints.PARAMETERS);
};

// Update risk parameters
export const updateRiskParameters = async (
  params: Partial<RiskParameters>
): Promise<ApiResponse<RiskParameters>> => {
  return apiService.post(riskEndpoints.PARAMETERS, params);
};

// Get risk exposure
export const getRiskExposure = async (): Promise<ApiResponse<RiskExposure[]>> => {
  return apiService.get(riskEndpoints.EXPOSURE);
};

// Get risk warnings
export const getRiskWarnings = async (): Promise<ApiResponse<RiskWarning[]>> => {
  return apiService.get(riskEndpoints.WARNINGS);
};

// Get risk metrics
export const getRiskMetrics = async (): Promise<ApiResponse<RiskMetrics>> => {
  return apiService.get(riskEndpoints.METRICS);
};

// Get risk allocation
export const getRiskAllocation = async (): Promise<ApiResponse<RiskAllocation>> => {
  return apiService.get(riskEndpoints.ALLOCATION);
};
