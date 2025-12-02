export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export abstract class BaseEntityModel implements BaseEntity {
    id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    isActive: boolean = true;

    constructor(data?: Partial<BaseEntity>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
