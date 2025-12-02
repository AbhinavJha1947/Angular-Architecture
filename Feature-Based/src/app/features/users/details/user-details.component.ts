import { Component } from '@angular/core';

@Component({
    selector: 'app-user-details',
    template: `<div class="user-details"><h2>User Details</h2><p>User details will be displayed here.</p></div>`,
    styles: [`.user-details { padding: 20px; }`]
})
export class UserDetailsComponent { }
