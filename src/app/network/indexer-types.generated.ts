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
  IdentityCreatedOnAsc = 'identity_createdOn_ASC',
  IdentityCreatedOnAscNullsFirst = 'identity_createdOn_ASC_NULLS_FIRST',
  IdentityCreatedOnDesc = 'identity_createdOn_DESC',
  IdentityCreatedOnDescNullsLast = 'identity_createdOn_DESC_NULLS_LAST',
  IdentityExpireOnAsc = 'identity_expireOn_ASC',
  IdentityExpireOnAscNullsFirst = 'identity_expireOn_ASC_NULLS_FIRST',
  IdentityExpireOnDesc = 'identity_expireOn_DESC',
  IdentityExpireOnDescNullsLast = 'identity_expireOn_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityIsMemberAsc = 'identity_isMember_ASC',
  IdentityIsMemberAscNullsFirst = 'identity_isMember_ASC_NULLS_FIRST',
  IdentityIsMemberDesc = 'identity_isMember_DESC',
  IdentityIsMemberDescNullsLast = 'identity_isMember_DESC_NULLS_LAST',
  IdentityLastChangeOnAsc = 'identity_lastChangeOn_ASC',
  IdentityLastChangeOnAscNullsFirst = 'identity_lastChangeOn_ASC_NULLS_FIRST',
  IdentityLastChangeOnDesc = 'identity_lastChangeOn_DESC',
  IdentityLastChangeOnDescNullsLast = 'identity_lastChangeOn_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  IdentitySmithStatusAsc = 'identity_smithStatus_ASC',
  IdentitySmithStatusAscNullsFirst = 'identity_smithStatus_ASC_NULLS_FIRST',
  IdentitySmithStatusDesc = 'identity_smithStatus_DESC',
  IdentitySmithStatusDescNullsLast = 'identity_smithStatus_DESC_NULLS_LAST',
  IdentityStatusAsc = 'identity_status_ASC',
  IdentityStatusAscNullsFirst = 'identity_status_ASC_NULLS_FIRST',
  IdentityStatusDesc = 'identity_status_DESC',
  IdentityStatusDescNullsLast = 'identity_status_DESC_NULLS_LAST',
  LinkedIdentityCreatedOnAsc = 'linkedIdentity_createdOn_ASC',
  LinkedIdentityCreatedOnAscNullsFirst = 'linkedIdentity_createdOn_ASC_NULLS_FIRST',
  LinkedIdentityCreatedOnDesc = 'linkedIdentity_createdOn_DESC',
  LinkedIdentityCreatedOnDescNullsLast = 'linkedIdentity_createdOn_DESC_NULLS_LAST',
  LinkedIdentityExpireOnAsc = 'linkedIdentity_expireOn_ASC',
  LinkedIdentityExpireOnAscNullsFirst = 'linkedIdentity_expireOn_ASC_NULLS_FIRST',
  LinkedIdentityExpireOnDesc = 'linkedIdentity_expireOn_DESC',
  LinkedIdentityExpireOnDescNullsLast = 'linkedIdentity_expireOn_DESC_NULLS_LAST',
  LinkedIdentityIdAsc = 'linkedIdentity_id_ASC',
  LinkedIdentityIdAscNullsFirst = 'linkedIdentity_id_ASC_NULLS_FIRST',
  LinkedIdentityIdDesc = 'linkedIdentity_id_DESC',
  LinkedIdentityIdDescNullsLast = 'linkedIdentity_id_DESC_NULLS_LAST',
  LinkedIdentityIndexAsc = 'linkedIdentity_index_ASC',
  LinkedIdentityIndexAscNullsFirst = 'linkedIdentity_index_ASC_NULLS_FIRST',
  LinkedIdentityIndexDesc = 'linkedIdentity_index_DESC',
  LinkedIdentityIndexDescNullsLast = 'linkedIdentity_index_DESC_NULLS_LAST',
  LinkedIdentityIsMemberAsc = 'linkedIdentity_isMember_ASC',
  LinkedIdentityIsMemberAscNullsFirst = 'linkedIdentity_isMember_ASC_NULLS_FIRST',
  LinkedIdentityIsMemberDesc = 'linkedIdentity_isMember_DESC',
  LinkedIdentityIsMemberDescNullsLast = 'linkedIdentity_isMember_DESC_NULLS_LAST',
  LinkedIdentityLastChangeOnAsc = 'linkedIdentity_lastChangeOn_ASC',
  LinkedIdentityLastChangeOnAscNullsFirst = 'linkedIdentity_lastChangeOn_ASC_NULLS_FIRST',
  LinkedIdentityLastChangeOnDesc = 'linkedIdentity_lastChangeOn_DESC',
  LinkedIdentityLastChangeOnDescNullsLast = 'linkedIdentity_lastChangeOn_DESC_NULLS_LAST',
  LinkedIdentityNameAsc = 'linkedIdentity_name_ASC',
  LinkedIdentityNameAscNullsFirst = 'linkedIdentity_name_ASC_NULLS_FIRST',
  LinkedIdentityNameDesc = 'linkedIdentity_name_DESC',
  LinkedIdentityNameDescNullsLast = 'linkedIdentity_name_DESC_NULLS_LAST',
  LinkedIdentitySmithStatusAsc = 'linkedIdentity_smithStatus_ASC',
  LinkedIdentitySmithStatusAscNullsFirst = 'linkedIdentity_smithStatus_ASC_NULLS_FIRST',
  LinkedIdentitySmithStatusDesc = 'linkedIdentity_smithStatus_DESC',
  LinkedIdentitySmithStatusDescNullsLast = 'linkedIdentity_smithStatus_DESC_NULLS_LAST',
  LinkedIdentityStatusAsc = 'linkedIdentity_status_ASC',
  LinkedIdentityStatusAscNullsFirst = 'linkedIdentity_status_ASC_NULLS_FIRST',
  LinkedIdentityStatusDesc = 'linkedIdentity_status_DESC',
  LinkedIdentityStatusDescNullsLast = 'linkedIdentity_status_DESC_NULLS_LAST',
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
  certHistory: Array<CertEvent>;
  /** the last createdOn value */
  createdOn: Scalars['Int']['output'];
  /** the current expireOn value */
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  /** whether the certification is currently active or not */
  isActive: Scalars['Boolean']['output'];
  issuer: Identity;
  receiver: Identity;
};

/** Certification */
export type CertCertHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderByInput>>;
  where?: InputMaybe<CertEventWhereInput>;
};

export type CertEdge = {
  __typename?: 'CertEdge';
  cursor: Scalars['String']['output'];
  node: Cert;
};

/** Certification event */
export type CertEvent = {
  __typename?: 'CertEvent';
  blockNumber: Scalars['Int']['output'];
  cert: Cert;
  event: Event;
  eventType: EventType;
  id: Scalars['String']['output'];
};

export type CertEventEdge = {
  __typename?: 'CertEventEdge';
  cursor: Scalars['String']['output'];
  node: CertEvent;
};

