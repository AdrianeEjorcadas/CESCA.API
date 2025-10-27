import { Component, model, signal } from '@angular/core';
import { SupplierSearchParameter } from '../../models/search-parameter';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'app-supplier',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css'
})
export class Supplier {

  searchParams : SupplierSearchParameter = {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: '',
    isArchived: false
  };

  search(){
    console.log(this.searchParams);
  }
  
}
