export const FEEDBACK_ENDPOINTS = {
    INDEX: "api/case-feedback",
    STORE: "api/case-feedback",
    SHOW: (id: string) => `api/case-feedback/${id}`,
    UPDATE: (id: string) => `/api/case-feedback/${id}`,
    DELETE: (id: string) => `api/case-feedback/${id}`,
};
