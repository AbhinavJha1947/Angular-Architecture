export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    orderDate: Date;
    deliveryDate?: Date;
    shippingAddress: string;
    timeline?: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
    status: OrderStatus;
    timestamp: Date;
    description: string;
}
