import { Feedback } from "./feedback.types";

export interface Case {
    id: string;
    problem: string;
    solution: string;
    keywords: string;
    frequency: number;
    confidence_score: number;
    status: "verified" | "unverified" | "deprecated";
    feedback?: Feedback[];
}

export type GetCaseParams = {
    include?: string | string[];
};

export interface StoreCaseRequest {
    problem: string;
    solution: string;
    keywords: string;
    frequency: number;
    confidence_score: number;
    status: "unverified" | "verified" | "deprecated";
}

export interface UpdateCaseRequest {
    problem: string;
    solution: string;
    keywords: string;
    frequency: number;
    confidence_score: number;
    status: "unverified" | "verified" | "deprecated";
}
