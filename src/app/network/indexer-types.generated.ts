// Auto-generated via `npx graphql-codegen`, do not edit
/* eslint-disable */
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Big number integer */
  BigInt: { input: any; output: any };
  /** Binary data encoded as a hex string always prefixed with 0x */
  Bytes: { input: any; output: any };
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any };
  /** A scalar that can represent any JSON value */
  JSON: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  /** Account address is SS58 format */
  id: Scalars['String']['output'];
  /** current account for the identity */
  identity?: Maybe<Identity>;
  /** linked to the identity */
  linkedIdentity?: Maybe<Identity>;
  transfersIssued: Array<Transfer>;
  transfersReceived: Array<Transfer>;
  /** was once account of the identity */
  wasIdentity: Array<ChangeOwnerKey>;
};

export type AccountTransfersIssuedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountTransfersReceivedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type AccountWasIdentityArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderByInput>>;
  where?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

export enum AccountOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  LinkedIdentityIdAsc = 'linkedIdentity_id_ASC',
  LinkedIdentityIdAscNullsFirst = 'linkedIdentity_id_ASC_NULLS_FIRST',
  LinkedIdentityIdDesc = 'linkedIdentity_id_DESC',
  LinkedIdentityIdDescNullsLast = 'linkedIdentity_id_DESC_NULLS_LAST',
  LinkedIdentityIndexAsc = 'linkedIdentity_index_ASC',
  LinkedIdentityIndexAscNullsFirst = 'linkedIdentity_index_ASC_NULLS_FIRST',
  LinkedIdentityIndexDesc = 'linkedIdentity_index_DESC',
  LinkedIdentityIndexDescNullsLast = 'linkedIdentity_index_DESC_NULLS_LAST',
  LinkedIdentityNameAsc = 'linkedIdentity_name_ASC',
  LinkedIdentityNameAscNullsFirst = 'linkedIdentity_name_ASC_NULLS_FIRST',
  LinkedIdentityNameDesc = 'linkedIdentity_name_DESC',
  LinkedIdentityNameDescNullsLast = 'linkedIdentity_name_DESC_NULLS_LAST',
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  identity?: InputMaybe<IdentityWhereInput>;
  identity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  linkedIdentity?: InputMaybe<IdentityWhereInput>;
  linkedIdentity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transfersIssued_every?: InputMaybe<TransferWhereInput>;
  transfersIssued_none?: InputMaybe<TransferWhereInput>;
  transfersIssued_some?: InputMaybe<TransferWhereInput>;
  transfersReceived_every?: InputMaybe<TransferWhereInput>;
  transfersReceived_none?: InputMaybe<TransferWhereInput>;
  transfersReceived_some?: InputMaybe<TransferWhereInput>;
  wasIdentity_every?: InputMaybe<ChangeOwnerKeyWhereInput>;
  wasIdentity_none?: InputMaybe<ChangeOwnerKeyWhereInput>;
  wasIdentity_some?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'Block';
  calls: Array<Call>;
  callsCount: Scalars['Int']['output'];
  events: Array<Event>;
  eventsCount: Scalars['Int']['output'];
  extrinsics: Array<Extrinsic>;
  extrinsicsCount: Scalars['Int']['output'];
  extrinsicsicRoot: Scalars['Bytes']['output'];
  hash: Scalars['Bytes']['output'];
  height: Scalars['Int']['output'];
  /** BlockHeight-blockHash - e.g. 0001812319-0001c */
  id: Scalars['String']['output'];
  implName: Scalars['String']['output'];
  implVersion: Scalars['Int']['output'];
  parentHash: Scalars['Bytes']['output'];
  specName: Scalars['String']['output'];
  specVersion: Scalars['Int']['output'];
  stateRoot: Scalars['Bytes']['output'];
  timestamp: Scalars['DateTime']['output'];
  validator?: Maybe<Scalars['Bytes']['output']>;
};

export type BlockCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type BlockEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type BlockExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

export enum BlockOrderByInput {
  CallsCountAsc = 'callsCount_ASC',
  CallsCountAscNullsFirst = 'callsCount_ASC_NULLS_FIRST',
  CallsCountDesc = 'callsCount_DESC',
  CallsCountDescNullsLast = 'callsCount_DESC_NULLS_LAST',
  EventsCountAsc = 'eventsCount_ASC',
  EventsCountAscNullsFirst = 'eventsCount_ASC_NULLS_FIRST',
  EventsCountDesc = 'eventsCount_DESC',
  EventsCountDescNullsLast = 'eventsCount_DESC_NULLS_LAST',
  ExtrinsicsCountAsc = 'extrinsicsCount_ASC',
  ExtrinsicsCountAscNullsFirst = 'extrinsicsCount_ASC_NULLS_FIRST',
  ExtrinsicsCountDesc = 'extrinsicsCount_DESC',
  ExtrinsicsCountDescNullsLast = 'extrinsicsCount_DESC_NULLS_LAST',
  ExtrinsicsicRootAsc = 'extrinsicsicRoot_ASC',
  ExtrinsicsicRootAscNullsFirst = 'extrinsicsicRoot_ASC_NULLS_FIRST',
  ExtrinsicsicRootDesc = 'extrinsicsicRoot_DESC',
  ExtrinsicsicRootDescNullsLast = 'extrinsicsicRoot_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  HeightAsc = 'height_ASC',
  HeightAscNullsFirst = 'height_ASC_NULLS_FIRST',
  HeightDesc = 'height_DESC',
  HeightDescNullsLast = 'height_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ImplNameAsc = 'implName_ASC',
  ImplNameAscNullsFirst = 'implName_ASC_NULLS_FIRST',
  ImplNameDesc = 'implName_DESC',
  ImplNameDescNullsLast = 'implName_DESC_NULLS_LAST',
  ImplVersionAsc = 'implVersion_ASC',
  ImplVersionAscNullsFirst = 'implVersion_ASC_NULLS_FIRST',
  ImplVersionDesc = 'implVersion_DESC',
  ImplVersionDescNullsLast = 'implVersion_DESC_NULLS_LAST',
  ParentHashAsc = 'parentHash_ASC',
  ParentHashAscNullsFirst = 'parentHash_ASC_NULLS_FIRST',
  ParentHashDesc = 'parentHash_DESC',
  ParentHashDescNullsLast = 'parentHash_DESC_NULLS_LAST',
  SpecNameAsc = 'specName_ASC',
  SpecNameAscNullsFirst = 'specName_ASC_NULLS_FIRST',
  SpecNameDesc = 'specName_DESC',
  SpecNameDescNullsLast = 'specName_DESC_NULLS_LAST',
  SpecVersionAsc = 'specVersion_ASC',
  SpecVersionAscNullsFirst = 'specVersion_ASC_NULLS_FIRST',
  SpecVersionDesc = 'specVersion_DESC',
  SpecVersionDescNullsLast = 'specVersion_DESC_NULLS_LAST',
  StateRootAsc = 'stateRoot_ASC',
  StateRootAscNullsFirst = 'stateRoot_ASC_NULLS_FIRST',
  StateRootDesc = 'stateRoot_DESC',
  StateRootDescNullsLast = 'stateRoot_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ValidatorAsc = 'validator_ASC',
  ValidatorAscNullsFirst = 'validator_ASC_NULLS_FIRST',
  ValidatorDesc = 'validator_DESC',
  ValidatorDescNullsLast = 'validator_DESC_NULLS_LAST',
}

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  callsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  callsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  callsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  callsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  callsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  callsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  eventsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsicsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  extrinsicsicRoot_eq?: InputMaybe<Scalars['Bytes']['input']>;
  extrinsicsicRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsicRoot_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  height_eq?: InputMaybe<Scalars['Int']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not_eq?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  implName_contains?: InputMaybe<Scalars['String']['input']>;
  implName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  implName_endsWith?: InputMaybe<Scalars['String']['input']>;
  implName_eq?: InputMaybe<Scalars['String']['input']>;
  implName_gt?: InputMaybe<Scalars['String']['input']>;
  implName_gte?: InputMaybe<Scalars['String']['input']>;
  implName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  implName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  implName_lt?: InputMaybe<Scalars['String']['input']>;
  implName_lte?: InputMaybe<Scalars['String']['input']>;
  implName_not_contains?: InputMaybe<Scalars['String']['input']>;
  implName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  implName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  implName_not_eq?: InputMaybe<Scalars['String']['input']>;
  implName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  implName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  implName_startsWith?: InputMaybe<Scalars['String']['input']>;
  implVersion_eq?: InputMaybe<Scalars['Int']['input']>;
  implVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  implVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  implVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  implVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  implVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  implVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  implVersion_not_eq?: InputMaybe<Scalars['Int']['input']>;
  implVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  parentHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  parentHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  specName_contains?: InputMaybe<Scalars['String']['input']>;
  specName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specName_endsWith?: InputMaybe<Scalars['String']['input']>;
  specName_eq?: InputMaybe<Scalars['String']['input']>;
  specName_gt?: InputMaybe<Scalars['String']['input']>;
  specName_gte?: InputMaybe<Scalars['String']['input']>;
  specName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specName_lt?: InputMaybe<Scalars['String']['input']>;
  specName_lte?: InputMaybe<Scalars['String']['input']>;
  specName_not_contains?: InputMaybe<Scalars['String']['input']>;
  specName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  specName_not_eq?: InputMaybe<Scalars['String']['input']>;
  specName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  specName_startsWith?: InputMaybe<Scalars['String']['input']>;
  specVersion_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  specVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stateRoot_eq?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stateRoot_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  validator_eq?: InputMaybe<Scalars['Bytes']['input']>;
  validator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  validator_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Call = {
  __typename?: 'Call';
  address: Array<Scalars['Int']['output']>;
  args?: Maybe<Scalars['JSON']['output']>;
  argsStr?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  block: Block;
  error?: Maybe<Scalars['JSON']['output']>;
  events: Array<Event>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  parent?: Maybe<Call>;
  subcalls: Array<Call>;
  success: Scalars['Boolean']['output'];
};

