import { apiClient } from "./client";
import { tokenStorage } from "./tokenStorage";
import type {
  ApiResponse,
  AuthResultDTO,
  LoginDTO,
  RefreshResultDTO,
  RegisterDTO,
} from "./types";

export const authApi = {
  register: async (data: RegisterDTO): Promise<AuthResultDTO> => {
    const res = await apiClient.post<ApiResponse<AuthResultDTO>>("/users/register", data);
    tokenStorage.setTokens(res.data.data.accessToken, res.data.data.refreshToken);
    return res.data.data;
  },

  login: async (data: LoginDTO): Promise<AuthResultDTO> => {
    const res = await apiClient.post<ApiResponse<AuthResultDTO>>("/users/login", data);
    tokenStorage.setTokens(res.data.data.accessToken, res.data.data.refreshToken);
    return res.data.data;
  },

  refreshToken: async (token?: string): Promise<RefreshResultDTO> => {
    const res = await apiClient.post<ApiResponse<RefreshResultDTO>>("/users/refresh-token", {
      refreshToken: token || tokenStorage.getRefreshToken(),
    });
    tokenStorage.setTokens(res.data.data.accessToken, res.data.data.refreshToken);
    return res.data.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post<ApiResponse<null>>("/users/logout", {
        refreshToken: tokenStorage.getRefreshToken(),
      });
    } finally {
      tokenStorage.clearTokens();
    }
  },
};
