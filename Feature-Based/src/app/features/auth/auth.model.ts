export interface AuthModel {
    username: string;
    password: string;
    token?: string;
}

export interface RegisterModel {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
