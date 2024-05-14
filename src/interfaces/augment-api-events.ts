// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, u16, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    account: {
      /**
       * account linked to identity
       **/
      AccountLinked: AugmentedEvent<ApiType, [who: AccountId32, identity: u32], { who: AccountId32; identity: u32 }>;
      /**
       * The account was unlinked from its identity.
       **/
      AccountUnlinked: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    atomicSwap: {
      /**
       * Swap created.
       **/
      NewSwap: AugmentedEvent<
        ApiType,
        [account: AccountId32, proof: U8aFixed, swap: PalletAtomicSwapPendingSwap],
        { account: AccountId32; proof: U8aFixed; swap: PalletAtomicSwapPendingSwap }
      >;
      /**
       * Swap cancelled.
       **/
      SwapCancelled: AugmentedEvent<ApiType, [account: AccountId32, proof: U8aFixed], { account: AccountId32; proof: U8aFixed }>;
      /**
       * Swap claimed. The last parameter indicates whether the execution succeeds.
       **/
      SwapClaimed: AugmentedEvent<
        ApiType,
        [account: AccountId32, proof: U8aFixed, success: bool],
        { account: AccountId32; proof: U8aFixed; success: bool }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    authorityMembers: {
      /**
       * List of members scheduled to join the set of authorities in the next session.
       **/
      IncomingAuthorities: AugmentedEvent<ApiType, [members: Vec<u32>], { members: Vec<u32> }>;
      /**
       * A member has been blacklisted.
       **/
      MemberAddedToBlacklist: AugmentedEvent<ApiType, [member: u32], { member: u32 }>;
      /**
       * A member will leave the set of authorities in 2 sessions.
       **/
      MemberGoOffline: AugmentedEvent<ApiType, [member: u32], { member: u32 }>;
      /**
       * A member will join the set of authorities in 2 sessions.
       **/
      MemberGoOnline: AugmentedEvent<ApiType, [member: u32], { member: u32 }>;
      /**
       * A member, who no longer has authority rights, will be removed from the authority set in 2 sessions.
       **/
      MemberRemoved: AugmentedEvent<ApiType, [member: u32], { member: u32 }>;
      /**
       * A member has been removed from the blacklist.
       **/
      MemberRemovedFromBlacklist: AugmentedEvent<ApiType, [member: u32], { member: u32 }>;
      /**
       * List of members leaving the set of authorities in the next session.
       **/
      OutgoingAuthorities: AugmentedEvent<ApiType, [members: Vec<u32>], { members: Vec<u32> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u64], { who: AccountId32; free: u64 }>;
      /**
       * Some amount was burned from an account.
       **/
      Burned: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u64], { account: AccountId32; amount: u64 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u64], { account: AccountId32; freeBalance: u64 }>;
      /**
       * Some balance was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Total issuance was increased by `amount`, creating a credit to be balanced.
       **/
      Issued: AugmentedEvent<ApiType, [amount: u64], { amount: u64 }>;
      /**
       * Some balance was locked.
       **/
      Locked: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some amount was minted into an account.
       **/
      Minted: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Total issuance was decreased by `amount`, creating a debt to be balanced.
       **/
      Rescinded: AugmentedEvent<ApiType, [amount: u64], { amount: u64 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<
        ApiType,
        [from: AccountId32, to: AccountId32, amount: u64, destinationStatus: FrameSupportTokensMiscBalanceStatus],
        { from: AccountId32; to: AccountId32; amount: u64; destinationStatus: FrameSupportTokensMiscBalanceStatus }
      >;
      /**
       * Some amount was restored into an account.
       **/
      Restored: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some amount was suspended from an account (it can be restored later).
       **/
      Suspended: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some balance was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u64], { from: AccountId32; to: AccountId32; amount: u64 }>;
      /**
       * Some balance was unlocked.
       **/
      Unlocked: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * An account was upgraded.
       **/
      Upgraded: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32; amount: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    certification: {
      /**
       * A new certification was added.
       **/
      CertAdded: AugmentedEvent<ApiType, [issuer: u32, receiver: u32], { issuer: u32; receiver: u32 }>;
      /**
       * A certification was removed.
       **/
      CertRemoved: AugmentedEvent<ApiType, [issuer: u32, receiver: u32, expiration: bool], { issuer: u32; receiver: u32; expiration: bool }>;
      /**
       * A certification was renewed.
       **/
      CertRenewed: AugmentedEvent<ApiType, [issuer: u32, receiver: u32], { issuer: u32; receiver: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    distance: {
      /**
       * Distance rule was found invalid.
       **/
      EvaluatedInvalid: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * Distance rule was found valid.
       **/
      EvaluatedValid: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * A distance evaluation was requested.
       **/
      EvaluationRequested: AugmentedEvent<ApiType, [idtyIndex: u32, who: AccountId32], { idtyIndex: u32; who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<
        ApiType,
        [authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>],
        { authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>> }
      >;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    identity: {
      IdtyChangedOwnerKey: AugmentedEvent<ApiType, [idtyIndex: u32, newOwnerKey: AccountId32], { idtyIndex: u32; newOwnerKey: AccountId32 }>;
      /**
       * An identity has been confirmed by its owner.
       **/
      IdtyConfirmed: AugmentedEvent<
        ApiType,
        [idtyIndex: u32, ownerKey: AccountId32, name: Bytes],
        { idtyIndex: u32; ownerKey: AccountId32; name: Bytes }
      >;
      /**
       * A new identity has been created.
       **/
      IdtyCreated: AugmentedEvent<ApiType, [idtyIndex: u32, ownerKey: AccountId32], { idtyIndex: u32; ownerKey: AccountId32 }>;
      /**
       * An identity has been removed.
       **/
      IdtyRemoved: AugmentedEvent<
        ApiType,
        [idtyIndex: u32, reason: PalletIdentityRemovalReason],
        { idtyIndex: u32; reason: PalletIdentityRemovalReason }
      >;
      /**
       * An identity has been revoked.
       **/
      IdtyRevoked: AugmentedEvent<
        ApiType,
        [idtyIndex: u32, reason: PalletIdentityRevocationReason],
        { idtyIndex: u32; reason: PalletIdentityRevocationReason }
      >;
      /**
       * An identity has been validated.
       **/
      IdtyValidated: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    imOnline: {
      /**
       * At the end of the session, no offence was committed.
       **/
      AllGood: AugmentedEvent<ApiType, []>;
      /**
       * A new heartbeat was received from `AuthorityId`.
       **/
      HeartbeatReceived: AugmentedEvent<
        ApiType,
        [authorityId: PalletImOnlineSr25519AppSr25519Public],
        { authorityId: PalletImOnlineSr25519AppSr25519Public }
      >;
      /**
       * At the end of the session, at least one validator was found to be offline.
       **/
      SomeOffline: AugmentedEvent<
        ApiType,
        [offline: Vec<ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>>],
        { offline: Vec<ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>> }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    membership: {
      /**
       * A membership was added.
       **/
      MembershipAdded: AugmentedEvent<ApiType, [member: u32, expireOn: u32], { member: u32; expireOn: u32 }>;
      /**
       * A membership was removed.
       **/
      MembershipRemoved: AugmentedEvent<
        ApiType,
        [member: u32, reason: PalletMembershipMembershipRemovalReason],
        { member: u32; reason: PalletMembershipMembershipRemovalReason }
      >;
      /**
       * A membership was renewed.
       **/
      MembershipRenewed: AugmentedEvent<ApiType, [member: u32, expireOn: u32], { member: u32; expireOn: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<
        ApiType,
        [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed],
        { approving: AccountId32; timepoint: PalletMultisigTimepoint; multisig: AccountId32; callHash: U8aFixed }
      >;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<
        ApiType,
        [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed],
        { cancelling: AccountId32; timepoint: PalletMultisigTimepoint; multisig: AccountId32; callHash: U8aFixed }
      >;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<
        ApiType,
        [
          approving: AccountId32,
          timepoint: PalletMultisigTimepoint,
          multisig: AccountId32,
          callHash: U8aFixed,
          result: Result<Null, SpRuntimeDispatchError>,
        ],
        {
          approving: AccountId32;
          timepoint: PalletMultisigTimepoint;
          multisig: AccountId32;
          callHash: U8aFixed;
          result: Result<Null, SpRuntimeDispatchError>;
        }
      >;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<
        ApiType,
        [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed],
        { approving: AccountId32; multisig: AccountId32; callHash: U8aFixed }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    offences: {
      /**
       * An offense was reported during the specified time slot. This event is not deposited for duplicate slashes.
       **/
      Offence: AugmentedEvent<ApiType, [kind: U8aFixed, timeslot: Bytes], { kind: U8aFixed; timeslot: Bytes }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    oneshotAccount: {
      /**
       * A oneshot account was consumed.
       **/
      OneshotAccountConsumed: AugmentedEvent<
        ApiType,
        [account: AccountId32, dest1: ITuple<[AccountId32, u64]>, dest2: Option<ITuple<[AccountId32, u64]>>],
        { account: AccountId32; dest1: ITuple<[AccountId32, u64]>; dest2: Option<ITuple<[AccountId32, u64]>> }
      >;
      /**
       * A oneshot account was created.
       **/
      OneshotAccountCreated: AugmentedEvent<
        ApiType,
        [account: AccountId32, balance: u64, creator: AccountId32],
        { account: AccountId32; balance: u64; creator: AccountId32 }
      >;
      /**
       * A withdrawal was executed on a oneshot account.
       **/
      Withdraw: AugmentedEvent<ApiType, [account: AccountId32, balance: u64], { account: AccountId32; balance: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    provideRandomness: {
      /**
       * A request for randomness was fulfilled.
       **/
      FilledRandomness: AugmentedEvent<ApiType, [requestId: u64, randomness: H256], { requestId: u64; randomness: H256 }>;
      /**
       * A request for randomness was made.
       **/
      RequestedRandomness: AugmentedEvent<
        ApiType,
        [requestId: u64, salt: H256, r_type: PalletProvideRandomnessRandomnessType],
        { requestId: u64; salt: H256; r_type: PalletProvideRandomnessRandomnessType }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      /**
       * An announcement was placed to make a call in the future.
       **/
      Announced: AugmentedEvent<
        ApiType,
        [real: AccountId32, proxy: AccountId32, callHash: H256],
        { real: AccountId32; proxy: AccountId32; callHash: H256 }
      >;
      /**
       * A proxy was added.
       **/
      ProxyAdded: AugmentedEvent<
        ApiType,
        [delegator: AccountId32, delegatee: AccountId32, proxyType: GdevRuntimeProxyType, delay: u32],
        { delegator: AccountId32; delegatee: AccountId32; proxyType: GdevRuntimeProxyType; delay: u32 }
      >;
      /**
       * A proxy was executed correctly, with the given.
       **/
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A proxy was removed.
       **/
      ProxyRemoved: AugmentedEvent<
        ApiType,
        [delegator: AccountId32, delegatee: AccountId32, proxyType: GdevRuntimeProxyType, delay: u32],
        { delegator: AccountId32; delegatee: AccountId32; proxyType: GdevRuntimeProxyType; delay: u32 }
      >;
      /**
       * A pure account has been created by new proxy with given
       * disambiguation index and proxy type.
       **/
      PureCreated: AugmentedEvent<
        ApiType,
        [pure: AccountId32, who: AccountId32, proxyType: GdevRuntimeProxyType, disambiguationIndex: u16],
        { pure: AccountId32; who: AccountId32; proxyType: GdevRuntimeProxyType; disambiguationIndex: u16 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    quota: {
      /**
       * No more currency available for refund.
       * This scenario should never occur if the fees are intended for the refund account.
       **/
      NoMoreCurrencyForRefund: AugmentedEvent<ApiType, []>;
      /**
       * No more quota available for refund.
       **/
      NoQuotaForIdty: AugmentedEvent<ApiType, [u32]>;
      /**
       * Transaction fees were refunded.
       **/
      Refunded: AugmentedEvent<ApiType, [who: AccountId32, identity: u32, amount: u64], { who: AccountId32; identity: u32; amount: u64 }>;
      /**
       * The refund has failed.
       * This scenario should rarely occur, except when the account was destroyed in the interim between the request and the refund.
       **/
      RefundFailed: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Refund queue was full.
       **/
      RefundQueueFull: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallUnavailable: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>; id: Option<U8aFixed> }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32; index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<
        ApiType,
        [task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError>],
        { task: ITuple<[u32, u32]>; id: Option<U8aFixed>; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * The given task was unable to be renewed since the agenda is full at that block.
       **/
      PeriodicFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>; id: Option<U8aFixed> }>;
      /**
       * The given task can never be executed since it is overweight.
       **/
      PermanentlyOverweight: AugmentedEvent<
        ApiType,
        [task: ITuple<[u32, u32]>, id: Option<U8aFixed>],
        { task: ITuple<[u32, u32]>; id: Option<U8aFixed> }
      >;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32; index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    smithMembers: {
      /**
       * The invitation has been accepted.
       **/
      InvitationAccepted: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * An identity is being inivited to become a smith.
       **/
      InvitationSent: AugmentedEvent<ApiType, [receiver: u32, issuer: u32], { receiver: u32; issuer: u32 }>;
      /**
       * Certification received
       **/
      SmithCertAdded: AugmentedEvent<ApiType, [receiver: u32, issuer: u32], { receiver: u32; issuer: u32 }>;
      /**
       * Certification lost
       **/
      SmithCertRemoved: AugmentedEvent<ApiType, [receiver: u32, issuer: u32], { receiver: u32; issuer: u32 }>;
      /**
       * A smith gathered enough certifications to become an authority (can call `go_online()`).
       **/
      SmithMembershipAdded: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * A smith has been removed from the smiths set.
       **/
      SmithMembershipRemoved: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The sudo key has been updated.
       **/
      KeyChanged: AugmentedEvent<ApiType, [old: Option<AccountId32>, new_: AccountId32], { old: Option<AccountId32>; new_: AccountId32 }>;
      /**
       * The key was permanently removed.
       **/
      KeyRemoved: AugmentedEvent<ApiType, []>;
      /**
       * A sudo call just took place.
       **/
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A [sudo_as](Pallet::sudo_as) call just took place.
       **/
      SudoAsDone: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<
        ApiType,
        [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo],
        { dispatchError: SpRuntimeDispatchError; dispatchInfo: FrameSupportDispatchDispatchInfo }
      >;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32; hash_: H256 }>;
      /**
       * An upgrade was authorized.
       **/
      UpgradeAuthorized: AugmentedEvent<ApiType, [codeHash: H256, checkVersion: bool], { codeHash: H256; checkVersion: bool }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256; yes: u32; no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<
        ApiType,
        [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>],
        { proposalHash: H256; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<
        ApiType,
        [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>],
        { proposalHash: H256; result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<
        ApiType,
        [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32],
        { account: AccountId32; proposalIndex: u32; proposalHash: H256; threshold: u32 }
      >;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<
        ApiType,
        [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32],
        { account: AccountId32; proposalHash: H256; voted: bool; yes: u32; no: u32 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u64, tip: u64], { who: AccountId32; actualFee: u64; tip: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * A new asset spend proposal has been approved.
       **/
      AssetSpendApproved: AugmentedEvent<
        ApiType,
        [index: u32, assetKind: Null, amount: u64, beneficiary: AccountId32, validFrom: u32, expireAt: u32],
        { index: u32; assetKind: Null; amount: u64; beneficiary: AccountId32; validFrom: u32; expireAt: u32 }
      >;
      /**
       * An approved spend was voided.
       **/
      AssetSpendVoided: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, award: u64, account: AccountId32],
        { proposalIndex: u32; award: u64; account: AccountId32 }
      >;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u64], { burntFunds: u64 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u64], { value: u64 }>;
      /**
       * A payment happened.
       **/
      Paid: AugmentedEvent<ApiType, [index: u32, paymentId: Null], { index: u32; paymentId: Null }>;
      /**
       * A payment failed and can be retried.
       **/
      PaymentFailed: AugmentedEvent<ApiType, [index: u32, paymentId: Null], { index: u32; paymentId: Null }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u64], { proposalIndex: u32; slashed: u64 }>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u64], { rolloverBalance: u64 }>;
      /**
       * A new spend proposal has been approved.
       **/
      SpendApproved: AugmentedEvent<
        ApiType,
        [proposalIndex: u32, amount: u64, beneficiary: AccountId32],
        { proposalIndex: u32; amount: u64; beneficiary: AccountId32 }
      >;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u64], { budgetRemaining: u64 }>;
      /**
       * A spend was processed and removed from the storage. It might have been successfully
       * paid or it may have expired.
       **/
      SpendProcessed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * The inactive funds of the pallet have been updated.
       **/
      UpdatedInactive: AugmentedEvent<ApiType, [reactivated: u64, deactivated: u64], { reactivated: u64; deactivated: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    universalDividend: {
      /**
       * A new universal dividend is created.
       **/
      NewUdCreated: AugmentedEvent<
        ApiType,
        [amount: u64, index: u16, monetaryMass: u64, membersCount: u64],
        { amount: u64; index: u16; monetaryMass: u64; membersCount: u64 }
      >;
      /**
       * The universal dividend has been re-evaluated.
       **/
      UdReevalued: AugmentedEvent<
        ApiType,
        [newUdAmount: u64, monetaryMass: u64, membersCount: u64],
        { newUdAmount: u64; monetaryMass: u64; membersCount: u64 }
      >;
      /**
       * DUs were automatically transferred as part of a member removal.
       **/
      UdsAutoPaid: AugmentedEvent<ApiType, [count: u16, total: u64, who: AccountId32], { count: u16; total: u64; who: AccountId32 }>;
      /**
       * A member claimed his UDs.
       **/
      UdsClaimed: AugmentedEvent<ApiType, [count: u16, total: u64, who: AccountId32], { count: u16; total: u64; who: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    upgradeOrigin: {
      /**
       * A call was dispatched as root from an upgradable origin
       **/
      DispatchedAsRoot: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32; error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
