import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    calculateDiscount(amount: number, discountCode?: string): number {
        if (discountCode === 'SAVE10') {
            return amount * 0.1;
        }
        return 0;
    }
}
