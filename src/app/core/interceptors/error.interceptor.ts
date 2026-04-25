import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // إذا كان الخطأ 401 (غير مصرح به) فهذا يعني أن التوكن انتهى أو غير صالح
      if (error.status === 401) {
        console.warn('Unauthorized request - Logging out...');
        authService.logout(); // مسح التوكن وتنبيه السيرفر
        router.navigate(['/login']);
      }

      // تمرير الخطأ للمكون ليتم عرضه للمستخدم إذا لزم الأمر
      return throwError(() => error);
    })
  );
};
