import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static match(controlName: string, matchingControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control.parent;
            if (!formGroup) return null;

            const controlToMatch = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            if (!controlToMatch || !matchingControl) return null;

            if (matchingControl.errors && !matchingControl.errors['match']) {
                return null;
            }

            if (controlToMatch.value !== matchingControl.value) {
                matchingControl.setErrors({ match: true });
                return { match: true };
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        };
    }

    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumeric = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const isLengthValid = value.length >= 8;

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isLengthValid;

            return !passwordValid ? {
                strongPassword: {
                    hasUpperCase,
                    hasLowerCase,
                    hasNumeric,
                    hasSpecialChar,
                    isLengthValid
                }
            } : null;
        };
    }

    static noWhitespace(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const hasWhitespace = /\s/.test(value);
            return hasWhitespace ? { noWhitespace: true } : null;
        };
    }

    static url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            try {
                new URL(value);
                return null;
            } catch {
                return { url: true };
            }
        };
    }

    static phoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phoneRegex.test(value) ? null : { phoneNumber: true };
        };
    }

    static creditCard(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const sanitized = value.replace(/\s/g, '');
            if (!/^\d+$/.test(sanitized)) return { creditCard: true };

            let sum = 0;
            let isEven = false;

            for (let i = sanitized.length - 1; i >= 0; i--) {
                let digit = parseInt(sanitized[i], 10);

                if (isEven) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }

                sum += digit;
                isEven = !isEven;
            }

            return sum % 10 === 0 ? null : { creditCard: true };
        };
    }

    static minAge(minAge: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                return age - 1 >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age - 1 } };
            }

            return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
        };
    }
}
