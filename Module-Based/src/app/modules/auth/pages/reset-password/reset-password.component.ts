import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    resetForm: FormGroup;
    isLoading = false;
    successMessage = '';
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.resetForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            this.successMessage = '';

            const { email } = this.resetForm.value;

            this.authService.resetPassword(email).subscribe({
                next: () => {
                    this.successMessage = 'Password reset link sent to your email.';
                    this.isLoading = false;
                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 3000);
                },
                error: (error) => {
                    this.errorMessage = error.message || 'Failed to send reset link.';
                    this.isLoading = false;
                }
            });
        }
    }

    get email() {
        return this.resetForm.get('email');
    }
}
