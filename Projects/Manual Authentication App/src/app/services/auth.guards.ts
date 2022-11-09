import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthenticationService, private route: Router) {}

  canActivate() {
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}
