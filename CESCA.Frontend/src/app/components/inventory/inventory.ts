import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory-service';
import { ToastrService } from 'ngx-toastr';
import { InventoryModel } from '../../models/component-models/inventory/inventory-model';
import { InventorySearchParameter } from '../../models/search-parameter';
import { MetadataModel } from '../../models/component-models/metadata-model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

//mat
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

//paginator
import {MatPaginator, PageEvent} from '@angular/material/paginator';

//Pipe
import { NormalizeDatePipePipe}    from '../../pipe/normalize-date-pipe-pipe';
import { AddProduct } from '../modal-components/inventory/add-product/add-product';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule, NgClass, MatInputModule, MatFormFieldModule, MatCheckboxModule, NormalizeDatePipePipe, MatPaginator],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  private dialog = inject(MatDialog);

  // inventory items
  inventory = signal<InventoryModel[]>([]);

  //paginator
  paginatorMetaData : MetadataModel | null = null;

  // table variables
  isLoading = signal<boolean>(true);

  // search params
  searchParams : InventorySearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: false,
    isDeleted: false
  };

  advancedFilterFlag: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getInventoryItems();
  }

  getInventoryItems(){
    this.inventoryService.getInventoryItems$(this.searchParams)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
        next: (res) => {
          this.inventory.set(res.data.products);
          this.paginatorMetaData = res.data.metaData;
          console.log('inventory: ', res.data.products);
          if(res.data.metaData.totalCount === 0){
            this.toastr.info('No data found');
          } else{
            this.toastr.success('Data fetched successfully');
          }

          if(res.statusCode === 404){
            this.toastr.info('No data found');
          }
        },
        error: (err) =>{
          this.toastr.error('Something went wrong ' + err);
        }
      } 
    );
  }

  search(){
    this.getInventoryItems();
  }
  
  addProduct(){
    const dialogRef = this.dialog.open(AddProduct, {
      width: '400px',
      disableClose: false,
    });
  }

  refreshTable(){
    this.searchParams.searchTerm = '';
    this.clearAdvanceFilter(); 
    this.getInventoryItems();
  }

  toggleAdvancedFilter(){
    this.advancedFilterFlag = !this.advancedFilterFlag;
  }

  clearAdvanceFilter(){
    this.searchParams.isArchived = false;
    this.searchParams.isDeleted = false;
  }

  isExpired(itemExpirationDate: string) : boolean{
    var inputDate = new Date(itemExpirationDate);
    var today = new Date();

    // Strip time so comparison is only by date
  const input = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return input < now; // true if expired
  }

  //paginator

   onPageChange(event: PageEvent) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize; 
    this.getInventoryItems();
  }

   resetPaginator(){
    this.paginatorMetaData = null;
  }

}
