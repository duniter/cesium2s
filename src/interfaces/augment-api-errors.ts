// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    atomicSwap: {
      /**
       * Swap has already been claimed.
       **/
      AlreadyClaimed: AugmentedError<ApiType>;
      /**
       * Swap already exists.
       **/
      AlreadyExist: AugmentedError<ApiType>;
      /**
       * Claim action mismatch.
       **/
      ClaimActionMismatch: AugmentedError<ApiType>;
      /**
       * Duration has not yet passed for the swap to be cancelled.
       **/
      DurationNotPassed: AugmentedError<ApiType>;
      /**
       * Swap proof is invalid.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Swap does not exist.
       **/
      NotExist: AugmentedError<ApiType>;
      /**
       * Proof is too large.
       **/
      ProofTooLarge: AugmentedError<ApiType>;
      /**
       * Source does not match.
       **/
      SourceMismatch: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authorityMembers: {
      /**
       * Member already incoming.
       **/
      AlreadyIncoming: AugmentedError<ApiType>;
      /**
       * Member already online.
       **/
      AlreadyOnline: AugmentedError<ApiType>;
      /**
       * Member already outgoing.
       **/
      AlreadyOutgoing: AugmentedError<ApiType>;
      /**
       * Member is blacklisted.
       **/
      MemberBlacklisted: AugmentedError<ApiType>;
      /**
       * Owner key is invalid as a member.
       **/
      MemberIdNotFound: AugmentedError<ApiType>;
      /**
       * Member is not blacklisted.
       **/
      MemberNotBlacklisted: AugmentedError<ApiType>;
      /**
       * Member not found.
       **/
      MemberNotFound: AugmentedError<ApiType>;
      /**
       * Not member.
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Neither online nor scheduled.
       **/
      NotOnlineNorIncoming: AugmentedError<ApiType>;
      /**
       * Session keys not provided.
       **/
      SessionKeysNotProvided: AugmentedError<ApiType>;
      /**
       * Too many authorities.
       **/
      TooManyAuthorities: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    babe: {
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * Submitted configuration is invalid.
       **/
      InvalidConfiguration: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    balances: {
      /**
       * Beneficiary account must pre-exist.
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * The delta cannot be zero.
       **/
      DeltaZero: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit.
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account.
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account.
       **/
      Expendability: AugmentedError<ApiType>;
      /**
       * Balance too low to send value.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * The issuance cannot be modified since it is already deactivated.
       **/
      IssuanceDeactivated: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal.
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of freezes exceed `MaxFreezes`.
       **/
      TooManyFreezes: AugmentedError<ApiType>;
      /**
       * Number of holds exceed `VariantCountOf<T::RuntimeHoldReason>`.
       **/
      TooManyHolds: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed `MaxReserves`.
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value.
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    certification: {
      /**
       * Identity cannot certify itself.
       **/
      CannotCertifySelf: AugmentedError<ApiType>;
      /**
       * Can not add an already-existing cert
       **/
      CertAlreadyExists: AugmentedError<ApiType>;
      /**
       * Can not renew a non-existing cert
       **/
      CertDoesNotExist: AugmentedError<ApiType>;
      /**
       * Identity has already issued the maximum number of certifications.
       **/
      IssuedTooManyCert: AugmentedError<ApiType>;
      /**
       * Insufficient certifications received.
       **/
      NotEnoughCertReceived: AugmentedError<ApiType>;
      /**
       * Identity has issued a certification too recently.
       **/
      NotRespectCertPeriod: AugmentedError<ApiType>;
      /**
       * Issuer of a certification must have an identity
       **/
      OriginMustHaveAnIdentity: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    distance: {
      /**
       * Distance is already under evaluation.
       **/
      AlreadyInEvaluation: AugmentedError<ApiType>;
      /**
       * Caller has no identity.
       **/
      CallerHasNoIdentity: AugmentedError<ApiType>;
      /**
       * Caller identity not found.
       **/
      CallerIdentityNotFound: AugmentedError<ApiType>;
      /**
       * Caller not member.
       **/
      CallerNotMember: AugmentedError<ApiType>;
      CallerStatusInvalid: AugmentedError<ApiType>;
      /**
       * No author for this block.
       **/
      NoAuthor: AugmentedError<ApiType>;
      /**
       * Evaluation queue is full.
       **/
      QueueFull: AugmentedError<ApiType>;
      /**
       * Target identity not found.
       **/
      TargetIdentityNotFound: AugmentedError<ApiType>;
      /**
       * Targeted distance evaluation request is only possible for an unvalidated identity.
       **/
      TargetMustBeUnvalidated: AugmentedError<ApiType>;
      /**
       * Too many evaluations requested by author.
       **/
      TooManyEvaluationsByAuthor: AugmentedError<ApiType>;
      /**
       * Too many evaluations for this block.
       **/
      TooManyEvaluationsInBlock: AugmentedError<ApiType>;
      /**
       * Too many evaluators in the current evaluation pool.
       **/
      TooManyEvaluators: AugmentedError<ApiType>;
      /**
       * Evaluation result has a wrong length.
       **/
      WrongResultLength: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    identity: {
      /**
       * Cannot link to an inexisting account.
       **/
      AccountNotExist: AugmentedError<ApiType>;
      /**
       * Already revoked.
       **/
      AlreadyRevoked: AugmentedError<ApiType>;
      /**
       * Can not revoke identity that never was member.
       **/
      CanNotRevokeUnconfirmed: AugmentedError<ApiType>;
      /**
       * Can not revoke identity that never was member.
       **/
      CanNotRevokeUnvalidated: AugmentedError<ApiType>;
      /**
       * Identity already confirmed.
       **/
      IdtyAlreadyConfirmed: AugmentedError<ApiType>;
      /**
       * Identity already created.
       **/
      IdtyAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Identity index not found.
       **/
      IdtyIndexNotFound: AugmentedError<ApiType>;
      /**
       * Identity name already exists.
       **/
      IdtyNameAlreadyExist: AugmentedError<ApiType>;
      /**
       * Invalid identity name.
       **/
      IdtyNameInvalid: AugmentedError<ApiType>;
      /**
       * Identity not found.
       **/
      IdtyNotFound: AugmentedError<ApiType>;
      /**
       * Invalid revocation key.
       **/
      InvalidRevocationKey: AugmentedError<ApiType>;
      /**
       * Invalid payload signature.
       **/
      InvalidSignature: AugmentedError<ApiType>;
      /**
       * Issuer is not member and can not perform this action.
       **/
      IssuerNotMember: AugmentedError<ApiType>;
      /**
       * Identity creation period is not respected.
       **/
      NotRespectIdtyCreationPeriod: AugmentedError<ApiType>;
      /**
       * Owner key already changed recently.
       **/
      OwnerKeyAlreadyRecentlyChanged: AugmentedError<ApiType>;
      /**
       * Owner key already used.
       **/
      OwnerKeyAlreadyUsed: AugmentedError<ApiType>;
      /**
       * Reverting to an old key is prohibited.
       **/
      ProhibitedToRevertToAnOldKey: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    imOnline: {
      /**
       * Duplicated heartbeat.
       **/
      DuplicatedHeartbeat: AugmentedError<ApiType>;
      /**
       * Non existent public key.
       **/
      InvalidKey: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    membership: {
      /**
       * Already member, can not add membership.
       **/
      AlreadyMember: AugmentedError<ApiType>;
      /**
       * Membership not found, can not renew.
       **/
      MembershipNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    oneshotAccount: {
      /**
       * Block height is in the future.
       **/
      BlockHeightInFuture: AugmentedError<ApiType>;
      /**
       * Block height is too old.
       **/
      BlockHeightTooOld: AugmentedError<ApiType>;
      /**
       * Destination account does not exist.
       **/
      DestAccountNotExist: AugmentedError<ApiType>;
      /**
       * Destination account has a balance less than the existential deposit.
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * Source account has insufficient balance.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Destination oneshot account already exists.
       **/
      OneshotAccountAlreadyCreated: AugmentedError<ApiType>;
      /**
       * Source oneshot account does not exist.
       **/
      OneshotAccountNotExist: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    preimage: {
      /**
       * Preimage has already been noted on-chain.
       **/
      AlreadyNoted: AugmentedError<ApiType>;
      /**
       * The user is not authorized to perform this action.
       **/
      NotAuthorized: AugmentedError<ApiType>;
      /**
       * The preimage cannot be removed since it has not yet been noted.
       **/
      NotNoted: AugmentedError<ApiType>;
      /**
       * The preimage request cannot be removed since no outstanding requests exist.
       **/
      NotRequested: AugmentedError<ApiType>;
      /**
       * A preimage may not be removed when there are outstanding requests.
       **/
      Requested: AugmentedError<ApiType>;
      /**
       * Preimage is too large to store on-chain.
       **/
      TooBig: AugmentedError<ApiType>;
      /**
       * Too few hashes were requested to be upgraded (i.e. zero).
       **/
      TooFew: AugmentedError<ApiType>;
      /**
       * More than `MAX_HASH_UPGRADE_BULK_COUNT` hashes were requested to be upgraded at once.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    provideRandomness: {
      /**
       * Request randomness queue is full.
       **/
      QueueFull: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    proxy: {
      /**
       * Account is already a proxy.
       **/
      Duplicate: AugmentedError<ApiType>;
      /**
       * Call may not be made by proxy because it may escalate its privileges.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Cannot add self as proxy.
       **/
      NoSelfProxy: AugmentedError<ApiType>;
      /**
       * Proxy registration not found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Sender is not a proxy of the account to be proxied.
       **/
      NotProxy: AugmentedError<ApiType>;
      /**
       * There are too many proxies registered or too many announcements pending.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Announcement, if made at all, was made too recently.
       **/
      Unannounced: AugmentedError<ApiType>;
      /**
       * A call which is incompatible with the proxy type's filter was attempted.
       **/
      Unproxyable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    scheduler: {
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Attempt to use a non-named function on a named task.
       **/
      Named: AugmentedError<ApiType>;
      /**
       * Cannot find the scheduled call.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Reschedule failed because it does not change scheduled time.
       **/
      RescheduleNoChange: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    session: {
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Key setting account is not live, so it's impossible to associate keys.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    smithMembers: {
      /**
       * Receiver must not already have this certification
       **/
      CertificationAlreadyExists: AugmentedError<ApiType>;
      /**
       * Only online smiths can certify
       **/
      CertificationIsAOnlineSmithPrivilege: AugmentedError<ApiType>;
      /**
       * Issuer must be a smith
       **/
      CertificationIsASmithPrivilege: AugmentedError<ApiType>;
      /**
       * Certification cannot be made on someone who has not accepted an invitation
       **/
      CertificationMustBeAgreed: AugmentedError<ApiType>;
      /**
       * Smith cannot certify itself
       **/
      CertificationOfSelfIsForbidden: AugmentedError<ApiType>;
      /**
       * Certification cannot be made on excluded
       **/
      CertificationOnExcludedIsForbidden: AugmentedError<ApiType>;
      /**
       * Receiver must be invited by another smith
       **/
      CertificationReceiverMustHaveBeenInvited: AugmentedError<ApiType>;
      /**
       * A smith has a limited stock of certifications
       **/
      CertificationStockFullyConsumed: AugmentedError<ApiType>;
      /**
       * Invitation must not have been accepted yet
       **/
      InvitationAlreadyAccepted: AugmentedError<ApiType>;
      /**
       * Invitation is reseverd to online smiths
       **/
      InvitationIsAOnlineSmithPrivilege: AugmentedError<ApiType>;
      /**
       * Invitation is reseverd to smiths
       **/
      InvitationIsASmithPrivilege: AugmentedError<ApiType>;
      /**
       * Invitation of an already known smith is forbidden except if it has been excluded
       **/
      InvitationOfExistingNonExcluded: AugmentedError<ApiType>;
      /**
       * Invitation of a non-member (of the WoT) is forbidden
       **/
      InvitationOfNonMember: AugmentedError<ApiType>;
      /**
       * Issuer must be known as a potential smith
       **/
      OriginHasNeverBeenInvited: AugmentedError<ApiType>;
      /**
       * Issuer of anything (invitation, acceptance, certification) must have an identity ID
       **/
      OriginMustHaveAnIdentity: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account.
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       *
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * A multi-block migration is ongoing and prevents the current code from being replaced.
       **/
      MultiBlockMigrationsOngoing: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * No upgrade authorized.
       **/
      NothingAuthorized: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * The submitted code is not authorized.
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    technicalCommittee: {
      /**
       * Members are already initialized!
       **/
      AlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Duplicate proposals not allowed
       **/
      DuplicateProposal: AugmentedError<ApiType>;
      /**
       * Duplicate vote ignored
       **/
      DuplicateVote: AugmentedError<ApiType>;
      /**
       * Account is not a member
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Prime account is not a member
       **/
      PrimeAccountNotMember: AugmentedError<ApiType>;
      /**
       * Proposal must exist
       **/
      ProposalMissing: AugmentedError<ApiType>;
      /**
       * The close call was made too early, before the end of the voting.
       **/
      TooEarly: AugmentedError<ApiType>;
      /**
       * There can only be a maximum of `MaxProposals` active proposals.
       **/
      TooManyProposals: AugmentedError<ApiType>;
      /**
       * Mismatched index
       **/
      WrongIndex: AugmentedError<ApiType>;
      /**
       * The given length bound for the proposal was too low.
       **/
      WrongProposalLength: AugmentedError<ApiType>;
      /**
       * The given weight bound for the proposal was too low.
       **/
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    treasury: {
      /**
       * The payment has already been attempted.
       **/
      AlreadyAttempted: AugmentedError<ApiType>;
      /**
       * The spend is not yet eligible for payout.
       **/
      EarlyPayout: AugmentedError<ApiType>;
      /**
       * The balance of the asset kind is not convertible to the balance of the native asset.
       **/
      FailedToConvertBalance: AugmentedError<ApiType>;
      /**
       * The payment has neither failed nor succeeded yet.
       **/
      Inconclusive: AugmentedError<ApiType>;
      /**
       * The spend origin is valid but the amount it is allowed to spend is lower than the
       * amount to be spent.
       **/
      InsufficientPermission: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal, bounty or spend at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * The payout was not yet attempted/claimed.
       **/
      NotAttempted: AugmentedError<ApiType>;
      /**
       * There was some issue with the mechanism of payment.
       **/
      PayoutError: AugmentedError<ApiType>;
      /**
       * Proposal has not been approved.
       **/
      ProposalNotApproved: AugmentedError<ApiType>;
      /**
       * The spend has expired and cannot be claimed.
       **/
      SpendExpired: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    universalDividend: {
      /**
       * This account is not allowed to claim UDs.
       **/
      AccountNotAllowedToClaimUds: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    wot: {
      /**
       * Identity creation period not respected.
       **/
      IdtyCreationPeriodNotRespected: AugmentedError<ApiType>;
      /**
       * Issuer or receiver not found.
       **/
      IdtyNotFound: AugmentedError<ApiType>;
      /**
       * Issuer cannot emit a certification because it is not member.
       **/
      IssuerNotMember: AugmentedError<ApiType>;
      /**
       * Maximum number of emitted certifications reached.
       **/
      MaxEmittedCertsReached: AugmentedError<ApiType>;
      /**
       * Membership can only be renewed after an antispam delay.
       **/
      MembershipRenewalPeriodNotRespected: AugmentedError<ApiType>;
      /**
       * Insufficient certifications received.
       **/
      NotEnoughCerts: AugmentedError<ApiType>;
      /**
       * Insufficient received certifications to create identity.
       **/
      NotEnoughReceivedCertsToCreateIdty: AugmentedError<ApiType>;
      /**
       * Target status is incompatible with this operation.
       **/
      TargetStatusInvalid: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
