import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-logout',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './confirm-dialog-logout.html',
  styleUrl: './confirm-dialog-logout.css',
  standalone: true,
})
export class ConfirmDialogLogout {

}
