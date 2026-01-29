import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, } from '@angular/material/dialog';
import { MatInput } from "@angular/material/input";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-quantity',
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInput, FormsModule],
  templateUrl: './order-quantity.html',
  styleUrl: './order-quantity.css'
})
export class OrderQuantity {

  productName = inject<string>(MAT_DIALOG_DATA);
  protected quantity = 0;

}
