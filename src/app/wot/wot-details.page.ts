import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';

import { AppPage, AppPageState } from '@app/shared/pages/base-page.class';
import { Account } from '@app/account/account.model';
import { AccountsService } from '@app/account/accounts.service';
import { Clipboard } from '@capacitor/clipboard';
import { RxStateProperty, RxStateSelect } from '@app/shared/decorator/state.decorator';
import { firstValueFrom, mergeMap, Observable, switchMap } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { APP_TRANSFER_CONTROLLER, ITransferController } from '@app/transfer/transfer.model';
import { filter, map } from 'rxjs/operators';
import { firstArrayValue, isNotNilOrBlank } from '@app/shared/functions';
import { IndexerService } from '@app/network/indexer.service';
import { address2PubkeyV1, pubkeyV1Checksum } from '@app/shared/currencies';

export interface WotDetailsPageState extends AppPageState {
  address: string;
  account: Account;
  receivedCertCount: number;
  givenCertCount: number;
}

@Component({
  selector: 'app-wot-details',
  templateUrl: './wot-details.page.html',
  styleUrls: ['./wot-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class WotDetailsPage extends AppPage<WotDetailsPageState> implements OnInit {
  @RxStateSelect() address$: Observable<string>;
  @RxStateSelect() account$: Observable<Account>;
  @RxStateSelect() receivedCertCount$: Observable<number>;
  @RxStateSelect() givenCertCount$: Observable<number>;

  @Input() showToolbar = true;
  @Input() showBalance = false;
  @Input() showToastOnCertify = true;
  @Input() @RxStateProperty() address: string;
  @Input() @RxStateProperty() account: Account;

  constructor(
    private accountsService: AccountsService,
    private indexerService: IndexerService,
    @Inject(APP_TRANSFER_CONTROLLER) private transferController: ITransferController
  ) {
    super({ name: 'wot-details-page' });
    this._state.connect('address', this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('address'))));

    this._state.connect(
      'account',
      this.address$.pipe(
        mergeMap(async (address) => {
          const ownedAddress = await this.accountsService.isAvailable(address);
          return { address, ownedAddress };
        }),
        switchMap(({ address, ownedAddress }) => {
          if (ownedAddress) {
            return this.accountsService.watchByAddress(address);
          }
          return this.indexerService.wotSearch({ address }, { first: 1 }).pipe(map(({ data }) => firstArrayValue(data)));
        }),
        mergeMap(async (account) => {
          if (account.data) return account;
          const { data } = await this.accountsService.api.query.system.account(account.address);
          return {
            ...account,
            data: {
              ...JSON.parse(data.toString()),
            },
          };
        })
      )
    );

    const validAddress$ = this.account$.pipe(
      map((account) => account?.address),
      filter(isNotNilOrBlank)
    );

    // Watch certification count
    this._state.connect(
      'receivedCertCount',
      validAddress$.pipe(
        switchMap((address) => this.indexerService.certsSearch({ receiver: address }, { first: 0 })),
        map(({ total }) => total)
      )
    );
    this._state.connect(
      'givenCertCount',
      validAddress$.pipe(
        switchMap((address) => this.indexerService.certsSearch({ issuer: address }, { first: 0 })),
        map(({ total }) => total)
      )
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected async ngOnLoad(): Promise<WotDetailsPageState> {
    const account = await firstValueFrom(this.account$);
    return <WotDetailsPageState>{ account };
  }

  async copyPubkey(event: UIEvent, pubkey?: string) {
    if (this.loading) return;
    event.preventDefault();

    pubkey = pubkey || address2PubkeyV1(this.data?.address, this.context.currency?.ss58Format, false);
    if (!pubkey) return; // Skip

    // Append checksum
    pubkey += ':' + pubkeyV1Checksum(pubkey);

    await Clipboard.write({
      string: pubkey,
    });
    await this.showToast({ message: 'INFO.COPY_TO_CLIPBOARD_DONE' });
  }

  async copyAddress(event: UIEvent) {
    if (this.loading || !this.data?.account?.address) return; // Skip

    event.preventDefault();

    await Clipboard.write({
      string: this.account.address,
    });
    await this.showToast({ message: 'INFO.COPY_TO_CLIPBOARD_DONE' });
  }

  async transferTo() {
    return this.transferController.transfer({ recipient: this.account });
  }

  async certifyTo() {
    const issuer = await this.accountsService.selectAccount({ isMember: true });
    if (!issuer) return; // Skip

    this.markAsLoading();
    this.resetError();

    try {
      const certHash = await this.accountsService.cert(issuer, this.account);

      if (this.showToastOnCertify) {
        await this.showToast({ message: 'INFO.CERTIFICATION_DONE' });
      }

      return certHash;
    } catch (err) {
      this.setError(err);
      this.markAsLoaded();
    }
  }
}
