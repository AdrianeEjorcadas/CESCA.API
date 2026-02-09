import { Component, inject, Inject, OnInit, signal } from '@angular/core';
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
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-to-cart',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatTableModule, MatIconModule, MatMenuModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cart: PosTableModel[] }){}  

    private toastr = inject(ToastrService);
  private dialogRef= inject(MatDialogRef<AddToCart>);

  displayedColumns: string[] = ['productName', 'price', 'quantity', 'totalPerItem', 'actions'];

  disableInput: boolean = false;
  disableRecalculation: boolean = false;
  // public isDiscounted: boolean = false;
  // payment: number = 0;
  totalOrderAmount = signal<number>(0);
  totalOrderAmountCopy = signal<number>(0); // hold the original amount
  change : number = 0;
  readonly DISCOUNT_PERCENTAGE = 0.2;

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
      this.totalOrderAmount.set(item.price * item.quantity);
      this.totalOrderAmountCopy.set(this.totalOrderAmount());
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
    let discountedPrice = this.totalOrderAmountCopy() * this.DISCOUNT_PERCENTAGE; 
    if(isChecked){
      this.totalOrderAmount.set(this.totalOrderAmountCopy() - discountedPrice)
    } else {
      this.totalOrderAmount.set(this.totalOrderAmountCopy());
    }

    console.log('total order amount: ' + this.totalOrderAmount());
    console.log('total order amount copy: ' + this.totalOrderAmountCopy());
  }

  editItem(){
    this.disableRecalculation = !this.disableRecalculation;
    this.disableInput = !this.disableInput;
  }

  removeItem(productId: string){
    this.data.cart = this.data.cart.filter(item => item.productId !== productId);
    this.resetAmounts();
    this.totalAmount();
    console.log(this.data.cart)
  }

  resetAmounts(){
    const reset = 0;

    this.totalOrderAmount.update(value => reset);
    this.totalOrderAmountCopy.update(value => reset);
    this.change = 0;
    this.orderForm.get('isDiscounted')?.setValue(false);
  }

  submit(){
    if(!this.disableRecalculation){
      this.populateOrderForm();
      this.toastr.success('Order submitted', 'Cesca\'\s Pharmacy');
      this.dialogRef.close();
    } else {
      this.toastr.error('Please recalculate the order', 'Cesca\'\s Pharmacy');
    }
  }

  recalculateAmount(){
    this.totalAmount();
    this.disableRecalculation = false;
    this.toastr.info('Order recalculated', 'Cesca\'\s Pharmacy');
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
