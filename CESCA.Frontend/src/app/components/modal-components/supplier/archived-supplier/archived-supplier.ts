import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SupplierApiService } from '../../../../services/supplier-api-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archived-supplier',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './archived-supplier.html',
  styleUrl: './archived-supplier.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedSupplier{

  supplierName = inject(MAT_DIALOG_DATA);

}
