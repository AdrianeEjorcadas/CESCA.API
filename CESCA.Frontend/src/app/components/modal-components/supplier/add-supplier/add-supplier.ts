import { Component, inject, Inject, OnInit } from '@angular/core';
import { SupplierApiService } from '../../../../services/supplier-api-service';
import { AddSupplierModel } from '../../../../models/component-models/add-supplier-model';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-supplier',
  imports: [MatDialogModule, ReactiveFormsModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './add-supplier.html',
  styleUrl: './add-supplier.css'
})
export class AddSupplier implements OnInit{
  private supplierService = inject(SupplierApiService);

  protected addSupplierForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(
    protected dialogRef: MatDialogRef<AddSupplier>,
    @Inject(MAT_DIALOG_DATA) public data: AddSupplierModel
  ){}

  ngOnInit(): void {
    this.initializedForm();
  }

  initializedForm(){
    this.addSupplierForm = this.formBuilder.group({
      supplierName : ['',Validators.required],
      email : ['',Validators.email],
      contactNumber : [''],
      address : ['']
    });
  }

  onSubmit(){
    console.log(this.addSupplierForm.value);
  }

}
