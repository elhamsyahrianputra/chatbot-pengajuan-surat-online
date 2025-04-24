import { LetterRequirement } from "./letter-requirement.types";

export interface LetterType {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    requirements?: LetterRequirement[];
}

export interface StoreLetterTypeRequest {
    name: string;
}

export interface UpdateLetterTypeRequest {
    name: string;
}

export type GetLetterTypeParams = {
    include?: string | string[];
  };