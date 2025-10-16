import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const accessToken = tokenService.getAccessToken();
  
  const apiUrl = 'https://localhost:7259';

  const skipUrls = [`${apiUrl}/login`, `${apiUrl}/refresh`];

  //skip login
  if (skipUrls.some(url => req.url.includes(url))){
    return next(req);
  }

  // attached access token to header
  if(accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  // if fails, request another access token by using refresh token
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 && tokenService.getRefreshToken()){
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = tokenService.getAccessToken();
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(retryReq);
          })
        )
      }
      return throwError(() => error);
    })
  )
};
