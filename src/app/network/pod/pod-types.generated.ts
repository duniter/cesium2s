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
  jsonb: { input: any; output: any; }
  point: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

export type AddTransactionResponse = {
  __typename?: 'AddTransactionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteProfileResponse = {
  __typename?: 'DeleteProfileResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GeolocInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type MigrateProfileResponse = {
  __typename?: 'MigrateProfileResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SocialInput = {
  type?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
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

export type UpdateProfileResponse = {
  __typename?: 'UpdateProfileResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** addTransaction */
  addTransaction?: Maybe<AddTransactionResponse>;
  /** deleteProfile */
  deleteProfile?: Maybe<DeleteProfileResponse>;
  /** migrateProfile */
  migrateProfile?: Maybe<MigrateProfileResponse>;
  /** updateProfile */
  updateProfile?: Maybe<UpdateProfileResponse>;
};


/** mutation root */
export type Mutation_RootAddTransactionArgs = {
  address: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  hash: Scalars['String']['input'];
  id: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDeleteProfileArgs = {
  address: Scalars['String']['input'];
  hash: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootMigrateProfileArgs = {
  addressNew: Scalars['String']['input'];
  addressOld: Scalars['String']['input'];
  hash: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootUpdateProfileArgs = {
  address: Scalars['String']['input'];
  avatarBase64?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  geoloc?: InputMaybe<GeolocInput>;
  hash: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  socials?: InputMaybe<Array<SocialInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Boolean expression to compare columns of type "point". All fields are combined with logical 'AND'. */
export type Point_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['point']['input']>;
  _gt?: InputMaybe<Scalars['point']['input']>;
  _gte?: InputMaybe<Scalars['point']['input']>;
  _in?: InputMaybe<Array<Scalars['point']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['point']['input']>;
  _lte?: InputMaybe<Scalars['point']['input']>;
  _neq?: InputMaybe<Scalars['point']['input']>;
  _nin?: InputMaybe<Array<Scalars['point']['input']>>;
};

/** columns and relationships of "profiles" */
export type Profiles = {
  __typename?: 'profiles';
  /** cid of avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  /** CID of the latest data from which this document comes from */
  data_cid?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  geoloc?: Maybe<Scalars['point']['output']>;
  /** CID of the latest index request that modified this document */
  index_request_cid: Scalars['String']['output'];
  /** base58 pubkey of profile owner */
  pubkey: Scalars['String']['output'];
  socials?: Maybe<Scalars['jsonb']['output']>;
  /** timestamp of the latest index request that modified this document */
  time: Scalars['timestamptz']['output'];
  /** title of c+ profile */
  title?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "profiles" */
export type ProfilesSocialsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "profiles" */
export type Profiles_Aggregate = {
  __typename?: 'profiles_aggregate';
  aggregate?: Maybe<Profiles_Aggregate_Fields>;
  nodes: Array<Profiles>;
};

/** aggregate fields of "profiles" */
export type Profiles_Aggregate_Fields = {
  __typename?: 'profiles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Profiles_Max_Fields>;
  min?: Maybe<Profiles_Min_Fields>;
};


/** aggregate fields of "profiles" */
export type Profiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Profiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "profiles". All fields are combined with a logical 'AND'. */
export type Profiles_Bool_Exp = {
  _and?: InputMaybe<Array<Profiles_Bool_Exp>>;
  _not?: InputMaybe<Profiles_Bool_Exp>;
  _or?: InputMaybe<Array<Profiles_Bool_Exp>>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  city?: InputMaybe<String_Comparison_Exp>;
  data_cid?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  geoloc?: InputMaybe<Point_Comparison_Exp>;
  index_request_cid?: InputMaybe<String_Comparison_Exp>;
  pubkey?: InputMaybe<String_Comparison_Exp>;
  socials?: InputMaybe<Jsonb_Comparison_Exp>;
  time?: InputMaybe<Timestamptz_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Profiles_Max_Fields = {
  __typename?: 'profiles_max_fields';
  /** cid of avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  /** CID of the latest data from which this document comes from */
  data_cid?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** CID of the latest index request that modified this document */
  index_request_cid?: Maybe<Scalars['String']['output']>;
  /** base58 pubkey of profile owner */
  pubkey?: Maybe<Scalars['String']['output']>;
  /** timestamp of the latest index request that modified this document */
  time?: Maybe<Scalars['timestamptz']['output']>;
  /** title of c+ profile */
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Profiles_Min_Fields = {
  __typename?: 'profiles_min_fields';
  /** cid of avatar */
  avatar?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  /** CID of the latest data from which this document comes from */
  data_cid?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** CID of the latest index request that modified this document */
  index_request_cid?: Maybe<Scalars['String']['output']>;
  /** base58 pubkey of profile owner */
  pubkey?: Maybe<Scalars['String']['output']>;
  /** timestamp of the latest index request that modified this document */
  time?: Maybe<Scalars['timestamptz']['output']>;
  /** title of c+ profile */
  title?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "profiles". */
export type Profiles_Order_By = {
  avatar?: InputMaybe<Order_By>;
  city?: InputMaybe<Order_By>;
  data_cid?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  geoloc?: InputMaybe<Order_By>;
  index_request_cid?: InputMaybe<Order_By>;
  pubkey?: InputMaybe<Order_By>;
  socials?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** select columns of table "profiles" */
export enum Profiles_Select_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  City = 'city',
  /** column name */
  DataCid = 'data_cid',
  /** column name */
  Description = 'description',
  /** column name */
  Geoloc = 'geoloc',
  /** column name */
  IndexRequestCid = 'index_request_cid',
  /** column name */
  Pubkey = 'pubkey',
  /** column name */
  Socials = 'socials',
  /** column name */
  Time = 'time',
  /** column name */
  Title = 'title'
}

/** Streaming cursor of the table "profiles" */
export type Profiles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Profiles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Profiles_Stream_Cursor_Value_Input = {
  /** cid of avatar */
  avatar?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  /** CID of the latest data from which this document comes from */
  data_cid?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  geoloc?: InputMaybe<Scalars['point']['input']>;
  /** CID of the latest index request that modified this document */
  index_request_cid?: InputMaybe<Scalars['String']['input']>;
  /** base58 pubkey of profile owner */
  pubkey?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Scalars['jsonb']['input']>;
  /** timestamp of the latest index request that modified this document */
  time?: InputMaybe<Scalars['timestamptz']['input']>;
  /** title of c+ profile */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
};


export type Query_RootProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_By_PkArgs = {
  pubkey: Scalars['String']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
  /** fetch data from the table in a streaming manner: "profiles" */
  profiles_stream: Array<Profiles>;
};


export type Subscription_RootProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_By_PkArgs = {
  pubkey: Scalars['String']['input'];
};


export type Subscription_RootProfiles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Profiles_Stream_Cursor_Input>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type LightProfileFragment = { __typename: 'profiles', title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null };

export type ProfileFragment = { __typename: 'profiles', description?: string | null, city?: string | null, geoloc?: any | null, socials?: any | null, index_request_cid: string, title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null };

export type ProfileSearchByTextQueryVariables = Exact<{
  searchText: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<Profiles_Order_By> | Profiles_Order_By>;
  withTotal: Scalars['Boolean']['input'];
}>;


export type ProfileSearchByTextQuery = { __typename?: 'query_root', profiles: Array<{ __typename: 'profiles', title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null }>, profiles_aggregate?: { __typename?: 'profiles_aggregate', aggregate?: { __typename?: 'profiles_aggregate_fields', count: number } | null } };

export type ProfileByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type ProfileByAddressQuery = { __typename?: 'query_root', profiles_by_pk?: { __typename: 'profiles', description?: string | null, city?: string | null, geoloc?: any | null, socials?: any | null, index_request_cid: string, title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null } | null };

export type ProfileSearchByAddressesQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type ProfileSearchByAddressesQuery = { __typename?: 'query_root', profiles: Array<{ __typename: 'profiles', title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null }> };

export type ProfileSearchByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type ProfileSearchByAddressQuery = { __typename?: 'query_root', profiles_by_pk?: { __typename: 'profiles', description?: string | null, city?: string | null, geoloc?: any | null, socials?: any | null, index_request_cid: string, title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null } | null };

export type LightProfileByAddressesQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type LightProfileByAddressesQuery = { __typename?: 'query_root', profiles: Array<{ __typename: 'profiles', title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null }> };

export type LightProfileByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type LightProfileByAddressQuery = { __typename?: 'query_root', profiles_by_pk?: { __typename: 'profiles', title?: string | null, time: any, id?: string | null, address: string, avatar_cid?: string | null } | null };

export const LightProfileFragmentDoc = gql`
    fragment LightProfile on profiles {
  id: data_cid
  __typename
  address: pubkey
  title
  avatar_cid: avatar
  time
}
    `;
export const ProfileFragmentDoc = gql`
    fragment Profile on profiles {
  ...LightProfile
  description
  city
  geoloc
  socials
  index_request_cid
}
    ${LightProfileFragmentDoc}`;
export const ProfileSearchByTextDocument = gql`
    query ProfileSearchByText($searchText: String!, $limit: Int!, $offset: Int!, $orderBy: [profiles_order_by!], $withTotal: Boolean!) {
  profiles(
    offset: $offset
    limit: $limit
    where: {title: {_ilike: $searchText}}
    order_by: $orderBy
  ) {
    ...LightProfile
  }
  profiles_aggregate(where: {title: {_ilike: $searchText}}) @include(if: $withTotal) {
    aggregate {
      count
    }
  }
}
    ${LightProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileSearchByTextGQL extends Apollo.Query<ProfileSearchByTextQuery, ProfileSearchByTextQueryVariables> {
    document = ProfileSearchByTextDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileByAddressDocument = gql`
    query ProfileByAddress($address: String!) {
  profiles_by_pk(pubkey: $address) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileByAddressGQL extends Apollo.Query<ProfileByAddressQuery, ProfileByAddressQueryVariables> {
    document = ProfileByAddressDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileSearchByAddressesDocument = gql`
    query ProfileSearchByAddresses($addresses: [String!]!) {
  profiles(where: {pubkey: {_in: $addresses}}) {
    ...LightProfile
  }
}
    ${LightProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileSearchByAddressesGQL extends Apollo.Query<ProfileSearchByAddressesQuery, ProfileSearchByAddressesQueryVariables> {
    document = ProfileSearchByAddressesDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileSearchByAddressDocument = gql`
    query ProfileSearchByAddress($address: String!) {
  profiles_by_pk(pubkey: $address) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileSearchByAddressGQL extends Apollo.Query<ProfileSearchByAddressQuery, ProfileSearchByAddressQueryVariables> {
    document = ProfileSearchByAddressDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LightProfileByAddressesDocument = gql`
    query LightProfileByAddresses($addresses: [String!]!) {
  profiles(where: {pubkey: {_in: $addresses}}) {
    ...LightProfile
  }
}
    ${LightProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LightProfileByAddressesGQL extends Apollo.Query<LightProfileByAddressesQuery, LightProfileByAddressesQueryVariables> {
    document = LightProfileByAddressesDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LightProfileByAddressDocument = gql`
    query LightProfileByAddress($address: String!) {
  profiles_by_pk(pubkey: $address) {
    ...LightProfile
  }
}
    ${LightProfileFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LightProfileByAddressGQL extends Apollo.Query<LightProfileByAddressQuery, LightProfileByAddressQueryVariables> {
    document = LightProfileByAddressDocument;
    client = 'pod';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V> extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}

  interface QueryOptionsAlone<V> extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class PodGraphqlService {
    constructor(
      private profileSearchByTextGql: ProfileSearchByTextGQL,
      private profileByAddressGql: ProfileByAddressGQL,
      private profileSearchByAddressesGql: ProfileSearchByAddressesGQL,
      private profileSearchByAddressGql: ProfileSearchByAddressGQL,
      private lightProfileByAddressesGql: LightProfileByAddressesGQL,
      private lightProfileByAddressGql: LightProfileByAddressGQL
    ) {}
      
    profileSearchByText(variables: ProfileSearchByTextQueryVariables, options?: QueryOptionsAlone<ProfileSearchByTextQueryVariables>) {
      return this.profileSearchByTextGql.fetch(variables, options)
    }
    
    profileSearchByTextWatch(variables: ProfileSearchByTextQueryVariables, options?: WatchQueryOptionsAlone<ProfileSearchByTextQueryVariables>) {
      return this.profileSearchByTextGql.watch(variables, options)
    }
    
    profileByAddress(variables: ProfileByAddressQueryVariables, options?: QueryOptionsAlone<ProfileByAddressQueryVariables>) {
      return this.profileByAddressGql.fetch(variables, options)
    }
    
    profileByAddressWatch(variables: ProfileByAddressQueryVariables, options?: WatchQueryOptionsAlone<ProfileByAddressQueryVariables>) {
      return this.profileByAddressGql.watch(variables, options)
    }
    
    profileSearchByAddresses(variables: ProfileSearchByAddressesQueryVariables, options?: QueryOptionsAlone<ProfileSearchByAddressesQueryVariables>) {
      return this.profileSearchByAddressesGql.fetch(variables, options)
    }
    
    profileSearchByAddressesWatch(variables: ProfileSearchByAddressesQueryVariables, options?: WatchQueryOptionsAlone<ProfileSearchByAddressesQueryVariables>) {
      return this.profileSearchByAddressesGql.watch(variables, options)
    }
    
    profileSearchByAddress(variables: ProfileSearchByAddressQueryVariables, options?: QueryOptionsAlone<ProfileSearchByAddressQueryVariables>) {
      return this.profileSearchByAddressGql.fetch(variables, options)
    }
    
    profileSearchByAddressWatch(variables: ProfileSearchByAddressQueryVariables, options?: WatchQueryOptionsAlone<ProfileSearchByAddressQueryVariables>) {
      return this.profileSearchByAddressGql.watch(variables, options)
    }
    
    lightProfileByAddresses(variables: LightProfileByAddressesQueryVariables, options?: QueryOptionsAlone<LightProfileByAddressesQueryVariables>) {
      return this.lightProfileByAddressesGql.fetch(variables, options)
    }
    
    lightProfileByAddressesWatch(variables: LightProfileByAddressesQueryVariables, options?: WatchQueryOptionsAlone<LightProfileByAddressesQueryVariables>) {
      return this.lightProfileByAddressesGql.watch(variables, options)
    }
    
    lightProfileByAddress(variables: LightProfileByAddressQueryVariables, options?: QueryOptionsAlone<LightProfileByAddressQueryVariables>) {
      return this.lightProfileByAddressGql.fetch(variables, options)
    }
    
    lightProfileByAddressWatch(variables: LightProfileByAddressQueryVariables, options?: WatchQueryOptionsAlone<LightProfileByAddressQueryVariables>) {
      return this.lightProfileByAddressGql.watch(variables, options)
    }
  }

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    