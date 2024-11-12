import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // Do not use ToastrModule.forRoot() here
  ],
})
export class RegisterComponent implements OnInit {
  
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err!: any;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) { } 
  
  ngOnInit(): void { 
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', [Validators.required]] 
    });
  } 
  
  onRegister() {
    this.loading = true
    this.user.username = this.myForm.value.username;
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
  
    if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
      this.toastr.error("Passwords do not match!");
      this.loading = false;
      return; 
    }
  
    this.authService.registerUser(this.user).subscribe({
      next: (res) => { 
        this.toastr.success('Please confirm your email','Confirmation');
        this.router.navigate(["/verifEmail", this.user.email]);
        this.loading = false;
      },
      error: (err: any) => { 
        if (err.status === 400) { 
          this.err = err.error.message;
        }
        this.loading = false;
      }
    });
  }
}
