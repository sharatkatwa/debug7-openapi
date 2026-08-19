import { apiClient } from "./client";
import type { ApiResponse, Order } from "./types";

export const ordersApi = {
  placeOrder: async (): Promise<Order> => {
    const res = await apiClient.post<ApiResponse<Order>>("/orders");
    return res.data.data;
  },

  getOrderHistory: async (): Promise<Order[]> => {
    const res = await apiClient.get<ApiResponse<Order[]>>("/orders");
    return res.data.data;
  },
};