export type CallEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type CallSubcallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type CallEdge = {
  __typename?: 'CallEdge';
  cursor: Scalars['String']['output'];
  node: Call;
};

export enum CallOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeAscNullsFirst = 'extrinsic_fee_ASC_NULLS_FIRST',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicFeeDescNullsLast = 'extrinsic_fee_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsic_hash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsic_hash_DESC_NULLS_LAST',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdAscNullsFirst = 'extrinsic_id_ASC_NULLS_FIRST',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIdDescNullsLast = 'extrinsic_id_DESC_NULLS_LAST',
  ExtrinsicIndexAsc = 'extrinsic_index_ASC',
  ExtrinsicIndexAscNullsFirst = 'extrinsic_index_ASC_NULLS_FIRST',
  ExtrinsicIndexDesc = 'extrinsic_index_DESC',
  ExtrinsicIndexDescNullsLast = 'extrinsic_index_DESC_NULLS_LAST',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessAscNullsFirst = 'extrinsic_success_ASC_NULLS_FIRST',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicSuccessDescNullsLast = 'extrinsic_success_DESC_NULLS_LAST',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipAscNullsFirst = 'extrinsic_tip_ASC_NULLS_FIRST',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  ExtrinsicTipDescNullsLast = 'extrinsic_tip_DESC_NULLS_LAST',
  ExtrinsicVersionAsc = 'extrinsic_version_ASC',
  ExtrinsicVersionAscNullsFirst = 'extrinsic_version_ASC_NULLS_FIRST',
  ExtrinsicVersionDesc = 'extrinsic_version_DESC',
  ExtrinsicVersionDescNullsLast = 'extrinsic_version_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PalletAsc = 'pallet_ASC',
  PalletAscNullsFirst = 'pallet_ASC_NULLS_FIRST',
  PalletDesc = 'pallet_DESC',
  PalletDescNullsLast = 'pallet_DESC_NULLS_LAST',
  ParentIdAsc = 'parent_id_ASC',
  ParentIdAscNullsFirst = 'parent_id_ASC_NULLS_FIRST',
  ParentIdDesc = 'parent_id_DESC',
  ParentIdDescNullsLast = 'parent_id_DESC_NULLS_LAST',
  ParentNameAsc = 'parent_name_ASC',
  ParentNameAscNullsFirst = 'parent_name_ASC_NULLS_FIRST',
  ParentNameDesc = 'parent_name_DESC',
  ParentNameDescNullsLast = 'parent_name_DESC_NULLS_LAST',
  ParentPalletAsc = 'parent_pallet_ASC',
  ParentPalletAscNullsFirst = 'parent_pallet_ASC_NULLS_FIRST',
  ParentPalletDesc = 'parent_pallet_DESC',
  ParentPalletDescNullsLast = 'parent_pallet_DESC_NULLS_LAST',
  ParentSuccessAsc = 'parent_success_ASC',
  ParentSuccessAscNullsFirst = 'parent_success_ASC_NULLS_FIRST',
  ParentSuccessDesc = 'parent_success_DESC',
  ParentSuccessDescNullsLast = 'parent_success_DESC_NULLS_LAST',
  SuccessAsc = 'success_ASC',
  SuccessAscNullsFirst = 'success_ASC_NULLS_FIRST',
  SuccessDesc = 'success_DESC',
  SuccessDescNullsLast = 'success_DESC_NULLS_LAST',
}

export type CallWhereInput = {
  AND?: InputMaybe<Array<CallWhereInput>>;
  OR?: InputMaybe<Array<CallWhereInput>>;
  address_containsAll?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_containsAny?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_containsNone?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  argsStr_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_gt?: InputMaybe<Scalars['String']['input']>;
  pallet_gte?: InputMaybe<Scalars['String']['input']>;
  pallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pallet_lt?: InputMaybe<Scalars['String']['input']>;
  pallet_lte?: InputMaybe<Scalars['String']['input']>;
  pallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_not_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_startsWith?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CallWhereInput>;
  parent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subcalls_every?: InputMaybe<CallWhereInput>;
  subcalls_none?: InputMaybe<CallWhereInput>;
  subcalls_some?: InputMaybe<CallWhereInput>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CallsConnection = {
  __typename?: 'CallsConnection';
  edges: Array<CallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Certification */
export type Cert = {
  __typename?: 'Cert';
  /** whether the certification is currently active or not */
  active: Scalars['Boolean']['output'];
  /** the last createdOn value */
  createdOn: Scalars['Int']['output'];
  creation: Array<CertCreation>;
  /** the current expireOn value */
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  issuer: Identity;
  receiver: Identity;
  removal: Array<CertRemoval>;
  renewal: Array<CertRenewal>;
};

/** Certification */
export type CertCreationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertCreationOrderByInput>>;
  where?: InputMaybe<CertCreationWhereInput>;
};

/** Certification */
export type CertRemovalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertRemovalOrderByInput>>;
  where?: InputMaybe<CertRemovalWhereInput>;
};

/** Certification */
export type CertRenewalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertRenewalOrderByInput>>;
  where?: InputMaybe<CertRenewalWhereInput>;
};

/** Certification creation */
export type CertCreation = {
  __typename?: 'CertCreation';
  blockNumber: Scalars['Int']['output'];
  cert: Cert;
  id: Scalars['String']['output'];
};

export type CertCreationEdge = {
  __typename?: 'CertCreationEdge';
  cursor: Scalars['String']['output'];
  node: CertCreation;
};

