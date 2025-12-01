import { createSelector } from "@ngrx/store";

export const isLogggedIn = createSelector(
    state => state['auth'],
    (auth) => !!auth['user']
)