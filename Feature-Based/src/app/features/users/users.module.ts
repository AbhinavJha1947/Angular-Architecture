import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users.routes';

import { UserListComponent } from './list/user-list.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserEditComponent } from './edit/user-edit.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserDetailsComponent,
        UserCreateComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
