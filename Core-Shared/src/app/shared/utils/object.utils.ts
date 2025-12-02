export class ObjectUtils {
    static deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    static isEmpty(obj: any): boolean {
        if (obj === null || obj === undefined) return true;
        if (Array.isArray(obj)) return obj.length === 0;
        if (typeof obj === 'object') return Object.keys(obj).length === 0;
        return false;
    }

    static isEqual(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        keys.forEach(key => {
            if (key in obj) {
                result[key] = obj[key];
            }
        });
        return result;
    }

    static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
        const result = { ...obj };
        keys.forEach(key => {
            delete result[key];
        });
        return result;
    }

    static merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
        return Object.assign({}, target, ...sources);
    }
}
