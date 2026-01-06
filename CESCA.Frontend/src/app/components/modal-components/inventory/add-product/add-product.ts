import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../../services/inventory-service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateValidator } from '../../../../validators/date-validator';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit {

  private inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  protected addProductForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  protected today = new Date().toISOString().split('T')[0];

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
      unitSize: [''],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockQuantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      reorderLevel: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      isPerishable:  [false],
      expirationDate: ['', [Validators.required, DateValidator.NotLessThanToday]],
      isPrescriptionOnly: [false],
      barCode: [''],
      shelfLocation: [''],
      rackNumber: [''],
      aisle: [''], 
      supplierId: ['13bc7132-5e39-496b-946c-99beba551864'] //temporary sup id to avoid fk error
    });
  }

  onSubmit(){
    // console.log(this.addProductForm.value);
    // console.log('submit');
    this.addProduct();
  }

  cancel(){
    console.log('cancel');
  }

  addProduct(){
    this.inventoryService.addProduct(this.addProductForm.value).subscribe({
      next: (res) => {
        if(res.statusCode === 201){
          this.toastr.success('Product added successfully');
        } else {
          this.toastr.error('Error adding product');
        }
      }, 
      error : (err) => {
        this.toastr.error('Server Error. Please contact your administrator.');
      }
    });
  }
 
}