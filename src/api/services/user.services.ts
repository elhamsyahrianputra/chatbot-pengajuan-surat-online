// src/api/services/letter-type.service.ts
import {apiClient} from "../api";
import { USER_ENDPOINTS } from "../endpoints/user.endpoints";
import type {
    User
} from "../types/user.types";

export const userService = {
    /**
     * Get all letter types without pagination
     * @returns List of all letter types
     */
    async getAll(): Promise<User[]> {
        const response = await apiClient.get(USER_ENDPOINTS.INDEX);
        return response.data.data;
    },

    /**
     * Get a specific letter type by ID
     * @param id - Letter type ID
     * @returns Letter type data
     */
    async getById(id: string): Promise<User> {
        const response = await apiClient.get(USER_ENDPOINTS.SHOW(id));
        return response.data.data;
    },

    /**
     * Create a new letter type
     * @param data - Letter type data to create
     * @returns Created letter type
     */
    // async create(data: StoreLetterTypeRequest): Promise<LetterType> {
    //     const response = await apiClient.post(
    //         USER_ENDPOINTS.STORE,
    //         data,
    //     );
    //     return response.data;
    // },

    /**
     * Update an existing letter type
     * @param id - Letter type ID to update
     * @param data - Data to update
     * @returns Updated letter type
     */
    // async update(
    //     id: string,
    //     data: UpdateLetterTypeRequest,
    // ): Promise<LetterType> {
    //     const response = await apiClient.put(
    //         USER_ENDPOINTS.UPDATE(id),
    //         data,
    //     );
    //     return response.data;
    // },

    /**
     * Delete a letter type
     * @param id - Letter type ID to delete
     * @returns Success status
     */
    async delete(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete(
            USER_ENDPOINTS.DELETE(id),
        );
        return response.data;
    },
};
