import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../../services/inventory-service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

import { DateValidator } from '../../../../validators/date-validator';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit {
  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  protected addProductForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initializedForm();
  }

  initializedForm(){
    this.addProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      genericName: '',
      category: ['', [Validators.required]],
      subCategory: [''],
      brand: [''],
      form: ['', [Validators.required]],
      strengthOrSize: ['', [Validators.required]],
      unitSize: '',
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockQuantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      reorderLevel: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      isPerishable:  [false],
      expirationDate: ['', [Validators.required, DateValidator.LessThanToday]],
      isPrescriptionOnly: [false],
      barCode: [''],
      shelfLocation: [''],
      rackNumber: [''],
      aisle: ['']
    });
  }
 
}
