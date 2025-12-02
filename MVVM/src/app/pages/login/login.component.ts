import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginCredentials } from './login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials: LoginCredentials = { username: '', password: '' };

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        // Mock login
        if (this.credentials.username && this.credentials.password) {
            this.authService.login('mock-token', 'USER');
            this.router.navigate(['/dashboard']);
        }
    }
}
