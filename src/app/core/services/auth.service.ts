import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
type UserRole = 'admin' | 'customer';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  

  constructor(private apiService: ApiService) {}

  login(credentials: any , role: UserRole): Observable<any> {
    return this.apiService.post('${role}/login', credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  registerCustomer(userData: any): Observable<any> {
    return this.apiService.post('customer/register', userData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
