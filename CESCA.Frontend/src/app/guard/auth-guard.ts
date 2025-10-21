import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';

export const authGuard: CanActivateFn = (route, state) : boolean | UrlTree => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router)

  return tokenService.getAccessToken()
    ? true
    : router.parseUrl('/login');  
};
