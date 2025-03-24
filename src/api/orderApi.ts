
import { apiService } from './apiService';
import { ENDPOINTS } from './config';
import { ApiResponse } from './types';

// Types for order-related data
interface Order {
  id: string;
  pair: string;
  type: 'market' | 'limit' | 'stop';
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  status: 'open' | 'completed' | 'canceled';
  time: string;
}

interface PlaceOrderParams {
  pair: string;
  type: 'market' | 'limit' | 'stop';
  side: 'buy' | 'sell';
  amount: number;
  price?: number;
  stopPrice?: number;
}

// Update config.ts with new endpoints
const orderEndpoints = {
  LIST: '/orders/list',
  PLACE: '/orders/place',
  CANCEL: '/orders/cancel',
  HISTORY: '/orders/history',
};

// Get active orders
export const getActiveOrders = async (): Promise<ApiResponse<Order[]>> => {
  return apiService.get(orderEndpoints.LIST);
};

// Get order history
export const getOrderHistory = async (): Promise<ApiResponse<Order[]>> => {
  return apiService.get(orderEndpoints.HISTORY);
};

// Place a new order
export const placeOrder = async (orderParams: PlaceOrderParams): Promise<ApiResponse<Order>> => {
  return apiService.post(orderEndpoints.PLACE, orderParams);
};

// Cancel an order
export const cancelOrder = async (orderId: string): Promise<ApiResponse<{ success: boolean }>> => {
  return apiService.post(orderEndpoints.CANCEL, { orderId });
};
