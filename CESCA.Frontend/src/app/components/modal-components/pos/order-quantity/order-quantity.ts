import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, } from '@angular/material/dialog';
import { MatInput } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-quantity',
  imports: [MatDialogActions, MatDialogTitle, MatDialogContent, MatInput, FormsModule],
  templateUrl: './order-quantity.html',
  styleUrl: './order-quantity.css'
})
export class OrderQuantity {

  private toastr = inject(ToastrService);
  private dialog = inject(MatDialogRef);
  data = inject<{productName: string, quantity: number}>(MAT_DIALOG_DATA);
  public quantity = 0;

  public checkQuantity(){
    if(this.quantity > this.data.quantity || this.quantity <= 0){
      this.toastr.error(`Quantity cannot excceed available stock (${this.data.quantity})`, 'Cesca\'\s Pharmacy');
    } else {
      this.dialog.close(this.quantity);
    }
  }

  public closeDialog(){
    this.dialog.close();
  }
}
