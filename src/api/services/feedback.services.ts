import { apiClient } from "../api";
import { FEEDBACK_ENDPOINTS } from "../endpoints/feedback.endpoint";
import { Feedback, StoreFeedbackRequest } from "../types/feedback.types";

export const feedbackService = {
    /**
     * Create a new feedback
     * @param data - feedback data to create
     * @returns Created feedback
     */
    async create(data: StoreFeedbackRequest): Promise<Feedback> {
        const response = await apiClient.post(FEEDBACK_ENDPOINTS.STORE, data);
        return response.data;
    }
};
