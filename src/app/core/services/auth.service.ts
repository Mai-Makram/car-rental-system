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
    return this.apiService.post(`${role}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login Response:', response);
        const token = response.token || response.data?.token;
        if (token) {
          localStorage.setItem(this.TOKEN_KEY, token);
          console.log('Token saved successfully');
        } else {
          console.warn('No token found in response');
        }
      })
    );
  }

  registerCustomer(userData: any): Observable<any> {
    return this.apiService.post('customer/register', userData);
  }

  logout(): void {
    this.apiService.post('customer/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem(this.TOKEN_KEY);
      },
      error: () => {
        localStorage.removeItem(this.TOKEN_KEY); // مسح التوكن حتى لو فشل طلب السيرفر
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
