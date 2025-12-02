import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthCredentials } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials: AuthCredentials = {
        username: '',
        password: ''
    };

    loading = false;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.credentials.username || !this.credentials.password) {
            this.errorMessage = 'Please fill in all fields';
            return;
        }

        this.loading = true;
        this.errorMessage = '';

        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                this.loading = false;
                if (response.success) {
                    localStorage.setItem('authToken', response.token || '');
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    alert('Login successful!');
                    this.router.navigate(['/']);
                } else {
                    this.errorMessage = response.message || 'Login failed';
                }
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = 'An error occurred during login';
            }
        });
    }
}
