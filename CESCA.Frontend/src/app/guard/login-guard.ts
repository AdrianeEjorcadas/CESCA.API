import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router)

  return tokenService.getAccessToken()
    ? router.parseUrl('/dashboard')
    : true;
};
