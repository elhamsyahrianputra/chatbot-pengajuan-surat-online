export interface Feedback {
    id: string;
    case_record_id: string;
    user_id: string;
    type: 'not_relevant' | 'incomplete' | 'different_situation';
}
