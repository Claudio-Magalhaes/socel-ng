import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {SessionService} from "../../../services/session-service/session.service";
import {TokenService} from "../../../services/token-service/token.service";

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(
    private session: SessionService,
    private token: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.token.issetToken()) {
      this.session.logout();
      return false;
    }

    if (!this.token.checkExp()) {
      this.session.logout();
      return false;
    }

    return true;
  }
}
