import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, delay, map } from 'rxjs';

export class AsyncValidators {
    static emailExists(checkEmailFn: (email: string) => Observable<boolean>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return checkEmailFn(control.value).pipe(
                map(exists => exists ? { emailExists: true } : null)
            );
        };
    }

    static usernameExists(checkUsernameFn: (username: string) => Observable<boolean>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return checkUsernameFn(control.value).pipe(
                delay(500), // Debounce
                map(exists => exists ? { usernameExists: true } : null)
            );
        };
    }
}
