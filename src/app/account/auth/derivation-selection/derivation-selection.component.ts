import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountsService } from '@app/account/accounts.service';
import { formatAddress } from '@app/shared/currencies';
import { ModalController } from '@ionic/angular';

const numberOfDerivations = 30;

@Component({
  selector: 'app-derivation-selection',
  templateUrl: 'derivation-selection.component.html',
})
export class DerivationSelectionComponent implements OnInit {
  @Input() mnemonic: string;
  @Input() derivations: { derivation: string; address: string; balance: number }[] = [];

  selectedDerivation: string;
  loading: boolean = false;

  constructor(
    private accountService: AccountsService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.derivations.length > 0) {
      this.loading = false;
    } else if (this.mnemonic) {
      this.scanDerivations();
    }
  }

  async scanDerivations() {
    this.loading = true;
    const promises = [];

    for (let i = -1; i <= numberOfDerivations; i++) {
      const promise = (async () => {
        let derivationPath = i === -1 ? '' : `//${i}`;
        const address = this.accountService.generateAddress(`${this.mnemonic}${derivationPath}`);
        const balance = await this.accountService.getBalance(address);
        if (balance > 0) {
          const shortAddress = formatAddress(address);
          if (derivationPath === '') {
            derivationPath = 'root';
          }
          this.derivations.push({ derivation: derivationPath, address: shortAddress, balance });
        }
      })();
      promises.push(promise);
    }

    await Promise.all(promises);
    this.loading = false;
    this.cd.detectChanges();

    return this.derivations;
  }

  selectDerivation(derivation: string) {
    this.selectedDerivation = derivation;
    this.cd.detectChanges();
  }

  onSelectionChange() {
    this.cd.detectChanges();
  }

  async onSelect() {
    if (this.selectedDerivation) {
      await this.modalCtrl.dismiss(this.selectedDerivation);
    }
  }

  async onCancel() {
    await this.modalCtrl.dismiss();
  }
}