export enum CertCreationOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type CertCreationWhereInput = {
  AND?: InputMaybe<Array<CertCreationWhereInput>>;
  OR?: InputMaybe<Array<CertCreationWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<CertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type CertCreationsConnection = {
  __typename?: 'CertCreationsConnection';
  edges: Array<CertCreationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CertEdge = {
  __typename?: 'CertEdge';
  cursor: Scalars['String']['output'];
  node: Cert;
};

export enum CertOrderByInput {
  ActiveAsc = 'active_ASC',
  ActiveAscNullsFirst = 'active_ASC_NULLS_FIRST',
  ActiveDesc = 'active_DESC',
  ActiveDescNullsLast = 'active_DESC_NULLS_LAST',
  CreatedOnAsc = 'createdOn_ASC',
  CreatedOnAscNullsFirst = 'createdOn_ASC_NULLS_FIRST',
  CreatedOnDesc = 'createdOn_DESC',
  CreatedOnDescNullsLast = 'createdOn_DESC_NULLS_LAST',
  ExpireOnAsc = 'expireOn_ASC',
  ExpireOnAscNullsFirst = 'expireOn_ASC_NULLS_FIRST',
  ExpireOnDesc = 'expireOn_DESC',
  ExpireOnDescNullsLast = 'expireOn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IssuerIdAsc = 'issuer_id_ASC',
  IssuerIdAscNullsFirst = 'issuer_id_ASC_NULLS_FIRST',
  IssuerIdDesc = 'issuer_id_DESC',
  IssuerIdDescNullsLast = 'issuer_id_DESC_NULLS_LAST',
  IssuerIndexAsc = 'issuer_index_ASC',
  IssuerIndexAscNullsFirst = 'issuer_index_ASC_NULLS_FIRST',
  IssuerIndexDesc = 'issuer_index_DESC',
  IssuerIndexDescNullsLast = 'issuer_index_DESC_NULLS_LAST',
  IssuerNameAsc = 'issuer_name_ASC',
  IssuerNameAscNullsFirst = 'issuer_name_ASC_NULLS_FIRST',
  IssuerNameDesc = 'issuer_name_DESC',
  IssuerNameDescNullsLast = 'issuer_name_DESC_NULLS_LAST',
  ReceiverIdAsc = 'receiver_id_ASC',
  ReceiverIdAscNullsFirst = 'receiver_id_ASC_NULLS_FIRST',
  ReceiverIdDesc = 'receiver_id_DESC',
  ReceiverIdDescNullsLast = 'receiver_id_DESC_NULLS_LAST',
  ReceiverIndexAsc = 'receiver_index_ASC',
  ReceiverIndexAscNullsFirst = 'receiver_index_ASC_NULLS_FIRST',
  ReceiverIndexDesc = 'receiver_index_DESC',
  ReceiverIndexDescNullsLast = 'receiver_index_DESC_NULLS_LAST',
  ReceiverNameAsc = 'receiver_name_ASC',
  ReceiverNameAscNullsFirst = 'receiver_name_ASC_NULLS_FIRST',
  ReceiverNameDesc = 'receiver_name_DESC',
  ReceiverNameDescNullsLast = 'receiver_name_DESC_NULLS_LAST',
}

/** Certification removal */
export type CertRemoval = {
  __typename?: 'CertRemoval';
  blockNumber: Scalars['Int']['output'];
  cert: Cert;
  id: Scalars['String']['output'];
};

export type CertRemovalEdge = {
  __typename?: 'CertRemovalEdge';
  cursor: Scalars['String']['output'];
  node: CertRemoval;
};

export enum CertRemovalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type CertRemovalWhereInput = {
  AND?: InputMaybe<Array<CertRemovalWhereInput>>;
  OR?: InputMaybe<Array<CertRemovalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<CertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type CertRemovalsConnection = {
  __typename?: 'CertRemovalsConnection';
  edges: Array<CertRemovalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Certification renewal */
export type CertRenewal = {
  __typename?: 'CertRenewal';
  blockNumber: Scalars['Int']['output'];
  cert: Cert;
  id: Scalars['String']['output'];
};

export type CertRenewalEdge = {
  __typename?: 'CertRenewalEdge';
  cursor: Scalars['String']['output'];
  node: CertRenewal;
};

export enum CertRenewalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type CertRenewalWhereInput = {
  AND?: InputMaybe<Array<CertRenewalWhereInput>>;
  OR?: InputMaybe<Array<CertRenewalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<CertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type CertRenewalsConnection = {
  __typename?: 'CertRenewalsConnection';
  edges: Array<CertRenewalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CertWhereInput = {
  AND?: InputMaybe<Array<CertWhereInput>>;
  OR?: InputMaybe<Array<CertWhereInput>>;
  active_eq?: InputMaybe<Scalars['Boolean']['input']>;
  active_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_lt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_lte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  creation_every?: InputMaybe<CertCreationWhereInput>;
  creation_none?: InputMaybe<CertCreationWhereInput>;
  creation_some?: InputMaybe<CertCreationWhereInput>;
  expireOn_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  expireOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expireOn_lt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_lte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  issuer?: InputMaybe<IdentityWhereInput>;
  issuer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver?: InputMaybe<IdentityWhereInput>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  removal_every?: InputMaybe<CertRemovalWhereInput>;
  removal_none?: InputMaybe<CertRemovalWhereInput>;
  removal_some?: InputMaybe<CertRemovalWhereInput>;
  renewal_every?: InputMaybe<CertRenewalWhereInput>;
  renewal_none?: InputMaybe<CertRenewalWhereInput>;
  renewal_some?: InputMaybe<CertRenewalWhereInput>;
};

export type CertsConnection = {
  __typename?: 'CertsConnection';
  edges: Array<CertEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** owner key change */
export type ChangeOwnerKey = {
  __typename?: 'ChangeOwnerKey';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  identity: Identity;
  next: Account;
  previous: Account;
};

export type ChangeOwnerKeyEdge = {
  __typename?: 'ChangeOwnerKeyEdge';
  cursor: Scalars['String']['output'];
  node: ChangeOwnerKey;
};

export enum ChangeOwnerKeyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  NextIdAsc = 'next_id_ASC',
  NextIdAscNullsFirst = 'next_id_ASC_NULLS_FIRST',
  NextIdDesc = 'next_id_DESC',
  NextIdDescNullsLast = 'next_id_DESC_NULLS_LAST',
  PreviousIdAsc = 'previous_id_ASC',
  PreviousIdAscNullsFirst = 'previous_id_ASC_NULLS_FIRST',
  PreviousIdDesc = 'previous_id_DESC',
  PreviousIdDescNullsLast = 'previous_id_DESC_NULLS_LAST',
}

export type ChangeOwnerKeyWhereInput = {
  AND?: InputMaybe<Array<ChangeOwnerKeyWhereInput>>;
  OR?: InputMaybe<Array<ChangeOwnerKeyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  identity?: InputMaybe<IdentityWhereInput>;
  identity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  next?: InputMaybe<AccountWhereInput>;
  next_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  previous?: InputMaybe<AccountWhereInput>;
  previous_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangeOwnerKeysConnection = {
  __typename?: 'ChangeOwnerKeysConnection';
  edges: Array<ChangeOwnerKeyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum CounterLevel {
  Global = 'Global',
  Item = 'Item',
  Pallet = 'Pallet',
}

export type Event = {
  __typename?: 'Event';
  args?: Maybe<Scalars['JSON']['output']>;
  argsStr?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  block: Block;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  /** Event id - e.g. 0000000001-000000-272d6 */
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  phase: Scalars['String']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export enum EventOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  CallIdAsc = 'call_id_ASC',
  CallIdAscNullsFirst = 'call_id_ASC_NULLS_FIRST',
  CallIdDesc = 'call_id_DESC',
  CallIdDescNullsLast = 'call_id_DESC_NULLS_LAST',
  CallNameAsc = 'call_name_ASC',
  CallNameAscNullsFirst = 'call_name_ASC_NULLS_FIRST',
  CallNameDesc = 'call_name_DESC',
  CallNameDescNullsLast = 'call_name_DESC_NULLS_LAST',
  CallPalletAsc = 'call_pallet_ASC',
  CallPalletAscNullsFirst = 'call_pallet_ASC_NULLS_FIRST',
  CallPalletDesc = 'call_pallet_DESC',
  CallPalletDescNullsLast = 'call_pallet_DESC_NULLS_LAST',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessAscNullsFirst = 'call_success_ASC_NULLS_FIRST',
  CallSuccessDesc = 'call_success_DESC',
  CallSuccessDescNullsLast = 'call_success_DESC_NULLS_LAST',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeAscNullsFirst = 'extrinsic_fee_ASC_NULLS_FIRST',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicFeeDescNullsLast = 'extrinsic_fee_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsic_hash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsic_hash_DESC_NULLS_LAST',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdAscNullsFirst = 'extrinsic_id_ASC_NULLS_FIRST',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIdDescNullsLast = 'extrinsic_id_DESC_NULLS_LAST',
  ExtrinsicIndexAsc = 'extrinsic_index_ASC',
  ExtrinsicIndexAscNullsFirst = 'extrinsic_index_ASC_NULLS_FIRST',
  ExtrinsicIndexDesc = 'extrinsic_index_DESC',
  ExtrinsicIndexDescNullsLast = 'extrinsic_index_DESC_NULLS_LAST',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessAscNullsFirst = 'extrinsic_success_ASC_NULLS_FIRST',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicSuccessDescNullsLast = 'extrinsic_success_DESC_NULLS_LAST',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipAscNullsFirst = 'extrinsic_tip_ASC_NULLS_FIRST',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  ExtrinsicTipDescNullsLast = 'extrinsic_tip_DESC_NULLS_LAST',
  ExtrinsicVersionAsc = 'extrinsic_version_ASC',
  ExtrinsicVersionAscNullsFirst = 'extrinsic_version_ASC_NULLS_FIRST',
  ExtrinsicVersionDesc = 'extrinsic_version_DESC',
  ExtrinsicVersionDescNullsLast = 'extrinsic_version_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PalletAsc = 'pallet_ASC',
  PalletAscNullsFirst = 'pallet_ASC_NULLS_FIRST',
  PalletDesc = 'pallet_DESC',
  PalletDescNullsLast = 'pallet_DESC_NULLS_LAST',
  PhaseAsc = 'phase_ASC',
  PhaseAscNullsFirst = 'phase_ASC_NULLS_FIRST',
  PhaseDesc = 'phase_DESC',
  PhaseDescNullsLast = 'phase_DESC_NULLS_LAST',
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  argsStr_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_gt?: InputMaybe<Scalars['String']['input']>;
  pallet_gte?: InputMaybe<Scalars['String']['input']>;
  pallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pallet_lt?: InputMaybe<Scalars['String']['input']>;
  pallet_lte?: InputMaybe<Scalars['String']['input']>;
  pallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_not_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_contains?: InputMaybe<Scalars['String']['input']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_eq?: InputMaybe<Scalars['String']['input']>;
  phase_gt?: InputMaybe<Scalars['String']['input']>;
  phase_gte?: InputMaybe<Scalars['String']['input']>;
  phase_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  phase_lt?: InputMaybe<Scalars['String']['input']>;
  phase_lte?: InputMaybe<Scalars['String']['input']>;
  phase_not_contains?: InputMaybe<Scalars['String']['input']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_not_eq?: InputMaybe<Scalars['String']['input']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Extrinsic = {
  __typename?: 'Extrinsic';
  block: Block;
  call: Call;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']['output']>;
  events: Array<Event>;
  fee?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['Bytes']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  signature?: Maybe<ExtrinsicSignature>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tip?: Maybe<Scalars['BigInt']['output']>;
  version: Scalars['Int']['output'];
};

export type ExtrinsicCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type ExtrinsicEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type ExtrinsicEdge = {
  __typename?: 'ExtrinsicEdge';
  cursor: Scalars['String']['output'];
  node: Extrinsic;
};

export enum ExtrinsicOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  CallIdAsc = 'call_id_ASC',
  CallIdAscNullsFirst = 'call_id_ASC_NULLS_FIRST',
  CallIdDesc = 'call_id_DESC',
  CallIdDescNullsLast = 'call_id_DESC_NULLS_LAST',
  CallNameAsc = 'call_name_ASC',
  CallNameAscNullsFirst = 'call_name_ASC_NULLS_FIRST',
  CallNameDesc = 'call_name_DESC',
  CallNameDescNullsLast = 'call_name_DESC_NULLS_LAST',
  CallPalletAsc = 'call_pallet_ASC',
  CallPalletAscNullsFirst = 'call_pallet_ASC_NULLS_FIRST',
  CallPalletDesc = 'call_pallet_DESC',
  CallPalletDescNullsLast = 'call_pallet_DESC_NULLS_LAST',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessAscNullsFirst = 'call_success_ASC_NULLS_FIRST',
  CallSuccessDesc = 'call_success_DESC',
  CallSuccessDescNullsLast = 'call_success_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  SuccessAsc = 'success_ASC',
  SuccessAscNullsFirst = 'success_ASC_NULLS_FIRST',
  SuccessDesc = 'success_DESC',
  SuccessDescNullsLast = 'success_DESC_NULLS_LAST',
  TipAsc = 'tip_ASC',
  TipAscNullsFirst = 'tip_ASC_NULLS_FIRST',
  TipDesc = 'tip_DESC',
  TipDescNullsLast = 'tip_DESC_NULLS_LAST',
  VersionAsc = 'version_ASC',
  VersionAscNullsFirst = 'version_ASC_NULLS_FIRST',
  VersionDesc = 'version_DESC',
  VersionDescNullsLast = 'version_DESC_NULLS_LAST',
}

export type ExtrinsicSignature = {
  __typename?: 'ExtrinsicSignature';
  address?: Maybe<Scalars['JSON']['output']>;
  signature?: Maybe<Scalars['JSON']['output']>;
  signedExtensions?: Maybe<Scalars['JSON']['output']>;
};

export type ExtrinsicSignatureWhereInput = {
  address_eq?: InputMaybe<Scalars['JSON']['input']>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  address_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  address_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  signature_eq?: InputMaybe<Scalars['JSON']['input']>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signature_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  signature_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  signature_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_eq?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signedExtensions_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_not_eq?: InputMaybe<Scalars['JSON']['input']>;
};

export type ExtrinsicWhereInput = {
  AND?: InputMaybe<Array<ExtrinsicWhereInput>>;
  OR?: InputMaybe<Array<ExtrinsicWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signature?: InputMaybe<ExtrinsicSignatureWhereInput>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  tip_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tip_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tip_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_eq?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_not_eq?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ExtrinsicsConnection = {
  __typename?: 'ExtrinsicsConnection';
  edges: Array<ExtrinsicEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IdentitiesConnection = {
  __typename?: 'IdentitiesConnection';
  edges: Array<IdentityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Identity */
export type Identity = {
  __typename?: 'Identity';
  /** Current account */
  account: Account;
  /** Certifications issued */
  certIssued: Array<Cert>;
  /** Certifications received */
  certReceived: Array<Cert>;
  id: Scalars['String']['output'];
  /** Identity index */
  index: Scalars['Int']['output'];
  /** linked accounts */
  linkedAccount: Array<Account>;
  /** Membership of the identity */
  membership?: Maybe<Membership>;
  /** Name */
  name: Scalars['String']['output'];
  /** Owner key changes */
  ownerKeyChange: Array<ChangeOwnerKey>;
  /** Smith certifications issued */
  smithCertIssued: Array<SmithCert>;
  /** Smith certifications received */
  smithCertReceived: Array<SmithCert>;
  /** Smith Membership of the identity */
  smithMembership?: Maybe<SmithMembership>;
};

/** Identity */
export type IdentityCertIssuedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderByInput>>;
  where?: InputMaybe<CertWhereInput>;
};

/** Identity */
export type IdentityCertReceivedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderByInput>>;
  where?: InputMaybe<CertWhereInput>;
};

/** Identity */
export type IdentityLinkedAccountArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

/** Identity */
export type IdentityOwnerKeyChangeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderByInput>>;
  where?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

/** Identity */
export type IdentitySmithCertIssuedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderByInput>>;
  where?: InputMaybe<SmithCertWhereInput>;
};

/** Identity */
export type IdentitySmithCertReceivedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderByInput>>;
  where?: InputMaybe<SmithCertWhereInput>;
};

export type IdentityEdge = {
  __typename?: 'IdentityEdge';
  cursor: Scalars['String']['output'];
  node: Identity;
};

export enum IdentityOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  MembershipExpireOnAsc = 'membership_expireOn_ASC',
  MembershipExpireOnAscNullsFirst = 'membership_expireOn_ASC_NULLS_FIRST',
  MembershipExpireOnDesc = 'membership_expireOn_DESC',
  MembershipExpireOnDescNullsLast = 'membership_expireOn_DESC_NULLS_LAST',
  MembershipIdAsc = 'membership_id_ASC',
  MembershipIdAscNullsFirst = 'membership_id_ASC_NULLS_FIRST',
  MembershipIdDesc = 'membership_id_DESC',
  MembershipIdDescNullsLast = 'membership_id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SmithMembershipExpireOnAsc = 'smithMembership_expireOn_ASC',
  SmithMembershipExpireOnAscNullsFirst = 'smithMembership_expireOn_ASC_NULLS_FIRST',
  SmithMembershipExpireOnDesc = 'smithMembership_expireOn_DESC',
  SmithMembershipExpireOnDescNullsLast = 'smithMembership_expireOn_DESC_NULLS_LAST',
  SmithMembershipIdAsc = 'smithMembership_id_ASC',
  SmithMembershipIdAscNullsFirst = 'smithMembership_id_ASC_NULLS_FIRST',
  SmithMembershipIdDesc = 'smithMembership_id_DESC',
  SmithMembershipIdDescNullsLast = 'smithMembership_id_DESC_NULLS_LAST',
}

export type IdentityWhereInput = {
  AND?: InputMaybe<Array<IdentityWhereInput>>;
  OR?: InputMaybe<Array<IdentityWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  certIssued_every?: InputMaybe<CertWhereInput>;
  certIssued_none?: InputMaybe<CertWhereInput>;
  certIssued_some?: InputMaybe<CertWhereInput>;
  certReceived_every?: InputMaybe<CertWhereInput>;
  certReceived_none?: InputMaybe<CertWhereInput>;
  certReceived_some?: InputMaybe<CertWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  linkedAccount_every?: InputMaybe<AccountWhereInput>;
  linkedAccount_none?: InputMaybe<AccountWhereInput>;
  linkedAccount_some?: InputMaybe<AccountWhereInput>;
  membership?: InputMaybe<MembershipWhereInput>;
  membership_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  ownerKeyChange_every?: InputMaybe<ChangeOwnerKeyWhereInput>;
  ownerKeyChange_none?: InputMaybe<ChangeOwnerKeyWhereInput>;
  ownerKeyChange_some?: InputMaybe<ChangeOwnerKeyWhereInput>;
  smithCertIssued_every?: InputMaybe<SmithCertWhereInput>;
  smithCertIssued_none?: InputMaybe<SmithCertWhereInput>;
  smithCertIssued_some?: InputMaybe<SmithCertWhereInput>;
  smithCertReceived_every?: InputMaybe<SmithCertWhereInput>;
  smithCertReceived_none?: InputMaybe<SmithCertWhereInput>;
  smithCertReceived_some?: InputMaybe<SmithCertWhereInput>;
  smithMembership?: InputMaybe<SmithMembershipWhereInput>;
  smithMembership_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ItemType {
  Calls = 'Calls',
  Events = 'Events',
  Extrinsics = 'Extrinsics',
}

export type ItemsCounter = {
  __typename?: 'ItemsCounter';
  id: Scalars['String']['output'];
  level: CounterLevel;
  total: Scalars['Int']['output'];
  type: ItemType;
};

export type ItemsCounterEdge = {
  __typename?: 'ItemsCounterEdge';
  cursor: Scalars['String']['output'];
  node: ItemsCounter;
};

export enum ItemsCounterOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LevelAsc = 'level_ASC',
  LevelAscNullsFirst = 'level_ASC_NULLS_FIRST',
  LevelDesc = 'level_DESC',
  LevelDescNullsLast = 'level_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
}

export type ItemsCounterWhereInput = {
  AND?: InputMaybe<Array<ItemsCounterWhereInput>>;
  OR?: InputMaybe<Array<ItemsCounterWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  level_eq?: InputMaybe<CounterLevel>;
  level_in?: InputMaybe<Array<CounterLevel>>;
  level_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  level_not_eq?: InputMaybe<CounterLevel>;
  level_not_in?: InputMaybe<Array<CounterLevel>>;
  total_eq?: InputMaybe<Scalars['Int']['input']>;
  total_gt?: InputMaybe<Scalars['Int']['input']>;
  total_gte?: InputMaybe<Scalars['Int']['input']>;
  total_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['Int']['input']>;
  total_lte?: InputMaybe<Scalars['Int']['input']>;
  total_not_eq?: InputMaybe<Scalars['Int']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  type_eq?: InputMaybe<ItemType>;
  type_in?: InputMaybe<Array<ItemType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<ItemType>;
  type_not_in?: InputMaybe<Array<ItemType>>;
};

export type ItemsCountersConnection = {
  __typename?: 'ItemsCountersConnection';
  edges: Array<ItemsCounterEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Membership */
export type Membership = {
  __typename?: 'Membership';
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  identity: Identity;
};

export type MembershipEdge = {
  __typename?: 'MembershipEdge';
  cursor: Scalars['String']['output'];
  node: Membership;
};

export enum MembershipOrderByInput {
  ExpireOnAsc = 'expireOn_ASC',
  ExpireOnAscNullsFirst = 'expireOn_ASC_NULLS_FIRST',
  ExpireOnDesc = 'expireOn_DESC',
  ExpireOnDescNullsLast = 'expireOn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
}

export type MembershipWhereInput = {
  AND?: InputMaybe<Array<MembershipWhereInput>>;
  OR?: InputMaybe<Array<MembershipWhereInput>>;
  expireOn_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  expireOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expireOn_lt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_lte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  identity?: InputMaybe<IdentityWhereInput>;
  identity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MembershipsConnection = {
  __typename?: 'MembershipsConnection';
  edges: Array<MembershipEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accountById?: Maybe<Account>;
  /** @deprecated Use accountById */
  accountByUniqueInput?: Maybe<Account>;
  accounts: Array<Account>;
  accountsConnection: AccountsConnection;
  blockById?: Maybe<Block>;
  /** @deprecated Use blockById */
  blockByUniqueInput?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  callById?: Maybe<Call>;
  /** @deprecated Use callById */
  callByUniqueInput?: Maybe<Call>;
  calls: Array<Call>;
  callsConnection: CallsConnection;
  certById?: Maybe<Cert>;
  /** @deprecated Use certById */
  certByUniqueInput?: Maybe<Cert>;
  certCreationById?: Maybe<CertCreation>;
  /** @deprecated Use certCreationById */
  certCreationByUniqueInput?: Maybe<CertCreation>;
  certCreations: Array<CertCreation>;
  certCreationsConnection: CertCreationsConnection;
  certRemovalById?: Maybe<CertRemoval>;
  /** @deprecated Use certRemovalById */
  certRemovalByUniqueInput?: Maybe<CertRemoval>;
  certRemovals: Array<CertRemoval>;
  certRemovalsConnection: CertRemovalsConnection;
  certRenewalById?: Maybe<CertRenewal>;
  /** @deprecated Use certRenewalById */
  certRenewalByUniqueInput?: Maybe<CertRenewal>;
  certRenewals: Array<CertRenewal>;
  certRenewalsConnection: CertRenewalsConnection;
  certs: Array<Cert>;
  certsConnection: CertsConnection;
  changeOwnerKeyById?: Maybe<ChangeOwnerKey>;
  /** @deprecated Use changeOwnerKeyById */
  changeOwnerKeyByUniqueInput?: Maybe<ChangeOwnerKey>;
  changeOwnerKeys: Array<ChangeOwnerKey>;
  changeOwnerKeysConnection: ChangeOwnerKeysConnection;
  eventById?: Maybe<Event>;
  /** @deprecated Use eventById */
  eventByUniqueInput?: Maybe<Event>;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  extrinsicById?: Maybe<Extrinsic>;
  /** @deprecated Use extrinsicById */
  extrinsicByUniqueInput?: Maybe<Extrinsic>;
  extrinsics: Array<Extrinsic>;
  extrinsicsConnection: ExtrinsicsConnection;
  identities: Array<Identity>;
  identitiesConnection: IdentitiesConnection;
  identityById?: Maybe<Identity>;
  /** @deprecated Use identityById */
  identityByUniqueInput?: Maybe<Identity>;
  itemsCounterById?: Maybe<ItemsCounter>;
  /** @deprecated Use itemsCounterById */
  itemsCounterByUniqueInput?: Maybe<ItemsCounter>;
  itemsCounters: Array<ItemsCounter>;
  itemsCountersConnection: ItemsCountersConnection;
  membershipById?: Maybe<Membership>;
  /** @deprecated Use membershipById */
  membershipByUniqueInput?: Maybe<Membership>;
  memberships: Array<Membership>;
  membershipsConnection: MembershipsConnection;
  smithCertById?: Maybe<SmithCert>;
  /** @deprecated Use smithCertById */
  smithCertByUniqueInput?: Maybe<SmithCert>;
  smithCertCreationById?: Maybe<SmithCertCreation>;
  /** @deprecated Use smithCertCreationById */
  smithCertCreationByUniqueInput?: Maybe<SmithCertCreation>;
  smithCertCreations: Array<SmithCertCreation>;
  smithCertCreationsConnection: SmithCertCreationsConnection;
  smithCertRemovalById?: Maybe<SmithCertRemoval>;
  /** @deprecated Use smithCertRemovalById */
  smithCertRemovalByUniqueInput?: Maybe<SmithCertRemoval>;
  smithCertRemovals: Array<SmithCertRemoval>;
  smithCertRemovalsConnection: SmithCertRemovalsConnection;
  smithCertRenewalById?: Maybe<SmithCertRenewal>;
  /** @deprecated Use smithCertRenewalById */
  smithCertRenewalByUniqueInput?: Maybe<SmithCertRenewal>;
  smithCertRenewals: Array<SmithCertRenewal>;
  smithCertRenewalsConnection: SmithCertRenewalsConnection;
  smithCerts: Array<SmithCert>;
  smithCertsConnection: SmithCertsConnection;
  smithMembershipById?: Maybe<SmithMembership>;
  /** @deprecated Use smithMembershipById */
  smithMembershipByUniqueInput?: Maybe<SmithMembership>;
  smithMemberships: Array<SmithMembership>;
  smithMembershipsConnection: SmithMembershipsConnection;
  squidStatus?: Maybe<SquidStatus>;
  transferById?: Maybe<Transfer>;
  /** @deprecated Use transferById */
  transferByUniqueInput?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
};

export type QueryAccountByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryAccountByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AccountOrderByInput>;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryBlockByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryBlockByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};

export type QueryCallByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCallByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type QueryCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CallOrderByInput>;
  where?: InputMaybe<CallWhereInput>;
};

export type QueryCertByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCertByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCertCreationByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCertCreationByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCertCreationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertCreationOrderByInput>>;
  where?: InputMaybe<CertCreationWhereInput>;
};

export type QueryCertCreationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CertCreationOrderByInput>;
  where?: InputMaybe<CertCreationWhereInput>;
};

export type QueryCertRemovalByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCertRemovalByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCertRemovalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertRemovalOrderByInput>>;
  where?: InputMaybe<CertRemovalWhereInput>;
};

export type QueryCertRemovalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CertRemovalOrderByInput>;
  where?: InputMaybe<CertRemovalWhereInput>;
};

export type QueryCertRenewalByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCertRenewalByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCertRenewalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertRenewalOrderByInput>>;
  where?: InputMaybe<CertRenewalWhereInput>;
};

export type QueryCertRenewalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CertRenewalOrderByInput>;
  where?: InputMaybe<CertRenewalWhereInput>;
};

