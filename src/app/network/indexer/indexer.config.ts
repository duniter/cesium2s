import { StrictTypedTypePolicies } from '@duniter/indexer/apollo-helpers';

export const INDEXER_GRAPHQL_TYPE_POLICIES = <StrictTypedTypePolicies>{
  Account: {
    keyFields: ['id'],
  },
  Transfer: {
    keyFields: ['id'],
  },
};
