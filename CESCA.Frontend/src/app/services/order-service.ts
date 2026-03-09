import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateOrderRequest } from '../models/component-models/pos/create-order-request-model';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnResponse } from '../models/return-response';
import { InvoiceSearchParameter } from '../models/search-parameter';
import { InvoiceResponseModel } from '../models/component-models/invoice/invoice-response';

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

  getOrders$(invoiceSearchParameter: InvoiceSearchParameter){
    let params = new HttpParams();

    //convert obj to params[key-value pair]  
    Object.entries(invoiceSearchParameter).forEach(([key, value]) => {
      params = params.set(key, value as any);
    });

    return this.http.get<ReturnResponse<InvoiceResponseModel>>(`${this.orderUrl}/get-orders?${params}`)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }

}