export type QueryCertsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderByInput>>;
  where?: InputMaybe<CertWhereInput>;
};

export type QueryCertsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CertOrderByInput>;
  where?: InputMaybe<CertWhereInput>;
};

export type QueryChangeOwnerKeyByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryChangeOwnerKeyByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryChangeOwnerKeysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderByInput>>;
  where?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

export type QueryChangeOwnerKeysConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ChangeOwnerKeyOrderByInput>;
  where?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryEventByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};

export type QueryExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryExtrinsicByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type QueryExtrinsicsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ExtrinsicOrderByInput>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type QueryIdentitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IdentityOrderByInput>>;
  where?: InputMaybe<IdentityWhereInput>;
};

export type QueryIdentitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<IdentityOrderByInput>;
  where?: InputMaybe<IdentityWhereInput>;
};

export type QueryIdentityByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryIdentityByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryItemsCounterByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryItemsCounterByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryItemsCountersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderByInput>>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};

export type QueryItemsCountersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ItemsCounterOrderByInput>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};

export type QueryMembershipByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryMembershipByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryMembershipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipOrderByInput>>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QueryMembershipsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MembershipOrderByInput>;
  where?: InputMaybe<MembershipWhereInput>;
};

export type QuerySmithCertByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithCertByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QuerySmithCertCreationByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithCertCreationByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QuerySmithCertCreationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertCreationOrderByInput>>;
  where?: InputMaybe<SmithCertCreationWhereInput>;
};

