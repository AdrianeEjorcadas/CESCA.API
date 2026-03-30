import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateOrderRequest } from '../models/component-models/pos/create-order-request-model';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnResponse } from '../models/return-response';
import { InvoiceSearchParameter } from '../models/search-parameter';
import { InvoiceResponseModel } from '../models/component-models/invoice/invoice-response';
import { InvoiceOrderDetailsModel } from '../models/component-models/invoice/invoice-order-details';

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

  getOrders$(invoiceSearchParameter: InvoiceSearchParameter): Observable<ReturnResponse<InvoiceResponseModel>>{
    let params = new HttpParams();

    //convert obj to params[key-value pair]  
    Object.entries(invoiceSearchParameter).forEach(([key, value]) => {
      if(value !== null  && value !== undefined){
        if(value instanceof Date){
          params = params.set(key, value.toISOString());
        } else {
          params = params.set(key, value as any);
        }
      }
    });

    return this.http.get<ReturnResponse<InvoiceResponseModel>>(`${this.orderUrl}/get-orders?${params}`)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }

  getOrdersByInvoiceNumber$(invoiceNumber: string) : Observable<ReturnResponse<InvoiceOrderDetailsModel[]>>{
    return this.http.get<ReturnResponse<InvoiceOrderDetailsModel[]>>(`${this.orderUrl}/get-orders-by-id?invoiceNumber=${invoiceNumber}`)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }
// generate-invoice-pdf
  downloadInvoice(invoiceNumber: string){
    return this.http.get(`${this.orderUrl}/generate-invoice-pdf?invoiceNumber=${invoiceNumber}`, {responseType: 'blob'})
    .pipe(
      catchError(err => throwError(() => err))
    );
  }

}
