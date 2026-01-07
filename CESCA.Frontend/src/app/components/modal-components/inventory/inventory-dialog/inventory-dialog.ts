import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-dialog',
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './inventory-dialog.html',
  styleUrl: './inventory-dialog.css'
})
export class InventoryDialog {
  content = inject<{process: string, productName: string}>(MAT_DIALOG_DATA);
}
