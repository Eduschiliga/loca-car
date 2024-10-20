import { CanActivateFn, CanLoad, CanLoadFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { inject, Inject } from '@angular/core';
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state): Observable<boolean> | boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isAutenticado()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const authGuardCanLoad: CanLoadFn = (route): Observable<boolean> | boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isAutenticado()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
}
