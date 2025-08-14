import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../pages/auth/services/auth';

@Injectable({ providedIn: 'root' })
export class RequireAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.token$.pipe(
      take(1),
      map(token => {
        const ok = token !== '';
        if (!ok) this.router.navigate(['/login']);
        return ok;
      })
    );
  }
}