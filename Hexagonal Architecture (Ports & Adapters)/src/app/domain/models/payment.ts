export interface Payment {
    id: string;
    orderId: string;
    amount: number;
    method: 'credit_card' | 'paypal' | 'stripe';
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
    createdAt: Date;
}
