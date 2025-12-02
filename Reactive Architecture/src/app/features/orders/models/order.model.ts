export interface Order {
    id: string;
    userId: string;
    products: any[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
}
