import { BaseModel } from '../../shared/models/base.model';

export interface User extends BaseModel {
    username: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
}
