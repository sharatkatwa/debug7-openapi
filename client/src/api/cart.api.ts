import { apiClient } from "./client";
import type { AddCartItemDTO, ApiResponse, Cart } from "./types";

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const res = await apiClient.get<ApiResponse<Cart>>("/cart");
    return res.data.data;
  },

  addItem: async (item: AddCartItemDTO): Promise<Cart> => {
    const res = await apiClient.post<ApiResponse<Cart>>("/cart", item);
    return res.data.data;
  },
};
