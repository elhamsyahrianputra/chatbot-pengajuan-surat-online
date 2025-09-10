import { Profile, User } from "./user.types";

export interface LoginRequest {
    email: string,
    password: string,
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    identity_number: string;
    academic_program: string;
    email_verified_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    profile?: Profile;
}

export interface RegisterResponse {
    code: number;
    status: string;
    data: User[];
}

export interface LoginResponse {
    code: number;
    status: string;
    data: User[];
    token: string;
}

export interface GetUserParams {
    include: string | string[];
}