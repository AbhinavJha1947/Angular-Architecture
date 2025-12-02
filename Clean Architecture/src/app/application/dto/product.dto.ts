export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string; // API might return snake_case
}
