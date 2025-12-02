import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true,
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform<T>(items: T[], searchText: string, properties: (keyof T)[]): T[] {
        if (!items || !searchText || !properties) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter(item => {
            return properties.some(prop => {
                const value = item[prop];
                if (value === null || value === undefined) return false;
                return String(value).toLowerCase().includes(searchText);
            });
        });
    }
}
