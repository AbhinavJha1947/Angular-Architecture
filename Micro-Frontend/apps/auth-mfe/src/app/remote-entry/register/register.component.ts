import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterData } from '../../services/auth.service';
import { PasswordStrengthComponent } from '../../components/password-strength/password-strength.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, PasswordStrengthComponent],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerData: RegisterData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    loading = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.registerData.username || !this.registerData.email ||
            !this.registerData.password || !this.registerData.confirmPassword) {
            this.errorMessage = 'Please fill in all fields';
            return;
        }

        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.register(this.registerData).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    localStorage.setItem('authToken', response.token || '');
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    alert('Registration successful!');
                    this.router.navigate(['/']);
                } else {
                    this.errorMessage = response.message || 'Registration failed';
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = 'An error occurred during registration';
            }
        });
    }
}
