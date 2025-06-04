import { LetterType } from "./letter-type.types";
import { User } from "./user.types";

export interface LetterSubmission {
    id: string;
    user_id: string;
    user?: User;
    letter_type_id: string;
    letter_type?: LetterType;
    code: string;
    file_path?: string;
    status: "submitted" | "approved" | "revision" | "rejected" | "completed" | "canceled";
    created_at?: Date;
    updated_at?: Date;
}

export type GetLetterSubmissionParams = {
    include?: string | string[];
};

export type UpdateLetterSubmissionRequest = {
    status?: string;
};
