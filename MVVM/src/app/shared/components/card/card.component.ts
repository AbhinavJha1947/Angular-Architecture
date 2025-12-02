import { Component } from '@angular/core';

@Component({
    selector: 'app-card',
    template: `<div class="card"><ng-content></ng-content></div>`,
    styles: [`
    .card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CardComponent { }
