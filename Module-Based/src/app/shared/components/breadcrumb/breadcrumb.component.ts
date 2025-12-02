import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
    label: string;
    url?: string;
    icon?: string;
}

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ol class="breadcrumb-list">
        <li *ngFor="let item of items; let last = last" class="breadcrumb-item">
          <a *ngIf="!last && item.url" [routerLink]="item.url" class="breadcrumb-link">
            <span *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</span>
            {{ item.label }}
          </a>
          <span *ngIf="last" class="breadcrumb-current">
            <span *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</span>
            {{ item.label }}
          </span>
          <span *ngIf="!last" class="breadcrumb-separator">/</span>
        </li>
      </ol>
    </nav>
  `,
    styles: [`
    .breadcrumb {
      padding: 0.75rem 0;
    }
    .breadcrumb-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.5rem;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .breadcrumb-link {
      color: var(--primary-color, #007bff);
      text-decoration: none;
      transition: color 0.2s;
    }
    .breadcrumb-link:hover {
      color: var(--primary-hover, #0056b3);
      text-decoration: underline;
    }
    .breadcrumb-current {
      color: var(--text-primary, #333);
      font-weight: 500;
    }
    .breadcrumb-separator {
      color: var(--text-secondary, #666);
    }
    .breadcrumb-icon {
      margin-right: 0.25rem;
    }
  `]
})
export class BreadcrumbComponent {
    @Input() items: BreadcrumbItem[] = [];
}
