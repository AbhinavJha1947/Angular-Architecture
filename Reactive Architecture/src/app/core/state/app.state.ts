export interface AppState {
    user: any;
    loading: boolean;
    error: any;
}

export const initialAppState: AppState = {
    user: null,
    loading: false,
    error: null
};
