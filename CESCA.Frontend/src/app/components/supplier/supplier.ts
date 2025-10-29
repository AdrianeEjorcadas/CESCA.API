import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { SupplierSearchParameter } from '../../models/search-parameter';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgClass } from '@angular/common';
import { SupplierApiService } from '../../services/supplier-api-service';
import { SupplierResponse } from '../../models/component-models/supplier-response';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {MatTableModule}from '@angular/material/table';
import { SupplierModel } from '../../models/component-models/supplier-model';

@Component({
  selector: 'app-supplier',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, NgClass, MatTableModule],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css'
})
export class Supplier implements OnInit {

  private supplierApiService = inject(SupplierApiService);
  private toastr = inject(ToastrService);

  suppliersWithMetadata = signal<SupplierResponse | null>(null); 
  suppliers = signal<SupplierModel[]>([]);


  searchParams : SupplierSearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: false,
    isDeleted: false
  };

  advancedFilterFlag: boolean = false;

  displayedColumns: string[] = ['index', 'supplierName', 'email', 'contactNumber', 'address'];

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.supplierApiService.getSuppliers$(this.searchParams).subscribe({
      next: (res) => {
        this.suppliers.set(res.data.suppliers);
        console.log(res.data.suppliers);
        if(res.statusCode === 404){
          console.log('No suppliers found');
        }
      },
      error: (err) => {
        this.toastr.error('Error getting suppliers', err || err.message);
      }
    });
  }

  toggleAdvancedFilter(){
    this.advancedFilterFlag = !this.advancedFilterFlag;
    this.clearAdvanceFilter();
  }

  clearAdvanceFilter(){
    this.searchParams.isArchived = false;
    this.searchParams.isDeleted = false;
  }

  search(){
    console.log(this.searchParams);
    this.getSuppliers();
  }

  refreshTable(){
    this.searchParams.searchTerm = '';
    this.getSuppliers();
  }

  // for archived items

  //for deleted items

  
}
