import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = '/api/auth';
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkAuthStatus());

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post('/api/login', data).pipe(
      tap((response: any) => {
        this.userSubject.next(response.user);
      })
    );
  }

  private storeAuthData(authData: any): void {
    localStorage.setItem('access_token', authData.token);
    localStorage.setItem('refresh_token', authData.refreshToken);
  }

  private checkAuthStatus(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get authStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
}