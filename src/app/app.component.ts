import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchFilterModule } from './search-filter.module';
import { APP_PROVIDERS } from './app-providers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule, SearchFilterModule,RouterModule],
  providers: [APP_PROVIDERS],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'MesProduits';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loadToken();

    if (!this.authService.getToken() || this.authService.isTokenExpired()) {
        this.router.navigate(['/login']);
    }
}

  onLogout() {
    this.authService.logout();
  }
}
