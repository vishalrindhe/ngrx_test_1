import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth')
export const isLogggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth['user']
)
export const isLogggedOut = createSelector(
    isLogggedIn,
    (isLogggedIn) => !isLogggedIn
)