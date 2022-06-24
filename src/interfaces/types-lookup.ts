// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

declare module '@polkadot/types/lookup' {
  import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, WrapperKeepOpaque, bool, u16, u32, u64, u8 } from '@polkadot/types-codec';
  import type { ITuple } from '@polkadot/types-codec/types';
  import type { AccountId32, Call, H256, MultiAddress, Perbill } from '@polkadot/types/interfaces/runtime';
  import type { Event } from '@polkadot/types/interfaces/system';

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletDuniterAccountAccountData;
  }

  /** @name PalletDuniterAccountAccountData (5) */
  export interface PalletDuniterAccountAccountData extends Struct {
    readonly randomId: Option<H256>;
    readonly free: u64;
    readonly reserved: u64;
    readonly feeFrozen: u64;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (9) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
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

  /** @name FrameSystemEventRecord (16) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
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
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportWeightsDispatchInfo (19) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  export interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: {
      readonly index: u8;
      readonly error: u8;
    } & Struct;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic';
  }

  /** @name SpRuntimeTokenError (23) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (24) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name PalletDuniterAccountEvent (25) */
  export interface PalletDuniterAccountEvent extends Enum {
    readonly isForceDestroy: boolean;
    readonly asForceDestroy: {
      readonly who: AccountId32;
      readonly balance: u64;
    } & Struct;
    readonly isRandomIdAssigned: boolean;
    readonly asRandomIdAssigned: {
      readonly who: AccountId32;
      readonly randomId: H256;
    } & Struct;
    readonly type: 'ForceDestroy' | 'RandomIdAssigned';
  }

  /** @name PalletSchedulerEvent (26) */
  export interface PalletSchedulerEvent extends Enum {
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
      readonly id: Option<Bytes>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallLookupFailed: boolean;
    readonly asCallLookupFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly error: FrameSupportScheduleLookupError;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallLookupFailed';
  }

  /** @name FrameSupportScheduleLookupError (31) */
  export interface FrameSupportScheduleLookupError extends Enum {
    readonly isUnknown: boolean;
    readonly isBadFormat: boolean;
    readonly type: 'Unknown' | 'BadFormat';
  }

  /** @name PalletBalancesEvent (32) */
  export interface PalletBalancesEvent extends Enum {
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
      readonly reserved: u64;
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
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (33) */
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletAuthorityMembersEvent (34) */
  export interface PalletAuthorityMembersEvent extends Enum {
    readonly isIncomingAuthorities: boolean;
    readonly asIncomingAuthorities: Vec<u32>;
    readonly isOutgoingAuthorities: boolean;
    readonly asOutgoingAuthorities: Vec<u32>;
    readonly isMemberGoOffline: boolean;
    readonly asMemberGoOffline: u32;
    readonly isMemberGoOnline: boolean;
    readonly asMemberGoOnline: u32;
    readonly isMemberRemoved: boolean;
    readonly asMemberRemoved: u32;
    readonly type: 'IncomingAuthorities' | 'OutgoingAuthorities' | 'MemberGoOffline' | 'MemberGoOnline' | 'MemberRemoved';
  }

  /** @name PalletOffencesEvent (36) */
  export interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (38) */
  export interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (39) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (42) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (43) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (44) */
  export interface PalletImOnlineEvent extends Enum {
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

  /** @name PalletImOnlineSr25519AppSr25519Public (45) */
  export interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (46) */
  export interface SpCoreSr25519Public extends U8aFixed {}

  /** @name CommonRuntimeEntitiesValidatorFullIdentification (49) */
  export type CommonRuntimeEntitiesValidatorFullIdentification = Null;

  /** @name PalletSudoEvent (50) */
  export interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletUpgradeOriginEvent (52) */
  export interface PalletUpgradeOriginEvent extends Enum {
    readonly isDispatchedAsRoot: boolean;
    readonly asDispatchedAsRoot: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'DispatchedAsRoot';
  }

  /** @name PalletPreimageEvent (53) */
  export interface PalletPreimageEvent extends Enum {
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

  /** @name PalletUniversalDividendEvent (54) */
  export interface PalletUniversalDividendEvent extends Enum {
    readonly isNewUdCreated: boolean;
    readonly asNewUdCreated: {
      readonly amount: u64;
      readonly monetaryMass: u64;
      readonly membersCount: u64;
    } & Struct;
    readonly isUdReevalued: boolean;
    readonly asUdReevalued: {
      readonly newUdAmount: u64;
      readonly monetaryMass: u64;
      readonly membersCount: u64;
    } & Struct;
    readonly type: 'NewUdCreated' | 'UdReevalued';
  }

  /** @name PalletIdentityEvent (55) */
  export interface PalletIdentityEvent extends Enum {
    readonly isIdtyCreated: boolean;
    readonly asIdtyCreated: {
      readonly idtyIndex: u32;
      readonly ownerKey: AccountId32;
    } & Struct;
    readonly isIdtyConfirmed: boolean;
    readonly asIdtyConfirmed: {
      readonly idtyIndex: u32;
      readonly ownerKey: AccountId32;
      readonly name: Text;
    } & Struct;
    readonly isIdtyValidated: boolean;
    readonly asIdtyValidated: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isIdtyRemoved: boolean;
    readonly asIdtyRemoved: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly type: 'IdtyCreated' | 'IdtyConfirmed' | 'IdtyValidated' | 'IdtyRemoved';
  }

  /** @name PalletMembershipEvent (57) */
  export interface PalletMembershipEvent extends Enum {
    readonly isMembershipAcquired: boolean;
    readonly asMembershipAcquired: u32;
    readonly isMembershipExpired: boolean;
    readonly asMembershipExpired: u32;
    readonly isMembershipRenewed: boolean;
    readonly asMembershipRenewed: u32;
    readonly isMembershipRequested: boolean;
    readonly asMembershipRequested: u32;
    readonly isMembershipRevoked: boolean;
    readonly asMembershipRevoked: u32;
    readonly isPendingMembershipExpired: boolean;
    readonly asPendingMembershipExpired: u32;
    readonly type: 'MembershipAcquired' | 'MembershipExpired' | 'MembershipRenewed' | 'MembershipRequested' | 'MembershipRevoked' | 'PendingMembershipExpired';
  }

  /** @name PalletCertificationEvent (58) */
  export interface PalletCertificationEvent extends Enum {
    readonly isNewCert: boolean;
    readonly asNewCert: {
      readonly issuer: u32;
      readonly issuerIssuedCount: u32;
      readonly receiver: u32;
      readonly receiverReceivedCount: u32;
    } & Struct;
    readonly isRemovedCert: boolean;
    readonly asRemovedCert: {
      readonly issuer: u32;
      readonly issuerIssuedCount: u32;
      readonly receiver: u32;
      readonly receiverReceivedCount: u32;
      readonly expiration: bool;
    } & Struct;
    readonly isRenewedCert: boolean;
    readonly asRenewedCert: {
      readonly issuer: u32;
      readonly receiver: u32;
    } & Struct;
    readonly type: 'NewCert' | 'RemovedCert' | 'RenewedCert';
  }

  /** @name PalletCollectiveEvent (62) */
  export interface PalletCollectiveEvent extends Enum {
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

  /** @name PalletAtomicSwapEvent (63) */
  export interface PalletAtomicSwapEvent extends Enum {
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

  /** @name PalletAtomicSwapPendingSwap (64) */
  export interface PalletAtomicSwapPendingSwap extends Struct {
    readonly source: AccountId32;
    readonly action: PalletAtomicSwapBalanceSwapAction;
    readonly endBlock: u32;
  }

  /** @name PalletAtomicSwapBalanceSwapAction (65) */
  export interface PalletAtomicSwapBalanceSwapAction extends Struct {
    readonly value: u64;
  }

  /** @name PalletMultisigEvent (66) */
  export interface PalletMultisigEvent extends Enum {
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

  /** @name PalletMultisigTimepoint (67) */
  export interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletProvideRandomnessEvent (68) */
  export interface PalletProvideRandomnessEvent extends Enum {
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

  /** @name PalletProvideRandomnessRandomnessType (69) */
  export interface PalletProvideRandomnessRandomnessType extends Enum {
    readonly isRandomnessFromPreviousBlock: boolean;
    readonly isRandomnessFromOneEpochAgo: boolean;
    readonly isRandomnessFromTwoEpochsAgo: boolean;
    readonly type: 'RandomnessFromPreviousBlock' | 'RandomnessFromOneEpochAgo' | 'RandomnessFromTwoEpochsAgo';
  }

  /** @name PalletProxyEvent (70) */
  export interface PalletProxyEvent extends Enum {
    readonly isProxyExecuted: boolean;
    readonly asProxyExecuted: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isAnonymousCreated: boolean;
    readonly asAnonymousCreated: {
      readonly anonymous: AccountId32;
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
    readonly type: 'ProxyExecuted' | 'AnonymousCreated' | 'Announced' | 'ProxyAdded';
  }

  /** @name GdevRuntimeProxyType (71) */
  export interface GdevRuntimeProxyType extends Enum {
    readonly isAny: boolean;
    readonly isTransferOnly: boolean;
    readonly isCancelProxy: boolean;
    readonly isSmithsCollectivePropose: boolean;
    readonly type: 'Any' | 'TransferOnly' | 'CancelProxy' | 'SmithsCollectivePropose';
  }

  /** @name PalletUtilityEvent (73) */
  export interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isItemCompleted: boolean;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'ItemCompleted' | 'DispatchedAs';
  }

  /** @name PalletTreasuryEvent (74) */
  export interface PalletTreasuryEvent extends Enum {
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
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit';
  }

  /** @name FrameSystemPhase (75) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (78) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (80) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
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
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (85) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (86) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (87) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (89) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (90) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (91) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (92) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
  }

  /** @name FrameSystemError (97) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletSchedulerScheduledV3 (100) */
  export interface PalletSchedulerScheduledV3 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: FrameSupportScheduleMaybeHashed;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: GdevRuntimeOriginCaller;
  }

  /** @name FrameSupportScheduleMaybeHashed (101) */
  export interface FrameSupportScheduleMaybeHashed extends Enum {
    readonly isValue: boolean;
    readonly asValue: Call;
    readonly isHash: boolean;
    readonly asHash: H256;
    readonly type: 'Value' | 'Hash';
  }

  /** @name PalletSchedulerCall (103) */
  export interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletBabeCall (105) */
  export interface PalletBabeCall extends Enum {
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

  /** @name SpConsensusSlotsEquivocationProof (106) */
  export interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (107) */
  export interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (108) */
  export type SpRuntimeBlakeTwo256 = Null;

  /** @name SpConsensusBabeAppPublic (109) */
  export interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpSessionMembershipProof (111) */
  export interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (112) */
  export interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (114) */
  export interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name PalletTimestampCall (115) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesCall (117) */
  export interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u64>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u64>;
      readonly newReserved: Compact<u64>;
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
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletAuthorityMembersCall (121) */
  export interface PalletAuthorityMembersCall extends Enum {
    readonly isGoOffline: boolean;
    readonly isGoOnline: boolean;
    readonly isSetSessionKeys: boolean;
    readonly asSetSessionKeys: {
      readonly keys_: U8aFixed;
    } & Struct;
    readonly isPruneAccountIdOf: boolean;
    readonly asPruneAccountIdOf: {
      readonly membersIds: Vec<u32>;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly memberId: u32;
    } & Struct;
    readonly type: 'GoOffline' | 'GoOnline' | 'SetSessionKeys' | 'PruneAccountIdOf' | 'RemoveMember';
  }

  /** @name PalletAuthorshipCall (123) */
  export interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: 'SetUncles';
  }

  /** @name PalletSessionCall (125) */
  export interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: GdevRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name GdevRuntimeOpaqueSessionKeys (126) */
  export interface GdevRuntimeOpaqueSessionKeys extends Struct {
    readonly grandpa: SpFinalityGrandpaAppPublic;
    readonly babe: SpConsensusBabeAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly authorityDiscovery: SpAuthorityDiscoveryAppPublic;
  }

  /** @name SpAuthorityDiscoveryAppPublic (127) */
  export interface SpAuthorityDiscoveryAppPublic extends SpCoreSr25519Public {}

  /** @name PalletGrandpaCall (128) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (129) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (130) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (131) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (132) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (133) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (134) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (137) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (138) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (140) */
  export type SpCoreVoid = Null;

  /** @name PalletImOnlineCall (141) */
  export interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (142) */
  export interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly networkState: SpCoreOffchainOpaqueNetworkState;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name SpCoreOffchainOpaqueNetworkState (143) */
  export interface SpCoreOffchainOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (147) */
  export interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (148) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name PalletSudoCall (149) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
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
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletUpgradeOriginCall (150) */
  export interface PalletUpgradeOriginCall extends Enum {
    readonly isDispatchAsRoot: boolean;
    readonly asDispatchAsRoot: {
      readonly call: Call;
    } & Struct;
    readonly isDispatchAsRootUncheckedWeight: boolean;
    readonly asDispatchAsRootUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
    } & Struct;
    readonly type: 'DispatchAsRoot' | 'DispatchAsRootUncheckedWeight';
  }

  /** @name PalletPreimageCall (151) */
  export interface PalletPreimageCall extends Enum {
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
    readonly type: 'NotePreimage' | 'UnnotePreimage' | 'RequestPreimage' | 'UnrequestPreimage';
  }

  /** @name PalletUniversalDividendCall (152) */
  export interface PalletUniversalDividendCall extends Enum {
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
    readonly type: 'TransferUd' | 'TransferUdKeepAlive';
  }

  /** @name PalletIdentityCall (153) */
  export interface PalletIdentityCall extends Enum {
    readonly isCreateIdentity: boolean;
    readonly asCreateIdentity: {
      readonly ownerKey: AccountId32;
    } & Struct;
    readonly isConfirmIdentity: boolean;
    readonly asConfirmIdentity: {
      readonly idtyName: Text;
    } & Struct;
    readonly isValidateIdentity: boolean;
    readonly asValidateIdentity: {
      readonly idtyIndex: u32;
    } & Struct;
    readonly isRevokeIdentity: boolean;
    readonly asRevokeIdentity: {
      readonly payload: PalletIdentityRevocationPayload;
      readonly payloadSig: SpRuntimeMultiSignature;
    } & Struct;
    readonly isRemoveIdentity: boolean;
    readonly asRemoveIdentity: {
      readonly idtyIndex: u32;
      readonly idtyName: Option<Text>;
    } & Struct;
    readonly isPruneItemIdentitiesNames: boolean;
    readonly asPruneItemIdentitiesNames: {
      readonly names: Vec<Text>;
    } & Struct;
    readonly isPruneItemIdentityIndexOf: boolean;
    readonly asPruneItemIdentityIndexOf: {
      readonly accountsIds: Vec<AccountId32>;
    } & Struct;
    readonly type: 'CreateIdentity' | 'ConfirmIdentity' | 'ValidateIdentity' | 'RevokeIdentity' | 'RemoveIdentity' | 'PruneItemIdentitiesNames' | 'PruneItemIdentityIndexOf';
  }

  /** @name PalletIdentityRevocationPayload (154) */
  export interface PalletIdentityRevocationPayload extends Struct {
    readonly ownerKey: AccountId32;
    readonly genesisHash: H256;
  }

  /** @name SpRuntimeMultiSignature (155) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEcdsaSignature (156) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name PalletMembershipCall (161) */
  export interface PalletMembershipCall extends Enum {
    readonly isForceRequestMembership: boolean;
    readonly asForceRequestMembership: {
      readonly idtyId: u32;
      readonly metadata: AccountId32;
    } & Struct;
    readonly isRequestMembership: boolean;
    readonly asRequestMembership: {
      readonly metadata: AccountId32;
    } & Struct;
    readonly isClaimMembership: boolean;
    readonly asClaimMembership: {
      readonly maybeIdtyId: Option<u32>;
    } & Struct;
    readonly isRenewMembership: boolean;
    readonly asRenewMembership: {
      readonly maybeIdtyId: Option<u32>;
    } & Struct;
    readonly isRevokeMembership: boolean;
    readonly asRevokeMembership: {
      readonly maybeIdtyId: Option<u32>;
    } & Struct;
    readonly type: 'ForceRequestMembership' | 'RequestMembership' | 'ClaimMembership' | 'RenewMembership' | 'RevokeMembership';
  }

  /** @name PalletCertificationCall (164) */
  export interface PalletCertificationCall extends Enum {
    readonly isForceAddCert: boolean;
    readonly asForceAddCert: {
      readonly issuer: u32;
      readonly receiver: u32;
      readonly verifyRules: bool;
    } & Struct;
    readonly isAddCert: boolean;
    readonly asAddCert: {
      readonly receiver: AccountId32;
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
    readonly type: 'ForceAddCert' | 'AddCert' | 'DelCert' | 'RemoveAllCertsReceivedBy';
  }

  /** @name CommonRuntimeEntitiesSmithsMembershipMetaData (166) */
  export interface CommonRuntimeEntitiesSmithsMembershipMetaData extends Struct {
    readonly ownerKey: AccountId32;
    readonly p2pEndpoint: Text;
    readonly sessionKeys: U8aFixed;
  }

  /** @name PalletCollectiveCall (168) */
  export interface PalletCollectiveCall extends Enum {
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
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: Compact<u64>;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'Close' | 'DisapproveProposal';
  }

  /** @name PalletAtomicSwapCall (169) */
  export interface PalletAtomicSwapCall extends Enum {
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

  /** @name PalletMultisigCall (170) */
  export interface PalletMultisigCall extends Enum {
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
      readonly call: WrapperKeepOpaque<Call>;
      readonly storeCall: bool;
      readonly maxWeight: u64;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: u64;
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

  /** @name PalletProvideRandomnessCall (173) */
  export interface PalletProvideRandomnessCall extends Enum {
    readonly isRequest: boolean;
    readonly asRequest: {
      readonly randomnessType: PalletProvideRandomnessRandomnessType;
      readonly salt: H256;
    } & Struct;
    readonly type: 'Request';
  }

  /** @name PalletProxyCall (174) */
  export interface PalletProxyCall extends Enum {
    readonly isProxy: boolean;
    readonly asProxy: {
      readonly real: AccountId32;
      readonly forceProxyType: Option<GdevRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly isAddProxy: boolean;
    readonly asAddProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxy: boolean;
    readonly asRemoveProxy: {
      readonly delegate: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxies: boolean;
    readonly isAnonymous: boolean;
    readonly asAnonymous: {
      readonly proxyType: GdevRuntimeProxyType;
      readonly delay: u32;
      readonly index: u16;
    } & Struct;
    readonly isKillAnonymous: boolean;
    readonly asKillAnonymous: {
      readonly spawner: AccountId32;
      readonly proxyType: GdevRuntimeProxyType;
      readonly index: u16;
      readonly height: Compact<u32>;
      readonly extIndex: Compact<u32>;
    } & Struct;
    readonly isAnnounce: boolean;
    readonly asAnnounce: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRemoveAnnouncement: boolean;
    readonly asRemoveAnnouncement: {
      readonly real: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isRejectAnnouncement: boolean;
    readonly asRejectAnnouncement: {
      readonly delegate: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAnnounced: boolean;
    readonly asProxyAnnounced: {
      readonly delegate: AccountId32;
      readonly real: AccountId32;
      readonly forceProxyType: Option<GdevRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly type: 'Proxy' | 'AddProxy' | 'RemoveProxy' | 'RemoveProxies' | 'Anonymous' | 'KillAnonymous' | 'Announce' | 'RemoveAnnouncement' | 'RejectAnnouncement' | 'ProxyAnnounced';
  }

  /** @name PalletUtilityCall (176) */
  export interface PalletUtilityCall extends Enum {
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
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs';
  }

  /** @name GdevRuntimeOriginCaller (178) */
  export interface GdevRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSystemRawOrigin;
    readonly isVoid: boolean;
    readonly isSmithsCollective: boolean;
    readonly asSmithsCollective: PalletCollectiveRawOrigin;
    readonly type: 'System' | 'Void' | 'SmithsCollective';
  }

  /** @name FrameSystemRawOrigin (179) */
  export interface FrameSystemRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (180) */
  export interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name PalletTreasuryCall (181) */
  export interface PalletTreasuryCall extends Enum {
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
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal';
  }

  /** @name PalletSchedulerError (182) */
  export interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (189) */
  export interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeError (190) */
  export interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletDuniterTestParametersParameters (191) */
  export interface PalletDuniterTestParametersParameters extends Struct {
    readonly babeEpochDuration: u64;
    readonly certPeriod: u32;
    readonly certMaxByIssuer: u32;
    readonly certMinReceivedCertToIssueCert: u32;
    readonly certRenewablePeriod: u32;
    readonly certValidityPeriod: u32;
    readonly idtyConfirmPeriod: u32;
    readonly idtyCreationPeriod: u32;
    readonly membershipPeriod: u32;
    readonly membershipRenewablePeriod: u32;
    readonly pendingMembershipPeriod: u32;
    readonly udCreationPeriod: u32;
    readonly udReevalPeriod: u32;
    readonly smithCertPeriod: u32;
    readonly smithCertMaxByIssuer: u32;
    readonly smithCertMinReceivedCertToIssueCert: u32;
    readonly smithCertRenewablePeriod: u32;
    readonly smithCertValidityPeriod: u32;
    readonly smithMembershipPeriod: u32;
    readonly smithMembershipRenewablePeriod: u32;
    readonly smithPendingMembershipPeriod: u32;
    readonly smithsWotFirstCertIssuableOn: u32;
    readonly smithsWotMinCertForMembership: u32;
    readonly wotFirstCertIssuableOn: u32;
    readonly wotMinCertForCreateIdtyRight: u32;
    readonly wotMinCertForMembership: u32;
  }

  /** @name PalletBalancesAccountData (192) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u64;
    readonly reserved: u64;
    readonly miscFrozen: u64;
    readonly feeFrozen: u64;
  }

  /** @name PalletBalancesBalanceLock (194) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u64;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (195) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (198) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u64;
  }

  /** @name PalletBalancesReleases (200) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesError (201) */
  export interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (204) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (206) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u64;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PalletAuthorityMembersMemberData (207) */
  export interface PalletAuthorityMembersMemberData extends Struct {
    readonly expireOnSession: u32;
    readonly mustRotateKeysBefore: u32;
    readonly ownerKey: AccountId32;
  }

  /** @name PalletAuthorityMembersError (208) */
  export interface PalletAuthorityMembersError extends Enum {
    readonly isAlreadyIncoming: boolean;
    readonly isAlreadyOnline: boolean;
    readonly isAlreadyOutgoing: boolean;
    readonly isMemberIdNotFound: boolean;
    readonly isMemberNotFound: boolean;
    readonly isNotOnlineNorIncoming: boolean;
    readonly isNotOwner: boolean;
    readonly isNotMember: boolean;
    readonly isSessionKeysNotProvided: boolean;
    readonly isTooManyAuthorities: boolean;
    readonly type: 'AlreadyIncoming' | 'AlreadyOnline' | 'AlreadyOutgoing' | 'MemberIdNotFound' | 'MemberNotFound' | 'NotOnlineNorIncoming' | 'NotOwner' | 'NotMember' | 'SessionKeysNotProvided' | 'TooManyAuthorities';
  }

  /** @name PalletAuthorshipUncleEntryItem (210) */
  export interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: 'InclusionHeight' | 'Uncle';
  }

  /** @name PalletAuthorshipError (211) */
  export interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type: 'InvalidUncleParent' | 'UnclesAlreadySet' | 'TooManyUncles' | 'GenesisUncle' | 'TooHighUncle' | 'UncleAlreadyIncluded' | 'OldUncle';
  }

  /** @name SpStakingOffenceOffenceDetails (212) */
  export interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name SpCoreCryptoKeyTypeId (217) */
  export interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (218) */
  export interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (219) */
  export interface PalletGrandpaStoredState extends Enum {
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

  /** @name PalletGrandpaStoredPendingChange (220) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (222) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletImOnlineBoundedOpaqueNetworkState (226) */
  export interface PalletImOnlineBoundedOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineError (231) */
  export interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name PalletSudoError (232) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletPreimageRequestStatus (233) */
  export interface PalletPreimageRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: Option<ITuple<[AccountId32, u64]>>;
    readonly isRequested: boolean;
    readonly asRequested: u32;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageError (237) */
  export interface PalletPreimageError extends Enum {
    readonly isTooLarge: boolean;
    readonly isAlreadyNoted: boolean;
    readonly isNotAuthorized: boolean;
    readonly isNotNoted: boolean;
    readonly isRequested: boolean;
    readonly isNotRequested: boolean;
    readonly type: 'TooLarge' | 'AlreadyNoted' | 'NotAuthorized' | 'NotNoted' | 'Requested' | 'NotRequested';
  }

  /** @name PalletIdentityIdtyValue (238) */
  export interface PalletIdentityIdtyValue extends Struct {
    readonly nextCreatableIdentityOn: u32;
    readonly ownerKey: AccountId32;
    readonly removableOn: u32;
    readonly status: PalletIdentityIdtyStatus;
  }

  /** @name PalletIdentityIdtyStatus (239) */
  export interface PalletIdentityIdtyStatus extends Enum {
    readonly isCreated: boolean;
    readonly isConfirmedByOwner: boolean;
    readonly isValidated: boolean;
    readonly type: 'Created' | 'ConfirmedByOwner' | 'Validated';
  }

  /** @name PalletIdentityError (242) */
  export interface PalletIdentityError extends Enum {
    readonly isInvalidGenesisHash: boolean;
    readonly isInvalidRevocationProof: boolean;
    readonly isCreatorNotAllowedToCreateIdty: boolean;
    readonly isIdtyAlreadyConfirmed: boolean;
    readonly isIdtyAlreadyCreated: boolean;
    readonly isIdtyAlreadyValidated: boolean;
    readonly isIdtyCreationNotAllowed: boolean;
    readonly isIdtyIndexNotFound: boolean;
    readonly isIdtyNameAlreadyExist: boolean;
    readonly isIdtyNameInvalid: boolean;
    readonly isIdtyNotConfirmedByOwner: boolean;
    readonly isIdtyNotFound: boolean;
    readonly isIdtyNotMember: boolean;
    readonly isIdtyNotValidated: boolean;
    readonly isIdtyNotYetRenewable: boolean;
    readonly isNotAllowedToConfirmIdty: boolean;
    readonly isNotAllowedToValidateIdty: boolean;
    readonly isNotSameIdtyName: boolean;
    readonly isRightAlreadyAdded: boolean;
    readonly isRightNotExist: boolean;
    readonly isNotRespectIdtyCreationPeriod: boolean;
    readonly type: 'InvalidGenesisHash' | 'InvalidRevocationProof' | 'CreatorNotAllowedToCreateIdty' | 'IdtyAlreadyConfirmed' | 'IdtyAlreadyCreated' | 'IdtyAlreadyValidated' | 'IdtyCreationNotAllowed' | 'IdtyIndexNotFound' | 'IdtyNameAlreadyExist' | 'IdtyNameInvalid' | 'IdtyNotConfirmedByOwner' | 'IdtyNotFound' | 'IdtyNotMember' | 'IdtyNotValidated' | 'IdtyNotYetRenewable' | 'NotAllowedToConfirmIdty' | 'NotAllowedToValidateIdty' | 'NotSameIdtyName' | 'RightAlreadyAdded' | 'RightNotExist' | 'NotRespectIdtyCreationPeriod';
  }

  /** @name SpMembershipMembershipData (243) */
  export interface SpMembershipMembershipData extends Struct {
    readonly expireOn: u32;
    readonly renewableOn: u32;
  }

  /** @name PalletMembershipError (244) */
  export interface PalletMembershipError extends Enum {
    readonly isIdtyNotAllowedToRequestMembership: boolean;
    readonly isIdtyNotAllowedToRenewMembership: boolean;
    readonly isInvalidMetaData: boolean;
    readonly isIdtyIdNotFound: boolean;
    readonly isMembershipAlreadyAcquired: boolean;
    readonly isMembershipAlreadyRequested: boolean;
    readonly isMembershipNotYetRenewable: boolean;
    readonly isMembershipNotFound: boolean;
    readonly isOriginNotAllowedToUseIdty: boolean;
    readonly isMembershipRequestNotFound: boolean;
    readonly isMembershipRevokedRecently: boolean;
    readonly type: 'IdtyNotAllowedToRequestMembership' | 'IdtyNotAllowedToRenewMembership' | 'InvalidMetaData' | 'IdtyIdNotFound' | 'MembershipAlreadyAcquired' | 'MembershipAlreadyRequested' | 'MembershipNotYetRenewable' | 'MembershipNotFound' | 'OriginNotAllowedToUseIdty' | 'MembershipRequestNotFound' | 'MembershipRevokedRecently';
  }

  /** @name PalletCertificationIdtyCertMeta (245) */
  export interface PalletCertificationIdtyCertMeta extends Struct {
    readonly issuedCount: u32;
    readonly nextIssuableOn: u32;
    readonly receivedCount: u32;
  }

  /** @name PalletCertificationCertValue (246) */
  export interface PalletCertificationCertValue extends Struct {
    readonly renewableOn: u32;
    readonly removableOn: u32;
  }

  /** @name PalletCertificationError (247) */
  export interface PalletCertificationError extends Enum {
    readonly isCannotCertifySelf: boolean;
    readonly isCertNotAllowed: boolean;
    readonly isIdtyMustReceiveCertsBeforeCanIssue: boolean;
    readonly isIssuedTooManyCert: boolean;
    readonly isIssuerNotFound: boolean;
    readonly isNotEnoughCertReceived: boolean;
    readonly isNotRespectCertPeriod: boolean;
    readonly isNotRespectRenewablePeriod: boolean;
    readonly isReceiverNotFound: boolean;
    readonly type: 'CannotCertifySelf' | 'CertNotAllowed' | 'IdtyMustReceiveCertsBeforeCanIssue' | 'IssuedTooManyCert' | 'IssuerNotFound' | 'NotEnoughCertReceived' | 'NotRespectCertPeriod' | 'NotRespectRenewablePeriod' | 'ReceiverNotFound';
  }

  /** @name PalletCollectiveVotes (251) */
  export interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (252) */
  export interface PalletCollectiveError extends Enum {
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
    readonly type: 'NotMember' | 'DuplicateProposal' | 'ProposalMissing' | 'WrongIndex' | 'DuplicateVote' | 'AlreadyInitialized' | 'TooEarly' | 'TooManyProposals' | 'WrongProposalWeight' | 'WrongProposalLength';
  }

  /** @name PalletAtomicSwapError (254) */
  export interface PalletAtomicSwapError extends Enum {
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

  /** @name PalletMultisigMultisig (255) */
  export interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u64;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (257) */
  export interface PalletMultisigError extends Enum {
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

  /** @name PalletProvideRandomnessRequest (259) */
  export interface PalletProvideRandomnessRequest extends Struct {
    readonly requestId: u64;
    readonly salt: H256;
  }

  /** @name PalletProvideRandomnessError (260) */
  export interface PalletProvideRandomnessError extends Enum {
    readonly isFullQueue: boolean;
    readonly type: 'FullQueue';
  }

  /** @name PalletProxyProxyDefinition (263) */
  export interface PalletProxyProxyDefinition extends Struct {
    readonly delegate: AccountId32;
    readonly proxyType: GdevRuntimeProxyType;
    readonly delay: u32;
  }

  /** @name PalletProxyAnnouncement (267) */
  export interface PalletProxyAnnouncement extends Struct {
    readonly real: AccountId32;
    readonly callHash: H256;
    readonly height: u32;
  }

  /** @name PalletProxyError (269) */
  export interface PalletProxyError extends Enum {
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

  /** @name PalletUtilityError (270) */
  export interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletTreasuryProposal (271) */
  export interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u64;
    readonly beneficiary: AccountId32;
    readonly bond: u64;
  }

  /** @name FrameSupportPalletId (274) */
  export interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletTreasuryError (275) */
  export interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals';
  }

  /** @name FrameSystemExtensionsCheckNonZeroSender (278) */
  export type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (279) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (280) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (281) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (284) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (285) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (286) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u64> {}

  /** @name GdevRuntimeRuntime (287) */
  export type GdevRuntimeRuntime = Null;

} // declare module
