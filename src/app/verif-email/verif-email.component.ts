import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css'],
  imports: [    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,RouterModule],
  standalone: true,
})
export class VerifEmailComponent implements OnInit {
  code: string = "";
  user: User = new User();
  err: string = "";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getRegistredUser();
    this.user.email = this.route.snapshot.paramMap.get('email') || '';
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Email validation successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/login']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        if (err.status === 400) {
          if (err.error.errorCode === "INVALID_TOKEN") {
            this.err = "Code invalide!";
          } else if (err.error.errorCode === "EXPIRED_TOKEN") {
            this.err = "Code a expiré!";
          } else {
            this.err = err.error.message;
          }
        }
        console.log(err);
      }
    });
  }
}