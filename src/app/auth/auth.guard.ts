import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthState } from "./reducers";
import { select, Store } from "@ngrx/store";
import { isLogggedIn } from "./auth.selector";
import { AppState } from "../reducers";

@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanActivate{
     constructor(private store:Store<AppState>, private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLogggedIn),
            tap(loggedIn =>{
                if(!loggedIn){
                    this.router.navigateByUrl('/login')
                }
            })
        )
    }
    
}