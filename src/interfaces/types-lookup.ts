// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { BTreeSet, Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletDuniterAccountAccountData;
  }

  /** @name PalletDuniterAccountAccountData (5) */
  interface PalletDuniterAccountAccountData extends Struct {
    readonly free: u64;
    readonly reserved: u64;
    readonly feeFrozen: u64;
    readonly linkedIdty: Option<u32>;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (8) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (9) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (13) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (15) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (18) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (20) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly isUpgradeAuthorized: boolean;
    readonly asUpgradeAuthorized: {
      readonly codeHash: H256;
      readonly checkVersion: bool;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked' | 'UpgradeAuthorized';
  }

  /** @name FrameSupportDispatchDispatchInfo (21) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (22) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (23) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (24) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly isRootNotAllowed: boolean;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable' | 'RootNotAllowed';
  }

  /** @name SpRuntimeModuleError (25) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (26) */
  interface SpRuntimeTokenError extends Enum {
    readonly isFundsUnavailable: boolean;
    readonly isOnlyProvider: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly isCannotCreateHold: boolean;
    readonly isNotExpendable: boolean;
    readonly isBlocked: boolean;
    readonly type: 'FundsUnavailable' | 'OnlyProvider' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported' | 'CannotCreateHold' | 'NotExpendable' | 'Blocked';
  }

  /** @name SpArithmeticArithmeticError (27) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (28) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletDuniterAccountEvent (30) */
  interface PalletDuniterAccountEvent extends Enum {
    readonly isAccountLinked: boolean;
    readonly asAccountLinked: {
      readonly who: AccountId32;
      readonly identity: u32;
    } & Struct;
    readonly isAccountUnlinked: boolean;
    readonly asAccountUnlinked: AccountId32;
    readonly type: 'AccountLinked' | 'AccountUnlinked';
  }

  /** @name PalletSchedulerEvent (31) */
  interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallUnavailable: boolean;
    readonly asCallUnavailable: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPeriodicFailed: boolean;
    readonly asPeriodicFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPermanentlyOverweight: boolean;
    readonly asPermanentlyOverweight: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallUnavailable' | 'PeriodicFailed' | 'PermanentlyOverweight';
  }

  /** @name PalletBalancesEvent (36) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u64;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u64;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u64;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isSuspended: boolean;
    readonly asSuspended: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isRestored: boolean;
    readonly asRestored: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isUpgraded: boolean;
    readonly asUpgraded: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly amount: u64;
    } & Struct;
    readonly isRescinded: boolean;
    readonly asRescinded: {
      readonly amount: u64;
    } & Struct;
    readonly isLocked: boolean;
    readonly asLocked: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isUnlocked: boolean;
    readonly asUnlocked: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly who: AccountId32;
      readonly amount: u64;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed' | 'Minted' | 'Burned' | 'Suspended' | 'Restored' | 'Upgraded' | 'Issued' | 'Rescinded' | 'Locked' | 'Unlocked' | 'Frozen' | 'Thawed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (37) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletTransactionPaymentEvent (38) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u64;
      readonly tip: u64;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletOneshotAccountEvent (39) */
  interface PalletOneshotAccountEvent extends Enum {
    readonly isOneshotAccountCreated: boolean;
    readonly asOneshotAccountCreated: {
      readonly account: AccountId32;
      readonly balance: u64;
      readonly creator: AccountId32;
    } & Struct;
    readonly isOneshotAccountConsumed: boolean;
    readonly asOneshotAccountConsumed: {
      readonly account: AccountId32;
      readonly dest1: ITuple<[AccountId32, u64]>;
      readonly dest2: Option<ITuple<[AccountId32, u64]>>;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly account: AccountId32;
      readonly balance: u64;
    } & Struct;
    readonly type: 'OneshotAccountCreated' | 'OneshotAccountConsumed' | 'Withdraw';
  }

  /** @name PalletQuotaEvent (42) */
  interface PalletQuotaEvent extends Enum {
    readonly isRefunded: boolean;
    readonly asRefunded: {
      readonly who: AccountId32;
      readonly identity: u32;
      readonly amount: u64;
    } & Struct;
    readonly isNoQuotaForIdty: boolean;
    readonly asNoQuotaForIdty: u32;
    readonly isNoMoreCurrencyForRefund: boolean;
    readonly isRefundFailed: boolean;
    readonly asRefundFailed: AccountId32;
    readonly isRefundQueueFull: boolean;
    readonly type: 'Refunded' | 'NoQuotaForIdty' | 'NoMoreCurrencyForRefund' | 'RefundFailed' | 'RefundQueueFull';
  }

  /** @name PalletSmithMembersEvent (43) */
  interface PalletSmithMembersEvent extends Enum {
    readonly isInvitationSent: boolean;
    readonly asInvitationSent: {
      readonly receiver: u32;
      readonly issuer: u32;
    } & Struct;
    readonly isInvitationAccepted: boolean;
    readonly asInvitationAccepted: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isSmithCertAdded: boolean;
    readonly asSmithCertAdded: {
      readonly receiver: u32;
      readonly issuer: u32;
    } & Struct;
    readonly isSmithCertRemoved: boolean;
    readonly asSmithCertRemoved: {
      readonly receiver: u32;
      readonly issuer: u32;
    } & Struct;
    readonly isSmithMembershipAdded: boolean;
    readonly asSmithMembershipAdded: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isSmithMembershipRemoved: boolean;
    readonly asSmithMembershipRemoved: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly type: 'InvitationSent' | 'InvitationAccepted' | 'SmithCertAdded' | 'SmithCertRemoved' | 'SmithMembershipAdded' | 'SmithMembershipRemoved';
  }

  /** @name PalletAuthorityMembersEvent (44) */
  interface PalletAuthorityMembersEvent extends Enum {
    readonly isIncomingAuthorities: boolean;
    readonly asIncomingAuthorities: {
      readonly members: Vec<u32>;
    } & Struct;
    readonly isOutgoingAuthorities: boolean;
    readonly asOutgoingAuthorities: {
      readonly members: Vec<u32>;
    } & Struct;
    readonly isMemberGoOffline: boolean;
    readonly asMemberGoOffline: {
      readonly member: u32;
    } & Struct;
    readonly isMemberGoOnline: boolean;
    readonly asMemberGoOnline: {
      readonly member: u32;
    } & Struct;
    readonly isMemberRemoved: boolean;
    readonly asMemberRemoved: {
      readonly member: u32;
    } & Struct;
    readonly isMemberRemovedFromBlacklist: boolean;
    readonly asMemberRemovedFromBlacklist: {
      readonly member: u32;
    } & Struct;
    readonly isMemberAddedToBlacklist: boolean;
    readonly asMemberAddedToBlacklist: {
      readonly member: u32;
    } & Struct;
    readonly type: 'IncomingAuthorities' | 'OutgoingAuthorities' | 'MemberGoOffline' | 'MemberGoOnline' | 'MemberRemoved' | 'MemberRemovedFromBlacklist' | 'MemberAddedToBlacklist';
  }

  /** @name PalletOffencesEvent (46) */
  interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (48) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (49) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpConsensusGrandpaAppPublic (52) */
  interface SpConsensusGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (53) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (54) */
  interface PalletImOnlineEvent extends Enum {
    readonly isHeartbeatReceived: boolean;
    readonly asHeartbeatReceived: {
      readonly authorityId: PalletImOnlineSr25519AppSr25519Public;
    } & Struct;
    readonly isAllGood: boolean;
    readonly isSomeOffline: boolean;
    readonly asSomeOffline: {
      readonly offline: Vec<ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>>;
    } & Struct;
    readonly type: 'HeartbeatReceived' | 'AllGood' | 'SomeOffline';
  }

  /** @name PalletImOnlineSr25519AppSr25519Public (55) */
  interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (56) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name CommonRuntimeEntitiesValidatorFullIdentification (59) */
  type CommonRuntimeEntitiesValidatorFullIdentification = Null;

  /** @name PalletSudoEvent (60) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly old: Option<AccountId32>;
      readonly new_: AccountId32;
    } & Struct;
    readonly isKeyRemoved: boolean;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'KeyRemoved' | 'SudoAsDone';
  }

  /** @name PalletUpgradeOriginEvent (62) */
  interface PalletUpgradeOriginEvent extends Enum {
    readonly isDispatchedAsRoot: boolean;
    readonly asDispatchedAsRoot: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'DispatchedAsRoot';
  }

  /** @name PalletPreimageEvent (63) */
  interface PalletPreimageEvent extends Enum {
    readonly isNoted: boolean;
    readonly asNoted: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly hash_: H256;
    } & Struct;
    readonly isCleared: boolean;
    readonly asCleared: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'Noted' | 'Requested' | 'Cleared';
  }

  /** @name PalletCollectiveEvent (64) */
  interface PalletCollectiveEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly account: AccountId32;
      readonly proposalIndex: u32;
      readonly proposalHash: H256;
      readonly threshold: u32;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly account: AccountId32;
      readonly proposalHash: H256;
      readonly voted: bool;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly isApproved: boolean;
    readonly asApproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isDisapproved: boolean;
    readonly asDisapproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMemberExecuted: boolean;
    readonly asMemberExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isClosed: boolean;
    readonly asClosed: {
      readonly proposalHash: H256;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Voted' | 'Approved' | 'Disapproved' | 'Executed' | 'MemberExecuted' | 'Closed';
  }

  /** @name PalletUniversalDividendEvent (65) */
  interface PalletUniversalDividendEvent extends Enum {
    readonly isNewUdCreated: boolean;
    readonly asNewUdCreated: {
      readonly amount: u64;
      readonly index: u16;
      readonly monetaryMass: u64;
      readonly membersCount: u64;
    } & Struct;
    readonly isUdReevalued: boolean;
    readonly asUdReevalued: {
      readonly newUdAmount: u64;
      readonly monetaryMass: u64;
      readonly membersCount: u64;
    } & Struct;
    readonly isUdsAutoPaid: boolean;
    readonly asUdsAutoPaid: {
      readonly count: u16;
      readonly total: u64;
      readonly who: AccountId32;
    } & Struct;
    readonly isUdsClaimed: boolean;
    readonly asUdsClaimed: {
      readonly count: u16;
      readonly total: u64;
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'NewUdCreated' | 'UdReevalued' | 'UdsAutoPaid' | 'UdsClaimed';
  }

  /** @name PalletIdentityEvent (67) */
  interface PalletIdentityEvent extends Enum {
    readonly isIdtyCreated: boolean;
    readonly asIdtyCreated: {
      readonly idtyIndex: u32;
      readonly ownerKey: AccountId32;
    } & Struct;
    readonly isIdtyConfirmed: boolean;
    readonly asIdtyConfirmed: {
      readonly idtyIndex: u32;
      readonly ownerKey: AccountId32;
      readonly name: Bytes;
    } & Struct;
    readonly isIdtyValidated: boolean;
    readonly asIdtyValidated: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isIdtyChangedOwnerKey: boolean;
    readonly asIdtyChangedOwnerKey: {
      readonly idtyIndex: u32;
      readonly newOwnerKey: AccountId32;
    } & Struct;
    readonly isIdtyRevoked: boolean;
    readonly asIdtyRevoked: {
      readonly idtyIndex: u32;
      readonly reason: PalletIdentityRevocationReason;
    } & Struct;
    readonly isIdtyRemoved: boolean;
    readonly asIdtyRemoved: {
      readonly idtyIndex: u32;
      readonly reason: PalletIdentityRemovalReason;
    } & Struct;
    readonly type: 'IdtyCreated' | 'IdtyConfirmed' | 'IdtyValidated' | 'IdtyChangedOwnerKey' | 'IdtyRevoked' | 'IdtyRemoved';
  }

  /** @name PalletIdentityRevocationReason (69) */
  interface PalletIdentityRevocationReason extends Enum {
    readonly isRoot: boolean;
    readonly isUser: boolean;
    readonly isExpired: boolean;
    readonly type: 'Root' | 'User' | 'Expired';
  }

  /** @name PalletIdentityRemovalReason (70) */
  interface PalletIdentityRemovalReason extends Enum {
    readonly isRoot: boolean;
    readonly isUnconfirmed: boolean;
    readonly isUnvalidated: boolean;
    readonly isRevoked: boolean;
    readonly type: 'Root' | 'Unconfirmed' | 'Unvalidated' | 'Revoked';
  }

  /** @name PalletMembershipEvent (71) */
  interface PalletMembershipEvent extends Enum {
    readonly isMembershipAdded: boolean;
    readonly asMembershipAdded: {
      readonly member: u32;
      readonly expireOn: u32;
    } & Struct;
    readonly isMembershipRenewed: boolean;
    readonly asMembershipRenewed: {
      readonly member: u32;
      readonly expireOn: u32;
    } & Struct;
    readonly isMembershipRemoved: boolean;
    readonly asMembershipRemoved: {
      readonly member: u32;
      readonly reason: PalletMembershipMembershipRemovalReason;
    } & Struct;
    readonly type: 'MembershipAdded' | 'MembershipRenewed' | 'MembershipRemoved';
  }

  /** @name PalletMembershipMembershipRemovalReason (72) */
  interface PalletMembershipMembershipRemovalReason extends Enum {
    readonly isExpired: boolean;
    readonly isRevoked: boolean;
    readonly isNotEnoughCerts: boolean;
    readonly isSystem: boolean;
    readonly type: 'Expired' | 'Revoked' | 'NotEnoughCerts' | 'System';
  }

  /** @name PalletCertificationEvent (73) */
  interface PalletCertificationEvent extends Enum {
    readonly isCertAdded: boolean;
    readonly asCertAdded: {
      readonly issuer: u32;
      readonly receiver: u32;
    } & Struct;
    readonly isCertRemoved: boolean;
    readonly asCertRemoved: {
      readonly issuer: u32;
      readonly receiver: u32;
      readonly expiration: bool;
    } & Struct;
    readonly isCertRenewed: boolean;
    readonly asCertRenewed: {
      readonly issuer: u32;
      readonly receiver: u32;
    } & Struct;
    readonly type: 'CertAdded' | 'CertRemoved' | 'CertRenewed';
  }

  /** @name PalletDistanceEvent (74) */
  interface PalletDistanceEvent extends Enum {
    readonly isEvaluationRequested: boolean;
    readonly asEvaluationRequested: {
      readonly idtyIndex: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly isEvaluatedValid: boolean;
    readonly asEvaluatedValid: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isEvaluatedInvalid: boolean;
    readonly asEvaluatedInvalid: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly type: 'EvaluationRequested' | 'EvaluatedValid' | 'EvaluatedInvalid';
  }

  /** @name PalletAtomicSwapEvent (75) */
  interface PalletAtomicSwapEvent extends Enum {
    readonly isNewSwap: boolean;
    readonly asNewSwap: {
      readonly account: AccountId32;
      readonly proof: U8aFixed;
      readonly swap: PalletAtomicSwapPendingSwap;
    } & Struct;
    readonly isSwapClaimed: boolean;
    readonly asSwapClaimed: {
      readonly account: AccountId32;
      readonly proof: U8aFixed;
      readonly success: bool;
    } & Struct;
    readonly isSwapCancelled: boolean;
    readonly asSwapCancelled: {
      readonly account: AccountId32;
      readonly proof: U8aFixed;
    } & Struct;
    readonly type: 'NewSwap' | 'SwapClaimed' | 'SwapCancelled';
  }

  /** @name PalletAtomicSwapPendingSwap (76) */
  interface PalletAtomicSwapPendingSwap extends Struct {
    readonly source: AccountId32;
    readonly action: PalletAtomicSwapBalanceSwapAction;
    readonly endBlock: u32;
  }

  /** @name PalletAtomicSwapBalanceSwapAction (77) */
  interface PalletAtomicSwapBalanceSwapAction extends Struct {
    readonly value: u64;
  }

  /** @name PalletMultisigEvent (78) */
  interface PalletMultisigEvent extends Enum {
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: {
      readonly approving: AccountId32;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: {
      readonly cancelling: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigTimepoint (79) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletProvideRandomnessEvent (80) */
  interface PalletProvideRandomnessEvent extends Enum {
    readonly isFilledRandomness: boolean;
    readonly asFilledRandomness: {
      readonly requestId: u64;
      readonly randomness: H256;
    } & Struct;
    readonly isRequestedRandomness: boolean;
    readonly asRequestedRandomness: {
      readonly requestId: u64;
      readonly salt: H256;
      readonly r_type: PalletProvideRandomnessRandomnessType;
    } & Struct;
    readonly type: 'FilledRandomness' | 'RequestedRandomness';
  }

  /** @name PalletProvideRandomnessRandomnessType (81) */
  interface PalletProvideRandomnessRandomnessType extends Enum {
    readonly isRandomnessFromPreviousBlock: boolean;
    readonly isRandomnessFromOneEpochAgo: boolean;
    readonly isRandomnessFromTwoEpochsAgo: boolean;
    readonly type: 'RandomnessFromPreviousBlock' | 'RandomnessFromOneEpochAgo' | 'RandomnessFromTwoEpochsAgo';
  }

  /** @name PalletProxyEvent (82) */
  interface PalletProxyEvent extends Enum {
    readonly isProxyExecuted: boolean;
    readonly asProxyExecuted: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isPureCreated: boolean;
    readonly asPureCreated: {
      readonly pure: AccountId32;
      readonly who: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly disambiguationIndex: u16;
    } & Struct;
    readonly isAnnounced: boolean;
    readonly asAnnounced: {
      readonly real: AccountId32;
      readonly proxy: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAdded: boolean;
    readonly asProxyAdded: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isProxyRemoved: boolean;
    readonly asProxyRemoved: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly type: 'ProxyExecuted' | 'PureCreated' | 'Announced' | 'ProxyAdded' | 'ProxyRemoved';
  }

  /** @name GdevRuntimeProxyType (83) */
  interface GdevRuntimeProxyType extends Enum {
    readonly isAlmostAny: boolean;
    readonly isTransferOnly: boolean;
    readonly isCancelProxy: boolean;
    readonly isTechnicalCommitteePropose: boolean;
    readonly type: 'AlmostAny' | 'TransferOnly' | 'CancelProxy' | 'TechnicalCommitteePropose';
  }

  /** @name PalletUtilityEvent (84) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
  }

  /** @name PalletTreasuryEvent (85) */
  interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u64;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u64;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u64;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u64;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u64;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u64;
    } & Struct;
    readonly isSpendApproved: boolean;
    readonly asSpendApproved: {
      readonly proposalIndex: u32;
      readonly amount: u64;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isUpdatedInactive: boolean;
    readonly asUpdatedInactive: {
      readonly reactivated: u64;
      readonly deactivated: u64;
    } & Struct;
    readonly isAssetSpendApproved: boolean;
    readonly asAssetSpendApproved: {
      readonly index: u32;
      readonly assetKind: Null;
      readonly amount: u64;
      readonly beneficiary: AccountId32;
      readonly validFrom: u32;
      readonly expireAt: u32;
    } & Struct;
    readonly isAssetSpendVoided: boolean;
    readonly asAssetSpendVoided: {
      readonly index: u32;
    } & Struct;
    readonly isPaid: boolean;
    readonly asPaid: {
      readonly index: u32;
      readonly paymentId: Null;
    } & Struct;
    readonly isPaymentFailed: boolean;
    readonly asPaymentFailed: {
      readonly index: u32;
      readonly paymentId: Null;
    } & Struct;
    readonly isSpendProcessed: boolean;
    readonly asSpendProcessed: {
      readonly index: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved' | 'UpdatedInactive' | 'AssetSpendApproved' | 'AssetSpendVoided' | 'Paid' | 'PaymentFailed' | 'SpendProcessed';
  }

  /** @name FrameSystemPhase (86) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (89) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCodeUpgradeAuthorization (92) */
  interface FrameSystemCodeUpgradeAuthorization extends Struct {
    readonly codeHash: H256;
    readonly checkVersion: bool;
  }

  /** @name FrameSystemCall (93) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly isAuthorizeUpgrade: boolean;
    readonly asAuthorizeUpgrade: {
      readonly codeHash: H256;
    } & Struct;
    readonly isAuthorizeUpgradeWithoutChecks: boolean;
    readonly asAuthorizeUpgradeWithoutChecks: {
      readonly codeHash: H256;
    } & Struct;
    readonly isApplyAuthorizedUpgrade: boolean;
    readonly asApplyAuthorizedUpgrade: {
      readonly code: Bytes;
    } & Struct;
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent' | 'AuthorizeUpgrade' | 'AuthorizeUpgradeWithoutChecks' | 'ApplyAuthorizedUpgrade';
  }

  /** @name FrameSystemLimitsBlockWeights (97) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (98) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (99) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (101) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (102) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (103) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (104) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (109) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly isNothingAuthorized: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered' | 'NothingAuthorized' | 'Unauthorized';
  }

  /** @name PalletDuniterAccountCall (110) */
  interface PalletDuniterAccountCall extends Enum {
    readonly isUnlinkIdentity: boolean;
    readonly type: 'UnlinkIdentity';
  }

  /** @name PalletSchedulerScheduled (113) */
  interface PalletSchedulerScheduled extends Struct {
    readonly maybeId: Option<U8aFixed>;
    readonly priority: u8;
    readonly call: FrameSupportPreimagesBounded;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: GdevRuntimeOriginCaller;
  }

  /** @name FrameSupportPreimagesBounded (114) */
  interface FrameSupportPreimagesBounded extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: {
      readonly hash_: H256;
    } & Struct;
    readonly isInline: boolean;
    readonly asInline: Bytes;
    readonly isLookup: boolean;
    readonly asLookup: {
      readonly hash_: H256;
      readonly len: u32;
    } & Struct;
    readonly type: 'Legacy' | 'Inline' | 'Lookup';
  }

  /** @name PalletSchedulerCall (116) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: U8aFixed;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: U8aFixed;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: U8aFixed;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletBabeCall (118) */
  interface PalletBabeCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isPlanConfigChange: boolean;
    readonly asPlanConfigChange: {
      readonly config: SpConsensusBabeDigestsNextConfigDescriptor;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'PlanConfigChange';
  }

  /** @name SpConsensusSlotsEquivocationProof (119) */
  interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (120) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpConsensusBabeAppPublic (121) */
  interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpSessionMembershipProof (123) */
  interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (124) */
  interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (126) */
  interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name PalletTimestampCall (127) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesCall (128) */
  interface PalletBalancesCall extends Enum {
    readonly isTransferAllowDeath: boolean;
    readonly asTransferAllowDeath: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u64;
    } & Struct;
    readonly isForceSetBalance: boolean;
    readonly asForceSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u64>;
    } & Struct;
    readonly type: 'TransferAllowDeath' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve' | 'ForceSetBalance';
  }

  /** @name PalletOneshotAccountCall (132) */
  interface PalletOneshotAccountCall extends Enum {
    readonly isCreateOneshotAccount: boolean;
    readonly asCreateOneshotAccount: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isConsumeOneshotAccount: boolean;
    readonly asConsumeOneshotAccount: {
      readonly blockHeight: u32;
      readonly dest: PalletOneshotAccountAccount;
    } & Struct;
    readonly isConsumeOneshotAccountWithRemaining: boolean;
    readonly asConsumeOneshotAccountWithRemaining: {
      readonly blockHeight: u32;
      readonly dest: PalletOneshotAccountAccount;
      readonly remainingTo: PalletOneshotAccountAccount;
      readonly balance: Compact<u64>;
    } & Struct;
    readonly type: 'CreateOneshotAccount' | 'ConsumeOneshotAccount' | 'ConsumeOneshotAccountWithRemaining';
  }

  /** @name PalletOneshotAccountAccount (133) */
  interface PalletOneshotAccountAccount extends Enum {
    readonly isNormal: boolean;
    readonly asNormal: MultiAddress;
    readonly isOneshot: boolean;
    readonly asOneshot: MultiAddress;
    readonly type: 'Normal' | 'Oneshot';
  }

  /** @name PalletSmithMembersCall (134) */
  interface PalletSmithMembersCall extends Enum {
    readonly isInviteSmith: boolean;
    readonly asInviteSmith: {
      readonly receiver: u32;
    } & Struct;
    readonly isAcceptInvitation: boolean;
    readonly isCertifySmith: boolean;
    readonly asCertifySmith: {
      readonly receiver: u32;
    } & Struct;
    readonly type: 'InviteSmith' | 'AcceptInvitation' | 'CertifySmith';
  }

  /** @name PalletAuthorityMembersCall (135) */
  interface PalletAuthorityMembersCall extends Enum {
    readonly isGoOffline: boolean;
    readonly isGoOnline: boolean;
    readonly isSetSessionKeys: boolean;
    readonly asSetSessionKeys: {
      readonly keys_: GdevRuntimeOpaqueSessionKeys;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly memberId: u32;
    } & Struct;
    readonly isRemoveMemberFromBlacklist: boolean;
    readonly asRemoveMemberFromBlacklist: {
      readonly memberId: u32;
    } & Struct;
    readonly type: 'GoOffline' | 'GoOnline' | 'SetSessionKeys' | 'RemoveMember' | 'RemoveMemberFromBlacklist';
  }

  /** @name GdevRuntimeOpaqueSessionKeys (136) */
  interface GdevRuntimeOpaqueSessionKeys extends Struct {
    readonly grandpa: SpConsensusGrandpaAppPublic;
    readonly babe: SpConsensusBabeAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly authorityDiscovery: SpAuthorityDiscoveryAppPublic;
  }

  /** @name SpAuthorityDiscoveryAppPublic (137) */
  interface SpAuthorityDiscoveryAppPublic extends SpCoreSr25519Public {}

  /** @name PalletSessionCall (138) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: GdevRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name PalletGrandpaCall (139) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpConsensusGrandpaEquivocationProof (140) */
  interface SpConsensusGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpConsensusGrandpaEquivocation;
  }

  /** @name SpConsensusGrandpaEquivocation (141) */
  interface SpConsensusGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (142) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (143) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpConsensusGrandpaAppSignature (144) */
  interface SpConsensusGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (145) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (148) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (149) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletImOnlineCall (151) */
  interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (152) */
  interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (153) */
  interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (154) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name PalletSudoCall (155) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly isRemoveKey: boolean;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs' | 'RemoveKey';
  }

  /** @name PalletUpgradeOriginCall (156) */
  interface PalletUpgradeOriginCall extends Enum {
    readonly isDispatchAsRoot: boolean;
    readonly asDispatchAsRoot: {
      readonly call: Call;
    } & Struct;
    readonly isDispatchAsRootUncheckedWeight: boolean;
    readonly asDispatchAsRootUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'DispatchAsRoot' | 'DispatchAsRootUncheckedWeight';
  }

  /** @name PalletPreimageCall (157) */
  interface PalletPreimageCall extends Enum {
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly bytes: Bytes;
    } & Struct;
    readonly isUnnotePreimage: boolean;
    readonly asUnnotePreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequestPreimage: boolean;
    readonly asRequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isUnrequestPreimage: boolean;
    readonly asUnrequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isEnsureUpdated: boolean;
    readonly asEnsureUpdated: {
      readonly hashes: Vec<H256>;
    } & Struct;
    readonly type: 'NotePreimage' | 'UnnotePreimage' | 'RequestPreimage' | 'UnrequestPreimage' | 'EnsureUpdated';
  }

  /** @name PalletCollectiveCall (158) */
  interface PalletCollectiveCall extends Enum {
    readonly isSetMembers: boolean;
    readonly asSetMembers: {
      readonly newMembers: Vec<AccountId32>;
      readonly prime: Option<AccountId32>;
      readonly oldCount: u32;
    } & Struct;
    readonly isExecute: boolean;
    readonly asExecute: {
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly threshold: Compact<u32>;
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly proposal: H256;
      readonly index: Compact<u32>;
      readonly approve: bool;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: SpWeightsWeightV2Weight;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'DisapproveProposal' | 'Close';
  }

  /** @name PalletUniversalDividendCall (160) */
  interface PalletUniversalDividendCall extends Enum {
    readonly isClaimUds: boolean;
    readonly isTransferUd: boolean;
    readonly asTransferUd: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isTransferUdKeepAlive: boolean;
    readonly asTransferUdKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly type: 'ClaimUds' | 'TransferUd' | 'TransferUdKeepAlive';
  }

  /** @name PalletIdentityCall (161) */
  interface PalletIdentityCall extends Enum {
    readonly isCreateIdentity: boolean;
    readonly asCreateIdentity: {
      readonly ownerKey: AccountId32;
    } & Struct;
    readonly isConfirmIdentity: boolean;
    readonly asConfirmIdentity: {
      readonly idtyName: Bytes;
    } & Struct;
    readonly isChangeOwnerKey: boolean;
    readonly asChangeOwnerKey: {
      readonly newKey: AccountId32;
      readonly newKeySig: SpRuntimeMultiSignature;
    } & Struct;
    readonly isRevokeIdentity: boolean;
    readonly asRevokeIdentity: {
      readonly idtyIndex: u32;
      readonly revocationKey: AccountId32;
      readonly revocationSig: SpRuntimeMultiSignature;
    } & Struct;
    readonly isPruneItemIdentitiesNames: boolean;
    readonly asPruneItemIdentitiesNames: {
      readonly names: Vec<Bytes>;
    } & Struct;
    readonly isFixSufficients: boolean;
    readonly asFixSufficients: {
      readonly ownerKey: AccountId32;
      readonly inc: bool;
    } & Struct;
    readonly isLinkAccount: boolean;
    readonly asLinkAccount: {
      readonly accountId: AccountId32;
      readonly payloadSig: SpRuntimeMultiSignature;
    } & Struct;
    readonly type: 'CreateIdentity' | 'ConfirmIdentity' | 'ChangeOwnerKey' | 'RevokeIdentity' | 'PruneItemIdentitiesNames' | 'FixSufficients' | 'LinkAccount';
  }

  /** @name SpRuntimeMultiSignature (162) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEcdsaSignature (163) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name PalletCertificationCall (166) */
  interface PalletCertificationCall extends Enum {
    readonly isAddCert: boolean;
    readonly asAddCert: {
      readonly receiver: u32;
    } & Struct;
    readonly isDelCert: boolean;
    readonly asDelCert: {
      readonly issuer: u32;
      readonly receiver: u32;
    } & Struct;
    readonly isRemoveAllCertsReceivedBy: boolean;
    readonly asRemoveAllCertsReceivedBy: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isRenewCert: boolean;
    readonly asRenewCert: {
      readonly receiver: u32;
    } & Struct;
    readonly type: 'AddCert' | 'DelCert' | 'RemoveAllCertsReceivedBy' | 'RenewCert';
  }

  /** @name PalletDistanceCall (167) */
  interface PalletDistanceCall extends Enum {
    readonly isRequestDistanceEvaluation: boolean;
    readonly isUpdateEvaluation: boolean;
    readonly asUpdateEvaluation: {
      readonly computationResult: SpDistanceComputationResult;
    } & Struct;
    readonly isForceUpdateEvaluation: boolean;
    readonly asForceUpdateEvaluation: {
      readonly evaluator: AccountId32;
      readonly computationResult: SpDistanceComputationResult;
    } & Struct;
    readonly isForceValidDistanceStatus: boolean;
    readonly asForceValidDistanceStatus: {
      readonly identity: u32;
    } & Struct;
    readonly isRequestDistanceEvaluationFor: boolean;
    readonly asRequestDistanceEvaluationFor: {
      readonly target: u32;
    } & Struct;
    readonly type: 'RequestDistanceEvaluation' | 'UpdateEvaluation' | 'ForceUpdateEvaluation' | 'ForceValidDistanceStatus' | 'RequestDistanceEvaluationFor';
  }

  /** @name SpDistanceComputationResult (168) */
  interface SpDistanceComputationResult extends Struct {
    readonly distances: Vec<Perbill>;
  }

  /** @name PalletAtomicSwapCall (171) */
  interface PalletAtomicSwapCall extends Enum {
    readonly isCreateSwap: boolean;
    readonly asCreateSwap: {
      readonly target: AccountId32;
      readonly hashedProof: U8aFixed;
      readonly action: PalletAtomicSwapBalanceSwapAction;
      readonly duration: u32;
    } & Struct;
    readonly isClaimSwap: boolean;
    readonly asClaimSwap: {
      readonly proof: Bytes;
      readonly action: PalletAtomicSwapBalanceSwapAction;
    } & Struct;
    readonly isCancelSwap: boolean;
    readonly asCancelSwap: {
      readonly target: AccountId32;
      readonly hashedProof: U8aFixed;
    } & Struct;
    readonly type: 'CreateSwap' | 'ClaimSwap' | 'CancelSwap';
  }

  /** @name PalletMultisigCall (172) */
  interface PalletMultisigCall extends Enum {
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly call: Call;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly timepoint: PalletMultisigTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletProvideRandomnessCall (174) */
  interface PalletProvideRandomnessCall extends Enum {
    readonly isRequest: boolean;
    readonly asRequest: {
      readonly randomnessType: PalletProvideRandomnessRandomnessType;
      readonly salt: H256;
    } & Struct;
    readonly type: 'Request';
  }

  /** @name PalletProxyCall (175) */
  interface PalletProxyCall extends Enum {
    readonly isProxy: boolean;
    readonly asProxy: {
      readonly real: MultiAddress;
      readonly forceProxyType: Option<GdevRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly isAddProxy: boolean;
    readonly asAddProxy: {
      readonly delegate: MultiAddress;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxy: boolean;
    readonly asRemoveProxy: {
      readonly delegate: MultiAddress;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxies: boolean;
    readonly isCreatePure: boolean;
    readonly asCreatePure: {
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
      readonly index: u16;
    } & Struct;
    readonly isKillPure: boolean;
    readonly asKillPure: {
      readonly spawner: MultiAddress;
      readonly proxyType: GdevRuntimeProxyType;
      readonly index: u16;
      readonly height: Compact<u32>;
      readonly extIndex: Compact<u32>;
    } & Struct;
    readonly isAnnounce: boolean;
    readonly asAnnounce: {
      readonly real: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isRemoveAnnouncement: boolean;
    readonly asRemoveAnnouncement: {
      readonly real: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isRejectAnnouncement: boolean;
    readonly asRejectAnnouncement: {
      readonly delegate: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAnnounced: boolean;
    readonly asProxyAnnounced: {
      readonly delegate: MultiAddress;
      readonly real: MultiAddress;
      readonly forceProxyType: Option<GdevRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly type: 'Proxy' | 'AddProxy' | 'RemoveProxy' | 'RemoveProxies' | 'CreatePure' | 'KillPure' | 'Announce' | 'RemoveAnnouncement' | 'RejectAnnouncement' | 'ProxyAnnounced';
  }

  /** @name PalletUtilityCall (177) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: GdevRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isWithWeight: boolean;
    readonly asWithWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch' | 'WithWeight';
  }

  /** @name GdevRuntimeOriginCaller (179) */
  interface GdevRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly type: 'System' | 'Void' | 'TechnicalCommittee';
  }

  /** @name FrameSupportDispatchRawOrigin (180) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (181) */
  interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name SpCoreVoid (182) */
  type SpCoreVoid = Null;

  /** @name PalletTreasuryCall (183) */
  interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u64>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpendLocal: boolean;
    readonly asSpendLocal: {
      readonly amount: Compact<u64>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly assetKind: Null;
      readonly amount: Compact<u64>;
      readonly beneficiary: MultiAddress;
      readonly validFrom: Option<u32>;
    } & Struct;
    readonly isPayout: boolean;
    readonly asPayout: {
      readonly index: u32;
    } & Struct;
    readonly isCheckStatus: boolean;
    readonly asCheckStatus: {
      readonly index: u32;
    } & Struct;
    readonly isVoidSpend: boolean;
    readonly asVoidSpend: {
      readonly index: u32;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'SpendLocal' | 'RemoveApproval' | 'Spend' | 'Payout' | 'CheckStatus' | 'VoidSpend';
  }

  /** @name SpRuntimeBlakeTwo256 (184) */
  type SpRuntimeBlakeTwo256 = Null;

  /** @name PalletSchedulerError (187) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly isNamed: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange' | 'Named';
  }

  /** @name SpConsensusBabeDigestsPreDigest (194) */
  interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: 'Primary' | 'SecondaryPlain' | 'SecondaryVRF';
  }

  /** @name SpConsensusBabeDigestsPrimaryPreDigest (195) */
  interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfSignature: SpCoreSr25519VrfVrfSignature;
  }

  /** @name SpCoreSr25519VrfVrfSignature (196) */
  interface SpCoreSr25519VrfVrfSignature extends Struct {
    readonly preOutput: U8aFixed;
    readonly proof: U8aFixed;
  }

  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (197) */
  interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }

  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (198) */
  interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfSignature: SpCoreSr25519VrfVrfSignature;
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (199) */
  interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeError (203) */
  interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport' | 'InvalidConfiguration';
  }

  /** @name PalletDuniterTestParametersParameters (204) */
  interface PalletDuniterTestParametersParameters extends Struct {
    readonly babeEpochDuration: u64;
    readonly certPeriod: u32;
    readonly certMaxByIssuer: u32;
    readonly certMinReceivedCertToIssueCert: u32;
    readonly certValidityPeriod: u32;
    readonly idtyConfirmPeriod: u32;
    readonly idtyCreationPeriod: u32;
    readonly membershipPeriod: u32;
    readonly membershipRenewalPeriod: u32;
    readonly udCreationPeriod: u64;
    readonly udReevalPeriod: u64;
    readonly smithCertMaxByIssuer: u32;
    readonly smithWotMinCertForMembership: u32;
    readonly smithInactivityMaxDuration: u32;
    readonly wotFirstCertIssuableOn: u32;
    readonly wotMinCertForCreateIdtyRight: u32;
    readonly wotMinCertForMembership: u32;
  }

  /** @name PalletBalancesAccountData (205) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u64;
    readonly reserved: u64;
    readonly frozen: u64;
    readonly flags: u128;
  }

  /** @name PalletBalancesBalanceLock (209) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u64;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (210) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (213) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u64;
  }

  /** @name PalletBalancesIdAmount (216) */
  interface PalletBalancesIdAmount extends Struct {
    readonly id: Null;
    readonly amount: u64;
  }

  /** @name PalletBalancesError (218) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isExpendability: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly isTooManyHolds: boolean;
    readonly isTooManyFreezes: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'Expendability' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves' | 'TooManyHolds' | 'TooManyFreezes';
  }

  /** @name PalletTransactionPaymentReleases (220) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletOneshotAccountError (221) */
  interface PalletOneshotAccountError extends Enum {
    readonly isBlockHeightInFuture: boolean;
    readonly isBlockHeightTooOld: boolean;
    readonly isDestAccountNotExist: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isOneshotAccountAlreadyCreated: boolean;
    readonly isOneshotAccountNotExist: boolean;
    readonly type: 'BlockHeightInFuture' | 'BlockHeightTooOld' | 'DestAccountNotExist' | 'ExistentialDeposit' | 'InsufficientBalance' | 'OneshotAccountAlreadyCreated' | 'OneshotAccountNotExist';
  }

  /** @name PalletQuotaQuota (222) */
  interface PalletQuotaQuota extends Struct {
    readonly lastUse: u32;
    readonly amount: u64;
  }

  /** @name PalletQuotaRefund (224) */
  interface PalletQuotaRefund extends Struct {
    readonly account: AccountId32;
    readonly identity: u32;
    readonly amount: u64;
  }

  /** @name PalletSmithMembersSmithMeta (226) */
  interface PalletSmithMembersSmithMeta extends Struct {
    readonly status: PalletSmithMembersSmithStatus;
    readonly expiresOn: Option<u32>;
    readonly issuedCerts: Vec<u32>;
    readonly receivedCerts: Vec<u32>;
  }

  /** @name PalletSmithMembersSmithStatus (227) */
  interface PalletSmithMembersSmithStatus extends Enum {
    readonly isInvited: boolean;
    readonly isPending: boolean;
    readonly isSmith: boolean;
    readonly isExcluded: boolean;
    readonly type: 'Invited' | 'Pending' | 'Smith' | 'Excluded';
  }

  /** @name PalletSmithMembersError (228) */
  interface PalletSmithMembersError extends Enum {
    readonly isOriginMustHaveAnIdentity: boolean;
    readonly isOriginHasNeverBeenInvited: boolean;
    readonly isInvitationIsASmithPrivilege: boolean;
    readonly isInvitationIsAOnlineSmithPrivilege: boolean;
    readonly isInvitationAlreadyAccepted: boolean;
    readonly isInvitationOfExistingNonExcluded: boolean;
    readonly isInvitationOfNonMember: boolean;
    readonly isCertificationMustBeAgreed: boolean;
    readonly isCertificationOnExcludedIsForbidden: boolean;
    readonly isCertificationIsASmithPrivilege: boolean;
    readonly isCertificationIsAOnlineSmithPrivilege: boolean;
    readonly isCertificationOfSelfIsForbidden: boolean;
    readonly isCertificationReceiverMustHaveBeenInvited: boolean;
    readonly isCertificationAlreadyExists: boolean;
    readonly isCertificationStockFullyConsumed: boolean;
    readonly type: 'OriginMustHaveAnIdentity' | 'OriginHasNeverBeenInvited' | 'InvitationIsASmithPrivilege' | 'InvitationIsAOnlineSmithPrivilege' | 'InvitationAlreadyAccepted' | 'InvitationOfExistingNonExcluded' | 'InvitationOfNonMember' | 'CertificationMustBeAgreed' | 'CertificationOnExcludedIsForbidden' | 'CertificationIsASmithPrivilege' | 'CertificationIsAOnlineSmithPrivilege' | 'CertificationOfSelfIsForbidden' | 'CertificationReceiverMustHaveBeenInvited' | 'CertificationAlreadyExists' | 'CertificationStockFullyConsumed';
  }

  /** @name PalletAuthorityMembersMemberData (229) */
  interface PalletAuthorityMembersMemberData extends Struct {
    readonly ownerKey: AccountId32;
  }

  /** @name PalletAuthorityMembersError (230) */
  interface PalletAuthorityMembersError extends Enum {
    readonly isAlreadyIncoming: boolean;
    readonly isAlreadyOnline: boolean;
    readonly isAlreadyOutgoing: boolean;
    readonly isMemberIdNotFound: boolean;
    readonly isMemberBlacklisted: boolean;
    readonly isMemberNotBlacklisted: boolean;
    readonly isMemberNotFound: boolean;
    readonly isNotOnlineNorIncoming: boolean;
    readonly isNotMember: boolean;
    readonly isSessionKeysNotProvided: boolean;
    readonly isTooManyAuthorities: boolean;
    readonly type: 'AlreadyIncoming' | 'AlreadyOnline' | 'AlreadyOutgoing' | 'MemberIdNotFound' | 'MemberBlacklisted' | 'MemberNotBlacklisted' | 'MemberNotFound' | 'NotOnlineNorIncoming' | 'NotMember' | 'SessionKeysNotProvided' | 'TooManyAuthorities';
  }

  /** @name SpStakingOffenceOffenceDetails (231) */
  interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name SpCoreCryptoKeyTypeId (237) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (238) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (239) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (240) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (242) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletImOnlineError (246) */
  interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name PalletSudoError (249) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletPreimageOldRequestStatus (250) */
  interface PalletPreimageOldRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: {
      readonly deposit: ITuple<[AccountId32, u64]>;
      readonly len: u32;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly deposit: Option<ITuple<[AccountId32, u64]>>;
      readonly count: u32;
      readonly len: Option<u32>;
    } & Struct;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageRequestStatus (251) */
  interface PalletPreimageRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: {
      readonly ticket: ITuple<[AccountId32, Null]>;
      readonly len: u32;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly maybeTicket: Option<ITuple<[AccountId32, Null]>>;
      readonly count: u32;
      readonly maybeLen: Option<u32>;
    } & Struct;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageError (255) */
  interface PalletPreimageError extends Enum {
    readonly isTooBig: boolean;
    readonly isAlreadyNoted: boolean;
    readonly isNotAuthorized: boolean;
    readonly isNotNoted: boolean;
    readonly isRequested: boolean;
    readonly isNotRequested: boolean;
    readonly isTooMany: boolean;
    readonly isTooFew: boolean;
    readonly type: 'TooBig' | 'AlreadyNoted' | 'NotAuthorized' | 'NotNoted' | 'Requested' | 'NotRequested' | 'TooMany' | 'TooFew';
  }

  /** @name PalletCollectiveVotes (257) */
  interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (258) */
  interface PalletCollectiveError extends Enum {
    readonly isNotMember: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalMissing: boolean;
    readonly isWrongIndex: boolean;
    readonly isDuplicateVote: boolean;
    readonly isAlreadyInitialized: boolean;
    readonly isTooEarly: boolean;
    readonly isTooManyProposals: boolean;
    readonly isWrongProposalWeight: boolean;
    readonly isWrongProposalLength: boolean;
    readonly isPrimeAccountNotMember: boolean;
    readonly type: 'NotMember' | 'DuplicateProposal' | 'ProposalMissing' | 'WrongIndex' | 'DuplicateVote' | 'AlreadyInitialized' | 'TooEarly' | 'TooManyProposals' | 'WrongProposalWeight' | 'WrongProposalLength' | 'PrimeAccountNotMember';
  }

  /** @name PalletUniversalDividendError (262) */
  interface PalletUniversalDividendError extends Enum {
    readonly isAccountNotAllowedToClaimUds: boolean;
    readonly type: 'AccountNotAllowedToClaimUds';
  }

  /** @name PalletDuniterWotError (263) */
  interface PalletDuniterWotError extends Enum {
    readonly isNotEnoughCerts: boolean;
    readonly isTargetStatusInvalid: boolean;
    readonly isIdtyCreationPeriodNotRespected: boolean;
    readonly isNotEnoughReceivedCertsToCreateIdty: boolean;
    readonly isMaxEmittedCertsReached: boolean;
    readonly isIssuerNotMember: boolean;
    readonly isIdtyNotFound: boolean;
    readonly isMembershipRenewalPeriodNotRespected: boolean;
    readonly type: 'NotEnoughCerts' | 'TargetStatusInvalid' | 'IdtyCreationPeriodNotRespected' | 'NotEnoughReceivedCertsToCreateIdty' | 'MaxEmittedCertsReached' | 'IssuerNotMember' | 'IdtyNotFound' | 'MembershipRenewalPeriodNotRespected';
  }

  /** @name PalletIdentityIdtyValue (264) */
  interface PalletIdentityIdtyValue extends Struct {
    readonly data: CommonRuntimeEntitiesIdtyData;
    readonly nextCreatableIdentityOn: u32;
    readonly oldOwnerKey: Option<ITuple<[AccountId32, u32]>>;
    readonly ownerKey: AccountId32;
    readonly nextScheduled: u32;
    readonly status: PalletIdentityIdtyStatus;
  }

  /** @name CommonRuntimeEntitiesIdtyData (265) */
  interface CommonRuntimeEntitiesIdtyData extends Struct {
    readonly firstEligibleUd: u16;
  }

  /** @name PalletIdentityIdtyStatus (268) */
  interface PalletIdentityIdtyStatus extends Enum {
    readonly isUnconfirmed: boolean;
    readonly isUnvalidated: boolean;
    readonly isMember: boolean;
    readonly isNotMember: boolean;
    readonly isRevoked: boolean;
    readonly type: 'Unconfirmed' | 'Unvalidated' | 'Member' | 'NotMember' | 'Revoked';
  }

  /** @name PalletIdentityError (269) */
  interface PalletIdentityError extends Enum {
    readonly isIdtyAlreadyConfirmed: boolean;
    readonly isIdtyAlreadyCreated: boolean;
    readonly isIdtyIndexNotFound: boolean;
    readonly isIdtyNameAlreadyExist: boolean;
    readonly isIdtyNameInvalid: boolean;
    readonly isIdtyNotFound: boolean;
    readonly isInvalidSignature: boolean;
    readonly isInvalidRevocationKey: boolean;
    readonly isIssuerNotMember: boolean;
    readonly isNotRespectIdtyCreationPeriod: boolean;
    readonly isOwnerKeyAlreadyRecentlyChanged: boolean;
    readonly isOwnerKeyAlreadyUsed: boolean;
    readonly isProhibitedToRevertToAnOldKey: boolean;
    readonly isAlreadyRevoked: boolean;
    readonly isCanNotRevokeUnconfirmed: boolean;
    readonly isCanNotRevokeUnvalidated: boolean;
    readonly isAccountNotExist: boolean;
    readonly type: 'IdtyAlreadyConfirmed' | 'IdtyAlreadyCreated' | 'IdtyIndexNotFound' | 'IdtyNameAlreadyExist' | 'IdtyNameInvalid' | 'IdtyNotFound' | 'InvalidSignature' | 'InvalidRevocationKey' | 'IssuerNotMember' | 'NotRespectIdtyCreationPeriod' | 'OwnerKeyAlreadyRecentlyChanged' | 'OwnerKeyAlreadyUsed' | 'ProhibitedToRevertToAnOldKey' | 'AlreadyRevoked' | 'CanNotRevokeUnconfirmed' | 'CanNotRevokeUnvalidated' | 'AccountNotExist';
  }

  /** @name SpMembershipMembershipData (270) */
  interface SpMembershipMembershipData extends Struct {
    readonly expireOn: u32;
  }

  /** @name PalletMembershipError (271) */
  interface PalletMembershipError extends Enum {
    readonly isMembershipNotFound: boolean;
    readonly isAlreadyMember: boolean;
    readonly type: 'MembershipNotFound' | 'AlreadyMember';
  }

  /** @name PalletCertificationIdtyCertMeta (272) */
  interface PalletCertificationIdtyCertMeta extends Struct {
    readonly issuedCount: u32;
    readonly nextIssuableOn: u32;
    readonly receivedCount: u32;
  }

  /** @name PalletCertificationError (273) */
  interface PalletCertificationError extends Enum {
    readonly isOriginMustHaveAnIdentity: boolean;
    readonly isCannotCertifySelf: boolean;
    readonly isIssuedTooManyCert: boolean;
    readonly isNotEnoughCertReceived: boolean;
    readonly isNotRespectCertPeriod: boolean;
    readonly isCertAlreadyExists: boolean;
    readonly isCertDoesNotExist: boolean;
    readonly type: 'OriginMustHaveAnIdentity' | 'CannotCertifySelf' | 'IssuedTooManyCert' | 'NotEnoughCertReceived' | 'NotRespectCertPeriod' | 'CertAlreadyExists' | 'CertDoesNotExist';
  }

  /** @name PalletDistanceEvaluationPool (274) */
  interface PalletDistanceEvaluationPool extends Struct {
    readonly evaluations: Vec<ITuple<[u32, PalletDistanceMedianMedianAcc]>>;
    readonly evaluators: BTreeSet<AccountId32>;
  }

  /** @name PalletDistanceMedianMedianAcc (277) */
  interface PalletDistanceMedianMedianAcc extends Struct {
    readonly samples: Vec<ITuple<[Perbill, u32]>>;
    readonly medianIndex: Option<u32>;
    readonly medianSubindex: u32;
  }

  /** @name PalletDistanceError (284) */
  interface PalletDistanceError extends Enum {
    readonly isAlreadyInEvaluation: boolean;
    readonly isTooManyEvaluationsByAuthor: boolean;
    readonly isTooManyEvaluationsInBlock: boolean;
    readonly isNoAuthor: boolean;
    readonly isCallerHasNoIdentity: boolean;
    readonly isCallerIdentityNotFound: boolean;
    readonly isCallerNotMember: boolean;
    readonly isCallerStatusInvalid: boolean;
    readonly isTargetIdentityNotFound: boolean;
    readonly isQueueFull: boolean;
    readonly isTooManyEvaluators: boolean;
    readonly isWrongResultLength: boolean;
    readonly isTargetMustBeUnvalidated: boolean;
    readonly type: 'AlreadyInEvaluation' | 'TooManyEvaluationsByAuthor' | 'TooManyEvaluationsInBlock' | 'NoAuthor' | 'CallerHasNoIdentity' | 'CallerIdentityNotFound' | 'CallerNotMember' | 'CallerStatusInvalid' | 'TargetIdentityNotFound' | 'QueueFull' | 'TooManyEvaluators' | 'WrongResultLength' | 'TargetMustBeUnvalidated';
  }

  /** @name PalletAtomicSwapError (286) */
  interface PalletAtomicSwapError extends Enum {
    readonly isAlreadyExist: boolean;
    readonly isInvalidProof: boolean;
    readonly isProofTooLarge: boolean;
    readonly isSourceMismatch: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isNotExist: boolean;
    readonly isClaimActionMismatch: boolean;
    readonly isDurationNotPassed: boolean;
    readonly type: 'AlreadyExist' | 'InvalidProof' | 'ProofTooLarge' | 'SourceMismatch' | 'AlreadyClaimed' | 'NotExist' | 'ClaimActionMismatch' | 'DurationNotPassed';
  }

  /** @name PalletMultisigMultisig (287) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u64;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (289) */
  interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isMaxWeightTooLow: boolean;
    readonly isAlreadyStored: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'MaxWeightTooLow' | 'AlreadyStored';
  }

  /** @name PalletProvideRandomnessRequest (291) */
  interface PalletProvideRandomnessRequest extends Struct {
    readonly requestId: u64;
    readonly salt: H256;
  }

  /** @name PalletProvideRandomnessError (292) */
  interface PalletProvideRandomnessError extends Enum {
    readonly isQueueFull: boolean;
    readonly type: 'QueueFull';
  }

  /** @name PalletProxyProxyDefinition (295) */
  interface PalletProxyProxyDefinition extends Struct {
    readonly delegate: AccountId32;
    readonly proxyType: GdevRuntimeProxyType;
    readonly delay: u32;
  }

  /** @name PalletProxyAnnouncement (299) */
  interface PalletProxyAnnouncement extends Struct {
    readonly real: AccountId32;
    readonly callHash: H256;
    readonly height: u32;
  }

  /** @name PalletProxyError (301) */
  interface PalletProxyError extends Enum {
    readonly isTooMany: boolean;
    readonly isNotFound: boolean;
    readonly isNotProxy: boolean;
    readonly isUnproxyable: boolean;
    readonly isDuplicate: boolean;
    readonly isNoPermission: boolean;
    readonly isUnannounced: boolean;
    readonly isNoSelfProxy: boolean;
    readonly type: 'TooMany' | 'NotFound' | 'NotProxy' | 'Unproxyable' | 'Duplicate' | 'NoPermission' | 'Unannounced' | 'NoSelfProxy';
  }

  /** @name PalletUtilityError (302) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletTreasuryProposal (303) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u64;
    readonly beneficiary: AccountId32;
    readonly bond: u64;
  }

  /** @name PalletTreasurySpendStatus (305) */
  interface PalletTreasurySpendStatus extends Struct {
    readonly assetKind: Null;
    readonly amount: u64;
    readonly beneficiary: AccountId32;
    readonly validFrom: u32;
    readonly expireAt: u32;
    readonly status: PalletTreasuryPaymentState;
  }

  /** @name PalletTreasuryPaymentState (306) */
  interface PalletTreasuryPaymentState extends Enum {
    readonly isPending: boolean;
    readonly isAttempted: boolean;
    readonly asAttempted: {
      readonly id: Null;
    } & Struct;
    readonly isFailed: boolean;
    readonly type: 'Pending' | 'Attempted' | 'Failed';
  }

  /** @name FrameSupportPalletId (309) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (310) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly isFailedToConvertBalance: boolean;
    readonly isSpendExpired: boolean;
    readonly isEarlyPayout: boolean;
    readonly isAlreadyAttempted: boolean;
    readonly isPayoutError: boolean;
    readonly isNotAttempted: boolean;
    readonly isInconclusive: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved' | 'FailedToConvertBalance' | 'SpendExpired' | 'EarlyPayout' | 'AlreadyAttempted' | 'PayoutError' | 'NotAttempted' | 'Inconclusive';
  }

  /** @name FrameSystemExtensionsCheckNonZeroSender (313) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (314) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (315) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (316) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name PalletOneshotAccountCheckNonce (319) */
  interface PalletOneshotAccountCheckNonce extends FrameSystemExtensionsCheckNonce {}

  /** @name GdevRuntimeRuntime (320) */
  type GdevRuntimeRuntime = Null;

  /** @name FrameSystemExtensionsCheckNonce (321) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (322) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (323) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u64> {}

} // declare module
