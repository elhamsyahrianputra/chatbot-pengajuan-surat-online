export const LETTER_TYPE_ENDPOINTS = {
    INDEX: 'api/letter-types',
    STORE: 'api/letter-types',
    SHOW: (id: string) => `api/letter-types/${id}`,
    SHOW_BY_SLUG: (id: string) => `api/letter-types/slug/${id}`,
    UPDATE: (id: string) => `/api/letter-types/${id}`,
    DELETE: (id: string) => `api/letter-types/${id}`,
}