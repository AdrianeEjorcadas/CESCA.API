import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SupplierSearchParameter } from '../models/search-parameter';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnResponse } from '../models/return-response';
import { SupplierResponse } from '../models/component-models/supplier-response';

@Injectable({
  providedIn: 'root'
})
export class SupplierApiService {
  private http = inject(HttpClient);
  private supplierUrl = `${environment.apiUrl}/supplier`;

  getSuppliers$(supplierSearchParameter : SupplierSearchParameter) : Observable<ReturnResponse<SupplierResponse>>{
    
    let params = new HttpParams();
    
    //convert obj to params[key-value pair]
    Object.entries(supplierSearchParameter).forEach(([key, value]) => {
      params = params.set(key, value as any);
    });

    return this.http.get<ReturnResponse<SupplierResponse>>(`${this.supplierUrl}/get-suppliers?${params}`)
    .pipe(
      catchError(err => throwError(() => err ))
    );
  }
}
