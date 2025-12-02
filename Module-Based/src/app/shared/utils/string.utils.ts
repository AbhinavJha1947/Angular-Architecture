export class StringUtils {

    static capitalize(str: string): string {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static capitalizeWords(str: string): string {
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    }

    static camelCase(str: string): string {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
                index === 0 ? letter.toLowerCase() : letter.toUpperCase()
            )
            .replace(/\s+/g, '');
    }

    static kebabCase(str: string): string {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    static snakeCase(str: string): string {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }

    static truncate(str: string, length: number, suffix: string = '...'): string {
        if (str.length <= length) return str;
        return str.substring(0, length - suffix.length) + suffix;
    }

    static slugify(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    static reverse(str: string): string {
        return str.split('').reverse().join('');
    }

    static removeWhitespace(str: string): string {
        return str.replace(/\s+/g, '');
    }

    static escapeHtml(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    static unescapeHtml(str: string): string {
        const div = document.createElement('div');
        div.innerHTML = str;
        return div.textContent || '';
    }

    static isBlank(str: string | null | undefined): boolean {
        return !str || str.trim().length === 0;
    }

    static randomString(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
