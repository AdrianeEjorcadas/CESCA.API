import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN = 'accessToken';
  private readonly REFRESH_TOKEN = 'refreshToken';

  setToken(accessToken: string, refreshToken: string){
    sessionStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null{
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null{
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  clearToken(){
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}
