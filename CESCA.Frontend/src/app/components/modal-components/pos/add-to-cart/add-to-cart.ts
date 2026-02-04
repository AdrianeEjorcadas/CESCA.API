import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PosTableModel } from '../../../../models/component-models/pos/pos-table-model';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-to-cart',
  imports: [FormsModule, MatTableModule, MatIconModule, MatMenuModule, MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cart: PosTableModel[] }){}  

  private dialogRef= inject(MatDialogRef<AddToCart>);

  displayedColumns: string[] = ['productName', 'price', 'quantity', 'totalPerItem', 'actions'];

  public isDiscounted: boolean = false;

  closeDialog(){
    this.dialogRef.close();
  }

  protected totalPerItem(price: number, quantity: number): string{
    const total = price * quantity;
    return total.toFixed(2);
  }

  editItem(){
    console.log('edit item');
  }

  removeItem(){
    console.log('remove item');
  }

}
