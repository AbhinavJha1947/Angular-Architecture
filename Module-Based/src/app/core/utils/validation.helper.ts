export class ValidationHelper {

    static isEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isPhoneNumber(phone: string): boolean {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    static isUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static isStrongPassword(password: string): boolean {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    static isNumeric(value: string): boolean {
        return !isNaN(Number(value)) && !isNaN(parseFloat(value));
    }

    static isAlphanumeric(value: string): boolean {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        return alphanumericRegex.test(value);
    }

    static isPostalCode(code: string, country: 'US' | 'UK' | 'CA' = 'US'): boolean {
        const patterns = {
            US: /^\d{5}(-\d{4})?$/,
            UK: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
            CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i
        };
        return patterns[country].test(code);
    }

    static isCreditCard(cardNumber: string): boolean {
        // Luhn algorithm
        const sanitized = cardNumber.replace(/\s/g, '');
        if (!/^\d+$/.test(sanitized)) return false;

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

        return sum % 10 === 0;
    }

    static hasMinLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    }

    static hasMaxLength(value: string, maxLength: number): boolean {
        return value.length <= maxLength;
    }

    static isInRange(value: number, min: number, max: number): boolean {
        return value >= min && value <= max;
    }
}
