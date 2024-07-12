// Auto-generated via `npx graphql-codegen`, do not edit
/* eslint-disable */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AddTransactionResponseKeySpecifier = ('message' | 'success' | AddTransactionResponseKeySpecifier)[];
export type AddTransactionResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteProfileResponseKeySpecifier = ('message' | 'success' | DeleteProfileResponseKeySpecifier)[];
export type DeleteProfileResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MigrateProfileResponseKeySpecifier = ('message' | 'success' | MigrateProfileResponseKeySpecifier)[];
export type MigrateProfileResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateProfileResponseKeySpecifier = ('message' | 'success' | UpdateProfileResponseKeySpecifier)[];
export type UpdateProfileResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type mutation_rootKeySpecifier = ('addTransaction' | 'deleteProfile' | 'migrateProfile' | 'updateProfile' | mutation_rootKeySpecifier)[];
export type mutation_rootFieldPolicy = {
	addTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	migrateProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProfile?: FieldPolicy<any> | FieldReadFunction<any>
};
export type profilesKeySpecifier = ('avatar' | 'city' | 'data_cid' | 'description' | 'geoloc' | 'index_request_cid' | 'pubkey' | 'socials' | 'time' | 'title' | profilesKeySpecifier)[];
export type profilesFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	data_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	geoloc?: FieldPolicy<any> | FieldReadFunction<any>,
	index_request_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	pubkey?: FieldPolicy<any> | FieldReadFunction<any>,
	socials?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type profiles_aggregateKeySpecifier = ('aggregate' | 'nodes' | profiles_aggregateKeySpecifier)[];
export type profiles_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type profiles_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | profiles_aggregate_fieldsKeySpecifier)[];
export type profiles_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type profiles_max_fieldsKeySpecifier = ('avatar' | 'city' | 'data_cid' | 'description' | 'index_request_cid' | 'pubkey' | 'time' | 'title' | profiles_max_fieldsKeySpecifier)[];
export type profiles_max_fieldsFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	data_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	index_request_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	pubkey?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type profiles_min_fieldsKeySpecifier = ('avatar' | 'city' | 'data_cid' | 'description' | 'index_request_cid' | 'pubkey' | 'time' | 'title' | profiles_min_fieldsKeySpecifier)[];
export type profiles_min_fieldsFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	data_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	index_request_cid?: FieldPolicy<any> | FieldReadFunction<any>,
	pubkey?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type query_rootKeySpecifier = ('profiles' | 'profiles_aggregate' | 'profiles_by_pk' | query_rootKeySpecifier)[];
export type query_rootFieldPolicy = {
	profiles?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type subscription_rootKeySpecifier = ('profiles' | 'profiles_aggregate' | 'profiles_by_pk' | 'profiles_stream' | subscription_rootKeySpecifier)[];
export type subscription_rootFieldPolicy = {
	profiles?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	profiles_stream?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AddTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddTransactionResponseKeySpecifier | (() => undefined | AddTransactionResponseKeySpecifier),
		fields?: AddTransactionResponseFieldPolicy,
	},
	DeleteProfileResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteProfileResponseKeySpecifier | (() => undefined | DeleteProfileResponseKeySpecifier),
		fields?: DeleteProfileResponseFieldPolicy,
	},
	MigrateProfileResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MigrateProfileResponseKeySpecifier | (() => undefined | MigrateProfileResponseKeySpecifier),
		fields?: MigrateProfileResponseFieldPolicy,
	},
	UpdateProfileResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateProfileResponseKeySpecifier | (() => undefined | UpdateProfileResponseKeySpecifier),
		fields?: UpdateProfileResponseFieldPolicy,
	},
	mutation_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | mutation_rootKeySpecifier | (() => undefined | mutation_rootKeySpecifier),
		fields?: mutation_rootFieldPolicy,
	},
	profiles?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | profilesKeySpecifier | (() => undefined | profilesKeySpecifier),
		fields?: profilesFieldPolicy,
	},
	profiles_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | profiles_aggregateKeySpecifier | (() => undefined | profiles_aggregateKeySpecifier),
		fields?: profiles_aggregateFieldPolicy,
	},
	profiles_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | profiles_aggregate_fieldsKeySpecifier | (() => undefined | profiles_aggregate_fieldsKeySpecifier),
		fields?: profiles_aggregate_fieldsFieldPolicy,
	},
	profiles_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | profiles_max_fieldsKeySpecifier | (() => undefined | profiles_max_fieldsKeySpecifier),
		fields?: profiles_max_fieldsFieldPolicy,
	},
	profiles_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | profiles_min_fieldsKeySpecifier | (() => undefined | profiles_min_fieldsKeySpecifier),
		fields?: profiles_min_fieldsFieldPolicy,
	},
	query_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | query_rootKeySpecifier | (() => undefined | query_rootKeySpecifier),
		fields?: query_rootFieldPolicy,
	},
	subscription_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | subscription_rootKeySpecifier | (() => undefined | subscription_rootKeySpecifier),
		fields?: subscription_rootFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;