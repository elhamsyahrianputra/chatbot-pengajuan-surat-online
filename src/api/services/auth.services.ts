import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints/auth.endpoints';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, data);
    return response.data;
  }
};