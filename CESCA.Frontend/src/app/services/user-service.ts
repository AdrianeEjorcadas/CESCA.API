import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable, catchError, throwError} from 'rxjs';
import { ReturnResponse } from '../models/return-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7259';

  registerUser(registerUser: Register): Observable<ReturnResponse<any>>{
    return this.http.post<ReturnResponse<any>>(`${this.apiUrl}/register`, registerUser)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }
}
