export interface Thread {
    role: 'assistant' | 'user';
    message: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface StoreThreadRequest {
    role: 'assistant' | 'user';
    message: string;
}