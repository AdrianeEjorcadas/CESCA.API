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
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


// modals
import { AddSupplier } from '../modal-components/supplier/add-supplier/add-supplier';
import { ArchivedSupplier } from '../modal-components/supplier/archived-supplier/archived-supplier';
import { RestoreSupplier } from '../modal-components/supplier/restore-supplier/restore-supplier';

@Component({
  selector: 'app-supplier',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, NgClass, MatTableModule, MatPaginator, MatDialogModule, MatIconModule, MatMenuModule, MatButtonModule],
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
        this.paginatorMetadata = null;
        this.paginatorMetadata = res.data.metaData;
        console.log("metadata " + JSON.stringify(res.data.metaData));
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
    console.log(this.paginatorMetadata);
    this.resetPaginator();
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

    dialogRef.afterClosed().subscribe(result => {
      if(result === 201){
        this.refreshTable();
      }
    });
  }

  //archived supplier
  archivedSupplier(supplierId: string, supplierName: string){
    const dialogRef = this.dialog.open(ArchivedSupplier, {
      width: '400px',
      disableClose: true,
      data: supplierName
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result === true){
        this.supplierApiService.archivedSupplier(supplierId).subscribe({
          next: (res) => {
            if(res.statusCode === 200){
              this.toastr.success('Supplier archived successfully');
              this.refreshTable();
            } else {
              this.toastr.error('Error archiving supplier');
            }
          },
          error: (err) => {
            this.toastr.error('Server Error. Please contact your administrator.' + err || err.message || err.error);
          }
        }); 
      }
    });
  }

  // restore supplier
  restoreSupplier(supplierId: string, supplierName: string){
    const dialogRef = this.dialog.open(RestoreSupplier, {
      width: '400px',
      disableClose: true,
      data: supplierName
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result === true){
        this.supplierApiService.archivedSupplier(supplierId).subscribe({
          next: (res) => {
            if(res.statusCode === 200){
              this.toastr.success('Supplier restored successfully');
              this.refreshTable();
            } else {
              this.toastr.error('Error restoring supplier');
            }
          },
          error: (err) => {
            this.toastr.error('Server Error. Please contact your administrator.' + err || err.message || err.error);
          }
        }); 
      }
    });
  }

  //delete supplier
  deleteSupplier(supplierId: string){
    console.log("delete: " + supplierId);
  }

  //edit supplier
  editSupplier(supplierId: string){
    console.log("edit: " + supplierId);
  }
}
