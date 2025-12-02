export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    avatarUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
