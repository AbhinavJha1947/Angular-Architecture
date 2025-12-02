import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthenticated = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
    }
}
