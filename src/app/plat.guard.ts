import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const PlatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ensure you're calling the isloggedIn method as a boolean property
  if (authService.isloggedIn && !authService.isTokenExpired() && authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/app-forbidden']);
    return false;
  }
};
