import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token-service';
import { ToastrService } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogLogout } from '../../reusable/confirm-dialog-logout/confirm-dialog-logout';
import { NgOptimizedImage, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, NgOptimizedImage, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  standalone: true,
})
export class Admin implements OnInit{

  private router = inject(Router);
  private tokenService = inject(TokenService);
  private toastrService = inject(ToastrService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private role : string | null = null;

  ngOnInit(): void {
    this.checkUserRole();
  }


  logoutPrompt(): void {
    this.dialog.open(ConfirmDialogLogout).afterClosed().subscribe(result => {
      if (result) {
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
        this.toastrService.success('Logout Successful!', 'Goodbye madapaker');
      }
    });
  }

  checkUserRole() : boolean {
    const token = this.tokenService.getAccessToken();
    if(token){
      this.role = this.authService.getRoleFromToken(token);
    }
    
    if(this.role === 'User'){
      return false
    }
    return true;
  }
}
