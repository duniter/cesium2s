import { equals, isNilOrBlank } from '@app/shared/functions';
import { Account } from '@app/account/account.model';
import { CertFragment } from '@app/network/indexer-types.generated';
import { IdentityConverter } from '@app/account/account.converter';

export interface Certification {
  id: string;
  issuer: Account;
  receiver: Account;

  createdOn: number;
}

export class CertificationConverter {
  static toCertifications(inputs: CertFragment[], debug?: boolean) {
    const results = (inputs || []).map(CertificationConverter.toCertification);
    if (debug) console.debug('Results:', results);
    return results;
  }

  static toCertification(input: CertFragment) {
    return <Certification>{
      id: input.id,
      issuer: IdentityConverter.toAccount(input.issuer),
      receiver: IdentityConverter.toAccount(input.receiver),
      createdOn: input.createdOn,
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
