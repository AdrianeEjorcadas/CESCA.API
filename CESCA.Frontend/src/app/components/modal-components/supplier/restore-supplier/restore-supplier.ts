import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-restore-supplier',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './restore-supplier.html',
  styleUrl: './restore-supplier.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreSupplier {

  supplierName = inject(MAT_DIALOG_DATA);

}