export type QuerySmithCertCreationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SmithCertCreationOrderByInput>;
  where?: InputMaybe<SmithCertCreationWhereInput>;
};

export type QuerySmithCertRemovalByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithCertRemovalByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QuerySmithCertRemovalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertRemovalOrderByInput>>;
  where?: InputMaybe<SmithCertRemovalWhereInput>;
};

export type QuerySmithCertRemovalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SmithCertRemovalOrderByInput>;
  where?: InputMaybe<SmithCertRemovalWhereInput>;
};

export type QuerySmithCertRenewalByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithCertRenewalByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QuerySmithCertRenewalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertRenewalOrderByInput>>;
  where?: InputMaybe<SmithCertRenewalWhereInput>;
};

export type QuerySmithCertRenewalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SmithCertRenewalOrderByInput>;
  where?: InputMaybe<SmithCertRenewalWhereInput>;
};

export type QuerySmithCertsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderByInput>>;
  where?: InputMaybe<SmithCertWhereInput>;
};

export type QuerySmithCertsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SmithCertOrderByInput>;
  where?: InputMaybe<SmithCertWhereInput>;
};

export type QuerySmithMembershipByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithMembershipByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QuerySmithMembershipsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithMembershipOrderByInput>>;
  where?: InputMaybe<SmithMembershipWhereInput>;
};

