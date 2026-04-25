import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

export type UserRole = 'admin' | 'customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';

  constructor(private apiService: ApiService) {}

  login(credentials: any, role: UserRole): Observable<any> {
    this.clearAuthStorage();

    return this.apiService.post(`${role}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token || response.data?.token;

        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.ROLE_KEY, role);
        }
      })
    );
  }

  registerCustomer(userData: any): Observable<any> {
    return this.apiService.post('customer/register', userData);
  }

  logout(): void {
    const role = this.getRole() || 'customer';

    this.apiService.post(`${role}/logout`, {}).subscribe({
      next: () => {
        this.clearAuthStorage();
      },
      error: () => {
        this.clearAuthStorage();
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): UserRole | null {
    const role = localStorage.getItem(this.ROLE_KEY);
    return role === 'admin' || role === 'customer' ? role : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  clearAuthStorage(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }
}
