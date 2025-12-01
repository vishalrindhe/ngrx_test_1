import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AuthActions } from "./action.types";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {
        // way 1
        // const login$ = actions$.pipe(
        //     ofType(AuthActions.login),
        //     tap(r => {
        //         localStorage.setItem('user',JSON.stringify(r?.['user']))
        //     })
        // )
        // login$.subscribe()

        // // way 2
        // actions$.subscribe(r => {
        //     if(r?.type == '[Login Page] User login'){
        //         localStorage.setItem('user',JSON.stringify(r?.['user']))
        //     }
        // })
    }
    count = 0
    // way 3
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(r => {
                localStorage.setItem('user', JSON.stringify(r?.['user']))
                this.count++;
                console.log(this.count);
            })
        ), { dispatch: false }
    )
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(r => {
                localStorage.removeItem('user')
                this.count++;
                console.log(this.count);
                this.router.navigateByUrl('/login')
            })
        ), { dispatch: false }
    )
}