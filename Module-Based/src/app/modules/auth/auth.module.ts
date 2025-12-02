import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

// Components
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        AuthFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
