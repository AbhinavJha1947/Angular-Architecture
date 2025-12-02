import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './list/user-list.component';
import { UserDetailsComponent } from './details/user-details.component';
import { UserCreateComponent } from './create/user-create.component';
import { UserEditComponent } from './edit/user-edit.component';

const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'create', component: UserCreateComponent },
    { path: ':id', component: UserDetailsComponent },
    { path: ':id/edit', component: UserEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

export const usersRoutes = routes;
