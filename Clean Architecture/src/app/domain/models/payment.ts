export interface Payment {
    id: string;
    orderId: string;
    amount: number;
    method: 'credit_card' | 'paypal' | 'bank_transfer';
    status: 'pending' | 'completed' | 'failed';
    transactionDate: Date;
}
