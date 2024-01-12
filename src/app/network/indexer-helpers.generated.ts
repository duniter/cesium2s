// Auto-generated via `npx graphql-codegen`, do not edit
/* eslint-disable */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountKeySpecifier = (
  | 'id'
  | 'identity'
  | 'linkedIdentity'
  | 'transfersIssued'
  | 'transfersReceived'
  | 'wasIdentity'
  | AccountKeySpecifier
)[];
export type AccountFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  linkedIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  transfersIssued?: FieldPolicy<any> | FieldReadFunction<any>;
  transfersReceived?: FieldPolicy<any> | FieldReadFunction<any>;
  wasIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AccountEdgeKeySpecifier = ('cursor' | 'node' | AccountEdgeKeySpecifier)[];
export type AccountEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AccountsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | AccountsConnectionKeySpecifier)[];
export type AccountsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlockKeySpecifier = (
  | 'calls'
  | 'callsCount'
  | 'events'
  | 'eventsCount'
  | 'extrinsics'
  | 'extrinsicsCount'
  | 'extrinsicsicRoot'
  | 'hash'
  | 'height'
  | 'id'
  | 'implName'
  | 'implVersion'
  | 'parentHash'
  | 'specName'
  | 'specVersion'
  | 'stateRoot'
  | 'timestamp'
  | 'validator'
  | BlockKeySpecifier
)[];
export type BlockFieldPolicy = {
  calls?: FieldPolicy<any> | FieldReadFunction<any>;
  callsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  eventsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsics?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicsicRoot?: FieldPolicy<any> | FieldReadFunction<any>;
  hash?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  implName?: FieldPolicy<any> | FieldReadFunction<any>;
  implVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  parentHash?: FieldPolicy<any> | FieldReadFunction<any>;
  specName?: FieldPolicy<any> | FieldReadFunction<any>;
  specVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  stateRoot?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  validator?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlockEdgeKeySpecifier = ('cursor' | 'node' | BlockEdgeKeySpecifier)[];
export type BlockEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BlocksConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | BlocksConnectionKeySpecifier)[];
export type BlocksConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CallKeySpecifier = (
  | 'address'
  | 'args'
  | 'argsStr'
  | 'block'
  | 'error'
  | 'events'
  | 'extrinsic'
  | 'id'
  | 'name'
  | 'pallet'
  | 'parent'
  | 'subcalls'
  | 'success'
  | CallKeySpecifier
)[];
export type CallFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  args?: FieldPolicy<any> | FieldReadFunction<any>;
  argsStr?: FieldPolicy<any> | FieldReadFunction<any>;
  block?: FieldPolicy<any> | FieldReadFunction<any>;
  error?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsic?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  pallet?: FieldPolicy<any> | FieldReadFunction<any>;
  parent?: FieldPolicy<any> | FieldReadFunction<any>;
  subcalls?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CallEdgeKeySpecifier = ('cursor' | 'node' | CallEdgeKeySpecifier)[];
