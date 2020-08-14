import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../service/auth/auth.service";

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.auth.userValue;
    if (!user) {
      return true;
    }

    this.router.navigate(['/dashboard/user'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