export type QuerySmithMembershipsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SmithMembershipOrderByInput>;
  where?: InputMaybe<SmithMembershipWhereInput>;
};

export type QueryTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryTransferByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type QueryTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
};

/** Smith certification */
export type SmithCert = {
  __typename?: 'SmithCert';
  active: Scalars['Boolean']['output'];
  createdOn: Scalars['Int']['output'];
  creation: Array<SmithCertCreation>;
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  issuer: Identity;
  receiver: Identity;
  removal: Array<SmithCertRemoval>;
  renewal: Array<SmithCertRenewal>;
};

/** Smith certification */
export type SmithCertCreationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertCreationOrderByInput>>;
  where?: InputMaybe<SmithCertCreationWhereInput>;
};

/** Smith certification */
export type SmithCertRemovalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertRemovalOrderByInput>>;
  where?: InputMaybe<SmithCertRemovalWhereInput>;
};

/** Smith certification */
export type SmithCertRenewalArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertRenewalOrderByInput>>;
  where?: InputMaybe<SmithCertRenewalWhereInput>;
};

export type SmithCertCreation = {
  __typename?: 'SmithCertCreation';
  blockNumber: Scalars['Int']['output'];
  cert: SmithCert;
  id: Scalars['String']['output'];
};

export type SmithCertCreationEdge = {
  __typename?: 'SmithCertCreationEdge';
  cursor: Scalars['String']['output'];
  node: SmithCertCreation;
};

