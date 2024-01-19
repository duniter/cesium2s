import { equals, isNilOrBlank } from '@app/shared/functions';
import { Account } from '@app/account/account.model';
import { Moment } from 'moment';
import { CertFragment } from '@app/network/indexer-types.generated';

export interface Certification {
  id: string;
  issuer: Account;
  receiver: Account;

  createdOn: number;

  // TODO
  timestamp?: Moment;
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
      issuer: <Account>{
        address: input.issuer?.id,
        meta: {
          uid: input.issuer?.name,
        },
      },
      receiver: <Account>{
        address: input.receiver?.id,
        meta: {
          uid: input.receiver?.name,
        },
      },
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
