import { StrictTypedTypePolicies } from './indexer-helpers.generated';

export const INDEXER_GRAPHQL_TYPE_POLICIES = <StrictTypedTypePolicies>{
  Account: {
    keyFields: ['id'],
  },
  Transfer: {
    keyFields: ['id'],
  },
};
