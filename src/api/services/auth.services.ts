import { AUTH_ENDPOINTS } from "../endpoints/auth.endpoints";
import type { LoginRequest, LoginResponse, UserResponse } from "../types/auth.types";
import {apiAuth, apiClient} from "../api";

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await apiAuth.post(AUTH_ENDPOINTS.LOGIN, data);
        return response.data;
    },

    async logout(): Promise<{message: string}> {
        const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
        return response.data;
    },

    async getUser(): Promise<UserResponse> {
        const response = await apiClient.get(AUTH_ENDPOINTS.GET_USER);
        return response.data.data;
    }
};
