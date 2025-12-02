import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    menuItems = [
        { icon: '📊', label: 'Dashboard', route: '/dashboard' },
        { icon: '📦', label: 'Products', route: '/products' },
        { icon: '📋', label: 'Orders', route: '/orders' },
        { icon: '⚙️', label: 'Settings', route: '/settings' }
    ];
}
