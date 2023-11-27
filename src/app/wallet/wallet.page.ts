import {ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';

import {Clipboard} from "@capacitor/clipboard";
import {BasePage, BasePageState} from "@app/shared/pages/base.page";
import {Account} from "@app/wallet/account.model";
import {isEmptyArray, isNil, isNotEmptyArray, isNotNil, isNotNilOrBlank} from "@app/shared/functions";
import {NetworkService} from "@app/network/network.service";
import {ActionSheetOptions, IonModal, PopoverOptions} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {RxStateProperty} from "@app/shared/decorator/state.decorator";
import {AuthController} from '@app/auth/auth.controller';
import {catchError, filter, mergeMap} from "rxjs/operators";
import {AccountsService} from "@app/wallet/accounts.service";
import {map, merge} from "rxjs";

export interface WalletState extends BasePageState {
  accounts: Account[];
  account: Account;
  address: string;
  currency: string;
  balance: number;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletPage extends BasePage<WalletState> implements OnInit {

  static NEW = Object.freeze(<Account>{
    address: ''
  });

  @RxStateProperty() accounts: Account[];
  @RxStateProperty() account: Account;
  @RxStateProperty() address: string;
  @RxStateProperty() currency: string;

  get balance(): number {
    if (!this.account?.data) return undefined;
    return (this.account.data.free || 0) + (this.account.data.reserved || 0);
  }

  protected actionSheetOptions: Partial<ActionSheetOptions> = {
    cssClass: 'select-account-action-sheet'
  };
  protected popoverOptions: Partial<PopoverOptions> = {
    cssClass: 'select-account-popover',
    reference: 'event'
  };

  readonly account$ = this._state.select('account');
  readonly accounts$ = this._state.select('accounts');


  get new(): Account {
    return WalletPage.NEW;
  }

  @ViewChild('authModal') authModal: IonModal;
  @ViewChild('qrCodeModal') qrCodeModal: IonModal;

  constructor(
    injector: Injector,
    protected router: Router,
    protected route: ActivatedRoute,
    protected networkService: NetworkService,
    protected accountService: AccountsService,
    protected authController: AuthController
  ) {
    super(injector, {
      name: 'wallet-page',
      loadDueTime: accountService.started ? 0 : 250
    })

    // Watch address from route or account
    this._state.connect('address',
      merge(
        this.route.paramMap.pipe(map(paramMap => paramMap.get('address'))),
        this.account$.pipe(map(a => a?.address))
      ).pipe(
        filter(address => isNotNilOrBlank(address) && address !== this.address)
      ));

    // Watch accounts
    this._state.connect('accounts', this.accountService.watchAll());

    // Open auth modal, if no account
    this._state.connect('account', this.accounts$.pipe(
      filter(accounts => isEmptyArray(accounts)),
      mergeMap((_) => this.openAuthModal()
        .catch((err) => {
          if (err?.message === 'CANCELLED') {
            console.error(this._logPrefix + 'User cancelled');
            // Redirect to home
            this.goHome();
            return null;
          }
          throw err;
        })
      ),
      filter(isNotNil)
    ));

    // Add new wallet
    this._state.hold(this.account$.pipe(filter(account => account === WalletPage.NEW)),
      _ => this.addNewWallet());

    // Load by address
    this._state.connect('account', this._state.$.pipe(
        filter(s => isNotEmptyArray(s.accounts) && isNil(s.account) && isNotNilOrBlank(s.address) && s.account !== WalletPage.NEW),
        mergeMap(async (s) => {
          console.debug(this._logPrefix + 'Loading account from address: ' + s.address);

          let account: Account;
          if (s.address === 'default') {
            account = await this.accountService.getDefault();
            return account
          }

          // Load by address
          const exists = await this.accountService.isAvailable(s.address);
          if (exists) {
            return this.accountService.getByAddress(s.address);
          }

          // Try by name
          account = await this.accountService.getByName(s.address);
          return account;
        })
      )
    );

  }

  async ngOnInit() {
    console.info(this._logPrefix + 'Initializing...');
    super.ngOnInit();
  }

  protected async goHome() {
    return this.router.navigateByUrl('/home');
  }

  protected async ngOnLoad(): Promise<WalletState> {

    this.info('Loading wallet page...');

    return <WalletState>{
      accounts: this.accountService.accounts,
      account: null,
      address: this.activatedRoute.snapshot.paramMap.get('address'),
      currency: this.networkService.currencySymbol
    };
  }

  async copyAddress() {
    if (this.loading || !this.account?.address) return; // Skip

    await Clipboard.write({
      string: this.account.address
    });
    await this.showToast({message: 'INFO.COPY_TO_CLIPBOARD_DONE'});
  }

  showQrCode() {
    if (this.qrCodeModal.isOpen) return; // Skip
    return this.qrCodeModal.present();
  }


  async addNewWallet(event?: Event): Promise<Account> {
    event?.preventDefault();
    event?.stopPropagation();

    const data = await this.authController.register();
    if (!data) return null;

    this.account = data;

    return data;
  }

  async openAuthModal(event?: UIEvent): Promise<Account|null> {
    event?.preventDefault();
    event?.stopPropagation();
    event?.stopImmediatePropagation();

    const account = await this.authController.login(event, {});
    if (!account?.address) {
      // Stop if waiting
      throw new Error('CANCELLED');
    }

    return account;
  }
}
