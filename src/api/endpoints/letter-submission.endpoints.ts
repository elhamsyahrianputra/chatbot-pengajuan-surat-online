export const LETTER_SUBMISSION_ENDPOINTS = {
    INDEX: '/letter-submissions',
    STORE: '/letter-submissions',
    SHOW: (id: string) => `/letter-submissions/${id}`,
    UPDATE: (id: string) => `/letter-submissions/${id}`,
    DELETE: (id: string) => `/letter-submissions/${id}`,
}