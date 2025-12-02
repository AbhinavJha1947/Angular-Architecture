export class ValidationUtils {
    static isEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isPhoneNumber(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s-()]+$/;
        return phoneRegex.test(phone);
    }

    static minLength(value: string, min: number): boolean {
        return value.length >= min;
    }

    static maxLength(value: string, max: number): boolean {
        return value.length <= max;
    }
}
