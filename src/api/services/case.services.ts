import {apiClient} from "../api";
import { CASE_ENDPOINTS } from "../endpoints/case.endpoint";
import { Case, GetCaseParams, StoreCaseRequest, UpdateCaseRequest } from "../types/case.types";

export const caseService = {
    /**
     * Get all cases without pagination
     * @returns List of all cases
     */
    async getAll(params?: GetCaseParams): Promise<Case[]> {
        const response = await apiClient.get(CASE_ENDPOINTS.INDEX, {
            params
        });
        return response.data.data;
    },

    /**
     * Get a specific case by ID
     * @param id - case ID
     * @returns case data
     */
    async getById(id: string, params?: GetCaseParams): Promise<Case> {
        const response = await apiClient.get(CASE_ENDPOINTS.SHOW(id), {
            params,
        });
        return response.data.data;
    },

    /**
     * Create a new case
     * @param data - case data to create
     * @returns Created case
     */
    async create(data: StoreCaseRequest): Promise<Case> {
        const response = await apiClient.post(CASE_ENDPOINTS.STORE, data);
        return response.data;
    },

    /**
     * Update an existing case
     * @param id - case ID to update
     * @param data - Data to update
     * @returns Updated case
     */
    async update(id: string, data: UpdateCaseRequest): Promise<Case> {
        const response = await apiClient.put(CASE_ENDPOINTS.UPDATE(id), data);
        return response.data.data;
    },

    /**
     * Delete a case
     * @param id - case ID to delete
     * @returns Success status
     */
    async delete(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete(CASE_ENDPOINTS.DELETE(id));
        return response.data;
    },
};
