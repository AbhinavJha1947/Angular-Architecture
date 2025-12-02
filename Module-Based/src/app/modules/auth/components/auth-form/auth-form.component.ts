import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
    @Input() form!: FormGroup;
    @Input() isLoading = false;
    @Input() submitLabel = 'Submit';
    @Output() onSubmit = new EventEmitter<void>();

    submit(): void {
        this.onSubmit.emit();
    }
}
