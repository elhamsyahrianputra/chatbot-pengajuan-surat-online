export interface Feedback {
    id: string;
    case_record_id: string;
    user_id: string;
    type: "like" | "dislike";
}

export interface StoreFeedbackRequest {
    case_record_id: string;
    user_id: string;
    type: "like" | "dislike";
}