export enum CertEventOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
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
  CertIsActiveAsc = 'cert_isActive_ASC',
  CertIsActiveAscNullsFirst = 'cert_isActive_ASC_NULLS_FIRST',
  CertIsActiveDesc = 'cert_isActive_DESC',
  CertIsActiveDescNullsLast = 'cert_isActive_DESC_NULLS_LAST',
  EventTypeAsc = 'eventType_ASC',
  EventTypeAscNullsFirst = 'eventType_ASC_NULLS_FIRST',
  EventTypeDesc = 'eventType_DESC',
  EventTypeDescNullsLast = 'eventType_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIndexAsc = 'event_index_ASC',
  EventIndexAscNullsFirst = 'event_index_ASC_NULLS_FIRST',
  EventIndexDesc = 'event_index_DESC',
  EventIndexDescNullsLast = 'event_index_DESC_NULLS_LAST',
  EventNameAsc = 'event_name_ASC',
  EventNameAscNullsFirst = 'event_name_ASC_NULLS_FIRST',
  EventNameDesc = 'event_name_DESC',
  EventNameDescNullsLast = 'event_name_DESC_NULLS_LAST',
  EventPalletAsc = 'event_pallet_ASC',
  EventPalletAscNullsFirst = 'event_pallet_ASC_NULLS_FIRST',
  EventPalletDesc = 'event_pallet_DESC',
  EventPalletDescNullsLast = 'event_pallet_DESC_NULLS_LAST',
  EventPhaseAsc = 'event_phase_ASC',
  EventPhaseAscNullsFirst = 'event_phase_ASC_NULLS_FIRST',
  EventPhaseDesc = 'event_phase_DESC',
  EventPhaseDescNullsLast = 'event_phase_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type CertEventWhereInput = {
  AND?: InputMaybe<Array<CertEventWhereInput>>;
  OR?: InputMaybe<Array<CertEventWhereInput>>;
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
  event?: InputMaybe<EventWhereInput>;
  eventType_eq?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventType_not_eq?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type CertEventsConnection = {
  __typename?: 'CertEventsConnection';
  edges: Array<CertEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum CertOrderByInput {
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
  IsActiveAsc = 'isActive_ASC',
  IsActiveAscNullsFirst = 'isActive_ASC_NULLS_FIRST',
  IsActiveDesc = 'isActive_DESC',
  IsActiveDescNullsLast = 'isActive_DESC_NULLS_LAST',
  IssuerCreatedOnAsc = 'issuer_createdOn_ASC',
  IssuerCreatedOnAscNullsFirst = 'issuer_createdOn_ASC_NULLS_FIRST',
  IssuerCreatedOnDesc = 'issuer_createdOn_DESC',
  IssuerCreatedOnDescNullsLast = 'issuer_createdOn_DESC_NULLS_LAST',
  IssuerExpireOnAsc = 'issuer_expireOn_ASC',
  IssuerExpireOnAscNullsFirst = 'issuer_expireOn_ASC_NULLS_FIRST',
  IssuerExpireOnDesc = 'issuer_expireOn_DESC',
  IssuerExpireOnDescNullsLast = 'issuer_expireOn_DESC_NULLS_LAST',
  IssuerIdAsc = 'issuer_id_ASC',
  IssuerIdAscNullsFirst = 'issuer_id_ASC_NULLS_FIRST',
  IssuerIdDesc = 'issuer_id_DESC',
  IssuerIdDescNullsLast = 'issuer_id_DESC_NULLS_LAST',
  IssuerIndexAsc = 'issuer_index_ASC',
  IssuerIndexAscNullsFirst = 'issuer_index_ASC_NULLS_FIRST',
  IssuerIndexDesc = 'issuer_index_DESC',
  IssuerIndexDescNullsLast = 'issuer_index_DESC_NULLS_LAST',
  IssuerIsMemberAsc = 'issuer_isMember_ASC',
  IssuerIsMemberAscNullsFirst = 'issuer_isMember_ASC_NULLS_FIRST',
  IssuerIsMemberDesc = 'issuer_isMember_DESC',
  IssuerIsMemberDescNullsLast = 'issuer_isMember_DESC_NULLS_LAST',
  IssuerLastChangeOnAsc = 'issuer_lastChangeOn_ASC',
  IssuerLastChangeOnAscNullsFirst = 'issuer_lastChangeOn_ASC_NULLS_FIRST',
  IssuerLastChangeOnDesc = 'issuer_lastChangeOn_DESC',
  IssuerLastChangeOnDescNullsLast = 'issuer_lastChangeOn_DESC_NULLS_LAST',
  IssuerNameAsc = 'issuer_name_ASC',
  IssuerNameAscNullsFirst = 'issuer_name_ASC_NULLS_FIRST',
  IssuerNameDesc = 'issuer_name_DESC',
  IssuerNameDescNullsLast = 'issuer_name_DESC_NULLS_LAST',
  IssuerSmithStatusAsc = 'issuer_smithStatus_ASC',
  IssuerSmithStatusAscNullsFirst = 'issuer_smithStatus_ASC_NULLS_FIRST',
  IssuerSmithStatusDesc = 'issuer_smithStatus_DESC',
  IssuerSmithStatusDescNullsLast = 'issuer_smithStatus_DESC_NULLS_LAST',
  IssuerStatusAsc = 'issuer_status_ASC',
  IssuerStatusAscNullsFirst = 'issuer_status_ASC_NULLS_FIRST',
  IssuerStatusDesc = 'issuer_status_DESC',
  IssuerStatusDescNullsLast = 'issuer_status_DESC_NULLS_LAST',
  ReceiverCreatedOnAsc = 'receiver_createdOn_ASC',
  ReceiverCreatedOnAscNullsFirst = 'receiver_createdOn_ASC_NULLS_FIRST',
  ReceiverCreatedOnDesc = 'receiver_createdOn_DESC',
  ReceiverCreatedOnDescNullsLast = 'receiver_createdOn_DESC_NULLS_LAST',
  ReceiverExpireOnAsc = 'receiver_expireOn_ASC',
  ReceiverExpireOnAscNullsFirst = 'receiver_expireOn_ASC_NULLS_FIRST',
  ReceiverExpireOnDesc = 'receiver_expireOn_DESC',
  ReceiverExpireOnDescNullsLast = 'receiver_expireOn_DESC_NULLS_LAST',
  ReceiverIdAsc = 'receiver_id_ASC',
  ReceiverIdAscNullsFirst = 'receiver_id_ASC_NULLS_FIRST',
  ReceiverIdDesc = 'receiver_id_DESC',
  ReceiverIdDescNullsLast = 'receiver_id_DESC_NULLS_LAST',
  ReceiverIndexAsc = 'receiver_index_ASC',
  ReceiverIndexAscNullsFirst = 'receiver_index_ASC_NULLS_FIRST',
  ReceiverIndexDesc = 'receiver_index_DESC',
  ReceiverIndexDescNullsLast = 'receiver_index_DESC_NULLS_LAST',
  ReceiverIsMemberAsc = 'receiver_isMember_ASC',
  ReceiverIsMemberAscNullsFirst = 'receiver_isMember_ASC_NULLS_FIRST',
  ReceiverIsMemberDesc = 'receiver_isMember_DESC',
  ReceiverIsMemberDescNullsLast = 'receiver_isMember_DESC_NULLS_LAST',
  ReceiverLastChangeOnAsc = 'receiver_lastChangeOn_ASC',
  ReceiverLastChangeOnAscNullsFirst = 'receiver_lastChangeOn_ASC_NULLS_FIRST',
  ReceiverLastChangeOnDesc = 'receiver_lastChangeOn_DESC',
  ReceiverLastChangeOnDescNullsLast = 'receiver_lastChangeOn_DESC_NULLS_LAST',
  ReceiverNameAsc = 'receiver_name_ASC',
  ReceiverNameAscNullsFirst = 'receiver_name_ASC_NULLS_FIRST',
  ReceiverNameDesc = 'receiver_name_DESC',
  ReceiverNameDescNullsLast = 'receiver_name_DESC_NULLS_LAST',
  ReceiverSmithStatusAsc = 'receiver_smithStatus_ASC',
  ReceiverSmithStatusAscNullsFirst = 'receiver_smithStatus_ASC_NULLS_FIRST',
  ReceiverSmithStatusDesc = 'receiver_smithStatus_DESC',
  ReceiverSmithStatusDescNullsLast = 'receiver_smithStatus_DESC_NULLS_LAST',
  ReceiverStatusAsc = 'receiver_status_ASC',
  ReceiverStatusAscNullsFirst = 'receiver_status_ASC_NULLS_FIRST',
  ReceiverStatusDesc = 'receiver_status_DESC',
  ReceiverStatusDescNullsLast = 'receiver_status_DESC_NULLS_LAST',
}

export type CertWhereInput = {
  AND?: InputMaybe<Array<CertWhereInput>>;
  OR?: InputMaybe<Array<CertWhereInput>>;
  certHistory_every?: InputMaybe<CertEventWhereInput>;
  certHistory_none?: InputMaybe<CertEventWhereInput>;
  certHistory_some?: InputMaybe<CertEventWhereInput>;
  createdOn_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_lt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_lte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  isActive_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  issuer?: InputMaybe<IdentityWhereInput>;
  issuer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver?: InputMaybe<IdentityWhereInput>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  IdentityCreatedOnAsc = 'identity_createdOn_ASC',
  IdentityCreatedOnAscNullsFirst = 'identity_createdOn_ASC_NULLS_FIRST',
  IdentityCreatedOnDesc = 'identity_createdOn_DESC',
  IdentityCreatedOnDescNullsLast = 'identity_createdOn_DESC_NULLS_LAST',
  IdentityExpireOnAsc = 'identity_expireOn_ASC',
  IdentityExpireOnAscNullsFirst = 'identity_expireOn_ASC_NULLS_FIRST',
  IdentityExpireOnDesc = 'identity_expireOn_DESC',
  IdentityExpireOnDescNullsLast = 'identity_expireOn_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityIsMemberAsc = 'identity_isMember_ASC',
  IdentityIsMemberAscNullsFirst = 'identity_isMember_ASC_NULLS_FIRST',
  IdentityIsMemberDesc = 'identity_isMember_DESC',
  IdentityIsMemberDescNullsLast = 'identity_isMember_DESC_NULLS_LAST',
  IdentityLastChangeOnAsc = 'identity_lastChangeOn_ASC',
  IdentityLastChangeOnAscNullsFirst = 'identity_lastChangeOn_ASC_NULLS_FIRST',
  IdentityLastChangeOnDesc = 'identity_lastChangeOn_DESC',
  IdentityLastChangeOnDescNullsLast = 'identity_lastChangeOn_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  IdentitySmithStatusAsc = 'identity_smithStatus_ASC',
  IdentitySmithStatusAscNullsFirst = 'identity_smithStatus_ASC_NULLS_FIRST',
  IdentitySmithStatusDesc = 'identity_smithStatus_DESC',
  IdentitySmithStatusDescNullsLast = 'identity_smithStatus_DESC_NULLS_LAST',
  IdentityStatusAsc = 'identity_status_ASC',
  IdentityStatusAscNullsFirst = 'identity_status_ASC_NULLS_FIRST',
  IdentityStatusDesc = 'identity_status_DESC',
  IdentityStatusDescNullsLast = 'identity_status_DESC_NULLS_LAST',
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

export enum EventType {
  Creation = 'CREATION',
  Removal = 'REMOVAL',
  Renewal = 'RENEWAL',
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
  /** Event corresponding of identity creation event */
  createdIn: Event;
  /** Block number of identity creation event */
  createdOn: Scalars['Int']['output'];
  /** the current expireOn value */
  expireOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  /** Identity index */
  index: Scalars['Int']['output'];
  /** True if the identity is a member */
  isMember: Scalars['Boolean']['output'];
  /** Block number of last identity, changeOwnerKey and membership event */
  lastChangeOn: Scalars['Int']['output'];
  /** linked accounts */
  linkedAccount: Array<Account>;
  /** history of the membership changes events */
  membershipHistory: Array<MembershipEvent>;
  /** Name */
  name: Scalars['String']['output'];
  /** Owner key changes */
  ownerKeyChange: Array<ChangeOwnerKey>;
  /** Smith certifications issued */
  smithCertIssued: Array<SmithCert>;
  /** Smith certifications received */
  smithCertReceived: Array<SmithCert>;
  /** Smith status of the identity */
  smithStatus?: Maybe<SmithStatus>;
  /** Status of the identity */
  status: IdentityStatus;
  /** Universal Dividend history */
  udHistory: Array<UdHistory>;
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
export type IdentityMembershipHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderByInput>>;
  where?: InputMaybe<MembershipEventWhereInput>;
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

/** Identity */
export type IdentityUdHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
  orderBy?: InputMaybe<OrderByEnum>;
  where?: InputMaybe<UdHistoryFilterInput>;
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
  CreatedInIdAsc = 'createdIn_id_ASC',
  CreatedInIdAscNullsFirst = 'createdIn_id_ASC_NULLS_FIRST',
  CreatedInIdDesc = 'createdIn_id_DESC',
  CreatedInIdDescNullsLast = 'createdIn_id_DESC_NULLS_LAST',
  CreatedInIndexAsc = 'createdIn_index_ASC',
  CreatedInIndexAscNullsFirst = 'createdIn_index_ASC_NULLS_FIRST',
  CreatedInIndexDesc = 'createdIn_index_DESC',
  CreatedInIndexDescNullsLast = 'createdIn_index_DESC_NULLS_LAST',
  CreatedInNameAsc = 'createdIn_name_ASC',
  CreatedInNameAscNullsFirst = 'createdIn_name_ASC_NULLS_FIRST',
  CreatedInNameDesc = 'createdIn_name_DESC',
  CreatedInNameDescNullsLast = 'createdIn_name_DESC_NULLS_LAST',
  CreatedInPalletAsc = 'createdIn_pallet_ASC',
  CreatedInPalletAscNullsFirst = 'createdIn_pallet_ASC_NULLS_FIRST',
  CreatedInPalletDesc = 'createdIn_pallet_DESC',
  CreatedInPalletDescNullsLast = 'createdIn_pallet_DESC_NULLS_LAST',
  CreatedInPhaseAsc = 'createdIn_phase_ASC',
  CreatedInPhaseAscNullsFirst = 'createdIn_phase_ASC_NULLS_FIRST',
  CreatedInPhaseDesc = 'createdIn_phase_DESC',
  CreatedInPhaseDescNullsLast = 'createdIn_phase_DESC_NULLS_LAST',
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
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  IsMemberAsc = 'isMember_ASC',
  IsMemberAscNullsFirst = 'isMember_ASC_NULLS_FIRST',
  IsMemberDesc = 'isMember_DESC',
  IsMemberDescNullsLast = 'isMember_DESC_NULLS_LAST',
  LastChangeOnAsc = 'lastChangeOn_ASC',
  LastChangeOnAscNullsFirst = 'lastChangeOn_ASC_NULLS_FIRST',
  LastChangeOnDesc = 'lastChangeOn_DESC',
  LastChangeOnDescNullsLast = 'lastChangeOn_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SmithStatusAsc = 'smithStatus_ASC',
  SmithStatusAscNullsFirst = 'smithStatus_ASC_NULLS_FIRST',
  SmithStatusDesc = 'smithStatus_DESC',
  SmithStatusDescNullsLast = 'smithStatus_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
}

/** identity status directly linked to Duniter IdtyStatus */
export enum IdentityStatus {
  Member = 'Member',
  NotMember = 'NotMember',
  Removed = 'Removed',
  Revoked = 'Revoked',
  Unconfirmed = 'Unconfirmed',
  Unvalidated = 'Unvalidated',
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
  createdIn?: InputMaybe<EventWhereInput>;
  createdIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_lt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_lte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isMember_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isMember_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isMember_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  lastChangeOn_eq?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_gt?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_gte?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastChangeOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastChangeOn_lt?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_lte?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastChangeOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  linkedAccount_every?: InputMaybe<AccountWhereInput>;
  linkedAccount_none?: InputMaybe<AccountWhereInput>;
  linkedAccount_some?: InputMaybe<AccountWhereInput>;
  membershipHistory_every?: InputMaybe<MembershipEventWhereInput>;
  membershipHistory_none?: InputMaybe<MembershipEventWhereInput>;
  membershipHistory_some?: InputMaybe<MembershipEventWhereInput>;
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
  smithStatus_eq?: InputMaybe<SmithStatus>;
  smithStatus_in?: InputMaybe<Array<SmithStatus>>;
  smithStatus_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  smithStatus_not_eq?: InputMaybe<SmithStatus>;
  smithStatus_not_in?: InputMaybe<Array<SmithStatus>>;
  status_eq?: InputMaybe<IdentityStatus>;
  status_in?: InputMaybe<Array<IdentityStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<IdentityStatus>;
  status_not_in?: InputMaybe<Array<IdentityStatus>>;
  udHistory_every?: InputMaybe<UdHistoryWhereInput>;
  udHistory_none?: InputMaybe<UdHistoryWhereInput>;
  udHistory_some?: InputMaybe<UdHistoryWhereInput>;
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

export type MembershipEvent = {
  __typename?: 'MembershipEvent';
  blockNumber: Scalars['Int']['output'];
  event: Event;
  eventType: EventType;
  id: Scalars['String']['output'];
  identity: Identity;
};

export type MembershipEventEdge = {
  __typename?: 'MembershipEventEdge';
  cursor: Scalars['String']['output'];
  node: MembershipEvent;
};

export enum MembershipEventOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventTypeAsc = 'eventType_ASC',
  EventTypeAscNullsFirst = 'eventType_ASC_NULLS_FIRST',
  EventTypeDesc = 'eventType_DESC',
  EventTypeDescNullsLast = 'eventType_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIndexAsc = 'event_index_ASC',
  EventIndexAscNullsFirst = 'event_index_ASC_NULLS_FIRST',
  EventIndexDesc = 'event_index_DESC',
  EventIndexDescNullsLast = 'event_index_DESC_NULLS_LAST',
  EventNameAsc = 'event_name_ASC',
  EventNameAscNullsFirst = 'event_name_ASC_NULLS_FIRST',
  EventNameDesc = 'event_name_DESC',
  EventNameDescNullsLast = 'event_name_DESC_NULLS_LAST',
  EventPalletAsc = 'event_pallet_ASC',
  EventPalletAscNullsFirst = 'event_pallet_ASC_NULLS_FIRST',
  EventPalletDesc = 'event_pallet_DESC',
  EventPalletDescNullsLast = 'event_pallet_DESC_NULLS_LAST',
  EventPhaseAsc = 'event_phase_ASC',
  EventPhaseAscNullsFirst = 'event_phase_ASC_NULLS_FIRST',
  EventPhaseDesc = 'event_phase_DESC',
  EventPhaseDescNullsLast = 'event_phase_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityCreatedOnAsc = 'identity_createdOn_ASC',
  IdentityCreatedOnAscNullsFirst = 'identity_createdOn_ASC_NULLS_FIRST',
  IdentityCreatedOnDesc = 'identity_createdOn_DESC',
  IdentityCreatedOnDescNullsLast = 'identity_createdOn_DESC_NULLS_LAST',
  IdentityExpireOnAsc = 'identity_expireOn_ASC',
  IdentityExpireOnAscNullsFirst = 'identity_expireOn_ASC_NULLS_FIRST',
  IdentityExpireOnDesc = 'identity_expireOn_DESC',
  IdentityExpireOnDescNullsLast = 'identity_expireOn_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityIsMemberAsc = 'identity_isMember_ASC',
  IdentityIsMemberAscNullsFirst = 'identity_isMember_ASC_NULLS_FIRST',
  IdentityIsMemberDesc = 'identity_isMember_DESC',
  IdentityIsMemberDescNullsLast = 'identity_isMember_DESC_NULLS_LAST',
  IdentityLastChangeOnAsc = 'identity_lastChangeOn_ASC',
  IdentityLastChangeOnAscNullsFirst = 'identity_lastChangeOn_ASC_NULLS_FIRST',
  IdentityLastChangeOnDesc = 'identity_lastChangeOn_DESC',
  IdentityLastChangeOnDescNullsLast = 'identity_lastChangeOn_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  IdentitySmithStatusAsc = 'identity_smithStatus_ASC',
  IdentitySmithStatusAscNullsFirst = 'identity_smithStatus_ASC_NULLS_FIRST',
  IdentitySmithStatusDesc = 'identity_smithStatus_DESC',
  IdentitySmithStatusDescNullsLast = 'identity_smithStatus_DESC_NULLS_LAST',
  IdentityStatusAsc = 'identity_status_ASC',
  IdentityStatusAscNullsFirst = 'identity_status_ASC_NULLS_FIRST',
  IdentityStatusDesc = 'identity_status_DESC',
  IdentityStatusDescNullsLast = 'identity_status_DESC_NULLS_LAST',
}

export type MembershipEventWhereInput = {
  AND?: InputMaybe<Array<MembershipEventWhereInput>>;
  OR?: InputMaybe<Array<MembershipEventWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  eventType_eq?: InputMaybe<EventType>;
  eventType_in?: InputMaybe<Array<EventType>>;
  eventType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventType_not_eq?: InputMaybe<EventType>;
  eventType_not_in?: InputMaybe<Array<EventType>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type MembershipEventsConnection = {
  __typename?: 'MembershipEventsConnection';
  edges: Array<MembershipEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NumberFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
};

/** The basic directions for order by */
export enum OrderByEnum {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberDesc = 'blockNumber_DESC',
}

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
  certEventById?: Maybe<CertEvent>;
  /** @deprecated Use certEventById */
  certEventByUniqueInput?: Maybe<CertEvent>;
  certEvents: Array<CertEvent>;
  certEventsConnection: CertEventsConnection;
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
  galuel: Scalars['String']['output'];
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
  membershipEventById?: Maybe<MembershipEvent>;
  /** @deprecated Use membershipEventById */
  membershipEventByUniqueInput?: Maybe<MembershipEvent>;
  membershipEvents: Array<MembershipEvent>;
  membershipEventsConnection: MembershipEventsConnection;
  smithCertById?: Maybe<SmithCert>;
  /** @deprecated Use smithCertById */
  smithCertByUniqueInput?: Maybe<SmithCert>;
  smithCerts: Array<SmithCert>;
  smithCertsConnection: SmithCertsConnection;
  squidStatus?: Maybe<SquidStatus>;
  transferById?: Maybe<Transfer>;
  /** @deprecated Use transferById */
  transferByUniqueInput?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
  udHistories: Array<UdHistory>;
  udHistoriesConnection: UdHistoriesConnection;
  udHistoryById?: Maybe<UdHistory>;
  /** @deprecated Use udHistoryById */
  udHistoryByUniqueInput?: Maybe<UdHistory>;
  udReevalById?: Maybe<UdReeval>;
  /** @deprecated Use udReevalById */
  udReevalByUniqueInput?: Maybe<UdReeval>;
  udReevals: Array<UdReeval>;
  udReevalsConnection: UdReevalsConnection;
  universalDividendById?: Maybe<UniversalDividend>;
  /** @deprecated Use universalDividendById */
  universalDividendByUniqueInput?: Maybe<UniversalDividend>;
  universalDividends: Array<UniversalDividend>;
  universalDividendsConnection: UniversalDividendsConnection;
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

export type QueryCertEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryCertEventByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryCertEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderByInput>>;
  where?: InputMaybe<CertEventWhereInput>;
};

export type QueryCertEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CertEventOrderByInput>;
  where?: InputMaybe<CertEventWhereInput>;
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

export type QueryMembershipEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryMembershipEventByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryMembershipEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderByInput>>;
  where?: InputMaybe<MembershipEventWhereInput>;
};

export type QueryMembershipEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MembershipEventOrderByInput>;
  where?: InputMaybe<MembershipEventWhereInput>;
};

