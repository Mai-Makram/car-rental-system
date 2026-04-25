import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAuthRequest = req.url.includes('/login') || req.url.includes('/register');

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest) {
        console.warn('Unauthorized request - Logging out...');
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
