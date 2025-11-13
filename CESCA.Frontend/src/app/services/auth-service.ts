import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Login } from '../models/login';
import { ReturnResponse } from '../models/return-response';
import { TokenService } from './token-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'https://localhost:7259';

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  // private isLoggedIn : boolean = false;

  isAuthenticated() : boolean{
    return !!this.tokenService.getAccessToken();
  }

  loginPost(login: Login) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, login)
      .pipe(
        tap(res => {
          if(res.accessToken){
            this.tokenService.setToken(res.accessToken, res.refreshToken);
            // this.isLoggedIn = true;
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

  getRoleFromToken(token: string ) : string | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("role " + decoded.role);
      return decoded.role;
    } catch {
      return null;
    }
  }

  getUserInfo(token: string) : JwtPayload | null {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("user" + decoded);
      return decoded;
    } catch {
      return null;
    }
  }


}
