import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormat',
    standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = 'USD',
        display: 'symbol' | 'code' = 'symbol',
        digitsInfo: string = '1.2-2'
    ): string {
        if (value === null || value === undefined) return '';

        const currencySymbols: Record<string, string> = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            JPY: '¥',
            INR: '₹',
            CAD: 'C$',
            AUD: 'A$'
        };

        const symbol = display === 'symbol'
            ? (currencySymbols[currencyCode] || currencyCode)
            : currencyCode;

        const [minIntDigits, fractionDigits] = digitsInfo.split('.');
        const [minFraction, maxFraction] = fractionDigits ? fractionDigits.split('-') : ['2', '2'];

        const formatted = value.toLocaleString('en-US', {
            minimumFractionDigits: parseInt(minFraction),
            maximumFractionDigits: parseInt(maxFraction)
        });

        return `${symbol}${formatted}`;
    }
}
