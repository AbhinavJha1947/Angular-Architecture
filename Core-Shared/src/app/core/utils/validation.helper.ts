import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationHelper {
    static emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    static urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    static isValidEmail(email: string): boolean {
        return this.emailPattern.test(email);
    }

    static isValidPhone(phone: string): boolean {
        return this.phonePattern.test(phone);
    }

    static isValidUrl(url: string): boolean {
        return this.urlPattern.test(url);
    }

    static passwordStrength(password: string): 'weak' | 'medium' | 'strong' {
        if (password.length < 6) return 'weak';

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const criteriaMet = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
            .filter(Boolean).length;

        if (criteriaMet >= 3 && password.length >= 8) return 'strong';
        if (criteriaMet >= 2 && password.length >= 6) return 'medium';
        return 'weak';
    }

    static matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            if (!control || !matchingControl) {
                return null;
            }

            if (matchingControl.errors && !matchingControl.errors['matching']) {
                return null;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ matching: true });
                return { matching: true };
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        };
    }
}
