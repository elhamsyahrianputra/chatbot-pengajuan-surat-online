export const CASE_ENDPOINTS = {
    INDEX: "api/case-records",
    GET_VERIFIED: "api/case-records/verified",
    STORE: "api/case-records",
    SHOW: (id: string) => `api/case-records/${id}`,
    UPDATE: (id: string) => `/api/case-records/${id}`,
    DELETE: (id: string) => `api/case-records/${id}`,
};
