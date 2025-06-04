export interface LetterRequirement {
    id: string;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
}

export interface StoreLetterRequirementRequest {
    letter_type_id: string;
    name: string;
    description: string;
}

export interface UpdateLetterRequirementRequest {
    name: string;
    description: string;
}