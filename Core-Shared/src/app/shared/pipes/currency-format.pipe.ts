import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormat',
    standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: number, currencySymbol: string = '$', decimals: number = 2): string {
        if (value === null || value === undefined) return '';

        const formattedValue = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${currencySymbol}${formattedValue}`;
    }
}
