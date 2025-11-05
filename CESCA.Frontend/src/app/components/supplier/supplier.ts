import { Component, inject, model, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { SupplierSearchParameter } from '../../models/search-parameter';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgClass } from '@angular/common';
import { SupplierApiService } from '../../services/supplier-api-service';
import { SupplierResponse } from '../../models/component-models/supplier-response';
import { finalize, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule}from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SupplierModel } from '../../models/component-models/supplier-model';
import { NgIf } from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MetadataModel } from '../../models/component-models/metadata-model';

// modals
import { AddSupplier } from '../modal-components/supplier/add-supplier/add-supplier';

@Component({
  selector: 'app-supplier',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, NgClass, MatTableModule, MatPaginator, MatDialogModule],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css'
})
export class Supplier implements OnInit {

  private supplierApiService = inject(SupplierApiService);
  // taostr service
  private toastr = inject(ToastrService);
  //dialog
  private dialog = inject(MatDialog);

  suppliersWithMetadata = signal<SupplierResponse | null>(null); 
  suppliers = signal<SupplierModel[]>([]);
  // dataSource = new MatTableDataSource<SupplierModel>([]); // data source for mat table

  // table variables
  isLoading = signal<boolean>(true);

  searchParams : SupplierSearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: false,
    isDeleted: false
  };

  //paginator
  paginatorMetadata : MetadataModel | null = null;


  advancedFilterFlag: boolean = false;

  displayedColumns: string[] = ['index', 'supplierName', 'email', 'contactNumber', 'address'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getSuppliers();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator; for mat-table
  // }

  getSuppliers(){
    this.isLoading.set(true);
    this.supplierApiService.getSuppliers$(this.searchParams)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (res) => {
        //set data to supplier signal
        this.suppliers.set(res.data.suppliers);
        //map metaData
        this.paginatorMetadata = res.data.metaData;
        // console.log("metadata " + JSON.stringify(this.suppliers()));
        if(res.data.suppliers.length === 0){
          this.toastr.info('No suppliers found');
        } else {
          this.toastr.success('Suppliers fetched successfully');
        }
        if(res.statusCode === 404){
          console.log('No suppliers found');
        }
      },
      error: (err) => {
        this.toastr.error('Error getting suppliers', err || err.message);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize; 
    this.getSuppliers();
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
    // this.resetPaginator();
    this.getSuppliers();
  }

  refreshTable(){
    this.searchParams.searchTerm = '';
    this.clearAdvanceFilter();
    this.resetPaginator();
    this.getSuppliers();
  }

  resetPaginator(){
    this.paginatorMetadata = null;
  }

  //add supplier
  addSupplier(){
    const dialogRef = this.dialog.open(AddSupplier,{
      width: '400px',
      disableClose: true,
    });

  }

  
}
