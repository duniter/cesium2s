// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Null, Option, U8aFixed, Vec, bool, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    account: {
      /**
       * unlink the identity associated with the account
       **/
      unlinkIdentity: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    atomicSwap: {
      /**
       * Cancel an atomic swap. Only possible after the originally set duration has passed.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `target`: Target of the original atomic swap.
       * - `hashed_proof`: Hashed proof of the original atomic swap.
       **/
      cancelSwap: AugmentedSubmittable<
        (target: AccountId32 | string | Uint8Array, hashedProof: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [AccountId32, U8aFixed]
      >;
      /**
       * Claim an atomic swap.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `proof`: Revealed proof of the claim.
       * - `action`: Action defined in the swap, it must match the entry in blockchain. Otherwise
       * the operation fails. This is used for weight calculation.
       **/
      claimSwap: AugmentedSubmittable<
        (
          proof: Bytes | string | Uint8Array,
          action: PalletAtomicSwapBalanceSwapAction | { value?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Bytes, PalletAtomicSwapBalanceSwapAction]
      >;
      /**
       * Register a new atomic swap, declaring an intention to send funds from origin to target
       * on the current blockchain. The target can claim the fund using the revealed proof. If
       * the fund is not claimed after `duration` blocks, then the sender can cancel the swap.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `target`: Receiver of the atomic swap.
       * - `hashed_proof`: The blake2_256 hash of the secret proof.
       * - `balance`: Funds to be sent from origin.
       * - `duration`: Locked duration of the atomic swap. For safety reasons, it is recommended
       * that the revealer uses a shorter duration than the counterparty, to prevent the
       * situation where the revealer reveals the proof too late around the end block.
       **/
      createSwap: AugmentedSubmittable<
        (
          target: AccountId32 | string | Uint8Array,
          hashedProof: U8aFixed | string | Uint8Array,
          action: PalletAtomicSwapBalanceSwapAction | { value?: any } | string | Uint8Array,
          duration: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AccountId32, U8aFixed, PalletAtomicSwapBalanceSwapAction, u32]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    authorityMembers: {
      /**
       * ask to leave the set of validators two sessions after
       **/
      goOffline: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * ask to join the set of validators two sessions after
       **/
      goOnline: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * remove an identity from the set of authorities
       **/
      removeMember: AugmentedSubmittable<(memberId: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * remove an identity from the blacklist
       **/
      removeMemberFromBlacklist: AugmentedSubmittable<(memberId: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * declare new session keys to replace current ones
       **/
      setSessionKeys: AugmentedSubmittable<
        (
          keys: GdevRuntimeOpaqueSessionKeys | { grandpa?: any; babe?: any; imOnline?: any; authorityDiscovery?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GdevRuntimeOpaqueSessionKeys]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    babe: {
      /**
       * Plan an epoch config change. The epoch config change is recorded and will be enacted on
       * the next call to `enact_epoch_change`. The config will be activated one epoch after.
       * Multiple calls to this method will replace any existing planned config change that had
       * not been enacted yet.
       **/
      planConfigChange: AugmentedSubmittable<
        (config: SpConsensusBabeDigestsNextConfigDescriptor | { V1: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [SpConsensusBabeDigestsNextConfigDescriptor]
      >;
      /**
       * Report authority equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       **/
      reportEquivocation: AugmentedSubmittable<
        (
          equivocationProof:
            | SpConsensusSlotsEquivocationProof
            | { offender?: any; slot?: any; firstHeader?: any; secondHeader?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusSlotsEquivocationProof, SpSessionMembershipProof]
      >;
      /**
       * Report authority equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<
        (
          equivocationProof:
            | SpConsensusSlotsEquivocationProof
            | { offender?: any; slot?: any; firstHeader?: any; secondHeader?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusSlotsEquivocationProof, SpSessionMembershipProof]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    balances: {
      /**
       * Adjust the total issuance in a saturating way.
       *
       * Can only be called by root and always needs a positive `delta`.
       *
       * # Example
       **/
      forceAdjustTotalIssuance: AugmentedSubmittable<
        (
          direction: PalletBalancesAdjustmentDirection | 'Increase' | 'Decrease' | number | Uint8Array,
          delta: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PalletBalancesAdjustmentDirection, Compact<u64>]
      >;
      /**
       * Upgrade a specified account.
       *
       * - `origin`: Must be `Signed`.
       * - `who`: The account to be upgraded.
       *
       * This will waive the transaction fee if at least all but 10% of the accounts needed to
       * be upgraded. (We let some not have to be upgraded just in order to allow for the
       * possibililty of churn).
       * Set the regular balance of a given account.
       *
       * The dispatch origin for this call is `root`.
       **/
      forceSetBalance: AugmentedSubmittable<
        (
          who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          newFree: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Exactly as `transfer_allow_death`, except the origin must be root and the source account
       * may be specified.
       **/
      forceTransfer: AugmentedSubmittable<
        (
          source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, MultiAddress, Compact<u64>]
      >;
      /**
       * Unreserve some balance from a user by force.
       *
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<
        (
          who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          amount: u64 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, u64]
      >;
      /**
       * Transfer the entire transferable balance from the caller account.
       *
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       *
       * The dispatch origin of this call must be Signed.
       *
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true).
       **/
      transferAll: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          keepAlive: bool | boolean | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, bool]
      >;
      /**
       * Transfer some liquid free balance to another account.
       *
       * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       *
       * The dispatch origin for this call must be `Signed` by the transactor.
       **/
      transferAllowDeath: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
       * kill the origin account.
       *
       * 99% of the time you want [`transfer_allow_death`] instead.
       *
       * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    certification: {
      /**
       * Add a new certification.
       **/
      addCert: AugmentedSubmittable<(receiver: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * remove a certification (only root)
       **/
      delCert: AugmentedSubmittable<
        (issuer: u32 | AnyNumber | Uint8Array, receiver: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * remove all certifications received by an identity (only root)
       **/
      removeAllCertsReceivedBy: AugmentedSubmittable<(idtyIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Renew an existing certification.
       **/
      renewCert: AugmentedSubmittable<(receiver: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    distance: {
      /**
       * Force push an evaluation result to the pool
       **/
      forceUpdateEvaluation: AugmentedSubmittable<
        (
          evaluator: AccountId32 | string | Uint8Array,
          computationResult: SpDistanceComputationResult | { distances?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AccountId32, SpDistanceComputationResult]
      >;
      /**
       * Force set the distance evaluation status of an identity
       **/
      forceValidDistanceStatus: AugmentedSubmittable<(identity: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Request caller identity to be evaluated
       * positive evaluation will result in claim/renew membership
       * negative evaluation will result in slash for caller
       **/
      requestDistanceEvaluation: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Request target identity to be evaluated
       * only possible for unvalidated identity
       **/
      requestDistanceEvaluationFor: AugmentedSubmittable<(target: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * (Inherent) Push an evaluation result to the pool
       * this is called internally by validators (= inherent)
       **/
      updateEvaluation: AugmentedSubmittable<
        (computationResult: SpDistanceComputationResult | { distances?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [SpDistanceComputationResult]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * Note that the current authority set of the GRANDPA finality gadget has stalled.
       *
       * This will trigger a forced authority set change at the beginning of the next session, to
       * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
       * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
       * The block production rate (which may be slowed down because of finality lagging) should
       * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
       * authority will start voting on top of `best_finalized_block_number` for new finalized
       * blocks. `best_finalized_block_number` should be the highest of the latest finalized
       * block of all validators of the new authority set.
       *
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<
        (delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<
        (
          equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array,
          keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusGrandpaEquivocationProof, SpSessionMembershipProof]
      >;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       *
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<
        (
          equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array,
          keyOwnerProof: SpSessionMembershipProof | { session?: any; trieNodes?: any; validatorCount?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusGrandpaEquivocationProof, SpSessionMembershipProof]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    identity: {
      /**
       * Change identity owner key.
       *
       * - `new_key`: the new owner key.
       * - `new_key_sig`: the signature of the encoded form of `IdtyIndexAccountIdPayload`.
       * Must be signed by `new_key`.
       *
       * The origin should be the old identity owner key.
       **/
      changeOwnerKey: AugmentedSubmittable<
        (
          newKey: AccountId32 | string | Uint8Array,
          newKeySig: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AccountId32, SpRuntimeMultiSignature]
      >;
      /**
       * Confirm the creation of an identity and give it a name
       *
       * - `idty_name`: the name uniquely associated to this identity. Must match the validation rules defined by the runtime.
       *
       * The identity must have been created using `create_identity` before it can be confirmed.
       **/
      confirmIdentity: AugmentedSubmittable<(idtyName: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Create an identity for an existing account
       *
       * - `owner_key`: the public key corresponding to the identity to be created
       *
       * The origin must be allowed to create an identity.
       **/
      createIdentity: AugmentedSubmittable<(ownerKey: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * change sufficient ref count for given key
       **/
      fixSufficients: AugmentedSubmittable<
        (ownerKey: AccountId32 | string | Uint8Array, inc: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [AccountId32, bool]
      >;
      /**
       * Link an account to an identity
       **/
      linkAccount: AugmentedSubmittable<
        (
          accountId: AccountId32 | string | Uint8Array,
          payloadSig: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [AccountId32, SpRuntimeMultiSignature]
      >;
      /**
       * remove identity names from storage
       **/
      pruneItemIdentitiesNames: AugmentedSubmittable<
        (names: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>,
        [Vec<Bytes>]
      >;
      /**
       * Revoke an identity using a revocation signature
       *
       * - `idty_index`: the index of the identity to be revoked.
       * - `revocation_key`: the key used to sign the revocation payload.
       * - `revocation_sig`: the signature of the encoded form of `RevocationPayload`.
       * Must be signed by `revocation_key`.
       *
       * Any signed origin can execute this call.
       **/
      revokeIdentity: AugmentedSubmittable<
        (
          idtyIndex: u32 | AnyNumber | Uint8Array,
          revocationKey: AccountId32 | string | Uint8Array,
          revocationSig: SpRuntimeMultiSignature | { Ed25519: any } | { Sr25519: any } | { Ecdsa: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, AccountId32, SpRuntimeMultiSignature]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    imOnline: {
      /**
       * ## Complexity:
       * - `O(K)` where K is length of `Keys` (heartbeat.validators_len)
       * - `O(K)`: decoding of length `K`
       **/
      heartbeat: AugmentedSubmittable<
        (
          heartbeat:
            | PalletImOnlineHeartbeat
            | { blockNumber?: any; sessionIndex?: any; authorityIndex?: any; validatorsLen?: any }
            | string
            | Uint8Array,
          signature: PalletImOnlineSr25519AppSr25519Signature | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Signature]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    multisig: {
      /**
       * Register approval for a dispatch to be made from a deterministic composite account if
       * approved by a total of `threshold - 1` of `other_signatories`.
       *
       * Payment: `DepositBase` will be reserved if this is the first approval, plus
       * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
       * is cancelled.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
       * not the first approval, then it must be `Some`, with the timepoint (block number and
       * transaction index) of the first approval transaction.
       * - `call_hash`: The hash of the call to be executed.
       *
       * NOTE: If this is the final approval, you will want to use `as_multi` instead.
       *
       * ## Complexity
       * - `O(S)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One encode & hash, both of complexity `O(S)`.
       * - Up to one binary search and insert (`O(logS + S)`).
       * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
       * - One event.
       * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
       * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
       **/
      approveAsMulti: AugmentedSubmittable<
        (
          threshold: u16 | AnyNumber | Uint8Array,
          otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[],
          maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string,
          callHash: U8aFixed | string | Uint8Array,
          maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, U8aFixed, SpWeightsWeightV2Weight]
      >;
      /**
       * Register approval for a dispatch to be made from a deterministic composite account if
       * approved by a total of `threshold - 1` of `other_signatories`.
       *
       * If there are enough, then dispatch the call.
       *
       * Payment: `DepositBase` will be reserved if this is the first approval, plus
       * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
       * is cancelled.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
       * not the first approval, then it must be `Some`, with the timepoint (block number and
       * transaction index) of the first approval transaction.
       * - `call`: The call to be executed.
       *
       * NOTE: Unless this is the final approval, you will generally want to use
       * `approve_as_multi` instead, since it only requires a hash of the call.
       *
       * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
       * on success, result is `Ok` and the result from the interior call, if it was executed,
       * may be found in the deposited `MultisigExecuted` event.
       *
       * ## Complexity
       * - `O(S + Z + Call)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
       * - One encode & hash, both of complexity `O(S)`.
       * - Up to one binary search and insert (`O(logS + S)`).
       * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
       * - One event.
       * - The weight of the `call`.
       * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
       * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
       **/
      asMulti: AugmentedSubmittable<
        (
          threshold: u16 | AnyNumber | Uint8Array,
          otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[],
          maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string,
          call: Call | IMethod | string | Uint8Array,
          maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, Call, SpWeightsWeightV2Weight]
      >;
      /**
       * Immediately dispatch a multi-signature call using a single approval from the caller.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `other_signatories`: The accounts (other than the sender) who are part of the
       * multi-signature, but do not participate in the approval process.
       * - `call`: The call to be executed.
       *
       * Result is equivalent to the dispatched result.
       *
       * ## Complexity
       * O(Z + C) where Z is the length of the call and C its execution weight.
       **/
      asMultiThreshold1: AugmentedSubmittable<
        (
          otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[],
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<AccountId32>, Call]
      >;
      /**
       * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
       * for this operation will be unreserved on success.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * - `threshold`: The total number of approvals for this dispatch before it is executed.
       * - `other_signatories`: The accounts (other than the sender) who can approve this
       * dispatch. May not be empty.
       * - `timepoint`: The timepoint (block number and transaction index) of the first approval
       * transaction for this dispatch.
       * - `call_hash`: The hash of the call to be executed.
       *
       * ## Complexity
       * - `O(S)`.
       * - Up to one balance-reserve or unreserve operation.
       * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
       * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
       * - One encode & hash, both of complexity `O(S)`.
       * - One event.
       * - I/O: 1 read `O(S)`, one remove.
       * - Storage: removes one item.
       **/
      cancelAsMulti: AugmentedSubmittable<
        (
          threshold: u16 | AnyNumber | Uint8Array,
          otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[],
          timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array,
          callHash: U8aFixed | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u16, Vec<AccountId32>, PalletMultisigTimepoint, U8aFixed]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    oneshotAccount: {
      /**
       * Consume a oneshot account and transfer its balance to an account
       *
       * - `block_height`: Must be a recent block number. The limit is `BlockHashCount` in the past. (this is to prevent replay attacks)
       * - `dest`: The destination account.
       * - `dest_is_oneshot`: If set to `true`, then a oneshot account is created at `dest`. Else, `dest` has to be an existing account.
       **/
      consumeOneshotAccount: AugmentedSubmittable<
        (
          blockHeight: u32 | AnyNumber | Uint8Array,
          dest: PalletOneshotAccountAccount | { Normal: any } | { Oneshot: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, PalletOneshotAccountAccount]
      >;
      /**
       * Consume a oneshot account then transfer some amount to an account,
       * and the remaining amount to another account.
       *
       * - `block_height`: Must be a recent block number.
       * The limit is `BlockHashCount` in the past. (this is to prevent replay attacks)
       * - `dest`: The destination account.
       * - `dest_is_oneshot`: If set to `true`, then a oneshot account is created at `dest`. Else, `dest` has to be an existing account.
       * - `dest2`: The second destination account.
       * - `dest2_is_oneshot`: If set to `true`, then a oneshot account is created at `dest2`. Else, `dest2` has to be an existing account.
       * - `balance1`: The amount transfered to `dest`, the leftover being transfered to `dest2`.
       **/
      consumeOneshotAccountWithRemaining: AugmentedSubmittable<
        (
          blockHeight: u32 | AnyNumber | Uint8Array,
          dest: PalletOneshotAccountAccount | { Normal: any } | { Oneshot: any } | string | Uint8Array,
          remainingTo: PalletOneshotAccountAccount | { Normal: any } | { Oneshot: any } | string | Uint8Array,
          balance: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, PalletOneshotAccountAccount, PalletOneshotAccountAccount, Compact<u64>]
      >;
      /**
       * Create an account that can only be consumed once
       *
       * - `dest`: The oneshot account to be created.
       * - `balance`: The balance to be transfered to this oneshot account.
       *
       * Origin account is kept alive.
       **/
      createOneshotAccount: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    preimage: {
      /**
       * Ensure that the a bulk of pre-images is upgraded.
       *
       * The caller pays no fee if at least 90% of pre-images were successfully updated.
       **/
      ensureUpdated: AugmentedSubmittable<(hashes: Vec<H256> | (H256 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<H256>]>;
      /**
       * Register a preimage on-chain.
       *
       * If the preimage was previously requested, no fees or deposits are taken for providing
       * the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
       **/
      notePreimage: AugmentedSubmittable<(bytes: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Request a preimage be uploaded to the chain without paying any fees or deposits.
       *
       * If the preimage requests has already been provided on-chain, we unreserve any deposit
       * a user may have paid, and take the control of the preimage out of their hands.
       **/
      requestPreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Clear an unrequested preimage from the runtime storage.
       *
       * If `len` is provided, then it will be a much cheaper operation.
       *
       * - `hash`: The hash of the preimage to be removed from the store.
       * - `len`: The length of the preimage of `hash`.
       **/
      unnotePreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Clear a previously made request for a preimage.
       *
       * NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
       **/
      unrequestPreimage: AugmentedSubmittable<(hash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    provideRandomness: {
      /**
       * Request a randomness
       **/
      request: AugmentedSubmittable<
        (
          randomnessType:
            | PalletProvideRandomnessRandomnessType
            | 'RandomnessFromPreviousBlock'
            | 'RandomnessFromOneEpochAgo'
            | 'RandomnessFromTwoEpochsAgo'
            | number
            | Uint8Array,
          salt: H256 | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [PalletProvideRandomnessRandomnessType, H256]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    proxy: {
      /**
       * Register a proxy account for the sender that is able to make calls on its behalf.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `proxy`: The account that the `caller` would like to make a proxy.
       * - `proxy_type`: The permissions allowed for this proxy account.
       * - `delay`: The announcement period required of the initial proxy. Will generally be
       * zero.
       **/
      addProxy: AugmentedSubmittable<
        (
          delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          proxyType: GdevRuntimeProxyType | 'AlmostAny' | 'TransferOnly' | 'CancelProxy' | 'TechnicalCommitteePropose' | number | Uint8Array,
          delay: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, GdevRuntimeProxyType, u32]
      >;
      /**
       * Publish the hash of a proxy-call that will be made in the future.
       *
       * This must be called some number of blocks before the corresponding `proxy` is attempted
       * if the delay associated with the proxy relationship is greater than zero.
       *
       * No more than `MaxPending` announcements may be made at any one time.
       *
       * This will take a deposit of `AnnouncementDepositFactor` as well as
       * `AnnouncementDepositBase` if there are no other pending announcements.
       *
       * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
       *
       * Parameters:
       * - `real`: The account that the proxy will make a call on behalf of.
       * - `call_hash`: The hash of the call to be made by the `real` account.
       **/
      announce: AugmentedSubmittable<
        (
          real: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          callHash: H256 | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, H256]
      >;
      /**
       * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
       * initialize it with a proxy of `proxy_type` for `origin` sender.
       *
       * Requires a `Signed` origin.
       *
       * - `proxy_type`: The type of the proxy that the sender will be registered as over the
       * new account. This will almost always be the most permissive `ProxyType` possible to
       * allow for maximum flexibility.
       * - `index`: A disambiguation index, in case this is called multiple times in the same
       * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
       * want to use `0`.
       * - `delay`: The announcement period required of the initial proxy. Will generally be
       * zero.
       *
       * Fails with `Duplicate` if this has already been called in this transaction, from the
       * same sender, with the same parameters.
       *
       * Fails if there are insufficient funds to pay for deposit.
       **/
      createPure: AugmentedSubmittable<
        (
          proxyType: GdevRuntimeProxyType | 'AlmostAny' | 'TransferOnly' | 'CancelProxy' | 'TechnicalCommitteePropose' | number | Uint8Array,
          delay: u32 | AnyNumber | Uint8Array,
          index: u16 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GdevRuntimeProxyType, u32, u16]
      >;
      /**
       * Removes a previously spawned pure proxy.
       *
       * WARNING: **All access to this account will be lost.** Any funds held in it will be
       * inaccessible.
       *
       * Requires a `Signed` origin, and the sender account must have been created by a call to
       * `pure` with corresponding parameters.
       *
       * - `spawner`: The account that originally called `pure` to create this account.
       * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
       * - `proxy_type`: The proxy type originally passed to `pure`.
       * - `height`: The height of the chain when the call to `pure` was processed.
       * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
       *
       * Fails with `NoPermission` in case the caller is not a previously created pure
       * account whose `pure` call has corresponding parameters.
       **/
      killPure: AugmentedSubmittable<
        (
          spawner: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          proxyType: GdevRuntimeProxyType | 'AlmostAny' | 'TransferOnly' | 'CancelProxy' | 'TechnicalCommitteePropose' | number | Uint8Array,
          index: u16 | AnyNumber | Uint8Array,
          height: Compact<u32> | AnyNumber | Uint8Array,
          extIndex: Compact<u32> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, GdevRuntimeProxyType, u16, Compact<u32>, Compact<u32>]
      >;
      /**
       * Dispatch the given `call` from an account that the sender is authorised for through
       * `add_proxy`.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `real`: The account that the proxy will make a call on behalf of.
       * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
       * - `call`: The call to be made by the `real` account.
       **/
      proxy: AugmentedSubmittable<
        (
          real: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          forceProxyType:
            | Option<GdevRuntimeProxyType>
            | null
            | Uint8Array
            | GdevRuntimeProxyType
            | 'AlmostAny'
            | 'TransferOnly'
            | 'CancelProxy'
            | 'TechnicalCommitteePropose'
            | number,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Option<GdevRuntimeProxyType>, Call]
      >;
      /**
       * Dispatch the given `call` from an account that the sender is authorized for through
       * `add_proxy`.
       *
       * Removes any corresponding announcement(s).
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `real`: The account that the proxy will make a call on behalf of.
       * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
       * - `call`: The call to be made by the `real` account.
       **/
      proxyAnnounced: AugmentedSubmittable<
        (
          delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          real: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          forceProxyType:
            | Option<GdevRuntimeProxyType>
            | null
            | Uint8Array
            | GdevRuntimeProxyType
            | 'AlmostAny'
            | 'TransferOnly'
            | 'CancelProxy'
            | 'TechnicalCommitteePropose'
            | number,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, MultiAddress, Option<GdevRuntimeProxyType>, Call]
      >;
      /**
       * Remove the given announcement of a delegate.
       *
       * May be called by a target (proxied) account to remove a call that one of their delegates
       * (`delegate`) has announced they want to execute. The deposit is returned.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `delegate`: The account that previously announced the call.
       * - `call_hash`: The hash of the call to be made.
       **/
      rejectAnnouncement: AugmentedSubmittable<
        (
          delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          callHash: H256 | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, H256]
      >;
      /**
       * Remove a given announcement.
       *
       * May be called by a proxy account to remove a call they previously announced and return
       * the deposit.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `real`: The account that the proxy will make a call on behalf of.
       * - `call_hash`: The hash of the call to be made by the `real` account.
       **/
      removeAnnouncement: AugmentedSubmittable<
        (
          real: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          callHash: H256 | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, H256]
      >;
      /**
       * Unregister all proxy accounts for the sender.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * WARNING: This may be called on accounts created by `pure`, however if done, then
       * the unreserved fees will be inaccessible. **All access to this account will be lost.**
       **/
      removeProxies: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Unregister a proxy account for the sender.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * Parameters:
       * - `proxy`: The account that the `caller` would like to remove as a proxy.
       * - `proxy_type`: The permissions currently enabled for the removed proxy account.
       **/
      removeProxy: AugmentedSubmittable<
        (
          delegate: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          proxyType: GdevRuntimeProxyType | 'AlmostAny' | 'TransferOnly' | 'CancelProxy' | 'TechnicalCommitteePropose' | number | Uint8Array,
          delay: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, GdevRuntimeProxyType, u32]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    scheduler: {
      /**
       * Cancel an anonymously scheduled task.
       **/
      cancel: AugmentedSubmittable<
        (when: u32 | AnyNumber | Uint8Array, index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * Cancel a named scheduled task.
       **/
      cancelNamed: AugmentedSubmittable<(id: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * Removes the retry configuration of a task.
       **/
      cancelRetry: AugmentedSubmittable<
        (task: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => SubmittableExtrinsic<ApiType>,
        [ITuple<[u32, u32]>]
      >;
      /**
       * Cancel the retry configuration of a named task.
       **/
      cancelRetryNamed: AugmentedSubmittable<(id: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed]>;
      /**
       * Anonymously schedule a task.
       **/
      schedule: AugmentedSubmittable<
        (
          when: u32 | AnyNumber | Uint8Array,
          maybePeriodic:
            | Option<ITuple<[u32, u32]>>
            | null
            | Uint8Array
            | ITuple<[u32, u32]>
            | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array],
          priority: u8 | AnyNumber | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<ITuple<[u32, u32]>>, u8, Call]
      >;
      /**
       * Anonymously schedule a task after a delay.
       **/
      scheduleAfter: AugmentedSubmittable<
        (
          after: u32 | AnyNumber | Uint8Array,
          maybePeriodic:
            | Option<ITuple<[u32, u32]>>
            | null
            | Uint8Array
            | ITuple<[u32, u32]>
            | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array],
          priority: u8 | AnyNumber | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<ITuple<[u32, u32]>>, u8, Call]
      >;
      /**
       * Schedule a named task.
       **/
      scheduleNamed: AugmentedSubmittable<
        (
          id: U8aFixed | string | Uint8Array,
          when: u32 | AnyNumber | Uint8Array,
          maybePeriodic:
            | Option<ITuple<[u32, u32]>>
            | null
            | Uint8Array
            | ITuple<[u32, u32]>
            | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array],
          priority: u8 | AnyNumber | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [U8aFixed, u32, Option<ITuple<[u32, u32]>>, u8, Call]
      >;
      /**
       * Schedule a named task after a delay.
       **/
      scheduleNamedAfter: AugmentedSubmittable<
        (
          id: U8aFixed | string | Uint8Array,
          after: u32 | AnyNumber | Uint8Array,
          maybePeriodic:
            | Option<ITuple<[u32, u32]>>
            | null
            | Uint8Array
            | ITuple<[u32, u32]>
            | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array],
          priority: u8 | AnyNumber | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [U8aFixed, u32, Option<ITuple<[u32, u32]>>, u8, Call]
      >;
      /**
       * Set a retry configuration for a task so that, in case its scheduled run fails, it will
       * be retried after `period` blocks, for a total amount of `retries` retries or until it
       * succeeds.
       *
       * Tasks which need to be scheduled for a retry are still subject to weight metering and
       * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
       * normally while the task is retrying.
       *
       * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
       * clones of the original task. Their retry configuration will be derived from the
       * original task's configuration, but will have a lower value for `remaining` than the
       * original `total_retries`.
       **/
      setRetry: AugmentedSubmittable<
        (
          task: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array],
          retries: u8 | AnyNumber | Uint8Array,
          period: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [ITuple<[u32, u32]>, u8, u32]
      >;
      /**
       * Set a retry configuration for a named task so that, in case its scheduled run fails, it
       * will be retried after `period` blocks, for a total amount of `retries` retries or until
       * it succeeds.
       *
       * Tasks which need to be scheduled for a retry are still subject to weight metering and
       * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
       * normally while the task is retrying.
       *
       * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
       * clones of the original task. Their retry configuration will be derived from the
       * original task's configuration, but will have a lower value for `remaining` than the
       * original `total_retries`.
       **/
      setRetryNamed: AugmentedSubmittable<
        (
          id: U8aFixed | string | Uint8Array,
          retries: u8 | AnyNumber | Uint8Array,
          period: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [U8aFixed, u8, u32]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    session: {
      /**
       * Removes any session key(s) of the function caller.
       *
       * This doesn't take effect until the next session.
       *
       * The dispatch origin of this function must be Signed and the account must be either be
       * convertible to a validator ID using the chain's typical addressing system (this usually
       * means being a controller account) or directly convertible into a validator ID (which
       * usually means being a stash account).
       *
       * ## Complexity
       * - `O(1)` in number of key types. Actual cost depends on the number of length of
       * `T::Keys::key_ids()` which is fixed.
       **/
      purgeKeys: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Sets the session key(s) of the function caller to `keys`.
       * Allows an account to set its session key prior to becoming a validator.
       * This doesn't take effect until the next session.
       *
       * The dispatch origin of this function must be signed.
       *
       * ## Complexity
       * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
       * fixed.
       **/
      setKeys: AugmentedSubmittable<
        (
          keys: GdevRuntimeOpaqueSessionKeys | { grandpa?: any; babe?: any; imOnline?: any; authorityDiscovery?: any } | string | Uint8Array,
          proof: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GdevRuntimeOpaqueSessionKeys, Bytes]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    smithMembers: {
      /**
       * Accept an invitation (must have been invited first)
       **/
      acceptInvitation: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Certify an invited smith which can lead the certified to become a Smith
       **/
      certifySmith: AugmentedSubmittable<(receiver: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Invite a WoT member to try becoming a Smith
       **/
      inviteSmith: AugmentedSubmittable<(receiver: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Permanently removes the sudo key.
       *
       * **This cannot be un-done.**
       **/
      removeKey: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       **/
      setKey: AugmentedSubmittable<
        (
          updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       *
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoAs: AugmentedSubmittable<
        (
          who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Call]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       *
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoUncheckedWeight: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array,
          weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, SpWeightsWeightV2Weight]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
       *
       * If the authorization required a version check, this call will ensure the spec name
       * remains unchanged and that the spec version has increased.
       *
       * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
       * the new `code` in the same block or attempt to schedule the upgrade.
       *
       * All origins are allowed.
       **/
      applyAuthorizedUpgrade: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       *
       * This call requires Root origin.
       **/
      authorizeUpgrade: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       *
       * WARNING: This authorizes an upgrade that will take place without any safety checks, for
       * example that the spec name remains the same and that the version number increases. Not
       * recommended for normal use. Use `authorize_upgrade` instead.
       *
       * This call requires Root origin.
       **/
      authorizeUpgradeWithoutChecks: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       *
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<
        (prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes, u32]
      >;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       *
       * Can be executed by every `origin`.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       *
       * Note that runtime upgrades will not run if this is called with a not-increasing spec
       * version!
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<
        (items: Vec<ITuple<[Bytes, Bytes]>> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array][]) => SubmittableExtrinsic<ApiType>,
        [Vec<ITuple<[Bytes, Bytes]>>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    technicalCommittee: {
      /**
       * Close a vote that is either approved, disapproved or whose voting period has ended.
       *
       * May be called by any signed account in order to finish voting and close the proposal.
       *
       * If called before the end of the voting period it will only close the vote if it is
       * has enough votes to be approved or disapproved.
       *
       * If called after the end of the voting period abstentions are counted as rejections
       * unless there is a prime member set and the prime member cast an approval.
       *
       * If the close operation completes successfully with disapproval, the transaction fee will
       * be waived. Otherwise execution of the approved operation will be charged to the caller.
       *
       * + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
       * proposal.
       * + `length_bound`: The upper bound for the length of the proposal in storage. Checked via
       * `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
       *
       * ## Complexity
       * - `O(B + M + P1 + P2)` where:
       * - `B` is `proposal` size in bytes (length-fee-bounded)
       * - `M` is members-count (code- and governance-bounded)
       * - `P1` is the complexity of `proposal` preimage.
       * - `P2` is proposal-count (code-bounded)
       **/
      close: AugmentedSubmittable<
        (
          proposalHash: H256 | string | Uint8Array,
          index: Compact<u32> | AnyNumber | Uint8Array,
          proposalWeightBound: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array,
          lengthBound: Compact<u32> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [H256, Compact<u32>, SpWeightsWeightV2Weight, Compact<u32>]
      >;
      /**
       * Disapprove a proposal, close, and remove it from the system, regardless of its current
       * state.
       *
       * Must be called by the Root origin.
       *
       * Parameters:
       * * `proposal_hash`: The hash of the proposal that should be disapproved.
       *
       * ## Complexity
       * O(P) where P is the number of max proposals
       **/
      disapproveProposal: AugmentedSubmittable<(proposalHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Dispatch a proposal from a member using the `Member` origin.
       *
       * Origin must be a member of the collective.
       *
       * ## Complexity:
       * - `O(B + M + P)` where:
       * - `B` is `proposal` size in bytes (length-fee-bounded)
       * - `M` members-count (code-bounded)
       * - `P` complexity of dispatching `proposal`
       **/
      execute: AugmentedSubmittable<
        (proposal: Call | IMethod | string | Uint8Array, lengthBound: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Call, Compact<u32>]
      >;
      /**
       * Add a new proposal to either be voted on or executed directly.
       *
       * Requires the sender to be member.
       *
       * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
       * or put up for voting.
       *
       * ## Complexity
       * - `O(B + M + P1)` or `O(B + M + P2)` where:
       * - `B` is `proposal` size in bytes (length-fee-bounded)
       * - `M` is members-count (code- and governance-bounded)
       * - branching is influenced by `threshold` where:
       * - `P1` is proposal execution complexity (`threshold < 2`)
       * - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
       **/
      propose: AugmentedSubmittable<
        (
          threshold: Compact<u32> | AnyNumber | Uint8Array,
          proposal: Call | IMethod | string | Uint8Array,
          lengthBound: Compact<u32> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Compact<u32>, Call, Compact<u32>]
      >;
      /**
       * Set the collective's membership.
       *
       * - `new_members`: The new member list. Be nice to the chain and provide it sorted.
       * - `prime`: The prime member whose vote sets the default.
       * - `old_count`: The upper bound for the previous number of members in storage. Used for
       * weight estimation.
       *
       * The dispatch of this call must be `SetMembersOrigin`.
       *
       * NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
       * the weight estimations rely on it to estimate dispatchable weight.
       *
       * # WARNING:
       *
       * The `pallet-collective` can also be managed by logic outside of the pallet through the
       * implementation of the trait [`ChangeMembers`].
       * Any call to `set_members` must be careful that the member set doesn't get out of sync
       * with other logic managing the member set.
       *
       * ## Complexity:
       * - `O(MP + N)` where:
       * - `M` old-members-count (code- and governance-bounded)
       * - `N` new-members-count (code- and governance-bounded)
       * - `P` proposals-count (code-bounded)
       **/
      setMembers: AugmentedSubmittable<
        (
          newMembers: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[],
          prime: Option<AccountId32> | null | Uint8Array | AccountId32 | string,
          oldCount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<AccountId32>, Option<AccountId32>, u32]
      >;
      /**
       * Add an aye or nay vote for the sender to the given proposal.
       *
       * Requires the sender to be a member.
       *
       * Transaction fees will be waived if the member is voting on any particular proposal
       * for the first time and the call is successful. Subsequent vote changes will charge a
       * fee.
       * ## Complexity
       * - `O(M)` where `M` is members-count (code- and governance-bounded)
       **/
      vote: AugmentedSubmittable<
        (
          proposal: H256 | string | Uint8Array,
          index: Compact<u32> | AnyNumber | Uint8Array,
          approve: bool | boolean | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [H256, Compact<u32>, bool]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       *
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       *
       * The timestamp should be greater than the previous one by the amount specified by
       * [`Config::MinimumPeriod`].
       *
       * The dispatch origin for this call must be _None_.
       *
       * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
       * that changing the complexity of this call could result exhausting the resources in a
       * block to execute any other calls.
       *
       * ## Complexity
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    treasury: {
      /**
       * Approve a proposal.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::ApproveOrigin`].
       *
       * ## Details
       *
       * At a later time, the proposal will be allocated to the beneficiary and the original
       * deposit will be returned.
       *
       * ### Complexity
       * - O(1).
       *
       * ## Events
       *
       * No events are emitted from this dispatch.
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Check the status of the spend and remove it from the storage if processed.
       *
       * ## Dispatch Origin
       *
       * Must be signed.
       *
       * ## Details
       *
       * The status check is a prerequisite for retrying a failed payout.
       * If a spend has either succeeded or expired, it is removed from the storage by this
       * function. In such instances, transaction fees are refunded.
       *
       * ### Parameters
       * - `index`: The spend index.
       *
       * ## Events
       *
       * Emits [`Event::PaymentFailed`] if the spend payout has failed.
       * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
       **/
      checkStatus: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Claim a spend.
       *
       * ## Dispatch Origin
       *
       * Must be signed.
       *
       * ## Details
       *
       * Spends must be claimed within some temporal bounds. A spend may be claimed within one
       * [`Config::PayoutPeriod`] from the `valid_from` block.
       * In case of a payout failure, the spend status must be updated with the `check_status`
       * dispatchable before retrying with the current function.
       *
       * ### Parameters
       * - `index`: The spend index.
       *
       * ## Events
       *
       * Emits [`Event::Paid`] if successful.
       **/
      payout: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Put forward a suggestion for spending.
       *
       * ## Dispatch Origin
       *
       * Must be signed.
       *
       * ## Details
       * A deposit proportional to the value is reserved and slashed if the proposal is rejected.
       * It is returned once the proposal is awarded.
       *
       * ### Complexity
       * - O(1)
       *
       * ## Events
       *
       * Emits [`Event::Proposed`] if successful.
       **/
      proposeSpend: AugmentedSubmittable<
        (
          value: Compact<u64> | AnyNumber | Uint8Array,
          beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Compact<u64>, MultiAddress]
      >;
      /**
       * Reject a proposed spend.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::RejectOrigin`].
       *
       * ## Details
       * The original deposit will be slashed.
       *
       * ### Complexity
       * - O(1)
       *
       * ## Events
       *
       * Emits [`Event::Rejected`] if successful.
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Force a previously approved proposal to be removed from the approval queue.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::RejectOrigin`].
       *
       * ## Details
       *
       * The original deposit will no longer be returned.
       *
       * ### Parameters
       * - `proposal_id`: The index of a proposal
       *
       * ### Complexity
       * - O(A) where `A` is the number of approvals
       *
       * ### Errors
       * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
       * approval queue, i.e., the proposal has not been approved. This could also mean the
       * proposal does not exist altogether, thus there is no way it would have been approved
       * in the first place.
       **/
      removeApproval: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Propose and approve a spend of treasury funds.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::SpendOrigin`] with the `Success` value being at least
       * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
       * for assertion using the [`Config::BalanceConverter`].
       *
       * ## Details
       *
       * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
       * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
       * the [`Config::PayoutPeriod`].
       *
       * ### Parameters
       * - `asset_kind`: An indicator of the specific asset class to be spent.
       * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
       * - `beneficiary`: The beneficiary of the spend.
       * - `valid_from`: The block number from which the spend can be claimed. It can refer to
       * the past if the resulting spend has not yet expired according to the
       * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
       * approval.
       *
       * ## Events
       *
       * Emits [`Event::AssetSpendApproved`] if successful.
       **/
      spend: AugmentedSubmittable<
        (
          assetKind: Null | null,
          amount: Compact<u64> | AnyNumber | Uint8Array,
          beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          validFrom: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [Null, Compact<u64>, MultiAddress, Option<u32>]
      >;
      /**
       * Propose and approve a spend of treasury funds.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
       *
       * ### Details
       * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
       * beneficiary.
       *
       * ### Parameters
       * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
       * - `beneficiary`: The destination account for the transfer.
       *
       * ## Events
       *
       * Emits [`Event::SpendApproved`] if successful.
       **/
      spendLocal: AugmentedSubmittable<
        (
          amount: Compact<u64> | AnyNumber | Uint8Array,
          beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Compact<u64>, MultiAddress]
      >;
      /**
       * Void previously approved spend.
       *
       * ## Dispatch Origin
       *
       * Must be [`Config::RejectOrigin`].
       *
       * ## Details
       *
       * A spend void is only possible if the payout has not been attempted yet.
       *
       * ### Parameters
       * - `index`: The spend index.
       *
       * ## Events
       *
       * Emits [`Event::AssetSpendVoided`] if successful.
       **/
      voidSpend: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    universalDividend: {
      /**
       * Claim Universal Dividends
       **/
      claimUds: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Transfer some liquid free balance to another account, in milliUD.
       **/
      transferUd: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Transfer some liquid free balance to another account, in milliUD.
       **/
      transferUdKeepAlive: AugmentedSubmittable<
        (
          dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array,
          value: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u64>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    upgradeOrigin: {
      /**
       * Dispatches a function call from root origin.
       *
       * The weight of this call is defined by the caller.
       **/
      dispatchAsRoot: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Dispatches a function call from root origin.
       * This function does not check the weight of the call, and instead allows the
       * caller to specify the weight of the call.
       *
       * The weight of this call is defined by the caller.
       **/
      dispatchAsRootUncheckedWeight: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array,
          weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, SpWeightsWeightV2Weight]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * Send a call through an indexed pseudonym of the sender.
       *
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       *
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
       * in the Multisig pallet instead.
       *
       * NOTE: Prior to version *12, this was called `as_limited_sub`.
       *
       * The dispatch origin for this call must be _Signed_.
       **/
      asDerivative: AugmentedSubmittable<
        (index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u16, Call]
      >;
      /**
       * Send a batch of dispatch calls.
       *
       * May be called from any origin except `None`.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       *
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       *
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       *
       * This will return `Ok` in all circumstances. To determine the success of the batch, an
       * event is deposited. If a call failed and the batch was interrupted, then the
       * `BatchInterrupted` event is deposited, along with the number of successful calls made
       * and the error of the failed call. If all were successful, then the `BatchCompleted`
       * event is deposited.
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       *
       * May be called from any origin except `None`.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       *
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       *
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatches a function call with a provided origin.
       *
       * The dispatch origin for this call must be _Root_.
       *
       * ## Complexity
       * - O(1).
       **/
      dispatchAs: AugmentedSubmittable<
        (
          asOrigin: GdevRuntimeOriginCaller | { system: any } | { Void: any } | { TechnicalCommittee: any } | string | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GdevRuntimeOriginCaller, Call]
      >;
      /**
       * Send a batch of dispatch calls.
       * Unlike `batch`, it allows errors and won't interrupt.
       *
       * May be called from any origin except `None`.
       *
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       *
       * If origin is root then the calls are dispatch without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       *
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatch a function call with a specified weight.
       *
       * This function does not check the weight of the call, and instead allows the
       * Root origin to specify the weight of the call.
       *
       * The dispatch origin for this call must be _Root_.
       **/
      withWeight: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array,
          weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, SpWeightsWeightV2Weight]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
