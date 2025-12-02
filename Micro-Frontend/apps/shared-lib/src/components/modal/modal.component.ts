import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() showCloseButton = true;
    @Input() closeOnBackdropClick = true;
    @Input() size: 'small' | 'medium' | 'large' = 'medium';

    @Output() close = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();

    @HostListener('document:keydown.escape', ['$event'])
    onEscapeKey(event: KeyboardEvent): void {
        if (this.isOpen) {
            this.onClose();
        }
    }

    onClose(): void {
        this.close.emit();
    }

    onConfirm(): void {
        this.confirm.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if (this.closeOnBackdropClick) {
            this.onClose();
        }
    }

    onModalContentClick(event: MouseEvent): void {
        // Prevent backdrop click when clicking inside modal
        event.stopPropagation();
    }

    get modalSizeClass(): string {
        return `modal-${this.size}`;
    }
}
