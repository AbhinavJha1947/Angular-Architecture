import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="loader-container">
      <div class="spinner"></div>
      <p *ngIf="message" class="loader-message">{{ message }}</p>
    </div>
  `,
    styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--primary-color, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .loader-message {
      margin-top: 1rem;
      color: var(--text-secondary, #666);
      font-size: 0.875rem;
    }
  `]
})
export class LoaderComponent {
    message: string = '';
}
