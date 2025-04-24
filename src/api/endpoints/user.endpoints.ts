export const USER_ENDPOINTS = {
    INDEX: '/users',
    STORE: '/users',
    SHOW: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
}