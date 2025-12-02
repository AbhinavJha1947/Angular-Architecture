import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFeatureService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(
        private authService: AuthFeatureService,
        private router: Router
    ) { }

    onSubmit(): void {
        this.authService.login({ username: this.username, password: this.password })
            .subscribe(response => {
                console.log('Login successful', response);
                this.router.navigate(['/dashboard']);
            });
    }
}
