import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '@app/account/accounts.service';
import { environment } from '@environments/environment';
import { AuthController } from '@app/account/auth.controller';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  private readonly _debug: boolean;

  constructor(private accountService: AccountsService, private authController: AuthController, private router: Router) {
    this._debug = !environment.production;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // If account not started: loop after started
    if (!this.accountService.started) {
      return (
        this.accountService
          .ready()
          // Iterate
          .then(() => this.canActivate(next, state) as Promise<boolean | UrlTree>)
      );
    }

    // Force login
    if (!this.accountService.isLogin) {
      if (this._debug) console.debug('[auth-guard] Need authentication for page /' + next.url.join('/'));
      return this.login().then((res) => {
        if (!res) {
          if (this._debug)
            console.debug('[auth-guard] Authentication cancelled. Could not access to /' + next.url.join('/'));
          return this.router.parseUrl('/home');
        }
        // Iterate
        return this.canActivate(next, state) as Promise<boolean | UrlTree>;
      });
    }

    if (this._debug) console.debug('[auth-guard] Authorized access to /' + next.url.join('/'));
    return true;
  }

  async login(): Promise<boolean> {
    try {
      const account = await this.authController.login();
      return !!account;
    } catch (err) {
      return false;
    }
  }
}