export type QuerySmithCertByIdArgs = {
  id: Scalars['String']['input'];
};

export type QuerySmithCertByUniqueInputArgs = {
  where: WhereIdInput;
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

export type QueryUdHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderByInput>>;
  where?: InputMaybe<UdHistoryWhereInput>;
};

export type QueryUdHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<UdHistoryOrderByInput>;
  where?: InputMaybe<UdHistoryWhereInput>;
};

export type QueryUdHistoryByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryUdHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryUdReevalByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryUdReevalByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryUdReevalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdReevalOrderByInput>>;
  where?: InputMaybe<UdReevalWhereInput>;
};

export type QueryUdReevalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<UdReevalOrderByInput>;
  where?: InputMaybe<UdReevalWhereInput>;
};

export type QueryUniversalDividendByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryUniversalDividendByUniqueInputArgs = {
  where: WhereIdInput;
};

export type QueryUniversalDividendsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UniversalDividendOrderByInput>>;
  where?: InputMaybe<UniversalDividendWhereInput>;
};

export type QueryUniversalDividendsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<UniversalDividendOrderByInput>;
  where?: InputMaybe<UniversalDividendWhereInput>;
};

/** Smith certification */
export type SmithCert = {
  __typename?: 'SmithCert';
  createdOn: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  issuer: Identity;
  receiver: Identity;
};

