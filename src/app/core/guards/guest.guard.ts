import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getToken();
  const role = authService.getRole();

  if (!token || !role) {
    return true;
  }

  router.navigate([role === 'admin' ? '/admin/users' : '/customer/cars']);
  return false;
};
