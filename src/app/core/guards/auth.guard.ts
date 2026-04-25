import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = authService.getToken();
  const role = authService.getRole();
  const basePath = route.routeConfig?.path;

  if (!token || !role) {
    router.navigate(['/login']);
    return false;
  }

  if (basePath === 'admin' && role !== 'admin') {
    router.navigate(['/customer/cars']);
    return false;
  }

  if (basePath === 'customer' && role !== 'customer') {
    router.navigate(['/admin/users']);
    return false;
  }

  return true;
};