export type SmithCertEdge = {
  __typename?: 'SmithCertEdge';
  cursor: Scalars['String']['output'];
  node: SmithCert;
};

export enum SmithCertOrderByInput {
  CreatedOnAsc = 'createdOn_ASC',
  CreatedOnAscNullsFirst = 'createdOn_ASC_NULLS_FIRST',
  CreatedOnDesc = 'createdOn_DESC',
  CreatedOnDescNullsLast = 'createdOn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IssuerCreatedOnAsc = 'issuer_createdOn_ASC',
  IssuerCreatedOnAscNullsFirst = 'issuer_createdOn_ASC_NULLS_FIRST',
  IssuerCreatedOnDesc = 'issuer_createdOn_DESC',
  IssuerCreatedOnDescNullsLast = 'issuer_createdOn_DESC_NULLS_LAST',
  IssuerExpireOnAsc = 'issuer_expireOn_ASC',
  IssuerExpireOnAscNullsFirst = 'issuer_expireOn_ASC_NULLS_FIRST',
  IssuerExpireOnDesc = 'issuer_expireOn_DESC',
  IssuerExpireOnDescNullsLast = 'issuer_expireOn_DESC_NULLS_LAST',
  IssuerIdAsc = 'issuer_id_ASC',
  IssuerIdAscNullsFirst = 'issuer_id_ASC_NULLS_FIRST',
  IssuerIdDesc = 'issuer_id_DESC',
  IssuerIdDescNullsLast = 'issuer_id_DESC_NULLS_LAST',
  IssuerIndexAsc = 'issuer_index_ASC',
  IssuerIndexAscNullsFirst = 'issuer_index_ASC_NULLS_FIRST',
  IssuerIndexDesc = 'issuer_index_DESC',
  IssuerIndexDescNullsLast = 'issuer_index_DESC_NULLS_LAST',
  IssuerIsMemberAsc = 'issuer_isMember_ASC',
  IssuerIsMemberAscNullsFirst = 'issuer_isMember_ASC_NULLS_FIRST',
  IssuerIsMemberDesc = 'issuer_isMember_DESC',
  IssuerIsMemberDescNullsLast = 'issuer_isMember_DESC_NULLS_LAST',
  IssuerLastChangeOnAsc = 'issuer_lastChangeOn_ASC',
  IssuerLastChangeOnAscNullsFirst = 'issuer_lastChangeOn_ASC_NULLS_FIRST',
  IssuerLastChangeOnDesc = 'issuer_lastChangeOn_DESC',
  IssuerLastChangeOnDescNullsLast = 'issuer_lastChangeOn_DESC_NULLS_LAST',
  IssuerNameAsc = 'issuer_name_ASC',
  IssuerNameAscNullsFirst = 'issuer_name_ASC_NULLS_FIRST',
  IssuerNameDesc = 'issuer_name_DESC',
  IssuerNameDescNullsLast = 'issuer_name_DESC_NULLS_LAST',
  IssuerSmithStatusAsc = 'issuer_smithStatus_ASC',
  IssuerSmithStatusAscNullsFirst = 'issuer_smithStatus_ASC_NULLS_FIRST',
  IssuerSmithStatusDesc = 'issuer_smithStatus_DESC',
  IssuerSmithStatusDescNullsLast = 'issuer_smithStatus_DESC_NULLS_LAST',
  IssuerStatusAsc = 'issuer_status_ASC',
  IssuerStatusAscNullsFirst = 'issuer_status_ASC_NULLS_FIRST',
  IssuerStatusDesc = 'issuer_status_DESC',
  IssuerStatusDescNullsLast = 'issuer_status_DESC_NULLS_LAST',
  ReceiverCreatedOnAsc = 'receiver_createdOn_ASC',
  ReceiverCreatedOnAscNullsFirst = 'receiver_createdOn_ASC_NULLS_FIRST',
  ReceiverCreatedOnDesc = 'receiver_createdOn_DESC',
  ReceiverCreatedOnDescNullsLast = 'receiver_createdOn_DESC_NULLS_LAST',
  ReceiverExpireOnAsc = 'receiver_expireOn_ASC',
  ReceiverExpireOnAscNullsFirst = 'receiver_expireOn_ASC_NULLS_FIRST',
  ReceiverExpireOnDesc = 'receiver_expireOn_DESC',
  ReceiverExpireOnDescNullsLast = 'receiver_expireOn_DESC_NULLS_LAST',
  ReceiverIdAsc = 'receiver_id_ASC',
  ReceiverIdAscNullsFirst = 'receiver_id_ASC_NULLS_FIRST',
  ReceiverIdDesc = 'receiver_id_DESC',
  ReceiverIdDescNullsLast = 'receiver_id_DESC_NULLS_LAST',
  ReceiverIndexAsc = 'receiver_index_ASC',
  ReceiverIndexAscNullsFirst = 'receiver_index_ASC_NULLS_FIRST',
  ReceiverIndexDesc = 'receiver_index_DESC',
  ReceiverIndexDescNullsLast = 'receiver_index_DESC_NULLS_LAST',
  ReceiverIsMemberAsc = 'receiver_isMember_ASC',
  ReceiverIsMemberAscNullsFirst = 'receiver_isMember_ASC_NULLS_FIRST',
  ReceiverIsMemberDesc = 'receiver_isMember_DESC',
  ReceiverIsMemberDescNullsLast = 'receiver_isMember_DESC_NULLS_LAST',
  ReceiverLastChangeOnAsc = 'receiver_lastChangeOn_ASC',
  ReceiverLastChangeOnAscNullsFirst = 'receiver_lastChangeOn_ASC_NULLS_FIRST',
  ReceiverLastChangeOnDesc = 'receiver_lastChangeOn_DESC',
  ReceiverLastChangeOnDescNullsLast = 'receiver_lastChangeOn_DESC_NULLS_LAST',
  ReceiverNameAsc = 'receiver_name_ASC',
  ReceiverNameAscNullsFirst = 'receiver_name_ASC_NULLS_FIRST',
  ReceiverNameDesc = 'receiver_name_DESC',
  ReceiverNameDescNullsLast = 'receiver_name_DESC_NULLS_LAST',
  ReceiverSmithStatusAsc = 'receiver_smithStatus_ASC',
  ReceiverSmithStatusAscNullsFirst = 'receiver_smithStatus_ASC_NULLS_FIRST',
  ReceiverSmithStatusDesc = 'receiver_smithStatus_DESC',
  ReceiverSmithStatusDescNullsLast = 'receiver_smithStatus_DESC_NULLS_LAST',
  ReceiverStatusAsc = 'receiver_status_ASC',
  ReceiverStatusAscNullsFirst = 'receiver_status_ASC_NULLS_FIRST',
  ReceiverStatusDesc = 'receiver_status_DESC',
  ReceiverStatusDescNullsLast = 'receiver_status_DESC_NULLS_LAST',
}

