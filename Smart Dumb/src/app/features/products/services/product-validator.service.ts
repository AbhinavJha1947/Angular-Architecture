import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProductValidatorService {

    static priceValidator(control: AbstractControl): ValidationErrors | null {
        const price = control.value;
        if (price !== null && price < 0) {
            return { negativePrice: true };
        }
        return null;
    }
}
