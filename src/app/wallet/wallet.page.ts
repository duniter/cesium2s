import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  public walletId: string;

  constructor(
    public  wallet: AccountService,
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
