// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/consts';

import type { ApiTypes, AugmentedConst } from '@polkadot/api-base/types';
import type { Option, bool, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { Codec } from '@polkadot/types-codec/types';
import type { AccountId32, Perbill, Permill } from '@polkadot/types/interfaces/runtime';

export type __AugmentedConst<ApiType extends ApiTypes> = AugmentedConst<ApiType>;

declare module '@polkadot/api-base/types/consts' {
  interface AugmentedConsts<ApiType extends ApiTypes> {
    account: {
      maxNewAccountsPerBlock: u32 & AugmentedConst<ApiType>;
      newAccountPrice: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    atomicSwap: {
      /**
       * Limit of proof size.
       * 
       * Atomic swap is only atomic if once the proof is revealed, both parties can submit the
       * proofs on-chain. If A is the one that generates the proof, then it requires that either:
       * - A's blockchain has the same proof length limit as B's blockchain.
       * - Or A's blockchain has shorter proof length limit as B's blockchain.
       * 
       * If B sees A is on a blockchain with larger proof length limit, then it should kindly
       * refuse to accept the atomic swap request if A generates the proof, and asks that B
       * generates the proof instead.
       **/
      proofLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    authorityMembers: {
      /**
       * Max number of authorities allowed
       **/
      maxAuthorities: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    babe: {
      /**
       * The amount of time, in slots, that each epoch should last.
       * NOTE: Currently it is not possible to change the epoch duration after
       * the chain has started. Attempting to do so will brick block production.
       **/
      epochDuration: u64 & AugmentedConst<ApiType>;
      /**
       * The expected average block time at which BABE should be creating
       * blocks. Since BABE is probabilistic it is not trivial to figure out
       * what the expected average block time should be based on the slot
       * duration and the security parameter `c` (where `1 - c` represents
       * the probability of a slot being empty).
       **/
      expectedBlockTime: u64 & AugmentedConst<ApiType>;
      /**
       * Max number of authorities allowed
       **/
      maxAuthorities: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    balances: {
      /**
       * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
       * 
       * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
       * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
       * In case you have multiple sources of provider references, you may also get unexpected
       * behaviour if you set this to zero.
       * 
       * Bottom line: Do yourself a favour and make it at least one!
       **/
      existentialDeposit: u64 & AugmentedConst<ApiType>;
      /**
       * The maximum number of individual freeze locks that can exist on an account at any time.
       **/
      maxFreezes: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of holds that can exist on an account at any time.
       **/
      maxHolds: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of locks that should exist on an account.
       * Not strictly enforced, but used for weight estimation.
       **/
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of named reserves that can exist on an account.
       **/
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    cert: {
      /**
       * Minimum duration between two certifications issued by the same issuer
       **/
      certPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum number of active certifications by issuer
       **/
      maxByIssuer: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum number of certifications that must be received to be able to issue
       * certifications.
       **/
      minReceivedCertToBeAbleToIssueCert: u32 & AugmentedConst<ApiType>;
      /**
       * Duration of validity of a certification
       **/
      validityPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    distance: {
      /**
       * Amount reserved during evaluation
       **/
      evaluationPrice: u64 & AugmentedConst<ApiType>;
      /**
       * Minimum ratio of accessible referees
       **/
      minAccessibleReferees: Perbill & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    grandpa: {
      /**
       * Max Authorities in use
       **/
      maxAuthorities: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of entries to keep in the set id to session index mapping.
       * 
       * Since the `SetIdSession` map is only used for validating equivocations this
       * value should relate to the bonding duration of whatever staking system is
       * being used (if any). If equivocation handling is not enabled then this value
       * can be zero.
       **/
      maxSetIdSessionEntries: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    identity: {
      /**
       * Minimum duration between two owner key changes
       **/
      changeOwnerKeyPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Period during which the owner can confirm the new identity.
       **/
      confirmPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum duration between the creation of 2 identities by the same creator
       **/
      idtyCreationPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    imOnline: {
      /**
       * A configuration for base priority of unsigned transactions.
       * 
       * This is exposed so that it can be tuned for particular runtime, when
       * multiple pallets send unsigned transactions.
       **/
      unsignedPriority: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    membership: {
      /**
       * Maximum life span of a non-renewable membership (in number of blocks)
       **/
      membershipPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum period (in number of blocks), where an identity can remain pending subscription.
       **/
      pendingMembershipPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    multisig: {
      /**
       * The base amount of currency needed to reserve for creating a multisig execution or to
       * store a dispatch call for later.
       * 
       * This is held for an additional storage item whose value size is
       * `4 + sizeof((BlockNumber, Balance, AccountId))` bytes and whose key size is
       * `32 + sizeof(AccountId)` bytes.
       **/
      depositBase: u64 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per unit threshold when creating a multisig execution.
       * 
       * This is held for adding 32 bytes more into a pre-existing storage value.
       **/
      depositFactor: u64 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of signatories allowed in the multisig.
       **/
      maxSignatories: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    provideRandomness: {
      /**
       * Maximum number of not yet filled requests
       **/
      maxRequests: u32 & AugmentedConst<ApiType>;
      /**
       * The price of a request
       **/
      requestPrice: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    proxy: {
      /**
       * The base amount of currency needed to reserve for creating an announcement.
       * 
       * This is held when a new storage item holding a `Balance` is created (typically 16
       * bytes).
       **/
      announcementDepositBase: u64 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per announcement made.
       * 
       * This is held for adding an `AccountId`, `Hash` and `BlockNumber` (typically 68 bytes)
       * into a pre-existing storage value.
       **/
      announcementDepositFactor: u64 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of time-delayed announcements that are allowed to be pending.
       **/
      maxPending: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum amount of proxies allowed for a single account.
       **/
      maxProxies: u32 & AugmentedConst<ApiType>;
      /**
       * The base amount of currency needed to reserve for creating a proxy.
       * 
       * This is held for an additional storage item whose value size is
       * `sizeof(Balance)` bytes and whose key size is `sizeof(AccountId)` bytes.
       **/
      proxyDepositBase: u64 & AugmentedConst<ApiType>;
      /**
       * The amount of currency needed per proxy added.
       * 
       * This is held for adding 32 bytes plus an instance of `ProxyType` more into a
       * pre-existing storage value. Thus, when configuring `ProxyDepositFactor` one should take
       * into account `32 + proxy_type.encode().len()` bytes of data.
       **/
      proxyDepositFactor: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    quota: {
      /**
       * Account used to refund fee
       **/
      refundAccount: AccountId32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    scheduler: {
      /**
       * The maximum weight that may be scheduled per block for any dispatchables.
       **/
      maximumWeight: SpWeightsWeightV2Weight & AugmentedConst<ApiType>;
      /**
       * The maximum number of scheduled calls in the queue for a single block.
       * 
       * NOTE:
       * + Dependent pallets' benchmarks might require a higher limit for the setting. Set a
       * higher limit under `runtime-benchmarks` feature.
       **/
      maxScheduledPerBlock: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    smithCert: {
      /**
       * Minimum duration between two certifications issued by the same issuer
       **/
      certPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum number of active certifications by issuer
       **/
      maxByIssuer: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum number of certifications that must be received to be able to issue
       * certifications.
       **/
      minReceivedCertToBeAbleToIssueCert: u32 & AugmentedConst<ApiType>;
      /**
       * Duration of validity of a certification
       **/
      validityPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    smithMembership: {
      /**
       * Maximum life span of a non-renewable membership (in number of blocks)
       **/
      membershipPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum period (in number of blocks), where an identity can remain pending subscription.
       **/
      pendingMembershipPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    smithSubWot: {
      firstIssuableOn: u32 & AugmentedConst<ApiType>;
      isSubWot: bool & AugmentedConst<ApiType>;
      minCertForCreateIdtyRight: u32 & AugmentedConst<ApiType>;
      minCertForMembership: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    system: {
      /**
       * Maximum number of block number to block hash mappings to keep (oldest pruned first).
       **/
      blockHashCount: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum length of a block (in bytes).
       **/
      blockLength: FrameSystemLimitsBlockLength & AugmentedConst<ApiType>;
      /**
       * Block & extrinsics weights: base values and limits.
       **/
      blockWeights: FrameSystemLimitsBlockWeights & AugmentedConst<ApiType>;
      /**
       * The weight of runtime database operations the runtime can invoke.
       **/
      dbWeight: SpWeightsRuntimeDbWeight & AugmentedConst<ApiType>;
      /**
       * The designated SS58 prefix of this chain.
       * 
       * This replaces the "ss58Format" property declared in the chain spec. Reason is
       * that the runtime should know about the prefix in order to make use of it as
       * an identifier of the chain.
       **/
      ss58Prefix: u16 & AugmentedConst<ApiType>;
      /**
       * Get the chain's current version.
       **/
      version: SpVersionRuntimeVersion & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    technicalCommittee: {
      /**
       * The maximum weight of a dispatch call that can be proposed and executed.
       **/
      maxProposalWeight: SpWeightsWeightV2Weight & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    timestamp: {
      /**
       * The minimum period between blocks. Beware that this is different to the *expected*
       * period that the block production apparatus provides. Your chosen consensus system will
       * generally work with this to determine a sensible block time. e.g. For Aura, it will be
       * double this period on default settings.
       **/
      minimumPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    transactionPayment: {
      /**
       * A fee mulitplier for `Operational` extrinsics to compute "virtual tip" to boost their
       * `priority`
       * 
       * This value is multipled by the `final_fee` to obtain a "virtual tip" that is later
       * added to a tip component in regular `priority` calculations.
       * It means that a `Normal` transaction can front-run a similarly-sized `Operational`
       * extrinsic (with no tip), by including a tip value greater than the virtual tip.
       * 
       * ```rust,ignore
       * // For `Normal`
       * let priority = priority_calc(tip);
       * 
       * // For `Operational`
       * let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
       * let priority = priority_calc(tip + virtual_tip);
       * ```
       * 
       * Note that since we use `final_fee` the multiplier applies also to the regular `tip`
       * sent with the transaction. So, not only does the transaction get a priority bump based
       * on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
       * transactions.
       **/
      operationalFeeMultiplier: u8 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    treasury: {
      /**
       * Percentage of spare funds (if any) that are burnt per spend period.
       **/
      burn: Permill & AugmentedConst<ApiType>;
      /**
       * The maximum number of approvals that can wait in the spending queue.
       * 
       * NOTE: This parameter is also used within the Bounties Pallet extension if enabled.
       **/
      maxApprovals: u32 & AugmentedConst<ApiType>;
      /**
       * The treasury's pallet id, used for deriving its sovereign account ID.
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Fraction of a proposal's value that should be bonded in order to place the proposal.
       * An accepted proposal gets these back. A rejected proposal does not.
       **/
      proposalBond: Permill & AugmentedConst<ApiType>;
      /**
       * Maximum amount of funds that should be placed in a deposit for making a proposal.
       **/
      proposalBondMaximum: Option<u64> & AugmentedConst<ApiType>;
      /**
       * Minimum amount of funds that should be placed in a deposit for making a proposal.
       **/
      proposalBondMinimum: u64 & AugmentedConst<ApiType>;
      /**
       * Period between successive spends.
       **/
      spendPeriod: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    universalDividend: {
      /**
       * Maximum number of past UD revaluations to keep in storage.
       **/
      maxPastReeval: u32 & AugmentedConst<ApiType>;
      /**
       * Square of the money growth rate per ud reevaluation period
       **/
      squareMoneyGrowthRate: Perbill & AugmentedConst<ApiType>;
      /**
       * Universal dividend creation period (ms)
       **/
      udCreationPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * Universal dividend reevaluation period (ms)
       **/
      udReevalPeriod: u64 & AugmentedConst<ApiType>;
      /**
       * The number of units to divide the amounts expressed in number of UDs
       * Example: If you wish to express the UD amounts with a maximum precision of the order
       * of the milliUD, choose 1000
       **/
      unitsPerUd: u64 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    utility: {
      /**
       * The limit on the number of batched calls.
       **/
      batchedCallsLimit: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    wot: {
      firstIssuableOn: u32 & AugmentedConst<ApiType>;
      isSubWot: bool & AugmentedConst<ApiType>;
      minCertForCreateIdtyRight: u32 & AugmentedConst<ApiType>;
      minCertForMembership: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
