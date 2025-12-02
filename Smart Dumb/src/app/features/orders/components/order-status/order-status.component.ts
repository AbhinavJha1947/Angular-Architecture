import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-order-status',
    template: `<span [class]="status">{{ status }}</span>`,
    styles: [`
    .pending { color: orange; }
    .shipped { color: blue; }
    .delivered { color: green; }
    .cancelled { color: red; }
  `]
})
export class OrderStatusComponent {
    @Input() status!: string;
}
