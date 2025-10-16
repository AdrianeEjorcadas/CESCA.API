import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { ReturnResponse } from '../models/return-response';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'https://localhost:7259';

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  loginPost(login: Login) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, login)
      .pipe(
        tap(res => {
          if(res.accessToken){
            this.tokenService.setToken(res.accessToken, res.refreshToken);
          }
        }),
        catchError(err => throwError(() => err))
      )
  }

  refreshToken() : Observable<LoginResponse>{
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh`, {refreshToken})
    .pipe(
      tap(res => {
        if(res.accessToken){
          this.tokenService.setToken(res.accessToken, res.refreshToken);
        }
      }),
      catchError(err => throwError(() => err))
    )
  }


  //
}