export type CallEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CallsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CallsConnectionKeySpecifier)[];
export type CallsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertKeySpecifier = (
  | 'active'
  | 'createdOn'
  | 'creation'
  | 'expireOn'
  | 'id'
  | 'issuer'
  | 'receiver'
  | 'removal'
  | 'renewal'
  | CertKeySpecifier
)[];
export type CertFieldPolicy = {
  active?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  creation?: FieldPolicy<any> | FieldReadFunction<any>;
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issuer?: FieldPolicy<any> | FieldReadFunction<any>;
  receiver?: FieldPolicy<any> | FieldReadFunction<any>;
  removal?: FieldPolicy<any> | FieldReadFunction<any>;
  renewal?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertCreationKeySpecifier = ('blockNumber' | 'cert' | 'id' | CertCreationKeySpecifier)[];
export type CertCreationFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertCreationEdgeKeySpecifier = ('cursor' | 'node' | CertCreationEdgeKeySpecifier)[];
export type CertCreationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertCreationsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CertCreationsConnectionKeySpecifier)[];
export type CertCreationsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertEdgeKeySpecifier = ('cursor' | 'node' | CertEdgeKeySpecifier)[];
export type CertEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRemovalKeySpecifier = ('blockNumber' | 'cert' | 'id' | CertRemovalKeySpecifier)[];
export type CertRemovalFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRemovalEdgeKeySpecifier = ('cursor' | 'node' | CertRemovalEdgeKeySpecifier)[];
export type CertRemovalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRemovalsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CertRemovalsConnectionKeySpecifier)[];
export type CertRemovalsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRenewalKeySpecifier = ('blockNumber' | 'cert' | 'id' | CertRenewalKeySpecifier)[];
export type CertRenewalFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRenewalEdgeKeySpecifier = ('cursor' | 'node' | CertRenewalEdgeKeySpecifier)[];
export type CertRenewalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertRenewalsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CertRenewalsConnectionKeySpecifier)[];
export type CertRenewalsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CertsConnectionKeySpecifier)[];
export type CertsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ChangeOwnerKeyKeySpecifier = ('blockNumber' | 'id' | 'identity' | 'next' | 'previous' | ChangeOwnerKeyKeySpecifier)[];
export type ChangeOwnerKeyFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  next?: FieldPolicy<any> | FieldReadFunction<any>;
  previous?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ChangeOwnerKeyEdgeKeySpecifier = ('cursor' | 'node' | ChangeOwnerKeyEdgeKeySpecifier)[];
