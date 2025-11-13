import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { TokenService } from '../services/token-service';

export const authGuard: CanActivateFn = (route, state) : boolean | UrlTree => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router)

  // return tokenService.getAccessToken()
  //   ? true
  //   : router.parseUrl('/login');  

  const token = tokenService.getAccessToken();

  if (!token){
    return router.parseUrl('/login');
  }

  //decode token
  const role = authService.getRoleFromToken(token);
  //get required role
  const requiredRole = route.data['role'] as 'Admin' | 'User';

  if (requiredRole && role !== requiredRole){
    return router.parseUrl('/unathourized');
  }

  return true;
};
