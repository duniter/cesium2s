import { Component, Input } from '@angular/core';
import { Account } from '@app/account/account.model';

@Component({
  selector: 'app-account-image',
  templateUrl: './account-image.component.html',
  styleUrls: ['./account-image.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountImageComponent {
  @Input() account: Account;

  constructor() {}
}