export enum SmithCertCreationOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type SmithCertCreationWhereInput = {
  AND?: InputMaybe<Array<SmithCertCreationWhereInput>>;
  OR?: InputMaybe<Array<SmithCertCreationWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<SmithCertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SmithCertCreationsConnection = {
  __typename?: 'SmithCertCreationsConnection';
  edges: Array<SmithCertCreationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SmithCertEdge = {
  __typename?: 'SmithCertEdge';
  cursor: Scalars['String']['output'];
  node: SmithCert;
};

export enum SmithCertOrderByInput {
  ActiveAsc = 'active_ASC',
  ActiveAscNullsFirst = 'active_ASC_NULLS_FIRST',
  ActiveDesc = 'active_DESC',
  ActiveDescNullsLast = 'active_DESC_NULLS_LAST',
  CreatedOnAsc = 'createdOn_ASC',
  CreatedOnAscNullsFirst = 'createdOn_ASC_NULLS_FIRST',
  CreatedOnDesc = 'createdOn_DESC',
  CreatedOnDescNullsLast = 'createdOn_DESC_NULLS_LAST',
  ExpireOnAsc = 'expireOn_ASC',
  ExpireOnAscNullsFirst = 'expireOn_ASC_NULLS_FIRST',
  ExpireOnDesc = 'expireOn_DESC',
  ExpireOnDescNullsLast = 'expireOn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IssuerIdAsc = 'issuer_id_ASC',
  IssuerIdAscNullsFirst = 'issuer_id_ASC_NULLS_FIRST',
  IssuerIdDesc = 'issuer_id_DESC',
  IssuerIdDescNullsLast = 'issuer_id_DESC_NULLS_LAST',
  IssuerIndexAsc = 'issuer_index_ASC',
  IssuerIndexAscNullsFirst = 'issuer_index_ASC_NULLS_FIRST',
  IssuerIndexDesc = 'issuer_index_DESC',
  IssuerIndexDescNullsLast = 'issuer_index_DESC_NULLS_LAST',
  IssuerNameAsc = 'issuer_name_ASC',
  IssuerNameAscNullsFirst = 'issuer_name_ASC_NULLS_FIRST',
  IssuerNameDesc = 'issuer_name_DESC',
  IssuerNameDescNullsLast = 'issuer_name_DESC_NULLS_LAST',
  ReceiverIdAsc = 'receiver_id_ASC',
  ReceiverIdAscNullsFirst = 'receiver_id_ASC_NULLS_FIRST',
  ReceiverIdDesc = 'receiver_id_DESC',
  ReceiverIdDescNullsLast = 'receiver_id_DESC_NULLS_LAST',
  ReceiverIndexAsc = 'receiver_index_ASC',
  ReceiverIndexAscNullsFirst = 'receiver_index_ASC_NULLS_FIRST',
  ReceiverIndexDesc = 'receiver_index_DESC',
  ReceiverIndexDescNullsLast = 'receiver_index_DESC_NULLS_LAST',
  ReceiverNameAsc = 'receiver_name_ASC',
  ReceiverNameAscNullsFirst = 'receiver_name_ASC_NULLS_FIRST',
  ReceiverNameDesc = 'receiver_name_DESC',
  ReceiverNameDescNullsLast = 'receiver_name_DESC_NULLS_LAST',
}

export type SmithCertRemoval = {
  __typename?: 'SmithCertRemoval';
  blockNumber: Scalars['Int']['output'];
  cert: SmithCert;
  id: Scalars['String']['output'];
};

export type SmithCertRemovalEdge = {
  __typename?: 'SmithCertRemovalEdge';
  cursor: Scalars['String']['output'];
  node: SmithCertRemoval;
};

export enum SmithCertRemovalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type SmithCertRemovalWhereInput = {
  AND?: InputMaybe<Array<SmithCertRemovalWhereInput>>;
  OR?: InputMaybe<Array<SmithCertRemovalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<SmithCertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SmithCertRemovalsConnection = {
  __typename?: 'SmithCertRemovalsConnection';
  edges: Array<SmithCertRemovalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SmithCertRenewal = {
  __typename?: 'SmithCertRenewal';
  blockNumber: Scalars['Int']['output'];
  cert: SmithCert;
  id: Scalars['String']['output'];
};

export type SmithCertRenewalEdge = {
  __typename?: 'SmithCertRenewalEdge';
  cursor: Scalars['String']['output'];
  node: SmithCertRenewal;
};

export enum SmithCertRenewalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CertActiveAsc = 'cert_active_ASC',
  CertActiveAscNullsFirst = 'cert_active_ASC_NULLS_FIRST',
  CertActiveDesc = 'cert_active_DESC',
  CertActiveDescNullsLast = 'cert_active_DESC_NULLS_LAST',
  CertCreatedOnAsc = 'cert_createdOn_ASC',
  CertCreatedOnAscNullsFirst = 'cert_createdOn_ASC_NULLS_FIRST',
  CertCreatedOnDesc = 'cert_createdOn_DESC',
  CertCreatedOnDescNullsLast = 'cert_createdOn_DESC_NULLS_LAST',
  CertExpireOnAsc = 'cert_expireOn_ASC',
  CertExpireOnAscNullsFirst = 'cert_expireOn_ASC_NULLS_FIRST',
  CertExpireOnDesc = 'cert_expireOn_DESC',
  CertExpireOnDescNullsLast = 'cert_expireOn_DESC_NULLS_LAST',
  CertIdAsc = 'cert_id_ASC',
  CertIdAscNullsFirst = 'cert_id_ASC_NULLS_FIRST',
  CertIdDesc = 'cert_id_DESC',
  CertIdDescNullsLast = 'cert_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type SmithCertRenewalWhereInput = {
  AND?: InputMaybe<Array<SmithCertRenewalWhereInput>>;
  OR?: InputMaybe<Array<SmithCertRenewalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  cert?: InputMaybe<SmithCertWhereInput>;
  cert_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SmithCertRenewalsConnection = {
  __typename?: 'SmithCertRenewalsConnection';
  edges: Array<SmithCertRenewalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SmithCertWhereInput = {
  AND?: InputMaybe<Array<SmithCertWhereInput>>;
  OR?: InputMaybe<Array<SmithCertWhereInput>>;
  active_eq?: InputMaybe<Scalars['Boolean']['input']>;
  active_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_lt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_lte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  creation_every?: InputMaybe<SmithCertCreationWhereInput>;
  creation_none?: InputMaybe<SmithCertCreationWhereInput>;
  creation_some?: InputMaybe<SmithCertCreationWhereInput>;
  expireOn_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  expireOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expireOn_lt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_lte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  issuer?: InputMaybe<IdentityWhereInput>;
  issuer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver?: InputMaybe<IdentityWhereInput>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  removal_every?: InputMaybe<SmithCertRemovalWhereInput>;
  removal_none?: InputMaybe<SmithCertRemovalWhereInput>;
  removal_some?: InputMaybe<SmithCertRemovalWhereInput>;
  renewal_every?: InputMaybe<SmithCertRenewalWhereInput>;
  renewal_none?: InputMaybe<SmithCertRenewalWhereInput>;
  renewal_some?: InputMaybe<SmithCertRenewalWhereInput>;
};

export type SmithCertsConnection = {
  __typename?: 'SmithCertsConnection';
  edges: Array<SmithCertEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Smith membership */
export type SmithMembership = {
  __typename?: 'SmithMembership';
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  identity: Identity;
};

export type SmithMembershipEdge = {
  __typename?: 'SmithMembershipEdge';
  cursor: Scalars['String']['output'];
  node: SmithMembership;
};

export enum SmithMembershipOrderByInput {
  ExpireOnAsc = 'expireOn_ASC',
  ExpireOnAscNullsFirst = 'expireOn_ASC_NULLS_FIRST',
  ExpireOnDesc = 'expireOn_DESC',
  ExpireOnDescNullsLast = 'expireOn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
}

export type SmithMembershipWhereInput = {
  AND?: InputMaybe<Array<SmithMembershipWhereInput>>;
  OR?: InputMaybe<Array<SmithMembershipWhereInput>>;
  expireOn_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_gte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  expireOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expireOn_lt?: InputMaybe<Scalars['Int']['input']>;
  expireOn_lte?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  expireOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  identity?: InputMaybe<IdentityWhereInput>;
  identity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SmithMembershipsConnection = {
  __typename?: 'SmithMembershipsConnection';
  edges: Array<SmithMembershipEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  from: Account;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Account;
};

export type TransferEdge = {
  __typename?: 'TransferEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

export enum TransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CommentAsc = 'comment_ASC',
  CommentAscNullsFirst = 'comment_ASC_NULLS_FIRST',
  CommentDesc = 'comment_DESC',
  CommentDescNullsLast = 'comment_DESC_NULLS_LAST',
  FromIdAsc = 'from_id_ASC',
  FromIdAscNullsFirst = 'from_id_ASC_NULLS_FIRST',
  FromIdDesc = 'from_id_DESC',
  FromIdDescNullsLast = 'from_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToIdAsc = 'to_id_ASC',
  ToIdAscNullsFirst = 'to_id_ASC_NULLS_FIRST',
  ToIdDesc = 'to_id_DESC',
  ToIdDescNullsLast = 'to_id_DESC_NULLS_LAST',
}

export type TransferWhereInput = {
  AND?: InputMaybe<Array<TransferWhereInput>>;
  OR?: InputMaybe<Array<TransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  comment_contains?: InputMaybe<Scalars['String']['input']>;
  comment_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  comment_endsWith?: InputMaybe<Scalars['String']['input']>;
  comment_eq?: InputMaybe<Scalars['String']['input']>;
  comment_gt?: InputMaybe<Scalars['String']['input']>;
  comment_gte?: InputMaybe<Scalars['String']['input']>;
  comment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  comment_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  comment_lt?: InputMaybe<Scalars['String']['input']>;
  comment_lte?: InputMaybe<Scalars['String']['input']>;
  comment_not_contains?: InputMaybe<Scalars['String']['input']>;
  comment_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  comment_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  comment_not_eq?: InputMaybe<Scalars['String']['input']>;
  comment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  comment_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  comment_startsWith?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<AccountWhereInput>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to?: InputMaybe<AccountWhereInput>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type LightIdentityFragment = {
  __typename: 'Identity';
  id: string;
  name: string;
  membership?: { __typename: 'Membership'; id: string } | null;
};

export type LightAccountFragment = {
  __typename: 'Account';
  id: string;
  identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
};

export type LightBlockFragment = {
  __typename: 'Block';
  id: string;
  height: number;
  hash: any;
  timestamp: any;
  callsCount: number;
  eventsCount: number;
  extrinsicsCount: number;
};

export type BlockByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type BlockByIdQuery = {
  __typename?: 'Query';
  blockById?: {
    __typename: 'Block';
    id: string;
    height: number;
    hash: any;
    timestamp: any;
    callsCount: number;
    eventsCount: number;
    extrinsicsCount: number;
  } | null;
};

export type BlocksQueryVariables = Exact<{
  where?: InputMaybe<BlockWhereInput>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<BlockOrderByInput> | BlockOrderByInput>;
}>;

export type BlocksQuery = {
  __typename?: 'Query';
  blocks: Array<{
    __typename: 'Block';
    id: string;
    height: number;
    hash: any;
    timestamp: any;
    callsCount: number;
    eventsCount: number;
    extrinsicsCount: number;
  }>;
};

export type CertFragment = {
  __typename: 'Cert';
  id: string;
  createdOn: number;
  issuer: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
  receiver: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
  creation: Array<{ __typename?: 'CertCreation'; blockNumber: number }>;
};

export type CertsConnectionByIssuerQueryVariables = Exact<{
  address: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  orderBy: Array<CertOrderByInput> | CertOrderByInput;
  after?: InputMaybe<Scalars['String']['input']>;
}>;

export type CertsConnectionByIssuerQuery = {
  __typename?: 'Query';
  certsConnection: {
    __typename?: 'CertsConnection';
    totalCount: number;
    pageInfo: { __typename?: 'PageInfo'; endCursor: string; hasNextPage: boolean };
    edges: Array<{
      __typename?: 'CertEdge';
      node: {
        __typename: 'Cert';
        id: string;
        createdOn: number;
        issuer: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
        receiver: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
        creation: Array<{ __typename?: 'CertCreation'; blockNumber: number }>;
      };
    }>;
  };
};

export type CertsConnectionByReceiverQueryVariables = Exact<{
  address: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  orderBy: Array<CertOrderByInput> | CertOrderByInput;
  after?: InputMaybe<Scalars['String']['input']>;
}>;

export type CertsConnectionByReceiverQuery = {
  __typename?: 'Query';
  certsConnection: {
    __typename?: 'CertsConnection';
    totalCount: number;
    pageInfo: { __typename?: 'PageInfo'; endCursor: string; hasNextPage: boolean };
    edges: Array<{
      __typename?: 'CertEdge';
      node: {
        __typename: 'Cert';
        id: string;
        createdOn: number;
        issuer: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
        receiver: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null };
        creation: Array<{ __typename?: 'CertCreation'; blockNumber: number }>;
      };
    }>;
  };
};

export type TransferFragment = {
  __typename: 'Transfer';
  id: string;
  amount: any;
  timestamp: any;
  blockNumber: number;
  from: {
    __typename: 'Account';
    id: string;
    identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
  };
  to: {
    __typename: 'Account';
    id: string;
    identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
  };
};

export type TransfersConnectionByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  orderBy: Array<TransferOrderByInput> | TransferOrderByInput;
  after?: InputMaybe<Scalars['String']['input']>;
}>;

export type TransfersConnectionByAddressQuery = {
  __typename?: 'Query';
  transfersConnection: {
    __typename?: 'TransfersConnection';
    pageInfo: { __typename?: 'PageInfo'; endCursor: string; hasNextPage: boolean };
    edges: Array<{
      __typename?: 'TransferEdge';
      node: {
        __typename: 'Transfer';
        id: string;
        amount: any;
        timestamp: any;
        blockNumber: number;
        from: {
          __typename: 'Account';
          id: string;
          identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
        };
        to: {
          __typename: 'Account';
          id: string;
          identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
        };
      };
    }>;
  };
};

export type WotSearchByTextQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<AccountOrderByInput> | AccountOrderByInput>;
}>;

export type WotSearchByTextQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename: 'Account';
    id: string;
    identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
  }>;
};

export type WotSearchByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<AccountOrderByInput> | AccountOrderByInput>;
}>;

export type WotSearchByAddressQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename: 'Account';
    id: string;
    identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
  }>;
};

export type WotSearchLastQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<AccountOrderByInput> | AccountOrderByInput>;
  pending: Scalars['Boolean']['input'];
}>;

export type WotSearchLastQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename: 'Account';
    id: string;
    identity?: { __typename: 'Identity'; id: string; name: string; membership?: { __typename: 'Membership'; id: string } | null } | null;
  }>;
};

