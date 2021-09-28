import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from './../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private authSubject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.authSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.handleAuthentication();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap((user) => {
        this.authSubject.next(user);
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.authSubject.next(null);
    this.router.navigateByUrl('login');
  }

  private handleAuthentication(): void {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((isLoggedIn) => !isLoggedIn));
    const userData = localStorage.getItem(AUTH_DATA);

    if (userData) {
      this.authSubject.next(JSON.parse(userData));
    }
  }
}

const AUTH_DATA = 'auth_data';
