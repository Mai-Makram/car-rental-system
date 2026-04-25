import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return true;
  }

  // إذا كان مسجل دخول بالفعل، يتم توجيهه لصفحة العملاء
  router.navigate(['/customer/cars']);
  return false;
};
