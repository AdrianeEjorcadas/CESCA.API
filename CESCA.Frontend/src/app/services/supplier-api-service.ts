import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SupplierSearchParameter } from '../models/search-parameter';
import { catchError, Observable, throwError } from 'rxjs';
import { ReturnResponse } from '../models/return-response';
import { SupplierResponse } from '../models/component-models/supplier-response';
import { AddSupplierModel } from '../models/component-models/add-supplier-model';
import { SupplierModel } from '../models/component-models/supplier-model';

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

  addSupplier(supplier: AddSupplierModel) : Observable<ReturnResponse<SupplierModel>>{
    return this.http.post<ReturnResponse<SupplierModel>>(`${this.supplierUrl}/add-supplier`, supplier)
    .pipe(
      catchError(err => throwError(() => err ))
    );
  }

  archivedSupplier(supplierId: string) : Observable<ReturnResponse<SupplierModel>>{
    return this.http.put<ReturnResponse<SupplierModel>>(`${this.supplierUrl}/archived-supplier?supplierId=${supplierId}`, null)
    .pipe(
      catchError(err => throwError(() => err ))
    );
  }

  deleteSupplier(supplierId: string) : Observable<ReturnResponse<SupplierModel>>{
    return this.http.delete<ReturnResponse<SupplierModel>>(`${this.supplierUrl}/delete-supplier?supplierId=${supplierId}`)
    .pipe(
      catchError(err => throwError(() => err ))
    );
  }

}
