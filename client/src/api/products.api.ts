import { apiClient } from "./client";
import type {
  ApiResponse,
  CreateProductDTO,
  Product,
  ProductFilterDTO,
  UpdateProductDTO,
} from "./types";

export const productsApi = {
  getAll: async (filters?: ProductFilterDTO): Promise<Product[]> => {
    const res = await apiClient.get<ApiResponse<Product[]>>("/products", {
      params: filters,
    });
    return res.data.data;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return res.data.data;
  },

  create: async (data: CreateProductDTO): Promise<Product> => {
    const res = await apiClient.post<ApiResponse<Product>>("/products", data);
    return res.data.data;
  },

  update: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const res = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<{ id: string }> => {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/products/${id}`);
    return res.data.data;
  },
};
