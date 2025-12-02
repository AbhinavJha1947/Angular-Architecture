import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
    @Input() formGroup!: FormGroup;
    @Input() formType: 'login' | 'register' = 'login';
    @Input() submitButtonText = 'Submit';
    @Input() isLoading = false;
    @Output() formSubmit = new EventEmitter<void>();

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.formSubmit.emit();
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);

        if (!control || !control.errors || !control.touched) {
            return '';
        }

        if (control.errors['required']) {
            return `${this.getFieldLabel(controlName)} is required`;
        }
        if (control.errors['email']) {
            return 'Please enter a valid email address';
        }
        if (control.errors['minlength']) {
            return `${this.getFieldLabel(controlName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
        }
        if (control.errors['pattern']) {
            return `${this.getFieldLabel(controlName)} format is invalid`;
        }

        return 'Invalid field';
    }

    private getFieldLabel(controlName: string): string {
        const labels: { [key: string]: string } = {
            email: 'Email',
            password: 'Password',
            username: 'Username',
            confirmPassword: 'Confirm Password',
            firstName: 'First Name',
            lastName: 'Last Name'
        };
        return labels[controlName] || controlName;
    }

    hasError(controlName: string): boolean {
        const control = this.formGroup.get(controlName);
        return !!(control && control.invalid && control.touched);
    }
}
