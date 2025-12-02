import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-password-strength',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './password-strength.component.html',
    styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {
    @Input() password: string = '';

    strength: string = '';
    score: number = 0;

    constructor(private authService: AuthService) { }

    ngOnChanges(): void {
        if (this.password) {
            const result = this.authService.validatePassword(this.password);
            this.strength = result.strength;
            this.score = result.score;
        } else {
            this.strength = '';
            this.score = 0;
        }
    }

    getStrengthClass(): string {
        if (this.score <= 2) return 'weak';
        if (this.score <= 4) return 'medium';
        return 'strong';
    }
}
