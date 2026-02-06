import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PosTableModel } from '../../../../models/component-models/pos/pos-table-model';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatTableModule, MatIconModule, MatMenuModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cart: PosTableModel[] }){}  

  private dialogRef= inject(MatDialogRef<AddToCart>);

  displayedColumns: string[] = ['productName', 'price', 'quantity', 'totalPerItem', 'actions'];

  disableInput: boolean = true;
  // public isDiscounted: boolean = false;
  // payment: number = 0;
  totalOrderAmount: number = 0;
  totalOrderAmountCopy: number = 0; // hold the original amount
  change: number = 0;
  readonly DISCOUNT_PERCENTAGE = 0.2;


  // public orderFormData : {
  //   payment: number,
  //   isDiscounted: boolean,
  //   totalAmount: number,
  //   change: number
  // } = {
  //   payment: 0,
  //   isDiscounted: false,
  //   totalAmount: 0,
  //   change: 0
  // }


  orderForm! : FormGroup;
  private formBuilder = inject(FormBuilder);


  ngOnInit(): void {
    this.initializedForm();
    this.totalAmount();
    console.log(this.totalOrderAmount);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  initializedForm(){
    this.orderForm = this.formBuilder.group({
      payment: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      isDiscounted: [false],
      totalAmount: [this.totalOrderAmount],
      change: [this.change.toFixed(2)]
    })
  }

  protected totalPerItem(price: number, quantity: number): string{
    const total = price * quantity;
    return total.toFixed(2);
  }

  totalAmount(){
    let items = this.data.cart;

   for (const item of items) {
      this.totalOrderAmount += item.price * item.quantity;
      this.totalOrderAmountCopy = this.totalOrderAmount;
   }
  }

  customerChange(totalAmount: number, payment: number): string{
    if (payment <= 0){
      return '0';
    }

    this.change = payment - totalAmount;

    return this.change.toFixed(2);
  }

  onDiscountChange(event: MatCheckboxChange){
    this.getDiscountedPrice(event.checked);
  }

  getDiscountedPrice(isChecked: boolean){
    let discountedPrice = this.totalOrderAmountCopy * this.DISCOUNT_PERCENTAGE; 
    if(isChecked){
      this.totalOrderAmount = this.totalOrderAmount - discountedPrice;
    } else {
      this.totalOrderAmount = this.totalOrderAmountCopy;
    }
  }

  editItem(){
    console.log('edit item');
  }

  removeItem(){
    console.log('remove item');
  }

  submit(){
    this.populateOrderForm();
    console.log(this.orderForm.value);
  }

  populateOrderForm(){
    this.orderForm.patchValue({
      payment: this.orderForm.value.payment,
      isDiscounted: this.orderForm.value.isDiscounted,
      totalAmount: this.totalOrderAmount,
      change : this.change
    });
  }

  cancel(){
    this.dialogRef.close();
  }

}
