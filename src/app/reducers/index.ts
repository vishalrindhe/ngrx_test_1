import { ActionReducerMap, MetaReducer } from '@ngrx/store';

export interface AppState {
  // add feature states here if needed
  // example:
  // auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  // example:
  // auth: authReducer,
};

export const metaReducers: MetaReducer<AppState>[] =  [];