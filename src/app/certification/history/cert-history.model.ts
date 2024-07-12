import { equals, isNilOrBlank } from '@app/shared/functions';
import { Account } from '@app/account/account.model';
import { CertConnection, CertFragment } from '@app/network/indexer/indexer-types.generated';
import { IdentityConverter } from '@app/account/account.converter';

export interface Certification {
  id: string;

  account: Account;

  createdOn: number;
  updatedOn: number;
  expireOn: number;
  creationBlockNumbers: number[];
  renewalBlockNumbers: number[];
  removalsBlockNumbers: number[];
}

export class CertificationConverter {
  static connectionToCertifications(connection: CertConnection, isIssuer: boolean, debug?: boolean) {
    const results = (connection.edges?.map((edge) => edge.node as CertFragment) || []).map((input) =>
      CertificationConverter.toCertification(input, isIssuer)
    );
    if (debug) console.debug('Results:', results);
    return results;
  }

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
      updatedOn: input.updatedOn,
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
