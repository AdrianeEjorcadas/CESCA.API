import { Injectable } from '@angular/core';
import{ inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { InitialDashboardPayload } from '../models/component-models/dashboard/initial-dashboard-payload';
import { ReturnResponse } from '../models/return-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private http = inject(HttpClient);
  private dashboardUrl = `${environment.apiUrl}/dashboard`;
  
  getInitialDashboardData(): Observable<ReturnResponse<InitialDashboardPayload>>{
    return this.http.get<ReturnResponse<InitialDashboardPayload>>(`${this.dashboardUrl}/initial-dashboard-data`)
    .pipe(
      catchError( err => throwError(() => err))
    );
  }

  
}
