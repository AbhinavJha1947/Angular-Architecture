import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card" [class.hoverable]="hoverable">
      <div class="card-header" *ngIf="hasHeader">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="hasFooter">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
    styles: [`
    .card {
      background: var(--card-bg, #fff);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .card.hoverable:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color, #e0e0e0);
      font-weight: 600;
    }
    .card-body {
      padding: 1rem;
    }
    .card-footer {
      padding: 1rem;
      border-top: 1px solid var(--border-color, #e0e0e0);
      background: var(--card-footer-bg, #f5f5f5);
    }
  `]
})
export class CardComponent {
    hoverable: boolean = false;
    hasHeader: boolean = false;
    hasFooter: boolean = false;

    ngAfterContentInit() {
        // Check if header/footer content is projected
    }
}