export type SmithCertWhereInput = {
  AND?: InputMaybe<Array<SmithCertWhereInput>>;
  OR?: InputMaybe<Array<SmithCertWhereInput>>;
  createdOn_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_gte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createdOn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdOn_lt?: InputMaybe<Scalars['Int']['input']>;
  createdOn_lte?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  createdOn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
};

export type SmithCertsConnection = {
  __typename?: 'SmithCertsConnection';
  edges: Array<SmithCertEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** smith status directly linked to Duniter SmithStatus */
export enum SmithStatus {
  Excluded = 'Excluded',
  Invited = 'Invited',
  Pending = 'Pending',
  Smith = 'Smith',
}

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  accountById?: Maybe<Account>;
  accounts: Array<Account>;
  blockById?: Maybe<Block>;
  blocks: Array<Block>;
  callById?: Maybe<Call>;
  calls: Array<Call>;
  certById?: Maybe<Cert>;
  certEventById?: Maybe<CertEvent>;
  certEvents: Array<CertEvent>;
  certs: Array<Cert>;
  changeOwnerKeyById?: Maybe<ChangeOwnerKey>;
  changeOwnerKeys: Array<ChangeOwnerKey>;
  eventById?: Maybe<Event>;
  events: Array<Event>;
  extrinsicById?: Maybe<Extrinsic>;
  extrinsics: Array<Extrinsic>;
  identities: Array<Identity>;
  identityById?: Maybe<Identity>;
  itemsCounterById?: Maybe<ItemsCounter>;
  itemsCounters: Array<ItemsCounter>;
  membershipEventById?: Maybe<MembershipEvent>;
  membershipEvents: Array<MembershipEvent>;
  smithCertById?: Maybe<SmithCert>;
  smithCerts: Array<SmithCert>;
  transferById?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  udHistories: Array<UdHistory>;
  udHistoryById?: Maybe<UdHistory>;
  udReevalById?: Maybe<UdReeval>;
  udReevals: Array<UdReeval>;
  universalDividendById?: Maybe<UniversalDividend>;
  universalDividends: Array<UniversalDividend>;
};

