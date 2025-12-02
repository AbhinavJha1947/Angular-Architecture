import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { initialAppState } from './app.state';

export const appReducer = createReducer(
    initialAppState,
    on(AppActions.loadApp, state => ({ ...state, loading: true })),
    on(AppActions.loadAppSuccess, (state, { data }) => ({ ...state, loading: false, user: data })),
    on(AppActions.loadAppFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
