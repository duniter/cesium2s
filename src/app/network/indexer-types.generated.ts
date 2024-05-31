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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bytea: { input: any; output: any; }
  identity_scalar: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** columns and relationships of "account" */
export type Account = Node & {
  __typename?: 'Account';
  id: Scalars['ID']['output'];
  /** An object relationship */
  identity?: Maybe<Identity>;
  /** An object relationship */
  linkedIdentity?: Maybe<Identity>;
  linkedIdentityId?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  transfersIssued: Array<Transfer>;
  /** An aggregate relationship */
  transfersIssuedAggregate: TransferAggregate;
  /** An array relationship connection */
  transfersIssued_connection: TransferConnection;
  /** An array relationship */
  transfersReceived: Array<Transfer>;
  /** An aggregate relationship */
  transfersReceivedAggregate: TransferAggregate;
  /** An array relationship connection */
  transfersReceived_connection: TransferConnection;
  /** An array relationship */
  wasIdentity: Array<ChangeOwnerKey>;
  /** An aggregate relationship */
  wasIdentityAggregate: ChangeOwnerKeyAggregate;
  /** An array relationship connection */
  wasIdentity_connection: ChangeOwnerKeyConnection;
};


/** columns and relationships of "account" */
export type AccountTransfersIssuedArgs = {
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountTransfersIssuedAggregateArgs = {
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountTransfersIssued_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountTransfersReceivedArgs = {
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountTransfersReceivedAggregateArgs = {
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountTransfersReceived_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


/** columns and relationships of "account" */
export type AccountWasIdentityArgs = {
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


/** columns and relationships of "account" */
export type AccountWasIdentityAggregateArgs = {
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


/** columns and relationships of "account" */
export type AccountWasIdentity_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};

/** aggregated selection of "account" */
export type AccountAggregate = {
  __typename?: 'AccountAggregate';
  aggregate?: Maybe<AccountAggregateFields>;
  nodes: Array<Account>;
};

export type AccountAggregateBoolExp = {
  count?: InputMaybe<AccountAggregateBoolExpCount>;
};

/** aggregate fields of "account" */
export type AccountAggregateFields = {
  __typename?: 'AccountAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<AccountMaxFields>;
  min?: Maybe<AccountMinFields>;
};


/** aggregate fields of "account" */
export type AccountAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AccountSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "account" */
export type AccountAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<AccountMaxOrderBy>;
  min?: InputMaybe<AccountMinOrderBy>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type AccountBoolExp = {
  _and?: InputMaybe<Array<AccountBoolExp>>;
  _not?: InputMaybe<AccountBoolExp>;
  _or?: InputMaybe<Array<AccountBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  identity?: InputMaybe<IdentityBoolExp>;
  linkedIdentity?: InputMaybe<IdentityBoolExp>;
  linkedIdentityId?: InputMaybe<StringComparisonExp>;
  transfersIssued?: InputMaybe<TransferBoolExp>;
  transfersIssuedAggregate?: InputMaybe<TransferAggregateBoolExp>;
  transfersReceived?: InputMaybe<TransferBoolExp>;
  transfersReceivedAggregate?: InputMaybe<TransferAggregateBoolExp>;
  wasIdentity?: InputMaybe<ChangeOwnerKeyBoolExp>;
  wasIdentityAggregate?: InputMaybe<ChangeOwnerKeyAggregateBoolExp>;
};

/** A Relay connection object on "account" */
export type AccountConnection = {
  __typename?: 'AccountConnection';
  edges: Array<AccountEdge>;
  pageInfo: PageInfo;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  cursor: Scalars['String']['output'];
  node: Account;
};

/** aggregate max on columns */
export type AccountMaxFields = {
  __typename?: 'AccountMaxFields';
  id?: Maybe<Scalars['String']['output']>;
  linkedIdentityId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "account" */
export type AccountMaxOrderBy = {
  id?: InputMaybe<OrderBy>;
  linkedIdentityId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type AccountMinFields = {
  __typename?: 'AccountMinFields';
  id?: Maybe<Scalars['String']['output']>;
  linkedIdentityId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "account" */
export type AccountMinOrderBy = {
  id?: InputMaybe<OrderBy>;
  linkedIdentityId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "account". */
export type AccountOrderBy = {
  id?: InputMaybe<OrderBy>;
  identity?: InputMaybe<IdentityOrderBy>;
  linkedIdentity?: InputMaybe<IdentityOrderBy>;
  linkedIdentityId?: InputMaybe<OrderBy>;
  transfersIssuedAggregate?: InputMaybe<TransferAggregateOrderBy>;
  transfersReceivedAggregate?: InputMaybe<TransferAggregateOrderBy>;
  wasIdentityAggregate?: InputMaybe<ChangeOwnerKeyAggregateOrderBy>;
};

/** select columns of table "account" */
export enum AccountSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  LinkedIdentityId = 'linkedIdentityId'
}

/** columns and relationships of "block" */
export type Block = Node & {
  __typename?: 'Block';
  /** An array relationship */
  calls: Array<Call>;
  /** An aggregate relationship */
  callsAggregate: CallAggregate;
  callsCount: Scalars['Int']['output'];
  /** An array relationship connection */
  calls_connection: CallConnection;
  /** An array relationship */
  events: Array<Event>;
  /** An aggregate relationship */
  eventsAggregate: EventAggregate;
  eventsCount: Scalars['Int']['output'];
  /** An array relationship connection */
  events_connection: EventConnection;
  /** An array relationship */
  extrinsics: Array<Extrinsic>;
  /** An aggregate relationship */
  extrinsicsAggregate: ExtrinsicAggregate;
  extrinsicsCount: Scalars['Int']['output'];
  /** An array relationship connection */
  extrinsics_connection: ExtrinsicConnection;
  extrinsicsicRoot: Scalars['bytea']['output'];
  hash: Scalars['bytea']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  implName: Scalars['String']['output'];
  implVersion: Scalars['Int']['output'];
  parentHash: Scalars['bytea']['output'];
  specName: Scalars['String']['output'];
  specVersion: Scalars['Int']['output'];
  stateRoot: Scalars['bytea']['output'];
  timestamp: Scalars['timestamptz']['output'];
  validator?: Maybe<Scalars['bytea']['output']>;
};


/** columns and relationships of "block" */
export type BlockCallsArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "block" */
export type BlockCallsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "block" */
export type BlockCalls_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "block" */
export type BlockEventsArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "block" */
export type BlockEventsAggregateArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "block" */
export type BlockEvents_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "block" */
export type BlockExtrinsicsArgs = {
  distinctOn?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderBy>>;
  where?: InputMaybe<ExtrinsicBoolExp>;
};


/** columns and relationships of "block" */
export type BlockExtrinsicsAggregateArgs = {
  distinctOn?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderBy>>;
  where?: InputMaybe<ExtrinsicBoolExp>;
};


/** columns and relationships of "block" */
export type BlockExtrinsics_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderBy>>;
  where?: InputMaybe<ExtrinsicBoolExp>;
};

/** Boolean expression to filter rows from the table "block". All fields are combined with a logical 'AND'. */
export type BlockBoolExp = {
  _and?: InputMaybe<Array<BlockBoolExp>>;
  _not?: InputMaybe<BlockBoolExp>;
  _or?: InputMaybe<Array<BlockBoolExp>>;
  calls?: InputMaybe<CallBoolExp>;
  callsAggregate?: InputMaybe<CallAggregateBoolExp>;
  callsCount?: InputMaybe<IntComparisonExp>;
  events?: InputMaybe<EventBoolExp>;
  eventsAggregate?: InputMaybe<EventAggregateBoolExp>;
  eventsCount?: InputMaybe<IntComparisonExp>;
  extrinsics?: InputMaybe<ExtrinsicBoolExp>;
  extrinsicsAggregate?: InputMaybe<ExtrinsicAggregateBoolExp>;
  extrinsicsCount?: InputMaybe<IntComparisonExp>;
  extrinsicsicRoot?: InputMaybe<ByteaComparisonExp>;
  hash?: InputMaybe<ByteaComparisonExp>;
  height?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  implName?: InputMaybe<StringComparisonExp>;
  implVersion?: InputMaybe<IntComparisonExp>;
  parentHash?: InputMaybe<ByteaComparisonExp>;
  specName?: InputMaybe<StringComparisonExp>;
  specVersion?: InputMaybe<IntComparisonExp>;
  stateRoot?: InputMaybe<ByteaComparisonExp>;
  timestamp?: InputMaybe<TimestamptzComparisonExp>;
  validator?: InputMaybe<ByteaComparisonExp>;
};

/** A Relay connection object on "block" */
export type BlockConnection = {
  __typename?: 'BlockConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

/** Ordering options when selecting data from "block". */
export type BlockOrderBy = {
  callsAggregate?: InputMaybe<CallAggregateOrderBy>;
  callsCount?: InputMaybe<OrderBy>;
  eventsAggregate?: InputMaybe<EventAggregateOrderBy>;
  eventsCount?: InputMaybe<OrderBy>;
  extrinsicsAggregate?: InputMaybe<ExtrinsicAggregateOrderBy>;
  extrinsicsCount?: InputMaybe<OrderBy>;
  extrinsicsicRoot?: InputMaybe<OrderBy>;
  hash?: InputMaybe<OrderBy>;
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  implName?: InputMaybe<OrderBy>;
  implVersion?: InputMaybe<OrderBy>;
  parentHash?: InputMaybe<OrderBy>;
  specName?: InputMaybe<OrderBy>;
  specVersion?: InputMaybe<OrderBy>;
  stateRoot?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  validator?: InputMaybe<OrderBy>;
};

/** select columns of table "block" */
export enum BlockSelectColumn {
  /** column name */
  CallsCount = 'callsCount',
  /** column name */
  EventsCount = 'eventsCount',
  /** column name */
  ExtrinsicsCount = 'extrinsicsCount',
  /** column name */
  ExtrinsicsicRoot = 'extrinsicsicRoot',
  /** column name */
  Hash = 'hash',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  ImplName = 'implName',
  /** column name */
  ImplVersion = 'implVersion',
  /** column name */
  ParentHash = 'parentHash',
  /** column name */
  SpecName = 'specName',
  /** column name */
  SpecVersion = 'specVersion',
  /** column name */
  StateRoot = 'stateRoot',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  Validator = 'validator'
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type ByteaComparisonExp = {
  _eq?: InputMaybe<Scalars['bytea']['input']>;
  _gt?: InputMaybe<Scalars['bytea']['input']>;
  _gte?: InputMaybe<Scalars['bytea']['input']>;
  _in?: InputMaybe<Array<Scalars['bytea']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bytea']['input']>;
  _lte?: InputMaybe<Scalars['bytea']['input']>;
  _neq?: InputMaybe<Scalars['bytea']['input']>;
  _nin?: InputMaybe<Array<Scalars['bytea']['input']>>;
};

/** columns and relationships of "call" */
export type Call = Node & {
  __typename?: 'Call';
  address: Array<Scalars['Int']['output']>;
  args?: Maybe<Scalars['jsonb']['output']>;
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  /** An object relationship */
  block?: Maybe<Block>;
  blockId?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['jsonb']['output']>;
  /** An array relationship */
  events: Array<Event>;
  /** An aggregate relationship */
  eventsAggregate: EventAggregate;
  /** An array relationship connection */
  events_connection: EventConnection;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  /** An object relationship */
  parent?: Maybe<Call>;
  parentId?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  subcalls: Array<Call>;
  /** An aggregate relationship */
  subcallsAggregate: CallAggregate;
  /** An array relationship connection */
  subcalls_connection: CallConnection;
  success: Scalars['Boolean']['output'];
};


/** columns and relationships of "call" */
export type CallArgsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "call" */
export type CallErrorArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "call" */
export type CallEventsArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "call" */
export type CallEventsAggregateArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "call" */
export type CallEvents_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "call" */
export type CallSubcallsArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "call" */
export type CallSubcallsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "call" */
export type CallSubcalls_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};

/** aggregated selection of "call" */
export type CallAggregate = {
  __typename?: 'CallAggregate';
  aggregate?: Maybe<CallAggregateFields>;
  nodes: Array<Call>;
};

export type CallAggregateBoolExp = {
  bool_and?: InputMaybe<CallAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<CallAggregateBoolExpBool_Or>;
  count?: InputMaybe<CallAggregateBoolExpCount>;
};

/** aggregate fields of "call" */
export type CallAggregateFields = {
  __typename?: 'CallAggregateFields';
  count: Scalars['Int']['output'];
  max?: Maybe<CallMaxFields>;
  min?: Maybe<CallMinFields>;
};


/** aggregate fields of "call" */
export type CallAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CallSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "call" */
export type CallAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CallMaxOrderBy>;
  min?: InputMaybe<CallMinOrderBy>;
};

/** Boolean expression to filter rows from the table "call". All fields are combined with a logical 'AND'. */
export type CallBoolExp = {
  _and?: InputMaybe<Array<CallBoolExp>>;
  _not?: InputMaybe<CallBoolExp>;
  _or?: InputMaybe<Array<CallBoolExp>>;
  address?: InputMaybe<IntArrayComparisonExp>;
  args?: InputMaybe<JsonbComparisonExp>;
  argsStr?: InputMaybe<StringArrayComparisonExp>;
  block?: InputMaybe<BlockBoolExp>;
  blockId?: InputMaybe<StringComparisonExp>;
  error?: InputMaybe<JsonbComparisonExp>;
  events?: InputMaybe<EventBoolExp>;
  eventsAggregate?: InputMaybe<EventAggregateBoolExp>;
  extrinsic?: InputMaybe<ExtrinsicBoolExp>;
  extrinsicId?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  pallet?: InputMaybe<StringComparisonExp>;
  parent?: InputMaybe<CallBoolExp>;
  parentId?: InputMaybe<StringComparisonExp>;
  subcalls?: InputMaybe<CallBoolExp>;
  subcallsAggregate?: InputMaybe<CallAggregateBoolExp>;
  success?: InputMaybe<BooleanComparisonExp>;
};

/** A Relay connection object on "call" */
export type CallConnection = {
  __typename?: 'CallConnection';
  edges: Array<CallEdge>;
  pageInfo: PageInfo;
};

export type CallEdge = {
  __typename?: 'CallEdge';
  cursor: Scalars['String']['output'];
  node: Call;
};

/** aggregate max on columns */
export type CallMaxFields = {
  __typename?: 'CallMaxFields';
  address?: Maybe<Array<Scalars['Int']['output']>>;
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  blockId?: Maybe<Scalars['String']['output']>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "call" */
export type CallMaxOrderBy = {
  address?: InputMaybe<OrderBy>;
  argsStr?: InputMaybe<OrderBy>;
  blockId?: InputMaybe<OrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  parentId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CallMinFields = {
  __typename?: 'CallMinFields';
  address?: Maybe<Array<Scalars['Int']['output']>>;
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  blockId?: Maybe<Scalars['String']['output']>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "call" */
export type CallMinOrderBy = {
  address?: InputMaybe<OrderBy>;
  argsStr?: InputMaybe<OrderBy>;
  blockId?: InputMaybe<OrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  parentId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "call". */
export type CallOrderBy = {
  address?: InputMaybe<OrderBy>;
  args?: InputMaybe<OrderBy>;
  argsStr?: InputMaybe<OrderBy>;
  block?: InputMaybe<BlockOrderBy>;
  blockId?: InputMaybe<OrderBy>;
  error?: InputMaybe<OrderBy>;
  eventsAggregate?: InputMaybe<EventAggregateOrderBy>;
  extrinsic?: InputMaybe<ExtrinsicOrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  parent?: InputMaybe<CallOrderBy>;
  parentId?: InputMaybe<OrderBy>;
  subcallsAggregate?: InputMaybe<CallAggregateOrderBy>;
  success?: InputMaybe<OrderBy>;
};

/** select columns of table "call" */
export enum CallSelectColumn {
  /** column name */
  Address = 'address',
  /** column name */
  Args = 'args',
  /** column name */
  ArgsStr = 'argsStr',
  /** column name */
  BlockId = 'blockId',
  /** column name */
  Error = 'error',
  /** column name */
  ExtrinsicId = 'extrinsicId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Pallet = 'pallet',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Success = 'success'
}

/** select "callAggregateBoolExpBool_andArgumentsColumns" columns of table "call" */
export enum CallSelectColumnCallAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Success = 'success'
}

/** select "callAggregateBoolExpBool_orArgumentsColumns" columns of table "call" */
export enum CallSelectColumnCallAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Success = 'success'
}

/** columns and relationships of "cert" */
export type Cert = Node & {
  __typename?: 'Cert';
  /** An array relationship */
  certHistory: Array<CertEvent>;
  /** An aggregate relationship */
  certHistoryAggregate: CertEventAggregate;
  /** An array relationship connection */
  certHistory_connection: CertEventConnection;
  /** An object relationship */
  createdIn?: Maybe<Event>;
  createdInId?: Maybe<Scalars['String']['output']>;
  createdOn: Scalars['Int']['output'];
  expireOn: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** An object relationship */
  issuer?: Maybe<Identity>;
  issuerId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  receiver?: Maybe<Identity>;
  receiverId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  updatedIn?: Maybe<Event>;
  updatedInId?: Maybe<Scalars['String']['output']>;
  updatedOn: Scalars['Int']['output'];
};


/** columns and relationships of "cert" */
export type CertCertHistoryArgs = {
  distinctOn?: InputMaybe<Array<CertEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderBy>>;
  where?: InputMaybe<CertEventBoolExp>;
};


/** columns and relationships of "cert" */
export type CertCertHistoryAggregateArgs = {
  distinctOn?: InputMaybe<Array<CertEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderBy>>;
  where?: InputMaybe<CertEventBoolExp>;
};


/** columns and relationships of "cert" */
export type CertCertHistory_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderBy>>;
  where?: InputMaybe<CertEventBoolExp>;
};

/** aggregated selection of "cert" */
export type CertAggregate = {
  __typename?: 'CertAggregate';
  aggregate?: Maybe<CertAggregateFields>;
  nodes: Array<Cert>;
};

export type CertAggregateBoolExp = {
  bool_and?: InputMaybe<CertAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<CertAggregateBoolExpBool_Or>;
  count?: InputMaybe<CertAggregateBoolExpCount>;
};

/** aggregate fields of "cert" */
export type CertAggregateFields = {
  __typename?: 'CertAggregateFields';
  avg?: Maybe<CertAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CertMaxFields>;
  min?: Maybe<CertMinFields>;
  stddev?: Maybe<CertStddevFields>;
  stddevPop?: Maybe<CertStddevPopFields>;
  stddevSamp?: Maybe<CertStddevSampFields>;
  sum?: Maybe<CertSumFields>;
  varPop?: Maybe<CertVarPopFields>;
  varSamp?: Maybe<CertVarSampFields>;
  variance?: Maybe<CertVarianceFields>;
};


/** aggregate fields of "cert" */
export type CertAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CertSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "cert" */
export type CertAggregateOrderBy = {
  avg?: InputMaybe<CertAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CertMaxOrderBy>;
  min?: InputMaybe<CertMinOrderBy>;
  stddev?: InputMaybe<CertStddevOrderBy>;
  stddevPop?: InputMaybe<CertStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CertStddevSampOrderBy>;
  sum?: InputMaybe<CertSumOrderBy>;
  varPop?: InputMaybe<CertVarPopOrderBy>;
  varSamp?: InputMaybe<CertVarSampOrderBy>;
  variance?: InputMaybe<CertVarianceOrderBy>;
};

/** aggregate avg on columns */
export type CertAvgFields = {
  __typename?: 'CertAvgFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "cert" */
export type CertAvgOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "cert". All fields are combined with a logical 'AND'. */
export type CertBoolExp = {
  _and?: InputMaybe<Array<CertBoolExp>>;
  _not?: InputMaybe<CertBoolExp>;
  _or?: InputMaybe<Array<CertBoolExp>>;
  certHistory?: InputMaybe<CertEventBoolExp>;
  certHistoryAggregate?: InputMaybe<CertEventAggregateBoolExp>;
  createdIn?: InputMaybe<EventBoolExp>;
  createdInId?: InputMaybe<StringComparisonExp>;
  createdOn?: InputMaybe<IntComparisonExp>;
  expireOn?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  isActive?: InputMaybe<BooleanComparisonExp>;
  issuer?: InputMaybe<IdentityBoolExp>;
  issuerId?: InputMaybe<StringComparisonExp>;
  receiver?: InputMaybe<IdentityBoolExp>;
  receiverId?: InputMaybe<StringComparisonExp>;
  updatedIn?: InputMaybe<EventBoolExp>;
  updatedInId?: InputMaybe<StringComparisonExp>;
  updatedOn?: InputMaybe<IntComparisonExp>;
};

/** A Relay connection object on "cert" */
export type CertConnection = {
  __typename?: 'CertConnection';
  edges: Array<CertEdge>;
  pageInfo: PageInfo;
};

export type CertEdge = {
  __typename?: 'CertEdge';
  cursor: Scalars['String']['output'];
  node: Cert;
};

/** columns and relationships of "cert_event" */
export type CertEvent = Node & {
  __typename?: 'CertEvent';
  blockNumber: Scalars['Int']['output'];
  /** An object relationship */
  cert?: Maybe<Cert>;
  certId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<EventTypeEnum>;
  id: Scalars['ID']['output'];
};

/** aggregated selection of "cert_event" */
export type CertEventAggregate = {
  __typename?: 'CertEventAggregate';
  aggregate?: Maybe<CertEventAggregateFields>;
  nodes: Array<CertEvent>;
};

export type CertEventAggregateBoolExp = {
  count?: InputMaybe<CertEventAggregateBoolExpCount>;
};

/** aggregate fields of "cert_event" */
export type CertEventAggregateFields = {
  __typename?: 'CertEventAggregateFields';
  avg?: Maybe<CertEventAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CertEventMaxFields>;
  min?: Maybe<CertEventMinFields>;
  stddev?: Maybe<CertEventStddevFields>;
  stddevPop?: Maybe<CertEventStddevPopFields>;
  stddevSamp?: Maybe<CertEventStddevSampFields>;
  sum?: Maybe<CertEventSumFields>;
  varPop?: Maybe<CertEventVarPopFields>;
  varSamp?: Maybe<CertEventVarSampFields>;
  variance?: Maybe<CertEventVarianceFields>;
};


/** aggregate fields of "cert_event" */
export type CertEventAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CertEventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "cert_event" */
export type CertEventAggregateOrderBy = {
  avg?: InputMaybe<CertEventAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CertEventMaxOrderBy>;
  min?: InputMaybe<CertEventMinOrderBy>;
  stddev?: InputMaybe<CertEventStddevOrderBy>;
  stddevPop?: InputMaybe<CertEventStddevPopOrderBy>;
  stddevSamp?: InputMaybe<CertEventStddevSampOrderBy>;
  sum?: InputMaybe<CertEventSumOrderBy>;
  varPop?: InputMaybe<CertEventVarPopOrderBy>;
  varSamp?: InputMaybe<CertEventVarSampOrderBy>;
  variance?: InputMaybe<CertEventVarianceOrderBy>;
};

/** aggregate avg on columns */
export type CertEventAvgFields = {
  __typename?: 'CertEventAvgFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "cert_event" */
export type CertEventAvgOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "cert_event". All fields are combined with a logical 'AND'. */
export type CertEventBoolExp = {
  _and?: InputMaybe<Array<CertEventBoolExp>>;
  _not?: InputMaybe<CertEventBoolExp>;
  _or?: InputMaybe<Array<CertEventBoolExp>>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  cert?: InputMaybe<CertBoolExp>;
  certId?: InputMaybe<StringComparisonExp>;
  event?: InputMaybe<EventBoolExp>;
  eventId?: InputMaybe<StringComparisonExp>;
  eventType?: InputMaybe<EventTypeEnumComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "cert_event" */
export type CertEventConnection = {
  __typename?: 'CertEventConnection';
  edges: Array<CertEventEdge>;
  pageInfo: PageInfo;
};

export type CertEventEdge = {
  __typename?: 'CertEventEdge';
  cursor: Scalars['String']['output'];
  node: CertEvent;
};

/** aggregate max on columns */
export type CertEventMaxFields = {
  __typename?: 'CertEventMaxFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  certId?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "cert_event" */
export type CertEventMaxOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  certId?: InputMaybe<OrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CertEventMinFields = {
  __typename?: 'CertEventMinFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  certId?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "cert_event" */
export type CertEventMinOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  certId?: InputMaybe<OrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "cert_event". */
export type CertEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  cert?: InputMaybe<CertOrderBy>;
  certId?: InputMaybe<OrderBy>;
  event?: InputMaybe<EventOrderBy>;
  eventId?: InputMaybe<OrderBy>;
  eventType?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
};

/** select columns of table "cert_event" */
export enum CertEventSelectColumn {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  CertId = 'certId',
  /** column name */
  EventId = 'eventId',
  /** column name */
  EventType = 'eventType',
  /** column name */
  Id = 'id'
}

/** aggregate stddev on columns */
export type CertEventStddevFields = {
  __typename?: 'CertEventStddevFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "cert_event" */
export type CertEventStddevOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CertEventStddevPopFields = {
  __typename?: 'CertEventStddevPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "cert_event" */
export type CertEventStddevPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CertEventStddevSampFields = {
  __typename?: 'CertEventStddevSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "cert_event" */
export type CertEventStddevSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type CertEventSumFields = {
  __typename?: 'CertEventSumFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "cert_event" */
export type CertEventSumOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type CertEventVarPopFields = {
  __typename?: 'CertEventVarPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "cert_event" */
export type CertEventVarPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CertEventVarSampFields = {
  __typename?: 'CertEventVarSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "cert_event" */
export type CertEventVarSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CertEventVarianceFields = {
  __typename?: 'CertEventVarianceFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "cert_event" */
export type CertEventVarianceOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate max on columns */
export type CertMaxFields = {
  __typename?: 'CertMaxFields';
  createdInId?: Maybe<Scalars['String']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  expireOn?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuerId?: Maybe<Scalars['String']['output']>;
  receiverId?: Maybe<Scalars['String']['output']>;
  updatedInId?: Maybe<Scalars['String']['output']>;
  updatedOn?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "cert" */
export type CertMaxOrderBy = {
  createdInId?: InputMaybe<OrderBy>;
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiverId?: InputMaybe<OrderBy>;
  updatedInId?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CertMinFields = {
  __typename?: 'CertMinFields';
  createdInId?: Maybe<Scalars['String']['output']>;
  createdOn?: Maybe<Scalars['Int']['output']>;
  expireOn?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuerId?: Maybe<Scalars['String']['output']>;
  receiverId?: Maybe<Scalars['String']['output']>;
  updatedInId?: Maybe<Scalars['String']['output']>;
  updatedOn?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "cert" */
export type CertMinOrderBy = {
  createdInId?: InputMaybe<OrderBy>;
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiverId?: InputMaybe<OrderBy>;
  updatedInId?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "cert". */
export type CertOrderBy = {
  certHistoryAggregate?: InputMaybe<CertEventAggregateOrderBy>;
  createdIn?: InputMaybe<EventOrderBy>;
  createdInId?: InputMaybe<OrderBy>;
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  isActive?: InputMaybe<OrderBy>;
  issuer?: InputMaybe<IdentityOrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiver?: InputMaybe<IdentityOrderBy>;
  receiverId?: InputMaybe<OrderBy>;
  updatedIn?: InputMaybe<EventOrderBy>;
  updatedInId?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** select columns of table "cert" */
export enum CertSelectColumn {
  /** column name */
  CreatedInId = 'createdInId',
  /** column name */
  CreatedOn = 'createdOn',
  /** column name */
  ExpireOn = 'expireOn',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'isActive',
  /** column name */
  IssuerId = 'issuerId',
  /** column name */
  ReceiverId = 'receiverId',
  /** column name */
  UpdatedInId = 'updatedInId',
  /** column name */
  UpdatedOn = 'updatedOn'
}

/** select "certAggregateBoolExpBool_andArgumentsColumns" columns of table "cert" */
export enum CertSelectColumnCertAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  IsActive = 'isActive'
}

/** select "certAggregateBoolExpBool_orArgumentsColumns" columns of table "cert" */
export enum CertSelectColumnCertAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  IsActive = 'isActive'
}

/** aggregate stddev on columns */
export type CertStddevFields = {
  __typename?: 'CertStddevFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "cert" */
export type CertStddevOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type CertStddevPopFields = {
  __typename?: 'CertStddevPopFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "cert" */
export type CertStddevPopOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type CertStddevSampFields = {
  __typename?: 'CertStddevSampFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "cert" */
export type CertStddevSampOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type CertSumFields = {
  __typename?: 'CertSumFields';
  createdOn?: Maybe<Scalars['Int']['output']>;
  expireOn?: Maybe<Scalars['Int']['output']>;
  updatedOn?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "cert" */
export type CertSumOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type CertVarPopFields = {
  __typename?: 'CertVarPopFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "cert" */
export type CertVarPopOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type CertVarSampFields = {
  __typename?: 'CertVarSampFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "cert" */
export type CertVarSampOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CertVarianceFields = {
  __typename?: 'CertVarianceFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
  expireOn?: Maybe<Scalars['Float']['output']>;
  updatedOn?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "cert" */
export type CertVarianceOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  updatedOn?: InputMaybe<OrderBy>;
};

/** columns and relationships of "change_owner_key" */
export type ChangeOwnerKey = Node & {
  __typename?: 'ChangeOwnerKey';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** An object relationship */
  identity?: Maybe<Identity>;
  identityId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  next?: Maybe<Account>;
  nextId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  previous?: Maybe<Account>;
  previousId?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "change_owner_key" */
export type ChangeOwnerKeyAggregate = {
  __typename?: 'ChangeOwnerKeyAggregate';
  aggregate?: Maybe<ChangeOwnerKeyAggregateFields>;
  nodes: Array<ChangeOwnerKey>;
};

export type ChangeOwnerKeyAggregateBoolExp = {
  count?: InputMaybe<ChangeOwnerKeyAggregateBoolExpCount>;
};

/** aggregate fields of "change_owner_key" */
export type ChangeOwnerKeyAggregateFields = {
  __typename?: 'ChangeOwnerKeyAggregateFields';
  avg?: Maybe<ChangeOwnerKeyAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ChangeOwnerKeyMaxFields>;
  min?: Maybe<ChangeOwnerKeyMinFields>;
  stddev?: Maybe<ChangeOwnerKeyStddevFields>;
  stddevPop?: Maybe<ChangeOwnerKeyStddevPopFields>;
  stddevSamp?: Maybe<ChangeOwnerKeyStddevSampFields>;
  sum?: Maybe<ChangeOwnerKeySumFields>;
  varPop?: Maybe<ChangeOwnerKeyVarPopFields>;
  varSamp?: Maybe<ChangeOwnerKeyVarSampFields>;
  variance?: Maybe<ChangeOwnerKeyVarianceFields>;
};


/** aggregate fields of "change_owner_key" */
export type ChangeOwnerKeyAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "change_owner_key" */
export type ChangeOwnerKeyAggregateOrderBy = {
  avg?: InputMaybe<ChangeOwnerKeyAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ChangeOwnerKeyMaxOrderBy>;
  min?: InputMaybe<ChangeOwnerKeyMinOrderBy>;
  stddev?: InputMaybe<ChangeOwnerKeyStddevOrderBy>;
  stddevPop?: InputMaybe<ChangeOwnerKeyStddevPopOrderBy>;
  stddevSamp?: InputMaybe<ChangeOwnerKeyStddevSampOrderBy>;
  sum?: InputMaybe<ChangeOwnerKeySumOrderBy>;
  varPop?: InputMaybe<ChangeOwnerKeyVarPopOrderBy>;
  varSamp?: InputMaybe<ChangeOwnerKeyVarSampOrderBy>;
  variance?: InputMaybe<ChangeOwnerKeyVarianceOrderBy>;
};

/** aggregate avg on columns */
export type ChangeOwnerKeyAvgFields = {
  __typename?: 'ChangeOwnerKeyAvgFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "change_owner_key" */
export type ChangeOwnerKeyAvgOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "change_owner_key". All fields are combined with a logical 'AND'. */
export type ChangeOwnerKeyBoolExp = {
  _and?: InputMaybe<Array<ChangeOwnerKeyBoolExp>>;
  _not?: InputMaybe<ChangeOwnerKeyBoolExp>;
  _or?: InputMaybe<Array<ChangeOwnerKeyBoolExp>>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  identity?: InputMaybe<IdentityBoolExp>;
  identityId?: InputMaybe<StringComparisonExp>;
  next?: InputMaybe<AccountBoolExp>;
  nextId?: InputMaybe<StringComparisonExp>;
  previous?: InputMaybe<AccountBoolExp>;
  previousId?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "change_owner_key" */
export type ChangeOwnerKeyConnection = {
  __typename?: 'ChangeOwnerKeyConnection';
  edges: Array<ChangeOwnerKeyEdge>;
  pageInfo: PageInfo;
};

export type ChangeOwnerKeyEdge = {
  __typename?: 'ChangeOwnerKeyEdge';
  cursor: Scalars['String']['output'];
  node: ChangeOwnerKey;
};

/** aggregate max on columns */
export type ChangeOwnerKeyMaxFields = {
  __typename?: 'ChangeOwnerKeyMaxFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
  nextId?: Maybe<Scalars['String']['output']>;
  previousId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "change_owner_key" */
export type ChangeOwnerKeyMaxOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
  nextId?: InputMaybe<OrderBy>;
  previousId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ChangeOwnerKeyMinFields = {
  __typename?: 'ChangeOwnerKeyMinFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
  nextId?: Maybe<Scalars['String']['output']>;
  previousId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "change_owner_key" */
export type ChangeOwnerKeyMinOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
  nextId?: InputMaybe<OrderBy>;
  previousId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "change_owner_key". */
export type ChangeOwnerKeyOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identity?: InputMaybe<IdentityOrderBy>;
  identityId?: InputMaybe<OrderBy>;
  next?: InputMaybe<AccountOrderBy>;
  nextId?: InputMaybe<OrderBy>;
  previous?: InputMaybe<AccountOrderBy>;
  previousId?: InputMaybe<OrderBy>;
};

/** select columns of table "change_owner_key" */
export enum ChangeOwnerKeySelectColumn {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityId = 'identityId',
  /** column name */
  NextId = 'nextId',
  /** column name */
  PreviousId = 'previousId'
}

/** aggregate stddev on columns */
export type ChangeOwnerKeyStddevFields = {
  __typename?: 'ChangeOwnerKeyStddevFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "change_owner_key" */
export type ChangeOwnerKeyStddevOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type ChangeOwnerKeyStddevPopFields = {
  __typename?: 'ChangeOwnerKeyStddevPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "change_owner_key" */
export type ChangeOwnerKeyStddevPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type ChangeOwnerKeyStddevSampFields = {
  __typename?: 'ChangeOwnerKeyStddevSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "change_owner_key" */
export type ChangeOwnerKeyStddevSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type ChangeOwnerKeySumFields = {
  __typename?: 'ChangeOwnerKeySumFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "change_owner_key" */
export type ChangeOwnerKeySumOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type ChangeOwnerKeyVarPopFields = {
  __typename?: 'ChangeOwnerKeyVarPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "change_owner_key" */
export type ChangeOwnerKeyVarPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type ChangeOwnerKeyVarSampFields = {
  __typename?: 'ChangeOwnerKeyVarSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "change_owner_key" */
export type ChangeOwnerKeyVarSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ChangeOwnerKeyVarianceFields = {
  __typename?: 'ChangeOwnerKeyVarianceFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "change_owner_key" */
export type ChangeOwnerKeyVarianceOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

export enum CounterLevelEnum {
  Global = 'GLOBAL',
  Item = 'ITEM',
  Pallet = 'PALLET'
}

/** Boolean expression to compare columns of type "CounterLevelEnum". All fields are combined with logical 'AND'. */
export type CounterLevelEnumComparisonExp = {
  _eq?: InputMaybe<CounterLevelEnum>;
  _in?: InputMaybe<Array<CounterLevelEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<CounterLevelEnum>;
  _nin?: InputMaybe<Array<CounterLevelEnum>>;
};

/** columns and relationships of "event" */
export type Event = Node & {
  __typename?: 'Event';
  args?: Maybe<Scalars['jsonb']['output']>;
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  /** An object relationship */
  block?: Maybe<Block>;
  blockId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  call?: Maybe<Call>;
  callId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  extrinsic?: Maybe<Extrinsic>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  phase: Scalars['String']['output'];
};


/** columns and relationships of "event" */
export type EventArgsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "event" */
export type EventAggregate = {
  __typename?: 'EventAggregate';
  aggregate?: Maybe<EventAggregateFields>;
  nodes: Array<Event>;
};

export type EventAggregateBoolExp = {
  count?: InputMaybe<EventAggregateBoolExpCount>;
};

/** aggregate fields of "event" */
export type EventAggregateFields = {
  __typename?: 'EventAggregateFields';
  avg?: Maybe<EventAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<EventMaxFields>;
  min?: Maybe<EventMinFields>;
  stddev?: Maybe<EventStddevFields>;
  stddevPop?: Maybe<EventStddevPopFields>;
  stddevSamp?: Maybe<EventStddevSampFields>;
  sum?: Maybe<EventSumFields>;
  varPop?: Maybe<EventVarPopFields>;
  varSamp?: Maybe<EventVarSampFields>;
  variance?: Maybe<EventVarianceFields>;
};


/** aggregate fields of "event" */
export type EventAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<EventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "event" */
export type EventAggregateOrderBy = {
  avg?: InputMaybe<EventAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<EventMaxOrderBy>;
  min?: InputMaybe<EventMinOrderBy>;
  stddev?: InputMaybe<EventStddevOrderBy>;
  stddevPop?: InputMaybe<EventStddevPopOrderBy>;
  stddevSamp?: InputMaybe<EventStddevSampOrderBy>;
  sum?: InputMaybe<EventSumOrderBy>;
  varPop?: InputMaybe<EventVarPopOrderBy>;
  varSamp?: InputMaybe<EventVarSampOrderBy>;
  variance?: InputMaybe<EventVarianceOrderBy>;
};

/** aggregate avg on columns */
export type EventAvgFields = {
  __typename?: 'EventAvgFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "event" */
export type EventAvgOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "event". All fields are combined with a logical 'AND'. */
export type EventBoolExp = {
  _and?: InputMaybe<Array<EventBoolExp>>;
  _not?: InputMaybe<EventBoolExp>;
  _or?: InputMaybe<Array<EventBoolExp>>;
  args?: InputMaybe<JsonbComparisonExp>;
  argsStr?: InputMaybe<StringArrayComparisonExp>;
  block?: InputMaybe<BlockBoolExp>;
  blockId?: InputMaybe<StringComparisonExp>;
  call?: InputMaybe<CallBoolExp>;
  callId?: InputMaybe<StringComparisonExp>;
  extrinsic?: InputMaybe<ExtrinsicBoolExp>;
  extrinsicId?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  index?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  pallet?: InputMaybe<StringComparisonExp>;
  phase?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "event" */
export type EventConnection = {
  __typename?: 'EventConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

/** aggregate max on columns */
export type EventMaxFields = {
  __typename?: 'EventMaxFields';
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  blockId?: Maybe<Scalars['String']['output']>;
  callId?: Maybe<Scalars['String']['output']>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "event" */
export type EventMaxOrderBy = {
  argsStr?: InputMaybe<OrderBy>;
  blockId?: InputMaybe<OrderBy>;
  callId?: InputMaybe<OrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  phase?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type EventMinFields = {
  __typename?: 'EventMinFields';
  argsStr?: Maybe<Array<Scalars['String']['output']>>;
  blockId?: Maybe<Scalars['String']['output']>;
  callId?: Maybe<Scalars['String']['output']>;
  extrinsicId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pallet?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "event" */
export type EventMinOrderBy = {
  argsStr?: InputMaybe<OrderBy>;
  blockId?: InputMaybe<OrderBy>;
  callId?: InputMaybe<OrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  phase?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "event". */
export type EventOrderBy = {
  args?: InputMaybe<OrderBy>;
  argsStr?: InputMaybe<OrderBy>;
  block?: InputMaybe<BlockOrderBy>;
  blockId?: InputMaybe<OrderBy>;
  call?: InputMaybe<CallOrderBy>;
  callId?: InputMaybe<OrderBy>;
  extrinsic?: InputMaybe<ExtrinsicOrderBy>;
  extrinsicId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  pallet?: InputMaybe<OrderBy>;
  phase?: InputMaybe<OrderBy>;
};

/** select columns of table "event" */
export enum EventSelectColumn {
  /** column name */
  Args = 'args',
  /** column name */
  ArgsStr = 'argsStr',
  /** column name */
  BlockId = 'blockId',
  /** column name */
  CallId = 'callId',
  /** column name */
  ExtrinsicId = 'extrinsicId',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  Name = 'name',
  /** column name */
  Pallet = 'pallet',
  /** column name */
  Phase = 'phase'
}

/** aggregate stddev on columns */
export type EventStddevFields = {
  __typename?: 'EventStddevFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "event" */
export type EventStddevOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type EventStddevPopFields = {
  __typename?: 'EventStddevPopFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "event" */
export type EventStddevPopOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type EventStddevSampFields = {
  __typename?: 'EventStddevSampFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "event" */
export type EventStddevSampOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type EventSumFields = {
  __typename?: 'EventSumFields';
  index?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "event" */
export type EventSumOrderBy = {
  index?: InputMaybe<OrderBy>;
};

export enum EventTypeEnum {
  Creation = 'CREATION',
  Removal = 'REMOVAL',
  Renewal = 'RENEWAL'
}

/** Boolean expression to compare columns of type "EventTypeEnum". All fields are combined with logical 'AND'. */
export type EventTypeEnumComparisonExp = {
  _eq?: InputMaybe<EventTypeEnum>;
  _in?: InputMaybe<Array<EventTypeEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<EventTypeEnum>;
  _nin?: InputMaybe<Array<EventTypeEnum>>;
};

/** aggregate varPop on columns */
export type EventVarPopFields = {
  __typename?: 'EventVarPopFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "event" */
export type EventVarPopOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type EventVarSampFields = {
  __typename?: 'EventVarSampFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "event" */
export type EventVarSampOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type EventVarianceFields = {
  __typename?: 'EventVarianceFields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "event" */
export type EventVarianceOrderBy = {
  index?: InputMaybe<OrderBy>;
};

/** columns and relationships of "extrinsic" */
export type Extrinsic = Node & {
  __typename?: 'Extrinsic';
  /** An object relationship */
  block?: Maybe<Block>;
  blockId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  call?: Maybe<Call>;
  callId?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  calls: Array<Call>;
  /** An aggregate relationship */
  callsAggregate: CallAggregate;
  /** An array relationship connection */
  calls_connection: CallConnection;
  error?: Maybe<Scalars['jsonb']['output']>;
  /** An array relationship */
  events: Array<Event>;
  /** An aggregate relationship */
  eventsAggregate: EventAggregate;
  /** An array relationship connection */
  events_connection: EventConnection;
  fee?: Maybe<Scalars['numeric']['output']>;
  hash: Scalars['bytea']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  signature?: Maybe<Scalars['jsonb']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
  version: Scalars['Int']['output'];
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicCallsArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicCallsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicCalls_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicErrorArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicEventsArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicEventsAggregateArgs = {
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicEvents_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


/** columns and relationships of "extrinsic" */
export type ExtrinsicSignatureArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "extrinsic" */
export type ExtrinsicAggregate = {
  __typename?: 'ExtrinsicAggregate';
  aggregate?: Maybe<ExtrinsicAggregateFields>;
  nodes: Array<Extrinsic>;
};

export type ExtrinsicAggregateBoolExp = {
  bool_and?: InputMaybe<ExtrinsicAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<ExtrinsicAggregateBoolExpBool_Or>;
  count?: InputMaybe<ExtrinsicAggregateBoolExpCount>;
};

/** aggregate fields of "extrinsic" */
export type ExtrinsicAggregateFields = {
  __typename?: 'ExtrinsicAggregateFields';
  avg?: Maybe<ExtrinsicAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<ExtrinsicMaxFields>;
  min?: Maybe<ExtrinsicMinFields>;
  stddev?: Maybe<ExtrinsicStddevFields>;
  stddevPop?: Maybe<ExtrinsicStddevPopFields>;
  stddevSamp?: Maybe<ExtrinsicStddevSampFields>;
  sum?: Maybe<ExtrinsicSumFields>;
  varPop?: Maybe<ExtrinsicVarPopFields>;
  varSamp?: Maybe<ExtrinsicVarSampFields>;
  variance?: Maybe<ExtrinsicVarianceFields>;
};


/** aggregate fields of "extrinsic" */
export type ExtrinsicAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "extrinsic" */
export type ExtrinsicAggregateOrderBy = {
  avg?: InputMaybe<ExtrinsicAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<ExtrinsicMaxOrderBy>;
  min?: InputMaybe<ExtrinsicMinOrderBy>;
  stddev?: InputMaybe<ExtrinsicStddevOrderBy>;
  stddevPop?: InputMaybe<ExtrinsicStddevPopOrderBy>;
  stddevSamp?: InputMaybe<ExtrinsicStddevSampOrderBy>;
  sum?: InputMaybe<ExtrinsicSumOrderBy>;
  varPop?: InputMaybe<ExtrinsicVarPopOrderBy>;
  varSamp?: InputMaybe<ExtrinsicVarSampOrderBy>;
  variance?: InputMaybe<ExtrinsicVarianceOrderBy>;
};

/** aggregate avg on columns */
export type ExtrinsicAvgFields = {
  __typename?: 'ExtrinsicAvgFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "extrinsic" */
export type ExtrinsicAvgOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "extrinsic". All fields are combined with a logical 'AND'. */
export type ExtrinsicBoolExp = {
  _and?: InputMaybe<Array<ExtrinsicBoolExp>>;
  _not?: InputMaybe<ExtrinsicBoolExp>;
  _or?: InputMaybe<Array<ExtrinsicBoolExp>>;
  block?: InputMaybe<BlockBoolExp>;
  blockId?: InputMaybe<StringComparisonExp>;
  call?: InputMaybe<CallBoolExp>;
  callId?: InputMaybe<StringComparisonExp>;
  calls?: InputMaybe<CallBoolExp>;
  callsAggregate?: InputMaybe<CallAggregateBoolExp>;
  error?: InputMaybe<JsonbComparisonExp>;
  events?: InputMaybe<EventBoolExp>;
  eventsAggregate?: InputMaybe<EventAggregateBoolExp>;
  fee?: InputMaybe<NumericComparisonExp>;
  hash?: InputMaybe<ByteaComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  index?: InputMaybe<IntComparisonExp>;
  signature?: InputMaybe<JsonbComparisonExp>;
  success?: InputMaybe<BooleanComparisonExp>;
  tip?: InputMaybe<NumericComparisonExp>;
  version?: InputMaybe<IntComparisonExp>;
};

/** A Relay connection object on "extrinsic" */
export type ExtrinsicConnection = {
  __typename?: 'ExtrinsicConnection';
  edges: Array<ExtrinsicEdge>;
  pageInfo: PageInfo;
};

export type ExtrinsicEdge = {
  __typename?: 'ExtrinsicEdge';
  cursor: Scalars['String']['output'];
  node: Extrinsic;
};

/** aggregate max on columns */
export type ExtrinsicMaxFields = {
  __typename?: 'ExtrinsicMaxFields';
  blockId?: Maybe<Scalars['String']['output']>;
  callId?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "extrinsic" */
export type ExtrinsicMaxOrderBy = {
  blockId?: InputMaybe<OrderBy>;
  callId?: InputMaybe<OrderBy>;
  fee?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type ExtrinsicMinFields = {
  __typename?: 'ExtrinsicMinFields';
  blockId?: Maybe<Scalars['String']['output']>;
  callId?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "extrinsic" */
export type ExtrinsicMinOrderBy = {
  blockId?: InputMaybe<OrderBy>;
  callId?: InputMaybe<OrderBy>;
  fee?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "extrinsic". */
export type ExtrinsicOrderBy = {
  block?: InputMaybe<BlockOrderBy>;
  blockId?: InputMaybe<OrderBy>;
  call?: InputMaybe<CallOrderBy>;
  callId?: InputMaybe<OrderBy>;
  callsAggregate?: InputMaybe<CallAggregateOrderBy>;
  error?: InputMaybe<OrderBy>;
  eventsAggregate?: InputMaybe<EventAggregateOrderBy>;
  fee?: InputMaybe<OrderBy>;
  hash?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  signature?: InputMaybe<OrderBy>;
  success?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** select columns of table "extrinsic" */
export enum ExtrinsicSelectColumn {
  /** column name */
  BlockId = 'blockId',
  /** column name */
  CallId = 'callId',
  /** column name */
  Error = 'error',
  /** column name */
  Fee = 'fee',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  Signature = 'signature',
  /** column name */
  Success = 'success',
  /** column name */
  Tip = 'tip',
  /** column name */
  Version = 'version'
}

/** select "extrinsicAggregateBoolExpBool_andArgumentsColumns" columns of table "extrinsic" */
export enum ExtrinsicSelectColumnExtrinsicAggregateBoolExpBool_AndArgumentsColumns {
  /** column name */
  Success = 'success'
}

/** select "extrinsicAggregateBoolExpBool_orArgumentsColumns" columns of table "extrinsic" */
export enum ExtrinsicSelectColumnExtrinsicAggregateBoolExpBool_OrArgumentsColumns {
  /** column name */
  Success = 'success'
}

/** aggregate stddev on columns */
export type ExtrinsicStddevFields = {
  __typename?: 'ExtrinsicStddevFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "extrinsic" */
export type ExtrinsicStddevOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type ExtrinsicStddevPopFields = {
  __typename?: 'ExtrinsicStddevPopFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "extrinsic" */
export type ExtrinsicStddevPopOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type ExtrinsicStddevSampFields = {
  __typename?: 'ExtrinsicStddevSampFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "extrinsic" */
export type ExtrinsicStddevSampOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type ExtrinsicSumFields = {
  __typename?: 'ExtrinsicSumFields';
  fee?: Maybe<Scalars['numeric']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  tip?: Maybe<Scalars['numeric']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "extrinsic" */
export type ExtrinsicSumOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type ExtrinsicVarPopFields = {
  __typename?: 'ExtrinsicVarPopFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "extrinsic" */
export type ExtrinsicVarPopOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type ExtrinsicVarSampFields = {
  __typename?: 'ExtrinsicVarSampFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "extrinsic" */
export type ExtrinsicVarSampOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type ExtrinsicVarianceFields = {
  __typename?: 'ExtrinsicVarianceFields';
  fee?: Maybe<Scalars['Float']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  tip?: Maybe<Scalars['Float']['output']>;
  version?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "extrinsic" */
export type ExtrinsicVarianceOrderBy = {
  fee?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  tip?: InputMaybe<OrderBy>;
  version?: InputMaybe<OrderBy>;
};

/** columns and relationships of "identity" */
export type Identity = Node & {
  __typename?: 'Identity';
  /** An object relationship */
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  certIssued: Array<Cert>;
  /** An aggregate relationship */
  certIssuedAggregate: CertAggregate;
  /** An array relationship connection */
  certIssued_connection: CertConnection;
  /** An array relationship */
  certReceived: Array<Cert>;
  /** An aggregate relationship */
  certReceivedAggregate: CertAggregate;
  /** An array relationship connection */
  certReceived_connection: CertConnection;
  /** An object relationship */
  createdIn?: Maybe<Event>;
  createdInId?: Maybe<Scalars['String']['output']>;
  createdOn: Scalars['Int']['output'];
  expireOn: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  isMember: Scalars['Boolean']['output'];
  lastChangeOn: Scalars['Int']['output'];
  /** An array relationship */
  linkedAccount: Array<Account>;
  /** An aggregate relationship */
  linkedAccountAggregate: AccountAggregate;
  /** An array relationship connection */
  linkedAccount_connection: AccountConnection;
  /** An array relationship */
  membershipHistory: Array<MembershipEvent>;
  /** An aggregate relationship */
  membershipHistoryAggregate: MembershipEventAggregate;
  /** An array relationship connection */
  membershipHistory_connection: MembershipEventConnection;
  name: Scalars['String']['output'];
  /** An array relationship */
  ownerKeyChange: Array<ChangeOwnerKey>;
  /** An aggregate relationship */
  ownerKeyChangeAggregate: ChangeOwnerKeyAggregate;
  /** An array relationship connection */
  ownerKeyChange_connection: ChangeOwnerKeyConnection;
  /** An array relationship */
  smithCertIssued: Array<SmithCert>;
  /** An aggregate relationship */
  smithCertIssuedAggregate: SmithCertAggregate;
  /** An array relationship connection */
  smithCertIssued_connection: SmithCertConnection;
  /** An array relationship */
  smithCertReceived: Array<SmithCert>;
  /** An aggregate relationship */
  smithCertReceivedAggregate: SmithCertAggregate;
  /** An array relationship connection */
  smithCertReceived_connection: SmithCertConnection;
  smithStatus?: Maybe<SmithStatusEnum>;
  status?: Maybe<IdentityStatusEnum>;
  /** "Get UD History by Identity" */
  udHistory?: Maybe<Array<UdHistory>>;
};


/** columns and relationships of "identity" */
export type IdentityCertIssuedArgs = {
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityCertIssuedAggregateArgs = {
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityCertIssued_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityCertReceivedArgs = {
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityCertReceivedAggregateArgs = {
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityCertReceived_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityLinkedAccountArgs = {
  distinctOn?: InputMaybe<Array<AccountSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
  where?: InputMaybe<AccountBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityLinkedAccountAggregateArgs = {
  distinctOn?: InputMaybe<Array<AccountSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
  where?: InputMaybe<AccountBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityLinkedAccount_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<AccountSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
  where?: InputMaybe<AccountBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityMembershipHistoryArgs = {
  distinctOn?: InputMaybe<Array<MembershipEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderBy>>;
  where?: InputMaybe<MembershipEventBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityMembershipHistoryAggregateArgs = {
  distinctOn?: InputMaybe<Array<MembershipEventSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderBy>>;
  where?: InputMaybe<MembershipEventBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityMembershipHistory_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<MembershipEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderBy>>;
  where?: InputMaybe<MembershipEventBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityOwnerKeyChangeArgs = {
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityOwnerKeyChangeAggregateArgs = {
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityOwnerKeyChange_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertIssuedArgs = {
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertIssuedAggregateArgs = {
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertIssued_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertReceivedArgs = {
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertReceivedAggregateArgs = {
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentitySmithCertReceived_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


/** columns and relationships of "identity" */
export type IdentityUdHistoryArgs = {
  distinctOn?: InputMaybe<Array<UdHistorySelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderBy>>;
  where?: InputMaybe<UdHistoryBoolExp>;
};

/** Boolean expression to filter rows from the table "identity". All fields are combined with a logical 'AND'. */
export type IdentityBoolExp = {
  _and?: InputMaybe<Array<IdentityBoolExp>>;
  _not?: InputMaybe<IdentityBoolExp>;
  _or?: InputMaybe<Array<IdentityBoolExp>>;
  account?: InputMaybe<AccountBoolExp>;
  accountId?: InputMaybe<StringComparisonExp>;
  certIssued?: InputMaybe<CertBoolExp>;
  certIssuedAggregate?: InputMaybe<CertAggregateBoolExp>;
  certReceived?: InputMaybe<CertBoolExp>;
  certReceivedAggregate?: InputMaybe<CertAggregateBoolExp>;
  createdIn?: InputMaybe<EventBoolExp>;
  createdInId?: InputMaybe<StringComparisonExp>;
  createdOn?: InputMaybe<IntComparisonExp>;
  expireOn?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  index?: InputMaybe<IntComparisonExp>;
  isMember?: InputMaybe<BooleanComparisonExp>;
  lastChangeOn?: InputMaybe<IntComparisonExp>;
  linkedAccount?: InputMaybe<AccountBoolExp>;
  linkedAccountAggregate?: InputMaybe<AccountAggregateBoolExp>;
  membershipHistory?: InputMaybe<MembershipEventBoolExp>;
  membershipHistoryAggregate?: InputMaybe<MembershipEventAggregateBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  ownerKeyChange?: InputMaybe<ChangeOwnerKeyBoolExp>;
  ownerKeyChangeAggregate?: InputMaybe<ChangeOwnerKeyAggregateBoolExp>;
  smithCertIssued?: InputMaybe<SmithCertBoolExp>;
  smithCertIssuedAggregate?: InputMaybe<SmithCertAggregateBoolExp>;
  smithCertReceived?: InputMaybe<SmithCertBoolExp>;
  smithCertReceivedAggregate?: InputMaybe<SmithCertAggregateBoolExp>;
  smithStatus?: InputMaybe<SmithStatusEnumComparisonExp>;
  status?: InputMaybe<IdentityStatusEnumComparisonExp>;
  udHistory?: InputMaybe<UdHistoryBoolExp>;
};

/** A Relay connection object on "identity" */
export type IdentityConnection = {
  __typename?: 'IdentityConnection';
  edges: Array<IdentityEdge>;
  pageInfo: PageInfo;
};

export type IdentityEdge = {
  __typename?: 'IdentityEdge';
  cursor: Scalars['String']['output'];
  node: Identity;
};

/** Ordering options when selecting data from "identity". */
export type IdentityOrderBy = {
  account?: InputMaybe<AccountOrderBy>;
  accountId?: InputMaybe<OrderBy>;
  certIssuedAggregate?: InputMaybe<CertAggregateOrderBy>;
  certReceivedAggregate?: InputMaybe<CertAggregateOrderBy>;
  createdIn?: InputMaybe<EventOrderBy>;
  createdInId?: InputMaybe<OrderBy>;
  createdOn?: InputMaybe<OrderBy>;
  expireOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  index?: InputMaybe<OrderBy>;
  isMember?: InputMaybe<OrderBy>;
  lastChangeOn?: InputMaybe<OrderBy>;
  linkedAccountAggregate?: InputMaybe<AccountAggregateOrderBy>;
  membershipHistoryAggregate?: InputMaybe<MembershipEventAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerKeyChangeAggregate?: InputMaybe<ChangeOwnerKeyAggregateOrderBy>;
  smithCertIssuedAggregate?: InputMaybe<SmithCertAggregateOrderBy>;
  smithCertReceivedAggregate?: InputMaybe<SmithCertAggregateOrderBy>;
  smithStatus?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  udHistoryAggregate?: InputMaybe<UdHistoryAggregateOrderBy>;
};

/** select columns of table "identity" */
export enum IdentitySelectColumn {
  /** column name */
  AccountId = 'accountId',
  /** column name */
  CreatedInId = 'createdInId',
  /** column name */
  CreatedOn = 'createdOn',
  /** column name */
  ExpireOn = 'expireOn',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  IsMember = 'isMember',
  /** column name */
  LastChangeOn = 'lastChangeOn',
  /** column name */
  Name = 'name',
  /** column name */
  SmithStatus = 'smithStatus',
  /** column name */
  Status = 'status'
}

export enum IdentityStatusEnum {
  Member = 'MEMBER',
  Notmember = 'NOTMEMBER',
  Removed = 'REMOVED',
  Revoked = 'REVOKED',
  Unconfirmed = 'UNCONFIRMED',
  Unvalidated = 'UNVALIDATED'
}

/** Boolean expression to compare columns of type "IdentityStatusEnum". All fields are combined with logical 'AND'. */
export type IdentityStatusEnumComparisonExp = {
  _eq?: InputMaybe<IdentityStatusEnum>;
  _in?: InputMaybe<Array<IdentityStatusEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<IdentityStatusEnum>;
  _nin?: InputMaybe<Array<IdentityStatusEnum>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntArrayComparisonExp = {
  /** is the array contained in the given array value */
  _containedIn?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  _eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _lte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _neq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ItemTypeEnum {
  Calls = 'CALLS',
  Events = 'EVENTS',
  Extrinsics = 'EXTRINSICS'
}

/** Boolean expression to compare columns of type "ItemTypeEnum". All fields are combined with logical 'AND'. */
export type ItemTypeEnumComparisonExp = {
  _eq?: InputMaybe<ItemTypeEnum>;
  _in?: InputMaybe<Array<ItemTypeEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<ItemTypeEnum>;
  _nin?: InputMaybe<Array<ItemTypeEnum>>;
};

/** columns and relationships of "items_counter" */
export type ItemsCounter = Node & {
  __typename?: 'ItemsCounter';
  id: Scalars['ID']['output'];
  level?: Maybe<CounterLevelEnum>;
  total: Scalars['Int']['output'];
  type?: Maybe<ItemTypeEnum>;
};

/** Boolean expression to filter rows from the table "items_counter". All fields are combined with a logical 'AND'. */
export type ItemsCounterBoolExp = {
  _and?: InputMaybe<Array<ItemsCounterBoolExp>>;
  _not?: InputMaybe<ItemsCounterBoolExp>;
  _or?: InputMaybe<Array<ItemsCounterBoolExp>>;
  id?: InputMaybe<StringComparisonExp>;
  level?: InputMaybe<CounterLevelEnumComparisonExp>;
  total?: InputMaybe<IntComparisonExp>;
  type?: InputMaybe<ItemTypeEnumComparisonExp>;
};

/** A Relay connection object on "items_counter" */
export type ItemsCounterConnection = {
  __typename?: 'ItemsCounterConnection';
  edges: Array<ItemsCounterEdge>;
  pageInfo: PageInfo;
};

export type ItemsCounterEdge = {
  __typename?: 'ItemsCounterEdge';
  cursor: Scalars['String']['output'];
  node: ItemsCounter;
};

/** Ordering options when selecting data from "items_counter". */
export type ItemsCounterOrderBy = {
  id?: InputMaybe<OrderBy>;
  level?: InputMaybe<OrderBy>;
  total?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
};

/** select columns of table "items_counter" */
export enum ItemsCounterSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  Total = 'total',
  /** column name */
  Type = 'type'
}

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "membership_event" */
export type MembershipEvent = Node & {
  __typename?: 'MembershipEvent';
  blockNumber: Scalars['Int']['output'];
  /** An object relationship */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<EventTypeEnum>;
  id: Scalars['ID']['output'];
  /** An object relationship */
  identity?: Maybe<Identity>;
  identityId?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "membership_event" */
export type MembershipEventAggregate = {
  __typename?: 'MembershipEventAggregate';
  aggregate?: Maybe<MembershipEventAggregateFields>;
  nodes: Array<MembershipEvent>;
};

export type MembershipEventAggregateBoolExp = {
  count?: InputMaybe<MembershipEventAggregateBoolExpCount>;
};

/** aggregate fields of "membership_event" */
export type MembershipEventAggregateFields = {
  __typename?: 'MembershipEventAggregateFields';
  avg?: Maybe<MembershipEventAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<MembershipEventMaxFields>;
  min?: Maybe<MembershipEventMinFields>;
  stddev?: Maybe<MembershipEventStddevFields>;
  stddevPop?: Maybe<MembershipEventStddevPopFields>;
  stddevSamp?: Maybe<MembershipEventStddevSampFields>;
  sum?: Maybe<MembershipEventSumFields>;
  varPop?: Maybe<MembershipEventVarPopFields>;
  varSamp?: Maybe<MembershipEventVarSampFields>;
  variance?: Maybe<MembershipEventVarianceFields>;
};


/** aggregate fields of "membership_event" */
export type MembershipEventAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<MembershipEventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "membership_event" */
export type MembershipEventAggregateOrderBy = {
  avg?: InputMaybe<MembershipEventAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<MembershipEventMaxOrderBy>;
  min?: InputMaybe<MembershipEventMinOrderBy>;
  stddev?: InputMaybe<MembershipEventStddevOrderBy>;
  stddevPop?: InputMaybe<MembershipEventStddevPopOrderBy>;
  stddevSamp?: InputMaybe<MembershipEventStddevSampOrderBy>;
  sum?: InputMaybe<MembershipEventSumOrderBy>;
  varPop?: InputMaybe<MembershipEventVarPopOrderBy>;
  varSamp?: InputMaybe<MembershipEventVarSampOrderBy>;
  variance?: InputMaybe<MembershipEventVarianceOrderBy>;
};

/** aggregate avg on columns */
export type MembershipEventAvgFields = {
  __typename?: 'MembershipEventAvgFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "membership_event" */
export type MembershipEventAvgOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "membership_event". All fields are combined with a logical 'AND'. */
export type MembershipEventBoolExp = {
  _and?: InputMaybe<Array<MembershipEventBoolExp>>;
  _not?: InputMaybe<MembershipEventBoolExp>;
  _or?: InputMaybe<Array<MembershipEventBoolExp>>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  event?: InputMaybe<EventBoolExp>;
  eventId?: InputMaybe<StringComparisonExp>;
  eventType?: InputMaybe<EventTypeEnumComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  identity?: InputMaybe<IdentityBoolExp>;
  identityId?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "membership_event" */
export type MembershipEventConnection = {
  __typename?: 'MembershipEventConnection';
  edges: Array<MembershipEventEdge>;
  pageInfo: PageInfo;
};

export type MembershipEventEdge = {
  __typename?: 'MembershipEventEdge';
  cursor: Scalars['String']['output'];
  node: MembershipEvent;
};

/** aggregate max on columns */
export type MembershipEventMaxFields = {
  __typename?: 'MembershipEventMaxFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "membership_event" */
export type MembershipEventMaxOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type MembershipEventMinFields = {
  __typename?: 'MembershipEventMinFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "membership_event" */
export type MembershipEventMinOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "membership_event". */
export type MembershipEventOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  event?: InputMaybe<EventOrderBy>;
  eventId?: InputMaybe<OrderBy>;
  eventType?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identity?: InputMaybe<IdentityOrderBy>;
  identityId?: InputMaybe<OrderBy>;
};

/** select columns of table "membership_event" */
export enum MembershipEventSelectColumn {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  EventId = 'eventId',
  /** column name */
  EventType = 'eventType',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityId = 'identityId'
}

/** aggregate stddev on columns */
export type MembershipEventStddevFields = {
  __typename?: 'MembershipEventStddevFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "membership_event" */
export type MembershipEventStddevOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type MembershipEventStddevPopFields = {
  __typename?: 'MembershipEventStddevPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "membership_event" */
export type MembershipEventStddevPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type MembershipEventStddevSampFields = {
  __typename?: 'MembershipEventStddevSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "membership_event" */
export type MembershipEventStddevSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type MembershipEventSumFields = {
  __typename?: 'MembershipEventSumFields';
  blockNumber?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "membership_event" */
export type MembershipEventSumOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type MembershipEventVarPopFields = {
  __typename?: 'MembershipEventVarPopFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "membership_event" */
export type MembershipEventVarPopOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type MembershipEventVarSampFields = {
  __typename?: 'MembershipEventVarSampFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "membership_event" */
export type MembershipEventVarSampOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type MembershipEventVarianceFields = {
  __typename?: 'MembershipEventVarianceFields';
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "membership_event" */
export type MembershipEventVarianceOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
};

/** An object with globally unique ID */
export type Node = {
  /** A globally unique identifier */
  id: Scalars['ID']['output'];
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

/** columns and relationships of "smith_cert" */
export type SmithCert = Node & {
  __typename?: 'SmithCert';
  createdOn: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** An object relationship */
  issuer?: Maybe<Identity>;
  issuerId?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  receiver?: Maybe<Identity>;
  receiverId?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "smith_cert" */
export type SmithCertAggregate = {
  __typename?: 'SmithCertAggregate';
  aggregate?: Maybe<SmithCertAggregateFields>;
  nodes: Array<SmithCert>;
};

export type SmithCertAggregateBoolExp = {
  count?: InputMaybe<SmithCertAggregateBoolExpCount>;
};

/** aggregate fields of "smith_cert" */
export type SmithCertAggregateFields = {
  __typename?: 'SmithCertAggregateFields';
  avg?: Maybe<SmithCertAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SmithCertMaxFields>;
  min?: Maybe<SmithCertMinFields>;
  stddev?: Maybe<SmithCertStddevFields>;
  stddevPop?: Maybe<SmithCertStddevPopFields>;
  stddevSamp?: Maybe<SmithCertStddevSampFields>;
  sum?: Maybe<SmithCertSumFields>;
  varPop?: Maybe<SmithCertVarPopFields>;
  varSamp?: Maybe<SmithCertVarSampFields>;
  variance?: Maybe<SmithCertVarianceFields>;
};


/** aggregate fields of "smith_cert" */
export type SmithCertAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SmithCertSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "smith_cert" */
export type SmithCertAggregateOrderBy = {
  avg?: InputMaybe<SmithCertAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SmithCertMaxOrderBy>;
  min?: InputMaybe<SmithCertMinOrderBy>;
  stddev?: InputMaybe<SmithCertStddevOrderBy>;
  stddevPop?: InputMaybe<SmithCertStddevPopOrderBy>;
  stddevSamp?: InputMaybe<SmithCertStddevSampOrderBy>;
  sum?: InputMaybe<SmithCertSumOrderBy>;
  varPop?: InputMaybe<SmithCertVarPopOrderBy>;
  varSamp?: InputMaybe<SmithCertVarSampOrderBy>;
  variance?: InputMaybe<SmithCertVarianceOrderBy>;
};

/** aggregate avg on columns */
export type SmithCertAvgFields = {
  __typename?: 'SmithCertAvgFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "smith_cert" */
export type SmithCertAvgOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "smith_cert". All fields are combined with a logical 'AND'. */
export type SmithCertBoolExp = {
  _and?: InputMaybe<Array<SmithCertBoolExp>>;
  _not?: InputMaybe<SmithCertBoolExp>;
  _or?: InputMaybe<Array<SmithCertBoolExp>>;
  createdOn?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  issuer?: InputMaybe<IdentityBoolExp>;
  issuerId?: InputMaybe<StringComparisonExp>;
  receiver?: InputMaybe<IdentityBoolExp>;
  receiverId?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "smith_cert" */
export type SmithCertConnection = {
  __typename?: 'SmithCertConnection';
  edges: Array<SmithCertEdge>;
  pageInfo: PageInfo;
};

export type SmithCertEdge = {
  __typename?: 'SmithCertEdge';
  cursor: Scalars['String']['output'];
  node: SmithCert;
};

/** aggregate max on columns */
export type SmithCertMaxFields = {
  __typename?: 'SmithCertMaxFields';
  createdOn?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuerId?: Maybe<Scalars['String']['output']>;
  receiverId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "smith_cert" */
export type SmithCertMaxOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiverId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SmithCertMinFields = {
  __typename?: 'SmithCertMinFields';
  createdOn?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  issuerId?: Maybe<Scalars['String']['output']>;
  receiverId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "smith_cert" */
export type SmithCertMinOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiverId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "smith_cert". */
export type SmithCertOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  issuer?: InputMaybe<IdentityOrderBy>;
  issuerId?: InputMaybe<OrderBy>;
  receiver?: InputMaybe<IdentityOrderBy>;
  receiverId?: InputMaybe<OrderBy>;
};

/** select columns of table "smith_cert" */
export enum SmithCertSelectColumn {
  /** column name */
  CreatedOn = 'createdOn',
  /** column name */
  Id = 'id',
  /** column name */
  IssuerId = 'issuerId',
  /** column name */
  ReceiverId = 'receiverId'
}

/** aggregate stddev on columns */
export type SmithCertStddevFields = {
  __typename?: 'SmithCertStddevFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "smith_cert" */
export type SmithCertStddevOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type SmithCertStddevPopFields = {
  __typename?: 'SmithCertStddevPopFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "smith_cert" */
export type SmithCertStddevPopOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type SmithCertStddevSampFields = {
  __typename?: 'SmithCertStddevSampFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "smith_cert" */
export type SmithCertStddevSampOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type SmithCertSumFields = {
  __typename?: 'SmithCertSumFields';
  createdOn?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "smith_cert" */
export type SmithCertSumOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type SmithCertVarPopFields = {
  __typename?: 'SmithCertVarPopFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "smith_cert" */
export type SmithCertVarPopOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type SmithCertVarSampFields = {
  __typename?: 'SmithCertVarSampFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "smith_cert" */
export type SmithCertVarSampOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type SmithCertVarianceFields = {
  __typename?: 'SmithCertVarianceFields';
  createdOn?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "smith_cert" */
export type SmithCertVarianceOrderBy = {
  createdOn?: InputMaybe<OrderBy>;
};

export enum SmithStatusEnum {
  Excluded = 'EXCLUDED',
  Invited = 'INVITED',
  Pending = 'PENDING',
  Smith = 'SMITH'
}

/** Boolean expression to compare columns of type "SmithStatusEnum". All fields are combined with logical 'AND'. */
export type SmithStatusEnumComparisonExp = {
  _eq?: InputMaybe<SmithStatusEnum>;
  _in?: InputMaybe<Array<SmithStatusEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<SmithStatusEnum>;
  _nin?: InputMaybe<Array<SmithStatusEnum>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringArrayComparisonExp = {
  /** is the array contained in the given array value */
  _containedIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "transfer" */
export type Transfer = Node & {
  __typename?: 'Transfer';
  amount: Scalars['numeric']['output'];
  blockNumber: Scalars['Int']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  from?: Maybe<Account>;
  fromId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  timestamp: Scalars['timestamptz']['output'];
  /** An object relationship */
  to?: Maybe<Account>;
  toId?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "transfer" */
export type TransferAggregate = {
  __typename?: 'TransferAggregate';
  aggregate?: Maybe<TransferAggregateFields>;
  nodes: Array<Transfer>;
};

export type TransferAggregateBoolExp = {
  count?: InputMaybe<TransferAggregateBoolExpCount>;
};

/** aggregate fields of "transfer" */
export type TransferAggregateFields = {
  __typename?: 'TransferAggregateFields';
  avg?: Maybe<TransferAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<TransferMaxFields>;
  min?: Maybe<TransferMinFields>;
  stddev?: Maybe<TransferStddevFields>;
  stddevPop?: Maybe<TransferStddevPopFields>;
  stddevSamp?: Maybe<TransferStddevSampFields>;
  sum?: Maybe<TransferSumFields>;
  varPop?: Maybe<TransferVarPopFields>;
  varSamp?: Maybe<TransferVarSampFields>;
  variance?: Maybe<TransferVarianceFields>;
};


/** aggregate fields of "transfer" */
export type TransferAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<TransferSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "transfer" */
export type TransferAggregateOrderBy = {
  avg?: InputMaybe<TransferAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<TransferMaxOrderBy>;
  min?: InputMaybe<TransferMinOrderBy>;
  stddev?: InputMaybe<TransferStddevOrderBy>;
  stddevPop?: InputMaybe<TransferStddevPopOrderBy>;
  stddevSamp?: InputMaybe<TransferStddevSampOrderBy>;
  sum?: InputMaybe<TransferSumOrderBy>;
  varPop?: InputMaybe<TransferVarPopOrderBy>;
  varSamp?: InputMaybe<TransferVarSampOrderBy>;
  variance?: InputMaybe<TransferVarianceOrderBy>;
};

/** aggregate avg on columns */
export type TransferAvgFields = {
  __typename?: 'TransferAvgFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "transfer" */
export type TransferAvgOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "transfer". All fields are combined with a logical 'AND'. */
export type TransferBoolExp = {
  _and?: InputMaybe<Array<TransferBoolExp>>;
  _not?: InputMaybe<TransferBoolExp>;
  _or?: InputMaybe<Array<TransferBoolExp>>;
  amount?: InputMaybe<NumericComparisonExp>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  comment?: InputMaybe<StringComparisonExp>;
  from?: InputMaybe<AccountBoolExp>;
  fromId?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  timestamp?: InputMaybe<TimestamptzComparisonExp>;
  to?: InputMaybe<AccountBoolExp>;
  toId?: InputMaybe<StringComparisonExp>;
};

/** A Relay connection object on "transfer" */
export type TransferConnection = {
  __typename?: 'TransferConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
};

export type TransferEdge = {
  __typename?: 'TransferEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

/** aggregate max on columns */
export type TransferMaxFields = {
  __typename?: 'TransferMaxFields';
  amount?: Maybe<Scalars['numeric']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  fromId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  toId?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "transfer" */
export type TransferMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  comment?: InputMaybe<OrderBy>;
  fromId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  toId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type TransferMinFields = {
  __typename?: 'TransferMinFields';
  amount?: Maybe<Scalars['numeric']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  fromId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['timestamptz']['output']>;
  toId?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "transfer" */
export type TransferMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  comment?: InputMaybe<OrderBy>;
  fromId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  toId?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "transfer". */
export type TransferOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  comment?: InputMaybe<OrderBy>;
  from?: InputMaybe<AccountOrderBy>;
  fromId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
  to?: InputMaybe<AccountOrderBy>;
  toId?: InputMaybe<OrderBy>;
};

/** select columns of table "transfer" */
export enum TransferSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  Comment = 'comment',
  /** column name */
  FromId = 'fromId',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  ToId = 'toId'
}

/** aggregate stddev on columns */
export type TransferStddevFields = {
  __typename?: 'TransferStddevFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "transfer" */
export type TransferStddevOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevPop on columns */
export type TransferStddevPopFields = {
  __typename?: 'TransferStddevPopFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevPop() on columns of table "transfer" */
export type TransferStddevPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate stddevSamp on columns */
export type TransferStddevSampFields = {
  __typename?: 'TransferStddevSampFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by stddevSamp() on columns of table "transfer" */
export type TransferStddevSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate sum on columns */
export type TransferSumFields = {
  __typename?: 'TransferSumFields';
  amount?: Maybe<Scalars['numeric']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "transfer" */
export type TransferSumOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varPop on columns */
export type TransferVarPopFields = {
  __typename?: 'TransferVarPopFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varPop() on columns of table "transfer" */
export type TransferVarPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate varSamp on columns */
export type TransferVarSampFields = {
  __typename?: 'TransferVarSampFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by varSamp() on columns of table "transfer" */
export type TransferVarSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type TransferVarianceFields = {
  __typename?: 'TransferVarianceFields';
  amount?: Maybe<Scalars['Float']['output']>;
  blockNumber?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "transfer" */
export type TransferVarianceOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** columns and relationships of "ud_history" */
export type UdHistory = Node & {
  __typename?: 'UdHistory';
  amount: Scalars['Int']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** An object relationship */
  identity?: Maybe<Identity>;
  identityId?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['timestamptz']['output'];
};

/** order by aggregate values of table "ud_history" */
export type UdHistoryAggregateOrderBy = {
  avg?: InputMaybe<UdHistoryAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<UdHistoryMaxOrderBy>;
  min?: InputMaybe<UdHistoryMinOrderBy>;
  stddev?: InputMaybe<UdHistoryStddevOrderBy>;
  stddevPop?: InputMaybe<UdHistoryStddevPopOrderBy>;
  stddevSamp?: InputMaybe<UdHistoryStddevSampOrderBy>;
  sum?: InputMaybe<UdHistorySumOrderBy>;
  varPop?: InputMaybe<UdHistoryVarPopOrderBy>;
  varSamp?: InputMaybe<UdHistoryVarSampOrderBy>;
  variance?: InputMaybe<UdHistoryVarianceOrderBy>;
};

/** order by avg() on columns of table "ud_history" */
export type UdHistoryAvgOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "ud_history". All fields are combined with a logical 'AND'. */
export type UdHistoryBoolExp = {
  _and?: InputMaybe<Array<UdHistoryBoolExp>>;
  _not?: InputMaybe<UdHistoryBoolExp>;
  _or?: InputMaybe<Array<UdHistoryBoolExp>>;
  amount?: InputMaybe<IntComparisonExp>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  identity?: InputMaybe<IdentityBoolExp>;
  identityId?: InputMaybe<StringComparisonExp>;
  timestamp?: InputMaybe<TimestamptzComparisonExp>;
};

/** A Relay connection object on "ud_history" */
export type UdHistoryConnection = {
  __typename?: 'UdHistoryConnection';
  edges: Array<UdHistoryEdge>;
  pageInfo: PageInfo;
};

export type UdHistoryEdge = {
  __typename?: 'UdHistoryEdge';
  cursor: Scalars['String']['output'];
  node: UdHistory;
};

/** order by max() on columns of table "ud_history" */
export type UdHistoryMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "ud_history" */
export type UdHistoryMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identityId?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** Ordering options when selecting data from "ud_history". */
export type UdHistoryOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  identity?: InputMaybe<IdentityOrderBy>;
  identityId?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** select columns of table "ud_history" */
export enum UdHistorySelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  Id = 'id',
  /** column name */
  IdentityId = 'identityId',
  /** column name */
  Timestamp = 'timestamp'
}

/** order by stddev() on columns of table "ud_history" */
export type UdHistoryStddevOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by stddevPop() on columns of table "ud_history" */
export type UdHistoryStddevPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by stddevSamp() on columns of table "ud_history" */
export type UdHistoryStddevSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by sum() on columns of table "ud_history" */
export type UdHistorySumOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by varPop() on columns of table "ud_history" */
export type UdHistoryVarPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by varSamp() on columns of table "ud_history" */
export type UdHistoryVarSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "ud_history" */
export type UdHistoryVarianceOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
};

/** columns and relationships of "ud_reeval" */
export type UdReeval = Node & {
  __typename?: 'UdReeval';
  blockNumber: Scalars['Int']['output'];
  /** An object relationship */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  membersCount: Scalars['Int']['output'];
  monetaryMass: Scalars['numeric']['output'];
  newUdAmount: Scalars['Int']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** Boolean expression to filter rows from the table "ud_reeval". All fields are combined with a logical 'AND'. */
export type UdReevalBoolExp = {
  _and?: InputMaybe<Array<UdReevalBoolExp>>;
  _not?: InputMaybe<UdReevalBoolExp>;
  _or?: InputMaybe<Array<UdReevalBoolExp>>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  event?: InputMaybe<EventBoolExp>;
  eventId?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  membersCount?: InputMaybe<IntComparisonExp>;
  monetaryMass?: InputMaybe<NumericComparisonExp>;
  newUdAmount?: InputMaybe<IntComparisonExp>;
  timestamp?: InputMaybe<TimestamptzComparisonExp>;
};

/** A Relay connection object on "ud_reeval" */
export type UdReevalConnection = {
  __typename?: 'UdReevalConnection';
  edges: Array<UdReevalEdge>;
  pageInfo: PageInfo;
};

export type UdReevalEdge = {
  __typename?: 'UdReevalEdge';
  cursor: Scalars['String']['output'];
  node: UdReeval;
};

/** Ordering options when selecting data from "ud_reeval". */
export type UdReevalOrderBy = {
  blockNumber?: InputMaybe<OrderBy>;
  event?: InputMaybe<EventOrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  membersCount?: InputMaybe<OrderBy>;
  monetaryMass?: InputMaybe<OrderBy>;
  newUdAmount?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** select columns of table "ud_reeval" */
export enum UdReevalSelectColumn {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  MembersCount = 'membersCount',
  /** column name */
  MonetaryMass = 'monetaryMass',
  /** column name */
  NewUdAmount = 'newUdAmount',
  /** column name */
  Timestamp = 'timestamp'
}

/** columns and relationships of "universal_dividend" */
export type UniversalDividend = Node & {
  __typename?: 'UniversalDividend';
  amount: Scalars['Int']['output'];
  blockNumber: Scalars['Int']['output'];
  /** An object relationship */
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  membersCount: Scalars['Int']['output'];
  monetaryMass: Scalars['numeric']['output'];
  timestamp: Scalars['timestamptz']['output'];
};

/** Boolean expression to filter rows from the table "universal_dividend". All fields are combined with a logical 'AND'. */
export type UniversalDividendBoolExp = {
  _and?: InputMaybe<Array<UniversalDividendBoolExp>>;
  _not?: InputMaybe<UniversalDividendBoolExp>;
  _or?: InputMaybe<Array<UniversalDividendBoolExp>>;
  amount?: InputMaybe<IntComparisonExp>;
  blockNumber?: InputMaybe<IntComparisonExp>;
  event?: InputMaybe<EventBoolExp>;
  eventId?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  membersCount?: InputMaybe<IntComparisonExp>;
  monetaryMass?: InputMaybe<NumericComparisonExp>;
  timestamp?: InputMaybe<TimestamptzComparisonExp>;
};

/** A Relay connection object on "universal_dividend" */
export type UniversalDividendConnection = {
  __typename?: 'UniversalDividendConnection';
  edges: Array<UniversalDividendEdge>;
  pageInfo: PageInfo;
};

export type UniversalDividendEdge = {
  __typename?: 'UniversalDividendEdge';
  cursor: Scalars['String']['output'];
  node: UniversalDividend;
};

/** Ordering options when selecting data from "universal_dividend". */
export type UniversalDividendOrderBy = {
  amount?: InputMaybe<OrderBy>;
  blockNumber?: InputMaybe<OrderBy>;
  event?: InputMaybe<EventOrderBy>;
  eventId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  membersCount?: InputMaybe<OrderBy>;
  monetaryMass?: InputMaybe<OrderBy>;
  timestamp?: InputMaybe<OrderBy>;
};

/** select columns of table "universal_dividend" */
export enum UniversalDividendSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  EventId = 'eventId',
  /** column name */
  Id = 'id',
  /** column name */
  MembersCount = 'membersCount',
  /** column name */
  MonetaryMass = 'monetaryMass',
  /** column name */
  Timestamp = 'timestamp'
}

export type AccountAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<AccountSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AccountBoolExp>;
  predicate: IntComparisonExp;
};

export type CallAggregateBoolExpBool_And = {
  arguments: CallSelectColumnCallAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CallBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CallAggregateBoolExpBool_Or = {
  arguments: CallSelectColumnCallAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CallBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CallAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CallSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CallBoolExp>;
  predicate: IntComparisonExp;
};

export type CertAggregateBoolExpBool_And = {
  arguments: CertSelectColumnCertAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CertBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CertAggregateBoolExpBool_Or = {
  arguments: CertSelectColumnCertAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CertBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CertAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CertSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CertBoolExp>;
  predicate: IntComparisonExp;
};

export type CertEventAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CertEventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CertEventBoolExp>;
  predicate: IntComparisonExp;
};

export type ChangeOwnerKeyAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ChangeOwnerKeyBoolExp>;
  predicate: IntComparisonExp;
};

export type EventAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<EventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<EventBoolExp>;
  predicate: IntComparisonExp;
};

export type ExtrinsicAggregateBoolExpBool_And = {
  arguments: ExtrinsicSelectColumnExtrinsicAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ExtrinsicBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ExtrinsicAggregateBoolExpBool_Or = {
  arguments: ExtrinsicSelectColumnExtrinsicAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ExtrinsicBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ExtrinsicAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ExtrinsicBoolExp>;
  predicate: IntComparisonExp;
};

export type GetUdHistoryArgs = {
  identity_row?: InputMaybe<Scalars['identity_scalar']['input']>;
};

export type MembershipEventAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<MembershipEventSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<MembershipEventBoolExp>;
  predicate: IntComparisonExp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "account" */
  accountConnection: AccountConnection;
  /** fetch data from the table: "block" */
  blockConnection: BlockConnection;
  /** fetch data from the table: "call" */
  callConnection: CallConnection;
  /** fetch data from the table: "cert" */
  certConnection: CertConnection;
  /** fetch data from the table: "cert_event" */
  certEventConnection: CertEventConnection;
  /** fetch data from the table: "change_owner_key" */
  changeOwnerKeyConnection: ChangeOwnerKeyConnection;
  /** fetch data from the table: "event" */
  eventConnection: EventConnection;
  /** fetch data from the table: "extrinsic" */
  extrinsicConnection: ExtrinsicConnection;
  /** execute function "get_ud_history" which returns "ud_history" */
  getUdHistory_connection: UdHistoryConnection;
  /** fetch data from the table: "identity" */
  identityConnection: IdentityConnection;
  /** fetch data from the table: "items_counter" */
  itemsCounterConnection: ItemsCounterConnection;
  /** fetch data from the table: "membership_event" */
  membershipEventConnection: MembershipEventConnection;
  node?: Maybe<Node>;
  /** fetch data from the table: "smith_cert" */
  smithCertConnection: SmithCertConnection;
  /** fetch data from the table: "transfer" */
  transferConnection: TransferConnection;
  /** fetch data from the table: "ud_history" */
  udHistoryConnection: UdHistoryConnection;
  /** fetch data from the table: "ud_reeval" */
  udReevalConnection: UdReevalConnection;
  /** fetch data from the table: "universal_dividend" */
  universalDividendConnection: UniversalDividendConnection;
};


export type Query_RootAccountConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<AccountSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
  where?: InputMaybe<AccountBoolExp>;
};


export type Query_RootBlockConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<BlockSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderBy>>;
  where?: InputMaybe<BlockBoolExp>;
};


export type Query_RootCallConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


export type Query_RootCertConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


export type Query_RootCertEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderBy>>;
  where?: InputMaybe<CertEventBoolExp>;
};


export type Query_RootChangeOwnerKeyConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


export type Query_RootEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


export type Query_RootExtrinsicConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderBy>>;
  where?: InputMaybe<ExtrinsicBoolExp>;
};


export type Query_RootGetUdHistory_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  args: GetUdHistoryArgs;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdHistorySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderBy>>;
  where?: InputMaybe<UdHistoryBoolExp>;
};


export type Query_RootIdentityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<IdentitySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IdentityOrderBy>>;
  where?: InputMaybe<IdentityBoolExp>;
};


export type Query_RootItemsCounterConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ItemsCounterSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderBy>>;
  where?: InputMaybe<ItemsCounterBoolExp>;
};


export type Query_RootMembershipEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<MembershipEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderBy>>;
  where?: InputMaybe<MembershipEventBoolExp>;
};


export type Query_RootNodeArgs = {
  id: Scalars['ID']['input'];
};


export type Query_RootSmithCertConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


export type Query_RootTransferConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


export type Query_RootUdHistoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdHistorySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderBy>>;
  where?: InputMaybe<UdHistoryBoolExp>;
};


export type Query_RootUdReevalConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdReevalSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdReevalOrderBy>>;
  where?: InputMaybe<UdReevalBoolExp>;
};


export type Query_RootUniversalDividendConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UniversalDividendSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UniversalDividendOrderBy>>;
  where?: InputMaybe<UniversalDividendBoolExp>;
};

export type SmithCertAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SmithCertSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SmithCertBoolExp>;
  predicate: IntComparisonExp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "account" */
  accountConnection: AccountConnection;
  /** fetch data from the table: "block" */
  blockConnection: BlockConnection;
  /** fetch data from the table: "call" */
  callConnection: CallConnection;
  /** fetch data from the table: "cert" */
  certConnection: CertConnection;
  /** fetch data from the table: "cert_event" */
  certEventConnection: CertEventConnection;
  /** fetch data from the table: "change_owner_key" */
  changeOwnerKeyConnection: ChangeOwnerKeyConnection;
  /** fetch data from the table: "event" */
  eventConnection: EventConnection;
  /** fetch data from the table: "extrinsic" */
  extrinsicConnection: ExtrinsicConnection;
  /** execute function "get_ud_history" which returns "ud_history" */
  getUdHistory_connection: UdHistoryConnection;
  /** fetch data from the table: "identity" */
  identityConnection: IdentityConnection;
  /** fetch data from the table: "items_counter" */
  itemsCounterConnection: ItemsCounterConnection;
  /** fetch data from the table: "membership_event" */
  membershipEventConnection: MembershipEventConnection;
  node?: Maybe<Node>;
  /** fetch data from the table: "smith_cert" */
  smithCertConnection: SmithCertConnection;
  /** fetch data from the table: "transfer" */
  transferConnection: TransferConnection;
  /** fetch data from the table: "ud_history" */
  udHistoryConnection: UdHistoryConnection;
  /** fetch data from the table: "ud_reeval" */
  udReevalConnection: UdReevalConnection;
  /** fetch data from the table: "universal_dividend" */
  universalDividendConnection: UniversalDividendConnection;
};


export type Subscription_RootAccountConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<AccountSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
  where?: InputMaybe<AccountBoolExp>;
};


export type Subscription_RootBlockConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<BlockSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderBy>>;
  where?: InputMaybe<BlockBoolExp>;
};


export type Subscription_RootCallConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CallSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderBy>>;
  where?: InputMaybe<CallBoolExp>;
};


export type Subscription_RootCertConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertOrderBy>>;
  where?: InputMaybe<CertBoolExp>;
};


export type Subscription_RootCertEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<CertEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CertEventOrderBy>>;
  where?: InputMaybe<CertEventBoolExp>;
};


export type Subscription_RootChangeOwnerKeyConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ChangeOwnerKeySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChangeOwnerKeyOrderBy>>;
  where?: InputMaybe<ChangeOwnerKeyBoolExp>;
};


export type Subscription_RootEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<EventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderBy>>;
  where?: InputMaybe<EventBoolExp>;
};


export type Subscription_RootExtrinsicConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ExtrinsicSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderBy>>;
  where?: InputMaybe<ExtrinsicBoolExp>;
};


export type Subscription_RootGetUdHistory_ConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  args: GetUdHistoryArgs;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdHistorySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderBy>>;
  where?: InputMaybe<UdHistoryBoolExp>;
};


export type Subscription_RootIdentityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<IdentitySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IdentityOrderBy>>;
  where?: InputMaybe<IdentityBoolExp>;
};


export type Subscription_RootItemsCounterConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<ItemsCounterSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderBy>>;
  where?: InputMaybe<ItemsCounterBoolExp>;
};


export type Subscription_RootMembershipEventConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<MembershipEventSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipEventOrderBy>>;
  where?: InputMaybe<MembershipEventBoolExp>;
};


export type Subscription_RootNodeArgs = {
  id: Scalars['ID']['input'];
};


export type Subscription_RootSmithCertConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<SmithCertSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SmithCertOrderBy>>;
  where?: InputMaybe<SmithCertBoolExp>;
};


export type Subscription_RootTransferConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<TransferSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderBy>>;
  where?: InputMaybe<TransferBoolExp>;
};


export type Subscription_RootUdHistoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdHistorySelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdHistoryOrderBy>>;
  where?: InputMaybe<UdHistoryBoolExp>;
};


export type Subscription_RootUdReevalConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UdReevalSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UdReevalOrderBy>>;
  where?: InputMaybe<UdReevalBoolExp>;
};


export type Subscription_RootUniversalDividendConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distinctOn?: InputMaybe<Array<UniversalDividendSelectColumn>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UniversalDividendOrderBy>>;
  where?: InputMaybe<UniversalDividendBoolExp>;
};

export type TransferAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<TransferSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<TransferBoolExp>;
  predicate: IntComparisonExp;
};

export type LightIdentityFragment = { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> };

export type LightAccountFragment = { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null };

export type LightAccountConnectionFragment = { __typename?: 'AccountConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'AccountEdge', node: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }> };

export type LightBlockFragment = { __typename: 'Block', id: string, height: number, hash: any, timestamp: any, callsCount: number, eventsCount: number, extrinsicsCount: number };

export type LightBlockConnectionFragment = { __typename?: 'BlockConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'BlockEdge', node: { __typename: 'Block', id: string, height: number, hash: any, timestamp: any, callsCount: number, eventsCount: number, extrinsicsCount: number } }> };

export type BlockByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type BlockByIdQuery = { __typename?: 'query_root', blockConnection: { __typename?: 'BlockConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'BlockEdge', node: { __typename: 'Block', id: string, height: number, hash: any, timestamp: any, callsCount: number, eventsCount: number, extrinsicsCount: number } }> } };

export type BlocksQueryVariables = Exact<{
  where?: InputMaybe<BlockBoolExp>;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderBy> | BlockOrderBy>;
}>;


export type BlocksQuery = { __typename?: 'query_root', blockConnection: { __typename?: 'BlockConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'BlockEdge', node: { __typename: 'Block', id: string, height: number, hash: any, timestamp: any, callsCount: number, eventsCount: number, extrinsicsCount: number } }> } };

export type LightCertFragment = { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number };

export type CertFragment = { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, receiver?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null, issuer?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null };

export type CertConnectionFragment = { __typename?: 'CertConnection', edges: Array<{ __typename?: 'CertEdge', node: { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, receiver?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null, issuer?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } };

export type CertReceivedConnectionFragment = { __typename?: 'CertConnection', edges: Array<{ __typename?: 'CertEdge', node: { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, issuer?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } };

export type CertIssuedConnectionFragment = { __typename?: 'CertConnection', edges: Array<{ __typename?: 'CertEdge', node: { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, receiver?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } };

export type CertsConnectionByIssuerQueryVariables = Exact<{
  address: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  orderBy: Array<CertOrderBy> | CertOrderBy;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type CertsConnectionByIssuerQuery = { __typename?: 'query_root', identityConnection: { __typename?: 'IdentityConnection', edges: Array<{ __typename?: 'IdentityEdge', node: { __typename?: 'Identity', aggregate: { __typename?: 'CertAggregate', aggregate?: { __typename?: 'CertAggregateFields', count: number } | null }, connection: { __typename?: 'CertConnection', edges: Array<{ __typename?: 'CertEdge', node: { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, receiver?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } } }> } };

export type CertsConnectionByReceiverQueryVariables = Exact<{
  address: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  orderBy: Array<CertOrderBy> | CertOrderBy;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type CertsConnectionByReceiverQuery = { __typename?: 'query_root', identityConnection: { __typename?: 'IdentityConnection', edges: Array<{ __typename?: 'IdentityEdge', node: { __typename?: 'Identity', aggregate: { __typename?: 'CertAggregate', aggregate?: { __typename?: 'CertAggregateFields', count: number } | null }, connection: { __typename?: 'CertConnection', edges: Array<{ __typename?: 'CertEdge', node: { __typename: 'Cert', id: string, expireOn: number, createdOn: number, updatedOn: number, issuer?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } } }> } };

export type TransferFragment = { __typename: 'Transfer', id: string, amount: any, timestamp: any, blockNumber: number, from?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null, to?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null };

export type TransferConnectionFragment = { __typename?: 'TransferConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'TransferEdge', node: { __typename: 'Transfer', id: string, amount: any, timestamp: any, blockNumber: number, from?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null, to?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null } }> };

export type TransferConnectionByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  orderBy: Array<TransferOrderBy> | TransferOrderBy;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type TransferConnectionByAddressQuery = { __typename?: 'query_root', transferConnection: { __typename?: 'TransferConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'TransferEdge', node: { __typename: 'Transfer', id: string, amount: any, timestamp: any, blockNumber: number, from?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null, to?: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } | null } }> } };

export type WotSearchByTextQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy> | AccountOrderBy>;
}>;


export type WotSearchByTextQuery = { __typename?: 'query_root', accountConnection: { __typename?: 'AccountConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'AccountEdge', node: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }> } };

export type WotSearchByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy> | AccountOrderBy>;
}>;


export type WotSearchByAddressQuery = { __typename?: 'query_root', accountConnection: { __typename?: 'AccountConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'AccountEdge', node: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }> } };

export type WotSearchLastQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy> | AccountOrderBy>;
  pending: Scalars['Boolean']['input'];
}>;


export type WotSearchLastQuery = { __typename?: 'query_root', accountConnection: { __typename?: 'AccountConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'AccountEdge', node: { __typename?: 'Account', id: string, identity?: { __typename?: 'Identity', id: string, index: number, name: string, accountId?: string | null, status?: IdentityStatusEnum | null, isMember: boolean, membershipHistory: Array<{ __typename: 'MembershipEvent', id: string, eventType?: EventTypeEnum | null }> } | null } }> } };

export const LightIdentityFragmentDoc = gql`
    fragment LightIdentity on Identity {
  id
  index
  name
  accountId
  status
  isMember
  membershipHistory {
    __typename
    id
    eventType
  }
}
    `;
export const LightAccountFragmentDoc = gql`
    fragment LightAccount on Account {
  id
  identity {
    ...LightIdentity
  }
}
    ${LightIdentityFragmentDoc}`;
export const LightAccountConnectionFragmentDoc = gql`
    fragment LightAccountConnection on AccountConnection {
  pageInfo {
    endCursor
    hasNextPage
  }
  edges {
    node {
      ...LightAccount
    }
  }
}
    ${LightAccountFragmentDoc}`;
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
export const LightBlockConnectionFragmentDoc = gql`
    fragment LightBlockConnection on BlockConnection {
  pageInfo {
    endCursor
    hasNextPage
  }
  edges {
    node {
      ...LightBlock
    }
  }
}
    ${LightBlockFragmentDoc}`;
export const LightCertFragmentDoc = gql`
    fragment LightCert on Cert {
  __typename
  id
  expireOn
  createdOn
  updatedOn
}
    `;
export const CertFragmentDoc = gql`
    fragment Cert on Cert {
  ...LightCert
  receiver {
    ...LightIdentity
  }
  issuer {
    ...LightIdentity
  }
}
    ${LightCertFragmentDoc}
${LightIdentityFragmentDoc}`;
export const CertConnectionFragmentDoc = gql`
    fragment CertConnection on CertConnection {
  edges {
    node {
      ...Cert
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${CertFragmentDoc}`;
export const CertReceivedConnectionFragmentDoc = gql`
    fragment CertReceivedConnection on CertConnection {
  edges {
    node {
      ...LightCert
      issuer {
        ...LightIdentity
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${LightCertFragmentDoc}
${LightIdentityFragmentDoc}`;
export const CertIssuedConnectionFragmentDoc = gql`
    fragment CertIssuedConnection on CertConnection {
  edges {
    node {
      ...LightCert
      receiver {
        ...LightIdentity
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${LightCertFragmentDoc}
${LightIdentityFragmentDoc}`;
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
    ${LightAccountFragmentDoc}`;
export const TransferConnectionFragmentDoc = gql`
    fragment TransferConnection on TransferConnection {
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
    ${TransferFragmentDoc}`;
export const BlockByIdDocument = gql`
    query BlockById($id: String!) {
  blockConnection(where: {id: {_eq: $id}}) {
    ...LightBlockConnection
  }
}
    ${LightBlockConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class BlockByIdGQL extends Apollo.Query<BlockByIdQuery, BlockByIdQueryVariables> {
    document = BlockByIdDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BlocksDocument = gql`
    query Blocks($where: BlockBoolExp, $first: Int!, $after: String, $orderBy: [BlockOrderBy!]) {
  blockConnection(first: $first, after: $after, orderBy: $orderBy, where: $where) {
    ...LightBlockConnection
  }
}
    ${LightBlockConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class BlocksGQL extends Apollo.Query<BlocksQuery, BlocksQueryVariables> {
    document = BlocksDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CertsConnectionByIssuerDocument = gql`
    query CertsConnectionByIssuer($address: String!, $first: Int!, $orderBy: [CertOrderBy!]!, $after: String) {
  identityConnection(where: {accountId: {_eq: $address}}) {
    edges {
      node {
        aggregate: certIssuedAggregate(where: {isActive: {_eq: true}}) {
          aggregate {
            count
          }
        }
        connection: certIssued_connection(
          first: $first
          after: $after
          orderBy: $orderBy
          where: {isActive: {_eq: true}}
        ) {
          ...CertIssuedConnection
        }
      }
    }
  }
}
    ${CertIssuedConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertsConnectionByIssuerGQL extends Apollo.Query<CertsConnectionByIssuerQuery, CertsConnectionByIssuerQueryVariables> {
    document = CertsConnectionByIssuerDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CertsConnectionByReceiverDocument = gql`
    query CertsConnectionByReceiver($address: String!, $first: Int!, $orderBy: [CertOrderBy!]!, $after: String) {
  identityConnection(where: {accountId: {_eq: $address}}) {
    edges {
      node {
        aggregate: certReceivedAggregate(where: {isActive: {_eq: true}}) {
          aggregate {
            count
          }
        }
        connection: certReceived_connection(
          first: $first
          after: $after
          orderBy: $orderBy
          where: {isActive: {_eq: true}}
        ) {
          ...CertReceivedConnection
        }
      }
    }
  }
}
    ${CertReceivedConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertsConnectionByReceiverGQL extends Apollo.Query<CertsConnectionByReceiverQuery, CertsConnectionByReceiverQueryVariables> {
    document = CertsConnectionByReceiverDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TransferConnectionByAddressDocument = gql`
    query TransferConnectionByAddress($address: String!, $first: Int!, $orderBy: [TransferOrderBy!]!, $after: String) {
  transferConnection(
    first: $first
    after: $after
    orderBy: $orderBy
    where: {_or: [{fromId: {_eq: $address}}, {toId: {_eq: $address}}]}
  ) {
    ...TransferConnection
  }
}
    ${TransferConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TransferConnectionByAddressGQL extends Apollo.Query<TransferConnectionByAddressQuery, TransferConnectionByAddressQueryVariables> {
    document = TransferConnectionByAddressDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WotSearchByTextDocument = gql`
    query WotSearchByText($searchText: String!, $first: Int!, $after: String, $orderBy: [AccountOrderBy!]) {
  accountConnection(
    first: $first
    after: $after
    orderBy: $orderBy
    where: {_or: [{id: {_ilike: $searchText}}, {identity: {name: {_ilike: $searchText}}}]}
  ) {
    ...LightAccountConnection
  }
}
    ${LightAccountConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class WotSearchByTextGQL extends Apollo.Query<WotSearchByTextQuery, WotSearchByTextQueryVariables> {
    document = WotSearchByTextDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WotSearchByAddressDocument = gql`
    query WotSearchByAddress($address: String!, $first: Int!, $after: String, $orderBy: [AccountOrderBy!]) {
  accountConnection(
    first: $first
    after: $after
    orderBy: $orderBy
    where: {id: {_eq: $address}}
  ) {
    ...LightAccountConnection
  }
}
    ${LightAccountConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class WotSearchByAddressGQL extends Apollo.Query<WotSearchByAddressQuery, WotSearchByAddressQueryVariables> {
    document = WotSearchByAddressDocument;
    client = 'indexer';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const WotSearchLastDocument = gql`
    query WotSearchLast($first: Int!, $after: String, $orderBy: [AccountOrderBy!], $pending: Boolean!) {
  accountConnection(
    first: $first
    after: $after
    orderBy: $orderBy
    where: {_and: [{identity: {id: {_isNull: false}}}, {identity: {membershipHistory: {eventId: {_isNull: $pending}}}}]}
  ) {
    ...LightAccountConnection
  }
}
    ${LightAccountConnectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
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
      private transferConnectionByAddressGql: TransferConnectionByAddressGQL,
      private wotSearchByTextGql: WotSearchByTextGQL,
      private wotSearchByAddressGql: WotSearchByAddressGQL,
      private wotSearchLastGql: WotSearchLastGQL
    ) {}
      
    blockById(variables: BlockByIdQueryVariables, options?: QueryOptionsAlone<BlockByIdQueryVariables>) {
      return this.blockByIdGql.fetch(variables, options)
    }
    
    blockByIdWatch(variables: BlockByIdQueryVariables, options?: WatchQueryOptionsAlone<BlockByIdQueryVariables>) {
      return this.blockByIdGql.watch(variables, options)
    }
    
    blocks(variables: BlocksQueryVariables, options?: QueryOptionsAlone<BlocksQueryVariables>) {
      return this.blocksGql.fetch(variables, options)
    }
    
    blocksWatch(variables: BlocksQueryVariables, options?: WatchQueryOptionsAlone<BlocksQueryVariables>) {
      return this.blocksGql.watch(variables, options)
    }
    
    certsConnectionByIssuer(variables: CertsConnectionByIssuerQueryVariables, options?: QueryOptionsAlone<CertsConnectionByIssuerQueryVariables>) {
      return this.certsConnectionByIssuerGql.fetch(variables, options)
    }
    
    certsConnectionByIssuerWatch(variables: CertsConnectionByIssuerQueryVariables, options?: WatchQueryOptionsAlone<CertsConnectionByIssuerQueryVariables>) {
      return this.certsConnectionByIssuerGql.watch(variables, options)
    }
    
    certsConnectionByReceiver(variables: CertsConnectionByReceiverQueryVariables, options?: QueryOptionsAlone<CertsConnectionByReceiverQueryVariables>) {
      return this.certsConnectionByReceiverGql.fetch(variables, options)
    }
    
    certsConnectionByReceiverWatch(variables: CertsConnectionByReceiverQueryVariables, options?: WatchQueryOptionsAlone<CertsConnectionByReceiverQueryVariables>) {
      return this.certsConnectionByReceiverGql.watch(variables, options)
    }
    
    transferConnectionByAddress(variables: TransferConnectionByAddressQueryVariables, options?: QueryOptionsAlone<TransferConnectionByAddressQueryVariables>) {
      return this.transferConnectionByAddressGql.fetch(variables, options)
    }
    
    transferConnectionByAddressWatch(variables: TransferConnectionByAddressQueryVariables, options?: WatchQueryOptionsAlone<TransferConnectionByAddressQueryVariables>) {
      return this.transferConnectionByAddressGql.watch(variables, options)
    }
    
    wotSearchByText(variables: WotSearchByTextQueryVariables, options?: QueryOptionsAlone<WotSearchByTextQueryVariables>) {
      return this.wotSearchByTextGql.fetch(variables, options)
    }
    
    wotSearchByTextWatch(variables: WotSearchByTextQueryVariables, options?: WatchQueryOptionsAlone<WotSearchByTextQueryVariables>) {
      return this.wotSearchByTextGql.watch(variables, options)
    }
    
    wotSearchByAddress(variables: WotSearchByAddressQueryVariables, options?: QueryOptionsAlone<WotSearchByAddressQueryVariables>) {
      return this.wotSearchByAddressGql.fetch(variables, options)
    }
    
    wotSearchByAddressWatch(variables: WotSearchByAddressQueryVariables, options?: WatchQueryOptionsAlone<WotSearchByAddressQueryVariables>) {
      return this.wotSearchByAddressGql.watch(variables, options)
    }
    
    wotSearchLast(variables: WotSearchLastQueryVariables, options?: QueryOptionsAlone<WotSearchLastQueryVariables>) {
      return this.wotSearchLastGql.fetch(variables, options)
    }
    
    wotSearchLastWatch(variables: WotSearchLastQueryVariables, options?: WatchQueryOptionsAlone<WotSearchLastQueryVariables>) {
      return this.wotSearchLastGql.watch(variables, options)
    }
  }

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "Account",
      "Block",
      "Call",
      "Cert",
      "CertEvent",
      "ChangeOwnerKey",
      "Event",
      "Extrinsic",
      "Identity",
      "ItemsCounter",
      "MembershipEvent",
      "SmithCert",
      "Transfer",
      "UdHistory",
      "UdReeval",
      "UniversalDividend"
    ]
  }
};
      export default result;
    