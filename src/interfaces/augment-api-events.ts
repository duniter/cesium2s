// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, Text, U8aFixed, Vec, bool, u16, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { CommonRuntimeEntitiesValidatorFullIdentification, FrameSupportScheduleLookupError, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, GdevRuntimeProxyType, PalletAtomicSwapPendingSwap, PalletImOnlineSr25519AppSr25519Public, PalletMultisigTimepoint, PalletProvideRandomnessRandomnessType, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

declare module '@polkadot/api-base/types/events' {
  export interface AugmentedEvents<ApiType extends ApiTypes> {
    account: {
      /**
       * Force the destruction of an account because its free balance is insufficient to pay
       * the account creation price.
       * [who, balance]
       **/
      ForceDestroy: AugmentedEvent<ApiType, [who: AccountId32, balance: u64], { who: AccountId32, balance: u64 }>;
      /**
       * Random id assigned
       * [account_id, random_id]
       **/
      RandomIdAssigned: AugmentedEvent<ApiType, [who: AccountId32, randomId: H256], { who: AccountId32, randomId: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    atomicSwap: {
      /**
       * Swap created.
       **/
      NewSwap: AugmentedEvent<ApiType, [account: AccountId32, proof: U8aFixed, swap: PalletAtomicSwapPendingSwap], { account: AccountId32, proof: U8aFixed, swap: PalletAtomicSwapPendingSwap }>;
      /**
       * Swap cancelled.
       **/
      SwapCancelled: AugmentedEvent<ApiType, [account: AccountId32, proof: U8aFixed], { account: AccountId32, proof: U8aFixed }>;
      /**
       * Swap claimed. The last parameter indicates whether the execution succeeds.
       **/
      SwapClaimed: AugmentedEvent<ApiType, [account: AccountId32, proof: U8aFixed, success: bool], { account: AccountId32, proof: U8aFixed, success: bool }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    authorityMembers: {
      /**
       * List of members who will enter the set of authorities at the next session.
       * [Vec<member_id>]
       **/
      IncomingAuthorities: AugmentedEvent<ApiType, [Vec<u32>]>;
      /**
       * A member will leave the set of authorities in 2 sessions.
       * [member_id]
       **/
      MemberGoOffline: AugmentedEvent<ApiType, [u32]>;
      /**
       * A member will enter the set of authorities in 2 sessions.
       * [member_id]
       **/
      MemberGoOnline: AugmentedEvent<ApiType, [u32]>;
      /**
       * A member has lost the right to be part of the authorities,
       * this member will be removed from the authority set in 2 sessions.
       * [member_id]
       **/
      MemberRemoved: AugmentedEvent<ApiType, [u32]>;
      /**
       * List of members who will leave the set of authorities at the next session.
       * [Vec<member_id>]
       **/
      OutgoingAuthorities: AugmentedEvent<ApiType, [Vec<u32>]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u64, reserved: u64], { who: AccountId32, free: u64, reserved: u64 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32, amount: u64 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u64], { account: AccountId32, amount: u64 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u64], { account: AccountId32, freeBalance: u64 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32, amount: u64 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u64, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u64, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32, amount: u64 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u64], { from: AccountId32, to: AccountId32, amount: u64 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32, amount: u64 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u64], { who: AccountId32, amount: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cert: {
      /**
       * New certification
       * [issuer, issuer_issued_count, receiver, receiver_received_count]
       **/
      NewCert: AugmentedEvent<ApiType, [issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32], { issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32 }>;
      /**
       * Removed certification
       * [issuer, issuer_issued_count, receiver, receiver_received_count, expiration]
       **/
      RemovedCert: AugmentedEvent<ApiType, [issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32, expiration: bool], { issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32, expiration: bool }>;
      /**
       * Renewed certification
       * [issuer, receiver]
       **/
      RenewedCert: AugmentedEvent<ApiType, [issuer: u32, receiver: u32], { issuer: u32, receiver: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<ApiType, [authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>], { authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>> }>;
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
      /**
       * An identity has been confirmed by its owner
       * [idty_index, owner_key, name]
       **/
      IdtyConfirmed: AugmentedEvent<ApiType, [idtyIndex: u32, ownerKey: AccountId32, name: Text], { idtyIndex: u32, ownerKey: AccountId32, name: Text }>;
      /**
       * A new identity has been created
       * [idty_index, owner_key]
       **/
      IdtyCreated: AugmentedEvent<ApiType, [idtyIndex: u32, ownerKey: AccountId32], { idtyIndex: u32, ownerKey: AccountId32 }>;
      /**
       * An identity has been removed
       * [idty_index]
       **/
      IdtyRemoved: AugmentedEvent<ApiType, [idtyIndex: u32], { idtyIndex: u32 }>;
      /**
       * An identity has been validated
       * [idty_index]
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
      HeartbeatReceived: AugmentedEvent<ApiType, [authorityId: PalletImOnlineSr25519AppSr25519Public], { authorityId: PalletImOnlineSr25519AppSr25519Public }>;
      /**
       * At the end of the session, at least one validator was found to be offline.
       **/
      SomeOffline: AugmentedEvent<ApiType, [offline: Vec<ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>>], { offline: Vec<ITuple<[AccountId32, CommonRuntimeEntitiesValidatorFullIdentification]>> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    membership: {
      /**
       * A membership has acquired
       * [idty_id]
       **/
      MembershipAcquired: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has expired
       * [idty_id]
       **/
      MembershipExpired: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has renewed
       * [idty_id]
       **/
      MembershipRenewed: AugmentedEvent<ApiType, [u32]>;
      /**
       * An identity requested membership
       * [idty_id]
       **/
      MembershipRequested: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has revoked
       * [idty_id]
       **/
      MembershipRevoked: AugmentedEvent<ApiType, [u32]>;
      /**
       * A pending membership request has expired
       * [idty_id]
       **/
      PendingMembershipExpired: AugmentedEvent<ApiType, [u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    offences: {
      /**
       * There is an offence reported of the given `kind` happened at the `session_index` and
       * (kind-specific) time slot. This event is not deposited for duplicate slashes.
       * \[kind, timeslot\].
       **/
      Offence: AugmentedEvent<ApiType, [kind: U8aFixed, timeslot: Bytes], { kind: U8aFixed, timeslot: Bytes }>;
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
       * Filled randomness
       **/
      FilledRandomness: AugmentedEvent<ApiType, [requestId: u64, randomness: H256], { requestId: u64, randomness: H256 }>;
      /**
       * Requested randomness
       **/
      RequestedRandomness: AugmentedEvent<ApiType, [requestId: u64, salt: H256, r_type: PalletProvideRandomnessRandomnessType], { requestId: u64, salt: H256, r_type: PalletProvideRandomnessRandomnessType }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      /**
       * An announcement was placed to make a call in the future.
       **/
      Announced: AugmentedEvent<ApiType, [real: AccountId32, proxy: AccountId32, callHash: H256], { real: AccountId32, proxy: AccountId32, callHash: H256 }>;
      /**
       * Anonymous account has been created by new proxy with given
       * disambiguation index and proxy type.
       **/
      AnonymousCreated: AugmentedEvent<ApiType, [anonymous: AccountId32, who: AccountId32, proxyType: GdevRuntimeProxyType, disambiguationIndex: u16], { anonymous: AccountId32, who: AccountId32, proxyType: GdevRuntimeProxyType, disambiguationIndex: u16 }>;
      /**
       * A proxy was added.
       **/
      ProxyAdded: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: GdevRuntimeProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: GdevRuntimeProxyType, delay: u32 }>;
      /**
       * A proxy was executed correctly, with the given.
       **/
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallLookupFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError], { task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
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
    smithsCert: {
      /**
       * New certification
       * [issuer, issuer_issued_count, receiver, receiver_received_count]
       **/
      NewCert: AugmentedEvent<ApiType, [issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32], { issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32 }>;
      /**
       * Removed certification
       * [issuer, issuer_issued_count, receiver, receiver_received_count, expiration]
       **/
      RemovedCert: AugmentedEvent<ApiType, [issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32, expiration: bool], { issuer: u32, issuerIssuedCount: u32, receiver: u32, receiverReceivedCount: u32, expiration: bool }>;
      /**
       * Renewed certification
       * [issuer, receiver]
       **/
      RenewedCert: AugmentedEvent<ApiType, [issuer: u32, receiver: u32], { issuer: u32, receiver: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    smithsCollective: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    smithsMembership: {
      /**
       * A membership has acquired
       * [idty_id]
       **/
      MembershipAcquired: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has expired
       * [idty_id]
       **/
      MembershipExpired: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has renewed
       * [idty_id]
       **/
      MembershipRenewed: AugmentedEvent<ApiType, [u32]>;
      /**
       * An identity requested membership
       * [idty_id]
       **/
      MembershipRequested: AugmentedEvent<ApiType, [u32]>;
      /**
       * A membership has revoked
       * [idty_id]
       **/
      MembershipRevoked: AugmentedEvent<ApiType, [u32]>;
      /**
       * A pending membership request has expired
       * [idty_id]
       **/
      PendingMembershipExpired: AugmentedEvent<ApiType, [u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<ApiType, [oldSudoer: Option<AccountId32>], { oldSudoer: Option<AccountId32> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A sudo just took place. \[result\]
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
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchInfo: FrameSupportWeightsDispatchInfo }>;
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
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<ApiType, [proposalIndex: u32, award: u64, account: AccountId32], { proposalIndex: u32, award: u64, account: AccountId32 }>;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u64], { burntFunds: u64 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u64], { value: u64 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u64], { proposalIndex: u32, slashed: u64 }>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u64], { rolloverBalance: u64 }>;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u64], { budgetRemaining: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    universalDividend: {
      /**
       * A new universal dividend is created
       * [amout, members_count]
       **/
      NewUdCreated: AugmentedEvent<ApiType, [amount: u64, monetaryMass: u64, membersCount: u64], { amount: u64, monetaryMass: u64, membersCount: u64 }>;
      /**
       * The universal dividend has been re-evaluated
       * [new_ud_amount, monetary_mass, members_count]
       **/
      UdReevalued: AugmentedEvent<ApiType, [newUdAmount: u64, monetaryMass: u64, membersCount: u64], { newUdAmount: u64, monetaryMass: u64, membersCount: u64 }>;
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
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
