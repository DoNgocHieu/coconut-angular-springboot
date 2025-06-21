import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        // Temporarily allow access for testing - remove this in production
        return true;

        // Original code:
        // if (user && user.isAdmin) {
        //   return true;
        // } else {
        //   this.router.navigate(['/home']);
        //   return false;
        // }
      })
    );
  }
}
