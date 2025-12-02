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

    static getFormValidationErrors(formGroup: FormGroup): any[] {
        const errors: any[] = [];

        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            if (control && control.errors) {
                errors.push({ field: key, errors: control.errors });
            }

            if (control instanceof FormGroup) {
                errors.push(...this.getFormValidationErrors(control));
            }
        });

        return errors;
    }

    static resetForm(formGroup: FormGroup): void {
        formGroup.reset();
        formGroup.markAsUntouched();
        formGroup.markAsPristine();
    }

    static hasError(control: AbstractControl | null, errorName: string): boolean {
        return !!(control && control.hasError(errorName) && (control.dirty || control.touched));
    }

    static getErrorMessage(control: AbstractControl | null, fieldName: string): string {
        if (!control || !control.errors) {
            return '';
        }

        const errors = control.errors;

        if (errors['required']) {
            return `${fieldName} is required`;
        }
        if (errors['email']) {
            return 'Please enter a valid email address';
        }
        if (errors['minlength']) {
            return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
        }
        if (errors['maxlength']) {
            return `${fieldName} must not exceed ${errors['maxlength'].requiredLength} characters`;
        }
        if (errors['pattern']) {
            return `${fieldName} format is invalid`;
        }

        return 'Invalid field';
    }
}
