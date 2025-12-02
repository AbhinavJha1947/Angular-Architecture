import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true,
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<T>(items: T[], searchText: string, properties?: string[]): T[] {
        if (!items || !searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item => {
            if (properties && properties.length > 0) {
                return properties.some(prop => {
                    const value = this.getNestedProperty(item, prop);
                    return value && String(value).toLowerCase().includes(searchText);
                });
            } else {
                return JSON.stringify(item).toLowerCase().includes(searchText);
            }
        });
    }

    private getNestedProperty(obj: any, path: string): any {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }
}