export type ChangeOwnerKeyEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ChangeOwnerKeysConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | ChangeOwnerKeysConnectionKeySpecifier)[];
export type ChangeOwnerKeysConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EventKeySpecifier = (
  | 'args'
  | 'argsStr'
  | 'block'
  | 'call'
  | 'extrinsic'
  | 'id'
  | 'index'
  | 'name'
  | 'pallet'
  | 'phase'
  | EventKeySpecifier
)[];
export type EventFieldPolicy = {
  args?: FieldPolicy<any> | FieldReadFunction<any>;
  argsStr?: FieldPolicy<any> | FieldReadFunction<any>;
  block?: FieldPolicy<any> | FieldReadFunction<any>;
  call?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsic?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  index?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  pallet?: FieldPolicy<any> | FieldReadFunction<any>;
  phase?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EventEdgeKeySpecifier = ('cursor' | 'node' | EventEdgeKeySpecifier)[];
export type EventEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EventsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | EventsConnectionKeySpecifier)[];
export type EventsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtrinsicKeySpecifier = (
  | 'block'
  | 'call'
  | 'calls'
  | 'error'
  | 'events'
  | 'fee'
  | 'hash'
  | 'id'
  | 'index'
  | 'signature'
  | 'success'
  | 'tip'
  | 'version'
  | ExtrinsicKeySpecifier
)[];
export type ExtrinsicFieldPolicy = {
  block?: FieldPolicy<any> | FieldReadFunction<any>;
  call?: FieldPolicy<any> | FieldReadFunction<any>;
  calls?: FieldPolicy<any> | FieldReadFunction<any>;
  error?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  fee?: FieldPolicy<any> | FieldReadFunction<any>;
  hash?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  index?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  tip?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtrinsicEdgeKeySpecifier = ('cursor' | 'node' | ExtrinsicEdgeKeySpecifier)[];
export type ExtrinsicEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtrinsicSignatureKeySpecifier = ('address' | 'signature' | 'signedExtensions' | ExtrinsicSignatureKeySpecifier)[];
export type ExtrinsicSignatureFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  signedExtensions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtrinsicsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | ExtrinsicsConnectionKeySpecifier)[];
export type ExtrinsicsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentitiesConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | IdentitiesConnectionKeySpecifier)[];
export type IdentitiesConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentityKeySpecifier = (
  | 'account'
  | 'certIssued'
  | 'certReceived'
  | 'id'
  | 'index'
  | 'linkedAccount'
  | 'membership'
  | 'name'
  | 'ownerKeyChange'
  | 'smithCertIssued'
  | 'smithCertReceived'
  | 'smithMembership'
  | IdentityKeySpecifier
)[];
export type IdentityFieldPolicy = {
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  certIssued?: FieldPolicy<any> | FieldReadFunction<any>;
  certReceived?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  index?: FieldPolicy<any> | FieldReadFunction<any>;
  linkedAccount?: FieldPolicy<any> | FieldReadFunction<any>;
  membership?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerKeyChange?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertIssued?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertReceived?: FieldPolicy<any> | FieldReadFunction<any>;
  smithMembership?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentityEdgeKeySpecifier = ('cursor' | 'node' | IdentityEdgeKeySpecifier)[];
export type IdentityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ItemsCounterKeySpecifier = ('id' | 'level' | 'total' | 'type' | ItemsCounterKeySpecifier)[];
export type ItemsCounterFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ItemsCounterEdgeKeySpecifier = ('cursor' | 'node' | ItemsCounterEdgeKeySpecifier)[];
export type ItemsCounterEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ItemsCountersConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | ItemsCountersConnectionKeySpecifier)[];
export type ItemsCountersConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MembershipKeySpecifier = ('expireOn' | 'id' | 'identity' | MembershipKeySpecifier)[];
export type MembershipFieldPolicy = {
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MembershipEdgeKeySpecifier = ('cursor' | 'node' | MembershipEdgeKeySpecifier)[];
export type MembershipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MembershipsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | MembershipsConnectionKeySpecifier)[];
export type MembershipsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'accountById'
  | 'accountByUniqueInput'
  | 'accounts'
  | 'accountsConnection'
  | 'blockById'
  | 'blockByUniqueInput'
  | 'blocks'
  | 'blocksConnection'
  | 'callById'
  | 'callByUniqueInput'
  | 'calls'
  | 'callsConnection'
  | 'certById'
  | 'certByUniqueInput'
  | 'certCreationById'
  | 'certCreationByUniqueInput'
  | 'certCreations'
  | 'certCreationsConnection'
  | 'certRemovalById'
  | 'certRemovalByUniqueInput'
  | 'certRemovals'
  | 'certRemovalsConnection'
  | 'certRenewalById'
  | 'certRenewalByUniqueInput'
  | 'certRenewals'
  | 'certRenewalsConnection'
  | 'certs'
  | 'certsConnection'
  | 'changeOwnerKeyById'
  | 'changeOwnerKeyByUniqueInput'
  | 'changeOwnerKeys'
  | 'changeOwnerKeysConnection'
  | 'eventById'
  | 'eventByUniqueInput'
  | 'events'
  | 'eventsConnection'
  | 'extrinsicById'
  | 'extrinsicByUniqueInput'
  | 'extrinsics'
  | 'extrinsicsConnection'
  | 'identities'
  | 'identitiesConnection'
  | 'identityById'
  | 'identityByUniqueInput'
  | 'itemsCounterById'
  | 'itemsCounterByUniqueInput'
  | 'itemsCounters'
  | 'itemsCountersConnection'
  | 'membershipById'
  | 'membershipByUniqueInput'
  | 'memberships'
  | 'membershipsConnection'
  | 'smithCertById'
  | 'smithCertByUniqueInput'
  | 'smithCertCreationById'
  | 'smithCertCreationByUniqueInput'
  | 'smithCertCreations'
  | 'smithCertCreationsConnection'
  | 'smithCertRemovalById'
  | 'smithCertRemovalByUniqueInput'
  | 'smithCertRemovals'
  | 'smithCertRemovalsConnection'
  | 'smithCertRenewalById'
  | 'smithCertRenewalByUniqueInput'
  | 'smithCertRenewals'
  | 'smithCertRenewalsConnection'
  | 'smithCerts'
  | 'smithCertsConnection'
  | 'smithMembershipById'
  | 'smithMembershipByUniqueInput'
  | 'smithMemberships'
  | 'smithMembershipsConnection'
  | 'squidStatus'
  | 'transferById'
  | 'transferByUniqueInput'
  | 'transfers'
  | 'transfersConnection'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  accountById?: FieldPolicy<any> | FieldReadFunction<any>;
  accountByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  accounts?: FieldPolicy<any> | FieldReadFunction<any>;
  accountsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  blockById?: FieldPolicy<any> | FieldReadFunction<any>;
  blockByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  blocks?: FieldPolicy<any> | FieldReadFunction<any>;
  blocksConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  callById?: FieldPolicy<any> | FieldReadFunction<any>;
  callByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  calls?: FieldPolicy<any> | FieldReadFunction<any>;
  callsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  certById?: FieldPolicy<any> | FieldReadFunction<any>;
  certByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  certCreationById?: FieldPolicy<any> | FieldReadFunction<any>;
  certCreationByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  certCreations?: FieldPolicy<any> | FieldReadFunction<any>;
  certCreationsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  certRemovalById?: FieldPolicy<any> | FieldReadFunction<any>;
  certRemovalByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  certRemovals?: FieldPolicy<any> | FieldReadFunction<any>;
  certRemovalsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  certRenewalById?: FieldPolicy<any> | FieldReadFunction<any>;
  certRenewalByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  certRenewals?: FieldPolicy<any> | FieldReadFunction<any>;
  certRenewalsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  certs?: FieldPolicy<any> | FieldReadFunction<any>;
  certsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeyById?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeyByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeys?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeysConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  eventById?: FieldPolicy<any> | FieldReadFunction<any>;
  eventByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  eventsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicById?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsics?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  identities?: FieldPolicy<any> | FieldReadFunction<any>;
  identitiesConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  identityById?: FieldPolicy<any> | FieldReadFunction<any>;
  identityByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounterById?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounterByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounters?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCountersConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipById?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  memberships?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertCreationById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertCreationByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertCreations?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertCreationsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRemovalById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRemovalByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRemovals?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRemovalsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRenewalById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRenewalByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRenewals?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertRenewalsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCerts?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithMembershipById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithMembershipByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithMemberships?: FieldPolicy<any> | FieldReadFunction<any>;
  smithMembershipsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  squidStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  transferById?: FieldPolicy<any> | FieldReadFunction<any>;
  transferByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  transfers?: FieldPolicy<any> | FieldReadFunction<any>;
  transfersConnection?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertKeySpecifier = (
  | 'active'
  | 'createdOn'
  | 'creation'
  | 'expireOn'
  | 'id'
  | 'issuer'
  | 'receiver'
  | 'removal'
  | 'renewal'
  | SmithCertKeySpecifier
)[];
export type SmithCertFieldPolicy = {
  active?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  creation?: FieldPolicy<any> | FieldReadFunction<any>;
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issuer?: FieldPolicy<any> | FieldReadFunction<any>;
  receiver?: FieldPolicy<any> | FieldReadFunction<any>;
  removal?: FieldPolicy<any> | FieldReadFunction<any>;
  renewal?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertCreationKeySpecifier = ('blockNumber' | 'cert' | 'id' | SmithCertCreationKeySpecifier)[];
export type SmithCertCreationFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertCreationEdgeKeySpecifier = ('cursor' | 'node' | SmithCertCreationEdgeKeySpecifier)[];
export type SmithCertCreationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertCreationsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithCertCreationsConnectionKeySpecifier)[];
export type SmithCertCreationsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertEdgeKeySpecifier = ('cursor' | 'node' | SmithCertEdgeKeySpecifier)[];
export type SmithCertEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRemovalKeySpecifier = ('blockNumber' | 'cert' | 'id' | SmithCertRemovalKeySpecifier)[];
export type SmithCertRemovalFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRemovalEdgeKeySpecifier = ('cursor' | 'node' | SmithCertRemovalEdgeKeySpecifier)[];
export type SmithCertRemovalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRemovalsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithCertRemovalsConnectionKeySpecifier)[];
export type SmithCertRemovalsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRenewalKeySpecifier = ('blockNumber' | 'cert' | 'id' | SmithCertRenewalKeySpecifier)[];
export type SmithCertRenewalFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRenewalEdgeKeySpecifier = ('cursor' | 'node' | SmithCertRenewalEdgeKeySpecifier)[];
export type SmithCertRenewalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertRenewalsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithCertRenewalsConnectionKeySpecifier)[];
export type SmithCertRenewalsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithCertsConnectionKeySpecifier)[];
export type SmithCertsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithMembershipKeySpecifier = ('expireOn' | 'id' | 'identity' | SmithMembershipKeySpecifier)[];
export type SmithMembershipFieldPolicy = {
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithMembershipEdgeKeySpecifier = ('cursor' | 'node' | SmithMembershipEdgeKeySpecifier)[];
export type SmithMembershipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithMembershipsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithMembershipsConnectionKeySpecifier)[];
export type SmithMembershipsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SquidStatusKeySpecifier = ('height' | SquidStatusKeySpecifier)[];
export type SquidStatusFieldPolicy = {
  height?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransferKeySpecifier = ('amount' | 'blockNumber' | 'comment' | 'from' | 'id' | 'timestamp' | 'to' | TransferKeySpecifier)[];
export type TransferFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  comment?: FieldPolicy<any> | FieldReadFunction<any>;
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  to?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransferEdgeKeySpecifier = ('cursor' | 'node' | TransferEdgeKeySpecifier)[];
export type TransferEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransfersConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | TransfersConnectionKeySpecifier)[];
export type TransfersConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Account?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier);
    fields?: AccountFieldPolicy;
  };
  AccountEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AccountEdgeKeySpecifier | (() => undefined | AccountEdgeKeySpecifier);
    fields?: AccountEdgeFieldPolicy;
  };
  AccountsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AccountsConnectionKeySpecifier | (() => undefined | AccountsConnectionKeySpecifier);
    fields?: AccountsConnectionFieldPolicy;
  };
  Block?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlockKeySpecifier | (() => undefined | BlockKeySpecifier);
    fields?: BlockFieldPolicy;
  };
  BlockEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlockEdgeKeySpecifier | (() => undefined | BlockEdgeKeySpecifier);
    fields?: BlockEdgeFieldPolicy;
  };
  BlocksConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | BlocksConnectionKeySpecifier | (() => undefined | BlocksConnectionKeySpecifier);
    fields?: BlocksConnectionFieldPolicy;
  };
  Call?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CallKeySpecifier | (() => undefined | CallKeySpecifier);
    fields?: CallFieldPolicy;
  };
  CallEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CallEdgeKeySpecifier | (() => undefined | CallEdgeKeySpecifier);
    fields?: CallEdgeFieldPolicy;
  };
  CallsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CallsConnectionKeySpecifier | (() => undefined | CallsConnectionKeySpecifier);
    fields?: CallsConnectionFieldPolicy;
  };
  Cert?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertKeySpecifier | (() => undefined | CertKeySpecifier);
    fields?: CertFieldPolicy;
  };
  CertCreation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertCreationKeySpecifier | (() => undefined | CertCreationKeySpecifier);
    fields?: CertCreationFieldPolicy;
  };
  CertCreationEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertCreationEdgeKeySpecifier | (() => undefined | CertCreationEdgeKeySpecifier);
    fields?: CertCreationEdgeFieldPolicy;
  };
  CertCreationsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertCreationsConnectionKeySpecifier | (() => undefined | CertCreationsConnectionKeySpecifier);
    fields?: CertCreationsConnectionFieldPolicy;
  };
  CertEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertEdgeKeySpecifier | (() => undefined | CertEdgeKeySpecifier);
    fields?: CertEdgeFieldPolicy;
  };
  CertRemoval?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRemovalKeySpecifier | (() => undefined | CertRemovalKeySpecifier);
    fields?: CertRemovalFieldPolicy;
  };
  CertRemovalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRemovalEdgeKeySpecifier | (() => undefined | CertRemovalEdgeKeySpecifier);
    fields?: CertRemovalEdgeFieldPolicy;
  };
  CertRemovalsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRemovalsConnectionKeySpecifier | (() => undefined | CertRemovalsConnectionKeySpecifier);
    fields?: CertRemovalsConnectionFieldPolicy;
  };
  CertRenewal?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRenewalKeySpecifier | (() => undefined | CertRenewalKeySpecifier);
    fields?: CertRenewalFieldPolicy;
  };
  CertRenewalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRenewalEdgeKeySpecifier | (() => undefined | CertRenewalEdgeKeySpecifier);
    fields?: CertRenewalEdgeFieldPolicy;
  };
  CertRenewalsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertRenewalsConnectionKeySpecifier | (() => undefined | CertRenewalsConnectionKeySpecifier);
    fields?: CertRenewalsConnectionFieldPolicy;
  };
  CertsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertsConnectionKeySpecifier | (() => undefined | CertsConnectionKeySpecifier);
    fields?: CertsConnectionFieldPolicy;
  };
  ChangeOwnerKey?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ChangeOwnerKeyKeySpecifier | (() => undefined | ChangeOwnerKeyKeySpecifier);
    fields?: ChangeOwnerKeyFieldPolicy;
  };
  ChangeOwnerKeyEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ChangeOwnerKeyEdgeKeySpecifier | (() => undefined | ChangeOwnerKeyEdgeKeySpecifier);
    fields?: ChangeOwnerKeyEdgeFieldPolicy;
  };
  ChangeOwnerKeysConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ChangeOwnerKeysConnectionKeySpecifier | (() => undefined | ChangeOwnerKeysConnectionKeySpecifier);
    fields?: ChangeOwnerKeysConnectionFieldPolicy;
  };
  Event?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier);
    fields?: EventFieldPolicy;
  };
  EventEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EventEdgeKeySpecifier | (() => undefined | EventEdgeKeySpecifier);
    fields?: EventEdgeFieldPolicy;
  };
  EventsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | EventsConnectionKeySpecifier | (() => undefined | EventsConnectionKeySpecifier);
    fields?: EventsConnectionFieldPolicy;
  };
  Extrinsic?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExtrinsicKeySpecifier | (() => undefined | ExtrinsicKeySpecifier);
    fields?: ExtrinsicFieldPolicy;
  };
  ExtrinsicEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExtrinsicEdgeKeySpecifier | (() => undefined | ExtrinsicEdgeKeySpecifier);
    fields?: ExtrinsicEdgeFieldPolicy;
  };
  ExtrinsicSignature?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExtrinsicSignatureKeySpecifier | (() => undefined | ExtrinsicSignatureKeySpecifier);
    fields?: ExtrinsicSignatureFieldPolicy;
  };
  ExtrinsicsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ExtrinsicsConnectionKeySpecifier | (() => undefined | ExtrinsicsConnectionKeySpecifier);
    fields?: ExtrinsicsConnectionFieldPolicy;
  };
  IdentitiesConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | IdentitiesConnectionKeySpecifier | (() => undefined | IdentitiesConnectionKeySpecifier);
    fields?: IdentitiesConnectionFieldPolicy;
  };
  Identity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | IdentityKeySpecifier | (() => undefined | IdentityKeySpecifier);
    fields?: IdentityFieldPolicy;
  };
  IdentityEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | IdentityEdgeKeySpecifier | (() => undefined | IdentityEdgeKeySpecifier);
    fields?: IdentityEdgeFieldPolicy;
  };
  ItemsCounter?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ItemsCounterKeySpecifier | (() => undefined | ItemsCounterKeySpecifier);
    fields?: ItemsCounterFieldPolicy;
  };
  ItemsCounterEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ItemsCounterEdgeKeySpecifier | (() => undefined | ItemsCounterEdgeKeySpecifier);
    fields?: ItemsCounterEdgeFieldPolicy;
  };
  ItemsCountersConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ItemsCountersConnectionKeySpecifier | (() => undefined | ItemsCountersConnectionKeySpecifier);
    fields?: ItemsCountersConnectionFieldPolicy;
  };
  Membership?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipKeySpecifier | (() => undefined | MembershipKeySpecifier);
    fields?: MembershipFieldPolicy;
  };
  MembershipEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipEdgeKeySpecifier | (() => undefined | MembershipEdgeKeySpecifier);
    fields?: MembershipEdgeFieldPolicy;
  };
  MembershipsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipsConnectionKeySpecifier | (() => undefined | MembershipsConnectionKeySpecifier);
    fields?: MembershipsConnectionFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  SmithCert?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertKeySpecifier | (() => undefined | SmithCertKeySpecifier);
    fields?: SmithCertFieldPolicy;
  };
  SmithCertCreation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertCreationKeySpecifier | (() => undefined | SmithCertCreationKeySpecifier);
    fields?: SmithCertCreationFieldPolicy;
  };
  SmithCertCreationEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertCreationEdgeKeySpecifier | (() => undefined | SmithCertCreationEdgeKeySpecifier);
    fields?: SmithCertCreationEdgeFieldPolicy;
  };
  SmithCertCreationsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertCreationsConnectionKeySpecifier | (() => undefined | SmithCertCreationsConnectionKeySpecifier);
    fields?: SmithCertCreationsConnectionFieldPolicy;
  };
  SmithCertEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertEdgeKeySpecifier | (() => undefined | SmithCertEdgeKeySpecifier);
    fields?: SmithCertEdgeFieldPolicy;
  };
  SmithCertRemoval?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRemovalKeySpecifier | (() => undefined | SmithCertRemovalKeySpecifier);
    fields?: SmithCertRemovalFieldPolicy;
  };
  SmithCertRemovalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRemovalEdgeKeySpecifier | (() => undefined | SmithCertRemovalEdgeKeySpecifier);
    fields?: SmithCertRemovalEdgeFieldPolicy;
  };
  SmithCertRemovalsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRemovalsConnectionKeySpecifier | (() => undefined | SmithCertRemovalsConnectionKeySpecifier);
    fields?: SmithCertRemovalsConnectionFieldPolicy;
  };
  SmithCertRenewal?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRenewalKeySpecifier | (() => undefined | SmithCertRenewalKeySpecifier);
    fields?: SmithCertRenewalFieldPolicy;
  };
  SmithCertRenewalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRenewalEdgeKeySpecifier | (() => undefined | SmithCertRenewalEdgeKeySpecifier);
    fields?: SmithCertRenewalEdgeFieldPolicy;
  };
  SmithCertRenewalsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertRenewalsConnectionKeySpecifier | (() => undefined | SmithCertRenewalsConnectionKeySpecifier);
    fields?: SmithCertRenewalsConnectionFieldPolicy;
  };
  SmithCertsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertsConnectionKeySpecifier | (() => undefined | SmithCertsConnectionKeySpecifier);
    fields?: SmithCertsConnectionFieldPolicy;
  };
  SmithMembership?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithMembershipKeySpecifier | (() => undefined | SmithMembershipKeySpecifier);
    fields?: SmithMembershipFieldPolicy;
  };
  SmithMembershipEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithMembershipEdgeKeySpecifier | (() => undefined | SmithMembershipEdgeKeySpecifier);
    fields?: SmithMembershipEdgeFieldPolicy;
  };
  SmithMembershipsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithMembershipsConnectionKeySpecifier | (() => undefined | SmithMembershipsConnectionKeySpecifier);
    fields?: SmithMembershipsConnectionFieldPolicy;
  };
  SquidStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SquidStatusKeySpecifier | (() => undefined | SquidStatusKeySpecifier);
    fields?: SquidStatusFieldPolicy;
  };
  Transfer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TransferKeySpecifier | (() => undefined | TransferKeySpecifier);
    fields?: TransferFieldPolicy;
  };
  TransferEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TransferEdgeKeySpecifier | (() => undefined | TransferEdgeKeySpecifier);
    fields?: TransferEdgeFieldPolicy;
  };
  TransfersConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TransfersConnectionKeySpecifier | (() => undefined | TransfersConnectionKeySpecifier);
    fields?: TransfersConnectionFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
