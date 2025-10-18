import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) : boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.isAuthenticated()
    ? true
    : router.parseUrl('/login');  
};
