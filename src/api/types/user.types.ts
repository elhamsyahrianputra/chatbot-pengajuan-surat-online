export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    gender: 'male' | 'female';
    identity_number: string;
    academic_program: string;
    phone: string;
    semester: number;
    created_at: Date;
    updated_at: Date;
}

export interface Profile {
    id: string;
    user_id: string;
    gender: "male" | "female";
    identity_number: string;
    academic_program: string;
    phone: string;
    semester: number;
    created_at: Date;
    updated_at: Date;
}