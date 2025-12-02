export class DateHelper {
    static formatDate(date: Date | string, format: string = 'yyyy-MM-dd'): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return format
            .replace('yyyy', String(year))
            .replace('MM', month)
            .replace('dd', day);
    }

    static isValidDate(date: any): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }

    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static getDaysDifference(date1: Date, date2: Date): number {
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    static isToday(date: Date): boolean {
        const today = new Date();
        return this.isSameDay(date, today);
    }

    static isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
}
