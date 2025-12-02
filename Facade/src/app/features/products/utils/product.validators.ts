import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const price = control.value;
        return price > 0 ? null : { invalidPrice: { value: price } };
    };
}
