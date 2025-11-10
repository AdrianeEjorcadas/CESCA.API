import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierApiService } from '../../../../services/supplier-api-service';
import { UpdateSupplierModel } from '../../../../models/component-models/update-supplier';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-supplier',
  imports: [ReactiveFormsModule],
  templateUrl: './update-supplier.html',
  styleUrl: './update-supplier.css'
})
export class UpdateSupplier implements OnInit{

  private supplierService = inject(SupplierApiService);
  private toastr = inject(ToastrService);

  protected updateSupplierForm! : FormGroup;
  protected formBuilder = inject(FormBuilder);

  constructor(
    protected dialogRef: MatDialogRef<UpdateSupplier>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateSupplierModel
  ){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.updateSupplierForm = this.formBuilder.group({
      supplierName : ['',Validators.required],
      email : ['',Validators.email],
      contactNumber : [''],
      address : [''],
      isDeleted: [false],
      updatedBy: ['']
    });
  }

  onSubmit(){
    if(this.updateSupplierForm.dirty){
      const formData: UpdateSupplierModel = this.updateSupplierForm.value;
      this.supplierService.updateSupplier(formData).subscribe({
        next: (res) => {
          if (res.statusCode === 200){
            this.toastr.success('Supplier updated successfully');
            this.dialogRef.close(res.statusCode);
          }
        },
        error: (err) => {
          this.toastr.error('Server Error. Please contact your administrator.' + err.message);
        }
      });
    }
  }

  cancel(){
    this.dialogRef.close();
  } 

}
