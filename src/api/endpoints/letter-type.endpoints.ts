export const LETTER_TYPE_ENDPOINTS = {
    INDEX: '/letter-types',
    STORE: '/letter-types',
    SHOW: (id: string) => `/letter-types/${id}`,
    SHOW_BY_SLUG: (id: string) => `/letter-types/slug/${id}`,
    UPDATE: (id: string) => `/letter-types/${id}`,
    DELETE: (id: string) => `/letter-types/${id}`,
}