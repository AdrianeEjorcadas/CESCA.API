import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-mat-dialog',
  imports: [MatButtonModule],
  templateUrl: './mat-dialog.html',
  styleUrl: './mat-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatDialog {
  readonly dialog = inject(MatDialog);

 
}
