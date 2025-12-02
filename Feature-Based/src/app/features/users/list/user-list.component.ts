import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../users.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        this.usersService.getUsers().subscribe(users => {
            this.users = users;
        });
    }
}
