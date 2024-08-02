import { AsyncValidatorFn } from '@angular/forms';
import { isNotEmptyArray, isNotNilOrBlank } from '@app/shared/functions';
import { IndexerService } from '@app/network/indexer/indexer.service';
import { firstValueFrom } from 'rxjs';

export abstract class IdentityConfirmValidators {
  static availableUid(indexer: IndexerService): AsyncValidatorFn {
    return async (control) => {
      const name = control.value;
      if (isNotNilOrBlank(name) && indexer.started) {
        const { data } = await firstValueFrom(indexer.wotSearch({ uid: name }, { first: 1, fetchPolicy: 'no-cache' }));
        if (isNotEmptyArray(data)) {
          return { availableUid: true };
        }
      }
      return undefined; // No error
    };
  }

  static readonly I18N_ERROR_KEYS = {
    availableUid: 'ACCOUNT.NEW.PSEUDO_NOT_AVAILABLE',
  };
}
