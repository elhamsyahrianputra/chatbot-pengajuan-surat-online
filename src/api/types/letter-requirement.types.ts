export interface LetterRequirement {
    id: string;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export interface StoreLetterRequirementRequest {
    name: string;
    description: string;
}

export interface UpdateLetterRequirementRequest {
    name: string;
    description: string;
}