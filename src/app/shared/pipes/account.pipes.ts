import {Pipe, PipeTransform} from '@angular/core';
import {NumberFormatPipe} from "@app/shared/pipes/number-format.pipe";
import {NetworkService} from "@app/network/network.service";
import {Account, AccountUtils} from "@app/wallet/account.model";
import {isNotNilOrBlank} from "@app/shared/functions";
import {AddressFormatPipe} from "@app/shared/pipes/address.pipes";

@Pipe({
  name: 'balance'
})
export class AccountBalancePipe implements PipeTransform {

  delegate = new NumberFormatPipe();

  constructor(private networkService: NetworkService) {
  }

  transform(account: Partial<Account>, opts?: Intl.NumberFormatOptions & {fixedDecimals?: number}): number | undefined {
    if (!account?.data) return undefined;
    return AccountUtils.getBalance(account);
  }
}

@Pipe({
  name: 'accountName'
})
export class AccountNamePipe implements PipeTransform {

  private addressFormatter = new AddressFormatPipe();

  transform(account: Partial<Account>): string {
    return account?.meta?.name || this.addressFormatter.transform(account?.address, true);
  }
}
