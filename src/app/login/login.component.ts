import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          let jwToken = data.headers.get('Authorization')!;
          this.authService.saveToken(jwToken);
           this.router.navigate(['/']); 
        },
        error: (err: any) => {
        this.erreur = 1; 
        }
        });
        
        
    }

}