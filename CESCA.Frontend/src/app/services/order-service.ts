import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrderRequest } from '../models/component-models/pos/create-order-request-model';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnResponse } from '../models/return-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private http = inject(HttpClient);
  private orderUrl = `${environment.apiUrl}/order`;

  placeOrder(orderRequest: CreateOrderRequest): Observable<ReturnResponse<object>>{
    return this.http.post<ReturnResponse<object>>(`${this.orderUrl}/place-order`, orderRequest)
    .pipe(
      catchError( err => throwError(() => err))
    );
  }

}
