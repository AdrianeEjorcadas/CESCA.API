import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router)

  const token = tokenService.getAccessToken();

  if (token) {
    const role = authService.getRoleFromToken(token);
    if (role === 'User') {
      return router.parseUrl('/pos');
    }
    return router.parseUrl('/dashboard');
  }

  return true;
};
