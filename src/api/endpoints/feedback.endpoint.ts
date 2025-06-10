export const FEEDBACK_ENDPOINTS = {
    INDEX: "api/feedback",
    STORE: "api/feedback",
    SHOW: (id: string) => `api/feedback/${id}`,
    UPDATE: (id: string) => `/api/feedback/${id}`,
    DELETE: (id: string) => `api/feedback/${id}`,
};
