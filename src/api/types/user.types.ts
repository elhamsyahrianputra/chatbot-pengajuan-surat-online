export interface User {
    id: string;
    name: string;
    email: string;
    gender: 'male' | 'female';
    academic_program: string;
    phone: string;
    semester: number;
    created_at: Date;
    updated_at: Date;
}