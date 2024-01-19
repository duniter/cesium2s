import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/shared.module';
import { NavController } from '@ionic/angular';
import { ContextService } from '@app/shared/services/storage/context.service';
import { isNotNilOrBlank } from '@app/shared/functions';
import { SupportedFormat } from '@capacitor-community/barcode-scanner/dist/esm/definitions';
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  standalone: true,
  imports: [AppSharedModule],
})
export class ScanComponent implements OnInit, OnDestroy {
  private squareElement: HTMLElement;
  private subscription: Subscription;

  constructor(
    private navController: NavController,
    private context: ContextService
  ) {
    this.squareElement = document.createElement('div');
    this.squareElement.classList.add('barcode-scanner-square');
  }

  ngOnInit() {
    this.startScan();
  }

  ngOnDestroy() {
    this.stopScan();
  }

  async startScan(opts?: { timeout?: number; targetedFormats?: SupportedFormat[]; permission?: { allowIfNeverAsk?: boolean } }) {
    if (this.subscription) return;

    // Reset context, and start a new subscription
    this.context.qrcode = null;
    this.subscription = new Subscription();

    try {
      // Check camera permission
      const granted = await this.checkScanPermission(opts?.permission);
      if (!granted) return null;

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      console.debug('[scan] Hiding background');
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('barcode-scanner-active');
      document.querySelector('body').appendChild(this.squareElement);

      this.subscription.add(() => {
        console.debug('[scan] Restoring background');
        document.querySelector('body').classList.remove('barcode-scanner-active');
        document.querySelector('body').removeChild(this.squareElement);

        BarcodeScanner.showBackground();
      });

      if (opts?.timeout) {
        setTimeout(() => this.stopScan(), opts.timeout);
      }

      console.info('[scan] Start scanning...');
      const result = await BarcodeScanner.startScan({ targetedFormats: opts?.targetedFormats || [SupportedFormat.QR_CODE] });

      this.subscription.unsubscribe();

      // Close
      return this.close(result?.hasContent ? result.content : undefined);
    } catch (err) {
      console.error('[scan] Failed to scan: ' + (err?.message || ''), err);
      return this.close();
    }
  }

  stopScan() {
    if (!this.subscription) return; // Already stopped
    this.subscription.unsubscribe();
    this.subscription = null;
    return BarcodeScanner.stopScan({ resolveScan: true });
  }

  async checkScanPermission(opts?: { allowIfNeverAsk?: boolean }): Promise<boolean> {
    // Check camera permission
    console.info('[scan] Checking permission...');
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (permission.denied || permission.restricted) {
      console.error('[scan] Permission not granted', permission);
      return false;
    }
    if (!permission.granted) {
      if (permission.neverAsked && opts?.allowIfNeverAsk) {
        return true;
      }
      console.error('[scan] Permission not granted', permission);
      return false;
    }

    return true;
  }

  async close(result?: string) {
    // Store result to context
    if (isNotNilOrBlank(result)) {
      console.info('[scan] Scan result: ' + result);
      this.context.qrcode = result;
    }

    // Try to go back
    const done = await this.navController.pop();
    if (!done) {
      return this.navController.navigateBack('/home', {
        queryParams: {
          uri: result,
        },
      });
    }
  }
}
