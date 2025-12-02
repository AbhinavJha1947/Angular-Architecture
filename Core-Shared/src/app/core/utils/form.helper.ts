import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class FormHelper {
    static markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    static resetForm(formGroup: FormGroup): void {
        formGroup.reset();
        this.markFormGroupUntouched(formGroup);
    }

    static markFormGroupUntouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsUntouched();

            if (control instanceof FormGroup) {
                this.markFormGroupUntouched(control);
            }
        });
    }

    static getFormValidationErrors(formGroup: FormGroup): any[] {
        const errors: any[] = [];
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            if (control && control.errors) {
                errors.push({ field: key, errors: control.errors });
            }
        });
        return errors;
    }
}