export type SubscriptionAccountByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderByInput>>;
  where?: InputMaybe<AccountWhereInput>;
};

export type SubscriptionBlockByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};

export type SubscriptionCallByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type SubscriptionCertByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionCertEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionCertEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderByInput>>;
  where?: InputMaybe<CertEventWhereInput>;
};

export type SubscriptionCertsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderByInput>>;
  where?: InputMaybe<CertWhereInput>;
};

export type SubscriptionChangeOwnerKeyByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionChangeOwnerKeysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderByInput>>;
  where?: InputMaybe<ChangeOwnerKeyWhereInput>;
};

export type SubscriptionEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type SubscriptionExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type SubscriptionIdentitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IdentityOrderByInput>>;
  where?: InputMaybe<IdentityWhereInput>;
};

export type SubscriptionIdentityByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionItemsCounterByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionItemsCountersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderByInput>>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};

export type SubscriptionMembershipEventByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionMembershipEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderByInput>>;
  where?: InputMaybe<MembershipEventWhereInput>;
};

export type SubscriptionSmithCertByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionSmithCertsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderByInput>>;
  where?: InputMaybe<SmithCertWhereInput>;
};

export type SubscriptionTransferByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};

export type SubscriptionUdHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderByInput>>;
  where?: InputMaybe<UdHistoryWhereInput>;
};

export type SubscriptionUdHistoryByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionUdReevalByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionUdReevalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdReevalOrderByInput>>;
  where?: InputMaybe<UdReevalWhereInput>;
};

export type SubscriptionUniversalDividendByIdArgs = {
  id: Scalars['String']['input'];
};

export type SubscriptionUniversalDividendsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UniversalDividendOrderByInput>>;
  where?: InputMaybe<UniversalDividendWhereInput>;
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

