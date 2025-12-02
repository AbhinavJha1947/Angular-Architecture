import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export class AsyncValidators {

    static emailExists(checkEmailFn: (email: string) => Observable<boolean>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => checkEmailFn(control.value)),
                map(exists => exists ? { emailExists: true } : null),
                catchError(() => of(null))
            );
        };
    }

    static usernameExists(checkUsernameFn: (username: string) => Observable<boolean>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => checkUsernameFn(control.value)),
                map(exists => exists ? { usernameExists: true } : null),
                catchError(() => of(null))
            );
        };
    }

    static uniqueValue(checkUniqueFn: (value: any) => Observable<boolean>): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => checkUniqueFn(control.value)),
                map(isUnique => isUnique ? null : { notUnique: true }),
                catchError(() => of(null))
            );
        };
    }
}
