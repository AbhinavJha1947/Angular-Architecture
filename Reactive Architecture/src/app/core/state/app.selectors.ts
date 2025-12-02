import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectUser = createSelector(selectAppState, (state: AppState) => state.user);
export const selectLoading = createSelector(selectAppState, (state: AppState) => state.loading);
