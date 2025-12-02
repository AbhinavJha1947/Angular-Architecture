import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
    selector: 'lib-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() type: ButtonType = 'primary';
    @Input() size: ButtonSize = 'medium';
    @Input() disabled = false;
    @Input() loading = false;
    @Input() fullWidth = false;
}
