import { Component, inject, signal, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory-service';
import { ToastrService } from 'ngx-toastr';
import { InventoryModel } from '../../models/component-models/inventory/inventory-model';
import { InventorySearchParameter } from '../../models/search-parameter';
import { MetadataModel } from '../../models/component-models/metadata-model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inventory',
  imports: [FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  // inventory items
  inventory = signal<InventoryModel[]>([]);

  //paginator
  paginatorMetaData : MetadataModel | null = null;

  // search params
  searchParams : InventorySearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: true,
    isDeleted: false
  };

  ngOnInit(): void {
    this.getInventoryItems();
  }

  getInventoryItems(){
    this.inventoryService.getInventoryItems$(this.searchParams)
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
    console.log('searching');
  } 

}
