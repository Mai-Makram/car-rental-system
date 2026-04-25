import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  // إذا وجد التوكن، نقوم بعمل Clone للطلب ونضيف الهيدر
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // إذا لم يوجد توكن، نمرر الطلب كما هو
  return next(req);
};
