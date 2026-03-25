export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
}

export interface InsertableUser {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}