export type UdHistoriesConnection = {
  __typename?: 'UDHistoriesConnection';
  edges: Array<UdHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** History of Universal Dividend received by an member identity. */
export type UdHistory = {
  __typename?: 'UDHistory';
  amount: Scalars['Int']['output'];
  blockNumber: Scalars['Int']['output'];
  event: Event;
  id: Scalars['String']['output'];
  identity: Identity;
  timestamp: Scalars['DateTime']['output'];
};

export type UdHistoryEdge = {
  __typename?: 'UDHistoryEdge';
  cursor: Scalars['String']['output'];
  node: UdHistory;
};

export enum UdHistoryOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIndexAsc = 'event_index_ASC',
  EventIndexAscNullsFirst = 'event_index_ASC_NULLS_FIRST',
  EventIndexDesc = 'event_index_DESC',
  EventIndexDescNullsLast = 'event_index_DESC_NULLS_LAST',
  EventNameAsc = 'event_name_ASC',
  EventNameAscNullsFirst = 'event_name_ASC_NULLS_FIRST',
  EventNameDesc = 'event_name_DESC',
  EventNameDescNullsLast = 'event_name_DESC_NULLS_LAST',
  EventPalletAsc = 'event_pallet_ASC',
  EventPalletAscNullsFirst = 'event_pallet_ASC_NULLS_FIRST',
  EventPalletDesc = 'event_pallet_DESC',
  EventPalletDescNullsLast = 'event_pallet_DESC_NULLS_LAST',
  EventPhaseAsc = 'event_phase_ASC',
  EventPhaseAscNullsFirst = 'event_phase_ASC_NULLS_FIRST',
  EventPhaseDesc = 'event_phase_DESC',
  EventPhaseDescNullsLast = 'event_phase_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IdentityCreatedOnAsc = 'identity_createdOn_ASC',
  IdentityCreatedOnAscNullsFirst = 'identity_createdOn_ASC_NULLS_FIRST',
  IdentityCreatedOnDesc = 'identity_createdOn_DESC',
  IdentityCreatedOnDescNullsLast = 'identity_createdOn_DESC_NULLS_LAST',
  IdentityExpireOnAsc = 'identity_expireOn_ASC',
  IdentityExpireOnAscNullsFirst = 'identity_expireOn_ASC_NULLS_FIRST',
  IdentityExpireOnDesc = 'identity_expireOn_DESC',
  IdentityExpireOnDescNullsLast = 'identity_expireOn_DESC_NULLS_LAST',
  IdentityIdAsc = 'identity_id_ASC',
  IdentityIdAscNullsFirst = 'identity_id_ASC_NULLS_FIRST',
  IdentityIdDesc = 'identity_id_DESC',
  IdentityIdDescNullsLast = 'identity_id_DESC_NULLS_LAST',
  IdentityIndexAsc = 'identity_index_ASC',
  IdentityIndexAscNullsFirst = 'identity_index_ASC_NULLS_FIRST',
  IdentityIndexDesc = 'identity_index_DESC',
  IdentityIndexDescNullsLast = 'identity_index_DESC_NULLS_LAST',
  IdentityIsMemberAsc = 'identity_isMember_ASC',
  IdentityIsMemberAscNullsFirst = 'identity_isMember_ASC_NULLS_FIRST',
  IdentityIsMemberDesc = 'identity_isMember_DESC',
  IdentityIsMemberDescNullsLast = 'identity_isMember_DESC_NULLS_LAST',
  IdentityLastChangeOnAsc = 'identity_lastChangeOn_ASC',
  IdentityLastChangeOnAscNullsFirst = 'identity_lastChangeOn_ASC_NULLS_FIRST',
  IdentityLastChangeOnDesc = 'identity_lastChangeOn_DESC',
  IdentityLastChangeOnDescNullsLast = 'identity_lastChangeOn_DESC_NULLS_LAST',
  IdentityNameAsc = 'identity_name_ASC',
  IdentityNameAscNullsFirst = 'identity_name_ASC_NULLS_FIRST',
  IdentityNameDesc = 'identity_name_DESC',
  IdentityNameDescNullsLast = 'identity_name_DESC_NULLS_LAST',
  IdentitySmithStatusAsc = 'identity_smithStatus_ASC',
  IdentitySmithStatusAscNullsFirst = 'identity_smithStatus_ASC_NULLS_FIRST',
  IdentitySmithStatusDesc = 'identity_smithStatus_DESC',
  IdentitySmithStatusDescNullsLast = 'identity_smithStatus_DESC_NULLS_LAST',
  IdentityStatusAsc = 'identity_status_ASC',
  IdentityStatusAscNullsFirst = 'identity_status_ASC_NULLS_FIRST',
  IdentityStatusDesc = 'identity_status_DESC',
  IdentityStatusDescNullsLast = 'identity_status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type UdHistoryWhereInput = {
  AND?: InputMaybe<Array<UdHistoryWhereInput>>;
  OR?: InputMaybe<Array<UdHistoryWhereInput>>;
  amount_eq?: InputMaybe<Scalars['Int']['input']>;
  amount_gt?: InputMaybe<Scalars['Int']['input']>;
  amount_gte?: InputMaybe<Scalars['Int']['input']>;
  amount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['Int']['input']>;
  amount_lte?: InputMaybe<Scalars['Int']['input']>;
  amount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

/** List of reevaluation of Universal Dividend based on changes in monetary mass and number of members. Every 6 months in Ğ1 */
export type UdReeval = {
  __typename?: 'UDReeval';
  blockNumber: Scalars['Int']['output'];
  event: Event;
  id: Scalars['String']['output'];
  membersCount: Scalars['Int']['output'];
  monetaryMass: Scalars['BigInt']['output'];
  newUdAmount: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type UdReevalEdge = {
  __typename?: 'UDReevalEdge';
  cursor: Scalars['String']['output'];
  node: UdReeval;
};

export enum UdReevalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIndexAsc = 'event_index_ASC',
  EventIndexAscNullsFirst = 'event_index_ASC_NULLS_FIRST',
  EventIndexDesc = 'event_index_DESC',
  EventIndexDescNullsLast = 'event_index_DESC_NULLS_LAST',
  EventNameAsc = 'event_name_ASC',
  EventNameAscNullsFirst = 'event_name_ASC_NULLS_FIRST',
  EventNameDesc = 'event_name_DESC',
  EventNameDescNullsLast = 'event_name_DESC_NULLS_LAST',
  EventPalletAsc = 'event_pallet_ASC',
  EventPalletAscNullsFirst = 'event_pallet_ASC_NULLS_FIRST',
  EventPalletDesc = 'event_pallet_DESC',
  EventPalletDescNullsLast = 'event_pallet_DESC_NULLS_LAST',
  EventPhaseAsc = 'event_phase_ASC',
  EventPhaseAscNullsFirst = 'event_phase_ASC_NULLS_FIRST',
  EventPhaseDesc = 'event_phase_DESC',
  EventPhaseDescNullsLast = 'event_phase_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MembersCountAsc = 'membersCount_ASC',
  MembersCountAscNullsFirst = 'membersCount_ASC_NULLS_FIRST',
  MembersCountDesc = 'membersCount_DESC',
  MembersCountDescNullsLast = 'membersCount_DESC_NULLS_LAST',
  MonetaryMassAsc = 'monetaryMass_ASC',
  MonetaryMassAscNullsFirst = 'monetaryMass_ASC_NULLS_FIRST',
  MonetaryMassDesc = 'monetaryMass_DESC',
  MonetaryMassDescNullsLast = 'monetaryMass_DESC_NULLS_LAST',
  NewUdAmountAsc = 'newUdAmount_ASC',
  NewUdAmountAscNullsFirst = 'newUdAmount_ASC_NULLS_FIRST',
  NewUdAmountDesc = 'newUdAmount_DESC',
  NewUdAmountDescNullsLast = 'newUdAmount_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type UdReevalWhereInput = {
  AND?: InputMaybe<Array<UdReevalWhereInput>>;
  OR?: InputMaybe<Array<UdReevalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  membersCount_eq?: InputMaybe<Scalars['Int']['input']>;
  membersCount_gt?: InputMaybe<Scalars['Int']['input']>;
  membersCount_gte?: InputMaybe<Scalars['Int']['input']>;
  membersCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  membersCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  membersCount_lt?: InputMaybe<Scalars['Int']['input']>;
  membersCount_lte?: InputMaybe<Scalars['Int']['input']>;
  membersCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  membersCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  monetaryMass_eq?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_gt?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_gte?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  monetaryMass_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  monetaryMass_lt?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_lte?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newUdAmount_eq?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_gt?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_gte?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  newUdAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newUdAmount_lt?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_lte?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  newUdAmount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type UdReevalsConnection = {
  __typename?: 'UDReevalsConnection';
  edges: Array<UdReevalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UdHistoryFilterInput = {
  amount?: InputMaybe<NumberFilter>;
  blockNumber?: InputMaybe<NumberFilter>;
};

/** Each Universal Dividend created since the beginning of the blockchain */
export type UniversalDividend = {
  __typename?: 'UniversalDividend';
  amount: Scalars['Int']['output'];
  blockNumber: Scalars['Int']['output'];
  event: Event;
  id: Scalars['String']['output'];
  membersCount: Scalars['Int']['output'];
  monetaryMass: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type UniversalDividendEdge = {
  __typename?: 'UniversalDividendEdge';
  cursor: Scalars['String']['output'];
  node: UniversalDividend;
};

export enum UniversalDividendOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIndexAsc = 'event_index_ASC',
  EventIndexAscNullsFirst = 'event_index_ASC_NULLS_FIRST',
  EventIndexDesc = 'event_index_DESC',
  EventIndexDescNullsLast = 'event_index_DESC_NULLS_LAST',
  EventNameAsc = 'event_name_ASC',
  EventNameAscNullsFirst = 'event_name_ASC_NULLS_FIRST',
  EventNameDesc = 'event_name_DESC',
  EventNameDescNullsLast = 'event_name_DESC_NULLS_LAST',
  EventPalletAsc = 'event_pallet_ASC',
  EventPalletAscNullsFirst = 'event_pallet_ASC_NULLS_FIRST',
  EventPalletDesc = 'event_pallet_DESC',
  EventPalletDescNullsLast = 'event_pallet_DESC_NULLS_LAST',
  EventPhaseAsc = 'event_phase_ASC',
  EventPhaseAscNullsFirst = 'event_phase_ASC_NULLS_FIRST',
  EventPhaseDesc = 'event_phase_DESC',
  EventPhaseDescNullsLast = 'event_phase_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MembersCountAsc = 'membersCount_ASC',
  MembersCountAscNullsFirst = 'membersCount_ASC_NULLS_FIRST',
  MembersCountDesc = 'membersCount_DESC',
  MembersCountDescNullsLast = 'membersCount_DESC_NULLS_LAST',
  MonetaryMassAsc = 'monetaryMass_ASC',
  MonetaryMassAscNullsFirst = 'monetaryMass_ASC_NULLS_FIRST',
  MonetaryMassDesc = 'monetaryMass_DESC',
  MonetaryMassDescNullsLast = 'monetaryMass_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type UniversalDividendWhereInput = {
  AND?: InputMaybe<Array<UniversalDividendWhereInput>>;
  OR?: InputMaybe<Array<UniversalDividendWhereInput>>;
  amount_eq?: InputMaybe<Scalars['Int']['input']>;
  amount_gt?: InputMaybe<Scalars['Int']['input']>;
  amount_gte?: InputMaybe<Scalars['Int']['input']>;
  amount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['Int']['input']>;
  amount_lte?: InputMaybe<Scalars['Int']['input']>;
  amount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  membersCount_eq?: InputMaybe<Scalars['Int']['input']>;
  membersCount_gt?: InputMaybe<Scalars['Int']['input']>;
  membersCount_gte?: InputMaybe<Scalars['Int']['input']>;
  membersCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  membersCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  membersCount_lt?: InputMaybe<Scalars['Int']['input']>;
  membersCount_lte?: InputMaybe<Scalars['Int']['input']>;
  membersCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  membersCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  monetaryMass_eq?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_gt?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_gte?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  monetaryMass_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  monetaryMass_lt?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_lte?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  monetaryMass_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type UniversalDividendsConnection = {
  __typename?: 'UniversalDividendsConnection';
  edges: Array<UniversalDividendEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type LightIdentityFragment = {
  __typename?: 'Identity';
  id: string;
  name: string;
  isMember: boolean;
  account: { __typename?: 'Account'; id: string };
  membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
};

export type LightAccountFragment = {
  __typename?: 'Account';
  id: string;
  identity?: {
    __typename?: 'Identity';
    id: string;
    name: string;
    isMember: boolean;
    membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
  } | null;
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
  expireOn: number;
  createdOn: number;
  receiver: {
    __typename?: 'Identity';
    id: string;
    name: string;
    isMember: boolean;
    account: { __typename?: 'Account'; id: string };
    membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
  };
  issuer: {
    __typename?: 'Identity';
    id: string;
    name: string;
    isMember: boolean;
    account: { __typename?: 'Account'; id: string };
    membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
  };
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
        expireOn: number;
        createdOn: number;
        identity: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
        receiver: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
        issuer: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
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
        expireOn: number;
        createdOn: number;
        identity: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
        receiver: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
        issuer: {
          __typename?: 'Identity';
          id: string;
          name: string;
          isMember: boolean;
          account: { __typename?: 'Account'; id: string };
          membershipHistory: Array<{ __typename: 'MembershipEvent'; id: string }>;
        };
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
    __typename?: 'Account';
    id: string;
    identity?: {
      __typename?: 'Identity';
      id: string;
      name: string;
      isMember: boolean;
      membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
    } | null;
  };
  to: {
    __typename?: 'Account';
    id: string;
    identity?: {
      __typename?: 'Identity';
      id: string;
      name: string;
      isMember: boolean;
      membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
    } | null;
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
          __typename?: 'Account';
          id: string;
          identity?: {
            __typename?: 'Identity';
            id: string;
            name: string;
            isMember: boolean;
            membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
          } | null;
        };
        to: {
          __typename?: 'Account';
          id: string;
          identity?: {
            __typename?: 'Identity';
            id: string;
            name: string;
            isMember: boolean;
            membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
          } | null;
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
    __typename?: 'Account';
    id: string;
    identity?: {
      __typename?: 'Identity';
      id: string;
      name: string;
      isMember: boolean;
      membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
    } | null;
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
    __typename?: 'Account';
    id: string;
    identity?: {
      __typename?: 'Identity';
      id: string;
      name: string;
      isMember: boolean;
      membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
    } | null;
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
    __typename?: 'Account';
    id: string;
    identity?: {
      __typename?: 'Identity';
      id: string;
      name: string;
      isMember: boolean;
      membershipHistory: Array<{ __typename?: 'MembershipEvent'; id: string }>;
    } | null;
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
    id
    name
    isMember
    account {
      id
    }
    membershipHistory {
      __typename
      id
    }
  }
`;
export const CertFragmentDoc = gql`
  fragment Cert on Cert {
    __typename
    id
    expireOn
    createdOn
    receiver {
      ...LightIdentity
    }
    issuer {
      ...LightIdentity
    }
  }
  ${LightIdentityFragmentDoc}
`;
export const LightAccountFragmentDoc = gql`
  fragment LightAccount on Account {
    id
    identity {
      id
      name
      isMember
      membershipHistory {
        id
      }
    }
  }
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
    certsConnection(first: $limit, after: $after, orderBy: $orderBy, where: { issuer: { account: { id_eq: $address } } }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Cert
          identity: receiver {
            ...LightIdentity
          }
        }
      }
    }
  }
  ${CertFragmentDoc}
  ${LightIdentityFragmentDoc}
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
    certsConnection(first: $limit, after: $after, orderBy: $orderBy, where: { receiver: { account: { id_eq: $address } } }) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Cert
          identity: issuer {
            ...LightIdentity
          }
        }
      }
    }
  }
  ${CertFragmentDoc}
  ${LightIdentityFragmentDoc}
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
      where: { identity: { id_isNull: false }, AND: { identity: { membershipHistory_some: { id_isNull: $pending } } } }
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
