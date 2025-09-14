export const CASE_ENDPOINTS = {
    INDEX: "api/case-records",
    GET_VERIFIED: "api/case-records/verified",
    STORE: "api/case-records",
    SHOW: (id: string) => `api/case-records/${id}`,
    SHOW_BY_PROBLEM: (problem: string) => `api/case-records/problem/${problem}`,
    UPDATE: (id: string) => `/api/case-records/${id}`,
    DELETE: (id: string) => `api/case-records/${id}`,
};
