import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private accessToken: string | null = null;
  private readonly REFRESH_TOKEN = 'refreshToken';

  setToken(accessToken: string, refreshToken: string){
    this.accessToken = accessToken;
    sessionStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null{
    return this.accessToken;
  }

  getRefreshToken(): string | null{
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  clearToken(){
    this.accessToken = null;
    sessionStorage.removeItem(this.REFRESH_TOKEN);
  }

}
