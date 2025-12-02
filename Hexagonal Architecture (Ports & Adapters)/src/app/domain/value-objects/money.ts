export class Money {
    constructor(public readonly amount: number, public readonly currency: string = 'USD') {
        if (amount < 0) {
            throw new Error('Amount cannot be negative');
        }
    }

    add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Currencies must match');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    subtract(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Currencies must match');
        }
        return new Money(this.amount - other.amount, this.currency);
    }

    toString(): string {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }
}
