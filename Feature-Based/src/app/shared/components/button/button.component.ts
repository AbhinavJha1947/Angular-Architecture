import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `<button [type]="type" [disabled]="disabled" (click)="handleClick()">
    <ng-content></ng-content>
  </button>`,
    styles: [`
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
    @Input() type: string = 'button';
    @Input() disabled: boolean = false;
    @Output() clicked = new EventEmitter<void>();

    handleClick(): void {
        if (!this.disabled) {
            this.clicked.emit();
        }
    }
}
