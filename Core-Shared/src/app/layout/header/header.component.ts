import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserStoreService } from '../../core/state/user-store.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    user$ = this.userStore.user$;

    constructor(
        private authService: AuthService,
        private userStore: UserStoreService,
        private router: Router
    ) { }

    logout(): void {
        this.authService.logout();
    }
}
