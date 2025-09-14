import { Feedback } from "./feedback.types";

export interface Case {
    id: string;
    problem: string;
    solution?: string | null;
    keywords?: string | null;
    frequency: number;
    confidence_score?: number | null;
    status: "verified" | "unverified" | "deprecated";
    feedback?: Feedback[];
}

export type GetCaseParams = {
    include?: string | string[];
};

export type GetVerifiedCaseParams = {
    include?: string | string[];
    keywords?: string | string[];
};

export interface StoreCaseRequest {
    problem: string;
    solution?: string;
    keywords?: string;
    frequency: number;
    confidence_score?: number;
    status?: "unverified" | "verified" | "deprecated";
}

export interface UpdateCaseRequest {
    problem?: string | null;
    solution?: string | null;
    keywords?: string | null;
    frequency?: number | null;
    confidence_score?: number | null;
    status?: "unverified" | "verified" | "deprecated";
}
