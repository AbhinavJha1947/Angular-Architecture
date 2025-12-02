import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @Input() title: string = '';
    @Input() isOpen: boolean = false;
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Output() closed = new EventEmitter<void>();

    close(): void {
        this.closed.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
}
