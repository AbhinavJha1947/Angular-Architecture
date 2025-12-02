import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaxCalculatorService {
    private readonly TAX_RATE = 0.1; // 10%

    calculateTax(amount: number): number {
        return amount * this.TAX_RATE;
    }
}
