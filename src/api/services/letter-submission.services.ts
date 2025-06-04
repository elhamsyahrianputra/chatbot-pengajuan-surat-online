// src/api/services/letter-type.service.ts
import { apiClient, apiFile } from "../api";
import { LETTER_SUBMISSION_ENDPOINTS } from "../endpoints/letter-submission.endpoints";
import { GetLetterSubmissionParams, LetterSubmission, UpdateLetterSubmissionRequest } from "../types/letter-submission.types";

export const letterSubmissionService = {
    /**
     * Get all letter submission without pagination
     * @returns List of all letter submission
     */
    async getAll(params?: GetLetterSubmissionParams): Promise<LetterSubmission[]> {
        const response = await apiClient.get(LETTER_SUBMISSION_ENDPOINTS.INDEX, {
            params,
        });
        return response.data.data;
    },

    /**
     * Create a new letter submission by slug
     * @param data - Letter submission data to create
     * @returns Created letter submission
     */
    async create(data: FormData): Promise<LetterSubmission> {
        const response = await apiFile.post(LETTER_SUBMISSION_ENDPOINTS.STORE, data);
        return response.data;
    },

    /**
     * Get a specific letter submission by ID
     * @param id - Letter submission ID
     * @returns Letter submission data
     */
    async getById(id: string, params?: GetLetterSubmissionParams): Promise<LetterSubmission> {
        const response = await apiClient.get(LETTER_SUBMISSION_ENDPOINTS.SHOW(id), {
            params,
        });
        return response.data.data;
    },

    /**
     * Get a latest letter submission by User
     * @returns Letter submission data
     */
    async getLatestByUser(params?: GetLetterSubmissionParams): Promise<LetterSubmission> {
        const response = await apiClient.get(LETTER_SUBMISSION_ENDPOINTS.GET_LATEST_BY_USER, {
            params,
        });
        return response.data.data;
    },

    /**
     * Get a specific letter submission by code
     * @param id - Letter submission Code
     * @returns Letter submission data
     */
    async getByCode(code: string, params?: GetLetterSubmissionParams): Promise<LetterSubmission> {
        const response = await apiClient.get(LETTER_SUBMISSION_ENDPOINTS.GET_BY_CODE(code), {
            params,
        });
        return response.data.data;
    },

    //   /**
    //    * Create a new letter submission
    //    * @param data - Letter submission data to create
    //    * @returns Created letter submission
    //    */
    //   async create(data: StoreLetterTypeRequest): Promise<LetterType> {
    //     const response = await apiClient.post(LETTER_SUBMISSION_ENDPOINTS.STORE, data);
    //     return response.data;
    //   },

    /**
     * Update an existing letter submission
     * @param id - Letter submission ID to update
     * @param data - Data to update
     * @returns Updated letter submission
     */
    async update(id: string, data: UpdateLetterSubmissionRequest): Promise<LetterSubmission> {
        const response = await apiClient.put(LETTER_SUBMISSION_ENDPOINTS.UPDATE(id), data);
        return response.data.data;
    },

    /**
     * Delete a letter submission
     * @param id - Letter submission ID to delete
     * @returns Success status
     */
    async delete(id: string): Promise<{ message: string }> {
        const response = await apiClient.delete(LETTER_SUBMISSION_ENDPOINTS.DELETE(id));
        return response.data;
    },
};
