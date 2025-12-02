import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static strongPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasDigit = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const isValidLength = value.length >= 8;

            const passwordValid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isValidLength;

            return passwordValid ? null : {
                strongPassword: {
                    hasUpperCase,
                    hasLowerCase,
                    hasDigit,
                    hasSpecialChar,
                    isValidLength
                }
            };
        };
    }

    static matchPassword(passwordField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.parent?.get(passwordField)?.value;
            const confirmPassword = control.value;

            if (!password || !confirmPassword) return null;

            return password === confirmPassword ? null : { matchPassword: true };
        };
    }

    static phoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phonePattern.test(value) ? null : { phoneNumber: true };
        };
    }

    static url(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            return urlPattern.test(value) ? null : { url: true };
        };
    }

    static minAge(minAge: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
        };
    }
}
