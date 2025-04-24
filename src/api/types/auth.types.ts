import { User } from "./user.types";

export interface RegisterResponse {
    code: number;
    status: string;
    data: User[];
}


export interface LoginRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    code: number;
    status: string;
    data: User[];
    token: string;
}