// Auth
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModalController } from "@ionic/angular";
import { AuthModal } from "../auth/modal/modal-auth";
import { AccountService } from "./account.service";
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private accountService: AccountService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // If account not started: loop after started
    if (!this.accountService.isStarted()) {
      return this.accountService.waitStart()
        // Iterate
        .then(() => this.canActivate(next, state) as Promise<boolean>);
    }

    // Force login 
    if (!this.accountService.isLogin()) {
      console.debug("[auth-gard] Need authentication for page /" + next.url.join('/'));
      return this.login(next)
        .then(res => {
          if (!res) {
            console.debug("[auth-gard] Authentication cancelled. Could not access to /" + next.url.join('/'));
            this.redirectToHome();
            return false;
          }
          // Iterate
          return this.canActivate(next, state) as Promise<boolean>;
        });
    }

    if (next.data && next.data.profile && !this.accountService.hasProfile(next.data.profile)) {
      console.debug("[auth-gard] Not authorized access to /" + next.url.join('/') + ". Missing required profile: " + next.data.profile);
      return false;
    }
    console.debug("[auth-gard] Authorized access to /" + next.url.join('/'));
    return true;
  }

  login(next?: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      let modal = await this.modalCtrl.create({ component: AuthModal, componentProps: { next: next } });
      modal.onDidDismiss()
        .then(() => {
          if (this.accountService.isLogin()) {
            resolve(true);
            return;
          }
          resolve(false);
        });
      return modal.present();
    });
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
