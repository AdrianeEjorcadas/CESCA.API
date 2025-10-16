import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  // services
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);


  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ){
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }



  get emailError(): string | null{
    const emailControl = this.loginForm.get('email');
    if(emailControl?.touched && emailControl?.hasError('required')){
      return 'Email is required*';
    }
    if(emailControl?.touched && emailControl?.hasError('email')){
      return 'Email is invalid*';
    }
    return null
  }

  get passwordError(): string | null{
    const passwordControl = this.loginForm.get('password');
    if(passwordControl?.touched && passwordControl?.hasError('required')){
      return 'Password is required*';
    }

    if (passwordControl?.touched && passwordControl?.hasError('minlength')){
      return 'Password must be at least 8 characters*';
    }

    return null;
  }

  
  onSubmit(){
    this.authService.loginPost(this.loginForm.value).subscribe({
      next: (res) => {
        //navigate to home
        this.toastrService.success('Login Successful!', 'Welcome madapaker');
      },
      error: (err) => {
        this.toastrService.error('Invalid credentials', 'Login failed');
      }
    });
  }

}