export const LightBlockFragmentDoc = gql`
  fragment LightBlock on Block {
    id
    height
    hash
    timestamp
    callsCount
    eventsCount
    extrinsicsCount
    __typename
  }
`;
export const LightIdentityFragmentDoc = gql`
  fragment LightIdentity on Identity {
    __typename
    id
    name
    membership {
      __typename
      id
    }
  }
`;
export const CertFragmentDoc = gql`
  fragment Cert on Cert {
    id
    __typename
    issuer {
      ...LightIdentity
    }
    receiver {
      ...LightIdentity
    }
    createdOn
    creation {
      blockNumber
    }
  }
  ${LightIdentityFragmentDoc}
`;
export const LightAccountFragmentDoc = gql`
  fragment LightAccount on Account {
    id
    __typename
    identity {
      ...LightIdentity
    }
  }
  ${LightIdentityFragmentDoc}
`;
export const TransferFragmentDoc = gql`
  fragment Transfer on Transfer {
    id
    __typename
    amount
    timestamp
    blockNumber
    from {
      ...LightAccount
    }
    to {
      ...LightAccount
    }
  }
  ${LightAccountFragmentDoc}
`;
export const BlockByIdDocument = gql`
  query BlockById($id: String!) {
    blockById(id: $id) {
      ...LightBlock
    }
  }
  ${LightBlockFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class BlockByIdGQL extends Apollo.Query<BlockByIdQuery, BlockByIdQueryVariables> {
  document = BlockByIdDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const BlocksDocument = gql`
  query Blocks($where: BlockWhereInput, $limit: Int!, $offset: Int!, $orderBy: [BlockOrderByInput!]) {
    blocks(limit: $limit, offset: $offset, orderBy: $orderBy, where: $where) {
      ...LightBlock
    }
  }
  ${LightBlockFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class BlocksGQL extends Apollo.Query<BlocksQuery, BlocksQueryVariables> {
  document = BlocksDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CertsConnectionByIssuerDocument = gql`
  query CertsConnectionByIssuer($address: String!, $limit: Int!, $orderBy: [CertOrderByInput!]!, $after: String) {
    certsConnection(first: $limit, after: $after, orderBy: $orderBy, where: { issuer: { id_eq: $address } }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Cert
        }
      }
    }
  }
  ${CertFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CertsConnectionByIssuerGQL extends Apollo.Query<CertsConnectionByIssuerQuery, CertsConnectionByIssuerQueryVariables> {
  document = CertsConnectionByIssuerDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CertsConnectionByReceiverDocument = gql`
  query CertsConnectionByReceiver($address: String!, $limit: Int!, $orderBy: [CertOrderByInput!]!, $after: String) {
    certsConnection(first: $limit, after: $after, orderBy: $orderBy, where: { receiver: { id_eq: $address } }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Cert
        }
      }
    }
  }
  ${CertFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CertsConnectionByReceiverGQL extends Apollo.Query<CertsConnectionByReceiverQuery, CertsConnectionByReceiverQueryVariables> {
  document = CertsConnectionByReceiverDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const TransfersConnectionByAddressDocument = gql`
  query TransfersConnectionByAddress($address: String!, $limit: Int!, $orderBy: [TransferOrderByInput!]!, $after: String) {
    transfersConnection(first: $limit, after: $after, orderBy: $orderBy, where: { from: { id_eq: $address }, OR: { to: { id_eq: $address } } }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Transfer
        }
      }
    }
  }
  ${TransferFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class TransfersConnectionByAddressGQL extends Apollo.Query<TransfersConnectionByAddressQuery, TransfersConnectionByAddressQueryVariables> {
  document = TransfersConnectionByAddressDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const WotSearchByTextDocument = gql`
  query WotSearchByText($searchText: String!, $limit: Int!, $offset: Int!, $orderBy: [AccountOrderByInput!]) {
    accounts(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      where: { id_startsWith: $searchText, OR: { identity: { name_containsInsensitive: $searchText } } }
    ) {
      ...LightAccount
    }
  }
  ${LightAccountFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class WotSearchByTextGQL extends Apollo.Query<WotSearchByTextQuery, WotSearchByTextQueryVariables> {
  document = WotSearchByTextDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const WotSearchByAddressDocument = gql`
  query WotSearchByAddress($address: String!, $limit: Int!, $offset: Int!, $orderBy: [AccountOrderByInput!]) {
    accounts(limit: $limit, offset: $offset, orderBy: $orderBy, where: { id_eq: $address }) {
      ...LightAccount
    }
  }
  ${LightAccountFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class WotSearchByAddressGQL extends Apollo.Query<WotSearchByAddressQuery, WotSearchByAddressQueryVariables> {
  document = WotSearchByAddressDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const WotSearchLastDocument = gql`
  query WotSearchLast($limit: Int!, $offset: Int!, $orderBy: [AccountOrderByInput!], $pending: Boolean!) {
    accounts(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      where: { identity: { id_isNull: false }, AND: { identity: { membership_isNull: $pending } } }
    ) {
      ...LightAccount
    }
  }
  ${LightAccountFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class WotSearchLastGQL extends Apollo.Query<WotSearchLastQuery, WotSearchLastQueryVariables> {
  document = WotSearchLastDocument;
  client = 'indexer';
  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

@Injectable({ providedIn: 'root' })
export class IndexerGraphqlService {
  constructor(
    private blockByIdGql: BlockByIdGQL,
    private blocksGql: BlocksGQL,
    private certsConnectionByIssuerGql: CertsConnectionByIssuerGQL,
    private certsConnectionByReceiverGql: CertsConnectionByReceiverGQL,
    private transfersConnectionByAddressGql: TransfersConnectionByAddressGQL,
    private wotSearchByTextGql: WotSearchByTextGQL,
    private wotSearchByAddressGql: WotSearchByAddressGQL,
    private wotSearchLastGql: WotSearchLastGQL
  ) {}

  blockById(variables: BlockByIdQueryVariables, options?: QueryOptionsAlone<BlockByIdQueryVariables>) {
    return this.blockByIdGql.fetch(variables, options);
  }

  blockByIdWatch(variables: BlockByIdQueryVariables, options?: WatchQueryOptionsAlone<BlockByIdQueryVariables>) {
    return this.blockByIdGql.watch(variables, options);
  }

  blocks(variables: BlocksQueryVariables, options?: QueryOptionsAlone<BlocksQueryVariables>) {
    return this.blocksGql.fetch(variables, options);
  }

  blocksWatch(variables: BlocksQueryVariables, options?: WatchQueryOptionsAlone<BlocksQueryVariables>) {
    return this.blocksGql.watch(variables, options);
  }

  certsConnectionByIssuer(variables: CertsConnectionByIssuerQueryVariables, options?: QueryOptionsAlone<CertsConnectionByIssuerQueryVariables>) {
    return this.certsConnectionByIssuerGql.fetch(variables, options);
  }

  certsConnectionByIssuerWatch(
    variables: CertsConnectionByIssuerQueryVariables,
    options?: WatchQueryOptionsAlone<CertsConnectionByIssuerQueryVariables>
  ) {
    return this.certsConnectionByIssuerGql.watch(variables, options);
  }

  certsConnectionByReceiver(
    variables: CertsConnectionByReceiverQueryVariables,
    options?: QueryOptionsAlone<CertsConnectionByReceiverQueryVariables>
  ) {
    return this.certsConnectionByReceiverGql.fetch(variables, options);
  }

  certsConnectionByReceiverWatch(
    variables: CertsConnectionByReceiverQueryVariables,
    options?: WatchQueryOptionsAlone<CertsConnectionByReceiverQueryVariables>
  ) {
    return this.certsConnectionByReceiverGql.watch(variables, options);
  }

  transfersConnectionByAddress(
    variables: TransfersConnectionByAddressQueryVariables,
    options?: QueryOptionsAlone<TransfersConnectionByAddressQueryVariables>
  ) {
    return this.transfersConnectionByAddressGql.fetch(variables, options);
  }

  transfersConnectionByAddressWatch(
    variables: TransfersConnectionByAddressQueryVariables,
    options?: WatchQueryOptionsAlone<TransfersConnectionByAddressQueryVariables>
  ) {
    return this.transfersConnectionByAddressGql.watch(variables, options);
  }

  wotSearchByText(variables: WotSearchByTextQueryVariables, options?: QueryOptionsAlone<WotSearchByTextQueryVariables>) {
    return this.wotSearchByTextGql.fetch(variables, options);
  }

  wotSearchByTextWatch(variables: WotSearchByTextQueryVariables, options?: WatchQueryOptionsAlone<WotSearchByTextQueryVariables>) {
    return this.wotSearchByTextGql.watch(variables, options);
  }

  wotSearchByAddress(variables: WotSearchByAddressQueryVariables, options?: QueryOptionsAlone<WotSearchByAddressQueryVariables>) {
    return this.wotSearchByAddressGql.fetch(variables, options);
  }

  wotSearchByAddressWatch(variables: WotSearchByAddressQueryVariables, options?: WatchQueryOptionsAlone<WotSearchByAddressQueryVariables>) {
    return this.wotSearchByAddressGql.watch(variables, options);
  }

  wotSearchLast(variables: WotSearchLastQueryVariables, options?: QueryOptionsAlone<WotSearchLastQueryVariables>) {
    return this.wotSearchLastGql.fetch(variables, options);
  }

  wotSearchLastWatch(variables: WotSearchLastQueryVariables, options?: WatchQueryOptionsAlone<WotSearchLastQueryVariables>) {
    return this.wotSearchLastGql.watch(variables, options);
  }
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
