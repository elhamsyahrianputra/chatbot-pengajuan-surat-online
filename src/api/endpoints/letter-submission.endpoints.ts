export const LETTER_SUBMISSION_ENDPOINTS = {
    INDEX: 'api/letter-submissions',
    STORE: 'api/letter-submissions',
    SHOW: (id: string) => `api/letter-submissions/${id}`,
    GET_LATEST_BY_USER: `api/letter-submissions/get-latest-by-user`,
    GET_BY_CODE: (code: string) =>  `api/letter-submissions/code/${code}`,
    UPDATE: (id: string) => `api/letter-submissions/${id}`,
    DELETE: (id: string) => `api/letter-submissions/${id}`,
}