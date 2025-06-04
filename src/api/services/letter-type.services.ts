import {apiClient} from "../api";
import { LETTER_TYPE_ENDPOINTS } from "../endpoints/letter-type.endpoints";
import type { GetLetterTypeParams, LetterType, StoreLetterTypeRequest, UpdateLetterTypeRequest } from "../types/letter-type.types";

export const letterTypeService = {
    /**
     * Get all letter types without pagination
     * @returns List of all letter types
     */
    async getAll(params?: GetLetterTypeParams): Promise<LetterType[]> {
        const response = await apiClient.get(LETTER_TYPE_ENDPOINTS.INDEX, {
            params
        });
        return response.data.data;
    },

    /**
     * Get a specific letter type by ID
     * @param id - Letter type ID
     * @returns Letter type data
     */
    async getById(id: string, params?: GetLetterTypeParams): Promise<LetterType> {
        const response = await apiClient.get(LETTER_TYPE_ENDPOINTS.SHOW(id), {
            params,
        });
        return response.data.data;
    },

    /**
     * Get a specific letter type by ID
     * @param id - Letter type ID
     * @returns Letter type data
     */
    async getBySlug(slug: string, params?: GetLetterTypeParams): Promise<LetterType> {
        const response = await apiClient.get(LETTER_TYPE_ENDPOINTS.SHOW_BY_SLUG(slug), { params });
        return response.data.data;
    },

    /**
     * Create a new letter type
     * @param data - Letter type data to create
     * @returns Created letter type
     */
    async create(data: StoreLetterTypeRequest): Promise<LetterType> {
        const response = await apiClient.post(LETTER_TYPE_ENDPOINTS.STORE, data);
        return response.data;
    },

    /**
     * Update an existing letter type
     * @param id - Letter type ID to update
     * @param data - Data to update
     * @returns Updated letter type
     */
    async update(id: string, data: UpdateLetterTypeRequest): Promise<LetterType> {
        const response = await apiClient.put(LETTER_TYPE_ENDPOINTS.UPDATE(id), data);
        return response.data.data;
    },

    /**
     * Delete a letter type
     * @param id - Letter type ID to delete
     * @returns Success status
     */
    async delete(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete(LETTER_TYPE_ENDPOINTS.DELETE(id));
        return response.data;
    },
};
