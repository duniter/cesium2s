import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WalletService} from "../services/wallet.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  public walletId: string;

  constructor(
    public  wallet: WalletService,
    private activatedRoute: ActivatedRoute
  ) {

    this.load();
  }

  ngOnInit() {
    this.walletId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async load() {
    await this.wallet.ready();


  }

}
