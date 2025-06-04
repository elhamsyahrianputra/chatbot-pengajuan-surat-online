export const USER_ENDPOINTS = {
    INDEX: 'api/users',
    STORE: 'api/users',
    SHOW: (id: string) => `api/users/${id}`,
    UPDATE: (id: string) => `api/users/${id}`,
    DELETE: (id: string) => `api/users/${id}`,
}