import { equals, isNilOrBlank } from '@app/shared/functions';
import { Account } from '@app/account/account.model';
import { CertFragment } from '@app/network/indexer-types.generated';
import { IdentityConverter } from '@app/account/account.converter';

export interface Certification {
  id: string;

  account: Account;

  createdOn: number;
  expireOn: number;
  creationBlockNumbers: number[];
  renewalBlockNumbers: number[];
  removalsBlockNumbers: number[];
}

export class CertificationConverter {
  static toCertifications(inputs: CertFragment[], isIssuer: boolean, debug?: boolean) {
    const results = (inputs || []).map((input) => CertificationConverter.toCertification(input, isIssuer));
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toCertification(input: CertFragment, isIssuer: boolean) {
    const address = isIssuer ? input.issuer : input.receiver;
    return <Certification>{
      id: input.id,
      account: IdentityConverter.toAccount(address),
      createdOn: input.createdOn,
      expireOn: input.expireOn,
    };
  }
}

export interface CertificationSearchFilter {
  issuer?: string;
  receiver?: string;
}

export class CertificationSearchFilterUtils {
  static isEquals(f1: CertificationSearchFilter, f2: CertificationSearchFilter) {
    return f1 === f2 || equals(f1, f2);
  }

  static isEmpty(filter: CertificationSearchFilter) {
    return !filter || (isNilOrBlank(filter.issuer) && isNilOrBlank(filter.receiver));
  }
}
