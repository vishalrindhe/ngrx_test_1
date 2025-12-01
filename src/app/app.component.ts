import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { isLogggedIn, isLogggedOut } from './auth/auth.selector';
import { logout } from './auth/auth.actions';
import { AuthActions } from './auth/action.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>
  isLogOut$: Observable<boolean>
  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {
    const userData = localStorage.getItem('user')
    if(userData){
      this.store.dispatch(AuthActions.login({user : JSON.parse(userData)}))
    }
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    // this.store.subscribe(r => console.log(r))
    this.isLoggedIn$ = this.store.pipe(
      tap(r => console.log('login:',r)),
      select(isLogggedIn)
    )
    this.isLogOut$ = this.store.pipe(
      tap(r => console.log('logout:',r)),
      select(isLogggedOut)
    )

  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
