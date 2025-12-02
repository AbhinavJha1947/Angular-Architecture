import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
    <button 
      [type]="type"
      [disabled]="disabled"
      [class]="'btn btn-' + variant"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </button>
  `,
    styles: [`
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .btn-primary {
      background-color: #1976d2;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #1565c0;
      }
    }
    
    .btn-secondary {
      background-color: #757575;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #616161;
      }
    }
    
    .btn-danger {
      background-color: #f44336;
      color: white;
      
      &:hover:not(:disabled) {
        background-color: #d32f2f;
      }
    }
  `]
})
export class ButtonComponent {
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
    @Input() disabled = false;
    @Output() clicked = new EventEmitter<Event>();

    handleClick(event: Event): void {
        if (!this.disabled) {
            this.clicked.emit(event);
        }
    }
}
