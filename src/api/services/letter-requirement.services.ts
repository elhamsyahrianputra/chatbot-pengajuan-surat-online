// src/api/services/letter-requirement.service.ts
import {apiClient} from "../api";
import { LETTER_REQUIREMENT_ENDPOINTS } from "../endpoints/letter-requirement.endpoints";
import { LetterRequirement, StoreLetterRequirementRequest, UpdateLetterRequirementRequest } from "../types/letter-requirement.types";

export const letterRequirementService = {
    /**
     * Get all letter requirements without pagination
     * @returns List of all letter requirements
     */
    async getAll(): Promise<LetterRequirement[]> {
        const response = await apiClient.get(LETTER_REQUIREMENT_ENDPOINTS.INDEX);
        return response.data.data;
    },

    /**
     * Get a specific letter requirement by ID
     * @param id - Letter requirement ID
     * @returns Letter requirement data
     */
    async getById(id: string): Promise<LetterRequirement> {
        const response = await apiClient.get(LETTER_REQUIREMENT_ENDPOINTS.SHOW(id));
        return response.data.data;
    },

    /**
     * Create a new letter requirement
     * @param data - Letter requirement data to create
     * @returns Created letter requirement
     */
    async create(data: StoreLetterRequirementRequest): Promise<LetterRequirement> {
        const response = await apiClient.post(LETTER_REQUIREMENT_ENDPOINTS.STORE, data);
        return response.data.data;
    },

    /**
     * Update an existing letter requirement
     * @param id - Letter requirement ID to update
     * @param data - Data to update
     * @returns Updated letter requirement
     */
    async update(id: string, data: UpdateLetterRequirementRequest): Promise<LetterRequirement> {
        const response = await apiClient.put(LETTER_REQUIREMENT_ENDPOINTS.UPDATE(id), data);
        return response.data;
    },

    /**
     * Delete a letter requirement
     * @param id - Letter requirement ID to delete
     * @returns Success status
     */
    async delete(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete(LETTER_REQUIREMENT_ENDPOINTS.DELETE(id));
        return response.data;
    },
};
