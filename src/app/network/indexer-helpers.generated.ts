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
export type CertKeySpecifier = ('certHistory' | 'createdOn' | 'expireOn' | 'id' | 'isActive' | 'issuer' | 'receiver' | CertKeySpecifier)[];
export type CertFieldPolicy = {
  certHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isActive?: FieldPolicy<any> | FieldReadFunction<any>;
  issuer?: FieldPolicy<any> | FieldReadFunction<any>;
  receiver?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertEdgeKeySpecifier = ('cursor' | 'node' | CertEdgeKeySpecifier)[];
export type CertEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertEventKeySpecifier = ('blockNumber' | 'cert' | 'event' | 'eventType' | 'id' | CertEventKeySpecifier)[];
export type CertEventFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  cert?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertEventEdgeKeySpecifier = ('cursor' | 'node' | CertEventEdgeKeySpecifier)[];
export type CertEventEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CertEventsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CertEventsConnectionKeySpecifier)[];
export type CertEventsConnectionFieldPolicy = {
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
  | 'createdIn'
  | 'createdOn'
  | 'expireOn'
  | 'id'
  | 'index'
  | 'isMember'
  | 'lastChangeOn'
  | 'linkedAccount'
  | 'membershipHistory'
  | 'name'
  | 'ownerKeyChange'
  | 'smithCertIssued'
  | 'smithCertReceived'
  | 'smithStatus'
  | 'status'
  | 'udHistory'
  | IdentityKeySpecifier
)[];
export type IdentityFieldPolicy = {
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  certIssued?: FieldPolicy<any> | FieldReadFunction<any>;
  certReceived?: FieldPolicy<any> | FieldReadFunction<any>;
  createdIn?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  expireOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  index?: FieldPolicy<any> | FieldReadFunction<any>;
  isMember?: FieldPolicy<any> | FieldReadFunction<any>;
  lastChangeOn?: FieldPolicy<any> | FieldReadFunction<any>;
  linkedAccount?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerKeyChange?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertIssued?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertReceived?: FieldPolicy<any> | FieldReadFunction<any>;
  smithStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistory?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type MembershipEventKeySpecifier = ('blockNumber' | 'event' | 'eventType' | 'id' | 'identity' | MembershipEventKeySpecifier)[];
export type MembershipEventFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MembershipEventEdgeKeySpecifier = ('cursor' | 'node' | MembershipEventEdgeKeySpecifier)[];
export type MembershipEventEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MembershipEventsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | MembershipEventsConnectionKeySpecifier)[];
export type MembershipEventsConnectionFieldPolicy = {
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
  | 'certEventById'
  | 'certEventByUniqueInput'
  | 'certEvents'
  | 'certEventsConnection'
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
  | 'galuel'
  | 'identities'
  | 'identitiesConnection'
  | 'identityById'
  | 'identityByUniqueInput'
  | 'itemsCounterById'
  | 'itemsCounterByUniqueInput'
  | 'itemsCounters'
  | 'itemsCountersConnection'
  | 'membershipEventById'
  | 'membershipEventByUniqueInput'
  | 'membershipEvents'
  | 'membershipEventsConnection'
  | 'smithCertById'
  | 'smithCertByUniqueInput'
  | 'smithCerts'
  | 'smithCertsConnection'
  | 'squidStatus'
  | 'transferById'
  | 'transferByUniqueInput'
  | 'transfers'
  | 'transfersConnection'
  | 'udHistories'
  | 'udHistoriesConnection'
  | 'udHistoryById'
  | 'udHistoryByUniqueInput'
  | 'udReevalById'
  | 'udReevalByUniqueInput'
  | 'udReevals'
  | 'udReevalsConnection'
  | 'universalDividendById'
  | 'universalDividendByUniqueInput'
  | 'universalDividends'
  | 'universalDividendsConnection'
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
  certEventById?: FieldPolicy<any> | FieldReadFunction<any>;
  certEventByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  certEvents?: FieldPolicy<any> | FieldReadFunction<any>;
  certEventsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
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
  galuel?: FieldPolicy<any> | FieldReadFunction<any>;
  identities?: FieldPolicy<any> | FieldReadFunction<any>;
  identitiesConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  identityById?: FieldPolicy<any> | FieldReadFunction<any>;
  identityByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounterById?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounterByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounters?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCountersConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEventById?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEventByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEvents?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEventsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCerts?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  squidStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  transferById?: FieldPolicy<any> | FieldReadFunction<any>;
  transferByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  transfers?: FieldPolicy<any> | FieldReadFunction<any>;
  transfersConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistories?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistoriesConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistoryById?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistoryByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevalById?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevalByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevals?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevalsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividendById?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividendByUniqueInput?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividends?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividendsConnection?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertKeySpecifier = ('createdOn' | 'id' | 'issuer' | 'receiver' | SmithCertKeySpecifier)[];
export type SmithCertFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issuer?: FieldPolicy<any> | FieldReadFunction<any>;
  receiver?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertEdgeKeySpecifier = ('cursor' | 'node' | SmithCertEdgeKeySpecifier)[];
export type SmithCertEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SmithCertsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SmithCertsConnectionKeySpecifier)[];
export type SmithCertsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SquidStatusKeySpecifier = ('height' | SquidStatusKeySpecifier)[];
export type SquidStatusFieldPolicy = {
  height?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = (
  | 'accountById'
  | 'accounts'
  | 'blockById'
  | 'blocks'
  | 'callById'
  | 'calls'
  | 'certById'
  | 'certEventById'
  | 'certEvents'
  | 'certs'
  | 'changeOwnerKeyById'
  | 'changeOwnerKeys'
  | 'eventById'
  | 'events'
  | 'extrinsicById'
  | 'extrinsics'
  | 'identities'
  | 'identityById'
  | 'itemsCounterById'
  | 'itemsCounters'
  | 'membershipEventById'
  | 'membershipEvents'
  | 'smithCertById'
  | 'smithCerts'
  | 'transferById'
  | 'transfers'
  | 'udHistories'
  | 'udHistoryById'
  | 'udReevalById'
  | 'udReevals'
  | 'universalDividendById'
  | 'universalDividends'
  | SubscriptionKeySpecifier
)[];
export type SubscriptionFieldPolicy = {
  accountById?: FieldPolicy<any> | FieldReadFunction<any>;
  accounts?: FieldPolicy<any> | FieldReadFunction<any>;
  blockById?: FieldPolicy<any> | FieldReadFunction<any>;
  blocks?: FieldPolicy<any> | FieldReadFunction<any>;
  callById?: FieldPolicy<any> | FieldReadFunction<any>;
  calls?: FieldPolicy<any> | FieldReadFunction<any>;
  certById?: FieldPolicy<any> | FieldReadFunction<any>;
  certEventById?: FieldPolicy<any> | FieldReadFunction<any>;
  certEvents?: FieldPolicy<any> | FieldReadFunction<any>;
  certs?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeyById?: FieldPolicy<any> | FieldReadFunction<any>;
  changeOwnerKeys?: FieldPolicy<any> | FieldReadFunction<any>;
  eventById?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsicById?: FieldPolicy<any> | FieldReadFunction<any>;
  extrinsics?: FieldPolicy<any> | FieldReadFunction<any>;
  identities?: FieldPolicy<any> | FieldReadFunction<any>;
  identityById?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounterById?: FieldPolicy<any> | FieldReadFunction<any>;
  itemsCounters?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEventById?: FieldPolicy<any> | FieldReadFunction<any>;
  membershipEvents?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCertById?: FieldPolicy<any> | FieldReadFunction<any>;
  smithCerts?: FieldPolicy<any> | FieldReadFunction<any>;
  transferById?: FieldPolicy<any> | FieldReadFunction<any>;
  transfers?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistories?: FieldPolicy<any> | FieldReadFunction<any>;
  udHistoryById?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevalById?: FieldPolicy<any> | FieldReadFunction<any>;
  udReevals?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividendById?: FieldPolicy<any> | FieldReadFunction<any>;
  universalDividends?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type UDHistoriesConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | UDHistoriesConnectionKeySpecifier)[];
export type UDHistoriesConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UDHistoryKeySpecifier = ('amount' | 'blockNumber' | 'event' | 'id' | 'identity' | 'timestamp' | UDHistoryKeySpecifier)[];
export type UDHistoryFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UDHistoryEdgeKeySpecifier = ('cursor' | 'node' | UDHistoryEdgeKeySpecifier)[];
export type UDHistoryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UDReevalKeySpecifier = (
  | 'blockNumber'
  | 'event'
  | 'id'
  | 'membersCount'
  | 'monetaryMass'
  | 'newUdAmount'
  | 'timestamp'
  | UDReevalKeySpecifier
)[];
export type UDReevalFieldPolicy = {
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  membersCount?: FieldPolicy<any> | FieldReadFunction<any>;
  monetaryMass?: FieldPolicy<any> | FieldReadFunction<any>;
  newUdAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UDReevalEdgeKeySpecifier = ('cursor' | 'node' | UDReevalEdgeKeySpecifier)[];
export type UDReevalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UDReevalsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | UDReevalsConnectionKeySpecifier)[];
export type UDReevalsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversalDividendKeySpecifier = (
  | 'amount'
  | 'blockNumber'
  | 'event'
  | 'id'
  | 'membersCount'
  | 'monetaryMass'
  | 'timestamp'
  | UniversalDividendKeySpecifier
)[];
export type UniversalDividendFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  blockNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  membersCount?: FieldPolicy<any> | FieldReadFunction<any>;
  monetaryMass?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversalDividendEdgeKeySpecifier = ('cursor' | 'node' | UniversalDividendEdgeKeySpecifier)[];
export type UniversalDividendEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversalDividendsConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | UniversalDividendsConnectionKeySpecifier)[];
export type UniversalDividendsConnectionFieldPolicy = {
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
  CertEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertEdgeKeySpecifier | (() => undefined | CertEdgeKeySpecifier);
    fields?: CertEdgeFieldPolicy;
  };
  CertEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertEventKeySpecifier | (() => undefined | CertEventKeySpecifier);
    fields?: CertEventFieldPolicy;
  };
  CertEventEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertEventEdgeKeySpecifier | (() => undefined | CertEventEdgeKeySpecifier);
    fields?: CertEventEdgeFieldPolicy;
  };
  CertEventsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CertEventsConnectionKeySpecifier | (() => undefined | CertEventsConnectionKeySpecifier);
    fields?: CertEventsConnectionFieldPolicy;
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
  MembershipEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipEventKeySpecifier | (() => undefined | MembershipEventKeySpecifier);
    fields?: MembershipEventFieldPolicy;
  };
  MembershipEventEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipEventEdgeKeySpecifier | (() => undefined | MembershipEventEdgeKeySpecifier);
    fields?: MembershipEventEdgeFieldPolicy;
  };
  MembershipEventsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MembershipEventsConnectionKeySpecifier | (() => undefined | MembershipEventsConnectionKeySpecifier);
    fields?: MembershipEventsConnectionFieldPolicy;
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
  SmithCertEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertEdgeKeySpecifier | (() => undefined | SmithCertEdgeKeySpecifier);
    fields?: SmithCertEdgeFieldPolicy;
  };
  SmithCertsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SmithCertsConnectionKeySpecifier | (() => undefined | SmithCertsConnectionKeySpecifier);
    fields?: SmithCertsConnectionFieldPolicy;
  };
  SquidStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SquidStatusKeySpecifier | (() => undefined | SquidStatusKeySpecifier);
    fields?: SquidStatusFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
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
  UDHistoriesConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDHistoriesConnectionKeySpecifier | (() => undefined | UDHistoriesConnectionKeySpecifier);
    fields?: UDHistoriesConnectionFieldPolicy;
  };
  UDHistory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDHistoryKeySpecifier | (() => undefined | UDHistoryKeySpecifier);
    fields?: UDHistoryFieldPolicy;
  };
  UDHistoryEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDHistoryEdgeKeySpecifier | (() => undefined | UDHistoryEdgeKeySpecifier);
    fields?: UDHistoryEdgeFieldPolicy;
  };
  UDReeval?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDReevalKeySpecifier | (() => undefined | UDReevalKeySpecifier);
    fields?: UDReevalFieldPolicy;
  };
  UDReevalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDReevalEdgeKeySpecifier | (() => undefined | UDReevalEdgeKeySpecifier);
    fields?: UDReevalEdgeFieldPolicy;
  };
  UDReevalsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UDReevalsConnectionKeySpecifier | (() => undefined | UDReevalsConnectionKeySpecifier);
    fields?: UDReevalsConnectionFieldPolicy;
  };
  UniversalDividend?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UniversalDividendKeySpecifier | (() => undefined | UniversalDividendKeySpecifier);
    fields?: UniversalDividendFieldPolicy;
  };
  UniversalDividendEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UniversalDividendEdgeKeySpecifier | (() => undefined | UniversalDividendEdgeKeySpecifier);
    fields?: UniversalDividendEdgeFieldPolicy;
  };
  UniversalDividendsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UniversalDividendsConnectionKeySpecifier | (() => undefined | UniversalDividendsConnectionKeySpecifier);
    fields?: UniversalDividendsConnectionFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
