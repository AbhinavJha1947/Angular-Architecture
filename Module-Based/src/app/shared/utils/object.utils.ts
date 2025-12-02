export class ObjectUtils {

    static deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    static merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
        return Object.assign({}, target, ...sources);
    }

    static deepMerge<T extends object>(target: T, source: Partial<T>): T {
        const output = { ...target };

        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject((source as any)[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: (source as any)[key] });
                    } else {
                        (output as any)[key] = this.deepMerge((target as any)[key], (source as any)[key]);
                    }
                } else {
                    Object.assign(output, { [key]: (source as any)[key] });
                }
            });
        }

        return output;
    }

    static isEmpty(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    static isObject(item: any): boolean {
        return item && typeof item === 'object' && !Array.isArray(item);
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

    static getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }

    static setNestedValue(obj: any, path: string, value: any): void {
        const keys = path.split('.');
        const lastKey = keys.pop()!;
        const target = keys.reduce((current, key) => {
            if (!(key in current)) {
                current[key] = {};
            }
            return current[key];
        }, obj);
        target[lastKey] = value;
    }

    static flattenObject(obj: any, prefix: string = ''): Record<string, any> {
        return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
            const prefixedKey = prefix ? `${prefix}.${key}` : key;

            if (this.isObject(obj[key])) {
                Object.assign(acc, this.flattenObject(obj[key], prefixedKey));
            } else {
                acc[prefixedKey] = obj[key];
            }

            return acc;
        }, {});
    }
}
