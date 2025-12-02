import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    template: `<aside>Sidebar Content</aside>`,
    styles: [`
    aside {
      width: 250px;
      background: #f4f4f4;
      height: 100vh;
      padding: 1rem;
    }
  `]
})
export class SidebarComponent { }
