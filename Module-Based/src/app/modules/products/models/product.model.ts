export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
    id: string;
}
