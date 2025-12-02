export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    timeline: OrderTimelineEvent[];
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface OrderTimelineEvent {
    status: string;
    timestamp: Date;
    description: string;
}
