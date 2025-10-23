import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TokenService } from '../../services/token-service';
import { ToastrService } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmDialogLogout } from '../../reusable/confirm-dialog-logout/confirm-dialog-logout';
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  standalone: true,
})
export class Admin {

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private toastrService = inject(ToastrService);
  private dialog = inject(MatDialog);

  logoutPrompt(): void {
    this.dialog.open(ConfirmDialogLogout).afterClosed().subscribe(result => {
      if (result) {
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
        this.toastrService.success('Logout Successful!', 'Goodbye madapaker');
      }
    });
  }

}
