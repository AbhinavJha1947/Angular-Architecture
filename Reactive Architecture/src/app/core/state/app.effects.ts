import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
    loadApp$ = createEffect(() => this.actions$.pipe(
        ofType(AppActions.loadApp),
        mergeMap(() => of({ name: 'User' }).pipe(
            map(data => AppActions.loadAppSuccess({ data })),
            catchError(error => of(AppActions.loadAppFailure({ error })))
        ))
    ));

    constructor(private actions$: Actions) { }
}
