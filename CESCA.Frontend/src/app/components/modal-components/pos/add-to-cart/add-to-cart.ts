import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PosTableModel } from '../../../../models/component-models/pos/pos-table-model';

@Component({
  selector: 'app-add-to-cart',
  imports: [],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosTableModel[]
  ) {
  }  

  private dialogRef= inject(MatDialogRef<AddToCart>);

  closeDialog(){
    this.dialogRef.close();
  }

}
