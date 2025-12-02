export class StringUtils {
    static capitalize(str: string): string {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static capitalizeWords(str: string): string {
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    }

    static truncate(str: string, length: number, suffix: string = '...'): string {
        if (str.length <= length) return str;
        return str.slice(0, length) + suffix;
    }

    static slugify(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    static camelToKebab(str: string): string {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

    static kebabToCamel(str: string): string {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    static isEmail(str: string): boolean {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str);
    }

    static removeHtmlTags(str: string): string {
        return str.replace(/<[^>]*>/g, '');
    }
}
