import { Component } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    template: `
    <div class="forgot-password-container">
      <h2>Forgot Password</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  `,
    styles: [`
    .forgot-password-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #ffc107;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ForgotPasswordComponent {
    email: string = '';

    onSubmit(): void {
        console.log('Forgot password submitted');
    }
}
