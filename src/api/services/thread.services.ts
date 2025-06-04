import {apiClient} from "../api";
import { THREAD_ENDPOINTS } from "../endpoints/thread.endpoint";
import { StoreThreadRequest, Thread } from "../types/thread.types";

export const threadService = {
    /**
     * Get all threads without pagination
     * @returns List of all threads
     */
    async getAll(): Promise<Thread[]> {
        const response = await apiClient.get(THREAD_ENDPOINTS.INDEX);
        return response.data.data;
    },

    /**
     * Create a new thread
     * @param data - thread data to create
     * @returns Created thread
     */
    async create(data: StoreThreadRequest): Promise<Thread> {
        const response = await apiClient.post(THREAD_ENDPOINTS.STORE, data);
        return response.data.data;
    },

    /**
     * Delete all thread by user
     * @returns Success status
     */
    async delete(): Promise<{ message: string }> {
        const response = await apiClient.delete(THREAD_ENDPOINTS.DELETE);
        return response.data;
    },
};
