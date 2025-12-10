import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { InventoryModel } from '../models/component-models/inventory/inventory-model';
import { InventoryResponse } from '../models/component-models/inventory/inventory-response';
import { InventorySearchParameter } from '../models/search-parameter';
import { ReturnResponse } from '../models/return-response';
import { AddProduct } from '../components/modal-components/inventory/add-product/add-product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7259/api';


  getInventoryItems$(inventorySearchParameter: InventorySearchParameter): Observable<ReturnResponse<InventoryResponse>>{
    
    let params = new HttpParams();

    //convert obj to params[key-value pair]
    Object.entries(inventorySearchParameter).forEach(([key, value]) => {
      params = params.set(key, value as any);
    });

    return this.http.get<ReturnResponse<InventoryResponse>>(`${this.apiUrl}/product/get-products?${params}`)
    .pipe(
      catchError(err => throwError(()=> err))
    );
  }
  
  addProduct(product: AddProduct) : Observable<ReturnResponse<InventoryModel>>{
    return this.http.post<ReturnResponse<InventoryModel>>(`${this.apiUrl}/product/add-product`, product)
    .pipe(
      catchError(err => throwError(() => err))
    );
  }

}
