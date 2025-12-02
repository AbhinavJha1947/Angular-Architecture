import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: any, currencyCode: string = 'USD'): any {
        const currencyPipe = new CurrencyPipe('en-US');
        return currencyPipe.transform(value, currencyCode, 'symbol');
    }
}
