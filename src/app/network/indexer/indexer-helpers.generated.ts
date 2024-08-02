import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountKeySpecifier = ('id' | 'identity' | 'linkedIdentity' | 'linkedIdentityId' | 'transfersIssued' | 'transfersIssuedAggregate' | 'transfersIssued_connection' | 'transfersReceived' | 'transfersReceivedAggregate' | 'transfersReceived_connection' | 'wasIdentity' | 'wasIdentityAggregate' | 'wasIdentity_connection' | AccountKeySpecifier)[];
export interface AccountFieldPolicy {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedIdentity?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedIdentityId?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersIssued?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersIssuedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersIssued_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersReceived?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersReceivedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	transfersReceived_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	wasIdentity?: FieldPolicy<any> | FieldReadFunction<any>,
	wasIdentityAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	wasIdentity_connection?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountAggregateKeySpecifier = ('aggregate' | 'nodes' | AccountAggregateKeySpecifier)[];
export interface AccountAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountAggregateFieldsKeySpecifier = ('count' | 'max' | 'min' | AccountAggregateFieldsKeySpecifier)[];
export interface AccountAggregateFieldsFieldPolicy {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountConnectionKeySpecifier = ('edges' | 'pageInfo' | AccountConnectionKeySpecifier)[];
export interface AccountConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountEdgeKeySpecifier = ('cursor' | 'node' | AccountEdgeKeySpecifier)[];
export interface AccountEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountMaxFieldsKeySpecifier = ('id' | 'linkedIdentityId' | AccountMaxFieldsKeySpecifier)[];
export interface AccountMaxFieldsFieldPolicy {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedIdentityId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AccountMinFieldsKeySpecifier = ('id' | 'linkedIdentityId' | AccountMinFieldsKeySpecifier)[];
export interface AccountMinFieldsFieldPolicy {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedIdentityId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type BlockKeySpecifier = ('calls' | 'callsAggregate' | 'callsCount' | 'calls_connection' | 'events' | 'eventsAggregate' | 'eventsCount' | 'events_connection' | 'extrinsics' | 'extrinsicsAggregate' | 'extrinsicsCount' | 'extrinsics_connection' | 'extrinsicsicRoot' | 'hash' | 'height' | 'id' | 'implName' | 'implVersion' | 'parentHash' | 'specName' | 'specVersion' | 'stateRoot' | 'timestamp' | 'validator' | BlockKeySpecifier)[];
export interface BlockFieldPolicy {
	calls?: FieldPolicy<any> | FieldReadFunction<any>,
	callsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	callsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	calls_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	eventsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	eventsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	events_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsics?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsics_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicsicRoot?: FieldPolicy<any> | FieldReadFunction<any>,
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	implName?: FieldPolicy<any> | FieldReadFunction<any>,
	implVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	parentHash?: FieldPolicy<any> | FieldReadFunction<any>,
	specName?: FieldPolicy<any> | FieldReadFunction<any>,
	specVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	stateRoot?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	validator?: FieldPolicy<any> | FieldReadFunction<any>
}
export type BlockConnectionKeySpecifier = ('edges' | 'pageInfo' | BlockConnectionKeySpecifier)[];
export interface BlockConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type BlockEdgeKeySpecifier = ('cursor' | 'node' | BlockEdgeKeySpecifier)[];
export interface BlockEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallKeySpecifier = ('address' | 'args' | 'argsStr' | 'block' | 'blockId' | 'error' | 'events' | 'eventsAggregate' | 'events_connection' | 'extrinsic' | 'extrinsicId' | 'id' | 'name' | 'pallet' | 'parent' | 'parentId' | 'subcalls' | 'subcallsAggregate' | 'subcalls_connection' | 'success' | CallKeySpecifier)[];
export interface CallFieldPolicy {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	args?: FieldPolicy<any> | FieldReadFunction<any>,
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	eventsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	events_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsic?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	parentId?: FieldPolicy<any> | FieldReadFunction<any>,
	subcalls?: FieldPolicy<any> | FieldReadFunction<any>,
	subcallsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	subcalls_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallAggregateKeySpecifier = ('aggregate' | 'nodes' | CallAggregateKeySpecifier)[];
export interface CallAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallAggregateFieldsKeySpecifier = ('count' | 'max' | 'min' | CallAggregateFieldsKeySpecifier)[];
export interface CallAggregateFieldsFieldPolicy {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallConnectionKeySpecifier = ('edges' | 'pageInfo' | CallConnectionKeySpecifier)[];
export interface CallConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallEdgeKeySpecifier = ('cursor' | 'node' | CallEdgeKeySpecifier)[];
export interface CallEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallMaxFieldsKeySpecifier = ('address' | 'argsStr' | 'blockId' | 'extrinsicId' | 'id' | 'name' | 'pallet' | 'parentId' | CallMaxFieldsKeySpecifier)[];
export interface CallMaxFieldsFieldPolicy {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	parentId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CallMinFieldsKeySpecifier = ('address' | 'argsStr' | 'blockId' | 'extrinsicId' | 'id' | 'name' | 'pallet' | 'parentId' | CallMinFieldsKeySpecifier)[];
export interface CallMinFieldsFieldPolicy {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	parentId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertKeySpecifier = ('certHistory' | 'certHistoryAggregate' | 'certHistory_connection' | 'createdIn' | 'createdInId' | 'createdOn' | 'expireOn' | 'id' | 'isActive' | 'issuer' | 'issuerId' | 'receiver' | 'receiverId' | 'updatedIn' | 'updatedInId' | 'updatedOn' | CertKeySpecifier)[];
export interface CertFieldPolicy {
	certHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	certHistoryAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	certHistory_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	createdIn?: FieldPolicy<any> | FieldReadFunction<any>,
	createdInId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	issuer?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiver?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedIn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedInId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertAggregateKeySpecifier = ('aggregate' | 'nodes' | CertAggregateKeySpecifier)[];
export interface CertAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | CertAggregateFieldsKeySpecifier)[];
export interface CertAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertAvgFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertAvgFieldsKeySpecifier)[];
export interface CertAvgFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertConnectionKeySpecifier = ('edges' | 'pageInfo' | CertConnectionKeySpecifier)[];
export interface CertConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEdgeKeySpecifier = ('cursor' | 'node' | CertEdgeKeySpecifier)[];
export interface CertEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventKeySpecifier = ('blockNumber' | 'cert' | 'certId' | 'event' | 'eventId' | 'eventType' | 'id' | CertEventKeySpecifier)[];
export interface CertEventFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	cert?: FieldPolicy<any> | FieldReadFunction<any>,
	certId?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventAggregateKeySpecifier = ('aggregate' | 'nodes' | CertEventAggregateKeySpecifier)[];
export interface CertEventAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | CertEventAggregateFieldsKeySpecifier)[];
export interface CertEventAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventAvgFieldsKeySpecifier = ('blockNumber' | CertEventAvgFieldsKeySpecifier)[];
export interface CertEventAvgFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventConnectionKeySpecifier = ('edges' | 'pageInfo' | CertEventConnectionKeySpecifier)[];
export interface CertEventConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventEdgeKeySpecifier = ('cursor' | 'node' | CertEventEdgeKeySpecifier)[];
export interface CertEventEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventMaxFieldsKeySpecifier = ('blockNumber' | 'certId' | 'eventId' | 'id' | CertEventMaxFieldsKeySpecifier)[];
export interface CertEventMaxFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	certId?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventMinFieldsKeySpecifier = ('blockNumber' | 'certId' | 'eventId' | 'id' | CertEventMinFieldsKeySpecifier)[];
export interface CertEventMinFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	certId?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventStddevFieldsKeySpecifier = ('blockNumber' | CertEventStddevFieldsKeySpecifier)[];
export interface CertEventStddevFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventStddevPopFieldsKeySpecifier = ('blockNumber' | CertEventStddevPopFieldsKeySpecifier)[];
export interface CertEventStddevPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventStddevSampFieldsKeySpecifier = ('blockNumber' | CertEventStddevSampFieldsKeySpecifier)[];
export interface CertEventStddevSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventSumFieldsKeySpecifier = ('blockNumber' | CertEventSumFieldsKeySpecifier)[];
export interface CertEventSumFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventVarPopFieldsKeySpecifier = ('blockNumber' | CertEventVarPopFieldsKeySpecifier)[];
export interface CertEventVarPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventVarSampFieldsKeySpecifier = ('blockNumber' | CertEventVarSampFieldsKeySpecifier)[];
export interface CertEventVarSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertEventVarianceFieldsKeySpecifier = ('blockNumber' | CertEventVarianceFieldsKeySpecifier)[];
export interface CertEventVarianceFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertMaxFieldsKeySpecifier = ('createdInId' | 'createdOn' | 'expireOn' | 'id' | 'issuerId' | 'receiverId' | 'updatedInId' | 'updatedOn' | CertMaxFieldsKeySpecifier)[];
export interface CertMaxFieldsFieldPolicy {
	createdInId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedInId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertMinFieldsKeySpecifier = ('createdInId' | 'createdOn' | 'expireOn' | 'id' | 'issuerId' | 'receiverId' | 'updatedInId' | 'updatedOn' | CertMinFieldsKeySpecifier)[];
export interface CertMinFieldsFieldPolicy {
	createdInId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedInId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertStddevFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertStddevFieldsKeySpecifier)[];
export interface CertStddevFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertStddevPopFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertStddevPopFieldsKeySpecifier)[];
export interface CertStddevPopFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertStddevSampFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertStddevSampFieldsKeySpecifier)[];
export interface CertStddevSampFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertSumFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertSumFieldsKeySpecifier)[];
export interface CertSumFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertVarPopFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertVarPopFieldsKeySpecifier)[];
export interface CertVarPopFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertVarSampFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertVarSampFieldsKeySpecifier)[];
export interface CertVarSampFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CertVarianceFieldsKeySpecifier = ('createdOn' | 'expireOn' | 'updatedOn' | CertVarianceFieldsKeySpecifier)[];
export interface CertVarianceFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyKeySpecifier = ('blockNumber' | 'id' | 'identity' | 'identityId' | 'next' | 'nextId' | 'previous' | 'previousId' | ChangeOwnerKeyKeySpecifier)[];
export interface ChangeOwnerKeyFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>,
	next?: FieldPolicy<any> | FieldReadFunction<any>,
	nextId?: FieldPolicy<any> | FieldReadFunction<any>,
	previous?: FieldPolicy<any> | FieldReadFunction<any>,
	previousId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyAggregateKeySpecifier = ('aggregate' | 'nodes' | ChangeOwnerKeyAggregateKeySpecifier)[];
export interface ChangeOwnerKeyAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | ChangeOwnerKeyAggregateFieldsKeySpecifier)[];
export interface ChangeOwnerKeyAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyAvgFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyAvgFieldsKeySpecifier)[];
export interface ChangeOwnerKeyAvgFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyConnectionKeySpecifier = ('edges' | 'pageInfo' | ChangeOwnerKeyConnectionKeySpecifier)[];
export interface ChangeOwnerKeyConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyEdgeKeySpecifier = ('cursor' | 'node' | ChangeOwnerKeyEdgeKeySpecifier)[];
export interface ChangeOwnerKeyEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyMaxFieldsKeySpecifier = ('blockNumber' | 'id' | 'identityId' | 'nextId' | 'previousId' | ChangeOwnerKeyMaxFieldsKeySpecifier)[];
export interface ChangeOwnerKeyMaxFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>,
	nextId?: FieldPolicy<any> | FieldReadFunction<any>,
	previousId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyMinFieldsKeySpecifier = ('blockNumber' | 'id' | 'identityId' | 'nextId' | 'previousId' | ChangeOwnerKeyMinFieldsKeySpecifier)[];
export interface ChangeOwnerKeyMinFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>,
	nextId?: FieldPolicy<any> | FieldReadFunction<any>,
	previousId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyStddevFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyStddevFieldsKeySpecifier)[];
export interface ChangeOwnerKeyStddevFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyStddevPopFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyStddevPopFieldsKeySpecifier)[];
export interface ChangeOwnerKeyStddevPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyStddevSampFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyStddevSampFieldsKeySpecifier)[];
export interface ChangeOwnerKeyStddevSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeySumFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeySumFieldsKeySpecifier)[];
export interface ChangeOwnerKeySumFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyVarPopFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyVarPopFieldsKeySpecifier)[];
export interface ChangeOwnerKeyVarPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyVarSampFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyVarSampFieldsKeySpecifier)[];
export interface ChangeOwnerKeyVarSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChangeOwnerKeyVarianceFieldsKeySpecifier = ('blockNumber' | ChangeOwnerKeyVarianceFieldsKeySpecifier)[];
export interface ChangeOwnerKeyVarianceFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventKeySpecifier = ('args' | 'argsStr' | 'block' | 'blockId' | 'call' | 'callId' | 'extrinsic' | 'extrinsicId' | 'id' | 'index' | 'name' | 'pallet' | 'phase' | EventKeySpecifier)[];
export interface EventFieldPolicy {
	args?: FieldPolicy<any> | FieldReadFunction<any>,
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	call?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsic?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventAggregateKeySpecifier = ('aggregate' | 'nodes' | EventAggregateKeySpecifier)[];
export interface EventAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | EventAggregateFieldsKeySpecifier)[];
export interface EventAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventAvgFieldsKeySpecifier = ('index' | EventAvgFieldsKeySpecifier)[];
export interface EventAvgFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventConnectionKeySpecifier = ('edges' | 'pageInfo' | EventConnectionKeySpecifier)[];
export interface EventConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventEdgeKeySpecifier = ('cursor' | 'node' | EventEdgeKeySpecifier)[];
export interface EventEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventMaxFieldsKeySpecifier = ('argsStr' | 'blockId' | 'callId' | 'extrinsicId' | 'id' | 'index' | 'name' | 'pallet' | 'phase' | EventMaxFieldsKeySpecifier)[];
export interface EventMaxFieldsFieldPolicy {
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventMinFieldsKeySpecifier = ('argsStr' | 'blockId' | 'callId' | 'extrinsicId' | 'id' | 'index' | 'name' | 'pallet' | 'phase' | EventMinFieldsKeySpecifier)[];
export interface EventMinFieldsFieldPolicy {
	argsStr?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pallet?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventStddevFieldsKeySpecifier = ('index' | EventStddevFieldsKeySpecifier)[];
export interface EventStddevFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventStddevPopFieldsKeySpecifier = ('index' | EventStddevPopFieldsKeySpecifier)[];
export interface EventStddevPopFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventStddevSampFieldsKeySpecifier = ('index' | EventStddevSampFieldsKeySpecifier)[];
export interface EventStddevSampFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventSumFieldsKeySpecifier = ('index' | EventSumFieldsKeySpecifier)[];
export interface EventSumFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventVarPopFieldsKeySpecifier = ('index' | EventVarPopFieldsKeySpecifier)[];
export interface EventVarPopFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventVarSampFieldsKeySpecifier = ('index' | EventVarSampFieldsKeySpecifier)[];
export interface EventVarSampFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type EventVarianceFieldsKeySpecifier = ('index' | EventVarianceFieldsKeySpecifier)[];
export interface EventVarianceFieldsFieldPolicy {
	index?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicKeySpecifier = ('block' | 'blockId' | 'call' | 'callId' | 'calls' | 'callsAggregate' | 'calls_connection' | 'error' | 'events' | 'eventsAggregate' | 'events_connection' | 'fee' | 'hash' | 'id' | 'index' | 'signature' | 'success' | 'tip' | 'version' | ExtrinsicKeySpecifier)[];
export interface ExtrinsicFieldPolicy {
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	call?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	calls?: FieldPolicy<any> | FieldReadFunction<any>,
	callsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	calls_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	eventsAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	events_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicAggregateKeySpecifier = ('aggregate' | 'nodes' | ExtrinsicAggregateKeySpecifier)[];
export interface ExtrinsicAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | ExtrinsicAggregateFieldsKeySpecifier)[];
export interface ExtrinsicAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicAvgFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicAvgFieldsKeySpecifier)[];
export interface ExtrinsicAvgFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicConnectionKeySpecifier = ('edges' | 'pageInfo' | ExtrinsicConnectionKeySpecifier)[];
export interface ExtrinsicConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicEdgeKeySpecifier = ('cursor' | 'node' | ExtrinsicEdgeKeySpecifier)[];
export interface ExtrinsicEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicMaxFieldsKeySpecifier = ('blockId' | 'callId' | 'fee' | 'id' | 'index' | 'tip' | 'version' | ExtrinsicMaxFieldsKeySpecifier)[];
export interface ExtrinsicMaxFieldsFieldPolicy {
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicMinFieldsKeySpecifier = ('blockId' | 'callId' | 'fee' | 'id' | 'index' | 'tip' | 'version' | ExtrinsicMinFieldsKeySpecifier)[];
export interface ExtrinsicMinFieldsFieldPolicy {
	blockId?: FieldPolicy<any> | FieldReadFunction<any>,
	callId?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicStddevFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicStddevFieldsKeySpecifier)[];
export interface ExtrinsicStddevFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicStddevPopFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicStddevPopFieldsKeySpecifier)[];
export interface ExtrinsicStddevPopFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicStddevSampFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicStddevSampFieldsKeySpecifier)[];
export interface ExtrinsicStddevSampFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicSumFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicSumFieldsKeySpecifier)[];
export interface ExtrinsicSumFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicVarPopFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicVarPopFieldsKeySpecifier)[];
export interface ExtrinsicVarPopFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicVarSampFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicVarSampFieldsKeySpecifier)[];
export interface ExtrinsicVarSampFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExtrinsicVarianceFieldsKeySpecifier = ('fee' | 'index' | 'tip' | 'version' | ExtrinsicVarianceFieldsKeySpecifier)[];
export interface ExtrinsicVarianceFieldsFieldPolicy {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	tip?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>
}
export type IdentityKeySpecifier = ('account' | 'accountId' | 'certIssued' | 'certIssuedAggregate' | 'certIssued_connection' | 'certReceived' | 'certReceivedAggregate' | 'certReceived_connection' | 'createdIn' | 'createdInId' | 'createdOn' | 'expireOn' | 'id' | 'index' | 'isMember' | 'lastChangeOn' | 'linkedAccount' | 'linkedAccountAggregate' | 'linkedAccount_connection' | 'membershipHistory' | 'membershipHistoryAggregate' | 'membershipHistory_connection' | 'name' | 'ownerKeyChange' | 'ownerKeyChangeAggregate' | 'ownerKeyChange_connection' | 'smithCertIssued' | 'smithCertIssuedAggregate' | 'smithCertIssued_connection' | 'smithCertReceived' | 'smithCertReceivedAggregate' | 'smithCertReceived_connection' | 'smithStatus' | 'status' | 'udHistory' | IdentityKeySpecifier)[];
export interface IdentityFieldPolicy {
	account?: FieldPolicy<any> | FieldReadFunction<any>,
	accountId?: FieldPolicy<any> | FieldReadFunction<any>,
	certIssued?: FieldPolicy<any> | FieldReadFunction<any>,
	certIssuedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	certIssued_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	certReceived?: FieldPolicy<any> | FieldReadFunction<any>,
	certReceivedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	certReceived_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	createdIn?: FieldPolicy<any> | FieldReadFunction<any>,
	createdInId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	expireOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	isMember?: FieldPolicy<any> | FieldReadFunction<any>,
	lastChangeOn?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedAccountAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedAccount_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipHistoryAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipHistory_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerKeyChange?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerKeyChangeAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerKeyChange_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertIssued?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertIssuedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertIssued_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertReceived?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertReceivedAggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertReceived_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	smithStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	udHistory?: FieldPolicy<any> | FieldReadFunction<any>
}
export type IdentityConnectionKeySpecifier = ('edges' | 'pageInfo' | IdentityConnectionKeySpecifier)[];
export interface IdentityConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type IdentityEdgeKeySpecifier = ('cursor' | 'node' | IdentityEdgeKeySpecifier)[];
export interface IdentityEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ItemsCounterKeySpecifier = ('id' | 'level' | 'total' | 'type' | ItemsCounterKeySpecifier)[];
export interface ItemsCounterFieldPolicy {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	level?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ItemsCounterConnectionKeySpecifier = ('edges' | 'pageInfo' | ItemsCounterConnectionKeySpecifier)[];
export interface ItemsCounterConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ItemsCounterEdgeKeySpecifier = ('cursor' | 'node' | ItemsCounterEdgeKeySpecifier)[];
export interface ItemsCounterEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventKeySpecifier = ('blockNumber' | 'event' | 'eventId' | 'eventType' | 'id' | 'identity' | 'identityId' | MembershipEventKeySpecifier)[];
export interface MembershipEventFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventAggregateKeySpecifier = ('aggregate' | 'nodes' | MembershipEventAggregateKeySpecifier)[];
export interface MembershipEventAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | MembershipEventAggregateFieldsKeySpecifier)[];
export interface MembershipEventAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventAvgFieldsKeySpecifier = ('blockNumber' | MembershipEventAvgFieldsKeySpecifier)[];
export interface MembershipEventAvgFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventConnectionKeySpecifier = ('edges' | 'pageInfo' | MembershipEventConnectionKeySpecifier)[];
export interface MembershipEventConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventEdgeKeySpecifier = ('cursor' | 'node' | MembershipEventEdgeKeySpecifier)[];
export interface MembershipEventEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventMaxFieldsKeySpecifier = ('blockNumber' | 'eventId' | 'id' | 'identityId' | MembershipEventMaxFieldsKeySpecifier)[];
export interface MembershipEventMaxFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventMinFieldsKeySpecifier = ('blockNumber' | 'eventId' | 'id' | 'identityId' | MembershipEventMinFieldsKeySpecifier)[];
export interface MembershipEventMinFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventStddevFieldsKeySpecifier = ('blockNumber' | MembershipEventStddevFieldsKeySpecifier)[];
export interface MembershipEventStddevFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventStddevPopFieldsKeySpecifier = ('blockNumber' | MembershipEventStddevPopFieldsKeySpecifier)[];
export interface MembershipEventStddevPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventStddevSampFieldsKeySpecifier = ('blockNumber' | MembershipEventStddevSampFieldsKeySpecifier)[];
export interface MembershipEventStddevSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventSumFieldsKeySpecifier = ('blockNumber' | MembershipEventSumFieldsKeySpecifier)[];
export interface MembershipEventSumFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventVarPopFieldsKeySpecifier = ('blockNumber' | MembershipEventVarPopFieldsKeySpecifier)[];
export interface MembershipEventVarPopFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventVarSampFieldsKeySpecifier = ('blockNumber' | MembershipEventVarSampFieldsKeySpecifier)[];
export interface MembershipEventVarSampFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MembershipEventVarianceFieldsKeySpecifier = ('blockNumber' | MembershipEventVarianceFieldsKeySpecifier)[];
export interface MembershipEventVarianceFieldsFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export interface NodeFieldPolicy {
	id?: FieldPolicy<any> | FieldReadFunction<any>
}
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export interface PageInfoFieldPolicy {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertKeySpecifier = ('createdOn' | 'id' | 'issuer' | 'issuerId' | 'receiver' | 'receiverId' | SmithCertKeySpecifier)[];
export interface SmithCertFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issuer?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiver?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertAggregateKeySpecifier = ('aggregate' | 'nodes' | SmithCertAggregateKeySpecifier)[];
export interface SmithCertAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | SmithCertAggregateFieldsKeySpecifier)[];
export interface SmithCertAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertAvgFieldsKeySpecifier = ('createdOn' | SmithCertAvgFieldsKeySpecifier)[];
export interface SmithCertAvgFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertConnectionKeySpecifier = ('edges' | 'pageInfo' | SmithCertConnectionKeySpecifier)[];
export interface SmithCertConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertEdgeKeySpecifier = ('cursor' | 'node' | SmithCertEdgeKeySpecifier)[];
export interface SmithCertEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertMaxFieldsKeySpecifier = ('createdOn' | 'id' | 'issuerId' | 'receiverId' | SmithCertMaxFieldsKeySpecifier)[];
export interface SmithCertMaxFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertMinFieldsKeySpecifier = ('createdOn' | 'id' | 'issuerId' | 'receiverId' | SmithCertMinFieldsKeySpecifier)[];
export interface SmithCertMinFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issuerId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertStddevFieldsKeySpecifier = ('createdOn' | SmithCertStddevFieldsKeySpecifier)[];
export interface SmithCertStddevFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertStddevPopFieldsKeySpecifier = ('createdOn' | SmithCertStddevPopFieldsKeySpecifier)[];
export interface SmithCertStddevPopFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertStddevSampFieldsKeySpecifier = ('createdOn' | SmithCertStddevSampFieldsKeySpecifier)[];
export interface SmithCertStddevSampFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertSumFieldsKeySpecifier = ('createdOn' | SmithCertSumFieldsKeySpecifier)[];
export interface SmithCertSumFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertVarPopFieldsKeySpecifier = ('createdOn' | SmithCertVarPopFieldsKeySpecifier)[];
export interface SmithCertVarPopFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertVarSampFieldsKeySpecifier = ('createdOn' | SmithCertVarSampFieldsKeySpecifier)[];
export interface SmithCertVarSampFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SmithCertVarianceFieldsKeySpecifier = ('createdOn' | SmithCertVarianceFieldsKeySpecifier)[];
export interface SmithCertVarianceFieldsFieldPolicy {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferKeySpecifier = ('amount' | 'blockNumber' | 'comment' | 'from' | 'fromId' | 'id' | 'timestamp' | 'to' | 'toId' | TransferKeySpecifier)[];
export interface TransferFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	fromId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	to?: FieldPolicy<any> | FieldReadFunction<any>,
	toId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferAggregateKeySpecifier = ('aggregate' | 'nodes' | TransferAggregateKeySpecifier)[];
export interface TransferAggregateFieldPolicy {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferAggregateFieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddevPop' | 'stddevSamp' | 'sum' | 'varPop' | 'varSamp' | 'variance' | TransferAggregateFieldsKeySpecifier)[];
export interface TransferAggregateFieldsFieldPolicy {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevPop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddevSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	varPop?: FieldPolicy<any> | FieldReadFunction<any>,
	varSamp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferAvgFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferAvgFieldsKeySpecifier)[];
export interface TransferAvgFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferConnectionKeySpecifier = ('edges' | 'pageInfo' | TransferConnectionKeySpecifier)[];
export interface TransferConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferEdgeKeySpecifier = ('cursor' | 'node' | TransferEdgeKeySpecifier)[];
export interface TransferEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferMaxFieldsKeySpecifier = ('amount' | 'blockNumber' | 'comment' | 'fromId' | 'id' | 'timestamp' | 'toId' | TransferMaxFieldsKeySpecifier)[];
export interface TransferMaxFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	fromId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	toId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferMinFieldsKeySpecifier = ('amount' | 'blockNumber' | 'comment' | 'fromId' | 'id' | 'timestamp' | 'toId' | TransferMinFieldsKeySpecifier)[];
export interface TransferMinFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	fromId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	toId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferStddevFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferStddevFieldsKeySpecifier)[];
export interface TransferStddevFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferStddevPopFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferStddevPopFieldsKeySpecifier)[];
export interface TransferStddevPopFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferStddevSampFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferStddevSampFieldsKeySpecifier)[];
export interface TransferStddevSampFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferSumFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferSumFieldsKeySpecifier)[];
export interface TransferSumFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferVarPopFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferVarPopFieldsKeySpecifier)[];
export interface TransferVarPopFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferVarSampFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferVarSampFieldsKeySpecifier)[];
export interface TransferVarSampFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TransferVarianceFieldsKeySpecifier = ('amount' | 'blockNumber' | TransferVarianceFieldsKeySpecifier)[];
export interface TransferVarianceFieldsFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdHistoryKeySpecifier = ('amount' | 'blockNumber' | 'id' | 'identity' | 'identityId' | 'timestamp' | UdHistoryKeySpecifier)[];
export interface UdHistoryFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	identityId?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdHistoryConnectionKeySpecifier = ('edges' | 'pageInfo' | UdHistoryConnectionKeySpecifier)[];
export interface UdHistoryConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdHistoryEdgeKeySpecifier = ('cursor' | 'node' | UdHistoryEdgeKeySpecifier)[];
export interface UdHistoryEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdReevalKeySpecifier = ('blockNumber' | 'event' | 'eventId' | 'id' | 'membersCount' | 'monetaryMass' | 'newUdAmount' | 'timestamp' | UdReevalKeySpecifier)[];
export interface UdReevalFieldPolicy {
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	membersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	monetaryMass?: FieldPolicy<any> | FieldReadFunction<any>,
	newUdAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdReevalConnectionKeySpecifier = ('edges' | 'pageInfo' | UdReevalConnectionKeySpecifier)[];
export interface UdReevalConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UdReevalEdgeKeySpecifier = ('cursor' | 'node' | UdReevalEdgeKeySpecifier)[];
export interface UdReevalEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UniversalDividendKeySpecifier = ('amount' | 'blockNumber' | 'event' | 'eventId' | 'id' | 'membersCount' | 'monetaryMass' | 'timestamp' | UniversalDividendKeySpecifier)[];
export interface UniversalDividendFieldPolicy {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	membersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	monetaryMass?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UniversalDividendConnectionKeySpecifier = ('edges' | 'pageInfo' | UniversalDividendConnectionKeySpecifier)[];
export interface UniversalDividendConnectionFieldPolicy {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UniversalDividendEdgeKeySpecifier = ('cursor' | 'node' | UniversalDividendEdgeKeySpecifier)[];
export interface UniversalDividendEdgeFieldPolicy {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
}
export type query_rootKeySpecifier = ('accountConnection' | 'blockConnection' | 'callConnection' | 'certConnection' | 'certEventConnection' | 'changeOwnerKeyConnection' | 'eventConnection' | 'extrinsicConnection' | 'getUdHistory_connection' | 'identityConnection' | 'itemsCounterConnection' | 'membershipEventConnection' | 'node' | 'smithCertConnection' | 'transferConnection' | 'udHistoryConnection' | 'udReevalConnection' | 'universalDividendConnection' | query_rootKeySpecifier)[];
export interface query_rootFieldPolicy {
	accountConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	blockConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	callConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	certConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	certEventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	changeOwnerKeyConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	eventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	getUdHistory_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	identityConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	itemsCounterConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipEventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	transferConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	udHistoryConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	udReevalConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	universalDividendConnection?: FieldPolicy<any> | FieldReadFunction<any>
}
export type subscription_rootKeySpecifier = ('accountConnection' | 'blockConnection' | 'callConnection' | 'certConnection' | 'certEventConnection' | 'changeOwnerKeyConnection' | 'eventConnection' | 'extrinsicConnection' | 'getUdHistory_connection' | 'identityConnection' | 'itemsCounterConnection' | 'membershipEventConnection' | 'node' | 'smithCertConnection' | 'transferConnection' | 'udHistoryConnection' | 'udReevalConnection' | 'universalDividendConnection' | subscription_rootKeySpecifier)[];
export interface subscription_rootFieldPolicy {
	accountConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	blockConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	callConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	certConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	certEventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	changeOwnerKeyConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	eventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	extrinsicConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	getUdHistory_connection?: FieldPolicy<any> | FieldReadFunction<any>,
	identityConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	itemsCounterConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipEventConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	smithCertConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	transferConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	udHistoryConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	udReevalConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	universalDividendConnection?: FieldPolicy<any> | FieldReadFunction<any>
}
export interface StrictTypedTypePolicies {
	Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier),
		fields?: AccountFieldPolicy,
	},
	AccountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountAggregateKeySpecifier | (() => undefined | AccountAggregateKeySpecifier),
		fields?: AccountAggregateFieldPolicy,
	},
	AccountAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountAggregateFieldsKeySpecifier | (() => undefined | AccountAggregateFieldsKeySpecifier),
		fields?: AccountAggregateFieldsFieldPolicy,
	},
	AccountConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountConnectionKeySpecifier | (() => undefined | AccountConnectionKeySpecifier),
		fields?: AccountConnectionFieldPolicy,
	},
	AccountEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountEdgeKeySpecifier | (() => undefined | AccountEdgeKeySpecifier),
		fields?: AccountEdgeFieldPolicy,
	},
	AccountMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountMaxFieldsKeySpecifier | (() => undefined | AccountMaxFieldsKeySpecifier),
		fields?: AccountMaxFieldsFieldPolicy,
	},
	AccountMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountMinFieldsKeySpecifier | (() => undefined | AccountMinFieldsKeySpecifier),
		fields?: AccountMinFieldsFieldPolicy,
	},
	Block?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockKeySpecifier | (() => undefined | BlockKeySpecifier),
		fields?: BlockFieldPolicy,
	},
	BlockConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockConnectionKeySpecifier | (() => undefined | BlockConnectionKeySpecifier),
		fields?: BlockConnectionFieldPolicy,
	},
	BlockEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockEdgeKeySpecifier | (() => undefined | BlockEdgeKeySpecifier),
		fields?: BlockEdgeFieldPolicy,
	},
	Call?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallKeySpecifier | (() => undefined | CallKeySpecifier),
		fields?: CallFieldPolicy,
	},
	CallAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallAggregateKeySpecifier | (() => undefined | CallAggregateKeySpecifier),
		fields?: CallAggregateFieldPolicy,
	},
	CallAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallAggregateFieldsKeySpecifier | (() => undefined | CallAggregateFieldsKeySpecifier),
		fields?: CallAggregateFieldsFieldPolicy,
	},
	CallConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallConnectionKeySpecifier | (() => undefined | CallConnectionKeySpecifier),
		fields?: CallConnectionFieldPolicy,
	},
	CallEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallEdgeKeySpecifier | (() => undefined | CallEdgeKeySpecifier),
		fields?: CallEdgeFieldPolicy,
	},
	CallMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallMaxFieldsKeySpecifier | (() => undefined | CallMaxFieldsKeySpecifier),
		fields?: CallMaxFieldsFieldPolicy,
	},
	CallMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CallMinFieldsKeySpecifier | (() => undefined | CallMinFieldsKeySpecifier),
		fields?: CallMinFieldsFieldPolicy,
	},
	Cert?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertKeySpecifier | (() => undefined | CertKeySpecifier),
		fields?: CertFieldPolicy,
	},
	CertAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertAggregateKeySpecifier | (() => undefined | CertAggregateKeySpecifier),
		fields?: CertAggregateFieldPolicy,
	},
	CertAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertAggregateFieldsKeySpecifier | (() => undefined | CertAggregateFieldsKeySpecifier),
		fields?: CertAggregateFieldsFieldPolicy,
	},
	CertAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertAvgFieldsKeySpecifier | (() => undefined | CertAvgFieldsKeySpecifier),
		fields?: CertAvgFieldsFieldPolicy,
	},
	CertConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertConnectionKeySpecifier | (() => undefined | CertConnectionKeySpecifier),
		fields?: CertConnectionFieldPolicy,
	},
	CertEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEdgeKeySpecifier | (() => undefined | CertEdgeKeySpecifier),
		fields?: CertEdgeFieldPolicy,
	},
	CertEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventKeySpecifier | (() => undefined | CertEventKeySpecifier),
		fields?: CertEventFieldPolicy,
	},
	CertEventAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventAggregateKeySpecifier | (() => undefined | CertEventAggregateKeySpecifier),
		fields?: CertEventAggregateFieldPolicy,
	},
	CertEventAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventAggregateFieldsKeySpecifier | (() => undefined | CertEventAggregateFieldsKeySpecifier),
		fields?: CertEventAggregateFieldsFieldPolicy,
	},
	CertEventAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventAvgFieldsKeySpecifier | (() => undefined | CertEventAvgFieldsKeySpecifier),
		fields?: CertEventAvgFieldsFieldPolicy,
	},
	CertEventConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventConnectionKeySpecifier | (() => undefined | CertEventConnectionKeySpecifier),
		fields?: CertEventConnectionFieldPolicy,
	},
	CertEventEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventEdgeKeySpecifier | (() => undefined | CertEventEdgeKeySpecifier),
		fields?: CertEventEdgeFieldPolicy,
	},
	CertEventMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventMaxFieldsKeySpecifier | (() => undefined | CertEventMaxFieldsKeySpecifier),
		fields?: CertEventMaxFieldsFieldPolicy,
	},
	CertEventMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventMinFieldsKeySpecifier | (() => undefined | CertEventMinFieldsKeySpecifier),
		fields?: CertEventMinFieldsFieldPolicy,
	},
	CertEventStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventStddevFieldsKeySpecifier | (() => undefined | CertEventStddevFieldsKeySpecifier),
		fields?: CertEventStddevFieldsFieldPolicy,
	},
	CertEventStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventStddevPopFieldsKeySpecifier | (() => undefined | CertEventStddevPopFieldsKeySpecifier),
		fields?: CertEventStddevPopFieldsFieldPolicy,
	},
	CertEventStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventStddevSampFieldsKeySpecifier | (() => undefined | CertEventStddevSampFieldsKeySpecifier),
		fields?: CertEventStddevSampFieldsFieldPolicy,
	},
	CertEventSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventSumFieldsKeySpecifier | (() => undefined | CertEventSumFieldsKeySpecifier),
		fields?: CertEventSumFieldsFieldPolicy,
	},
	CertEventVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventVarPopFieldsKeySpecifier | (() => undefined | CertEventVarPopFieldsKeySpecifier),
		fields?: CertEventVarPopFieldsFieldPolicy,
	},
	CertEventVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventVarSampFieldsKeySpecifier | (() => undefined | CertEventVarSampFieldsKeySpecifier),
		fields?: CertEventVarSampFieldsFieldPolicy,
	},
	CertEventVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertEventVarianceFieldsKeySpecifier | (() => undefined | CertEventVarianceFieldsKeySpecifier),
		fields?: CertEventVarianceFieldsFieldPolicy,
	},
	CertMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertMaxFieldsKeySpecifier | (() => undefined | CertMaxFieldsKeySpecifier),
		fields?: CertMaxFieldsFieldPolicy,
	},
	CertMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertMinFieldsKeySpecifier | (() => undefined | CertMinFieldsKeySpecifier),
		fields?: CertMinFieldsFieldPolicy,
	},
	CertStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertStddevFieldsKeySpecifier | (() => undefined | CertStddevFieldsKeySpecifier),
		fields?: CertStddevFieldsFieldPolicy,
	},
	CertStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertStddevPopFieldsKeySpecifier | (() => undefined | CertStddevPopFieldsKeySpecifier),
		fields?: CertStddevPopFieldsFieldPolicy,
	},
	CertStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertStddevSampFieldsKeySpecifier | (() => undefined | CertStddevSampFieldsKeySpecifier),
		fields?: CertStddevSampFieldsFieldPolicy,
	},
	CertSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertSumFieldsKeySpecifier | (() => undefined | CertSumFieldsKeySpecifier),
		fields?: CertSumFieldsFieldPolicy,
	},
	CertVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertVarPopFieldsKeySpecifier | (() => undefined | CertVarPopFieldsKeySpecifier),
		fields?: CertVarPopFieldsFieldPolicy,
	},
	CertVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertVarSampFieldsKeySpecifier | (() => undefined | CertVarSampFieldsKeySpecifier),
		fields?: CertVarSampFieldsFieldPolicy,
	},
	CertVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CertVarianceFieldsKeySpecifier | (() => undefined | CertVarianceFieldsKeySpecifier),
		fields?: CertVarianceFieldsFieldPolicy,
	},
	ChangeOwnerKey?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyKeySpecifier | (() => undefined | ChangeOwnerKeyKeySpecifier),
		fields?: ChangeOwnerKeyFieldPolicy,
	},
	ChangeOwnerKeyAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyAggregateKeySpecifier | (() => undefined | ChangeOwnerKeyAggregateKeySpecifier),
		fields?: ChangeOwnerKeyAggregateFieldPolicy,
	},
	ChangeOwnerKeyAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyAggregateFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyAggregateFieldsKeySpecifier),
		fields?: ChangeOwnerKeyAggregateFieldsFieldPolicy,
	},
	ChangeOwnerKeyAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyAvgFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyAvgFieldsKeySpecifier),
		fields?: ChangeOwnerKeyAvgFieldsFieldPolicy,
	},
	ChangeOwnerKeyConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyConnectionKeySpecifier | (() => undefined | ChangeOwnerKeyConnectionKeySpecifier),
		fields?: ChangeOwnerKeyConnectionFieldPolicy,
	},
	ChangeOwnerKeyEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyEdgeKeySpecifier | (() => undefined | ChangeOwnerKeyEdgeKeySpecifier),
		fields?: ChangeOwnerKeyEdgeFieldPolicy,
	},
	ChangeOwnerKeyMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyMaxFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyMaxFieldsKeySpecifier),
		fields?: ChangeOwnerKeyMaxFieldsFieldPolicy,
	},
	ChangeOwnerKeyMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyMinFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyMinFieldsKeySpecifier),
		fields?: ChangeOwnerKeyMinFieldsFieldPolicy,
	},
	ChangeOwnerKeyStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyStddevFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyStddevFieldsKeySpecifier),
		fields?: ChangeOwnerKeyStddevFieldsFieldPolicy,
	},
	ChangeOwnerKeyStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyStddevPopFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyStddevPopFieldsKeySpecifier),
		fields?: ChangeOwnerKeyStddevPopFieldsFieldPolicy,
	},
	ChangeOwnerKeyStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyStddevSampFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyStddevSampFieldsKeySpecifier),
		fields?: ChangeOwnerKeyStddevSampFieldsFieldPolicy,
	},
	ChangeOwnerKeySumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeySumFieldsKeySpecifier | (() => undefined | ChangeOwnerKeySumFieldsKeySpecifier),
		fields?: ChangeOwnerKeySumFieldsFieldPolicy,
	},
	ChangeOwnerKeyVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyVarPopFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyVarPopFieldsKeySpecifier),
		fields?: ChangeOwnerKeyVarPopFieldsFieldPolicy,
	},
	ChangeOwnerKeyVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyVarSampFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyVarSampFieldsKeySpecifier),
		fields?: ChangeOwnerKeyVarSampFieldsFieldPolicy,
	},
	ChangeOwnerKeyVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChangeOwnerKeyVarianceFieldsKeySpecifier | (() => undefined | ChangeOwnerKeyVarianceFieldsKeySpecifier),
		fields?: ChangeOwnerKeyVarianceFieldsFieldPolicy,
	},
	Event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier),
		fields?: EventFieldPolicy,
	},
	EventAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventAggregateKeySpecifier | (() => undefined | EventAggregateKeySpecifier),
		fields?: EventAggregateFieldPolicy,
	},
	EventAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventAggregateFieldsKeySpecifier | (() => undefined | EventAggregateFieldsKeySpecifier),
		fields?: EventAggregateFieldsFieldPolicy,
	},
	EventAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventAvgFieldsKeySpecifier | (() => undefined | EventAvgFieldsKeySpecifier),
		fields?: EventAvgFieldsFieldPolicy,
	},
	EventConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventConnectionKeySpecifier | (() => undefined | EventConnectionKeySpecifier),
		fields?: EventConnectionFieldPolicy,
	},
	EventEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventEdgeKeySpecifier | (() => undefined | EventEdgeKeySpecifier),
		fields?: EventEdgeFieldPolicy,
	},
	EventMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventMaxFieldsKeySpecifier | (() => undefined | EventMaxFieldsKeySpecifier),
		fields?: EventMaxFieldsFieldPolicy,
	},
	EventMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventMinFieldsKeySpecifier | (() => undefined | EventMinFieldsKeySpecifier),
		fields?: EventMinFieldsFieldPolicy,
	},
	EventStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventStddevFieldsKeySpecifier | (() => undefined | EventStddevFieldsKeySpecifier),
		fields?: EventStddevFieldsFieldPolicy,
	},
	EventStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventStddevPopFieldsKeySpecifier | (() => undefined | EventStddevPopFieldsKeySpecifier),
		fields?: EventStddevPopFieldsFieldPolicy,
	},
	EventStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventStddevSampFieldsKeySpecifier | (() => undefined | EventStddevSampFieldsKeySpecifier),
		fields?: EventStddevSampFieldsFieldPolicy,
	},
	EventSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventSumFieldsKeySpecifier | (() => undefined | EventSumFieldsKeySpecifier),
		fields?: EventSumFieldsFieldPolicy,
	},
	EventVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventVarPopFieldsKeySpecifier | (() => undefined | EventVarPopFieldsKeySpecifier),
		fields?: EventVarPopFieldsFieldPolicy,
	},
	EventVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventVarSampFieldsKeySpecifier | (() => undefined | EventVarSampFieldsKeySpecifier),
		fields?: EventVarSampFieldsFieldPolicy,
	},
	EventVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventVarianceFieldsKeySpecifier | (() => undefined | EventVarianceFieldsKeySpecifier),
		fields?: EventVarianceFieldsFieldPolicy,
	},
	Extrinsic?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicKeySpecifier | (() => undefined | ExtrinsicKeySpecifier),
		fields?: ExtrinsicFieldPolicy,
	},
	ExtrinsicAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicAggregateKeySpecifier | (() => undefined | ExtrinsicAggregateKeySpecifier),
		fields?: ExtrinsicAggregateFieldPolicy,
	},
	ExtrinsicAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicAggregateFieldsKeySpecifier | (() => undefined | ExtrinsicAggregateFieldsKeySpecifier),
		fields?: ExtrinsicAggregateFieldsFieldPolicy,
	},
	ExtrinsicAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicAvgFieldsKeySpecifier | (() => undefined | ExtrinsicAvgFieldsKeySpecifier),
		fields?: ExtrinsicAvgFieldsFieldPolicy,
	},
	ExtrinsicConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicConnectionKeySpecifier | (() => undefined | ExtrinsicConnectionKeySpecifier),
		fields?: ExtrinsicConnectionFieldPolicy,
	},
	ExtrinsicEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicEdgeKeySpecifier | (() => undefined | ExtrinsicEdgeKeySpecifier),
		fields?: ExtrinsicEdgeFieldPolicy,
	},
	ExtrinsicMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicMaxFieldsKeySpecifier | (() => undefined | ExtrinsicMaxFieldsKeySpecifier),
		fields?: ExtrinsicMaxFieldsFieldPolicy,
	},
	ExtrinsicMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicMinFieldsKeySpecifier | (() => undefined | ExtrinsicMinFieldsKeySpecifier),
		fields?: ExtrinsicMinFieldsFieldPolicy,
	},
	ExtrinsicStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicStddevFieldsKeySpecifier | (() => undefined | ExtrinsicStddevFieldsKeySpecifier),
		fields?: ExtrinsicStddevFieldsFieldPolicy,
	},
	ExtrinsicStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicStddevPopFieldsKeySpecifier | (() => undefined | ExtrinsicStddevPopFieldsKeySpecifier),
		fields?: ExtrinsicStddevPopFieldsFieldPolicy,
	},
	ExtrinsicStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicStddevSampFieldsKeySpecifier | (() => undefined | ExtrinsicStddevSampFieldsKeySpecifier),
		fields?: ExtrinsicStddevSampFieldsFieldPolicy,
	},
	ExtrinsicSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicSumFieldsKeySpecifier | (() => undefined | ExtrinsicSumFieldsKeySpecifier),
		fields?: ExtrinsicSumFieldsFieldPolicy,
	},
	ExtrinsicVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicVarPopFieldsKeySpecifier | (() => undefined | ExtrinsicVarPopFieldsKeySpecifier),
		fields?: ExtrinsicVarPopFieldsFieldPolicy,
	},
	ExtrinsicVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicVarSampFieldsKeySpecifier | (() => undefined | ExtrinsicVarSampFieldsKeySpecifier),
		fields?: ExtrinsicVarSampFieldsFieldPolicy,
	},
	ExtrinsicVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtrinsicVarianceFieldsKeySpecifier | (() => undefined | ExtrinsicVarianceFieldsKeySpecifier),
		fields?: ExtrinsicVarianceFieldsFieldPolicy,
	},
	Identity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityKeySpecifier | (() => undefined | IdentityKeySpecifier),
		fields?: IdentityFieldPolicy,
	},
	IdentityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityConnectionKeySpecifier | (() => undefined | IdentityConnectionKeySpecifier),
		fields?: IdentityConnectionFieldPolicy,
	},
	IdentityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityEdgeKeySpecifier | (() => undefined | IdentityEdgeKeySpecifier),
		fields?: IdentityEdgeFieldPolicy,
	},
	ItemsCounter?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemsCounterKeySpecifier | (() => undefined | ItemsCounterKeySpecifier),
		fields?: ItemsCounterFieldPolicy,
	},
	ItemsCounterConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemsCounterConnectionKeySpecifier | (() => undefined | ItemsCounterConnectionKeySpecifier),
		fields?: ItemsCounterConnectionFieldPolicy,
	},
	ItemsCounterEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemsCounterEdgeKeySpecifier | (() => undefined | ItemsCounterEdgeKeySpecifier),
		fields?: ItemsCounterEdgeFieldPolicy,
	},
	MembershipEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventKeySpecifier | (() => undefined | MembershipEventKeySpecifier),
		fields?: MembershipEventFieldPolicy,
	},
	MembershipEventAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventAggregateKeySpecifier | (() => undefined | MembershipEventAggregateKeySpecifier),
		fields?: MembershipEventAggregateFieldPolicy,
	},
	MembershipEventAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventAggregateFieldsKeySpecifier | (() => undefined | MembershipEventAggregateFieldsKeySpecifier),
		fields?: MembershipEventAggregateFieldsFieldPolicy,
	},
	MembershipEventAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventAvgFieldsKeySpecifier | (() => undefined | MembershipEventAvgFieldsKeySpecifier),
		fields?: MembershipEventAvgFieldsFieldPolicy,
	},
	MembershipEventConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventConnectionKeySpecifier | (() => undefined | MembershipEventConnectionKeySpecifier),
		fields?: MembershipEventConnectionFieldPolicy,
	},
	MembershipEventEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventEdgeKeySpecifier | (() => undefined | MembershipEventEdgeKeySpecifier),
		fields?: MembershipEventEdgeFieldPolicy,
	},
	MembershipEventMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventMaxFieldsKeySpecifier | (() => undefined | MembershipEventMaxFieldsKeySpecifier),
		fields?: MembershipEventMaxFieldsFieldPolicy,
	},
	MembershipEventMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventMinFieldsKeySpecifier | (() => undefined | MembershipEventMinFieldsKeySpecifier),
		fields?: MembershipEventMinFieldsFieldPolicy,
	},
	MembershipEventStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventStddevFieldsKeySpecifier | (() => undefined | MembershipEventStddevFieldsKeySpecifier),
		fields?: MembershipEventStddevFieldsFieldPolicy,
	},
	MembershipEventStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventStddevPopFieldsKeySpecifier | (() => undefined | MembershipEventStddevPopFieldsKeySpecifier),
		fields?: MembershipEventStddevPopFieldsFieldPolicy,
	},
	MembershipEventStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventStddevSampFieldsKeySpecifier | (() => undefined | MembershipEventStddevSampFieldsKeySpecifier),
		fields?: MembershipEventStddevSampFieldsFieldPolicy,
	},
	MembershipEventSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventSumFieldsKeySpecifier | (() => undefined | MembershipEventSumFieldsKeySpecifier),
		fields?: MembershipEventSumFieldsFieldPolicy,
	},
	MembershipEventVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventVarPopFieldsKeySpecifier | (() => undefined | MembershipEventVarPopFieldsKeySpecifier),
		fields?: MembershipEventVarPopFieldsFieldPolicy,
	},
	MembershipEventVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventVarSampFieldsKeySpecifier | (() => undefined | MembershipEventVarSampFieldsKeySpecifier),
		fields?: MembershipEventVarSampFieldsFieldPolicy,
	},
	MembershipEventVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembershipEventVarianceFieldsKeySpecifier | (() => undefined | MembershipEventVarianceFieldsKeySpecifier),
		fields?: MembershipEventVarianceFieldsFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	SmithCert?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertKeySpecifier | (() => undefined | SmithCertKeySpecifier),
		fields?: SmithCertFieldPolicy,
	},
	SmithCertAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertAggregateKeySpecifier | (() => undefined | SmithCertAggregateKeySpecifier),
		fields?: SmithCertAggregateFieldPolicy,
	},
	SmithCertAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertAggregateFieldsKeySpecifier | (() => undefined | SmithCertAggregateFieldsKeySpecifier),
		fields?: SmithCertAggregateFieldsFieldPolicy,
	},
	SmithCertAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertAvgFieldsKeySpecifier | (() => undefined | SmithCertAvgFieldsKeySpecifier),
		fields?: SmithCertAvgFieldsFieldPolicy,
	},
	SmithCertConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertConnectionKeySpecifier | (() => undefined | SmithCertConnectionKeySpecifier),
		fields?: SmithCertConnectionFieldPolicy,
	},
	SmithCertEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertEdgeKeySpecifier | (() => undefined | SmithCertEdgeKeySpecifier),
		fields?: SmithCertEdgeFieldPolicy,
	},
	SmithCertMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertMaxFieldsKeySpecifier | (() => undefined | SmithCertMaxFieldsKeySpecifier),
		fields?: SmithCertMaxFieldsFieldPolicy,
	},
	SmithCertMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertMinFieldsKeySpecifier | (() => undefined | SmithCertMinFieldsKeySpecifier),
		fields?: SmithCertMinFieldsFieldPolicy,
	},
	SmithCertStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertStddevFieldsKeySpecifier | (() => undefined | SmithCertStddevFieldsKeySpecifier),
		fields?: SmithCertStddevFieldsFieldPolicy,
	},
	SmithCertStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertStddevPopFieldsKeySpecifier | (() => undefined | SmithCertStddevPopFieldsKeySpecifier),
		fields?: SmithCertStddevPopFieldsFieldPolicy,
	},
	SmithCertStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertStddevSampFieldsKeySpecifier | (() => undefined | SmithCertStddevSampFieldsKeySpecifier),
		fields?: SmithCertStddevSampFieldsFieldPolicy,
	},
	SmithCertSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertSumFieldsKeySpecifier | (() => undefined | SmithCertSumFieldsKeySpecifier),
		fields?: SmithCertSumFieldsFieldPolicy,
	},
	SmithCertVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertVarPopFieldsKeySpecifier | (() => undefined | SmithCertVarPopFieldsKeySpecifier),
		fields?: SmithCertVarPopFieldsFieldPolicy,
	},
	SmithCertVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertVarSampFieldsKeySpecifier | (() => undefined | SmithCertVarSampFieldsKeySpecifier),
		fields?: SmithCertVarSampFieldsFieldPolicy,
	},
	SmithCertVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SmithCertVarianceFieldsKeySpecifier | (() => undefined | SmithCertVarianceFieldsKeySpecifier),
		fields?: SmithCertVarianceFieldsFieldPolicy,
	},
	Transfer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferKeySpecifier | (() => undefined | TransferKeySpecifier),
		fields?: TransferFieldPolicy,
	},
	TransferAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferAggregateKeySpecifier | (() => undefined | TransferAggregateKeySpecifier),
		fields?: TransferAggregateFieldPolicy,
	},
	TransferAggregateFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferAggregateFieldsKeySpecifier | (() => undefined | TransferAggregateFieldsKeySpecifier),
		fields?: TransferAggregateFieldsFieldPolicy,
	},
	TransferAvgFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferAvgFieldsKeySpecifier | (() => undefined | TransferAvgFieldsKeySpecifier),
		fields?: TransferAvgFieldsFieldPolicy,
	},
	TransferConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferConnectionKeySpecifier | (() => undefined | TransferConnectionKeySpecifier),
		fields?: TransferConnectionFieldPolicy,
	},
	TransferEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferEdgeKeySpecifier | (() => undefined | TransferEdgeKeySpecifier),
		fields?: TransferEdgeFieldPolicy,
	},
	TransferMaxFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferMaxFieldsKeySpecifier | (() => undefined | TransferMaxFieldsKeySpecifier),
		fields?: TransferMaxFieldsFieldPolicy,
	},
	TransferMinFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferMinFieldsKeySpecifier | (() => undefined | TransferMinFieldsKeySpecifier),
		fields?: TransferMinFieldsFieldPolicy,
	},
	TransferStddevFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferStddevFieldsKeySpecifier | (() => undefined | TransferStddevFieldsKeySpecifier),
		fields?: TransferStddevFieldsFieldPolicy,
	},
	TransferStddevPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferStddevPopFieldsKeySpecifier | (() => undefined | TransferStddevPopFieldsKeySpecifier),
		fields?: TransferStddevPopFieldsFieldPolicy,
	},
	TransferStddevSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferStddevSampFieldsKeySpecifier | (() => undefined | TransferStddevSampFieldsKeySpecifier),
		fields?: TransferStddevSampFieldsFieldPolicy,
	},
	TransferSumFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferSumFieldsKeySpecifier | (() => undefined | TransferSumFieldsKeySpecifier),
		fields?: TransferSumFieldsFieldPolicy,
	},
	TransferVarPopFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferVarPopFieldsKeySpecifier | (() => undefined | TransferVarPopFieldsKeySpecifier),
		fields?: TransferVarPopFieldsFieldPolicy,
	},
	TransferVarSampFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferVarSampFieldsKeySpecifier | (() => undefined | TransferVarSampFieldsKeySpecifier),
		fields?: TransferVarSampFieldsFieldPolicy,
	},
	TransferVarianceFields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferVarianceFieldsKeySpecifier | (() => undefined | TransferVarianceFieldsKeySpecifier),
		fields?: TransferVarianceFieldsFieldPolicy,
	},
	UdHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdHistoryKeySpecifier | (() => undefined | UdHistoryKeySpecifier),
		fields?: UdHistoryFieldPolicy,
	},
	UdHistoryConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdHistoryConnectionKeySpecifier | (() => undefined | UdHistoryConnectionKeySpecifier),
		fields?: UdHistoryConnectionFieldPolicy,
	},
	UdHistoryEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdHistoryEdgeKeySpecifier | (() => undefined | UdHistoryEdgeKeySpecifier),
		fields?: UdHistoryEdgeFieldPolicy,
	},
	UdReeval?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdReevalKeySpecifier | (() => undefined | UdReevalKeySpecifier),
		fields?: UdReevalFieldPolicy,
	},
	UdReevalConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdReevalConnectionKeySpecifier | (() => undefined | UdReevalConnectionKeySpecifier),
		fields?: UdReevalConnectionFieldPolicy,
	},
	UdReevalEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UdReevalEdgeKeySpecifier | (() => undefined | UdReevalEdgeKeySpecifier),
		fields?: UdReevalEdgeFieldPolicy,
	},
	UniversalDividend?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UniversalDividendKeySpecifier | (() => undefined | UniversalDividendKeySpecifier),
		fields?: UniversalDividendFieldPolicy,
	},
	UniversalDividendConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UniversalDividendConnectionKeySpecifier | (() => undefined | UniversalDividendConnectionKeySpecifier),
		fields?: UniversalDividendConnectionFieldPolicy,
	},
	UniversalDividendEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UniversalDividendEdgeKeySpecifier | (() => undefined | UniversalDividendEdgeKeySpecifier),
		fields?: UniversalDividendEdgeFieldPolicy,
	},
	query_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | query_rootKeySpecifier | (() => undefined | query_rootKeySpecifier),
		fields?: query_rootFieldPolicy,
	},
	subscription_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | subscription_rootKeySpecifier | (() => undefined | subscription_rootKeySpecifier),
		fields?: subscription_rootFieldPolicy,
	}
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;