import { Component, inject, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../../../../services/inventory-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DateValidator } from '../../../../validators/date-validator';
import { InventoryModel } from '../../../../models/component-models/inventory/inventory-model';
import { UpdateProductModel } from '../../../../models/component-models/supplier/update-product-model';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {

  private inventoryService = inject(InventoryService);
  private toaster = inject(ToastrService);

  public editProductForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  protected today = new Date().toISOString().split('T')[0];

  private product : InventoryModel | null = null;

  constructor(
    protected dialogRef: MatDialogRef<EditProduct>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateProductModel
  ){}

  ngOnInit(): void {
    // console.log( 'data:  ', this.data);
    this.initializedForm();
    // console.log('controls:',  this.editProductForm.controls);
    // console.log( 'data:  ', this.data);
    // console.log( 'edit form: ', this.editProductForm.value);
  }

  initializedForm(){
    const product = this.data.inventoryModel;
    const updatedBy = this.data?.updatedBy;

    this.editProductForm = this.formBuilder.group({
      productId: [product.productId],
      productName: [product.productName, [Validators.required]],
      genericName: [product.genericName ?? ''],
      category: [product.category, [Validators.required]],
      subCategory: [product.subCategory ?? ''],
      brand: [product.brand ?? ''],
      form: [product.form, [Validators.required]],
      strengthOrSize: [product.strengthOrSize, [Validators.required]],
      unitSize: [product.unitSize ?? ''],
      price: [product.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stockQuantity: [product.stockQuantity, [Validators.required, Validators.pattern(/^\d+$/)]],
      reorderLevel: [product.reorderLevel, [Validators.required, Validators.pattern(/^\d+$/)]],
      isPerishable:  [product.isPerishable],
      expirationDate: [product.expirationDate 
        ? new Date(product.expirationDate).toISOString().split('T')[0] : ''
        ,[Validators.required, DateValidator.NotLessThanToday]],
      isPrescriptionOnly: [product.isPrescriptionOnly],
      barcode: [product.barcode],
      shelfLocation: [ product.shelfLocation ?? ''],
      rackNumber: [product.rackNumber ?? ''],
      aisle: [product.aisle ?? ''], 
      supplierId: [product.supplierId],
      updatedBy: [updatedBy]
    });
  }

  onSubmit(){
    this.inventoryService.editProduct(this.editProductForm.value).subscribe({
      next: (res) => {
        if(res.statusCode === 200){
          this.toaster.success('Product updated successfully');
          this.dialogRef.close(res.statusCode);
        }
      }, 
      error: (err) => {
        this.toaster.error('Server Error. Please contact your administrator.');
      }
    });

    // console.log(this.editProductForm.value);
  }

  cancel(){
    this.dialogRef.close();
  }

}
