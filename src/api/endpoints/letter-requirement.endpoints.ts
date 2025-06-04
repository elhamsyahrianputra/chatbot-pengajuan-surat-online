export const LETTER_REQUIREMENT_ENDPOINTS = {
    INDEX: "api/letter-requirements",
    STORE: "api/letter-requirements",
    SHOW: (id: string) => `api/letter-requirements/${id}`,
    UPDATE: (id: string) => `api/letter-requirements/${id}`,
    DELETE: (id: string) => `/api/letter-requirements/${id}`,
};
