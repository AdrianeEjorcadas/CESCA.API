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
import { AuthService } from '../../../../services/auth-service';
import { TokenService } from '../../../../services/token-service';
import { OrderStatus } from '../../../enums/order/EOrder';
import { OrderDetailsModel } from '../../../../models/component-models/pos/order-details-model';
import { OrderModel } from '../../../../models/component-models/pos/order-model';
import { CreateOrderRequest } from '../../../../models/component-models/pos/create-order-request-model';
import { OrderService } from '../../../../services/order-service';

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
  private authService = inject(AuthService);
  private tokenServince = inject(TokenService);
  private orderService = inject(OrderService);

  userName: string | null = null;

  displayedColumns: string[] = ['productName', 'price', 'quantity', 'totalPerItem', 'actions'];

  disableInput: boolean = false;
  disableRecalculation: boolean = false;
  // public discountApplied: boolean = false;
  // payment: number = 0;
  totalOrderAmount = signal<number>(0);
  totalOrderAmountCopy = signal<number>(0); // hold the original amount
  change : number = 0;
  readonly DISCOUNT_PERCENTAGE = 0.2;
  updatedCart : PosTableModel[] = []; // fill when removing items
  orderForm! : FormGroup;
  private formBuilder = inject(FormBuilder);

  orderDetails: OrderDetailsModel[] = [];
  order: OrderModel[] = [];
  orderRequest: CreateOrderRequest | null = null;

  ngOnInit(): void {
    this.getUserName();
    this.initializedForm();
    this.updatedCart = this.data.cart;
    this.totalAmount();
    console.log(this.totalOrderAmount);
  }

  getUserName(){
    const token = this.tokenServince.getAccessToken();
    this.userName = this.authService.getUserName(token!);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  initializedForm(){
    this.orderForm = this.formBuilder.group({
      payment: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      discountApplied: [false],
      originalAmount: [this.totalOrderAmountCopy()],
      totalAmount: [this.totalOrderAmount()],
      change: [this.change.toFixed(2)],
      processBy: this.userName,
      status: ['']
    });
  }

  protected totalPerItem(price: number, quantity: number): string{
    const total = price * quantity;
    return total.toFixed(2);
  }

  totalAmount(){
  //   let items = this.data.cart;

  //  for (const item of items) {
  //     this.totalOrderAmount.update(value => value + item.price * item.quantity);
  //     this.totalOrderAmountCopy.set(this.totalOrderAmount());
  //  }
    const items = this.data.cart;
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.totalOrderAmount.set(sum);
    this.totalOrderAmountCopy.set(sum);

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
    this.updatedCart = this.data.cart;
    this.resetAmounts();
    this.totalAmount();
    console.log('rmeove: '+ JSON.stringify(this.data.cart));
  }

  resetAmounts(){
    const reset = 0;

    this.totalOrderAmount.update(value => reset);
    this.totalOrderAmountCopy.update(value => reset);
    this.change = 0;
    this.orderForm.get('discountApplied')?.setValue(false);
  }

  submit(){
    if(this.disableRecalculation){
      this.toastr.error('Please recalculate the order', 'Cesca\'\s Pharmacy');
    } else if(this.orderForm.value.payment <= 0 || this.orderForm.value.payment < this.totalOrderAmount()){
      this.toastr.error('Please enter a valid payment amount', 'Cesca\'\s Pharmacy');
    } else {
      this.populateOrderForm();
      this.populateOrderDetails();
      this.populateOrderRequest();
      this.emptyCart();
      this.orderService.placeOrder(this.orderRequest!).subscribe({
        next: (res) => {
          if(res.statusCode === 200){
            this.toastr.success('Order submitted', 'Cesca\'\s Pharmacy');
            this.dialogRef.close(null);
          } else {
            this.toastr.error('Order failed', 'Cesca\'\s Pharmacy');
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.toastr.error('Order failed', 'Cesca\'\s Pharmacy', err);
          this.dialogRef.close();
        }
      });
      // this.dialogRef.close();
    }
  }

  recalculateAmount(){
    this.totalAmount();
    this.disableRecalculation = !this.disableRecalculation;
    this.disableInput = !this.disableInput;
    this.toastr.info('Order recalculated', 'Cesca\'\s Pharmacy');
  }

  populateOrderForm(){
    this.orderForm.patchValue({
      payment: this.orderForm.value.payment,
      discountApplied: this.orderForm.value.discountApplied,
      totalAmount: this.totalOrderAmount(),
      change : this.change,
      status: OrderStatus.Completed,
      processBy: this.userName,
      originalAmount: this.totalOrderAmountCopy()
    });

    // console.log(this.orderForm.value);
  }

  populateOrderDetails(){
    this.orderDetails = this.data.cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));
  }

  populateOrderRequest(){
    this.orderRequest = {
      OrderDTO : {
        payment: this.orderForm.value.payment,
        change: this.orderForm.value.change,
        orderAmount: this.orderForm.value.originalAmount,
        discountApplied: this.orderForm.value.discountApplied,
        finalAmount: this.orderForm.value.totalAmount,
        status: this.orderForm.value.status,
        processBy: this.orderForm.value.processBy
      }, 
      OrderDetailsDTO: this.orderDetails
    };

    console.log(`final amount dto: ${JSON.stringify(this.orderRequest.OrderDTO.finalAmount)}`);
    console.log(`final amount form: ${JSON.stringify(this.orderForm.value.totalAmount)}`);
  }

  cancel(){
    this.dialogRef.close(this.updatedCart);
  }

  emptyCart(){
    if(this.data.cart.length > 0){
      this.data.cart = [];
    }
  }

}
