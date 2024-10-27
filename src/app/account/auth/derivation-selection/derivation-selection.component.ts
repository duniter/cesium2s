import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AccountsService } from '@app/account/accounts.service';
import { formatAddress } from '@app/shared/currencies';
import { ModalController } from '@ionic/angular';
import { Keyring } from '@polkadot/keyring';
import { encodeAddress } from '@polkadot/util-crypto';

const numberOfDerivations = 30;

@Component({
  selector: 'app-derivation-selection',
  templateUrl: 'derivation-selection.component.html',
  styleUrls: ['derivation-selection.component.scss'],
})
export class DerivationSelectionComponent implements OnInit {
  @Input() mnemonic: string;

  derivations: { derivation: string; address: string; balance: number }[] = [];
  selectedDerivation: string;
  progress: number = 0;
  loading: boolean = true;

  constructor(
    private accountService: AccountsService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.scanDerivations();
  }

  async scanDerivations() {
    const promises = [];

    for (let i = 0; i <= numberOfDerivations; i++) {
      const derivationPath = `//${i}`;
      const promise = (async () => {
        const address = this.generateAddress(`${this.mnemonic}${derivationPath}`);
        const balance = await this.accountService.getBalance(address);
        if (balance > 0) {
          const shortAddress = formatAddress(address);
          this.derivations.push({ derivation: derivationPath, address: shortAddress, balance });
        }

        // Update progress bar
        this.updateProgress(i, numberOfDerivations);
        this.cd.detectChanges();
      })();

      promises.push(promise);
    }

    await Promise.all(promises);
    this.loading = false;
    this.cd.detectChanges();

    if (this.derivations.length === 0) {
      await this.modalCtrl.dismiss('');
    }
  }

  updateProgress(current: number, total: number) {
    this.progress = (current / total) * 100;
  }

  generateAddress(mnemonicWithDerivation: string): string {
    try {
      const keyring = new Keyring({ type: 'sr25519' });
      const pair = keyring.createFromUri(mnemonicWithDerivation);
      return encodeAddress(pair.address);
    } catch (error) {
      console.error('Error generating address from mnemonic:', error);
      return '';
    }
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
}
